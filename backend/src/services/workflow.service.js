/**
 * Workflow Automation Service
 * Automates approval workflows, notifications, and process orchestration
 */

const { db } = require('../config/database');
const logger = require('../utils/logger');

class WorkflowService {
  /**
   * Initialize approval workflow for program/project
   */
  async initiateApprovalWorkflow(options) {
    try {
      const { item_type, item_id, initiator_id, approval_levels } = options;
      
      const workflowId = this.generateWorkflowId();
      
      // Create workflow record
      const workflow = {
        workflow_id: workflowId,
        item_type, // 'program', 'project', 'budget', 'entity'
        item_id,
        initiator_id,
        status: 'pending',
        current_level: 1,
        total_levels: approval_levels.length,
        created_at: new Date(),
        metadata: JSON.stringify(approval_levels)
      };
      
      // Store workflow (would need a workflows table)
      logger.info(`Workflow initiated: ${workflowId} for ${item_type} ${item_id}`);
      
      // Send notifications to first level approvers
      await this.notifyApprovers(workflow, approval_levels[0]);
      
      return {
        workflow_id: workflowId,
        status: 'initiated',
        next_approvers: approval_levels[0].approvers,
        estimated_completion: this.calculateEstimatedCompletion(approval_levels.length)
      };
    } catch (error) {
      logger.error('Initiate approval workflow error:', error);
      throw error;
    }
  }

  /**
   * Process approval action
   */
  async processApproval(workflowId, approverId, action, comments = '') {
    try {
      // Validate action
      if (!['approve', 'reject', 'request_changes'].includes(action)) {
        throw new Error('Invalid approval action');
      }
      
      // Record approval action
      const approvalRecord = {
        workflow_id: workflowId,
        approver_id: approverId,
        action,
        comments,
        approved_at: new Date()
      };
      
      logger.info(`Approval ${action} by ${approverId} for workflow ${workflowId}`);
      
      // If approved, move to next level or complete
      if (action === 'approve') {
        return await this.advanceWorkflow(workflowId);
      }
      
      // If rejected, mark workflow as rejected
      if (action === 'reject') {
        return await this.rejectWorkflow(workflowId, comments);
      }
      
      // If changes requested, notify initiator
      if (action === 'request_changes') {
        return await this.requestChanges(workflowId, approverId, comments);
      }
    } catch (error) {
      logger.error('Process approval error:', error);
      throw error;
    }
  }

  /**
   * Auto-approve based on criteria
   */
  async autoApprove(item_type, item_id, criteria) {
    try {
      let shouldAutoApprove = false;
      const reasons = [];
      
      if (item_type === 'budget') {
        const budget = await db('dga_budget')
          .where({ budget_id: item_id })
          .first();
        
        // Auto-approve if budget is under threshold
        if (budget && budget.allocated < criteria.amount_threshold) {
          shouldAutoApprove = true;
          reasons.push(`Budget under threshold (${criteria.amount_threshold})`);
        }
      }
      
      if (item_type === 'program') {
        const program = await db('dga_programs')
          .where({ program_id: item_id })
          .first();
        
        // Auto-approve low-priority programs
        if (program && program.priority === 'low') {
          shouldAutoApprove = true;
          reasons.push('Low priority program');
        }
      }
      
      if (shouldAutoApprove) {
        logger.info(`Auto-approved ${item_type} ${item_id}: ${reasons.join(', ')}`);
        return {
          auto_approved: true,
          reasons,
          approved_at: new Date()
        };
      }
      
      return {
        auto_approved: false,
        requires_manual_approval: true
      };
    } catch (error) {
      logger.error('Auto-approve error:', error);
      throw error;
    }
  }

