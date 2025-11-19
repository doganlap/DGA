const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DGA Oversight Platform API',
      version: '1.0.0',
      description: 'Comprehensive API documentation for Saudi Digital Government Authority Oversight Platform',
      contact: {
        name: 'DGA - Head of Accounts',
        email: 'admin@dga.sa'
      },
      license: {
        name: 'PROPRIETARY',
        url: 'https://dga.gov.sa'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.dga.gov.sa',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token obtained from /api/auth/login'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            },
            statusCode: {
              type: 'integer',
              description: 'HTTP status code'
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            email: { type: 'string', format: 'email' },
            name_en: { type: 'string' },
            name_ar: { type: 'string' },
            role: { 
              type: 'string',
              enum: ['DGA Admin', 'Regional Manager', 'Program Director', 'Financial Controller', 'Compliance Auditor', 'Analytics Lead', 'Ministry User']
            },
            entity_id: { type: 'integer' },
            region: { 
              type: 'string',
              enum: ['Central', 'Western', 'Eastern', 'Northern', 'Southern']
            },
            status: { 
              type: 'string',
              enum: ['Active', 'Inactive']
            }
          }
        },
        Entity: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name_en: { type: 'string' },
            name_ar: { type: 'string' },
            code: { type: 'string' },
            type: { 
              type: 'string',
              enum: ['Ministry', 'Agency', 'Authority', 'Commission', 'Government Program']
            },
            sector: { 
              type: 'string',
              enum: ['Health', 'Education', 'Defense', 'Interior', 'Finance', 'Technology', 'Infrastructure', 'Energy', 'Agriculture', 'Tourism', 'Culture', 'Labor', 'Social Affairs']
            },
            region: { 
              type: 'string',
              enum: ['Central', 'Western', 'Eastern', 'Northern', 'Southern']
            },
            city: { type: 'string' },
            status: { 
              type: 'string',
              enum: ['Active', 'Inactive', 'Under Review']
            }
          }
        },
        Program: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name_en: { type: 'string' },
            name_ar: { type: 'string' },
            description_en: { type: 'string' },
            description_ar: { type: 'string' },
            entity_id: { type: 'integer' },
            category: { 
              type: 'string',
              enum: ['Digital Infrastructure', 'E-Government Services', 'Cybersecurity', 'Data Analytics', 'AI & Innovation', 'Cloud Migration', 'Smart Cities', 'Digital Health', 'EdTech']
            },
            status: { 
              type: 'string',
              enum: ['Planning', 'In Progress', 'Completed', 'On Hold', 'Delayed']
            },
            priority: { 
              type: 'string',
              enum: ['Critical', 'High', 'Medium', 'Low']
            },
            start_date: { type: 'string', format: 'date' },
            end_date: { type: 'string', format: 'date' },
            budget_allocated: { type: 'number', format: 'decimal' },
            budget_spent: { type: 'number', format: 'decimal' },
            progress_percentage: { type: 'integer', minimum: 0, maximum: 100 }
          }
        },
        BudgetOverview: {
          type: 'object',
          properties: {
            totalAllocated: { type: 'number' },
            totalSpent: { type: 'number' },
            totalRemaining: { type: 'number' },
            utilizationRate: { type: 'number' },
            byRegion: {
              type: 'object',
              additionalProperties: {
                type: 'object',
                properties: {
                  allocated: { type: 'number' },
                  spent: { type: 'number' },
                  remaining: { type: 'number' }
                }
              }
            }
          }
        },
        ComplianceReport: {
          type: 'object',
          properties: {
            overallScore: { type: 'integer', minimum: 0, maximum: 100 },
            level: { 
              type: 'string',
              enum: ['Full Compliance', 'Substantial Compliance', 'Partial Compliance', 'Non-Compliance']
            },
            frameworks: {
              type: 'object',
              properties: {
                pdpl: { 
                  type: 'object',
                  properties: {
                    score: { type: 'integer' },
                    criteria: { type: 'object' }
                  }
                },
                nca: { 
                  type: 'object',
                  properties: {
                    score: { type: 'integer' },
                    controls: { type: 'object' }
                  }
                },
                iso27001: { 
                  type: 'object',
                  properties: {
                    score: { type: 'integer' },
                    domains: { type: 'object' }
                  }
                }
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints'
      },
      {
        name: 'Entities',
        description: 'Government entities management'
      },
      {
        name: 'Programs',
        description: 'Digital transformation programs'
      },
      {
        name: 'Projects',
        description: 'Program projects and milestones'
      },
      {
        name: 'Budget',
        description: 'Budget allocation and tracking'
      },
      {
        name: 'Reporting',
        description: 'KPIs and performance reports'
      },
      {
        name: 'Analytics',
        description: 'Advanced analytics and predictions'
      },
      {
        name: 'Compliance',
        description: 'Compliance monitoring and audit reports'
      },
      {
        name: 'Workflow',
        description: 'Workflow automation and approvals'
      }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/controllers/*.js'
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
