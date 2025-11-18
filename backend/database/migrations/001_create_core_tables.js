/**
 * Migration: Create Core Tables for DGA Oversight Platform
 * 
 * Tables Created:
 * 1. users - User accounts and authentication
 * 2. dga_entities - Government entities (ministries, agencies)
 * 3. dga_programs - Digital transformation programs
 * 4. dga_projects - Implementation projects
 * 5. dga_budget - Budget allocations and tracking
 * 6. dga_kpi_reports - Performance KPIs
 * 7. dga_milestones - Project milestones
 * 8. dga_audit_trail - Audit logs
 * 9. dga_tickets - Support tickets
 * 10. dga_notifications - System notifications
 */

exports.up = async function(knex) {
  // 1. Users Table
  await knex.schema.createTable('users', (table) => {
    table.uuid('user_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email', 255).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.string('full_name', 255).notNullable();
    table.string('phone', 50);
    table.enum('role', [
      'dga_admin',
      'regional_manager',
      'program_director',
      'financial_controller',
      'compliance_auditor',
      'analytics_lead',
      'ministry_user'
    ]).notNullable().defaultTo('ministry_user');
    table.enum('region', [
      'Central',
      'Western',
      'Eastern',
      'Northern',
      'Southern'
    ]);
    table.uuid('entity_id'); // FK added later
    table.boolean('is_active').defaultTo(true);
    table.timestamp('last_login');
    table.timestamps(true, true);
    
    table.index(['email']);
    table.index(['role']);
    table.index(['region']);
  });

  // 2. DGA Entities Table
  await knex.schema.createTable('dga_entities', (table) => {
    table.uuid('entity_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('entity_code', 50).notNullable().unique();
    table.string('entity_name_en', 255).notNullable();
    table.string('entity_name_ar', 255).notNullable();
    table.enum('entity_type', [
      'Ministry',
      'Authority',
      'Agency',
      'Commission',
      'Center',
      'Municipality',
      'Corporation'
    ]).notNullable();
    table.enum('region', [
      'Central',
      'Western',
      'Eastern',
      'Northern',
      'Southern'
    ]).notNullable();
    table.enum('sector', [
      'Health',
      'Education',
      'Interior',
      'Defense',
      'Economy',
      'Justice',
      'Transport',
      'Energy',
      'Tourism',
      'Environment',
      'Social Development',
      'Culture',
      'Technology',
      'Other'
    ]).notNullable();
    table.string('location_city', 100).notNullable();
    table.string('contact_email', 255);
    table.string('contact_phone', 50);
    table.text('description');
    table.enum('status', ['Active', 'Inactive', 'Under Review']).defaultTo('Active');
    table.integer('total_programs').defaultTo(0);
    table.integer('active_programs').defaultTo(0);
    table.decimal('total_budget', 15, 2).defaultTo(0);
    table.timestamps(true, true);
    
    table.index(['entity_code']);
    table.index(['region']);
    table.index(['sector']);
    table.index(['status']);
  });

  // 3. DGA Programs Table
  await knex.schema.createTable('dga_programs', (table) => {
    table.uuid('program_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('program_code', 50).notNullable().unique();
    table.string('program_name', 255).notNullable();
    table.uuid('entity_id').notNullable().references('entity_id').inTable('dga_entities').onDelete('CASCADE');
    table.text('description');
    table.enum('program_type', [
      'Digital Transformation',
      'Infrastructure',
      'Service Delivery',
      'Security',
      'Data Management',
      'Cloud Migration',
      'AI & Analytics',
      'Cybersecurity',
      'E-Government',
      'Other'
    ]).notNullable();
    table.enum('status', [
      'Planning',
      'In Progress',
      'On Hold',
      'Completed',
      'Cancelled'
    ]).notNullable().defaultTo('Planning');
    table.date('start_date').notNullable();
    table.date('end_date');
    table.date('actual_end_date');
    table.decimal('allocated_budget', 15, 2).notNullable();
    table.decimal('spent_budget', 15, 2).defaultTo(0);
    table.integer('completion_percentage').defaultTo(0);
    table.uuid('program_director'); // FK to users
    table.integer('total_projects').defaultTo(0);
    table.enum('priority', ['Critical', 'High', 'Medium', 'Low']).defaultTo('Medium');
    table.timestamps(true, true);
    
    table.index(['entity_id']);
    table.index(['status']);
    table.index(['program_type']);
    table.index(['program_director']);
  });

  // 4. DGA Projects Table
  await knex.schema.createTable('dga_projects', (table) => {
    table.uuid('project_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('project_code', 50).notNullable().unique();
    table.string('project_name', 255).notNullable();
    table.uuid('program_id').notNullable().references('program_id').inTable('dga_programs').onDelete('CASCADE');
    table.uuid('entity_id').notNullable().references('entity_id').inTable('dga_entities').onDelete('CASCADE');
    table.text('description');
    table.enum('status', [
      'Proposed',
      'Approved',
      'In Progress',
      'Testing',
      'Deployed',
      'Cancelled'
    ]).notNullable().defaultTo('Proposed');
    table.date('start_date');
    table.date('end_date');
    table.date('actual_end_date');
    table.decimal('allocated_budget', 15, 2).notNullable();
    table.decimal('spent_budget', 15, 2).defaultTo(0);
    table.integer('completion_percentage').defaultTo(0);
    table.uuid('project_manager'); // FK to users
    table.string('vendor_name', 255);
    table.integer('total_milestones').defaultTo(0);
    table.integer('completed_milestones').defaultTo(0);
    table.timestamps(true, true);
    
    table.index(['program_id']);
    table.index(['entity_id']);
    table.index(['status']);
    table.index(['project_manager']);
  });

  // 5. DGA Budget Table
  await knex.schema.createTable('dga_budget', (table) => {
    table.uuid('budget_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('entity_id').notNullable().references('entity_id').inTable('dga_entities').onDelete('CASCADE');
    table.uuid('program_id').references('program_id').inTable('dga_programs').onDelete('CASCADE');
    table.uuid('project_id').references('project_id').inTable('dga_projects').onDelete('CASCADE');
    table.integer('fiscal_year').notNullable();
    table.enum('quarter', ['Q1', 'Q2', 'Q3', 'Q4']);
    table.enum('budget_category', [
      'Capital Expenditure',
      'Operational Expenditure',
      'Staff Costs',
      'Consulting',
      'Infrastructure',
      'Software Licenses',
      'Training',
      'Other'
    ]).notNullable();
    table.decimal('allocated_amount', 15, 2).notNullable();
    table.decimal('spent_amount', 15, 2).defaultTo(0);
    table.decimal('committed_amount', 15, 2).defaultTo(0);
    table.decimal('remaining_amount', 15, 2).notNullable();
    table.text('notes');
    table.timestamps(true, true);
    
    table.index(['entity_id']);
    table.index(['program_id']);
    table.index(['project_id']);
    table.index(['fiscal_year']);
  });

  // 6. DGA KPI Reports Table
  await knex.schema.createTable('dga_kpi_reports', (table) => {
    table.uuid('kpi_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('entity_id').notNullable().references('entity_id').inTable('dga_entities').onDelete('CASCADE');
    table.uuid('program_id').references('program_id').inTable('dga_programs').onDelete('SET NULL');
    table.string('kpi_name', 255).notNullable();
    table.string('kpi_category', 100).notNullable();
    table.decimal('target_value', 15, 2).notNullable();
    table.decimal('actual_value', 15, 2).notNullable();
    table.string('unit', 50);
    table.date('reporting_period_start').notNullable();
    table.date('reporting_period_end').notNullable();
    table.enum('status', ['On Track', 'At Risk', 'Off Track']).notNullable();
    table.text('comments');
    table.uuid('reported_by').references('user_id').inTable('users');
    table.timestamps(true, true);
    
    table.index(['entity_id']);
    table.index(['program_id']);
    table.index(['reporting_period_start']);
  });

  // 7. DGA Milestones Table
  await knex.schema.createTable('dga_milestones', (table) => {
    table.uuid('milestone_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('project_id').notNullable().references('project_id').inTable('dga_projects').onDelete('CASCADE');
    table.string('milestone_name', 255).notNullable();
    table.text('description');
    table.date('planned_date').notNullable();
    table.date('actual_date');
    table.enum('status', ['Pending', 'In Progress', 'Completed', 'Delayed']).defaultTo('Pending');
    table.integer('completion_percentage').defaultTo(0);
    table.text('deliverables');
    table.text('notes');
    table.timestamps(true, true);
    
    table.index(['project_id']);
    table.index(['status']);
  });

  // 8. DGA Audit Trail Table
  await knex.schema.createTable('dga_audit_trail', (table) => {
    table.uuid('audit_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE');
    table.enum('action_type', [
      'CREATE',
      'UPDATE',
      'DELETE',
      'LOGIN',
      'LOGOUT',
      'EXPORT',
      'APPROVE',
      'REJECT'
    ]).notNullable();
    table.string('table_name', 100);
    table.uuid('record_id');
    table.jsonb('old_values');
    table.jsonb('new_values');
    table.string('ip_address', 50);
    table.string('user_agent', 500);
    table.timestamp('action_timestamp').defaultTo(knex.fn.now());
    
    table.index(['user_id']);
    table.index(['action_type']);
    table.index(['table_name']);
    table.index(['action_timestamp']);
  });

  // 9. DGA Tickets Table
  await knex.schema.createTable('dga_tickets', (table) => {
    table.uuid('ticket_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('ticket_number', 50).notNullable().unique();
    table.uuid('entity_id').references('entity_id').inTable('dga_entities').onDelete('SET NULL');
    table.uuid('program_id').references('program_id').inTable('dga_programs').onDelete('SET NULL');
    table.uuid('created_by').notNullable().references('user_id').inTable('users');
    table.uuid('assigned_to').references('user_id').inTable('users');
    table.string('subject', 255).notNullable();
    table.text('description').notNullable();
    table.enum('category', [
      'Technical Issue',
      'Access Request',
      'Data Correction',
      'Feature Request',
      'Bug Report',
      'Training',
      'Other'
    ]).notNullable();
    table.enum('priority', ['Critical', 'High', 'Medium', 'Low']).defaultTo('Medium');
    table.enum('status', ['Open', 'In Progress', 'Resolved', 'Closed']).defaultTo('Open');
    table.text('resolution');
    table.timestamp('resolved_at');
    table.timestamps(true, true);
    
    table.index(['ticket_number']);
    table.index(['created_by']);
    table.index(['assigned_to']);
    table.index(['status']);
  });

  // 10. DGA Notifications Table
  await knex.schema.createTable('dga_notifications', (table) => {
    table.uuid('notification_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE');
    table.string('title', 255).notNullable();
    table.text('message').notNullable();
    table.enum('type', ['Info', 'Warning', 'Alert', 'Success']).defaultTo('Info');
    table.boolean('is_read').defaultTo(false);
    table.string('link', 500);
    table.timestamp('read_at');
    table.timestamps(true, true);
    
    table.index(['user_id']);
    table.index(['is_read']);
  });

  // Add Foreign Keys
  await knex.schema.alterTable('users', (table) => {
    table.foreign('entity_id').references('entity_id').inTable('dga_entities').onDelete('SET NULL');
  });

  await knex.schema.alterTable('dga_programs', (table) => {
    table.foreign('program_director').references('user_id').inTable('users').onDelete('SET NULL');
  });

  await knex.schema.alterTable('dga_projects', (table) => {
    table.foreign('project_manager').references('user_id').inTable('users').onDelete('SET NULL');
  });

  console.log('✅ All tables created successfully');
};

exports.down = async function(knex) {
  // Drop tables in reverse order to avoid FK constraint issues
  await knex.schema.dropTableIfExists('dga_notifications');
  await knex.schema.dropTableIfExists('dga_tickets');
  await knex.schema.dropTableIfExists('dga_audit_trail');
  await knex.schema.dropTableIfExists('dga_milestones');
  await knex.schema.dropTableIfExists('dga_kpi_reports');
  await knex.schema.dropTableIfExists('dga_budget');
  await knex.schema.dropTableIfExists('dga_projects');
  await knex.schema.dropTableIfExists('dga_programs');
  await knex.schema.dropTableIfExists('dga_entities');
  await knex.schema.dropTableIfExists('users');
  
  console.log('✅ All tables dropped successfully');
};
