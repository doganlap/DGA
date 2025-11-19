const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {
  await knex('compliance_records').del();

  const records = [];
  const programIds = await knex('dga_programs').pluck('program_id');
  const entityIds = await knex('dga_entities').pluck('entity_id');
  const standards = ['NCA ECC', 'PDPL', 'ISO 27001', 'Vision 2030 Compliance', 'Cybersecurity Framework'];

  for (let i = 0; i < 1500; i++) { // Aggressive: 1500 records
    records.push({
      standard_name: faker.helpers.arrayElement(standards),
      status: faker.helpers.arrayElement(['Compliant', 'Non-Compliant', 'In Progress', 'Under Review']),
      notes: faker.lorem.paragraph(),
      entity_id: faker.helpers.arrayElement(entityIds),
      program_id: faker.helpers.arrayElement(programIds),
      audit_date: faker.date.past({ years: 1 }),
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  await knex('compliance_records').insert(records);
  console.log('Seeded 1500 compliance records');
};