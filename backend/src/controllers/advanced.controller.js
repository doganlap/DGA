/**
 * Advanced Analytics Controller
 * Handles complex analytics, predictions, and insights
 */

const analyticsService = require('../services/analytics.service');
const complianceService = require('../services/compliance.service');
const workflowService = require('../services/workflow.service');
const logger = require('../utils/logger');

// ========== ANALYTICS ==========

exports.getBudgetTrends = async (req, res) => {
  try {
    const { startDate, endDate, region, entity_id } = req.query;
    
    const trends = await analyticsService.calculateBudgetTrends({
      startDate,
      endDate,
      region,
      entity_id
    });
    
    res.json({
      success: true,
      message: 'Budget trends retrieved successfully',
      data: trends
    });
  } catch (error) {
    logger.error('Get budget trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve budget trends',
      error: error.message
    });
  }
};

exports.predictBudget = async (req, res) => {
  try {
    const { entity_id } = req.params;
    const { months = 6 } = req.query;
    
    const prediction = await analyticsService.predictBudgetNeeds(entity_id, parseInt(months));
    
    res.json({
      success: true,
      message: 'Budget prediction generated successfully',
      data: prediction
    });
  } catch (error) {
    logger.error('Predict budget error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate budget prediction',
      error: error.message
    });
  }
};

exports.getDigitalMaturity = async (req, res) => {
  try {
    const { entity_id } = req.params;
    
    const maturity = await analyticsService.calculateDigitalMaturity(entity_id);
    
    res.json({
      success: true,
      message: 'Digital maturity score retrieved successfully',
      data: maturity
    });
  } catch (error) {
    logger.error('Get digital maturity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve digital maturity',
      error: error.message
    });
  }
};

exports.getRiskAnalysis = async (req, res) => {
  try {
    const { entity_id, region } = req.query;
    
    const risks = await analyticsService.analyzeRisks({ entity_id, region });
    
    res.json({
      success: true,
      message: 'Risk analysis completed successfully',
      data: risks
    });
  } catch (error) {
    logger.error('Get risk analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform risk analysis',
      error: error.message
    });
  }
};

exports.getBenchmarks = async (req, res) => {
  try {
    const benchmarks = await analyticsService.generateBenchmarks();
    
    res.json({
      success: true,
      message: 'Benchmarks generated successfully',
      data: benchmarks
    });
  } catch (error) {
    logger.error('Get benchmarks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate benchmarks',
      error: error.message
    });
  }
};

// ========== COMPLIANCE ==========

exports.getComplianceReport = async (req, res) => {
  try {
    const { entity_id } = req.query;
    
    const report = await complianceService.generateComplianceReport(entity_id || null);
    
    res.json({
      success: true,
      message: 'Compliance report generated successfully',
      data: report
    });
  } catch (error) {
    logger.error('Get compliance report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate compliance report',
      error: error.message
    });
  }
};

exports.getComplianceHistory = async (req, res) => {
  try {
    const { entity_id } = req.params;
    const { months = 12 } = req.query;
    
    const history = await complianceService.trackComplianceHistory(entity_id, parseInt(months));
    
    res.json({
      success: true,
      message: 'Compliance history retrieved successfully',
      data: history
    });
  } catch (error) {
    logger.error('Get compliance history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve compliance history',
      error: error.message
    });
  }
};

exports.getAuditReport = async (req, res) => {
  try {
    const { entity_id, startDate, endDate, action_type } = req.query;
    
    const audit = await complianceService.generateAuditReport({
      entity_id,
      startDate,
      endDate,
      action_type
    });
    
    res.json({
      success: true,
      message: 'Audit report generated successfully',
      data: audit
    });
  } catch (error) {
    logger.error('Get audit report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate audit report',
      error: error.message
    });
  }
};

// ========== WORKFLOW AUTOMATION ==========

exports.initiateWorkflow = async (req, res) => {
  try {
    const { item_type, item_id, approval_levels } = req.body;
    const initiator_id = req.user?.user_id || 'demo';
    
    const workflow = await workflowService.initiateApprovalWorkflow({
      item_type,
      item_id,
      initiator_id,
      approval_levels
    });
    
    res.status(201).json({
      success: true,
      message: 'Workflow initiated with autonomous consensus tracking',
      data: workflow
    });
  } catch (error) {
    logger.error('Initiate workflow error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate workflow',
      error: error.message
    });
  }
};

exports.processApproval = async (req, res) => {
  try {
    const { workflow_id } = req.params;
    const { action, comments } = req.body;
    const approver_id = req.user?.user_id || 'demo'; // Demo user
    
    const result = await workflowService.processApproval(workflow_id, approver_id, action, comments);
    
    res.json({
      success: true,
      message: `Approval ${action} processed successfully with autonomous follow-up`,
      data: result
    });
  } catch (error) {
    logger.error('Process approval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process approval',
      error: error.message
    });
  }
};

exports.getBudgetAlerts = async (req, res) => {
  try {
    const alerts = await workflowService.monitorBudgetAlerts();
    
    res.json({
      success: true,
      message: 'Budget alerts retrieved successfully',
      data: alerts
    });
  } catch (error) {
    logger.error('Get budget alerts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve budget alerts',
      error: error.message
    });
  }
};

exports.scheduleReport = async (req, res) => {
  try {
    const { report_type, frequency, recipients, filters } = req.body;
    
    const schedule = await workflowService.scheduleReport({
      report_type,
      frequency,
      recipients,
      filters
    });
    
    res.status(201).json({
      success: true,
      message: 'Report scheduled successfully',
      data: schedule
    });
  } catch (error) {
    logger.error('Schedule report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to schedule report',
      error: error.message
    });
  }
};

exports.updateProgramStatuses = async (req, res) => {
  try {
    const result = await workflowService.updateProgramStatuses();
    
    res.json({
      success: true,
      message: 'Program statuses updated successfully',
      data: result
    });
  } catch (error) {
    logger.error('Update program statuses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update program statuses',
      error: error.message
    });
  }
};

exports.processBatchOperation = async (req, res) => {
  try {
    const operation = req.body;
    const user_id = req.user?.user_id;
    
    const result = await workflowService.processBatchOperation({
      ...operation,
      user_id
    });
    
    res.json({
      success: true,
      message: 'Batch operation completed',
      data: result
    });
  } catch (error) {
    logger.error('Process batch operation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process batch operation',
      error: error.message
    });
  }
};

module.exports = exports;
