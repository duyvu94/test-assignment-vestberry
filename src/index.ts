import express from 'express';
import { sequelize } from './database/database';
import graphqlMiddleware from './graphql';
import { config } from './config';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authMiddleware);

// GraphQL endpoint
app.use('/graphql', graphqlMiddleware);

// Start server
app.listen(config.PORT, async () => {
  console.log(`Server is running on port ${config.PORT}`);

  // Connect to database
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error(`Database connection failed: ${error}`);
  }
});
