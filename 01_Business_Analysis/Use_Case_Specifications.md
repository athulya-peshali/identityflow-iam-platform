# Use Case Specifications & User Stories
### Project: IdentityFlow IAM Platform

---

## 1. Primary Use Cases

### **UC-01: Automated Employee Onboarding & Provisioning**

* **Primary Actor:** HR Portal System (via Webhook) / IT Administrator
* **Stakeholders:** New Employee, Security/Compliance Team, IT Support
* **Pre-conditions:**
    1. The IdentityFlow Node.js engine is running and listening on port `3000`.
    2. Cloud Firestore (`identityflow-dev`) database is initialized.
    3. HR system dispatches a valid JSON payload with `status: "HIRED"`.
* **Post-conditions:**
    1. User profile created in Cloud Firestore `users` collection.
    2. Corporate email created in Google Workspace Directory API.
    3. User assigned to department Slack channels.
    4. Temporary credentials generated and sent via EmailJS.
    5. Audit log generated in Firestore.

#### **Main Success Scenario (Flow of Events):**
1. **Trigger:** HR Portal sends a `POST` HTTP request to `/api/v1/webhook/hr-event`.
2. IdentityFlow validates payload format and returns an immediate `202 Accepted` response.
3. System generates an 8-byte secure temporary password using Node.js `crypto`.
4. System constructs corporate email (`firstname.lastname@company.com`).
5. System provisions user record in Cloud Firestore with `status: "ACTIVE"`.
6. System calls Google Workspace Directory API to provision account.
7. System calls Slack API to invite user to channels.
8. System dispatches welcome email with initial credentials via EmailJS REST API.
9. System writes an immutable audit record to Firestore.

#### **Alternative & Exception Flows:**
* **A1: Malformed Webhook Payload**
    * System detects missing `employee_id` or `status` field.
    * System responds with `400 Bad Request` and writes error log.
* **A2: External API Failure (e.g., EmailJS network error)**
    * System catches exception, marks user state as `PROVISIONED_EMAIL_FAILED`, logs error for retry, and maintains database integrity.

---

### **UC-02: Automated Employee Offboarding & Access Revocation**

* **Primary Actor:** HR Portal System (via Webhook) / Security Officer
* **Pre-conditions:**
    1. User exists in system with active access permissions.
    2. HR system dispatches JSON payload with `status: "TERMINATED"`.
* **Post-conditions:**
    1. User status set to `REVOKED` in Cloud Firestore.
    2. Google Workspace account suspended/disabled.
    3. User deactivated in Slack workspace.
    4. Security audit log entry written for ISO 27001 compliance.

#### **Main Success Scenario:**
1. **Trigger:** HR Portal sends `POST` request to `/api/v1/webhook/hr-event` with `status: "TERMINATED"`.
2. IdentityFlow returns `202 Accepted`.
3. System updates Firestore user status from `ACTIVE` to `REVOKED`.
4. System suspends Google Workspace account via API.
5. System revokes active Slack sessions and disables user.
6. System generates ISO 27001-aligned security audit log entry in Firestore.

---

## 2. Agile User Stories with Acceptance Criteria

### **US-01: Automated Provisioning Webhook**
> **As an** HR Administrator,  
> **I want** employee hiring events automatically sent to IdentityFlow,  
> **So that** account creation happens instantly without manual IT tickets.

* **Acceptance Criteria (Gherkin):**
    * **Given** a valid HR hire payload for a new employee,
    * **When** sent to `/api/v1/webhook/hr-event`,
    * **Then** the system responds immediately with HTTP status `202 Accepted` and begins asynchronous provisioning.

### **US-02: Secure Credential Dispatch**
> **As a** New Employee,  
> **I want** my temporary credentials delivered securely to my personal email,  
> **So that** I can complete initial login on my first day.

* **Acceptance Criteria (Gherkin):**
    * **Given** an employee has been successfully provisioned,
    * **When** temporary password generation completes,
    * **Then** an email containing the corporate email, password, and login link is dispatched via EmailJS.

### **US-03: Instant Access Revocation**
> **As a** Security Lead,  
> **I want** terminated employees instantly revoked across all platforms,  
> **So that** corporate assets remain protected against unauthorized post-termination access.

* **Acceptance Criteria (Gherkin):**
    * **Given** an HR termination event payload,
    * **When** processed by the revocation controller,
    * **Then** Google Workspace and Slack access are suspended, and the event is logged in Cloud Firestore.