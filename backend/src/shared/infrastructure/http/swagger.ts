import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'A RESTful API for managing todo duties',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Type: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'The type identifier',
            },
            name: {
              type: 'string',
              description: 'The type name',
            },
          },
          required: ['id', 'name'],
        },
        Duty: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'The duty identifier',
            },
            name: {
              type: 'string',
              description: 'The duty name',
            },
            description: {
              type: 'string',
              description: 'The duty description',
            },
            completed: {
              type: 'boolean',
              description: 'Whether the duty is completed',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the duty was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the duty was last updated',
            },
            type: {
              $ref: '#/components/schemas/Type',
            },
          },
          required: ['id', 'name', 'description', 'completed', 'createdAt', 'updatedAt', 'type'],
        },
      },
    },
  },
  apis: ['./src/**/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options); 