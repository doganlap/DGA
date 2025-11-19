# Vercel Deployment Guide - DGA Oversight Platform

## Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`

## Deployment Steps

### Option 1: Deploy via Vercel CLI

#### 1. Deploy Backend (API)
```bash
cd backend
vercel --prod
```

**Set Environment Variables in Vercel Dashboard:**
- `DATABASE_URL` = Your Prisma Cloud connection string
- `JWT_SECRET` = dga-2025-ultra-secure-jwt-secret-key-change-in-production
- `CORS_ORIGIN` = Your frontend URL (e.g., https://dga-oversight.vercel.app)
- `NODE_ENV` = production

**Backend URL:** `https://your-backend-name.vercel.app`

#### 2. Update Frontend API URL
Edit `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-name.vercel.app/api
```

#### 3. Deploy Frontend
```bash
cd frontend
vercel --prod
```

**Frontend URL:** `https://your-frontend-name.vercel.app`

---

### Option 2: Deploy via Vercel Dashboard

#### Backend Deployment
1. Go to https://vercel.com/new
2. Import Git Repository or upload backend folder
3. **Root Directory:** `backend`
4. **Framework Preset:** Other
5. **Build Command:** Leave empty or `npm install`
6. **Output Directory:** Leave empty
7. **Install Command:** `npm install`

**Environment Variables:**
```
DATABASE_URL=postgres://[your-prisma-cloud-connection]
JWT_SECRET=dga-2025-ultra-secure-jwt-secret-key-change-in-production
CORS_ORIGIN=https://dga-oversight.vercel.app
NODE_ENV=production
```

#### Frontend Deployment
1. Go to https://vercel.com/new
2. Import Git Repository or upload frontend folder
3. **Root Directory:** `frontend`
4. **Framework Preset:** Vite
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. **Install Command:** `npm install`

**Environment Variables:**
```
VITE_API_URL=https://your-backend-name.vercel.app/api
```

---

## Important Configuration

### Backend CORS Update
After deploying frontend, update backend CORS in `src/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5178',
    'https://dga-oversight.vercel.app',  // Your production frontend URL
    'https://your-custom-domain.sa'      // Optional custom domain
  ],
  credentials: true,
}));
```

Redeploy backend after updating CORS.

---

## Post-Deployment Checklist

### Backend API
- [ ] Test health endpoint: `https://your-backend.vercel.app/health`
- [ ] Test login: `POST https://your-backend.vercel.app/api/auth/login`
- [ ] Verify database connection (check logs)
- [ ] Test entities endpoint: `GET https://your-backend.vercel.app/api/dga/entities`

### Frontend
- [ ] Visit frontend URL: `https://your-frontend.vercel.app`
- [ ] Test login with: `admin@dga.sa` / `admin123`
- [ ] Verify dashboard loads data
- [ ] Check entities page
- [ ] Check programs page
- [ ] Check budget page

---

## Custom Domain Setup (Optional)

### For Frontend
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add domain: `dga.gov.sa` or `oversight.dga.gov.sa`
3. Add DNS records provided by Vercel to your domain registrar

### For Backend
1. Add domain: `api.dga.gov.sa`
2. Update frontend `.env.production`:
```
VITE_API_URL=https://api.dga.gov.sa/api
```
3. Update backend CORS to include custom domain

---

## Monitoring & Logs

### View Logs
```bash
# Backend logs
vercel logs <backend-deployment-url>

# Frontend logs
vercel logs <frontend-deployment-url>
```

### Vercel Dashboard
- Real-time logs: Project → Deployments → Click deployment → Logs
- Analytics: Project → Analytics
- Performance: Project → Speed Insights

---

## Rollback

If deployment fails:
```bash
vercel rollback
```

Or use Vercel Dashboard → Deployments → Previous deployment → Promote to Production

---

## Database Migrations on Production

**Important:** Migrations are already applied to Prisma Cloud database.

If you need to run migrations again:
```bash
# Local migration test
cd backend
npm run migrate

# Production database is already migrated
# No action needed
```

---

## Performance Optimization

### Frontend
- Static files cached by Vercel CDN
- Automatic image optimization
- Edge caching enabled

### Backend
- Serverless functions (auto-scaling)
- Connection pooling configured (2-10 connections)
- API response caching (consider adding Redis for Phase 4)

---

## Security Notes

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use Vercel environment variables** for all secrets
3. **Enable HTTPS only** - Vercel provides automatic SSL
4. **Update JWT_SECRET** for production
5. **Set secure CORS origins** - Only allow your domains

---

## Pricing

### Vercel Pro (Recommended for Production)
- **Cost:** $20/month per member
- **Features:**
  - Unlimited deployments
  - Analytics
  - Team collaboration
  - Priority support
  - 100GB bandwidth
  - Edge Functions

### Vercel Hobby (Development/Testing)
- **Cost:** Free
- **Limitations:**
  - Commercial use not allowed
  - Limited bandwidth
  - Basic features

---

## Support & Troubleshooting

### Common Issues

**1. CORS Error**
- Solution: Update backend CORS to include frontend URL
- Redeploy backend

**2. Database Connection Failed**
- Solution: Verify `DATABASE_URL` in Vercel environment variables
- Check Prisma Cloud connection string

**3. 404 on API Routes**
- Solution: Ensure `vercel.json` routes are correct
- Check backend deployment logs

**4. Build Failed**
- Solution: Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Test build locally: `npm run build`

### Get Help
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: support@vercel.com
- DGA Platform Issues: Contact development team

---

## Production URLs (After Deployment)

**Backend API:** `https://dga-oversight-api.vercel.app`  
**Frontend UI:** `https://dga-oversight.vercel.app`  
**Database:** `db.prisma.io:5432` (Already configured)

**Login Credentials:**
- Email: `admin@dga.sa`
- Password: `admin123`

---

## Next Steps After Deployment

1. **Phase 3:** Multi-Region Setup (separate regional databases)
2. **Phase 4:** Analytics & Reporting (enhanced dashboards)
3. **Phase 5:** Security & Compliance (PDPL, NCA ECC)
4. **Phase 8:** Azure Migration (if required by DGA policy)

---

**Deployment Ready!** ✅

Follow the steps above to deploy to Vercel production.
