# AI-Based Career Guidance and Skill Management Portal

A full-stack, enterprise-grade web application designed to help students and job seekers identify suitable career paths, evaluate existing technical and professional proficiencies through online assessments, perform automated skill-gap analysis, and navigate structured learning roadmaps.

---

## 🚀 Live Application URLs

- **Frontend Web Portal**: [http://localhost:5173](http://localhost:5173)
- **Backend REST API**: [http://localhost:8080/api](http://localhost:8080/api)

---

## ⚡ Quick Demo Accounts (1-Click Instant Login Enabled)

On the login screen, you can click either 1-click demo button or sign in with:

| Role | Email | Password | Features Accessible |
| :--- | :--- | :--- | :--- |
| **Student / Job Seeker** | `student@careeros.local` | `student123` | Profile & Skills, Timed Online Assessments, AI Career Matcher, Skill-Gap Analysis, Curated Learning Roadmaps |
| **Administrator** | `admin@careeros.local` | `admin123` | Platform Analytics, User Management, Career Roles Catalog, Question Bank, Skills Catalog, Learning Resources CRUD |

---

## 🛠️ Technology Stack

- **Backend**: Java 21, Spring Boot 3.3.4, Spring Security, Spring Data JPA, JWT (Stateless Authentication), Maven.
- **Frontend**: React 19, Vite, Modern CSS Design System, Lucide Icons, Axios.
- **Database**: MySQL 8.0 (`career_portal` database with automatic JPA schema mapping & pre-seeded catalog).
- **AI Recommendation Engine**: Multi-factor algorithm combining declared skills (45%), verified assessment performance (35%), and academic domain interests (20%).

---

## 🧩 Main Functional Modules

1. **User Registration and Authentication**: Secure JWT-based authentication supporting both Student (`USER`) and Administrator (`ADMIN`) roles with encrypted passwords.
2. **User Profile Management**: Academic degree/branch, college/organization, career preferences, domain interests, and professional bio.
3. **Skills and Interests Management**: Skill catalog with proficiency tiers (Beginner, Intermediate, Advanced) and assessment verification badges.
4. **Online Skill Assessment**: Interactive timed multiple-choice assessments across domains (Java, Python, SQL, React, Spring Boot, Data Structures, Machine Learning).
5. **Assessment Result Management**: Instant scoring, passing criteria (60%+), automated skill verification, detailed question-by-question review, and performance history.
6. **Career Information Management**: Comprehensive career catalog with role titles, industry domains, descriptions, and prerequisite skills benchmarks.
7. **AI-Based Career Recommendation**: Intelligent scoring system ranking matching career paths with transparent rationales (strengths, weak skills, missing skills).
8. **Skill-Gap Analysis**: Benchmarks user proficiencies against targeted careers, identifying matched skills, weak skills, and missing competencies with a readiness percentage.
9. **Curated Learning Roadmaps**: Recommended documentation, online courses, and video tutorials mapped directly to identified skill gaps.
10. **Progress Tracking Dashboard**: Interactive KPIs, assessment history tracking, top career matches, and quick gap-analysis shortcuts.
11. **Administrator Management**: Comprehensive admin dashboard with platform analytics, user role promotion/demotion, career catalog management, question bank management, and skill/resource CRUD.

---

## 📦 Project Structure

```
career guidance/
├── backend/
│   ├── src/main/java/com/career/portal/
│   │   ├── config/             # DatabaseSeeder, Security configuration
│   │   ├── controller/         # Auth, Profile, Assessment, Career, Recommendation, Resource, Skill, Admin
│   │   ├── dto/                # Request & Response Data Transfer Objects
│   │   ├── entity/             # JPA Entities (User, Skill, Career, Assessment, Resource, UserSkill, AssessmentResult)
│   │   ├── repository/         # Spring Data JPA Repositories
│   │   ├── security/           # JWT Utils & Authentication Filters
│   │   └── service/            # AI recommendation, skill-gap analysis, assessment grading, profile logic
│   ├── src/main/resources/
│   │   └── application.properties # MySQL datasource and JWT configuration
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/         # Dashboard, ProfileSkills, AssessmentHub, CareerRecommendations, SkillGapAnalysis, ResourcesHub, AdminPanel, Navbar, AuthModal
    │   ├── services/api.js     # Axios client with JWT interceptors
    │   ├── App.jsx             # Root component with state navigation & role handling
    │   ├── index.css           # Glassmorphism design system & responsive styling
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js          # Port 5173 & /api proxy to http://localhost:8080
```

---

## 🔧 How to Run the Application

### 1. Database Setup (MySQL)
Ensure MySQL is running (default port `3306`). The backend automatically creates and seeds `career_portal` if it does not already exist.
Credentials configured in [application.properties](file:///c:/Users/KOLAKALURI%20MADHURI/OneDrive/Desktop/career%20guidance/backend/src/main/resources/application.properties):
- Username: `root`
- Password: `Root`

### 2. Run Backend (Spring Boot)
Open PowerShell or Terminal:
```powershell
cd "c:\Users\KOLAKALURI MADHURI\OneDrive\Desktop\career guidance\backend"
mvn spring-boot:run
```
Backend will start on: **`http://localhost:8080`**

### 3. Run Frontend (React + Vite)
In a second terminal:
```powershell
cd "c:\Users\KOLAKALURI MADHURI\OneDrive\Desktop\career guidance\frontend"
npm.cmd run dev
```
Frontend will start on: **`http://localhost:5173`**
