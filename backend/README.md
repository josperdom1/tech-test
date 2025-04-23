# Todo Backend

A robust backend application for managing todo duties, built with Express.js and following Domain-Driven Design (DDD) principles, Hexagonal Architecture, and CQRS pattern.

## Architecture Overview

### Design Patterns and Principles

1. **Domain-Driven Design (DDD)**
   - Clear bounded contexts (duties, types)
   - Rich domain models with encapsulated business logic
   - Value objects and entities
   - Domain events and aggregates

2. **Hexagonal Architecture (Ports and Adapters)**
   - Core domain logic isolated from external concerns
   - Ports (interfaces) define the contract
   - Adapters implement the ports
   - Dependencies point inward

3. **CQRS (Command Query Responsibility Segregation)**
   - Separate command and query models
   - Commands for state changes
   - Queries for data retrieval
   - Better scalability and maintainability

4. **Clean Architecture**
   - Clear separation of concerns
   - Dependency rule: dependencies point inward
   - Business rules independent of frameworks
   - Testable at all levels

5. **SOLID Principles**
   - Single Responsibility Principle: Each class has one reason to change
   - Open/Closed Principle: Open for extension, closed for modification
   - Liskov Substitution Principle: Subtypes are substitutable
   - Interface Segregation: Many specific interfaces
   - Dependency Inversion: Depend on abstractions

### Project Structure

```
src/
├── shared/                 # Shared infrastructure and domain
│   ├── domain/
│   │   └── errors/        # Domain-specific errors
│   └── infrastructure/
│       ├── dependency-injection/  # DI container
│       └── http/          # HTTP infrastructure
├── duties/                # Duties bounded context
│   ├── application/       # Application services
│   │   ├── commands/     # Command handlers
│   │   └── queries/      # Query handlers
│   ├── domain/           # Domain model
│   │   ├── entities/     # Domain entities
│   │   └── repositories/ # Repository interfaces
│   └── infrastructure/   # Infrastructure implementations
│       ├── http/         # HTTP adapters
│       └── persistence/  # Database adapters
└── types/                # Types bounded context
    └── domain/
        └── entities/     # Type entity
```

## Database Structure

### Schema

The application uses PostgreSQL with the following schema:

```sql
-- Types table
CREATE TABLE types (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Duties table
CREATE TABLE duties (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    type_id UUID NOT NULL REFERENCES types(id)
);

-- Index for better query performance
CREATE INDEX idx_duties_type_id ON duties(type_id);
```

### Initial Data

The database is initialized with sample data:

```sql
-- Sample types
INSERT INTO types (id, name) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Work'),
    ('22222222-2222-2222-2222-222222222222', 'Personal'),
    ('33333333-3333-3333-3333-333333333333', 'Shopping'),
    ('44444444-4444-4444-4444-444444444444', 'Health');

-- Sample duties
INSERT INTO duties (id, name, completed, created_at, updated_at, type_id) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Complete project documentation', false, NOW(), NOW(), '11111111-1111-1111-1111-111111111111'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Go to the gym', true, NOW(), NOW(), '44444444-4444-4444-4444-444444444444'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Buy groceries', false, NOW(), NOW(), '33333333-3333-3333-3333-333333333333'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Call family', false, NOW(), NOW(), '22222222-2222-2222-2222-222222222222');
```

### Database Construction

The database is automatically constructed when you start the application using Docker Compose. The process is:

1. PostgreSQL container starts
2. `init.sql` script is executed automatically
3. Tables are created with proper constraints
4. Initial data is inserted
5. Indexes are created for performance

To manually construct the database:

1. Connect to PostgreSQL:
   ```bash
   psql -U postgres -d todos
   ```

2. Execute the initialization script:
   ```bash
   \i /path/to/init.sql
   ```

## Key Design Decisions

1. **Dependency Injection Container**
   - Centralized dependency management
   - Easy to swap implementations
   - Better testability
   - Clear dependency flow

2. **Raw SQL Queries**
   - Assignment requirement
   - Full control over database operations
   - Better performance
   - No ORM overhead
   - Explicit data access patterns

3. **Error Handling**
   - Custom error hierarchy
   - Domain-specific errors
   - Consistent error responses
   - Proper error propagation

4. **Authentication**
   - Mocked authentication middleware
   - Ready for real implementation
   - Clear separation of concerns
   - Easy to extend

5. **Docker Configuration**
   - Development and production ready
   - PostgreSQL container
   - Environment variables
   - Volume management

## API Endpoints

### Duties

- `POST /api/duties` - Create a new duty
- `GET /api/duties/:id` - Get a duty by ID
- `PUT /api/duties/:id` - Update a duty
- `DELETE /api/duties/:id` - Delete a duty

## Setup Instructions

### Prerequisites

- Node.js (v20 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=duties
   ```

4. Start the application with Docker:
   ```bash
   docker-compose -f docker/docker-compose.yml up --build
   ```

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Run tests:
   ```bash
   npm test
   ```

## Testing

TODO

## Future Improvements

1. **Real Authentication**
   - Implement JWT authentication
   - Add user management
   - Role-based access control

2. **Additional Features**
   - Duty categories
   - Due dates
   - Priority levels
   - Search and filtering

3. **Performance**
   - Caching layer
   - Query optimization
   - Connection pooling

4. **Monitoring**
   - Logging system
   - Metrics collection
   - Health checks

## License

MIT License - see LICENSE file for details 