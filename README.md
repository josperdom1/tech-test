# 🏗️ Tech Test Application

## 📚 Overview
This is a full-stack microservices application built with modern technologies and best practices. The application follows a microservices architecture pattern, with separate frontend and backend services that communicate through well-defined APIs. To check further details check README for each microservice.

The project is focused on backend architecture since is expertise.

## 🏗️ Architecture

### System Components
```
┌─────────────────┐     ┌─────────────────┐
│    Frontend     │     │     Backend     │
│  React + TS     │◄────┤  Node.js + TS   │
└─────────────────┘     └─────────────────┘
        ▲                      ▲
        │                      │
        ▼                      ▼
┌─────────────────┐     ┌─────────────────┐
│   Nginx Proxy   │     │    Database     │
│  (Production)   │     │   PostgreSQL    │
└─────────────────┘     └─────────────────┘
```


### Technology Stack
- **Frontend Service**
  - ⚛️ React with TypeScript
  - 🎨 Ant Design for UI components
  - 🧪 Jest for testing
  - 🐳 Docker for containerization

- **Backend Service**
  - 🟢 Node.js with TypeScript
  - 🎯 Express.js framework
  - 🗄️ PostgreSQL for data storage
  - 🧪 Jest for testing
  - 🐳 Docker for containerization

## 🚀 Getting Started

### Prerequisites
- 🐳 Docker and Docker Compose, fully dockerized app test and DB included.
- 📦 Node.js (for local development)
- 🗄️ PostgreSQL (for local development)
- 🔧 Git

### Quick Start with Docker
1. Clone the repository:
```bash
git clone <repository-url>
cd tech-test
```

2. Start all services:
```bash
docker-compose up
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api-docs

## 🛠️ Development Workflow

### Local Development
1. Start backend service:
```bash
cd backend
npm install
npm run dev
```

2. Start frontend service:
```bash
cd frontend
npm install
npm start
```

### Testing
- Frontend tests: `cd frontend && npm test`
- Backend tests: `cd backend && npm test`

### Database Management
```bash
# Reset database
docker-compose down --volumes
docker-compose up

# Access PostgreSQL CLI
docker-compose exec db psql -U postgres

# Common PostgreSQL commands
\l                  # List databases
\c database_name    # Connect to database
\dt                 # List tables
\d table_name       # Describe table
```

## 🔄 CI/CD Pipeline (Future improvements)
- 🏗️ Automated builds on push
- 🧪 Automated testing
- 🔍 Code quality checks
- 🚀 Automated deployment

## 📊 Monitoring and Logging (Future improvements)
- 📈 Application metrics
- 📝 Centralized logging
- 🔍 Error tracking
- 🚨 Alerting system

## 🔒 Security (Future improvements)
- 🔐 JWT authentication
- 🛡️ HTTPS encryption
- 🔒 Rate limiting
- 🚫 CORS configuration
- 🛡️ Input validation

## 🚀 Advanced (Future improvements)
- 🌐 Service mesh implementation
- 🔄 Message queue integration
- 📦 Container orchestration
- 🔍 Distributed tracing
- 🎯 Performance optimization

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
