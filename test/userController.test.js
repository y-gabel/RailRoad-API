const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

// ... Assurez-vous d'initialiser et de configurer votre base de données de test

describe('User Controller', () => {
  beforeAll(async () => {
    // Connectez-vous à la base de données de test
    await mongoose.connect('mongodb://localhost:27017/testrailroad', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Déconnectez-vous de la base de données de test
    await mongoose.disconnect();
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        email: 'testuser@example.com',
        pseudo: 'testuser',
        password: 'testpassword',
        role: 'normal',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('email', 'testuser@example.com');
  });

  // Ajoutez d'autres tests pour les fonctionnalités de l'utilisateur
});
