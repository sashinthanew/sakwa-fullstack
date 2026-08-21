# sakwa-fullstack

## Project Description

sakwa-fullstack is a Express.js API developed to provide specific functionality. For more details, please refer to the source code or documentation.

## Project Summary

- **Project Type:** Express.js API
- **Primary Languages:** Not specified
- **Frameworks:** Express.js
- **Package Managers:** npm

## Features

- Built with Express.js
- Includes automated tests

## Project Structure

Here is the complete project structure with descriptions:

```
├── backend/ 
    ├── config/ (configuration files)
        └── db.js (JavaScript source code)
    ├── controllers/ (request handlers)
        ├── employeeController.js (JavaScript source code)
        ├── preProcessingController.js (JavaScript source code)
        ├── productionProcessController.js (JavaScript source code)
        ├── qualityCheckController.js (JavaScript source code)
        ├── qualityControlController.js (JavaScript source code)
        └── rawMaterialController.js (JavaScript source code)
    ├── middleware/ (middleware functions)
        ├── adminAuth.js (JavaScript source code)
        ├── auth.js (JavaScript source code)
        ├── errorHandler.js (JavaScript source code)
        └── roleAuth.js (JavaScript source code)
    ├── models/ (data models and schemas)
        ├── Employee.js (JavaScript source code)
        ├── EmployeePerformance.js (JavaScript source code)
        ├── ImagePrediction.js (JavaScript source code)
        ├── LoginHistory.js (JavaScript source code)
        ├── MaterialAnalysis.js (JavaScript source code)
        ├── PerformanceData.js (JavaScript source code)
        ├── PreProcessing.js (JavaScript source code)
        ├── ProductionProcess.js (JavaScript source code)
        ├── QualityCheck.js (JavaScript source code)
        ├── QualityControlRecord.js (JavaScript source code)
        ├── RawMaterial.js (JavaScript source code)
        ├── Supplier.js (JavaScript source code)
        └── User.js (JavaScript source code)
    ├── package-lock.json (JSON data)
    ├── package.json (project metadata and dependencies)
    ├── routes/ (route definitions)
        ├── authRoutes.js (JavaScript source code)
        ├── clarifaiRoutes.js (JavaScript source code)
        ├── employeePerformanceRoutes.js (JavaScript source code)
        ├── employeeRoutes.js (JavaScript source code)
        ├── labelRoutes.js (JavaScript source code)
        ├── loginHistoryRoutes.js (JavaScript source code)
        ├── preProcessing.js (JavaScript source code)
        ├── productionProcess.js (JavaScript source code)
        ├── qualityChecks.js (JavaScript source code)
        ├── qualityControlRoutes.js (JavaScript source code)
        ├── rawMaterialRoutes.js (JavaScript source code)
        ├── roboflow-workflow.js (JavaScript source code)
        ├── roleProtectedRoutes.js (JavaScript source code)
        ├── supplierRoutes.js (JavaScript source code)
        └── userRoutes.js (JavaScript source code)
    ├── scripts/ (utility scripts)
        ├── createAdminUser.js (JavaScript source code)
        ├── dropEmployeeEmailIndex.js (JavaScript source code)
        ├── printEmployees.js (JavaScript source code)
        ├── printUsers.js (JavaScript source code)
        ├── removeDuplicateAdminUsers.js (JavaScript source code)
        └── syncUsersToEmployees.js (JavaScript source code)
    ├── server.js (server entry point)
    └── uploads/ 
        ├── 1750958654366-166455216-WhatsApp Image 2025-06-12 at 20.04.25 (1) (1).jpeg 
        ├── 1750961959034-560960699-Annual Perahera held by temple of sacred toothâ¦.jpg 
        ├── 1751381121826-78502676-WhatsApp Image 2025-06-28 at 15.24.08.jpeg 
        ├── 1751389745255-45558905-WhatsApp Image 2025-07-01 at 21.52.49 (1).jpeg 
        ├── 1751390068475-993352087-WhatsApp Image 2025-07-01 at 21.52.49 (1).jpeg 
        ├── 1751883124224-424432649-gourami3.png 
        ├── 1751890914124-188744207-dsfvgs.png 
        ├── 1751943254838-485217832-gourami6.png 
        ├── 1751980759689-550794689-aa.jpg 
        ├── 1752057022128-841948292-tuna3.jpg 
        ├── 1752062207256-845045558-tuna3.jpg 
        ├── 32e70da78ffde9b66fce48874678f30d 
        ├── 65adc8e63dcb1445ea48ad8c49196d0e 
        └── 6869c7eed51931252215c2bb4ace8f6c 
├── dashboard-app/ 
├── frontend/ 
├── package-lock.json (JSON data)
├── package.json (project metadata and dependencies)
├── RBAC_Documentation.md (Markdown documentation)
└── RBAC_README.md (Markdown documentation)
```


# Sakwa Canneries Management System

A full-stack web application built to digitize and automate the operations of Sakwa Canneries, a fish canning company that previously relied entirely on manual, Excel-based processes for tracking production, tasks, and reporting.

This was my final year individual project for my BIT (Hons) degree.

## 📌 Problem Statement

Sakwa Canneries managed core operations — task tracking, production records, and reporting — manually through Excel spreadsheets. This led to:
- Data entry errors and duplication
- No centralized access or audit trail
- Slow, manual report generation
- No way to control who could access or edit sensitive operational data
- No systematic way to verify raw material (fish) quality before production

The system I built replaces this manual workflow with a role-based web application that digitizes data entry, automates reporting, and adds an AI-assisted quality check for incoming fish stock.

## ✨ Key Features

- **Digitized Data Entry Interfaces** — Replaced Excel sheets with structured web forms for recording canning operations and production data
- **Role-Based Access Control (RBAC)** — Different employee roles (e.g. admin, staff, production supervisor) have scoped access to only the features and data relevant to them
- **Task Management** — Digitized tracking of canning operation tasks that were previously coordinated manually
- **Reporting & Export** — Generate and download operational/production reports directly from the system
- **AI Fish Quality Scanning** — An AI-based feature that scans/classifies fish types and helps determine whether the fish meets quality standards for production, reducing reliance on manual visual inspection

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js |
| Database | MongoDB |
| AI/Fish Scanning | *(add: e.g. TensorFlow.js / a trained image classification model / API used)* |

## 🚀 Getting Started

### Prerequisites
- Node.js (vXX or higher)
- MongoDB (local instance or Atlas connection string)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/sakwa-canneries-system.git
cd sakwa-canneries-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the backend folder with:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

### Running Locally

```bash
# Start backend
cd backend
npm start

# Start frontend (in a separate terminal)
cd frontend
npm start
```

The app will be available at `http://localhost:3000` (frontend) with the API running on `http://localhost:5000`

Individual project — I designed and built the full system end-to-end: frontend UI, backend API, database schema, role-based authentication/authorization, reporting/export functionality, and the AI fish quality scanning feature.

Challenges & What I Learned

*(fill in 2–4 sentences — e.g. designing RBAC from scratch, integrating an AI model into a MERN-style stack, handling reporting/export logic, real-world requirements gathering from a business with no prior digital system)*
