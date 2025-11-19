exports.up = function(knex) {
  return knex.schema.createTable('compliance_records', function(table) {
    table.increments('compliance_id').primary();
    table.string('standard_name').notNullable(); // e.g., NCA ECC, PDPL
    table.string('status').notNullable(); // Compliant, Non-Compliant, In Progress
    table.text('notes');
    table.uuid('entity_id').references('entity_id').inTable('dga_entities');
    table.uuid('program_id').references('program_id').inTable('dga_programs');
    table.date('audit_date');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('compliance_records');
};