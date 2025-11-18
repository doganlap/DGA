# DGA Oversight Platform - Backend API

## 🏛️ Digital Government Authority Oversight System

Complete backend API for managing digital transformation initiatives across the Kingdom of Saudi Arabia.

## 📋 Overview

This backend provides REST APIs for:
- **158 Government Entities** across 5 regions
- **Budget & Financial Tracking** (SAR 2.48B+ oversight)
- **Program & Project Management**
- **Compliance & Audit Trails**
- **Real-time Analytics & KPIs**
- **Multi-Region Support**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
copy .env.example .env

# Update .env with your database credentials
```

### Database Setup

```bash
# Run migrations
npm run migrate

# Seed initial data (158 entities, 162 programs, 625+ users)
npm run seed
```

### Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

### Using Docker

```bash
# From project root
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user profile

### Entities
- `GET /api/dga/entities` - List all government entities
- `GET /api/dga/entities/:id` - Get entity details
- `POST /api/dga/entities` - Create new entity
- `PUT /api/dga/entities/:id` - Update entity
- `DELETE /api/dga/entities/:id` - Delete entity

### Programs
- `GET /api/dga/programs` - List all programs
- `GET /api/dga/programs/:id` - Get program details
- `POST /api/dga/programs` - Create new program
- `PUT /api/dga/programs/:id` - Update program

### Projects
- `GET /api/dga/projects` - List all projects
- `GET /api/dga/projects/:id` - Get project details

### Budget
- `GET /api/dga/budget/overview` - National budget overview
- `GET /api/dga/budget/entity/:entityId` - Entity budget details

### Reporting
- `GET /api/dga/reporting/overview` - National overview dashboard
- `GET /api/dga/reporting/region/:region` - Regional report
- `GET /api/dga/reporting/kpis` - All KPIs

### Tickets
- `GET /api/dga/tickets` - List support tickets
- `POST /api/dga/tickets` - Create new ticket
- `PUT /api/dga/tickets/:id` - Update ticket

## 🔐 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- API rate limiting
- SQL injection prevention
- XSS protection with Helmet.js
- CORS configuration
- Audit logging for all actions

## 👥 User Roles

1. **dga_admin** - Full system access
2. **regional_manager** - Regional data access
3. **program_director** - Program management
4. **financial_controller** - Budget & finance access
5. **compliance_auditor** - Audit & compliance
6. **analytics_lead** - KPI & analytics access
7. **ministry_user** - Entity-level access

## 🌍 Multi-Region Support

The system supports 5 regional deployments:

- **Central Region** (Riyadh) - 42 entities
- **Western Region** (Jeddah) - 38 entities
- **Eastern Region** (Dammam) - 28 entities
- **Northern Region** (Tabuk) - 24 entities
- **Southern Region** (Abha) - 26 entities

## 📊 Database Schema

Key tables:
- `users` - User accounts and authentication
- `dga_entities` - Government entities (ministries, agencies)
- `dga_programs` - Digital transformation programs
- `dga_projects` - Implementation projects
- `dga_budget` - Budget allocations and tracking
- `dga_kpi_reports` - Performance KPIs
- `dga_audit_trail` - Audit logs
- `dga_tickets` - Support tickets

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 📝 Environment Variables

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dga_oversight
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your-secret-key
JWT_EXPIRE=24h
CORS_ORIGIN=http://localhost:5173
```

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, validation, error handling
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   └── server.js        # Main entry point
├── database/
│   ├── migrations/      # Database migrations
│   └── seeds/           # Seed data
├── tests/               # Test files
├── logs/                # Application logs
├── .env.example         # Environment template
├── package.json
└── README.md
```

## 🔄 Development Workflow

1. Create feature branch
2. Implement changes
3. Write tests
4. Run linter: `npm run lint`
5. Run tests: `npm test`
6. Commit and push
7. Create pull request

## 📈 Performance

- Average API response time: <200ms
- Supports 10,000 concurrent users
- Database connection pooling
- Request caching
- Compression enabled

## 🛠️ Troubleshooting

### Database connection failed
```bash
# Check if PostgreSQL is running
docker ps

# Restart database
docker-compose restart postgres
```

### Port already in use
```bash
# Change PORT in .env file
PORT=5001
```

## 📞 Support

- **Technical Lead**: backend.team@dga.sa
- **Head of Accounts**: head.accounts@dga.sa
- **Documentation**: /docs folder

## 📄 License

Proprietary - Digital Government Authority, Kingdom of Saudi Arabia

---

**Developed by**: DGA Technical Team  
**Project**: National Digital Oversight Platform  
**Version**: 1.0.0  
**Date**: November 2025
