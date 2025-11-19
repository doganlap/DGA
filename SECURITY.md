# DGA Platform - Security Configuration

## 🔒 Security Features Implemented

### 1. **Authentication Security**

#### JWT Token Protection
- **Token Expiry:** 24 hours (configurable)
- **Secret Key:** Strong secret key (change in production!)
- **Token Structure:** Contains user_id, email, role, region
- **Verification:** Validates token on every protected endpoint

#### Password Security
- **Hashing Algorithm:** bcrypt with 10 salt rounds
- **Current Demo Password:** `admin123` (simple for demo)
- **Production Requirements:**
  - Minimum 12 characters
  - Mix of uppercase, lowercase, numbers, symbols
  - Password expiry every 90 days
  - No password reuse (last 5 passwords)

#### Login Attempt Protection
- **Max Failed Attempts:** 5 attempts per 15 minutes
- **Account Lockout:** 15 minutes after max attempts
- **Tracking:** In-memory tracking (upgrade to Redis for production)
- **Auto-Cleanup:** Expired locks cleaned every 5 minutes
- **User Feedback:** Shows remaining attempts on failed login

### 2. **Rate Limiting**

#### General API Endpoints
```
Window: 15 minutes
Max Requests: 100 per IP
Message: "Too many requests from this IP, please try again after 15 minutes."
```

#### Authentication Endpoints (Stricter)
```
Window: 15 minutes
Max Login Attempts: 10 per IP
Skip Successful: Yes (only counts failed attempts)
Lockout: Immediate on rate limit exceeded
Applied to:
- POST /api/auth/login
- POST /api/auth/register
```

### 3. **CORS Protection**

#### Allowed Origins
Development:
- http://localhost:5173
- http://localhost:5174
- http://localhost:5175
- http://localhost:5176
- http://localhost:5177
- http://localhost:5178

Production (update in .env):
- https://yourdomain.com
- https://www.yourdomain.com

#### CORS Configuration
- **Credentials:** Allowed
- **Methods:** GET, POST, PUT, DELETE, PATCH
- **Headers:** Content-Type, Authorization
- **Max Age:** 24 hours (caching preflight requests)
- **Origin Validation:** Strict whitelist checking

### 4. **Security Headers (Helmet.js)**

Automatically sets secure HTTP headers:
- `X-DNS-Prefetch-Control: off`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 0` (deprecated, use CSP)
- `Strict-Transport-Security: max-age=15552000; includeSubDomains`
- `Content-Security-Policy: default-src 'self'`

### 5. **Request Validation**

#### Input Validation (express-validator)
- Email format validation
- Required field checks
- Length constraints
- Type validation

#### SQL Injection Protection
- **Knex.js ORM:** Parameterized queries (prevents SQL injection)
- **No Raw Queries:** Unless explicitly needed and sanitized

#### XSS Protection
- Input sanitization via express-validator
- Output encoding (React handles this automatically)

### 6. **Error Handling**

#### Secure Error Responses
- **Production:** Generic error messages (no stack traces)
- **Development:** Detailed errors for debugging
- **No Information Leakage:** Never expose database structure or internal paths

#### Logging
- **Winston Logger:** All security events logged
- **Failed Logins:** Logged with email and IP
- **Account Locks:** Logged with duration
- **API Errors:** Logged with context

---

## 🛡️ Environment Variables

### Required Security Variables

```bash
# JWT Configuration
JWT_SECRET=your-super-secure-secret-key-here-change-this
JWT_EXPIRE=24h

# CORS (comma-separated list)
CORS_ORIGIN=http://localhost:5173,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000          # 15 minutes in milliseconds
RATE_LIMIT_MAX_REQUESTS=100          # General API limit
AUTH_RATE_LIMIT_MAX=10               # Auth endpoint limit

# Login Security
MAX_FAILED_LOGIN_ATTEMPTS=5          # Before account lock
LOCKOUT_DURATION_MINUTES=15          # How long to lock account
SESSION_TIMEOUT_MINUTES=30           # Inactivity timeout