  /**
   * Schedule automated reports
   */
  async scheduleReport(options) {
    try {
      const { report_type, frequency, recipients, filters } = options;
      
      const scheduleId = this.generateScheduleId();
      
      const schedule = {
        schedule_id: scheduleId,
        report_type, // 'budget', 'compliance', 'performance', 'risk'
        frequency, // 'daily', 'weekly', 'monthly', 'quarterly'
        recipients: Array.isArray(recipients) ? recipients : [recipients],
        filters: JSON.stringify(filters || {}),
        next_run: this.calculateNextRun(frequency),
        active: true,
        created_at: new Date()
      };
      
      logger.info(`Report scheduled: ${report_type} - ${frequency}`);
      
      return {
        schedule_id: scheduleId,
        status: 'scheduled',
        next_run: schedule.next_run,
        recipients: schedule.recipients
      };
    } catch (error) {
      logger.error('Schedule report error:', error);
      throw error;
    }
  }

  /**
   * Automated budget alerts
   */
  async monitorBudgetAlerts() {
    try {
      const alerts = [];
      
      // Check for budget overruns
      const overruns = await db('dga_budget')
        .where(db.raw('spent > allocated * 0.9'))
        .leftJoin('dga_entities', 'dga_budget.entity_id', 'dga_entities.entity_id')
        .select(
          'dga_budget.*',
          'dga_entities.entity_name',
          'dga_entities.region'
        );
      
      overruns.forEach(budget => {
        const utilizationRate = (budget.spent / budget.allocated * 100).toFixed(1);
        alerts.push({
          type: 'budget_overrun',
          severity: budget.spent > budget.allocated ? 'high' : 'medium',
          entity_name: budget.entity_name,
          region: budget.region,
          message: `Budget utilization at ${utilizationRate}%`,
          allocated: budget.allocated,
          spent: budget.spent,
          remaining: budget.allocated - budget.spent
        });
      });
      
      // Check for underutilization
      const underutilized = await db('dga_budget')
        .where(db.raw('spent < allocated * 0.5'))
        .where('fiscal_year', new Date().getFullYear())
        .whereRaw('EXTRACT(MONTH FROM created_at) <= ?', [new Date().getMonth() + 1])
        .leftJoin('dga_entities', 'dga_budget.entity_id', 'dga_entities.entity_id')
        .select(
          'dga_budget.*',
          'dga_entities.entity_name',
          'dga_entities.region'
        );
      
      underutilized.forEach(budget => {
        const utilizationRate = (budget.spent / budget.allocated * 100).toFixed(1);
        alerts.push({
          type: 'budget_underutilization',
          severity: 'low',
          entity_name: budget.entity_name,
          region: budget.region,
          message: `Low budget utilization at ${utilizationRate}%`,
          allocated: budget.allocated,
          spent: budget.spent,
          remaining: budget.allocated - budget.spent
        });
      });
      
      return {
        total_alerts: alerts.length,
        critical: alerts.filter(a => a.severity === 'high').length,
        warnings: alerts.filter(a => a.severity === 'medium').length,
        info: alerts.filter(a => a.severity === 'low').length,
        alerts: alerts.sort((a, b) => {
          const severityOrder = { high: 3, medium: 2, low: 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        })
      };
    } catch (error) {
      logger.error('Monitor budget alerts error:', error);
      throw error;
    }
  }

  /**
   * Automated program status updates
   */
  async updateProgramStatuses() {
    try {
      const updates = [];
      
      // Find programs that should be marked as delayed
      const now = new Date();
      const programs = await db('dga_programs')
        .where('status', 'in_progress')
        .select('*');
      
      for (const program of programs) {
        let statusChanged = false;
        const daysSinceStart = Math.floor((now - new Date(program.start_date)) / (1000 * 60 * 60 * 24));
        
        // Mark as delayed if progress is behind schedule
        if (daysSinceStart > 90 && program.progress_percentage < 30) {
          await db('dga_programs')
            .where({ program_id: program.program_id })
            .update({ status: 'delayed', updated_at: now });
          
          updates.push({
            program_id: program.program_id,
            program_name: program.program_name,
            old_status: 'in_progress',
            new_status: 'delayed',
            reason: 'Behind schedule'
          });
          statusChanged = true;
        }
        
        // Mark as completed if progress is 100%
        if (program.progress_percentage >= 100 && program.status !== 'completed') {
          await db('dga_programs')
            .where({ program_id: program.program_id })
            .update({ status: 'completed', completion_date: now, updated_at: now });
          
          updates.push({
            program_id: program.program_id,
            program_name: program.program_name,
            old_status: program.status,
            new_status: 'completed',
            reason: 'Progress reached 100%'
          });
          statusChanged = true;
        }
      }
      
      if (updates.length > 0) {
        logger.info(`Automated ${updates.length} program status updates`);
      }
      
      return {
        updated_count: updates.length,
        updates
      };
    } catch (error) {
      logger.error('Update program statuses error:', error);
      throw error;
    }
  }

  /**
   * Notification system
   */
  async sendNotification(options) {
    try {
      const { user_ids, title, message, type, priority, entity_id } = options;
      
      const notifications = user_ids.map(user_id => ({
        notification_id: this.generateNotificationId(),
        user_id,
        title,
        message,
        type, // 'alert', 'info', 'warning', 'success'
        priority, // 'high', 'medium', 'low'
        entity_id: entity_id || null,
        is_read: false,
        created_at: new Date()
      }));
      
      // Would insert into notifications table
      // await db('dga_notifications').insert(notifications);
      
      logger.info(`Sent ${notifications.length} notifications: ${title}`);
      
      return {
        sent: notifications.length,
        notification_ids: notifications.map(n => n.notification_id)
      };
    } catch (error) {
      logger.error('Send notification error:', error);
      throw error;
    }
  }

  /**
   * Batch operations processor
   */
  async processBatchOperation(operation) {
    try {
      const { operation_type, items, user_id } = operation;
      
      const results = {
        success: [],
        failed: []
      };
      
      for (const item of items) {
        try {
          switch (operation_type) {
            case 'bulk_update':
              await db(item.table)
                .where({ id: item.id })
                .update({ ...item.updates, updated_at: new Date() });
              results.success.push(item.id);
              break;
            
            case 'bulk_delete':
              await db(item.table)
                .where({ id: item.id })
                .del();
              results.success.push(item.id);
              break;
            
            case 'bulk_approve':
              await this.processApproval(item.workflow_id, user_id, 'approve');
              results.success.push(item.workflow_id);
              break;
            
            default:
              throw new Error(`Unknown operation: ${operation_type}`);
          }
        } catch (error) {
          results.failed.push({
            item,
            error: error.message
          });
        }
      }
      
      logger.info(`Batch operation completed: ${results.success.length} success, ${results.failed.length} failed`);
      
      return results;
    } catch (error) {
      logger.error('Process batch operation error:', error);
      throw error;
    }
  }

  // Helper methods
  generateWorkflowId() {
    return `WF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  generateScheduleId() {
    return `SCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  generateNotificationId() {
    return `NOT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async notifyApprovers(workflow, level) {
    const approvers = level.approvers;
    await this.sendNotification({
      user_ids: approvers,
      title: `Approval Required: ${workflow.item_type}`,
      message: `Your approval is required for ${workflow.item_type} ${workflow.item_id}`,
      type: 'alert',
      priority: 'high'
    });
  }

  calculateEstimatedCompletion(levels) {
    const daysPerLevel = 2;
    const estimatedDays = levels * daysPerLevel;
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + estimatedDays);
    return completionDate.toISOString();
  }

  async advanceWorkflow(workflowId) {
    // Move to next approval level
    logger.info(`Advancing workflow ${workflowId} to next level`);
    return { status: 'advanced', message: 'Moved to next approval level' };
  }

  async rejectWorkflow(workflowId, comments) {
    logger.info(`Workflow ${workflowId} rejected: ${comments}`);
    return { status: 'rejected', message: comments };
  }

  async requestChanges(workflowId, approverId, comments) {
    logger.info(`Changes requested for workflow ${workflowId} by ${approverId}`);
    return { status: 'changes_requested', message: comments };
  }

  calculateNextRun(frequency) {
    const now = new Date();
    switch (frequency) {
      case 'daily':
        now.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        now.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        now.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        now.setMonth(now.getMonth() + 3);
        break;
      default:
        now.setDate(now.getDate() + 1);
    }
    return now.toISOString();
  }
}

module.exports = new WorkflowService();
