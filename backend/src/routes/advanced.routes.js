/**
 * Advanced Routes
 * Analytics, Compliance, Workflow Automation
 */

const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const advancedController = require('../controllers/advanced.controller');

// All routes require authentication
// router.use(authenticate); // Removed for no-auth demo

// ========== ANALYTICS ==========

// @route   GET /api/advanced/analytics/budget-trends
// @desc    Get budget utilization trends
// @access  Private (DGA Admin, Financial Controller)
router.get(
  '/analytics/budget-trends',
  advancedController.getBudgetTrends
);

// @route   GET /api/advanced/analytics/predict-budget/:entity_id
// @desc    Predict future budget needs
// @access  Private (DGA Admin, Financial Controller)
router.get(
  '/analytics/predict-budget/:entity_id',
  advancedController.predictBudget
);

// @route   GET /api/advanced/analytics/digital-maturity/:entity_id
// @desc    Get digital maturity score
// @access  Private
router.get(
  '/analytics/digital-maturity/:entity_id',
  advancedController.getDigitalMaturity
);

// @route   GET /api/advanced/analytics/risk-analysis
// @desc    Perform risk analysis
// @access  Private (DGA Admin, Compliance Auditor)
router.get(
  '/analytics/risk-analysis',
  advancedController.getRiskAnalysis
);

// @route   GET /api/advanced/analytics/benchmarks
// @desc    Get regional benchmarks
// @access  Private (DGA Admin)
router.get(
  '/analytics/benchmarks',
  advancedController.getBenchmarks
);

// ========== COMPLIANCE ==========

// @route   GET /api/advanced/compliance/report
// @desc    Generate compliance report
// @access  Private (DGA Admin, Compliance Auditor)
router.get(
  '/compliance/report',
  advancedController.getComplianceReport
);

// @route   GET /api/advanced/compliance/history/:entity_id
// @desc    Get compliance history
// @access  Private (DGA Admin, Compliance Auditor)
router.get(
  '/compliance/history/:entity_id',
  advancedController.getComplianceHistory
);

// @route   GET /api/advanced/compliance/audit
// @desc    Generate audit report
// @access  Private (DGA Admin, Compliance Auditor)
router.get(
  '/compliance/audit',
  advancedController.getAuditReport
);

// ========== WORKFLOW AUTOMATION ==========

// @route   POST /api/advanced/workflow/initiate
// @desc    Initiate approval workflow
// @access  Private
router.post(
  '/workflow/initiate',
  advancedController.initiateWorkflow
);

// @route   POST /api/advanced/workflow/approve/:workflow_id
// @desc    Process approval action
// @access  Private
router.post(
  '/workflow/approve/:workflow_id',
  advancedController.processApproval
);

// @route   GET /api/advanced/workflow/budget-alerts
// @desc    Get budget alerts
// @access  Private (DGA Admin, Financial Controller)
router.get(
  '/workflow/budget-alerts',
  advancedController.getBudgetAlerts
);

// @route   POST /api/advanced/workflow/schedule-report
// @desc    Schedule automated report
// @access  Private (DGA Admin)
router.post(
  '/workflow/schedule-report',
  advancedController.scheduleReport
);

// @route   POST /api/advanced/workflow/update-statuses
// @desc    Update program statuses automatically
// @access  Private (DGA Admin)
router.post(
  '/workflow/update-statuses',
  advancedController.updateProgramStatuses
);

// @route   POST /api/advanced/workflow/batch-operation
// @desc    Process batch operations
// @access  Private (DGA Admin)
router.post(
  '/workflow/batch-operation',
  advancedController.processBatchOperation
);

module.exports = router;
