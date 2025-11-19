const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {
  await knex('stakeholder_consensus').del();

  const consensusEntries = [];
  const programIds = await knex('dga_programs').pluck('program_id');
  const userIds = await knex('users').pluck('user_id');
  const statuses = ['Pending', 'Approved', 'Rejected'];

  for (let i = 0; i < 500; i++) { // Aggressive: 500 consensus entries
    consensusEntries.push({
      topic: faker.lorem.words(5) + ' consensus request.',
      status: faker.helpers.arrayElement(statuses),
      votes_for: faker.number.int({min: 0, max: 20}),
      votes_against: faker.number.int({min: 0, max: 10}),
      program_id: faker.helpers.arrayElement(programIds),
      initiator_id: faker.helpers.arrayElement(userIds),
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  await knex('stakeholder_consensus').insert(consensusEntries);
  console.log('Seeded 500 stakeholder consensus entries');
};