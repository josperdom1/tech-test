import { Pool } from 'pg';
import { Server } from './shared/infrastructure/http/Server';
import { createContainer } from './shared/infrastructure/dependency-injection/container';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'todos'
});

// Create container with dependencies
const container = createContainer(pool);

// Server setup
const server = new Server(container);
const port = parseInt(process.env.PORT || '3000');

server.start(port); 