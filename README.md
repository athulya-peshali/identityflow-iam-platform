<div align="center">

# IdentityFlow IAM Platform
*Automated Identity & Lifecycle Management Platform (Enterprise HR-Tech Case Study)*

</div>

---

## 📌 Overview
IdentityFlow is a backend middleware orchestration engine designed to automate enterprise employee lifecycle management (Onboarding, Access Teardown, and Security Auditing). 

Built with **Node.js (Express)**, it acts as a webhook listener for HR portals. When an HR event is triggered, IdentityFlow securely provisions or revokes access across **Google Workspace**, **Slack**, and **Cloud Firestore**, while securely dispatching temporary credentials to the user via **EmailJS**.

## 📊 Project Management & Agile Tracking
This system was developed utilizing a strict 4-sprint Agile methodology, complete with a Product Backlog, Sprint Execution Board, and Risk/Issue Register.
* **View the Live Agile Board:** [ClickUp Workspace: IdentityFlow](https://app.clickup.com/9018528313/v/s/901813724759)

## 🏗️ System Architecture
* **Web Framework:** Express.js (REST API Webhook Listener)
* **Database & RBAC:** Google Cloud Firestore (Firebase Admin SDK)
* **Workspace Provisioning:** Google Admin Directory API (OAuth 2.0 JWT)
* **Communications:** Slack Web API
* **Credential Dispatch:** EmailJS REST API
* **Security:** Native Node.js `crypto` for secure password generation; ISO 27001 compliant immutable audit logging.

## 📂 Repository Structure

```text
├── 01_Business_Analysis/         # SRS, Business Case, and Technical Specs
├── 02_Project_Management/        # Sprint Retrospective & Closure Reports
├── controllers/
│   ├── provisioning.js           # Multi-system account creation logic
│   └── revocation.js             # Automated offboarding & teardown logic
├── services/
│   ├── emailjs.js                # Email dispatch integration
│   ├── firebase.js               # Cloud Firestore connection
│   ├── googleWorkspace.js        # Google Admin API integration
│   └── slack.js                  # Slack workspace integration
├── .env.example                  # Environment variable template (Security)
├── package.json                  # Node.js dependencies
└── server.js                     # Main Express.js webhook listener
