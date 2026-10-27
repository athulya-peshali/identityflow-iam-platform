# IdentityFlow IAM Platform
### Automated Identity & Lifecycle Management Middleware Engine (Enterprise HR-Tech Case Study)

[![Node.js](https://img.shields.io/badge/Node.js-v22.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.x-blue.svg)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Cloud%20Firestore-Database-FFCA28.svg)](https://firebase.google.com/)
[![ISO 27001](https://img.shields.io/badge/Compliance-ISO%2027001%20Aligned-red.svg)]()

IdentityFlow is an event-driven middleware automation engine engineered to bridge HR status changes (`HIRED`, `TERMINATED`) with instant multi-system identity provisioning and access revocation across Google Workspace, Slack, and Cloud Firestore.

---

## 🚀 Key Features

* **Event-Driven Webhook Engine:** Ingests non-blocking real-time HR events via REST endpoint (`/api/v1/webhook/hr-event`) with immediate HTTP `202 Accepted` confirmation.
* **Interactive HR Admin Dashboard:** Built-in dark-mode web portal (`http://localhost:3000`) for visual onboarding, offboarding, and real-time lifecycle event monitoring.
* **Multi-System Provisioning:** Automated user directory creation in Cloud Firestore, account setup in Google Workspace Admin Directory API, and channel invites via Slack Web API.
* **Cryptographic Credential Dispatch:** Generates cryptographically secure 8-byte temporary passwords using Node.js `crypto` and dispatches welcome parameters via EmailJS REST API.
* **Instant Offboarding Teardown:** Automated suspension of Google Workspace accounts and Slack user sessions upon employee termination events.
* **ISO 27001 Audit Logging:** Centralized, immutable security event logging stored directly in Cloud Firestore.

---

## 📁 Repository Structure

```text
identityflow-iam-platform/
├── 01_Business_Analysis/
│   ├── Business_Case.md
│   ├── Software_Requirements_Specification.md
│   ├── Requirements_Traceability_Matrix.md
│   ├── Use_Case_Specifications.md
│   └── Gap_Analysis_and_RACT.md
├── 02_Project_Management/
│   └── Project_Closure_and_Retrospective.md
├── 03_Systems_Design/
│   └── API_and_Data_Specification.md
├── controllers/
│   ├── provisioning.js
│   └── revocation.js
├── public/
│   └── index.html                # Interactive HR Admin Dashboard
├── services/
│   ├── firebase.js
│   ├── googleWorkspace.js
│   ├── slack.js
│   └── emailjs.js
├── .env.example                  # Environment configuration template
├── PROJECT_LOG.md                # Sprint-by-sprint master project log
├── README.md                     # Project documentation
└── server.js                     # Core Express application entry point
```
---

## 🛠️ Quick Start & Local Setup

### 1. Prerequisites
* **Node.js**: v18.x or higher
* **npm**: v9.x or higher
* **Firebase**: Active Cloud Firestore instance (`identityflow-dev`)

---

### 2. Installation
```bash
# Clone the repository
git clone [https://github.com/athulya-peshali/identityflow-iam-platform.git](https://github.com/athulya-peshali/identityflow-iam-platform.git)
cd identityflow-iam-platform

# Install dependencies
npm install

```
### 3. Environment Configuration

Create a `.env` file in the root directory by copying `.env.example` and supplying your environment credentials:

```env
# Server Configuration
PORT=3000

# Cloud Firestore Configuration
FIREBASE_PROJECT_ID=identityflow-dev
FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY"
FIREBASE_CLIENT_EMAIL="YOUR_FIREBASE_CLIENT_EMAIL"

# EmailJS REST API Credentials
EMAILJS_SERVICE_ID="YOUR_EMAILJS_SERVICE_ID"
EMAILJS_TEMPLATE_ID="YOUR_EMAILJS_TEMPLATE_ID"
EMAILJS_PUBLIC_KEY="YOUR_EMAILJS_PUBLIC_KEY"

```
### 4. Running the Server
```bash
# Start the Express engine
npm start
```
### 5. Accessing & Testing the Engine

* **HR Admin Portal Dashboard (Visual GUI):** Open `http://localhost:3000` in your web browser to visually trigger onboarding (`HIRED`) or offboarding (`TERMINATED`) events with instant response feeds.
* **Engine Health Check:** `GET http://localhost:3000/health`
* **Webhook Listener Endpoint:** `POST http://localhost:3000/api/v1/webhook/hr-event`
``` ```

## 📊 Business Analysis & Project Management Suite

This project is fully documented under standard enterprise BA and Agile PM frameworks:
* 📄 **[Master Project Log](PROJECT_LOG.md)** — Sprint-by-sprint execution tracker.
* 📋 **[Software Requirements Specification](01_Business_Analysis/Software_Requirements_Specification.md)** — SRS document.
* 🎯 **[Requirements Traceability Matrix](01_Business_Analysis/Requirements_Traceability_Matrix.md)** — RTM mapping requirements to verifications.
* 🔄 **[Use Case Specifications](01_Business_Analysis/Use_Case_Specifications.md)** — Actor interaction scenarios and Gherkin user stories.
* ⚖️ **[Gap Analysis & RACT Matrix](01_Business_Analysis/Gap_Analysis_and_RACT.md)** — As-Is vs. To-Be evaluation & RACI matrix.

---

## 👤 Author
**Athulya Peshali**  
*Undergraduate Software Engineer & Junior Business Analyst*
