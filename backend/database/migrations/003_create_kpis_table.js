exports.up = function(knex) {
  return knex.schema.createTable('kpis', function(table) {
    table.increments('kpi_id').primary();
    table.string('kpi_name').notNullable();
    table.string('description');
    table.string('target_value');
    table.string('current_value');
    table.uuid('program_id').references('program_id').inTable('dga_programs');
    table.uuid('entity_id').references('entity_id').inTable('dga_entities');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('kpis');
};