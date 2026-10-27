# Gap Analysis & RACT (RACI) Matrix
### Project: IdentityFlow IAM Platform

---

## 1. Gap Analysis (As-Is vs. To-Be)

The Gap Analysis highlights the operational transition from legacy manual identity management to the automated **IdentityFlow** middleware architecture.

| Feature / Domain | Current State (As-Is / Manual) | Target State (To-Be / IdentityFlow Engine) | Operational Impact & ROI |
| :--- | :--- | :--- | :--- |
| **Onboarding Latency** | HR submits IT tickets; manual setup takes **24–72 hours**. | Event-driven webhook processing completes provisioning in **< 5 seconds**. | 99.8% reduction in onboarding wait time; day-one developer productivity. |
| **Account Creation** | IT admins manually create accounts in Google Workspace & Slack. | Automated REST API orchestration handles multi-system directory creation. | Eliminates human data-entry errors and typo-driven access issues. |
| **Offboarding & Security** | Manual teardown across apps; high risk of orphaned accounts remaining active. | Instant status change trigger (`TERMINATED`) suspends Google & Slack sessions immediately. | Mitigates insider threats, unauthorized data access, and licensing waste. |
| **Credential Delivery** | Passwords sent via unencrypted plain text Slack messages or paper notes. | Cryptographically generated temporary passwords sent via secure EmailJS REST API. | Enforces strict zero-trust credential security compliance. |
| **Compliance Auditing** | Disconnected manual logs across IT ticket systems; difficult ISO 27001 audit verification. | Immutable centralized audit logs stored automatically in Cloud Firestore. | Instant audit readiness with timestamped, traceable event histories. |

---

## 2. RACT / RACI Responsibility Matrix

This matrix defines stakeholder roles across key project phases and system lifecycle tasks:
* **R — Responsible:** The role that performs the activity.
* **A — Accountable:** The sole decision-maker who approves the deliverable.
* **C — Consulted:** Subject matter experts providing critical inputs.
* **T / I — Informed / Tested:** Stakeholders kept updated or involved in testing.

| Lifecycle Activity / Task | Lead BA / Software Engineer | HR Operations | IT Infrastructure Lead | Security & Compliance Lead |
| :--- | :---: | :---: | :---: | :---: |
| **Requirements Gathering (SRS/RTM)** | **A / R** | C | C | C |
| **Architecture Design & API Spec** | **A / R** | I | C | C |
| **Express Webhook Development** | **A / R** | I | T | I |
| **Cloud Firestore Database Setup** | **A / R** | I | C | C |
| **Google Workspace & Slack API Setup** | **R** | I | **A** | C |
| **Credential Generator & EmailJS Dispatch**| **A / R** | I | I | C |