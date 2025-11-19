// Test setup file
// This file runs before each test suite

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.PORT = 5001; // Use different port for testing

// Suppress console logs during tests (optional)
if (!process.env.DEBUG) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}

// Global test timeout
jest.setTimeout(10000);

// Clean up after all tests
afterAll(async () => {
  // Wait for any pending operations
  await new Promise(resolve => setTimeout(resolve, 500));
});