# Database (Prisma Cloud - SSL required)
DATABASE_URL="postgres://...?sslmode=require"
```

---

## 🔐 Best Practices for Production

### 1. **Change Default Passwords**
```bash
cd backend
node scripts/change-admin-password.js
```

### 2. **Rotate JWT Secret**
- Generate new secret: `openssl rand -base64 64`
- Update JWT_SECRET in production .env
- All existing tokens will be invalidated

### 3. **Enable HTTPS**
- Use Vercel automatic HTTPS
- Or configure SSL certificates
- Force HTTPS redirect in production

### 4. **Database Security**
- Use strong database passwords
- Enable SSL/TLS for database connections (already enabled)
- Restrict database access by IP (Prisma Cloud supports this)
- Regular backups

### 5. **API Security**
- Enable API key for sensitive operations
- Add request signing for critical endpoints
- Monitor API usage patterns
- Set up alerts for suspicious activity

### 6. **Compliance**
- **PDPL (Personal Data Protection Law):** Saudi Arabia
- **NCA ECC (National Cybersecurity Authority):** Essential Cybersecurity Controls
- **ISO 27001:** Information Security Management
- Data encryption at rest and in transit

---

## 🚨 Security Testing

### Test Login Security

1. **Test Valid Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dga.sa","password":"admin123"}'
```

2. **Test Failed Login Attempts:**
```bash
# Try 6 times with wrong password to trigger lockout
for i in {1..6}; do
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@dga.sa","password":"wrongpass"}'
  echo ""
done
```

3. **Test Rate Limiting:**
```bash
# Send 101 requests rapidly to trigger rate limit
for i in {1..101}; do
  curl -s http://localhost:5000/api/dga/entities > /dev/null
  echo "Request $i"
done
```

4. **Test CORS:**
```bash
# Should be blocked (wrong origin)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Origin: http://evil-site.com" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dga.sa","password":"admin123"}'
```

### Test Account Lockout

1. Enter wrong password 5 times
2. On 5th attempt, you'll see: `attemptsRemaining: 0`
3. 6th attempt shows: "Account temporarily locked... Please try again in 15 minutes"
4. Wait 15 minutes or restart backend to reset

---

## 📊 Monitoring & Alerts

### Security Events to Monitor

1. **Failed Login Attempts**
   - Track by user email
   - Alert after 3 failed attempts
   - Block after 5 failed attempts

2. **Rate Limit Hits**
   - Track IPs hitting rate limits
   - Potential DDoS or brute force
   - Consider IP blacklisting

3. **Unusual Access Patterns**
   - Login from new locations
   - Multiple role changes
   - Bulk data exports
   - Off-hours access

4. **API Errors**
   - 401 Unauthorized spikes
   - 403 Forbidden patterns
   - 500 Server errors

### Recommended Tools
- **Winston Logger:** Already implemented
- **Azure Monitor:** For production monitoring
- **Application Insights:** Track performance and errors
- **Azure Sentinel:** Security information and event management (SIEM)

---

## 🔄 Security Updates

### Regular Maintenance

- **Weekly:** Check npm audit for vulnerabilities
  ```bash
  cd backend && npm audit
  cd frontend && npm audit
  ```

- **Monthly:** Update dependencies
  ```bash
  npm update
  npm audit fix
  ```

- **Quarterly:** Review security logs
  - Failed login patterns
  - Rate limit violations
  - API error trends

---

## 📞 Security Incident Response

### If Account Compromised

1. **Immediately:**
   - Lock the compromised account
   - Revoke all active sessions
   - Change JWT secret to invalidate all tokens

2. **Investigation:**
   - Review audit logs
   - Check access patterns
   - Identify data accessed

3. **Recovery:**
   - Reset affected user passwords
   - Enable MFA for all users
   - Notify affected users

### Emergency Contacts
- **DGA Security Team:** security@dga.sa
- **System Admin:** admin@dga.sa
- **NCA Incident Report:** https://cert.gov.sa

---

## ✅ Security Checklist

Before deploying to production:

- [ ] Change default admin password
- [ ] Generate new strong JWT_SECRET
- [ ] Configure production CORS origins
- [ ] Enable HTTPS
- [ ] Set up database SSL
- [ ] Configure proper rate limits
- [ ] Enable audit logging
- [ ] Set up monitoring and alerts
- [ ] Review security headers
- [ ] Test all authentication flows
- [ ] Perform penetration testing
- [ ] Document security procedures
- [ ] Train team on security protocols
- [ ] Enable MFA for admin accounts
- [ ] Regular security audits scheduled

---

**Last Updated:** November 19, 2025  
**Security Level:** Development (Demo)  
**Compliance:** PDPL, NCA ECC (Pending Full Audit)
