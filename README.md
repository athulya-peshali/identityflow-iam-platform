# 🛡️ IdentityFlow — Enterprise IAM & Lifecycle Management Dashboard

An enterprise-grade **Identity and Access Management (IAM)** lifecycle management platform designed to automate employee onboarding, role transitions, and offboarding (**Joiner / Mover / Leaver**). **IdentityFlow** bridges HR operational triggers with IT provisioning workflows, security audit logging, and risk monitoring.

## 💡 Core Business Value

In modern enterprise IT and cybersecurity governance, an IAM platform must answer three fundamental questions:

1. **Who has access to what?** — Real-time tracking of active user identities across connected platforms (Google Workspace, Slack, GitHub, AWS, Jira).
2. **Was access given and removed at the right time?** — Zero-trust automated provisioning triggers for new hires and immediate revocation safety for terminations.
3. **Can we prove it to an auditor?** — Real-time immutable event streams and CSV audit evidence exports for ISO 27001, SOC 2, and GDPR compliance.

---

## ✨ Key Features & Highlights

### 🎨 Frosted-Glass Neumorphic Design System
* **Modern UI Tokens**: Built using custom CSS variables for brand colors (Teal `#147F87`, Success `#12B76A`, Warning `#DC6803`, Danger `#D92D20`), radius tokens, and soft shadows.
* **Glassmorphism Layout Shell**: `backdrop-blur` card components (`rgba(255, 255, 255, 0.62)`) over a fixed diagonal teal-to-lavender gradient.
* **Typography**: Precision typography utilizing **Plus Jakarta Sans** for UI hierarchy and **JetBrains Mono** for developer logs.

### 📊 Lifecycle Analytics & Metrics
* **4-Card KPI Suite**: Active Identities, Pending Provisioning, Failed Events, and MFA Coverage with custom 8-point variation sparklines and visual progress indicators.
* **Interactive JML Chart**: Six-month, 12-month, and YTD bar chart visualizations of Joiners, Movers, and Leavers powered by `recharts` with interactive legend toggles and custom glass tooltips.

### ⚡ Automated Provisioning & Revocation Workflow
* **HR Lifecycle Triggers**: Simulation controls for single-click employee onboarding and access revocation.
* **Revocation Safety**: Destructive action confirmation modal with focus trapping (`Escape` to dismiss) and multi-system target flags.
* **Toast Notifications**: Automatic success and error feedback alerts.

### 🛡️ Security Alerts & Audit Compliance
* **Identity Risk Panel**: Real-time detection of high-risk security states:
  * *Orphaned Accounts* (former employees with lingering active logins).
  * *Dormant Accounts* (accounts inactive for 90+ days).
  * *Privileged Accounts* (administrator-level access reviews).
* **Provisioning Queue**: Live job execution queue with one-click **Retry** triggers for failed automated actions.
* **Real-time Webhook Audit Stream**: Live terminal-style logging window with event color tags (`HIRED`, `EMAIL`, `REVOKED`, `WARNING`) and one-click **CSV Evidence Export**.

### ⌨️ UX & Accessibility Polish
* **Command Palette (`Ctrl + K`)**: Keyboard shortcut listener for instant search bar focusing.
* **User & Notification Dropdowns**: Interactive menu overlays on the top-bar avatar and notification bell.
* **Accessible & Inclusive**: High text contrast ratios, focus-visible outlines, and support for `prefers-reduced-motion`.

---

## 🛠️ Tech Stack & Frameworks

| Layer | Technology | Purpose |
| ----- | ---------- | ------- |
| **Frontend Framework** | React 18 (JSX) | Modular, declarative UI components |
| **Build Tooling** | Vite | Lightning-fast HMR and bundle compilation |
| **Styling & Tokens** | Tailwind CSS v4 | Custom utility classes, design tokens & `@theme` rules |
| **Data Visualization** | Recharts | Interactive JML bar charts and mini sparklines |
| **Icons & Branding** | Lucide React | Clean vector icons & inline SVG shield logo |
| **Backend API** | Node.js / Express.js | RESTful webhook endpoints and lifecycle engine |
| **Database & Sync** | Cloud Firestore | Cloud identity state storage and status streaming |

---

## 📂 Project Structure

```text
identityflow-iam-platform/
├── server.js                   # Express API server & HR webhook handlers
├── controllers/                # Backend logic for provisioning & revocation
│   ├── provisioning.js
│   └── revocation.js
├── services/                   # Email & notification dispatch services
│   └── emailjs.js
├── client/                     # React Frontend (Vite)
│   ├── index.html              # HTML shell & SVG shield favicon
│   ├── package.json            # Client dependencies (Lucide, Recharts)
│   └── src/
│       ├── index.css           # Global CSS tokens, fonts, & glass utilities
│       ├── App.jsx             # Main dashboard grid layout & state manager
│       ├── components/
│       │   ├── Logo.jsx        # SVG shield emblem & brand wordmark
│       │   ├── Sidebar.jsx     # 248px fixed glass navigation sidebar
│       │   ├── Header.jsx      # Sticky top-bar, search & dropdown menus
│       │   ├── KpiCard.jsx     # Metric cards with sparklines & progress
│       │   ├── JmlChart.jsx    # Joiner/Mover/Leaver analytics chart
│       │   ├── TriggerPanel.jsx# HR event triggers & target system selector
│       │   ├── ConfirmModal.jsx# Revocation confirmation dialog
│       │   ├── Toast.jsx       # Alert notifications system
│       │   ├── ProvisioningQueue.jsx # System action status table & retry
│       │   ├── SecurityAlerts.jsx    # Identity risk summary rows
│       │   ├── AuditLog.jsx    # Terminal log feed & CSV exporter
│       │   └── Skeleton.jsx    # Loading state shimmer placeholders
└── 01_Business_Analysis/       # BA artifacts, use cases & RTM requirements
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/athulya-peshali/identityflow-iam-platform.git
   cd identityflow-iam-platform
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

4. **Build the production client:**
   ```bash
   npm run build
   cd ..
   ```

5. **Start the Express server & dashboard:**
   ```bash
   npm start
   ```

6. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

---

## 📋 Business Analyst User Stories

* **As an IT Administrator**, I want to receive instant confirmation modals when revoking access, so that I do not accidentally delete employee accounts across production systems.
* **As an Information Security Officer**, I want to view orphaned and dormant account alerts in a centralized dashboard, so that I can eliminate unauthorized access points before an audit.
* **As a Compliance Auditor**, I want to export real-time webhook logs to CSV format, so that I have tangible evidence of timely access removal for SOC 2 and ISO 27001 reviews.
* **As an HR Operations Specialist**, I want to simulate employee hiring and termination hooks, so that I can test automated account creation across Google Workspace, Slack, and GitHub.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
