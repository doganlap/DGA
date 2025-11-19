/**
 * Analytics Service
 * Advanced analytics, predictive insights, and trend analysis
 */

const { db } = require('../config/database');
const logger = require('../utils/logger');

class AnalyticsService {
  /**
   * Calculate budget utilization trends
   */
  async calculateBudgetTrends(options = {}) {
    try {
      const { startDate, endDate, region, entity_id } = options;
      
      let query = db('dga_budget')
        .select(
          db.raw('DATE_TRUNC(\'month\', created_at) as month'),
          db.raw('SUM(allocated) as total_allocated'),
          db.raw('SUM(spent) as total_spent'),
          db.raw('(SUM(spent) / NULLIF(SUM(allocated), 0) * 100) as utilization_rate')
        )
        .groupBy(db.raw('DATE_TRUNC(\'month\', created_at)'))
        .orderBy('month', 'desc');
      
      if (startDate) query = query.where('created_at', '>=', startDate);
      if (endDate) query = query.where('created_at', '<=', endDate);
      if (region) query = query.where({ region });
      if (entity_id) query = query.where({ entity_id });
      
      const trends = await query;
      
      // Calculate moving average
      const movingAvg = this.calculateMovingAverage(trends.map(t => t.utilization_rate), 3);
      
      return {
        trends: trends.map((t, i) => ({
          ...t,
          moving_average: movingAvg[i]
        })),
        summary: {
          avg_utilization: trends.reduce((sum, t) => sum + parseFloat(t.utilization_rate || 0), 0) / trends.length,
          total_allocated: trends.reduce((sum, t) => sum + parseFloat(t.total_allocated || 0), 0),
          total_spent: trends.reduce((sum, t) => sum + parseFloat(t.total_spent || 0), 0)
        }
      };
    } catch (error) {
      logger.error('Calculate budget trends error:', error);
      throw error;
    }
  }

  /**
   * Predict future budget needs using linear regression
   */
  async predictBudgetNeeds(entity_id, months = 6) {
    try {
      const historical = await db('dga_budget')
        .where({ entity_id })
        .orderBy('fiscal_year', 'desc')
        .orderBy('quarter', 'desc')
        .limit(12)
        .select('allocated', 'spent');
      
      if (historical.length < 3) {
        return { prediction: null, confidence: 'low', message: 'Insufficient data' };
      }
      
      // Simple linear regression
      const values = historical.map(h => parseFloat(h.spent || 0));
      const prediction = this.linearRegression(values, months);
      const confidence = this.calculateConfidence(values);
      
      return {
        prediction,
        confidence,
        historical_avg: values.reduce((a, b) => a + b, 0) / values.length,
        trend: prediction > values[0] ? 'increasing' : 'decreasing'
      };
    } catch (error) {
      logger.error('Predict budget needs error:', error);
      throw error;
    }
  }

  /**
   * Calculate digital maturity score
   */
  async calculateDigitalMaturity(entity_id) {
    try {
      // Get entity programs completion rate
      const programs = await db('dga_programs')
        .where({ entity_id })
        .select('status', 'progress_percentage');
      
      if (programs.length === 0) {
        return { score: 0, level: 'Foundational', factors: [] };
      }
      
      const completedCount = programs.filter(p => p.status === 'completed').length;
      const completionRate = (completedCount / programs.length) * 100;
      const avgProgress = programs.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / programs.length;
      
      // Get budget utilization
      const budget = await db('dga_budget')
        .where({ entity_id })
        .select(db.raw('SUM(spent) / NULLIF(SUM(allocated), 0) * 100 as utilization'))
        .first();
      
      const budgetUtilization = parseFloat(budget?.utilization || 0);
      
      // Calculate composite score (0-100)
      const score = (
        (completionRate * 0.4) +
        (avgProgress * 0.35) +
        (budgetUtilization * 0.25)
      );
      
      const level = this.getMaturityLevel(score);
      
      return {
        score: Math.round(score * 10) / 10,
        level,
        factors: {
          program_completion: Math.round(completionRate),
          avg_progress: Math.round(avgProgress),
          budget_utilization: Math.round(budgetUtilization),
          total_programs: programs.length
        }
      };
    } catch (error) {
      logger.error('Calculate digital maturity error:', error);
      throw error;
    }
  }

