const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {
  await knex('digital_maturity_scores').del();

  const scores = [];
  const entityIds = await knex('dga_entities').pluck('entity_id');
  const levels = ['Basic', 'Intermediate', 'Advanced'];

  for (const entityId of entityIds) { // One per entity for richness
    scores.push({
      entity_id: entityId,
      score: faker.number.int({min: 40, max: 100}),
      maturity_level: faker.helpers.arrayElement(levels),
      assessment_date: faker.date.past(),
      recommendations: faker.lorem.paragraphs(2),
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  // Add extra for aggressiveness: 200 more random
  for (let i = 0; i < 200; i++) {
    scores.push({
      entity_id: faker.helpers.arrayElement(entityIds),
      score: faker.number.int({min: 40, max: 100}),
      maturity_level: faker.helpers.arrayElement(levels),
      assessment_date: faker.date.past(),
      recommendations: faker.lorem.paragraphs(2),
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  await knex('digital_maturity_scores').insert(scores);
  console.log(`Seeded ${scores.length} digital maturity scores`);
};