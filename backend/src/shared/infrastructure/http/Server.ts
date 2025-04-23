import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import { Container } from '../dependency-injection/container';
import { createRoutes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { swaggerSpec } from './swagger';

export class Server {
  private app: express.Application;

  constructor(private readonly container: Container) {
    this.app = express();
    this.setupMiddleware();
    this.setupSwagger();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
  }

  private setupSwagger(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private setupRoutes(): void {
    this.app.use('/api', createRoutes(this.container));
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
    });
  }
} 