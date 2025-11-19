# DGA Platform - Advanced Features Documentation

## 🚀 Overview

The DGA Oversight Platform now includes advanced enterprise-grade features for analytics, compliance monitoring, and workflow automation.

---

## 📊 Advanced Analytics

### 1. **Budget Trends Analysis**

**Endpoint:** `GET /api/advanced/analytics/budget-trends`

**Description:** Analyzes budget utilization trends over time with moving averages and predictive insights.

**Query Parameters:**
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)
- `region` - Filter by region (Central, Western, Eastern, Northern, Southern)
- `entity_id` - Filter by entity UUID

**Response:**
```json
{
  "success": true,
  "data": {
    "trends": [
      {
        "month": "2025-01",
        "total_allocated": 125000000,
        "total_spent": 103500000,
        "utilization_rate": 82.8,
        "moving_average": 81.2
      }
    ],
    "summary": {
      "avg_utilization": 82.4,
      "total_allocated": 2480000000,
      "total_spent": 2043520000
    }
  }
}
```

**Use Cases:**
- Monitor budget efficiency trends
- Identify spending patterns
- Forecast future budget needs
- Compare regional performance

---

### 2. **Budget Prediction**

**Endpoint:** `GET /api/advanced/analytics/predict-budget/:entity_id`

**Description:** Uses linear regression to predict future budget needs based on historical data.

**Parameters:**
- `entity_id` (path) - Entity UUID
- `months` (query) - Number of months to predict (default: 6)

**Response:**
```json
{
  "success": true,
  "data": {
    "prediction": 145000000,
    "confidence": "high",
    "historical_avg": 125000000,
    "trend": "increasing"
  }
}
```

**Confidence Levels:**
- `high` - Low variance in historical data (<10%)
- `medium` - Moderate variance (10-30%)
- `low` - High variance (>30%) or insufficient data

---

### 3. **Digital Maturity Assessment**

**Endpoint:** `GET /api/advanced/analytics/digital-maturity/:entity_id`

