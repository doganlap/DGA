const { db, getRegionalDb } = require('../config/database');
const logger = require('../utils/logger');

// ========== ENTITIES ==========

exports.getAllEntities = async (req, res) => {
  try {
    const { region, status, sector, page = 1, limit = 50 } = req.query;
    
    let query = db('dga_entities').select('*');
    
    if (region) query = query.where({ region });
    if (status) query = query.where({ status });
    if (sector) query = query.where({ sector });
    
    const offset = (page - 1) * limit;
    const entities = await query.limit(limit).offset(offset).orderBy('entity_name');
    
    const total = await db('dga_entities').count('* as count').first();
    
    res.json({
      success: true,
      message: 'Entities retrieved successfully',
      data: {
        entities,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: parseInt(total.count),
          pages: Math.ceil(total.count / limit),
        },
      },
    });
  } catch (error) {
    logger.error('Get all entities error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve entities',
      error: error.message,
    });
  }
};

exports.getEntityById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const entity = await db('dga_entities').where({ id }).first();
    
    if (!entity) {
      return res.status(404).json({
        success: false,
        message: 'Entity not found',
      });
    }
    
    // Get entity programs
    const programs = await db('dga_programs')
      .where({ entity_id: id })
      .select('*');
    
    // Get entity budget
    const budget = await db('dga_budget')
      .where({ entity_id: id })
      .sum('allocated as total_allocated')
      .sum('spent as total_spent')
      .first();
    
    res.json({
      success: true,
      message: 'Entity retrieved successfully',
      data: {
        entity,
        programs,
        budget,
      },
    });
  } catch (error) {
    logger.error('Get entity by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve entity',
      error: error.message,
    });
  }
};

exports.createEntity = async (req, res) => {
  try {
    const entityData = req.body;
    
    const [newEntity] = await db('dga_entities')
      .insert(entityData)
      .returning('*');
    
    logger.info(`New entity created: ${newEntity.entity_name}`);
    
    res.status(201).json({
      success: true,
      message: 'Entity created successfully',
      data: { entity: newEntity },
    });
  } catch (error) {
    logger.error('Create entity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create entity',
      error: error.message,
    });
  }
};

exports.updateEntity = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const [updatedEntity] = await db('dga_entities')
      .where({ id })
      .update({ ...updateData, updated_at: new Date() })
      .returning('*');
    
    if (!updatedEntity) {
      return res.status(404).json({
        success: false,
        message: 'Entity not found',
      });
    }
    
    logger.info(`Entity updated: ${updatedEntity.entity_name}`);
    
    res.json({
      success: true,
      message: 'Entity updated successfully',
      data: { entity: updatedEntity },
    });
  } catch (error) {
    logger.error('Update entity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update entity',
      error: error.message,
    });
  }
};

exports.deleteEntity = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await db('dga_entities').where({ id }).del();
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Entity not found',
      });
    }
    
    logger.info(`Entity deleted: ID ${id}`);
    
    res.json({
      success: true,
      message: 'Entity deleted successfully',
    });
  } catch (error) {
    logger.error('Delete entity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete entity',
      error: error.message,
    });
  }
};

// ========== PROGRAMS ==========

exports.getAllPrograms = async (req, res) => {
  try {
    const { entity_id, status, page = 1, limit = 50 } = req.query;
    
    let query = db('dga_programs')
      .leftJoin('dga_entities', 'dga_programs.entity_id', 'dga_entities.id')
      .select(
        'dga_programs.*',
        'dga_entities.entity_name',
        'dga_entities.region'
      );
    
    if (entity_id) query = query.where({ 'dga_programs.entity_id': entity_id });
    if (status) query = query.where({ 'dga_programs.status': status });
    
    const offset = (page - 1) * limit;
    const programs = await query.limit(limit).offset(offset).orderBy('dga_programs.created_at', 'desc');
    
    const total = await db('dga_programs').count('* as count').first();
    
    res.json({
      success: true,
      message: 'Programs retrieved successfully',
      data: {
        programs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: parseInt(total.count),
          pages: Math.ceil(total.count / limit),
        },
      },
    });
  } catch (error) {
    logger.error('Get all programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve programs',
      error: error.message,
    });
  }
};

