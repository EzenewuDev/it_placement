<div align="center">
  
# 🚀 Intelligent IT Placement & AI Matching Engine 
**A World-Class, AI-Powered Recruitment Management System**

[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react&logoColor=black)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-lightgrey?logo=flask)](https://flask.palletsprojects.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.3.2-orange?logo=scikit-learn)](https://scikit-learn.org/)
[![Material UI](https://img.shields.io/badge/Material--UI-5.x-blue?logo=mui)](https://mui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-f472b6?logo=framer)](https://www.framer.com/motion/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192?logo=postgresql)](https://www.postgresql.org/)

</div>

---

## 📖 Executive Overview

The **Intelligent IT Placement System** is a top-tier, enterprise-grade web application designed to bridge the gap between talented tech students and leading partner companies across Nigeria (and beyond). 

Developed as a highly professional defense showcase, this platform completely revolutionizes manual IT placement. It natively implements a **Machine Learning Engine** via Natural Language Processing (NLP) and **Cosine Similarity Matrices** within its backend to calculate exact match percentages between a student's technical resume array and a company's required tech-stack ecosystem.

Combined with an entirely custom-built **Dynamic Dark/Light Mode UI**, buttery smooth **Framer Motion** state transitions, advanced role-based routing, and responsive asynchronous data visualizations, this platform operates functionally and aesthetically at a FAANG (Facebook, Amazon, Apple, Netflix, Google) user-experience standard.

---

## 🔥 Comprehensive 100% Feature List

### 1. 🛡️ Advanced Security & Multi-Auth Ecosystem
- **Google OAuth Integration**: Next-generation 1-click Authentication bypasses, seamlessly auto-registering new candidates securely out of the box using JWT access tokens.
- **Apple Mock Login**: Built-in simulated Apple identity provider with precise network delay loading states, engineered explicitly for high-level defense demonstration.
- **Multi-Role Access Control Architecture (RBAC)**: Secure access gating segregating completely different portals and navigation links for `Student`, `Company`, and `Admin`/`Supervisor` user-types.

### 2. 🎨 Premium Dynamic UI & Seamless Theming
- **Zustand Powered Light/Dark Mode**: A deeply integrated global theme store that instantly flips typography, glass backgrounds, SVGs, and box-shadows dynamically via a native Sun/Moon header toggle. State is persistently saved in local storage.
- **Deep Glassmorphism Theme**: Completely custom CSS variables pushing translucent `#111828` / `#fff` panels, heavy backdrop blurs, and neon primary (`#6366f1` / `#ec4899`) layout glows across all portals.
- **Framer Motion Real-Time Rendering**: Every page, stat card, and navigation transition operates via interactive spring physics or linear unmount processing.

### 3. 🧠 ML-Powered AI Matching Algorithm (Backend Engine)
- **Automated Resume Parsing**: Extracts technical skills, frameworks, and proficiencies directly from student profiles.
- **Cosine Similarity Verification**: Instead of direct string-matching, the system cross-evaluates candidate vectors against organizational demand vectors to formulate a mathematical "Match Percentage".
- **Visualized Admin Dashboard**: Administrators can spin up the Neural Matcher in real-time, watching simulated extraction phasing before viewing output metrics.

### 4. 🏢 Professional Dashboard Functionality & Information Modules
- **IT Placement News Updates**: A dedicated module displaying live, color-coded urgency announcements (e.g., SIWES Deadlines, Official Notice uploads) specifically tailored to nationwide students.
- **Nationwide Active IT Slots**: Real-time availability directory mapping tech-stack demands across Nigerian hubs (Lagos, Abuja, Ibadan), dynamically displaying open slots and specific company roles.
- **Recharts Data Visualization**: Complex `<AreaChart />` and `<BarChart />` SVGs tied iteratively into system metrics simulating Placement Ratios over time.

### 5. 💳 Dedicated Finance & Payment Gateways
- **Integrated Payments Module**: Both `Student` (Placement Tokens) and `Company` (Annual Dues) roles have access to highly polished, UI-perfect credit card simulation gateways validating simulated payments via secure loaders.

### 6. 👁️ Supervisory & Tracking Hub
- **Supervisor Dashboard**: Dedicated administrative portals tracking assigned cohorts based on regional zones.
- **Geo-Match Insights**: An automated matching algorithm pairing students with school supervisors based on the geographical proximity of their placement company, updating live training progression statuses visually.

---

## 🛠️ Technology Stack Ecosystem

### Frontend Layer (Client)
- **Core Library**: React.js 18 (via Vite 7.x)
- **Styling Architecture**: **Material UI (MUI) v5** with unified centralized overrides (`App.jsx` + `themeStore`).
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **State Management**: Zustand (Extremely fast, slice-based persistent states keeping LocalStorage memory locked).
- **Network Protocol**: Axios (REST HTTP interceding)

### Backend Layer (Server)
- **Core Framework**: Python 3.9+ / Flask (Running on isolated port `5001`)
- **ORM / Database Binding**: SQLAlchemy & PostgreSQL (configured natively with SQLite fallbacks).
- **Authentication Wrapper**: Flask-JWT-Extended + Google Auth Transport
- **Machine Learning Dependencies**: `scikit-learn`, `pandas`, `numpy`, `joblib`
- **Security / Hashing**: Werkzeug (`pbkdf2:sha256`)

---

## 🚦 Installation & Local Environment Setup

### 1. Booting up the Backend (Flask / Python)
Navigate to the root backend structure in your terminal.
```bash
cd backend
python3 -m venv venv

# Activate Virtual Environment
source venv/bin/activate  # On Mac/Linux
# OR: .\venv\Scripts\activate # On Windows

# Install Dependencies
pip install -r requirements.txt

# Start the Application (Configured to port 5001)
python app.py
```

### 2. Booting up the Frontend (Vite / React)
Open a separate split terminal instance.
```bash
cd frontend

# Install exact node modules
npm install

# Configure Environment
# Rename/Create a .env file and add:
# VITE_GOOGLE_CLIENT_ID=your_auth_key_here

# Run Hot-Reloading Production Server
npm run dev
```
The application natively boots onto `http://localhost:5173`. Clicking the graduation cap logo acts as a global unified Home button routing to the unified Overview.tted via premium styled grids.

---


