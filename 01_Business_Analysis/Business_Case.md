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
