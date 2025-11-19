const { faker } = require('@faker-js/faker');

exports.seed = async (knex) => {
  console.log('🚀 Seeding comprehensive KSA government entities...');
  
  // Clear existing data in correct order (due to foreign key constraints)
  await knex('compliance_records').del();
  await knex('stakeholder_consensus').del();
  await knex('digital_maturity_scores').del();
  await knex('risks').del();
  await knex('dga_invoices').del();
  await knex('dga_contracts').del();
  await knex('kpis').del();
  await knex('dga_programs').del();
  await knex('dga_budget').del();
  await knex('dga_entities').del();
  
  // Comprehensive list of KSA government entities with individual profiles
  const entities = [
    // Ministries
    {
      entity_id: faker.string.uuid(),
      entity_name_en: 'Ministry of Health',
      entity_name_ar: 'وزارة الصحة',
      entity_code: 'MOH',
      entity_type: 'Ministry',
      sector: 'Health & Social Services',
      region: 'Central',
      status: 'Active',
      location_city: 'Riyadh',
      location_address: 'King Abdulaziz Road, Riyadh',
      contact_email: 'info@moh.gov.sa',
      contact_phone: '+966-11-212-5555',
      website: 'https://www.moh.gov.sa',
      established_year: 1950,
      budget_2024: 68000000000, // SAR 68B
      active_programs: 15,
      completed_programs: 23,
      total_budget: 68000000000,
      digital_maturity_score: 85,
      nca_compliance: 'Compliant',
      pdpl_compliance: 'Compliant',
      iso_compliance: 'ISO 27001 Certified',
      vision2030_alignment: 'Aligned',
      completion_rate: 87,
      high_risks: 2,
      medium_risks: 5,
      low_risks: 8,
      description_en: 'Responsible for healthcare services, public health, and medical regulations across the Kingdom.',
      description_ar: 'المسؤولة عن الخدمات الصحية والصحة العامة والأنظمة الطبية في المملكة.',
      mission_en: 'To provide comprehensive, integrated, and high-quality healthcare services.',
      mission_ar: 'توفير خدمات رعاية صحية شاملة ومتكاملة وعالية الجودة.',
      key_services: 'Healthcare Services, Public Health, Medical Regulations, Health Insurance',
      digital_transformation_status: 'Advanced',
      ai_readiness_score: 78,
      cloud_adoption_score: 82,
      cybersecurity_maturity: 'High',
      data_governance_score: 88,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      entity_id: faker.string.uuid(),
      entity_name_en: 'Ministry of Education',
      entity_name_ar: 'وزارة التعليم',
      entity_code: 'MOE',
      entity_type: 'Ministry',
      sector: 'Education & Training',
      region: 'Central',
      status: 'Active',
      location_city: 'Riyadh',
      location_address: 'King Fahd Road, Riyadh',
      contact_email: 'info@moe.gov.sa',
      contact_phone: '+966-11-441-5555',
      website: 'https://www.moe.gov.sa',
      established_year: 1953,
      budget_2024: 189000000000, // SAR 189B
      active_programs: 22,
      completed_programs: 31,
      total_budget: 189000000000,
      digital_maturity_score: 82,
      nca_compliance: 'Compliant',
      pdpl_compliance: 'Compliant',
      iso_compliance: 'In Progress',
      vision2030_alignment: 'Aligned',
      completion_rate: 91,
      high_risks: 1,
      medium_risks: 7,
      low_risks: 12,
      description_en: 'Oversees education system from primary to higher education.',
      description_ar: 'تشرف على نظام التعليم من التعليم الأساسي إلى التعليم العالي.',
      mission_en: 'To provide quality education that prepares students for the future.',
      mission_ar: 'توفير تعليم عالي الجودة يعد الطلاب للمستقبل.',
      key_services: 'Primary Education, Secondary Education, Higher Education, Technical Training',
      digital_transformation_status: 'Advanced',
      ai_readiness_score: 75,
      cloud_adoption_score: 79,
      cybersecurity_maturity: 'High',
      data_governance_score: 85,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      entity_id: faker.string.uuid(),
      entity_name_en: 'Ministry of Interior',
      entity_name_ar: 'وزارة الداخلية',
      entity_code: 'MOI',
      entity_type: 'Ministry',
      sector: 'Security & Safety',
      region: 'Central',
      status: 'Active',
      location_city: 'Riyadh',
      location_address: 'Al-Washm Street, Riyadh',
      contact_email: 'info@moi.gov.sa',
      contact_phone: '+966-11-401-5555',
      website: 'https://www.moi.gov.sa',
      established_year: 1926,
      budget_2024: 95000000000, // SAR 95B
      active_programs: 18,
      completed_programs: 27,
      total_budget: 95000000000,
      digital_maturity_score: 88,
      nca_compliance: 'Compliant',
      pdpl_compliance: 'Compliant',
      iso_compliance: 'ISO 27001 Certified',
      vision2030_alignment: 'Aligned',
      completion_rate: 93,
      high_risks: 3,
      medium_risks: 4,
      low_risks: 6,
      description_en: 'Responsible for internal security, civil defense, and public safety.',
      description_ar: 'المسؤولة عن الأمن الداخلي والدفاع المدني والسلامة العامة.',
      mission_en: 'To ensure security and safety for all citizens and residents.',
      mission_ar: 'ضمان الأمن والسلامة لجميع المواطنين والمقيمين.',
      key_services: 'Public Security, Civil Defense, Passports, Traffic Management',
      digital_transformation_status: 'Advanced',
      ai_readiness_score: 85,
      cloud_adoption_score: 88,
      cybersecurity_maturity: 'Very High',
      data_governance_score: 92,
      created_at: new Date(),
      updated_at: new Date()
    },
    // Regional Municipalities
    {
      entity_id: faker.string.uuid(),
      entity_name_en: 'Municipality of Riyadh',
      entity_name_ar: 'أمانة منطقة الرياض',
      entity_code: 'MAR',
      entity_type: 'Municipality',
      sector: 'Urban Development',
      region: 'Central',
      status: 'Active',
      location_city: 'Riyadh',
      location_address: 'King Fahd Road, Riyadh',
      contact_email: 'info@mar.gov.sa',
      contact_phone: '+966-11-401-9999',
      website: 'https://www.mar.gov.sa',
      established_year: 1977,
      budget_2024: 45000000000, // SAR 45B
      active_programs: 12,
      completed_programs: 19,
      total_budget: 45000000000,
      digital_maturity_score: 79,
      nca_compliance: 'Compliant',
      pdpl_compliance: 'Compliant',
      iso_compliance: 'In Progress',
      vision2030_alignment: 'Aligned',
      completion_rate: 84,
      high_risks: 2,
      medium_risks: 6,
      low_risks: 9,
      description_en: 'Manages urban planning, infrastructure, and municipal services in Riyadh.',
      description_ar: 'تدير التخطيط الحضري والبنية التحتية والخدمات البلدية في الرياض.',
      mission_en: 'To develop Riyadh into a world-class sustainable city.',
      mission_ar: 'تطوير الرياض لتصبح مدينة مستدامة عالمية المستوى.',
      key_services: 'Urban Planning, Infrastructure, Waste Management, Parks & Recreation',
      digital_transformation_status: 'Intermediate',
      ai_readiness_score: 72,
      cloud_adoption_score: 76,
      cybersecurity_maturity: 'Medium',
      data_governance_score: 78,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      entity_id: faker.string.uuid(),
      entity_name_en: 'Municipality of Jeddah',
      entity_name_ar: 'أمانة محافظة جدة',
      entity_code: 'MAJ',
      entity_type: 'Municipality',
      sector: 'Urban Development',
      region: 'Western',
      status: 'Active',
      location_city: 'Jeddah',
      location_address: 'King Abdulaziz Road, Jeddah',
      contact_email: 'info@maj.gov.sa',
      contact_phone: '+966-12-651-9999',
      website: 'https://www.maj.gov.sa',
      established_year: 1932,
      budget_2024: 35000000000, // SAR 35B
      active_programs: 14,
      completed_programs: 21,
      total_budget: 35000000000,
      digital_maturity_score: 76,
      nca_compliance: 'Compliant',
      pdpl_compliance: 'Compliant',
      iso_compliance: 'In Progress',
      vision2030_alignment: 'Aligned',
      completion_rate: 81,
      high_risks: 3,
      medium_risks: 5,
      low_risks: 7,
      description_en: 'Oversees urban development and municipal services in Jeddah.',
      description_ar: 'تشرف على التنمية الحضرية والخدمات البلدية في جدة.',
      mission_en: 'To enhance Jeddah as a sustainable coastal city.',
      mission_ar: 'تعزيز جدة كمدينة ساحلية مستدامة.',
      key_services: 'Coastal Development, Tourism Infrastructure, Waste Management',
      digital_transformation_status: 'Intermediate',
      ai_readiness_score: 69,
      cloud_adoption_score: 73,
      cybersecurity_maturity: 'Medium',
      data_governance_score: 75,
      created_at: new Date(),
      updated_at: new Date()
    },
    // Specialized Agencies
    {
      entity_id: faker.string.uuid(),
      entity_name_en: 'Saudi Data and AI Authority (SDAIA)',
      entity_name_ar: 'الهيئة السعودية للبيانات والذكاء الاصطناعي',
      entity_code: 'SDAIA',
      entity_type: 'Specialized Agency',
      sector: 'Technology & Innovation',
      region: 'Central',
      status: 'Active',
      location_city: 'Riyadh',
      location_address: 'King Abdulaziz Road, Riyadh',
      contact_email: 'info@sdaia.gov.sa',
      contact_phone: '+966-11-211-5555',
      website: 'https://www.sdaia.gov.sa',
      established_year: 2019,
      budget_2024: 15000000000, // SAR 15B
      active_programs: 8,
      completed_programs: 12,
      total_budget: 15000000000,
      digital_maturity_score: 95,
      nca_compliance: 'Compliant',
      pdpl_compliance: 'Compliant',
      iso_compliance: 'ISO 27001 Certified',
      vision2030_alignment: 'Aligned',
      completion_rate: 94,
      high_risks: 1,
      medium_risks: 2,
      low_risks: 4,
      description_en: 'Leading national data and AI initiatives for Vision 2030.',
      description_ar: 'قيادة المبادرات الوطنية للبيانات والذكاء الاصطناعي لرؤية 2030.',
      mission_en: 'To position Saudi Arabia as a global leader in data and AI.',
      mission_ar: 'وضع المملكة العربية السعودية كرائدة عالمية في البيانات والذكاء الاصطناعي.',
      key_services: 'Data Governance, AI Development, National Data Platform',
      digital_transformation_status: 'Advanced',
      ai_readiness_score: 98,
      cloud_adoption_score: 95,
      cybersecurity_maturity: 'Very High',
      data_governance_score: 96,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      entity_id: faker.string.uuid(),
      entity_name_en: 'National Cybersecurity Authority (NCA)',
      entity_name_ar: 'الهيئة الوطنية للأمن السيبراني',
      entity_code: 'NCA',
      entity_type: 'Specialized Agency',
      sector: 'Security & Safety',
      region: 'Central',
      status: 'Active',
      location_city: 'Riyadh',
      location_address: 'King Saud Road, Riyadh',
      contact_email: 'info@nca.gov.sa',
      contact_phone: '+966-11-203-5555',
      website: 'https://www.nca.gov.sa',
      established_year: 2017,
      budget_2024: 8000000000, // SAR 8B
      active_programs: 6,
      completed_programs: 9,
      total_budget: 8000000000,
      digital_maturity_score: 92,
      nca_compliance: 'Compliant',
      pdpl_compliance: 'Compliant',
      iso_compliance: 'ISO 27001 Certified',
      vision2030_alignment: 'Aligned',
      completion_rate: 91,
      high_risks: 0,
      medium_risks: 1,
      low_risks: 3,
      description_en: 'Protecting Saudi Arabia\'s cyberspace and critical infrastructure.',
      description_ar: 'حماية الفضاء السيبراني والبنية التحتية الحيوية للمملكة.',
      mission_en: 'To secure the nation\'s digital assets and infrastructure.',
      mission_ar: 'أمن الأصول والبنية التحتية الرقمية للوطن.',
      key_services: 'Cybersecurity Standards, Threat Intelligence, Incident Response',
      digital_transformation_status: 'Advanced',
      ai_readiness_score: 89,
      cloud_adoption_score: 91,
      cybersecurity_maturity: 'Very High',
      data_governance_score: 94,
      created_at: new Date(),
      updated_at: new Date()
    },
    // Economic Entities
    {
      entity_id: faker.string.uuid(),
      entity_name_en: 'Saudi Central Bank (SAMA)',
      entity_name_ar: 'البنك المركزي السعودي',
      entity_code: 'SAMA',
      entity_type: 'Financial Institution',
      sector: 'Finance & Banking',
      region: 'Central',
      status: 'Active',
      location_city: 'Riyadh',
      location_address: 'King Saud Road, Riyadh',
      contact_email: 'info@sama.gov.sa',
      contact_phone: '+966-11-463-3000',
      website: 'https://www.sama.gov.sa',
      established_year: 1952,
      budget_2024: 25000000000, // SAR 25B
      active_programs: 10,
      completed_programs: 15,
      total_budget: 25000000000,
      digital_maturity_score: 89,
      nca_compliance: 'Compliant',
      pdpl_compliance: 'Compliant',
      iso_compliance: 'ISO 27001 Certified',
      vision2030_alignment: 'Aligned',
      completion_rate: 88,
      high_risks: 1,
      medium_risks: 3,
      low_risks: 5,
      description_en: 'Central bank responsible for monetary policy and financial stability.',
      description_ar: 'البنك المركزي المسؤول عن السياسة النقدية والاستقرار المالي.',
      mission_en: 'To maintain monetary and financial stability.',
      mission_ar: 'الحفاظ على الاستقرار النقدي والمالي.',
      key_services: 'Monetary Policy, Banking Supervision, Financial Stability',
      digital_transformation_status: 'Advanced',
      ai_readiness_score: 82,
      cloud_adoption_score: 85,
      cybersecurity_maturity: 'Very High',
      data_governance_score: 90,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      entity_id: faker.string.uuid(),
      entity_name_en: 'General Authority for Investment (MISA)',
      entity_name_ar: 'الهيئة العامة للاستثمار',
      entity_code: 'MISA',
      entity_type: 'Investment Authority',
      sector: 'Investment & Trade',
      region: 'Central',
      status: 'Active',
      location_city: 'Riyadh',
      location_address: 'King Fahd Road, Riyadh',
      contact_email: 'info@misa.gov.sa',
      contact_phone: '+966-11-203-3333',
      website: 'https://www.misa.gov.sa',
      established_year: 2020,
      budget_2024: 12000000000, // SAR 12B
      active_programs: 7,
      completed_programs: 11,
      total_budget: 12000000000,
      digital_maturity_score: 84,
      nca_compliance: 'Compliant',
      pdpl_compliance: 'Compliant',
      iso_compliance: 'In Progress',
      vision2030_alignment: 'Aligned',
      completion_rate: 86,
      high_risks: 2,
      medium_risks: 4,
      low_risks: 6,
      description_en: 'Promoting and facilitating investment in Saudi Arabia.',
      description_ar: 'تعزيز وتسهيل الاستثمار في المملكة العربية السعودية.',
      mission_en: 'To attract and facilitate quality investments.',
      mission_ar: 'جذب وتسهيل الاستثمارات عالية الجودة.',
      key_services: 'Investment Promotion, Business Facilitation, Investor Services',
      digital_transformation_status: 'Intermediate',
      ai_readiness_score: 76,
      cloud_adoption_score: 79,
      cybersecurity_maturity: 'High',
      data_governance_score: 82,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  // Add more entities using faker for variety
  const additionalEntities = [];
  for (let i = 0; i < 15; i++) {
    const entityTypes = ['Ministry', 'Municipality', 'Specialized Agency', 'Authority', 'Commission'];
    const sectors = ['Health & Social Services', 'Education & Training', 'Security & Safety', 'Urban Development', 'Technology & Innovation', 'Finance & Banking', 'Investment & Trade', 'Energy & Environment', 'Transportation & Logistics', 'Tourism & Culture'];
    const regions = ['Central', 'Western', 'Eastern', 'Northern', 'Southern'];
    const statuses = ['Active', 'Under Review', 'Planning'];
    const digitalStatuses = ['Advanced', 'Intermediate', 'Basic', 'Planning'];
    
    additionalEntities.push({
      entity_id: faker.string.uuid(),
      entity_name_en: `${faker.company.name()} ${entityTypes[Math.floor(Math.random() * entityTypes.length)]}`,
      entity_name_ar: `${faker.company.name()} ${entityTypes[Math.floor(Math.random() * entityTypes.length)]}`,
      entity_code: faker.string.alphanumeric(4).toUpperCase(),
      entity_type: entityTypes[Math.floor(Math.random() * entityTypes.length)],
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      location_city: faker.location.city(),
      location_address: faker.location.streetAddress(),
      contact_email: faker.internet.email(),
      contact_phone: faker.phone.number('+966-1#-###-####'),
      website: faker.internet.url(),
      established_year: faker.number.int({min:1950,max:2023}),
      budget_2024: faker.number.int({min:1000000000,max:50000000000}), // SAR 1B-50B
      active_programs: faker.number.int({min:3,max:25}),
      completed_programs: faker.number.int({min:5,max:35}),
      total_budget: faker.number.int({min:1000000000,max:50000000000}),
      digital_maturity_score: faker.number.int({min:45,max:95}),
      nca_compliance: faker.helpers.arrayElement(['Compliant', 'In Progress', 'Under Review']),
      pdpl_compliance: faker.helpers.arrayElement(['Compliant', 'In Progress', 'Under Review']),
      iso_compliance: faker.helpers.arrayElement(['ISO 27001 Certified', 'In Progress', 'Planning']),
      vision2030_alignment: faker.helpers.arrayElement(['Aligned', 'Partially Aligned', 'Planning']),
      completion_rate: faker.number.int({min:60,max:98}),
      high_risks: faker.number.int({min:0,max:5}),
      medium_risks: faker.number.int({min:1,max:8}),
      low_risks: faker.number.int({min:2,max:15}),
      description_en: faker.company.catchPhrase(),
      description_ar: faker.company.catchPhrase(),
      mission_en: faker.company.catchPhrase(),
      mission_ar: faker.company.catchPhrase(),
      key_services: faker.commerce.productName(),
      digital_transformation_status: digitalStatuses[Math.floor(Math.random() * digitalStatuses.length)],
      ai_readiness_score: faker.number.int({min:40,max:95}),
      cloud_adoption_score: faker.number.int({min:45,max:90}),
      cybersecurity_maturity: faker.helpers.arrayElement(['Very High', 'High', 'Medium', 'Low']),
      data_governance_score: faker.number.int({min:50,max:95}),
      created_at: new Date(),
      updated_at: new Date()
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
        entity_id: entity.entity_id,
        program_name: `${entity.entity_name_en} Digital Transformation Program ${i + 1}`,
        program_name_ar: `${entity.entity_name_ar} برنامج التحول الرقمي ${i + 1}`,
        program_code: `${entity.entity_code}-DTP-${i + 1}`,
        program_type: faker.helpers.arrayElement(['Digital Transformation', 'Infrastructure', 'Service Delivery', 'Regulatory Reform']),
        description: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement(['Planning', 'In Progress', 'Completed', 'On Hold']),
        priority: faker.helpers.arrayElement(['Critical', 'High', 'Medium', 'Low']),
        allocated_budget: faker.number.int({min:100000000,max:5000000000}), // SAR 100M-5B
        spent_budget: faker.number.int({min:50000000,max:4000000000}),
        start_date: faker.date.past(),
        end_date: faker.date.future(),
        completion_percentage: faker.number.int({min:15,max:95}),
        region: entity.region,
        created_at: new Date(),
        updated_at: new Date()
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
        kpi_name_ar: faker.helpers.arrayElement(['كفاءة تقديم الخدمة', 'معدل التبني الرقمي', 'رضا المواطن', 'تخفيض التكلفة', 'أتمتة العمليات', 'جودة البيانات', 'مدة تشغيل النظام', 'الامتثال الأمني']),
        description: faker.lorem.sentence(),
        target_value: faker.number.int({min:70,max:100}),
        current_value: faker.number.int({min:60,max:98}),
        unit: faker.helpers.arrayElement(['%', 'Score', 'Index', 'Rating']),
        category: faker.helpers.arrayElement(['Efficiency', 'Quality', 'Compliance', 'Innovation']),
        frequency: faker.helpers.arrayElement(['Monthly', 'Quarterly', 'Annually']),
        status: faker.helpers.arrayElement(['On Track', 'Needs Attention', 'At Risk']),
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  });
  
  await knex('kpis').insert(ministryKPIs);
  console.log(`✅ Created ${ministryKPIs.length} ministry-specific KPIs`);
  
  // Add ministry-specific contracts
  const ministryContracts = [];
  allEntities.forEach(entity => {
    const contractCount = faker.number.int({min:1,max:6});
    for (let i = 0; i < contractCount; i++) {
      ministryContracts.push({
        contract_number: `${entity.entity_code}-C-${2024}-${i + 1}`,
        entity_id: entity.entity_id,
        program_id: ministryPrograms.find(p => p.entity_id === entity.entity_id)?.program_id || null,
        vendor: faker.company.name(),
        service_description: faker.helpers.arrayElement(['Digital Transformation Services', 'IT Infrastructure', 'Software Development', 'Consulting Services', 'Cloud Services', 'Cybersecurity Solutions']),
        contract_value: faker.number.int({min:50000000,max:2000000000}), // SAR 50M-2B
        start_date: faker.date.past(),
        end_date: faker.date.future(),
        status: faker.helpers.arrayElement(['Active', 'Under Review', 'Closed']),
        notes: faker.lorem.sentence(),
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  });
  
  await knex('dga_contracts').insert(ministryContracts);
  console.log(`✅ Created ${ministryContracts.length} ministry-specific contracts`);
  
  console.log('🎉 Comprehensive ministry profiles seeding completed successfully!');
};