**Description:** Calculates comprehensive digital maturity score (0-100) based on multiple factors.

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 76.5,
    "level": "Advanced",
    "factors": {
      "program_completion": 65,
      "avg_progress": 82,
      "budget_utilization": 84,
      "total_programs": 23
    }
  }
}
```

**Maturity Levels:**
- **Leading** (80-100): Best-in-class digital transformation
- **Advanced** (60-79): Strong digital capabilities
- **Intermediate** (40-59): Developing capabilities
- **Developing** (20-39): Early stage
- **Foundational** (0-19): Just beginning

---

### 4. **Risk Analysis**

**Endpoint:** `GET /api/advanced/analytics/risk-analysis`

**Description:** Performs comprehensive risk analysis across programs and entities.

**Query Parameters:**
- `entity_id` - Filter by entity
- `region` - Filter by region

**Response:**
```json
{
  "success": true,
  "data": {
    "high_risk": [
      {
        "program_id": "uuid",
        "program_name": "Cloud Migration Phase 2",
        "entity_name": "Ministry of Interior",
        "risk_score": 75,
        "risk_level": "high",
        "factors": ["Budget overrun imminent", "Slow progress"]
      }
    ],
    "medium_risk": [...],
    "low_risk": [...],
    "total_programs": 171,
    "avg_risk_score": 28.5
  }
}
```

**Risk Factors:**
- Budget overrun (>90% spent)
- Slow progress (<50% after 90 days)
- Program on hold
- Still in planning phase

---

### 5. **Regional Benchmarks**

**Endpoint:** `GET /api/advanced/analytics/benchmarks`

**Description:** Generates performance benchmarks across all five regions.

**Response:**
```json
{
  "success": true,
  "data": {
    "benchmarks": [
      {
        "region": "Central",
        "entities": 42,
        "avg_maturity": 78.5,
        "total_programs": 68,
        "avg_program_progress": 74.2,
        "budget_allocated": 1020000000,
        "budget_spent": 850000000,
        "budget_utilization": 83.3
      }
    ],
    "best_performers": {
      "maturity": { "region": "Central", "avg_maturity": 78.5 },
      "budget_efficiency": { "region": "Western", "budget_utilization": 85.2 },
      "program_progress": { "region": "Eastern", "avg_program_progress": 76.8 }
    }
  }
}
```

---

## 🛡️ Compliance Monitoring

### 6. **Compliance Report**

**Endpoint:** `GET /api/advanced/compliance/report`

**Description:** Generates comprehensive compliance report covering PDPL, NCA ECC, and ISO 27001.

**Query Parameters:**
- `entity_id` - Filter by entity (optional, omit for national report)

**Response:**
```json
{
  "success": true,
  "data": {
    "overall_score": 89.3,
    "compliance_level": "Good",
    "frameworks": {
      "pdpl": {
        "score": 87.5,
        "status": "compliant",
        "criteria": {
          "data_inventory": 85,
          "consent_management": 90,
          "data_minimization": 88,
          "data_retention": 82,
          "breach_notification": 95,
          "data_subject_rights": 92,
          "dpia_conducted": 87,
          "privacy_by_design": 86
        },
        "gaps": []
      },
      "nca_ecc": {
        "score": 91.0,
        "status": "compliant",
        "controls": {
          "access_control": 92,
          "network_security": 95,
          "system_hardening": 88,
          "vulnerability_management": 85,
          "incident_response": 98,
          "backup_recovery": 94,
          "monitoring_logging": 96,
          "security_awareness": 87,
          "third_party_security": 84
        },
        "gaps": []
      },
      "iso27001": {
        "score": 89.5,
        "status": "compliant",
        "domains": {...},
        "gaps": []
      }
    },
    "recommendations": [],
    "last_assessed": "2025-11-19T00:00:00.000Z"
  }
}
```

**Compliance Frameworks:**
- **PDPL** - Saudi Personal Data Protection Law
- **NCA ECC** - National Cybersecurity Authority Essential Controls
- **ISO 27001** - Information Security Management

---

### 7. **Compliance History**

**Endpoint:** `GET /api/advanced/compliance/history/:entity_id`

**Description:** Tracks compliance scores over time to identify trends.

**Parameters:**
- `entity_id` (path) - Entity UUID
- `months` (query) - Number of months (default: 12)

**Response:**
```json
{
  "success": true,
  "data": {
    "history": [
      {
        "month": "2025-01",
        "score": 87.5,
        "status": "compliant"
      },
      {
        "month": "2025-02",
        "score": 89.3,
        "status": "compliant"
      }
    ],
    "trend": "improving",
    "avg_score": 88.4
  }
}
```

---

### 8. **Audit Report**

**Endpoint:** `GET /api/advanced/compliance/audit`

**Description:** Generates detailed audit trail report for compliance verification.

**Query Parameters:**
- `entity_id` - Filter by entity
- `startDate` - Start date
- `endDate` - End date
- `action_type` - Filter by action type

**Response:**
```json
{
  "success": true,
  "data": {
    "total_events": 1247,
    "categories": {
      "data_access": 523,
      "data_modification": 312,
      "data_deletion": 45,
      "user_management": 178,
      "security_events": 189
    },
    "recent_events": [...],
    "high_risk_events": [...]
  }
}
```

---

## ⚙️ Workflow Automation

### 9. **Initiate Approval Workflow**

**Endpoint:** `POST /api/advanced/workflow/initiate`

**Description:** Starts multi-level approval workflow for programs, budgets, or entities.

**Request Body:**
```json
{
  "item_type": "program",
  "item_id": "uuid",
  "approval_levels": [
    {
      "level": 1,
      "approvers": ["user_id_1", "user_id_2"],
      "description": "Program Director Review"
    },
    {
      "level": 2,
      "approvers": ["user_id_3"],
      "description": "Regional Manager Approval"
    },
    {
      "level": 3,
      "approvers": ["user_id_4"],
      "description": "DGA Admin Final Approval"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "workflow_id": "WF-1234567890-abc123",
    "status": "initiated",
    "next_approvers": ["user_id_1", "user_id_2"],
    "estimated_completion": "2025-11-25T00:00:00.000Z"
  }
}
```

---

### 10. **Process Approval**

**Endpoint:** `POST /api/advanced/workflow/approve/:workflow_id`

**Description:** Approve, reject, or request changes for a workflow.

**Request Body:**
```json
{
  "action": "approve",
  "comments": "Approved with conditions"
}
```

**Actions:**
- `approve` - Approve and move to next level
- `reject` - Reject workflow
- `request_changes` - Request modifications

**Response:**
```json
{
  "success": true,
  "message": "Approval approve processed successfully",
  "data": {
    "status": "advanced",
    "message": "Moved to next approval level"
  }
}
```

---

### 11. **Budget Alerts**

**Endpoint:** `GET /api/advanced/workflow/budget-alerts`

**Description:** Real-time budget monitoring with automatic alerts.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_alerts": 12,
    "critical": 3,
    "warnings": 5,
    "info": 4,
    "alerts": [
      {
        "type": "budget_overrun",
        "severity": "high",
        "entity_name": "Ministry of Defense",
        "region": "Central",
        "message": "Budget utilization at 95.2%",
        "allocated": 250000000,
        "spent": 238000000,
        "remaining": 12000000
      }
    ]
  }
}
```

**Alert Types:**
- `budget_overrun` - Spending >90% of allocated budget
- `budget_underutilization` - Spending <50% mid-year

---

### 12. **Schedule Automated Report**

**Endpoint:** `POST /api/advanced/workflow/schedule-report`

**Description:** Schedule recurring automated reports.

**Request Body:**
```json
{
  "report_type": "compliance",
  "frequency": "monthly",
  "recipients": ["admin@dga.sa", "compliance@dga.sa"],
  "filters": {
    "region": "Central",
    "include_charts": true
  }
}
```

**Frequency Options:**
- `daily` - Every day at midnight
- `weekly` - Every Monday
- `monthly` - First day of month
- `quarterly` - Start of quarter

**Response:**
```json
{
  "success": true,
  "data": {
    "schedule_id": "SCH-1234567890-xyz789",
    "status": "scheduled",
    "next_run": "2025-12-01T00:00:00.000Z",
    "recipients": ["admin@dga.sa", "compliance@dga.sa"]
  }
}
```

---

### 13. **Auto-Update Program Statuses**

**Endpoint:** `POST /api/advanced/workflow/update-statuses`

**Description:** Automatically updates program statuses based on progress and timelines.

**Response:**
```json
{
  "success": true,
  "data": {
    "updated_count": 5,
    "updates": [
      {
        "program_id": "uuid",
        "program_name": "Digital ID Implementation",
        "old_status": "in_progress",
        "new_status": "completed",
        "reason": "Progress reached 100%"
      }
    ]
  }
}
```

**Auto-Update Rules:**
- Progress 100% → `completed`
- Progress <30% after 90 days → `delayed`
- On hold → Risk flagged

---

### 14. **Batch Operations**

**Endpoint:** `POST /api/advanced/workflow/batch-operation`

**Description:** Process multiple operations in a single transaction.

**Request Body:**
```json
{
  "operation_type": "bulk_update",
  "items": [
    {
      "table": "dga_programs",
      "id": "uuid1",
      "updates": { "status": "approved" }
    },
    {
      "table": "dga_programs",
      "id": "uuid2",
      "updates": { "status": "approved" }
    }
  ]
}
```

**Operation Types:**
- `bulk_update` - Update multiple records
- `bulk_delete` - Delete multiple records
- `bulk_approve` - Approve multiple workflows

**Response:**
```json
{
  "success": true,
  "data": {
    "success": ["uuid1", "uuid2"],
    "failed": []
  }
}
```

---

## 🔐 Access Control

All advanced endpoints require authentication and specific role permissions:

| Endpoint | Allowed Roles |
|----------|--------------|
| Budget Trends | DGA Admin, Financial Controller |
| Budget Prediction | DGA Admin, Financial Controller |
| Digital Maturity | All authenticated users |
| Risk Analysis | DGA Admin, Compliance Auditor |
| Benchmarks | DGA Admin |
| Compliance Report | DGA Admin, Compliance Auditor |
| Compliance History | DGA Admin, Compliance Auditor |
| Audit Report | DGA Admin, Compliance Auditor |
| Workflow Initiate | All authenticated users |
| Workflow Approve | Designated approvers |
| Budget Alerts | DGA Admin, Financial Controller |
| Schedule Report | DGA Admin |
| Update Statuses | DGA Admin |
| Batch Operations | DGA Admin |

---

## 📈 Performance Optimization

### Caching Strategy
- Budget trends cached for 1 hour
- Compliance reports cached for 6 hours
- Benchmarks cached for 24 hours
- Real-time alerts no caching

### Rate Limiting
- Advanced endpoints: 50 requests per 15 minutes
- Batch operations: 10 requests per hour

---

## 🔄 Integration Examples

### JavaScript/React
```javascript
// Get budget trends
const response = await axios.get('/api/advanced/analytics/budget-trends', {
  params: { region: 'Central', startDate: '2025-01-01' },
  headers: { Authorization: `Bearer ${token}` }
});

// Initiate workflow
await axios.post('/api/advanced/workflow/initiate', {
  item_type: 'program',
  item_id: programId,
  approval_levels: [...]
}, {
  headers: { Authorization: `Bearer ${token}` }
});
```

### cURL
```bash
# Get compliance report
curl -X GET "http://localhost:5000/api/advanced/compliance/report" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Process approval
curl -X POST "http://localhost:5000/api/advanced/workflow/approve/WF-123" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action":"approve","comments":"Approved"}'
```

---

## 🎯 Use Cases

### 1. Executive Dashboard
Combine multiple endpoints:
- Budget trends
- Risk analysis
- Compliance report
- Regional benchmarks

### 2. Automated Compliance Monitoring
- Schedule monthly compliance reports
- Track compliance history
- Generate audit reports
- Alert on compliance drops

### 3. Budget Management
- Monitor budget alerts daily
- Predict future budget needs
- Analyze spending trends
- Auto-approve low-value items

### 4. Workflow Automation
- Multi-level approval for programs
- Batch approve/reject items
- Auto-update program statuses
- Send notifications to stakeholders

---

**Last Updated:** November 19, 2025  
**API Version:** 1.0.0  
**Status:** Production Ready
