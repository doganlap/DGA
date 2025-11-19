/**
 * Migration: Create Finance Tables for DGA Demo
 * Tables: dga_contracts, dga_invoices
 */

exports.up = async function(knex) {
  // Create contracts table
  await knex.schema.createTable('dga_contracts', (table) => {
    table.uuid('contract_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('contract_number', 50).notNullable().unique();
    table.uuid('entity_id').notNullable().references('entity_id').inTable('dga_entities').onDelete('CASCADE');
    table.uuid('program_id').references('program_id').inTable('dga_programs').onDelete('SET NULL');
    table.string('vendor', 255).notNullable();
    table.string('service_description', 500).notNullable();
    table.decimal('contract_value', 15, 2).notNullable();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.enum('status', ['Active','Under Review','Closed']).defaultTo('Active');
    table.text('notes');
    table.timestamps(true, true);
    
    table.index(['entity_id']);
    table.index(['contract_number']);
    table.index(['status']);
  });

  // Create invoices table
  await knex.schema.createTable('dga_invoices', (table) => {
    table.uuid('invoice_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('invoice_number', 50).notNullable().unique();
    table.string('contract_number', 50).notNullable().references('contract_number').inTable('dga_contracts').onDelete('CASCADE');
    table.decimal('amount', 15, 2).notNullable();
    table.date('due_date').notNullable();
    table.enum('status', ['Paid','Pending','Overdue']).defaultTo('Pending');
    table.date('paid_date');
    table.text('description');
    table.timestamps(true, true);
    
    table.index(['contract_number']);
    table.index(['status']);
    table.index(['due_date']);
  });

  console.log('✅ Finance tables created');
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('dga_invoices');
  await knex.schema.dropTableIfExists('dga_contracts');
  console.log('✅ Finance tables dropped');
};