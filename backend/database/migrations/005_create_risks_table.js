exports.up = function(knex) {
  return knex.schema.createTable('risks', function(table) {
    table.increments('risk_id').primary();
    table.string('risk_description').notNullable();
    table.string('severity').notNullable(); // High, Medium, Low
    table.string('status').notNullable(); // Open, Mitigated, Closed
    table.text('mitigation_plan');
    table.uuid('program_id').references('program_id').inTable('dga_programs');
    table.uuid('entity_id').references('entity_id').inTable('dga_entities');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('risks');
};