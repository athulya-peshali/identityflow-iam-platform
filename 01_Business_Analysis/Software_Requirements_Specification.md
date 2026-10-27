<!--
  Document   : Software Requirements Specification (SRS)
  System     : IdentityFlow IAM Platform
  Author     : Athulya Peshali
  Role       : Business Systems Analyst
-->

<div align="center">

# Software Requirements Specification (SRS)
### IdentityFlow Automated Identity & Lifecycle Management Platform

</div>

---

## 1. Document Control

| Field | Details |
|---|---|
| **Document ID** | `BA-SRS-001` |
| **Project** | IdentityFlow |
| **Author** | Athulya Peshali |
| **Version** | 1.0 (As-Built MVP) |

---

## 2. Introduction

### 2.1 Purpose
This document specifies the software requirements for the IdentityFlow platform. It defines the functional and non-functional requirements for the automated Identity and Access Management (IAM) middleware engine designed to synchronize HR events with IT infrastructure.

### 2.2 Scope
IdentityFlow operates as an asynchronous Node.js (Express) middleware microservice. It listens for HTTP webhooks from an HR portal and orchestrates account provisioning and revocation across Google Cloud Firestore, Google Workspace, and Slack via REST APIs. 

---

## 3. Functional Requirements

### 3.1 HR Webhook Listener (FR-01)
* **Description:** The system must expose a secure REST endpoint to receive employee status updates.
* **Endpoint:** `POST /api/v1/webhook/hr-event`
* **Acceptance Criteria:** 
  * Must parse JSON payloads containing `employee_id`, `first_name`, `last_name`, `personal_email`, and `status`.
  * Must immediately return a `202 Accepted` HTTP status to prevent HR system timeouts.

### 3.2 Automated Onboarding Pipeline (FR-02)
* **Trigger:** HR payload status equals `"HIRED"`.
* **Actions:**
  1. **Database:** Create an active user profile in Cloud Firestore with a default RBAC access level of 3.
  2. **Workspace:** Provision a `@techflow.com` Google account via the Google Admin Directory API.
  3. **Communication:** Dispatch an invitation to the corporate Slack workspace via the Slack Web API.
  4. **Credentialing:** Generate a secure temporary password using cryptographic randomization and enforce mandatory password reset upon first login.

### 3.3 Automated Credential Dispatch (FR-03)
* **Description:** The system must securely transmit initial login parameters to the new hire.
* **Mechanism:** Integrate with the EmailJS REST API to dispatch the generated `@techflow.com` address and temporary password to the employee's `personal_email`.

### 3.4 Automated Offboarding Revocation (FR-04)
* **Trigger:** HR payload status equals `"TERMINATED"`.
* **Actions:**
  * Immediately set `is_active: false` in the Firestore database.
  * Suspend the Google Workspace account.
  * Remove the user from the corporate Slack workspace.

---

## 4. External Interface Requirements

| Interface | Integration Method | Authentication | Purpose |
|---|---|---|---|
| **Cloud Firestore** | Firebase Admin SDK | Service Account (JSON) | State management, RBAC, and Audit Logging |
| **Google Workspace** | `googleapis` SDK | OAuth 2.0 JWT | Email and workspace provisioning |
| **Slack Web API** | `@slack/web-api` SDK | Bot User OAuth Token | Team communication access |
| **EmailJS API** | Axios HTTP POST | API Keys (Public/Private) | Outbound credential dispatch |

---

## 5. Non-Functional Requirements (NFRs)

### 5.1 Security & ISO 27001 Compliance
* **NFR-SEC-01 (Audit Ledger):** Every lifecycle event (Success or Failure) must be permanently logged to an immutable `audit_logs` collection in Firestore, recording the timestamp, action type, target employee, and execution status.
* **NFR-SEC-02 (Secret Management):** No hardcoded credentials shall exist in the codebase. All API keys and cryptographic secrets must be injected via `.env` environment variables.
* **NFR-SEC-03 (Credential Exfiltration Risk Mitigation):** Temporary passwords must strictly enforce the `changePasswordAtNextLogin` flag via the Google Workspace API.

### 5.2 Performance & Reliability
* **NFR-PERF-01 (Asynchronous Execution):** Downstream API calls (Google, Slack, EmailJS) must execute asynchronously in the background after the `202 Accepted` response is sent to the HR system.
* **NFR-REL-01 (Graceful Failure):** If a third-party API fails, the system must catch the exception, log the error to the Firestore audit ledger, and prevent the Node.js server from crashing.

---
<div align="center">
<i>End of Document</i>
</div>
