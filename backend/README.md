# 🚀 Todo Backend

A robust backend application for managing todo duties, built with Express.js and following Domain-Driven Design (DDD) principles, Hexagonal Architecture, and CQRS pattern.

## 🏗️ Architecture Overview

### Design Patterns and Principles

1. **🎯 Domain-Driven Design (DDD)**
   - Clear bounded contexts (duties, types)
   - Rich domain models with encapsulated business logic
   - Value objects and entities
   - Domain events and aggregates

2. **🏛️ Hexagonal Architecture (Ports and Adapters)**
   - Core domain logic isolated from external concerns
   - Ports (interfaces) define the contract
   - Adapters implement the ports
   - Dependencies point inward

3. **🔄 CQRS (Command Query Responsibility Segregation)**
   - Separate command and query models
   - Commands for state changes
   - Queries for data retrieval
   - Better scalability and maintainability

4. **⚡ Event-Driven Architecture**
   - Domain events for duty operations (created, updated, deleted)
   - Event handlers for processing events
   - Automatic logging of all duty operations
   - Decoupled event processing from business logic
   - Easy to extend with new event handlers

5. **🧹 Clean Architecture**
   - Clear separation of concerns
   - Dependency rule: dependencies point inward
   - Business rules independent of frameworks
   - Testable at all levels

6. **⭐ SOLID Principles**
   - Single Responsibility Principle: Each class has one reason to change
   - Open/Closed Principle: Open for extension, closed for modification
   - Liskov Substitution Principle: Subtypes are substitutable
   - Interface Segregation: Many specific interfaces
   - Dependency Inversion: Depend on abstractions

### 📁 Project Structure

```
src/
├── shared/                 # Shared infrastructure and domain
│   ├── domain/
│   │   ├── errors/        # Domain-specific errors
│   │   └── events/        # Base domain events
│   └── infrastructure/
│       ├── dependency-injection/  # DI container
│       └── http/          # HTTP infrastructure
├── duties/                # Duties bounded context
│   ├── application/       # Application services
│   │   ├── commands/     # Command handlers
│   │   ├── queries/      # Query handlers
│   │   └── event-handlers/ # Event handlers
│   ├── domain/           # Domain model
│   │   ├── entities/     # Domain entities
│   │   ├── events/       # Duty-specific events
│   │   └── repositories/ # Repository interfaces
│   └── infrastructure/   # Infrastructure implementations
│       ├── http/         # HTTP adapters
│       └── persistence/  # Database adapters
└── types/                # Types bounded context
    └── domain/
        └── entities/     # Type entity
```

## ⚡ Event-Driven Pattern Implementation

The application implements an event-driven pattern for logging duty operations. Here's how it works:

### 1. 📨 Domain Events
- `DutyCreatedEvent`: Emitted when a duty is created
- `DutyUpdatedEvent`: Emitted when a duty is updated
- `DutyDeletedEvent`: Emitted when a duty is deleted

### 2. 🎮 Event Handler
- `DutyEventHandler`: Processes duty-related events
- Creates log entries for each operation
- Stores logs in the `duty_logs` table

### 3. 💾 Database Schema
```sql
CREATE TABLE duty_logs (
    id UUID PRIMARY KEY,
    duty_id UUID NOT NULL REFERENCES duties(id),
    action VARCHAR(50) NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);
```

### 4. 🔄 Flow
1. Command executes (create/update/delete)
2. Command emits appropriate event
3. Event handler processes the event
4. Log entry is created in the database

### 5. ✨ Benefits
- Decoupled logging from business logic
- Easy to add new event handlers
- Complete audit trail of duty operations
- Extensible for future features (notifications, analytics, etc.)

## 📚 API Documentation

The API is documented using Swagger UI, which provides:
- Interactive API documentation
- Request/response schemas
- Try-it-out functionality
- OpenAPI 3.0 specification

Access the Swagger UI at: `http://localhost:3000/api-docs`

## 💾 Database Structure

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

## 🔑 Key Design Decisions

1. **🔄 Dependency Injection Container**
   - Centralized dependency management
   - Easy to swap implementations
   - Better testability
   - Clear dependency flow

2. **📝 Raw SQL Queries**
   - Assignment requirement
   - Full control over database operations
   - Better performance
   - No ORM overhead
   - Explicit data access patterns

3. **⚠️ Error Handling**
   - Custom error hierarchy
   - Domain-specific errors
   - Consistent error responses
   - Proper error propagation

4. **🔐 Authentication**
   - Mocked authentication middleware
   - Ready for real implementation
   - Clear separation of concerns
   - Easy to extend

5. **🐳 Docker Configuration**
   - Development and production ready
   - PostgreSQL container
   - Environment variables
   - Volume management

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v20 or higher)
- Docker and Docker Compose (Recommended option)
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
   npm run dev:docker
   ```

## 🧪 Testing

**Check README.md in backend/tests**

## 🚀 Future Improvements

1. **🔐 Real Authentication**
   - Implement JWT authentication
   - Add user management
   - Role-based access control

2. **✨ Additional Features**
   - Due dates
   - Priority levels
   - Search and filtering

3. **⚡ Performance**
   - Caching layer with redis or similar
   - Query optimization
   - Connection pooling

4. **📊 Monitoring**
   - Metrics collection
   - Health checks

5. **🏗️ Enforced screaming architecture and single responsibility principle**
   - Since the feature is really simple, I do not want to make overengineering and make it hard to correct.
   - **You might find some antipatterns in favor of readability**


### 🔄 CI/CD & Code Quality

1. **🤖 Continuous Integration**
   - GitHub Actions workflow
   - Automated testing on push/PR
   - Code coverage reporting
   - Build verification
   - Docker image publishing

2. **🚀 Continuous Deployment**
   - Automated deployment to staging
   - Production deployment gates
   - Rollback capabilities
   - Environment-specific configurations

3. **🐶 Husky Git Hooks**
   - Pre-commit hooks
     - Code formatting
     - Lint checking
     - Type checking
   - Pre-push hooks
     - Unit tests
     - Build verification
   - Commit message validation

4. **✨ Code Quality Tools**
   - ESLint configuration
     - Strict TypeScript rules
     - Best practices enforcement
     - Custom rule sets
   - Prettier formatting
     - Consistent code style
     - Automatic formatting
     - Editor integration
   - TypeScript strict mode
     - Type safety
     - Better IDE support
     - Reduced runtime errors

5. **📊 Quality Gates**
   - Minimum test coverage (80%)
   - Zero lint errors
   - Successful build required
   - All tests must pass
   - Branch protection rules

## 📄 License

MIT License - see LICENSE file for details
