const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('kpis').del();

  const kpis = [];
  const programIds = await knex('dga_programs').pluck('program_id');
  const entityIds = await knex('dga_entities').pluck('entity_id');

  for (let i = 0; i < 1000; i++) { // Aggressive: 1000 KPIs
    kpis.push({
      kpi_name: faker.helpers.arrayElement(['Digital Adoption Rate', 'System Uptime', 'User Satisfaction Score', 'Budget Utilization', 'Compliance Achievement', 'Innovation Index', 'Data Security Incidents', 'Digital Service Coverage']),
      description: faker.lorem.sentence(),
      target_value: faker.number.int({min: 80, max: 100}).toString() + '%',
      current_value: faker.number.int({min: 50, max: 99}).toString() + '%',
      program_id: faker.helpers.arrayElement(programIds),
      entity_id: faker.helpers.arrayElement(entityIds),
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  await knex('kpis').insert(kpis);
  console.log('Seeded 1000 KPIs');
};