const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {
  await knex('risks').del();

  const risks = [];
  const programIds = await knex('dga_programs').pluck('program_id');
  const entityIds = await knex('dga_entities').pluck('entity_id');
  const severities = ['High', 'Medium', 'Low'];
  const statuses = ['Open', 'Mitigated', 'Closed'];

  for (let i = 0; i < 800; i++) { // Aggressive: 800 risks
    risks.push({
      risk_description: faker.lorem.sentence() + ' risk in digital transformation.',
      severity: faker.helpers.arrayElement(severities),
      status: faker.helpers.arrayElement(statuses),
      mitigation_plan: faker.lorem.paragraph(),
      program_id: faker.helpers.arrayElement(programIds),
      entity_id: faker.helpers.arrayElement(entityIds),
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  await knex('risks').insert(risks);
  console.log('Seeded 800 risks');
};