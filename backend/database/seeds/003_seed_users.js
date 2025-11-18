/**
 * Seed File: Users
 * 
 * Seeds 625+ users with proper roles and regional assignments
 * - 50 DGA admins and leadership
 * - 75 regional managers (15 per region)
 * - 150 program directors
 * - 100 financial controllers
 * - 75 compliance auditors
 * - 75 analytics leads
 * - 100+ ministry users
 */

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  // Get all entities for assignment
  const entities = await knex('dga_entities').select('entity_id', 'entity_code', 'region');
  
  // Delete existing users
  await knex('users').del();

  const users = [];
  const regions = ['Central', 'Western', 'Eastern', 'Northern', 'Southern'];
  
  // Hash password once (same for all dev users)
  const passwordHash = await bcrypt.hash('DGA@2025', 10);

  // 1. DGA Admins (50 users)
  for (let i = 1; i <= 50; i++) {
    users.push({
      user_id: uuidv4(),
      email: `admin${i}@dga.sa`,
      password_hash: passwordHash,
      full_name: `DGA Admin ${i}`,
      phone: `+966-11-${String(5000000 + i).slice(-7)}`,
      role: 'dga_admin',
      region: regions[Math.floor(Math.random() * regions.length)],
      entity_id: null,
      is_active: true,
      last_login: null,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  // 2. Regional Managers (75 users - 15 per region)
  let managerCounter = 1;
  for (const region of regions) {
    for (let i = 1; i <= 15; i++) {
      users.push({
        user_id: uuidv4(),
        email: `manager.${region.toLowerCase()}${i}@dga.sa`,
        password_hash: passwordHash,
        full_name: `${region} Regional Manager ${i}`,
        phone: `+966-11-${String(6000000 + managerCounter).slice(-7)}`,
        role: 'regional_manager',
        region: region,
        entity_id: null,
        is_active: true,
        last_login: null,
        created_at: new Date(),
        updated_at: new Date()
      });
      managerCounter++;
    }
  }

  // 3. Program Directors (150 users - distributed across entities)
  for (let i = 1; i <= 150; i++) {
    const entity = entities[Math.floor(Math.random() * entities.length)];
    users.push({
      user_id: uuidv4(),
      email: `director${i}@${entity.entity_code.toLowerCase()}.sa`,
      password_hash: passwordHash,
      full_name: `Program Director ${i}`,
      phone: `+966-11-${String(7000000 + i).slice(-7)}`,
      role: 'program_director',
      region: entity.region,
      entity_id: entity.entity_id,
      is_active: true,
      last_login: null,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  // 4. Financial Controllers (100 users)
  for (let i = 1; i <= 100; i++) {
    const entity = entities[Math.floor(Math.random() * entities.length)];
    users.push({
      user_id: uuidv4(),
      email: `finance${i}@${entity.entity_code.toLowerCase()}.sa`,
      password_hash: passwordHash,
      full_name: `Financial Controller ${i}`,
      phone: `+966-11-${String(8000000 + i).slice(-7)}`,
      role: 'financial_controller',
      region: entity.region,
      entity_id: entity.entity_id,
      is_active: true,
      last_login: null,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  // 5. Compliance Auditors (75 users)
  for (let i = 1; i <= 75; i++) {
    const entity = entities[Math.floor(Math.random() * entities.length)];
    users.push({
      user_id: uuidv4(),
      email: `auditor${i}@dga.sa`,
      password_hash: passwordHash,
      full_name: `Compliance Auditor ${i}`,
      phone: `+966-11-${String(9000000 + i).slice(-7)}`,
      role: 'compliance_auditor',
      region: entity.region,
      entity_id: null,
      is_active: true,
      last_login: null,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  // 6. Analytics Leads (75 users)
  for (let i = 1; i <= 75; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    users.push({
      user_id: uuidv4(),
      email: `analytics${i}@dga.sa`,
      password_hash: passwordHash,
      full_name: `Analytics Lead ${i}`,
      phone: `+966-11-${String(10000000 + i).slice(-7)}`,
      role: 'analytics_lead',
      region: region,
      entity_id: null,
      is_active: true,
      last_login: null,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  // 7. Ministry Users (150 users - 1+ per entity)
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    // Major entities get 2 users, others get 1
    const userCount = ['MOI', 'SDAIA', 'NCA', 'MOH', 'MOE', 'ARAMCO'].includes(entity.entity_code) ? 2 : 1;
    
    for (let j = 1; j <= userCount; j++) {
      users.push({
        user_id: uuidv4(),
        email: `user${j}@${entity.entity_code.toLowerCase()}.sa`,
        password_hash: passwordHash,
        full_name: `${entity.entity_code} User ${j}`,
        phone: `+966-11-${String(11000000 + i * 10 + j).slice(-7)}`,
        role: 'ministry_user',
        region: entity.region,
        entity_id: entity.entity_id,
        is_active: true,
        last_login: null,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  }

  // Special test users
  users.push({
    user_id: uuidv4(),
    email: 'admin@dga.sa',
    password_hash: passwordHash,
    full_name: 'Head of Accounts - DGA',
    phone: '+966-11-1234567',
    role: 'dga_admin',
    region: 'Central',
    entity_id: null,
    is_active: true,
    last_login: null,
    created_at: new Date(),
    updated_at: new Date()
  });

  users.push({
    user_id: uuidv4(),
    email: 'test@dga.sa',
    password_hash: passwordHash,
    full_name: 'Test User',
    phone: '+966-11-9999999',
    role: 'ministry_user',
    region: 'Central',
    entity_id: entities[0].entity_id,
    is_active: true,
    last_login: null,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Insert in batches
  const batchSize = 100;
  for (let i = 0; i < users.length; i += batchSize) {
    await knex('users').insert(users.slice(i, i + batchSize));
  }

  console.log(`✅ Successfully seeded ${users.length} users`);
  console.log(`   - DGA Admins: ${users.filter(u => u.role === 'dga_admin').length}`);
  console.log(`   - Regional Managers: ${users.filter(u => u.role === 'regional_manager').length}`);
  console.log(`   - Program Directors: ${users.filter(u => u.role === 'program_director').length}`);
  console.log(`   - Financial Controllers: ${users.filter(u => u.role === 'financial_controller').length}`);
  console.log(`   - Compliance Auditors: ${users.filter(u => u.role === 'compliance_auditor').length}`);
  console.log(`   - Analytics Leads: ${users.filter(u => u.role === 'analytics_lead').length}`);
  console.log(`   - Ministry Users: ${users.filter(u => u.role === 'ministry_user').length}`);
  console.log(`\n   Default password for all users: DGA@2025`);
};