exports.getProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const program = await db('dga_programs')
      .leftJoin('dga_entities', 'dga_programs.entity_id', 'dga_entities.id')
      .where({ 'dga_programs.id': id })
      .select('dga_programs.*', 'dga_entities.entity_name', 'dga_entities.region')
      .first();
    
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }
    
    // Get program projects
    const projects = await db('dga_projects')
      .where({ program_id: id })
      .select('*');
    
    res.json({
      success: true,
      message: 'Program retrieved successfully',
      data: {
        program,
        projects,
      },
    });
  } catch (error) {
    logger.error('Get program by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve program',
      error: error.message,
    });
  }
};

exports.createProgram = async (req, res) => {
  try {
    const programData = req.body;
    
    const [newProgram] = await db('dga_programs')
      .insert(programData)
      .returning('*');
    
    logger.info(`New program created: ${newProgram.program_name}`);
    
    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: { program: newProgram },
    });
  } catch (error) {
    logger.error('Create program error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create program',
      error: error.message,
    });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const [updatedProgram] = await db('dga_programs')
      .where({ id })
      .update({ ...updateData, updated_at: new Date() })
      .returning('*');
    
    if (!updatedProgram) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }
    
    logger.info(`Program updated: ${updatedProgram.program_name}`);
    
    res.json({
      success: true,
      message: 'Program updated successfully',
      data: { program: updatedProgram },
    });
  } catch (error) {
    logger.error('Update program error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update program',
      error: error.message,
    });
  }
};

// ========== PROJECTS ==========

exports.getAllProjects = async (req, res) => {
  try {
    const { program_id, status } = req.query;
    
    let query = db('dga_projects')
      .leftJoin('dga_programs', 'dga_projects.program_id', 'dga_programs.id')
      .leftJoin('dga_entities', 'dga_projects.entity_id', 'dga_entities.id')
      .select(
        'dga_projects.*',
        'dga_programs.program_name',
        'dga_entities.entity_name'
      );
    
    if (program_id) query = query.where({ 'dga_projects.program_id': program_id });
    if (status) query = query.where({ 'dga_projects.status': status });
    
    const projects = await query.orderBy('dga_projects.created_at', 'desc');
    
    res.json({
      success: true,
      message: 'Projects retrieved successfully',
      data: { projects },
    });
  } catch (error) {
    logger.error('Get all projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects',
      error: error.message,
    });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await db('dga_projects')
      .leftJoin('dga_programs', 'dga_projects.program_id', 'dga_programs.id')
      .leftJoin('dga_entities', 'dga_projects.entity_id', 'dga_entities.id')
      .where({ 'dga_projects.id': id })
      .select('dga_projects.*', 'dga_programs.program_name', 'dga_entities.entity_name')
      .first();
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Project retrieved successfully',
      data: { project },
    });
  } catch (error) {
    logger.error('Get project by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project',
      error: error.message,
    });
  }
};

// ========== BUDGET ==========

exports.getBudgetOverview = async (req, res) => {
  try {
    const overview = await db('dga_budget')
      .sum('allocated as total_allocated')
      .sum('spent as total_spent')
      .sum('remaining as total_remaining')
      .first();
    
    const byRegion = await db('dga_budget')
      .select('region')
      .sum('allocated as allocated')
      .sum('spent as spent')
      .groupBy('region');
    
    res.json({
      success: true,
      message: 'Budget overview retrieved successfully',
      data: {
        overview,
        by_region: byRegion,
      },
    });
  } catch (error) {
    logger.error('Get budget overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve budget overview',
      error: error.message,
    });
  }
};

exports.getEntityBudget = async (req, res) => {
  try {
    const { entityId } = req.params;
    
    const budget = await db('dga_budget')
      .where({ entity_id: entityId })
      .select('*')
      .orderBy('fiscal_year', 'desc');
    
    res.json({
      success: true,
      message: 'Entity budget retrieved successfully',
      data: { budget },
    });
  } catch (error) {
    logger.error('Get entity budget error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve entity budget',
      error: error.message,
    });
  }
};

// ========== REPORTING ==========

