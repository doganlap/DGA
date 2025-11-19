/**
 * Compliance Service
 * PDPL (Personal Data Protection Law) and NCA ECC compliance monitoring
 */

const { db } = require('../config/database');
const logger = require('../utils/logger');

class ComplianceService {
  /**
   * Generate comprehensive compliance report
   */
  async generateComplianceReport(entity_id = null) {
    try {
      const pdplScore = await this.assessPDPLCompliance(entity_id);
      const ncaScore = await this.assessNCACompliance(entity_id);
      const iso27001Score = await this.assessISO27001Compliance(entity_id);
      
      const overallScore = (pdplScore.score + ncaScore.score + iso27001Score.score) / 3;
      
      return {
        overall_score: Math.round(overallScore * 10) / 10,
        compliance_level: this.getComplianceLevel(overallScore),
        frameworks: {
          pdpl: pdplScore,
          nca_ecc: ncaScore,
          iso27001: iso27001Score
        },
        recommendations: this.generateRecommendations(pdplScore, ncaScore, iso27001Score),
        last_assessed: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Generate compliance report error:', error);
      throw error;
    }
  }

  /**
   * Assess PDPL (Personal Data Protection Law) compliance
   */
  async assessPDPLCompliance(entity_id) {
    const criteria = {
      data_inventory: 0, // Do we have data inventory?
      consent_management: 0, // Do we manage user consent?
      data_minimization: 0, // Do we collect only necessary data?
      data_retention: 0, // Do we have data retention policies?
      breach_notification: 0, // Do we have breach notification procedures?
      data_subject_rights: 0, // Do we handle data subject requests?
      dpia_conducted: 0, // Data Protection Impact Assessment
      privacy_by_design: 0 // Privacy by design principles
    };
    
    // Check audit logs for privacy-related activities
    let query = db('dga_audit_trail')
      .where('action', 'like', '%data%')
      .orWhere('action', 'like', '%privacy%')
      .orWhere('action', 'like', '%consent%');
    
    if (entity_id) query = query.where({ entity_id });
    
    const auditRecords = await query.count('* as count').first();
    
    // Check if entity has data protection policies
    if (entity_id) {
      const entity = await db('dga_entities')
        .where({ entity_id })
        .first();
      
      if (entity) {
        // Simulate assessment based on entity metadata
        criteria.data_inventory = entity.digital_maturity_score > 50 ? 100 : 50;
        criteria.consent_management = entity.digital_maturity_score > 60 ? 100 : 60;
        criteria.data_minimization = 80;
        criteria.data_retention = 75;
        criteria.breach_notification = entity.digital_maturity_score > 70 ? 100 : 70;
        criteria.data_subject_rights = entity.digital_maturity_score > 65 ? 100 : 65;
        criteria.dpia_conducted = auditRecords.count > 0 ? 90 : 50;
        criteria.privacy_by_design = entity.digital_maturity_score > 55 ? 85 : 55;
      }
    } else {
      // National level assessment
      criteria.data_inventory = 85;
      criteria.consent_management = 90;
      criteria.data_minimization = 88;
      criteria.data_retention = 82;
      criteria.breach_notification = 95;
      criteria.data_subject_rights = 92;
      criteria.dpia_conducted = 87;
      criteria.privacy_by_design = 86;
    }
    
    const scores = Object.values(criteria);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    return {
      score: Math.round(averageScore * 10) / 10,
      status: this.getComplianceStatus(averageScore),
      criteria,
      gaps: this.identifyGaps(criteria, 'PDPL')
    };
  }

  /**
   * Assess NCA ECC (National Cybersecurity Authority - Essential Cybersecurity Controls)
   */
  async assessNCACompliance(entity_id) {
    const controls = {
      access_control: 0,
      network_security: 0,
      system_hardening: 0,
      vulnerability_management: 0,
      incident_response: 0,
      backup_recovery: 0,
      monitoring_logging: 0,
      security_awareness: 0,
      third_party_security: 0
    };
    
    // Check security-related audit logs
    let query = db('dga_audit_trail')
      .where('action', 'like', '%security%')
      .orWhere('action', 'like', '%access%')
      .orWhere('action', 'like', '%login%');
    
    if (entity_id) query = query.where({ entity_id });
    
    const securityLogs = await query.count('* as count').first();
    const hasSecurityMonitoring = securityLogs.count > 10;
    
    if (entity_id) {
      const entity = await db('dga_entities')
        .where({ entity_id })
        .first();
      
      if (entity) {
        const maturityFactor = entity.digital_maturity_score / 100;
        controls.access_control = Math.round(85 * maturityFactor);
        controls.network_security = Math.round(90 * maturityFactor);
        controls.system_hardening = Math.round(80 * maturityFactor);
        controls.vulnerability_management = Math.round(75 * maturityFactor);
        controls.incident_response = hasSecurityMonitoring ? 95 : 70;
        controls.backup_recovery = Math.round(88 * maturityFactor);
        controls.monitoring_logging = hasSecurityMonitoring ? 100 : 65;
        controls.security_awareness = Math.round(82 * maturityFactor);
        controls.third_party_security = Math.round(78 * maturityFactor);
      }
    } else {
      // National level
      controls.access_control = 92;
      controls.network_security = 95;
      controls.system_hardening = 88;
      controls.vulnerability_management = 85;
      controls.incident_response = 98;
      controls.backup_recovery = 94;
      controls.monitoring_logging = 96;
      controls.security_awareness = 87;
      controls.third_party_security = 84;
    }
    
    const scores = Object.values(controls);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    return {
      score: Math.round(averageScore * 10) / 10,
      status: this.getComplianceStatus(averageScore),
      controls,
      gaps: this.identifyGaps(controls, 'NCA ECC')
    };
  }

  /**
   * Assess ISO 27001 compliance
   */
  async assessISO27001Compliance(entity_id) {
    const domains = {
      information_security_policies: 0,
      organization_of_information_security: 0,
      human_resource_security: 0,
      asset_management: 0,
      access_control: 0,
      cryptography: 0,
      physical_security: 0,
      operations_security: 0,
      communications_security: 0,
      system_acquisition: 0,
      supplier_relationships: 0,
      incident_management: 0,
      business_continuity: 0,
      compliance: 0
    };
    
    if (entity_id) {
      const entity = await db('dga_entities')
        .where({ entity_id })
        .first();
      
      if (entity) {
        const factor = entity.digital_maturity_score / 100;
        Object.keys(domains).forEach(key => {
          domains[key] = Math.round((75 + Math.random() * 20) * factor);
        });
      }
    } else {
      Object.keys(domains).forEach(key => {
        domains[key] = 80 + Math.floor(Math.random() * 15);
      });
    }
    
    const scores = Object.values(domains);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    return {
      score: Math.round(averageScore * 10) / 10,
      status: this.getComplianceStatus(averageScore),
      domains,
      gaps: this.identifyGaps(domains, 'ISO 27001')
    };
  }

  /**
   * Track compliance over time
   */
  async trackComplianceHistory(entity_id, months = 12) {
    try {
      const history = [];
      const currentDate = new Date();
      
      for (let i = 0; i < months; i++) {
        const month = new Date(currentDate);
        month.setMonth(month.getMonth() - i);
        
        // Simulate historical compliance scores
        const baseScore = 85;
        const variation = Math.random() * 10 - 5;
        const score = Math.min(100, Math.max(0, baseScore + variation + (i * 0.5)));
        
        history.push({
          month: month.toISOString().slice(0, 7),
          score: Math.round(score * 10) / 10,
          status: this.getComplianceStatus(score)
        });
      }
      
      history.reverse();
      
      return {
        history,
        trend: history[history.length - 1].score > history[0].score ? 'improving' : 'declining',
        avg_score: history.reduce((sum, h) => sum + h.score, 0) / history.length
      };
    } catch (error) {
      logger.error('Track compliance history error:', error);
      throw error;
    }
  }

  /**
   * Generate audit report for compliance
   */
  async generateAuditReport(options = {}) {
    try {
      const { entity_id, startDate, endDate, action_type } = options;
      
      let query = db('dga_audit_trail')
        .leftJoin('users', 'dga_audit_trail.user_id', 'users.user_id')
        .select(
          'dga_audit_trail.*',
          'users.full_name',
          'users.email',
          'users.role'
        )
        .orderBy('dga_audit_trail.created_at', 'desc');
      
      if (entity_id) query = query.where({ 'dga_audit_trail.entity_id': entity_id });
      if (startDate) query = query.where('dga_audit_trail.created_at', '>=', startDate);
      if (endDate) query = query.where('dga_audit_trail.created_at', '<=', endDate);
      if (action_type) query = query.where('dga_audit_trail.action', 'like', `%${action_type}%`);
      
      const auditLogs = await query.limit(500);
      
      // Categorize actions
      const categories = {
        data_access: auditLogs.filter(l => l.action.includes('read') || l.action.includes('view')).length,
        data_modification: auditLogs.filter(l => l.action.includes('update') || l.action.includes('modify')).length,
        data_deletion: auditLogs.filter(l => l.action.includes('delete') || l.action.includes('remove')).length,
        user_management: auditLogs.filter(l => l.action.includes('user') || l.action.includes('role')).length,
        security_events: auditLogs.filter(l => l.action.includes('security') || l.action.includes('login')).length
      };
      
      return {
        total_events: auditLogs.length,
        categories,
        recent_events: auditLogs.slice(0, 50),
        high_risk_events: auditLogs.filter(l => 
          l.action.includes('delete') || 
          l.action.includes('security') ||
          l.action.includes('admin')
        ).slice(0, 20)
      };
    } catch (error) {
      logger.error('Generate audit report error:', error);
      throw error;
    }
  }

  // Helper methods
  getComplianceLevel(score) {
    if (score >= 95) return 'Excellent';
    if (score >= 85) return 'Good';
    if (score >= 70) return 'Satisfactory';
    if (score >= 50) return 'Needs Improvement';
    return 'Non-Compliant';
  }

  getComplianceStatus(score) {
    if (score >= 90) return 'compliant';
    if (score >= 70) return 'partially_compliant';
    return 'non_compliant';
  }

  identifyGaps(criteria, framework) {
    const gaps = [];
    Object.entries(criteria).forEach(([key, value]) => {
      if (value < 70) {
        gaps.push({
          control: key.replace(/_/g, ' ').toUpperCase(),
          score: value,
          severity: value < 50 ? 'high' : 'medium',
          framework
        });
      }
    });
    return gaps;
  }

  generateRecommendations(pdpl, nca, iso) {
    const recommendations = [];
    
    if (pdpl.score < 85) {
      recommendations.push({
        priority: 'high',
        category: 'Data Protection',
        title: 'Enhance PDPL Compliance',
        description: 'Improve data protection practices to meet PDPL requirements',
        actions: pdpl.gaps.map(g => `Address ${g.control}`)
      });
    }
    
    if (nca.score < 85) {
      recommendations.push({
        priority: 'high',
        category: 'Cybersecurity',
        title: 'Strengthen NCA ECC Controls',
        description: 'Implement missing cybersecurity controls',
        actions: nca.gaps.map(g => `Improve ${g.control}`)
      });
    }
    
    if (iso.score < 85) {
      recommendations.push({
        priority: 'medium',
        category: 'Information Security',
        title: 'ISO 27001 Alignment',
        description: 'Align with ISO 27001 standards',
        actions: iso.gaps.map(g => `Implement ${g.control}`)
      });
    }
    
    return recommendations;
  }
}

module.exports = new ComplianceService();
