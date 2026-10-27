<!--
  Document   : API & Data Specification - IdentityFlow
  Author     : Athulya Peshali
  Role       : Systems Analyst
  Notice     : Prepared for enterprise portfolio verification.
-->

<div align="center">

# API & Data Architecture Specification

### IdentityFlow
*Automated Identity & Lifecycle Management Platform*

</div>

---

## 1. Document Control

| Field | Details |
|---|---|
| **Document ID** | `SYS-IDF-001` |
| **System** | IdentityFlow Middleware Engine |
| **Author** | Athulya Peshali |
| **Status** | Approved for Sprint 1 Development |

---

## 2. HR Portal Webhook Payload (Event Trigger)

When an HR Manager changes an employee's status to `"HIRED"` or `"TERMINATED"`, the HR system will fire a `POST` request to the IdentityFlow webhook endpoint.

* **Endpoint:** `POST /api/v1/webhook/hr-event`
* **Content-Type:** `application/json`
* **Expected Payload:**

```json
{
  "event_id": "evt_987654321",
  "event_type": "employee_status_update",
  "timestamp": "2026-10-26T09:00:00Z",
  "data": {
    "employee_id": "EMP-8492",
    "first_name": "Jane",
    "last_name": "Doe",
    "personal_email": "jane.doe.personal@email.com",
    "department": "Engineering",
    "role": "Backend Developer",
    "status": "HIRED"
  }
}

```
## 3. External API Contracts

IdentityFlow acts as a centralized orchestrator, issuing programmatic commands to three core APIs:

### 3.1 Google Workspace Admin API
* **Action (Onboard):** `POST https://admin.googleapis.com/admin/directory/v1/users`
* **Action (Offboard):** `PUT https://admin.googleapis.com/admin/directory/v1/users/{userKey}` (Set `suspended: true`)
* **Auth Method:** OAuth 2.0 Service Account

### 3.2 Slack Web API
* **Action (Onboard):** `POST https://slack.com/api/admin.users.invite`
* **Action (Offboard):** `POST https://slack.com/api/admin.users.remove`
* **Auth Method:** Bearer Token (Bot User OAuth Token)

### 3.3 EmailJS API
* **Action:** `POST https://api.emailjs.com/api/v1.0/email/send`
* **Payload:** Template parameters including `{temp_password}` and `{login_url}`.

---

## 4. Cloud Firestore Database Schema (NoSQL)

IdentityFlow utilizes Google Cloud Firestore to maintain Role-Based Access Control (RBAC) and audit trails.

### 4.1 Collection: `users`
Maintains the active state and access rights of all corporate employees.
* **Document ID:** `{employee_id}` (e.g., `EMP-8492`)

| Field | Data Type | Description | Example |
|---|---|---|---|
| `first_name` | String | Employee legal first name | `"Jane"` |
| `last_name` | String | Employee legal last name | `"Doe"` |
| `corporate_email` | String | Auto-generated workspace email | `"jane.doe@techflow.com"` |
| `department` | String | Assigned organizational unit | `"Engineering"` |
| `access_level` | Number | RBAC clearance level (1-5) | `3` |
| `is_active` | Boolean | System access toggle | `true` |

### 4.2 Collection: `audit_logs`
Immutable ledger for ISO 27001 security compliance. Records every provisioning and revocation action.
* **Document ID:** Auto-generated Hash

| Field | Data Type | Description | Example |
|---|---|---|---|
| `timestamp` | Timestamp | Exact time of execution | `2026-10-26T09:00:05Z` |
| `action_type` | String | Action performed | `"PROVISION_GOOGLE_WORKSPACE"` |
| `target_employee_id`| String | Associated employee | `"EMP-8492"` |
| `status` | String | Execution result | `"SUCCESS"` |
| `executed_by` | String | System actor | `"IdentityFlow_Engine"` |

---

<div align="center">

**© 2026 Athulya Peshali · All rights reserved**  
*Prepared for portfolio verification. Not for unauthorised distribution or reproduction.*

</div>
