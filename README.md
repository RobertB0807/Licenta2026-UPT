# Social Engineering Education Platform

**Bachelor's Thesis Project - UPT 2026**

A comprehensive mobile application designed to educate users about social engineering attacks through interactive simulations and real-world scenarios.

---

## 📱 Project Overview

This project consists of two main components:
1. **Backend API** - FastAPI-based REST API with PostgreSQL database
2. **Mobile App** - React Native cross-platform application (iOS/Android)

---

## 🎯 Features Implemented

### ✅ Backend (FastAPI + PostgreSQL)

#### Authentication System
- **User Registration** - Secure account creation with email validation
- **User Login** - JWT token-based authentication
- **Password Security** - Argon2 hashing (winner of Password Hashing Competition 2015)
- **Token Management** - Configurable JWT expiration (30 minutes default)

#### Security Features
- ✅ Argon2 password hashing (superior to bcrypt)
- ✅ JWT token authentication with HS256 algorithm
- ✅ CORS configuration for React Native development
- ✅ Timezone-aware timestamps (PostgreSQL TIMESTAMPTZ)
- ✅ User enumeration protection (generic error messages)
- ✅ Environment-based configuration (.env)

#### Database
- ✅ PostgreSQL 15 with SQLAlchemy ORM
- ✅ User model with email, username, hashed password
- ✅ Account status management (is_active flag)
- ✅ Server-side timestamp defaults
- ✅ Unique email constraint with indexing

#### API Documentation
- ✅ Auto-generated Swagger UI (`/docs`)
- ✅ ReDoc documentation (`/redoc`)
- ✅ Health check endpoints

### 🚧 Mobile App (Coming Soon)
- React Native setup
- Authentication screens
- Social engineering scenario simulations
- Progress tracking
- Educational content

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.13 | Programming language |
| **FastAPI** | 0.115.0 | Web framework |
| **PostgreSQL** | 15 | Database |
| **SQLAlchemy** | 2.0.36 | ORM |
| **Pydantic** | 2.10.5 | Data validation |
| **Argon2** | 25.1.0 | Password hashing |
| **python-jose** | 3.3.0 | JWT tokens |
| **Uvicorn** | 0.32.1 | ASGI server |

### Mobile (Planned)
- React Native
- Expo
- TypeScript
- React Navigation

---

## 📂 Project Structure

```
Licenta2026-UPT/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── main.py            # FastAPI application entry point
│   │   ├── core/
│   │   │   ├── config.py      # Configuration settings
│   │   │   └── security.py    # Password hashing & JWT
│   │   ├── db/
│   │   │   ├── database.py    # PostgreSQL connection
│   │   │   └── models.py      # SQLAlchemy models
│   │   ├── models/
│   │   │   └── user.py        # Pydantic schemas
│   │   ├── services/
│   │   │   └── auth_service.py # Business logic
│   │   └── api/
│   │       └── routes/
│   │           └── auth.py    # API endpoints
│   ├── .env                   # Environment variables (not in git)
│   ├── .env.example          # Environment template
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # Backend documentation
│
└── mobile/                    # React Native App (Coming Soon)
    └── ...
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.13+
- PostgreSQL 15+
- Node.js 18+ (for mobile app)

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create PostgreSQL database:**
```bash
createdb social_engineering_db
```

5. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your settings (SECRET_KEY, DATABASE_URL, etc.)
```

6. **Run the server:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

7. **Access API documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status |
| GET | `/health` | Health check |

---

## 🗄️ Database Schema

### Users Table
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | Primary Key | Auto-increment ID |
| email | String | Unique, Not Null | User email (login) |
| username | String | Not Null | Display name |
| hashed_password | String | Not Null | Argon2 hash |
| is_active | Boolean | Default: True | Account status |
| created_at | Timestamp (TZ) | Default: now() | Creation time |

---

## 🔐 Security Highlights

- **Argon2 Password Hashing** - Industry-standard, memory-hard algorithm
- **JWT Tokens** - Stateless authentication with configurable expiration
- **CORS Protection** - Configured for specific origins only
- **User Enumeration Prevention** - Generic error messages for login failures
- **Timezone-Aware Timestamps** - PostgreSQL TIMESTAMPTZ for accurate time tracking
- **Environment Variables** - Sensitive data stored in .env (not committed)

---

## 📝 Development Notes

### Why Argon2 over bcrypt?
- Winner of Password Hashing Competition 2015
- Better resistance to GPU/ASIC attacks
- Configurable memory and time costs
- Compatible with Python 3.13

### Why PostgreSQL?
- Professional-grade database for thesis project
- ACID compliance
- Advanced features (TIMESTAMPTZ, JSON, full-text search)
- Industry standard

### Why FastAPI?
- Modern, fast (high-performance)
- Auto-generated API documentation
- Type hints and validation with Pydantic
- Async support
- Easy to learn and use

---

## 🎓 Academic Context

**Institution:** Universitatea Politehnica Timișoara (UPT)  
**Year:** 2026  
**Project Type:** Bachelor's Thesis  
**Topic:** Social Engineering Education Platform  

**Objectives:**
- Educate users about social engineering attack vectors
- Provide interactive simulations of real-world scenarios
- Track user progress and learning outcomes
- Demonstrate secure authentication implementation
- Showcase modern web and mobile development practices

---

## 📊 Project Status

| Component | Status | Progress |
|-----------|--------|----------|
| Backend API | ✅ Complete | 100% |
| Database Schema | ✅ Complete | 100% |
| Authentication | ✅ Complete | 100% |
| API Documentation | ✅ Complete | 100% |
| Mobile App | 🚧 In Progress | 0% |
| Scenarios | 📅 Planned | 0% |
| Testing | 📅 Planned | 0% |

---

## 🔜 Next Steps

1. **Mobile App Development**
   - React Native setup
   - Authentication screens
   - API integration

2. **Social Engineering Scenarios**
   - Phishing simulations
   - Pretexting scenarios
   - Baiting examples

3. **Testing**
   - Unit tests (pytest)
   - Integration tests
   - E2E tests

4. **Deployment**
   - Backend deployment (Docker, Railway, or Render)
   - Mobile app deployment (App Store, Google Play)

---

## 📄 License

Bachelor's Thesis Project - All Rights Reserved

---

## 👤 Author

**Robert Balasoiu**  
Universitatea Politehnica Timișoara  
2026