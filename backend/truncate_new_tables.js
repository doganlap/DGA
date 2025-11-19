const knex = require('knex')(require('./knexfile').development);

(async () => {
  try {
    await knex.raw(`
      TRUNCATE TABLE kpis, compliance_records, risks, stakeholder_consensus, digital_maturity_scores CASCADE;
    `);
    console.log('Truncated new tables with CASCADE');
    process.exit(0);
  } catch (err) {
    console.error('Truncate failed:', err);
    process.exit(1);
  }
})();