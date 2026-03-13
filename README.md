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

The **Intelligent IT Placement System** is a top-tier, enterprise-grade web application designed to bridge the gap between talented tech students and leading partner companies. 

By eliminating manual hiring processes, the system natively implements a **Machine Learning Engine** via Natural Language Processing (NLP) and **Cosine Similarity Matrixes** within its backend to calculate exact match percentages between a student's technical resume array and a company's required tech-stack ecosystem.

Combined with an entirely custom-built **Glassmorphism Dark-Mode UI**, buttery smooth **Framer Motion** state transitions, and responsive asynchronous data visualizations via **Recharts**, this platform operates functionally and aesthetically at a FAANG (Facebook, Amazon, Apple, Netflix, Google) user-experience standard.

---

## 🔥 World-Class Features

### 1. 🧠 ML-Powered AI Matching Algorithm (Backend Engine)
- **Automated Resume Parsing**: Extracts technical skills, frameworks, and proficiencies directly from student profiles.
- **Cosine Similarity Verification**: Instead of direct string-matching, the system cross-evaluates candidate vectors against organizational demand vectors to formulate a mathematical "Match Percentage".
- **Visualized Admin Dashboard**: Administrators can spin up the Neural Matcher in real-time, watching simulated extraction phasing before viewing output metrics.

### 2. 🛡️ Advanced Security & Authentication
- **Multi-Role Access Control Architecture (RBAC)**: Secure access gating segregating completely different portals for `Student`, `Company`, and `Administrator` user-types.
- **Dynamic JWT Handling**: Safe token-based encryption utilizing stateless refreshes.
- **Google OAuth Integration**: Next-generation 1-click Authentication bypasses, auto-registering new candidates securely out of the box.

### 3. 🎨 Premium UI / UX Design
- **Deep Glassmorphism Theme**: Completely custom CSS variables pushing translucent `#111828` panels, heavy backdrop blurs, and neon primary (`#6366f1` / `#ec4899`) layout glows.
- **Framer Motion Real-Time Rendering**: Every page, stat card, and navigation transition operates via interactive spring physics or linear unmount processing.
- **Responsive Navigation**: State-aware sticky sidebar that calculates highlighted elements contextually.

### 4. 📈 Rich Metric Dashboards
- **Recharts Data Visualization**: Complex `<AreaChart />` and `<BarChart />` SVGs tied iteratively into system metrics simulating Placement Ratios over time compared asynchronously to organizational demands.

---

## 🛠️ Technology Stack Ecosystem

### Frontend Layer (Client)
- **Core Library**: React.js (via Vite)
- **Styling Architecture**: **Material UI (MUI) v5** with deeply reconfigured theme injection & custom raw CSS globally.
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **State Management**: Zustand (Extremely fast, slice-based persistent states keeping LocalStorage memory locked).
- **Network Protocol**: Axios (REST HTTP interceding)

### Backend Layer (Server)
- **Core Framework**: Python 3.9+ / Flask
- **ORM / Database Binding**: SQLAlchemy & PostgreSQL (configured natively with SQLite fallbacks).
- **Authentication Wrapper**: Flask-JWT-Extended + Google Auth Transport
- **Machine Learning Dependencies**: `scikit-learn`, `pandas`, `numpy`, `joblib`
- **Security / Hashing**: Werkzeug (`pbkdf2:sha256`)

---

## ⚙️ System Architecture & Logic Flow

1. **The Company Portal**: A Partner logs in securely. They navigate to their Dynamic Matrix board, inputting string requirements (e.g., `"React, Node.js, AWS, TypeScript"`).
2. **The Student Context**: A Candidate logs in, creates their profile, uploads/enters their resume.
3. **The ML Intersection**: The Admin presses **"Run AI Matching Engine"**. 
   - Backend Python triggers NLP processing via `pandas`.
   - String corpuses are verified via `scikit-learn` algorithms.
   - Outputs push JSON arrays of Top Matches back to the front-end securely.

---

## 🚦 Installation & Local Environment Setup

### 1. Clone & Prepare the Repository
Ensure you have Node.js (`v18+`) and Python (`v3.9+`) globally installed.

### 2. Booting up the Backend (Flask / Python)
Navigate to the root backend structure.
```bash
cd backend
python3 -m venv venv

# Activate Virtual Environment
source venv/bin/activate  # On Mac/Linux
# OR: .\venv\Scripts\activate # On Windows

# Install all Heavy/ML Dependencies
pip install -r requirements.txt

# Start the Application (Defaults to http://127.0.0.1:5000)
python app.py
```

### 3. Booting up the Frontend (Vite / React)
Open a separate split terminal instance.
```bash
cd frontend

# Install exact node modules
npm install
npm install @react-oauth/google jwt-decode # (If missing)

# Configure Environment
# Rename/Create a .env file and add:
# VITE_GOOGLE_CLIENT_ID=your_auth_key_here

# Run Hot-Reloading Production Server
npm run dev
```
The client natively boots onto `http://localhost:5173`.

---

## 📘 User Operation Guide

### **A. Creating an Account**
- Hit the root directory `/login`. 
- Utilize the *Sign Up* parameters. Be sure to select a mock role (Student vs Company) to access different dynamic UI systems once inside.
- *(Optional)* Trigger the pill-shaped **Continue with Google** token.

### **B. Navigating the Dashboards**
- **Dashboard**: Global lookover on placement statistics.
- **Student Profile**: Enter mock variables to simulate an AI Extractor reading the skills from your parameters.
- **Company Profile**: Edit the requirement tags iteratively.

### **C. The Neural Network Matcher**
- Exclusively available to `Admin` level views. Navigate to **AI Matching Dashboard**. 
- Click the glowing master trigger button to watch the `Framer Motion` states loop through Python initialization logic and fire dummy success responses back formatted via premium styled grids.

---


