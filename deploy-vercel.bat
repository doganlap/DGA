@echo off
echo ========================================
echo DGA Oversight Platform - Vercel Deployment
echo ========================================
echo.

echo Step 1: Installing Vercel CLI (if not installed)
call npm list -g vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
) else (
    echo Vercel CLI already installed
)

echo.
echo Step 2: Building Frontend
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo Frontend build failed!
    exit /b 1
)
cd ..

echo.
echo Step 3: Ready to Deploy
echo.
echo IMPORTANT: Before deploying, set these environment variables in Vercel:
echo.
echo Backend Environment Variables:
echo   DATABASE_URL = postgres://7adda8e42fc0eb3496e98548aa7aeb6fb23913bf75b3d1df34ff84d900e8d8bc:sk_ItoaunvtC_nusXsKKGLZn@db.prisma.io:5432/postgres?sslmode=require
echo   JWT_SECRET = dga-2025-ultra-secure-jwt-secret-key-change-in-production
echo   CORS_ORIGIN = [Your Frontend URL after deployment]
echo   NODE_ENV = production
echo.
echo Frontend Environment Variables:
echo   VITE_API_URL = [Your Backend URL]/api
echo.
echo ========================================
echo Deployment Options:
echo ========================================
echo.
echo Option 1: Deploy Backend
echo   cd backend
echo   vercel --prod
echo.
echo Option 2: Deploy Frontend (after updating VITE_API_URL)
echo   cd frontend
echo   vercel --prod
echo.
echo Option 3: Deploy via Vercel Dashboard
echo   Visit: https://vercel.com/new
echo   Import this repository
echo.
echo ========================================
echo For detailed instructions, see: VERCEL_DEPLOYMENT.md
echo ========================================
