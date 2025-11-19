const knex = require('knex')(require('./knexfile').development);

async function checkData() {
  try {
    // Check entities
    const entityStats = await knex('dga_entities')
      .select('entity_type')
      .count('* as count')
      .groupBy('entity_type')
      .orderBy('count', 'desc');
    
    console.log('📊 Entity Distribution:');
    entityStats.forEach(row => {
      console.log(`${row.entity_type}: ${row.count}`);
    });
    
    // Check total entities
    const totalEntities = await knex('dga_entities').count('* as total');
    console.log(`\nTotal Entities: ${totalEntities[0].total}`);
    
    // Check programs
    const programStats = await knex('dga_programs')
      .select('status')
      .count('* as count')
      .groupBy('status')
      .orderBy('count', 'desc');
    
    console.log('\n📈 Program Status Distribution:');
    programStats.forEach(row => {
      console.log(`${row.status}: ${row.count}`);
    });
    
    // Check total programs
    const totalPrograms = await knex('dga_programs').count('* as total');
    console.log(`\nTotal Programs: ${totalPrograms[0].total}`);
    
    // Check KPIs
    const totalKPIs = await knex('dga_kpi_reports').count('* as total');
    console.log(`\nTotal KPIs: ${totalKPIs[0].total}`);
    
    // Check budget
    const budgetStats = await knex('dga_budget')
      .sum('allocated_amount as total_allocated')
      .sum('spent_amount as total_spent')
      .first();
    
    console.log('\n💰 Budget Overview:');
    console.log(`Total Allocated: SAR ${(budgetStats.total_allocated / 1000000000).toFixed(2)}B`);
    console.log(`Total Spent: SAR ${(budgetStats.total_spent / 1000000000).toFixed(2)}B`);
    console.log(`Utilization Rate: ${((budgetStats.total_spent / budgetStats.total_allocated) * 100).toFixed(1)}%`);
    
    // Show sample entities
    console.log('\n🏛️ Sample Government Entities:');
    const sampleEntities = await knex('dga_entities')
      .select('entity_name_en', 'entity_name_ar', 'entity_type', 'sector', 'total_budget')
      .limit(10)
      .orderBy('total_budget', 'desc');
    
    sampleEntities.forEach(entity => {
      console.log(`${entity.entity_name_en} (${entity.entity_name_ar}) - ${entity.entity_type} - ${entity.sector} - SAR ${(entity.total_budget / 1000000000).toFixed(1)}B`);
    });
    
  } catch (error) {
    console.error('Error checking data:', error);
  } finally {
    await knex.destroy();
  }
}

checkData();