  /**
   * Risk analysis for programs and entities
   */
  async analyzeRisks(options = {}) {
    try {
      const { entity_id, region } = options;
      
      let query = db('dga_programs')
        .leftJoin('dga_entities', 'dga_programs.entity_id', 'dga_entities.id')
        .select(
          'dga_programs.*',
          'dga_entities.entity_name',
          'dga_entities.region'
        );
      
      if (entity_id) query = query.where({ 'dga_programs.entity_id': entity_id });
      if (region) query = query.where({ 'dga_entities.region': region });
      
      const programs = await query;
      
      const risks = programs.map(program => {
        let riskScore = 0;
        const factors = [];
        
        // Budget overrun risk
        if (program.budget_spent > program.budget_allocated * 0.9) {
          riskScore += 30;
          factors.push('Budget overrun imminent');
        }
        
        // Timeline risk
        if (program.status === 'in_progress' && program.progress_percentage < 50) {
          const daysSinceStart = Math.floor((new Date() - new Date(program.start_date)) / (1000 * 60 * 60 * 24));
          if (daysSinceStart > 90) {
            riskScore += 25;
            factors.push('Slow progress');
          }
        }
        
        // Delayed program risk
        if (program.status === 'on_hold') {
          riskScore += 40;
          factors.push('Program on hold');
        }
        
        // Dependency risk
        if (program.status === 'planning') {
          riskScore += 15;
          factors.push('Still in planning phase');
        }
        
        return {
          program_id: program.program_id,
          program_name: program.program_name,
          entity_name: program.entity_name,
          risk_score: Math.min(riskScore, 100),
          risk_level: this.getRiskLevel(riskScore),
          factors
        };
      });
      
      // Sort by risk score descending
      risks.sort((a, b) => b.risk_score - a.risk_score);
      
      return {
        high_risk: risks.filter(r => r.risk_level === 'high'),
        medium_risk: risks.filter(r => r.risk_level === 'medium'),
        low_risk: risks.filter(r => r.risk_level === 'low'),
        total_programs: programs.length,
        avg_risk_score: risks.reduce((sum, r) => sum + r.risk_score, 0) / risks.length
      };
    } catch (error) {
      logger.error('Analyze risks error:', error);
      throw error;
    }
  }

  /**
   * Generate performance benchmarks across regions
   */
  async generateBenchmarks() {
    try {
      const regions = ['Central', 'Western', 'Eastern', 'Northern', 'Southern'];
      const benchmarks = [];
      
      for (const region of regions) {
        const entities = await db('dga_entities')
          .where({ region })
          .avg('digital_maturity_score as avg_maturity')
          .count('* as count')
          .first();
        
        const programs = await db('dga_programs')
          .leftJoin('dga_entities', 'dga_programs.entity_id', 'dga_entities.entity_id')
          .where({ 'dga_entities.region': region })
          .select(db.raw('COUNT(*) as total'))
          .select(db.raw('AVG(progress_percentage) as avg_progress'))
          .first();
        
        const budget = await db('dga_budget')
          .where({ region })
          .select(
            db.raw('SUM(allocated) as total_allocated'),
            db.raw('SUM(spent) as total_spent')
          )
          .first();
        
        benchmarks.push({
          region,
          entities: parseInt(entities.count),
          avg_maturity: parseFloat(entities.avg_maturity || 0),
          total_programs: parseInt(programs.total),
          avg_program_progress: parseFloat(programs.avg_progress || 0),
          budget_allocated: parseFloat(budget.total_allocated || 0),
          budget_spent: parseFloat(budget.total_spent || 0),
          budget_utilization: budget.total_allocated > 0 
            ? (budget.total_spent / budget.total_allocated * 100)
            : 0
        });
      }
      
      return {
        benchmarks,
        best_performers: {
          maturity: benchmarks.sort((a, b) => b.avg_maturity - a.avg_maturity)[0],
          budget_efficiency: benchmarks.sort((a, b) => b.budget_utilization - a.budget_utilization)[0],
          program_progress: benchmarks.sort((a, b) => b.avg_program_progress - a.avg_program_progress)[0]
        }
      };
    } catch (error) {
      logger.error('Generate benchmarks error:', error);
      throw error;
    }
  }

  // Helper methods
  calculateMovingAverage(data, window) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - window + 1);
      const subset = data.slice(start, i + 1);
      const avg = subset.reduce((sum, val) => sum + (val || 0), 0) / subset.length;
      result.push(Math.round(avg * 10) / 10);
    }
    return result;
  }

  linearRegression(values, periods) {
    const n = values.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += values[i];
      sumXY += i * values[i];
      sumX2 += i * i;
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return Math.round((slope * (n + periods) + intercept) * 100) / 100;
  }

  calculateConfidence(values) {
    const variance = this.calculateVariance(values);
    if (variance < 0.1) return 'high';
    if (variance < 0.3) return 'medium';
    return 'low';
  }

  calculateVariance(values) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return variance / mean; // Coefficient of variation
  }

  getMaturityLevel(score) {
    if (score >= 80) return 'Leading';
    if (score >= 60) return 'Advanced';
    if (score >= 40) return 'Intermediate';
    if (score >= 20) return 'Developing';
    return 'Foundational';
  }

  getRiskLevel(score) {
    if (score >= 60) return 'high';
    if (score >= 30) return 'medium';
    return 'low';
  }
}

module.exports = new AnalyticsService();
