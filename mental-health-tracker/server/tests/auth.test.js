const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Auth Endpoints', () => {
    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.TEST_MONGODB_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should register new user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });
});