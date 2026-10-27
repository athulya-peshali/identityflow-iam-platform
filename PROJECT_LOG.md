<!--
  Document   : Master Project Log & Sprint Tracker
  Project    : IdentityFlow IAM Platform
  Author     : Athulya Peshali
  Role       : Lead Software Engineer & Business Analyst
-->

<div align="center">

# IdentityFlow IAM Platform - Master Project Log
### Comprehensive Development, Scope, and Sprint Execution Tracker

</div>

---

## 1. Executive Summary & Full Project Scope

IdentityFlow is an enterprise-grade Automated Identity & Lifecycle Management (IAM) middleware engine built with **Node.js (Express)** and **Cloud Firestore**.

### **Full Project Scope:**
* **Automated Event Interception:** Real-time webhook ingestion engine parsing incoming HR status change payloads (`HIRED`, `TERMINATED`).
* **Multi-System Provisioning:** Automated account creation and role assignment across Google Workspace Directory API and Slack Web API.
* **Secure Credential Dispatch:** Cryptographically secure temporary password generation (using Node.js native `crypto`) coupled with automated email delivery via EmailJS.
* **Automated Offboarding & Teardown:** Instant access revocation and database cleanup upon employee termination events.
* **Compliance & Audit Logging:** ISO 27001-aligned immutable audit trail stored directly in Cloud Firestore.
* **Agile Project Management:** Structured 4-sprint execution cycle tracked via ClickUp, complete with a comprehensive RTM, SRS, and Risk Register.

---

## 2. Current Project Status Tracker

| Module / Track | Component | Status | Verification Method |
|---|---|---|---|
| **Business Analysis** | SRS & Business Case | ✅ Completed | Committed to `01_Business_Analysis/` |
| **Project Management** | Closure & Retrospective | ✅ Completed | Committed to `02_Project_Management/` |
| **Project Management** | ClickUp Agile Board | ✅ Completed | Linked in Master `README.md` |
| **Backend Engineering** | Express.js Webhook API | ✅ Completed | Operational on Port 3000 |
| **Database Architecture** | Cloud Firestore (`identityflow-dev`) | ✅ Completed | Initialized in Test Mode via Firebase Console |
| **External Integrations** | Google, Slack, EmailJS SDKs | ✅ Completed | Controllers and service modules configured |
| **Local Deployment & Testing** | PowerShell Webhook Simulation | ✅ Completed | Verified via `Invoke-RestMethod` (`202 Accepted`) |
| **Advanced BA Artifacts** | RTM, Use Cases, Gap Analysis | ✅ Completed | Next execution priority |

---

## 3. Sprint-by-Sprint Execution Log

### **Sprint 1: Architecture, Foundation & Webhook Listener**
* **Focus:** Establishing the backend skeleton, routing, and ingestion layer.
* **Completed Tasks:**
    * Initialized Node.js project structure and installed dependencies (`express`, `firebase-admin`, `axios`).
    * Created the core Express.js server (`server.js`) configured for JSON payloads.
    * Implemented the HR webhook listener route (`/api/v1/webhook/hr-event`) returning non-blocking `202 Accepted` responses.
    * Configured environment variable management (`.env`) for secure credential storage.
* **Next Steps for Sprint 1:** None (Fully Closed).

### **Sprint 2: Multi-System Provisioning & Database Integration**
* **Focus:** Cloud Firestore setup and multi-tenant workspace provisioning.
* **Completed Tasks:**
    * Created and initialized the `identityflow-dev` Firebase project and Cloud Firestore database.
    * Resolved PEM private key authentication formatting and successfully bound the Firebase Admin SDK.
    * Developed the provisioning controller (`controllers/provisioning.js`) for user record creation.
    * Integrated Google Workspace Admin Directory API and Slack Web API wrappers.
* **Next Steps for Sprint 2:** None (Fully Closed).

### **Sprint 3: Secure Credential Dispatch & Onboarding Pipeline**
* **Focus:** Automated password generation and secure communication delivery.
* **Completed Tasks:**
    * Implemented native Node.js `crypto` module logic for secure 8-byte temporary password generation.
    * Integrated the EmailJS REST API service (`services/emailjs.js`) to dispatch login parameters.
    * Executed local end-to-end webhook testing via PowerShell `Invoke-RestMethod`.
* **Next Steps for Sprint 3:** None (Fully Closed).

### **Sprint 4: Offboarding Revocation & Portfolio Finalization**
* **Focus:** Access teardown, audit logging, and documentation packaging.
* **Completed Tasks:**
    * Implemented the revocation controller (`controllers/revocation.js`) for instant access teardown upon termination.
    * Built ISO 27001-aligned immutable audit logging into Cloud Firestore.
    * Authored the Software Requirements Specification (SRS) and Sprint Retrospective.
    * Finalized the master `README.md` with system architecture, repo structure, and the ClickUp board link.
* **Next Steps for Sprint 4:** Draft remaining Business Analysis artifacts (RTM, Use Cases, Gap Analysis, and RACT Matrix) to complete the portfolio documentation suite.

---
<div align="center">
<b>IdentityFlow Engineering Log — Updated October 2026</b>
</div>
