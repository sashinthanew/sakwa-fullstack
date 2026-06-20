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

## Dependencies

This project uses npm for package management. Key dependencies can be found in `package.json`.

## Setup and Installation

### Node.js Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sashinthanew/sakwa-fullstack.git
   cd sakwa-fullstack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

## Repository Information

- **Created**: June 14, 2025
- **Last Updated**: July 10, 2025
- **Default Branch**: main

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure:

- All tests pass
- Code follows project style guidelines
- Appropriate documentation is added

---

This README was automatically generated through comprehensive analysis of the repository.
Generated on: June 20, 2026 at 10:46 AM