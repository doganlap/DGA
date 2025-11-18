/**
 * Seed File: DGA Programs
 * 
 * Seeds 162 digital transformation programs across 158 entities
 * Programs distributed based on entity size and sector
 */

const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  // Get all entities
  const entities = await knex('dga_entities').select('entity_id', 'entity_code', 'region', 'sector');
  
  // Delete existing programs
  await knex('dga_programs').del();

  const programTypes = [
    'Digital Transformation',
    'Infrastructure',
    'Service Delivery',
    'Security',
    'Data Management',
    'Cloud Migration',
    'AI & Analytics',
    'Cybersecurity',
    'E-Government',
    'Other'
  ];

  const statuses = ['Planning', 'In Progress', 'On Hold', 'Completed'];
  const priorities = ['Critical', 'High', 'Medium', 'Low'];

  const programs = [];
  let programCounter = 1;

  // Major entities get 2-3 programs, others get 1
  const majorEntities = ['MOI', 'SDAIA', 'NCA', 'MOH', 'MOE', 'ZATCA', 'ARAMCO', 'NEOM', 'MOHJ'];
  
  for (const entity of entities) {
    const programCount = majorEntities.includes(entity.entity_code) ? 
      Math.floor(Math.random() * 2) + 2 : // 2-3 programs
      1; // 1 program

    for (let i = 0; i < programCount; i++) {
      const startDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 18) + 12); // 12-30 months

      const allocatedBudget = (Math.random() * 20000000 + 2000000).toFixed(2);
      const spentPercentage = Math.random() * 0.7; // 0-70% spent
      const completionPercentage = Math.floor(spentPercentage * 100 + Math.random() * 20);

      programs.push({
        program_id: uuidv4(),
        program_code: `PGM-${String(programCounter).padStart(4, '0')}`,
        program_name: generateProgramName(entity.sector, programTypes[Math.floor(Math.random() * programTypes.length)]),
        entity_id: entity.entity_id,
        description: `Digital transformation initiative for ${entity.entity_code}`,
        program_type: programTypes[Math.floor(Math.random() * programTypes.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        start_date: startDate,
        end_date: endDate,
        actual_end_date: null,
        allocated_budget: allocatedBudget,
        spent_budget: (allocatedBudget * spentPercentage).toFixed(2),
        completion_percentage: completionPercentage,
        program_director: null, // Will be set after users are created
        total_projects: Math.floor(Math.random() * 5) + 1,
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        created_at: new Date(),
        updated_at: new Date()
      });

      programCounter++;
    }
  }

  // Insert in batches
  const batchSize = 50;
  for (let i = 0; i < programs.length; i += batchSize) {
    await knex('dga_programs').insert(programs.slice(i, i + batchSize));
  }

  console.log(`✅ Successfully seeded ${programs.length} programs`);
  console.log(`   - Digital Transformation: ${programs.filter(p => p.program_type === 'Digital Transformation').length}`);
  console.log(`   - Cybersecurity: ${programs.filter(p => p.program_type === 'Cybersecurity').length}`);
  console.log(`   - Cloud Migration: ${programs.filter(p => p.program_type === 'Cloud Migration').length}`);
  console.log(`   - AI & Analytics: ${programs.filter(p => p.program_type === 'AI & Analytics').length}`);
  console.log(`   - Others: ${programs.filter(p => !['Digital Transformation', 'Cybersecurity', 'Cloud Migration', 'AI & Analytics'].includes(p.program_type)).length}`);
};

function generateProgramName(sector, programType) {
  const sectorNames = {
    'Health': 'Healthcare',
    'Education': 'Education',
    'Interior': 'Security',
    'Defense': 'Defense',
    'Economy': 'Economic',
    'Justice': 'Justice',
    'Transport': 'Transportation',
    'Energy': 'Energy',
    'Tourism': 'Tourism',
    'Environment': 'Environmental',
    'Social Development': 'Social Services',
    'Culture': 'Cultural',
    'Technology': 'Technology',
    'Other': 'Government'
  };

  const typeNames = {
    'Digital Transformation': 'Digital Transformation',
    'Infrastructure': 'Infrastructure Modernization',
    'Service Delivery': 'Service Enhancement',
    'Security': 'Security Enhancement',
    'Data Management': 'Data Management',
    'Cloud Migration': 'Cloud Adoption',
    'AI & Analytics': 'AI & Analytics',
    'Cybersecurity': 'Cybersecurity',
    'E-Government': 'E-Government',
    'Other': 'Strategic Initiative'
  };

  return `${sectorNames[sector] || 'Government'} ${typeNames[programType]}`;
}
