const knex = require('knex')(require('../knexfile').development);

knex.migrate.latest()
  .then(() => {
    console.log('✅ All migrations completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
