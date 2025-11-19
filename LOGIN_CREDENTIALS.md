# DGA Platform - Login Credentials

## Demo/Development Credentials

### Admin Account (Full Access)
```
Email: admin@dga.sa
Password: admin123
```

### Test User Accounts

All users have secure passwords managed by the system administrator.

#### DGA Admins (51 users) - ✅ WORKING
- **Primary admin account** (Head of Accounts - DGA)
- admin1@dga.sa to admin50@dga.sa

#### Other User Types (seeded in database)
Check database for complete list of:
- Regional Managers by region
- Program Directors
- Financial Controllers
- Compliance Auditors
- Analytics Leads
- Ministry Users

**Note:** All 691 users have secure passwords. Contact your administrator for credentials.

---

## Password Policy

**Development/Demo Password:** `admin123`

**Note:** This is a simple password for demo purposes. In production, enforce:
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Password expiry every 90 days
- No password reuse (last 5 passwords)
- Multi-factor authentication (MFA) required

---

## Quick Test

Test the login API directly:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dga.sa","password":"admin123"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": "...",
    "email": "admin@dga.sa",
    "full_name": "Head of Accounts - DGA",
    "role": "dga_admin",
    "region": "Central"
  }
}
```

---

## Regional Access

Users can only access data for their assigned region:
- **Central Region:** Riyadh-based entities
- **Western Region:** Makkah, Jeddah-based entities  
- **Eastern Region:** Dammam, Dhahran-based entities
- **Northern Region:** Tabuk, Hail-based entities
- **Southern Region:** Asir, Najran-based entities

DGA Admins have access to **all regions**.

---

## Troubleshooting

### Login fails with 401 "Invalid credentials"
1. Verify you're using the correct email format (e.g., `admin@dga.sa`)
2. Ensure password is exactly: `admin123` (case-sensitive, no spaces)
3. Check if backend server is running on port 5000
4. Verify database connection is active

### Backend not running
```bash
cd d:\Projects\DGA\backend
npm run dev
```

### Frontend not connecting
1. Check `.env.development` has: `VITE_API_URL=http://localhost:5000`
2. Restart frontend:
```bash
cd d:\Projects\DGA\frontend
npm run dev
```

### Reset all passwords
```bash
cd d:\Projects\DGA\backend
npx knex seed:run
```

This will reset all 691 users back to password: `admin123`
