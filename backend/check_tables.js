const knex = require('knex')(require('./knexfile').development);

(async () => {
  try {
    const tables = await knex.raw(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('kpis', 'compliance_records', 'risks', 'stakeholder_consensus', 'digital_maturity_scores')
    `);
    console.log('New tables:', tables.rows.map(row => row.table_name));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();