exports.getNationalOverview = async (req, res) => {
  try {
    const totalEntities = await db('dga_entities').count('* as count').first();
    const totalPrograms = await db('dga_programs').count('* as count').first();
    const totalBudget = await db('dga_budget').sum('allocated as total').first();
    const avgMaturity = await db('dga_entities').avg('digital_maturity_score as avg').first();
    
    const regionSummary = await db('dga_entities')
      .select('region')
      .count('* as entity_count')
      .avg('digital_maturity_score as avg_maturity')
      .groupBy('region');
    
    res.json({
      success: true,
      message: 'National overview retrieved successfully',
      data: {
        total_entities: parseInt(totalEntities.count),
        total_programs: parseInt(totalPrograms.count),
        total_budget: parseFloat(totalBudget.total) || 0,
        avg_digital_maturity: parseFloat(avgMaturity.avg) || 0,
        budget_utilization: 82.4, // Will be calculated dynamically
        risk_index: 0.21,
        compliance_score: 96.4,
        region_summary: regionSummary,
      },
    });
  } catch (error) {
    logger.error('Get national overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve national overview',
      error: error.message,
    });
  }
};

exports.getRegionalReport = async (req, res) => {
  try {
    const { region } = req.params;
    
    const entities = await db('dga_entities')
      .where({ region })
      .select('*');
    
    const programs = await db('dga_programs')
      .leftJoin('dga_entities', 'dga_programs.entity_id', 'dga_entities.id')
      .where({ 'dga_entities.region': region })
      .select('dga_programs.*');
    
    const budget = await db('dga_budget')
      .where({ region })
      .sum('allocated as total_allocated')
      .sum('spent as total_spent')
      .first();
    
    res.json({
      success: true,
      message: 'Regional report retrieved successfully',
      data: {
        region,
        entities,
        programs,
        budget,
      },
    });
  } catch (error) {
    logger.error('Get regional report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve regional report',
      error: error.message,
    });
  }
};

exports.getKPIs = async (req, res) => {
  try {
    const kpis = await db('dga_kpi_reports')
      .orderBy('report_date', 'desc')
      .limit(10);
    
    res.json({
      success: true,
      message: 'KPIs retrieved successfully',
      data: { kpis },
    });
  } catch (error) {
    logger.error('Get KPIs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve KPIs',
      error: error.message,
    });
  }
};

// ========== TICKETS ==========

exports.getAllTickets = async (req, res) => {
  try {
    const { status, priority } = req.query;
    
    let query = db('dga_tickets')
      .leftJoin('dga_entities', 'dga_tickets.entity_id', 'dga_entities.id')
      .select('dga_tickets.*', 'dga_entities.entity_name');
    
    if (status) query = query.where({ 'dga_tickets.status': status });
    if (priority) query = query.where({ 'dga_tickets.priority': priority });
    
    const tickets = await query.orderBy('dga_tickets.created_at', 'desc');
    
    res.json({
      success: true,
      message: 'Tickets retrieved successfully',
      data: { tickets },
    });
  } catch (error) {
    logger.error('Get all tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve tickets',
      error: error.message,
    });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const ticketData = req.body;
    
    // Generate ticket number
    const count = await db('dga_tickets').count('* as count').first();
    const ticketNumber = `TKT-${new Date().getFullYear()}-${String(parseInt(count.count) + 1).padStart(6, '0')}`;
    
    const [newTicket] = await db('dga_tickets')
      .insert({ ...ticketData, ticket_number: ticketNumber })
      .returning('*');
    
    logger.info(`New ticket created: ${newTicket.ticket_number}`);
    
    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      data: { ticket: newTicket },
    });
  } catch (error) {
    logger.error('Create ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create ticket',
      error: error.message,
    });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // If status is being set to resolved, add resolved_at timestamp
    if (updateData.status === 'resolved') {
      updateData.resolved_at = new Date();
    }
    
    const [updatedTicket] = await db('dga_tickets')
      .where({ id })
      .update({ ...updateData, updated_at: new Date() })
      .returning('*');
    
    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }
    
    logger.info(`Ticket updated: ${updatedTicket.ticket_number}`);
    
    res.json({
      success: true,
      message: 'Ticket updated successfully',
      data: { ticket: updatedTicket },
    });
  } catch (error) {
    logger.error('Update ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update ticket',
      error: error.message,
    });
  }
};
