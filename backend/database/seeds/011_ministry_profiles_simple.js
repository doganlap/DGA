const { faker } = require('@faker-js/faker');

exports.seed = async (knex) => {
  console.log('🚀 Seeding comprehensive KSA government entities with individual profiles...');
  
  // Clear existing data in correct order (due to foreign key constraints)
  // Use CASCADE to handle foreign key relationships properly
  await knex.raw('TRUNCATE TABLE dga_kpi_reports CASCADE');
  await knex.raw('TRUNCATE TABLE dga_milestones CASCADE');
  await knex.raw('TRUNCATE TABLE dga_audit_trail CASCADE');
  await knex.raw('TRUNCATE TABLE dga_tickets CASCADE');
  await knex.raw('TRUNCATE TABLE dga_notifications CASCADE');
  await knex.raw('TRUNCATE TABLE dga_budget CASCADE');
  await knex.raw('TRUNCATE TABLE dga_projects CASCADE');
  await knex.raw('TRUNCATE TABLE dga_programs CASCADE');
  await knex.raw('TRUNCATE TABLE dga_entities CASCADE');
  
  // Comprehensive list of KSA government entities with individual profiles
  const entities = [
    // Ministries
    {
      entity_id: faker.string.uuid(),
      entity_code: 'MOH',
      entity_name_en: 'Ministry of Health',
      entity_name_ar: 'وزارة الصحة',
      entity_type: 'Ministry',
      region: 'Central',
      sector: 'Health',
      location_city: 'Riyadh',
      contact_email: 'info@moh.gov.sa',
      contact_phone: '+966-11-212-5555',
      description: 'Responsible for healthcare services, public health, and medical regulations across the Kingdom.',
      status: 'Active',
      total_programs: 38,
      active_programs: 15,
      total_budget: 68000000000 // SAR 68B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'MOE',
      entity_name_en: 'Ministry of Education',
      entity_name_ar: 'وزارة التعليم',
      entity_type: 'Ministry',
      region: 'Central',
      sector: 'Education',
      location_city: 'Riyadh',
      contact_email: 'info@moe.gov.sa',
      contact_phone: '+966-11-441-5555',
      description: 'Oversees education system from primary to higher education.',
      status: 'Active',
      total_programs: 53,
      active_programs: 22,
      total_budget: 189000000000 // SAR 189B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'MOI',
      entity_name_en: 'Ministry of Interior',
      entity_name_ar: 'وزارة الداخلية',
      entity_type: 'Ministry',
      region: 'Central',
      sector: 'Interior',
      location_city: 'Riyadh',
      contact_email: 'info@moi.gov.sa',
      contact_phone: '+966-11-401-5555',
      description: 'Responsible for internal security, civil defense, and public safety.',
      status: 'Active',
      total_programs: 45,
      active_programs: 18,
      total_budget: 95000000000 // SAR 95B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'MOD',
      entity_name_en: 'Ministry of Defense',
      entity_name_ar: 'وزارة الدفاع',
      entity_type: 'Ministry',
      region: 'Central',
      sector: 'Defense',
      location_city: 'Riyadh',
      contact_email: 'info@mod.gov.sa',
      contact_phone: '+966-11-477-5555',
      description: 'Responsible for national defense and military affairs.',
      status: 'Active',
      total_programs: 32,
      active_programs: 12,
      total_budget: 185000000000 // SAR 185B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'MOF',
      entity_name_en: 'Ministry of Finance',
      entity_name_ar: 'وزارة المالية',
      entity_type: 'Ministry',
      region: 'Central',
      sector: 'Economy',
      location_city: 'Riyadh',
      contact_email: 'info@mof.gov.sa',
      contact_phone: '+966-11-405-5555',
      description: 'Manages national budget, taxation, and financial policy.',
      status: 'Active',
      total_programs: 28,
      active_programs: 11,
      total_budget: 250000000000 // SAR 250B
    },
    // Regional Municipalities
    {
      entity_id: faker.string.uuid(),
      entity_code: 'MAR',
      entity_name_en: 'Municipality of Riyadh',
      entity_name_ar: 'أمانة منطقة الرياض',
      entity_type: 'Municipality',
      region: 'Central',
      sector: 'Other',
      location_city: 'Riyadh',
      contact_email: 'info@mar.gov.sa',
      contact_phone: '+966-11-401-9999',
      description: 'Manages urban planning, infrastructure, and municipal services in Riyadh.',
      status: 'Active',
      total_programs: 42,
      active_programs: 16,
      total_budget: 45000000000 // SAR 45B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'MAJ',
      entity_name_en: 'Municipality of Jeddah',
      entity_name_ar: 'أمانة محافظة جدة',
      entity_type: 'Municipality',
      region: 'Western',
      sector: 'Other',
      location_city: 'Jeddah',
      contact_email: 'info@maj.gov.sa',
      contact_phone: '+966-12-651-9999',
      description: 'Oversees urban development and municipal services in Jeddah.',
      status: 'Active',
      total_programs: 35,
      active_programs: 14,
      total_budget: 35000000000 // SAR 35B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'MAD',
      entity_name_en: 'Municipality of Dammam',
      entity_name_ar: 'أمانة المنطقة الشرقية',
      entity_type: 'Municipality',
      region: 'Eastern',
      sector: 'Other',
      location_city: 'Dammam',
      contact_email: 'info@mad.gov.sa',
      contact_phone: '+966-13-833-9999',
      description: 'Manages urban development in the Eastern Province.',
      status: 'Active',
      total_programs: 31,
      active_programs: 12,
      total_budget: 28000000000 // SAR 28B
    },
    // Specialized Agencies
    {
      entity_id: faker.string.uuid(),
      entity_code: 'SDAIA',
      entity_name_en: 'Saudi Data and AI Authority',
      entity_name_ar: 'الهيئة السعودية للبيانات والذكاء الاصطناعي',
      entity_type: 'Authority',
      region: 'Central',
      sector: 'Other',
      location_city: 'Riyadh',
      contact_email: 'info@sdaia.gov.sa',
      contact_phone: '+966-11-211-5555',
      description: 'Leading national data and AI initiatives for Vision 2030.',
      status: 'Active',
      total_programs: 24,
      active_programs: 8,
      total_budget: 15000000000 // SAR 15B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'NCA',
      entity_name_en: 'National Cybersecurity Authority',
      entity_name_ar: 'الهيئة الوطنية للأمن السيبراني',
      entity_type: 'Authority',
      region: 'Central',
      sector: 'Other',
      location_city: 'Riyadh',
      contact_email: 'info@nca.gov.sa',
      contact_phone: '+966-11-203-5555',
      description: 'Protecting Saudi Arabia\'s cyberspace and critical infrastructure.',
      status: 'Active',
      total_programs: 18,
      active_programs: 6,
      total_budget: 8000000000 // SAR 8B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'SAMA',
      entity_name_en: 'Saudi Central Bank',
      entity_name_ar: 'البنك المركزي السعودي',
      entity_type: 'Authority',
      region: 'Central',
      sector: 'Other',
      location_city: 'Riyadh',
      contact_email: 'info@sama.gov.sa',
      contact_phone: '+966-11-463-3000',
      description: 'Central bank responsible for monetary policy and financial stability.',
      status: 'Active',
      total_programs: 21,
      active_programs: 7,
      total_budget: 25000000000 // SAR 25B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'MISA',
      entity_name_en: 'General Authority for Investment',
      entity_name_ar: 'الهيئة العامة للاستثمار',
      entity_type: 'Authority',
      region: 'Central',
      sector: 'Other',
      location_city: 'Riyadh',
      contact_email: 'info@misa.gov.sa',
      contact_phone: '+966-11-203-3333',
      description: 'Promoting and facilitating investment in Saudi Arabia.',
      status: 'Active',
      total_programs: 16,
      active_programs: 5,
      total_budget: 12000000000 // SAR 12B
    },
    {
      entity_id: faker.string.uuid(),
      entity_code: 'GACA',
      entity_name_en: 'General Authority of Civil Aviation',
      entity_name_ar: 'الهيئة العامة للطيران المدني',
      entity_type: 'Authority',
      region: 'Central',
      sector: 'Other',
      location_city: 'Riyadh',
      contact_email: 'info@gaca.gov.sa',
      contact_phone: '+966-11-220-5555',
      description: 'Regulating and developing civil aviation in Saudi Arabia.',
      status: 'Active',
      total_programs: 22,
      active_programs: 9,
      total_budget: 18000000000 // SAR 18B
    }
  ];

  // Add more entities for comprehensive coverage
  const additionalEntities = [];
  const entityTypes = ['Ministry', 'Authority', 'Agency', 'Commission', 'Center', 'Municipality', 'Corporation'];
  const sectors = ['Health', 'Education', 'Interior', 'Defense', 'Economy', 'Justice', 'Transport', 'Energy', 'Tourism', 'Environment', 'Social Development', 'Culture', 'Technology', 'Other'];
  const regions = ['Central', 'Western', 'Eastern', 'Northern', 'Southern'];
  
  for (let i = 0; i < 25; i++) {
    additionalEntities.push({
      entity_id: faker.string.uuid(),
      entity_code: faker.string.alphanumeric(4).toUpperCase(),
      entity_name_en: `${faker.company.name()} ${entityTypes[Math.floor(Math.random() * entityTypes.length)]}`,
      entity_name_ar: `${faker.company.name()} ${entityTypes[Math.floor(Math.random() * entityTypes.length)]}`,
      entity_type: entityTypes[Math.floor(Math.random() * entityTypes.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      location_city: faker.location.city(),
      contact_email: faker.internet.email(),
      contact_phone: faker.phone.number('+966-1#-###-####'),
      description: faker.lorem.paragraph(),
      status: 'Active',
      total_programs: faker.number.int({min:5,max:40}),
      active_programs: faker.number.int({min:2,max:20}),
      total_budget: faker.number.int({min:1000000000,max:30000000000}) // SAR 1B-30B
    });
  }

  // Combine all entities
  const allEntities = [...entities, ...additionalEntities];
  
  // Insert entities
  await knex('dga_entities').insert(allEntities);
  
  console.log(`✅ Successfully seeded ${allEntities.length} government entities with comprehensive profiles`);
  
  // Create individual ministry profiles with detailed KPIs
  console.log('📊 Creating ministry-specific KPIs and dashboards...');
  
  // Add ministry-specific programs
  const ministryPrograms = [];
  allEntities.forEach(entity => {
    const programCount = faker.number.int({min:2,max:8});
    for (let i = 0; i < programCount; i++) {
      ministryPrograms.push({
        program_id: faker.string.uuid(),
        program_code: `${entity.entity_code}-DTP-${i + 1}`,
        program_name: `${entity.entity_name_en} Digital Transformation Program ${i + 1}`,
        entity_id: entity.entity_id,
        description: faker.lorem.paragraph(),
        program_type: faker.helpers.arrayElement(['Digital Transformation', 'Infrastructure', 'Service Delivery', 'Security', 'Data Management', 'Cloud Migration', 'AI & Analytics', 'Cybersecurity', 'E-Government', 'Other']),
        status: faker.helpers.arrayElement(['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled']),
        start_date: faker.date.past(),
        end_date: faker.date.future(),
        actual_end_date: null,
        allocated_budget: faker.number.int({min:100000000,max:5000000000}), // SAR 100M-5B
        spent_budget: faker.number.int({min:50000000,max:4000000000}),
        completion_percentage: faker.number.int({min:15,max:95}),
        program_director: null,
        total_projects: faker.number.int({min:1,max:10}),
        priority: faker.helpers.arrayElement(['Critical', 'High', 'Medium', 'Low'])
      });
    }
  });
  
  await knex('dga_programs').insert(ministryPrograms);
  console.log(`✅ Created ${ministryPrograms.length} ministry-specific programs`);
  
  // Add ministry-specific KPIs
  const ministryKPIs = [];
  allEntities.forEach(entity => {
    const kpiCount = faker.number.int({min:3,max:12});
    for (let i = 0; i < kpiCount; i++) {
      ministryKPIs.push({
        kpi_id: faker.string.uuid(),
        entity_id: entity.entity_id,
        program_id: ministryPrograms.find(p => p.entity_id === entity.entity_id)?.program_id || null,
        kpi_name: faker.helpers.arrayElement(['Service Delivery Efficiency', 'Digital Adoption Rate', 'Citizen Satisfaction', 'Cost Reduction', 'Process Automation', 'Data Quality', 'System Uptime', 'Security Compliance']),
        kpi_category: faker.helpers.arrayElement(['Efficiency', 'Quality', 'Compliance', 'Innovation']),
        target_value: faker.number.int({min:70,max:100}),
        actual_value: faker.number.int({min:60,max:98}),
        unit: faker.helpers.arrayElement(['%', 'Score', 'Index', 'Rating']),
        reporting_period_start: faker.date.past(),
        reporting_period_end: faker.date.future(),
        status: faker.helpers.arrayElement(['On Track', 'At Risk', 'Off Track']),
        comments: faker.lorem.sentence(),
        reported_by: null
      });
    }
  });
  
  await knex('dga_kpi_reports').insert(ministryKPIs);
  console.log(`✅ Created ${ministryKPIs.length} ministry-specific KPIs`);
  
  // Add ministry-specific budget data
  console.log('💰 Adding ministry-specific budget allocations...');
  const ministryBudgets = [];
  allEntities.forEach(entity => {
    const budgetCategories = ['Capital Expenditure', 'Operational Expenditure', 'Staff Costs', 'Consulting', 'Infrastructure', 'Software Licenses', 'Training', 'Other'];
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    for (let year = 2023; year <= 2025; year++) {
      quarters.forEach(quarter => {
        budgetCategories.forEach(category => {
          const allocated = faker.number.int({min:50000000,max:entity.total_budget/8});
          const spent = faker.number.int({min:allocated*0.3,max:allocated*0.9});
          ministryBudgets.push({
            budget_id: faker.string.uuid(),
            entity_id: entity.entity_id,
            program_id: ministryPrograms.find(p => p.entity_id === entity.entity_id)?.program_id || null,
            project_id: null,
            fiscal_year: year,
            quarter: quarter,
            budget_category: category,
            allocated_amount: allocated,
            spent_amount: spent,
            committed_amount: faker.number.int({min:spent*0.1,max:spent*0.3}),
            remaining_amount: allocated - spent,
            notes: faker.lorem.sentence()
          });
        });
      });
    }
  });
  
  await knex('dga_budget').insert(ministryBudgets);
  console.log(`✅ Created ${ministryBudgets.length} ministry-specific budget records`);
  
  console.log('🎉 Comprehensive ministry profiles seeding completed successfully!');
};