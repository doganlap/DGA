const { faker } = require('@faker-js/faker');

exports.seed = async (knex) => {
  // First, let's populate the budget table with proper data
  const entities = await knex('dga_entities').pluck('entity_id');
  const fy = 2025;

  // Clear existing budget data and insert fresh finance demo data
  await knex('dga_budget').del();
  
  const budgetData = entities.map(id => ({
    entity_id: id,
    program_id: null,
    project_id: null,
    fiscal_year: fy,
    quarter: faker.helpers.arrayElement(['Q1','Q2','Q3','Q4']),
    budget_category: faker.helpers.arrayElement(['Capital Expenditure','Operational Expenditure','Consulting','Infrastructure','Software Licenses']),
    allocated_amount: faker.number.int({min:50,max:400}) * 1_000_000,
    spent_amount: faker.number.int({min:30,max:380}) * 1_000_000,
    committed_amount: faker.number.int({min:5,max:50}) * 1_000_000,
    remaining_amount: faker.number.int({min:5,max:100}) * 1_000_000,
    notes: `Finance demo data for FY${fy}`,
    created_at: new Date(),
    updated_at: new Date()
  }));
  
  await knex('dga_budget').insert(budgetData);

  // Contracts and invoices
  await knex('dga_contracts').del();
  await knex('dga_invoices').del();

  // 2. Contracts
  const contracts = entities.map((id, idx) => ({
    contract_number: `DGA-C-${fy}-${String(idx+1).padStart(4,'0')}`,
    entity_id: id,
    program_id: null,
    vendor: faker.company.name(),
    service_description: faker.helpers.arrayElement(['Cloud Migration','Cybersecurity','Digital Maturity Assessment','Data Governance','Citizen Portal']),
    contract_value: faker.number.int({min:5,max:80}) * 1_000_000,
    start_date: `${fy}-01-01`,
    end_date: `${fy}-12-31`,
    status: faker.helpers.arrayElement(['Active','Under Review','Closed']),
    notes: faker.lorem.sentence(),
    created_at: new Date(),
    updated_at: new Date()
  }));
  await knex('dga_contracts').insert(contracts);

  // 3. Invoices (linked to contracts)
  const invoices = [];
  contracts.forEach(c => {
    const count = faker.number.int({min:2,max:5});
    for (let i=0;i<count;i++){
      invoices.push({
        invoice_number: `INV-${c.contract_number}-${i+1}`,
        contract_number: c.contract_number,
        amount: Math.round(c.contract_value / count),
        due_date: faker.date.between({from:`${fy}-01-01`,to:`${fy}-12-31`}),
        status: faker.helpers.arrayElement(['Paid','Pending','Overdue']),
        paid_date: faker.helpers.arrayElement([null, faker.date.past()]),
        description: faker.lorem.sentence(),
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  });
  await knex('dga_invoices').insert(invoices);
  console.log('✅ Finance demo data injected');
};