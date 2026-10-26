<!--
  Document   : Business Case - IdentityFlow
  Author     : Athulya Peshali
  Role       : Business Analyst
  Notice     : Prepared for enterprise portfolio verification.
-->

<div align="center">

# Business Case Document

### IdentityFlow
*Automated Identity & Lifecycle Management Platform*

</div>

---

## 1. Document Control

| Field | Details |
|---|---|
| **Document ID** | `BC-IDF-001` |
| **Project Sponsor** | VP of Information Technology / Chief Information Security Officer (CISO) |
| **Author** | Athulya Peshali, Business Analyst |
| **Date Created** | 2026-10-26 |
| **Status** | Proposed |
| **Target Systems** | HR Portal, Google Workspace, Slack, Internal Database (Cloud Firestore), EmailJS |

---

## 2. Executive Summary

TechFlow Corp currently processes all employee onboarding and offboarding access requests manually via email tickets sent from HR to IT. This manual workflow consumes **20 hours of IT bandwidth per week**, delays new hire productivity by up to **3 business days**, and leaves active corporate credentials open during employee offboarding.

**IdentityFlow** proposes the deployment of an automated, event-driven identity provisioning platform. The system listens for HR status updates (`HR_Status = "HIRED"` or `"TERMINATED"`), automatically provisions/revokes accounts across Google Workspace, Slack, and internal databases, dispatches secure temporary credentials via EmailJS, and logs all actions to an immutable audit ledger.

> **Recommendation:** We recommend approving a project budget of **$12,000** for the development of IdentityFlow. The project will yield an annual cost reduction of **$41,600 in saved IT labor**, achieving full financial break-even within **3.5 months** of deployment while ensuring ISO 27001 compliance.

---

## 3. Business Problem & Impact (The "As-Is" State)

### 3.1 Problem Statement
The current employee identity lifecycle relies on manual data entry across multiple administrative consoles. When HR hires a new employee, IT staff must individually create accounts, assign permission groups, and email credentials. During offboarding, account revocation requests are often delayed over weekends.

### 3.2 Business Impact
* **Financial Loss:** IT devotes 20 hours/week to manual user administration at an average rate of $40/hr, resulting in **$41,600 in wasted annual operational expenditure**.
* **Operational Bottlenecks:** New hires experience up to **72 hours of forced downtime** waiting for active system credentials upon joining the company.
* **Security & Compliance Vulnerabilities:** Offboarded staff maintain access to sensitive corporate databases for up to 48 hours post-termination, posing a severe insider threat risk and risking failure of upcoming **ISO 27001 security audits**.

---
## 4. Proposed Solution (The "To-Be" State)

### 4.1 Solution Overview
IdentityFlow introduces a middleware automation microservice connecting the HR portal to downstream IT applications:

```text
[HR Portal] ──(Status = "HIRED")──► [IdentityFlow Engine] 
                                          │
    ┌─────────────────────────────────────┼─────────────────────────────────────┐
    ▼                                     ▼                                     ▼
[Google Workspace API]             [Slack Admin API]                 [Cloud Firestore DB]
(Create Workspace User)          (Invite to Workspace)              (Provision Role & DB)
    │                                     │                                     │
    └─────────────────────────────────────┴─────────────────────────────────────┘
                                          │
                                          ▼
                               [EmailJS Notification] ──► (Send Temp Credentials)
                                          │
                                          ▼
                                [Audit Logging Ledger] ──► (ISO 27001 Log)
```

---
### 4.2 Alternative Options Considered

| Option | Description | Financial Cost | Risk Level | Recommendation |
|---|---|---|---|---|
| **Option A: Do Nothing** | Retain manual email ticketing workflow. | $41,600 / year (Loss) | High (Security Breach) | **Rejected** |
| **Option B: Commercial IAM SaaS** | Purchase Okta/Auth0 enterprise licenses. | $28,000 / year (Recurring) | Low | **Rejected** (High ongoing cost) |
| **Option C: Custom IdentityFlow Engine** | Build internal lightweight provisioning middleware. | $12,000 (One-time build) | Low (Scoped MVP) | **Recommended** |

---

## 5. Financial Analysis (Cost-Benefit & ROI)

### 5.1 Estimated Development Costs
| Category | Description | Cost |
|---|---|---|
| **Engineering Labor** | Backend (Python/Node), Frontend UI, BA/PM deliverables | $9,500 |
| **Infrastructure & API Setup** | Cloud hosting (AWS/GCP), EmailJS tier, testing environment | $1,500 |
| **Security & Quality Audit** | Penetration testing & permission verification | $1,000 |
| **Total One-Time Investment** | | **$12,000** |

### 5.2 Financial Return
* **Annual Labor Recovery:** 20 hours/week saved $\times$ $40/hr $\times$ 52 weeks = **$41,600 / year**
* **Net First-Year Value:** $41,600 - $12,000 = **$29,600**
* **Estimated ROI:** **246% in Year 1**
* **Payback Period (Break-Even):** **3.5 Months**

---

## 6. Project Risks & Mitigation Strategies

| Risk ID | Risk Category | Description | Mitigation Strategy |
|:---:|:--- |:--- |:--- |
| **RSK-01** | Technical | Third-party API rate limiting (e.g., Google/Slack API quota). | Implement asynchronous queues and exponential backoff retry mechanisms. |
| **RSK-02** | Security | Temporary credential leak during automated email dispatch. | Enforce one-time password (OTP) links via EmailJS with 15-minute expiration windows. |
| **RSK-03** | Scope Creep | Stakeholders requesting legacy system integrations mid-sprint. | Baseline MVP strictly to Google, Slack, and Firestore; log additional integrations in Change Request (CR) register. |

---

## 7. Approval Sign-Off

| Role | Name | Signature | Date |
|---|---|---|---|
| **Project Sponsor** | VP of Information Technology | | |
| **CISO** | Chief Information Security Officer | | |
| **Business Analyst** | Athulya Peshali | | |

---

<div align="center">

**© 2026 Athulya Peshali · All rights reserved**  
*Prepared for portfolio verification. Not for unauthorised distribution or reproduction.*

</div>
                               [EmailJS Notification] ──► (Send Temp Credentials)
                                          │
                                          ▼
                                [Audit Logging Ledger] ──► (ISO 27001 Log)
