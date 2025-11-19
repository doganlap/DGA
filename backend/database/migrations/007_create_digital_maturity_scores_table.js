exports.up = function(knex) {
  return knex.schema.createTable('digital_maturity_scores', function(table) {
    table.increments('score_id').primary();
    table.uuid('entity_id').references('entity_id').inTable('dga_entities').notNullable();
    table.integer('score').notNullable(); // e.g., 1-100
    table.string('maturity_level'); // Basic, Intermediate, Advanced
    table.date('assessment_date').notNullable();
    table.text('recommendations');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('digital_maturity_scores');
};