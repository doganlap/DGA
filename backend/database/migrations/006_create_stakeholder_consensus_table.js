exports.up = function(knex) {
  return knex.schema.createTable('stakeholder_consensus', function(table) {
    table.increments('consensus_id').primary();
    table.string('topic').notNullable();
    table.string('status').notNullable(); // Pending, Approved, Rejected
    table.integer('votes_for').defaultTo(0);
    table.integer('votes_against').defaultTo(0);
    table.uuid('program_id').references('program_id').inTable('dga_programs');
    table.uuid('initiator_id').references('user_id').inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('stakeholder_consensus');
};