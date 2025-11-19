const knex = require('knex')(require('../knexfile').development);

async function runSeeds() {
  try {
    await require('./seeds/001_seed_entities').seed(knex);
    await require('./seeds/002_seed_programs').seed(knex);
    await require('./seeds/003_seed_users').seed(knex);
    await require('./seeds/004_seed_budget').seed(knex);
    await require('./seeds/005_seed_kpis').seed(knex);
    await require('./seeds/006_seed_compliance_records').seed(knex);
    await require('./seeds/007_seed_risks').seed(knex);
    await require('./seeds/008_seed_stakeholder_consensus').seed(knex);
    await require('./seeds/009_seed_digital_maturity_scores').seed(knex);
    console.log('✅ All seeds completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  }
}

runSeeds()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
