// Security Test Script
// Tests all security features of the DGA platform

const axios = require('axios');

const API_URL = 'http://localhost:5000';

async function testLogin(email, password, expectedSuccess = true) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password
    });
    
    if (expectedSuccess) {
      console.log(`✅ Login successful for ${email}`);
      console.log(`   Token: ${response.data.token.substring(0, 50)}...`);
      console.log(`   User: ${response.data.user.full_name} (${response.data.user.role})`);
      return { success: true, data: response.data };
    } else {
      console.log(`❌ Login should have failed for ${email}`);
      return { success: false };
    }
  } catch (error) {
    if (!expectedSuccess) {
      console.log(`✅ Login correctly failed for ${email}`);
      console.log(`   Message: ${error.response?.data?.message}`);
      console.log(`   Attempts remaining: ${error.response?.data?.attemptsRemaining ?? 'N/A'}`);
      return { success: true, error: error.response?.data };
    } else {
      console.log(`❌ Login failed unexpectedly for ${email}`);
      console.log(`   Error: ${error.response?.data?.message || error.message}`);
      return { success: false, error: error.response?.data };
    }
  }
}

async function testHealthCheck() {
  try {
    const response = await axios.get(`${API_URL}/health`);
    console.log(`✅ Health check passed`);
    console.log(`   Status: ${response.data.message}`);
    console.log(`   Environment: ${response.data.environment}`);
    return true;
  } catch (error) {
    console.log(`❌ Health check failed: ${error.message}`);
    return false;
  }
}

async function testRateLimit() {
  console.log('\n🔒 Testing rate limiting (this will take a few seconds)...');
  let successCount = 0;
  let rateLimitHit = false;
  
  for (let i = 0; i < 12; i++) {
    try {
      await axios.post(`${API_URL}/api/auth/login`, {
        email: 'test@example.com',
        password: 'wrongpassword'
      });
      successCount++;
    } catch (error) {
      if (error.response?.status === 429) {
        rateLimitHit = true;
        console.log(`✅ Rate limit hit after ${i} attempts`);
        console.log(`   Message: ${error.response.data.message || error.response.data}`);
        break;
      }
    }
  }
  
  if (rateLimitHit) {
    console.log(`✅ Rate limiting is working correctly`);
  } else {
    console.log(`⚠️ Rate limit not hit after 12 attempts (may need adjustment)`);
  }
}

async function testAccountLockout() {
  console.log('\n🔒 Testing account lockout protection...');
  const testEmail = 'lockout-test@dga.sa';
  
  for (let i = 1; i <= 6; i++) {
    console.log(`\n   Attempt ${i}:`);
    const result = await testLogin(testEmail, 'wrongpassword', false);
    
    if (result.error?.locked) {
      console.log(`   ✅ Account locked after ${i - 1} failed attempts`);
      console.log(`   Remaining time: ${result.error.remainingMinutes} minutes`);
      break;
    }
    
    if (i === 6) {
      console.log(`   ⚠️ Account should be locked by now`);
    }
  }
}

async function runAllTests() {
  console.log('🚀 DGA Platform Security Tests\n');
  console.log('=' .repeat(50));
  
  // Test 1: Health Check
  console.log('\n📊 Test 1: Health Check');
  await testHealthCheck();
  
  // Test 2: Valid Login
  console.log('\n📊 Test 2: Valid Login');
  await testLogin('admin@dga.sa', 'admin123', true);
  
  // Test 3: Invalid Password
  console.log('\n📊 Test 3: Invalid Password');
  await testLogin('admin@dga.sa', 'wrongpassword', false);
  
  // Test 4: Invalid Email
  console.log('\n📊 Test 4: Invalid Email');
  await testLogin('nonexistent@dga.sa', 'admin123', false);
  
  // Test 5: Multiple Users
  console.log('\n📊 Test 5: Multiple Users');
  await testLogin('admin1@dga.sa', 'admin123', true);
  await testLogin('rm.central1@dga.sa', 'admin123', true);
  await testLogin('pd1@dga.sa', 'admin123', true);
  
  // Test 6: Account Lockout
  console.log('\n📊 Test 6: Account Lockout Protection');
  await testAccountLockout();
  
  // Test 7: Rate Limiting (optional - uncomment to test)
  // console.log('\n📊 Test 7: Rate Limiting');
  // await testRateLimit();
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ Security tests completed!\n');
}

// Run tests
runAllTests().catch(error => {
  console.error('❌ Test suite failed:', error.message);
  process.exit(1);
});
