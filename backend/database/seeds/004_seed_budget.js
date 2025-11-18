/**
 * Seed File: Budget Allocations
 * 
 * Seeds SAR 2.48B budget distribution across:
 * - 158 entities
 * - 162 programs
 * - Multiple fiscal years (2024, 2025, 2026)
 * - All quarters
 */

const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  // Get all entities and programs
  const entities = await knex('dga_entities').select('entity_id', 'entity_code', 'region');
  const programs = await knex('dga_programs').select('program_id', 'entity_id', 'allocated_budget');
  
  // Delete existing budget records
  await knex('dga_budget').del();

  const budgetRecords = [];
  const fiscalYears = [2024, 2025, 2026];
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const categories = [
    'Capital Expenditure',
    'Operational Expenditure',
    'Staff Costs',
    'Consulting',
    'Infrastructure',
    'Software Licenses',
    'Training',
    'Other'
  ];

  // 1. Entity-level budgets (base operational budgets)
  for (const entity of entities) {
    for (const year of fiscalYears) {
      const yearlyBudget = Math.random() * 30000000 + 5000000; // SAR 5M - 35M per entity per year
      
      for (const quarter of quarters) {
        const quarterBudget = yearlyBudget / 4;
        const spentPercentage = year === 2024 ? 
          (quarters.indexOf(quarter) < 3 ? Math.random() * 0.9 + 0.1 : Math.random() * 0.3) :
          (year === 2025 ? Math.random() * 0.5 : 0);

        budgetRecords.push({
          budget_id: uuidv4(),
          entity_id: entity.entity_id,
          program_id: null,
          project_id: null,
          fiscal_year: year,
          quarter: quarter,
          budget_category: 'Operational Expenditure',
          allocated_amount: quarterBudget.toFixed(2),
          spent_amount: (quarterBudget * spentPercentage).toFixed(2),
          committed_amount: (quarterBudget * 0.1).toFixed(2),
          remaining_amount: (quarterBudget * (1 - spentPercentage - 0.1)).toFixed(2),
          notes: `${entity.entity_code} operational budget for ${year} ${quarter}`,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }
  }

  // 2. Program-level budgets (project-specific)
  for (const program of programs) {
    const programBudget = parseFloat(program.allocated_budget);
    
    // Distribute program budget across years and quarters
    for (const year of [2024, 2025]) {
      const yearlyProgramBudget = programBudget / 2; // Split across 2 years
      
      for (const quarter of quarters) {
        const quarterBudget = yearlyProgramBudget / 4;
        const spentPercentage = year === 2024 ?
          (quarters.indexOf(quarter) < 3 ? Math.random() * 0.7 + 0.1 : Math.random() * 0.3) :
          Math.random() * 0.4;

        const category = categories[Math.floor(Math.random() * categories.length)];

        budgetRecords.push({
          budget_id: uuidv4(),
          entity_id: program.entity_id,
          program_id: program.program_id,
          project_id: null,
          fiscal_year: year,
          quarter: quarter,
          budget_category: category,
          allocated_amount: quarterBudget.toFixed(2),
          spent_amount: (quarterBudget * spentPercentage).toFixed(2),
          committed_amount: (quarterBudget * 0.15).toFixed(2),
          remaining_amount: (quarterBudget * (1 - spentPercentage - 0.15)).toFixed(2),
          notes: `Program budget allocation for ${year} ${quarter}`,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }
  }

  // Insert in batches
  const batchSize = 100;
  for (let i = 0; i < budgetRecords.length; i += batchSize) {
    await knex('dga_budget').insert(budgetRecords.slice(i, i + batchSize));
  }

  // Calculate totals
  const totalAllocated = budgetRecords.reduce((sum, r) => sum + parseFloat(r.allocated_amount), 0);
  const totalSpent = budgetRecords.reduce((sum, r) => sum + parseFloat(r.spent_amount), 0);

  console.log(`✅ Successfully seeded ${budgetRecords.length} budget records`);
  console.log(`   - Total Allocated: SAR ${(totalAllocated / 1000000000).toFixed(2)}B`);
  console.log(`   - Total Spent: SAR ${(totalSpent / 1000000000).toFixed(2)}B`);
  console.log(`   - Utilization Rate: ${((totalSpent / totalAllocated) * 100).toFixed(1)}%`);
  console.log(`   - FY 2024: ${budgetRecords.filter(r => r.fiscal_year === 2024).length} records`);
  console.log(`   - FY 2025: ${budgetRecords.filter(r => r.fiscal_year === 2025).length} records`);
  console.log(`   - FY 2026: ${budgetRecords.filter(r => r.fiscal_year === 2026).length} records`);
};
