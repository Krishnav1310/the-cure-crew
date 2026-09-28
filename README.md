# THE CURE CREW — CAREVAULT
### *Connected care. Protected identities.*

[![Tests](https://img.shields.io/badge/Security_Tests-13%2F13_Passing-success)](#verification--testing)
[![Privacy Boundary](https://img.shields.io/badge/Privacy_Boundary-K_≥_5_Suppression-blue)](#privacy-architecture)
[![ABDM Aligned](https://img.shields.io/badge/Compliance-ABDM_Aligned-purple)](#architecture)

> **Hackathon Track:** Patient Health Records & Disease Trend Monitoring  
> **Core Architectural Principle:** *"ONE HEALTH ECOSYSTEM. TWO DATA BOUNDARIES."*

---

## 📌 Problem Overview

Frontline clinicians require rapid, authorized access to an individual's longitudinal medical history and prescriptions at triage. Simultaneously, public-health administrators require aggregate epidemiological disease surveillance across regions to identify outbreaks early. Serving both needs from a single system typically leads to privacy breaches, raw PII leakage, or crippled analytical utility.

**CAREVAULT** solves this with a cryptographically enforced **Dual-Plane Architecture**:
1. **Clinical Data Plane:** QR-token-based, zero-PII handshake providing authorized doctors access to longitudinal visits, medications, and confirmed drug allergies, strictly guarded by real-time patient consent.
2. **Population Intelligence Plane:** Anonymized aggregate case counts, time-series epidemic curves, and ward heatmaps, guarded by an automated **Privacy Gate** ($K \ge 5$ small-cell suppression and query-differencing defense).

---

## 🏛️ System Architecture

```
                    ┌──────────────────────────────────────────────┐
                    │               THE CURE CREW                  │
                    │        "One Ecosystem. Two Boundaries."      │
                    └──────────────────────┬───────────────────────┘
                                           │
         ┌─────────────────────────────────┴─────────────────────────────────┐
         │                                                                   │
         ▼                                                                   ▼
┌─────────────────────────────────┐                       ┌─────────────────────────────────┐
│     CLINICAL DATA PLANE         │                       │  POPULATION INTELLIGENCE PLANE  │
│  (Point-of-Care Clinicians)     │                       │   (Public Health Officers)      │
├─────────────────────────────────┤                       ├─────────────────────────────────┤
│ • Zero-PII QR Handshake         │                       │ • Ward-level Epidemic Curves    │
│ • Longitudinal Patient Visits   │   PRIVACY FIREWALL    │ • K-Anonymity (K >= 5) Gate     │
│ • Active Prescription Ledger    │  ◄─────────────────►  │ • Query Differencing Blocker    │
│ • Drug Allergy Contraindication │                       │ • Zero Individual PII Access    │
│ • 1-Click Consent Enforcement   │                       │ • Automated Surge Detection     │
│ • Emergency Break-Glass Override│                       │ • RFC-9110 HTTP 403 Enforcement │
└─────────────────────────────────┘                       └─────────────────────────────────┘
                                           │
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │              IMMUTABLE AUDIT VAULT           │
                    │   Tamper-evident logs of every query & state │
                    └──────────────────────────────────────────────┘
```

---

## ✨ Key Features & Portals

### 1. Doctor View (`/clinician`)
- **Interactive QR Scanner & Identity Suite:**
  - **Camera HUD Scanner:** Animated laser sweep simulating optical scanning at triage.
  - **Digital Patient Card:** ABDM-compliant health card preview with dynamic QR code pattern.
  - **Manual Token Entry:** Quick verification of ephemeral cryptographic tokens (e.g. `CV-QR-PT2048-SEC998`).
- **Multi-Patient Cohort:** 6 distinct clinical profiles across varied conditions (Dengue, Malaria, Hypertension, Migraines, CKD, Asthma).
- **Patient Access History Log:** Dedicated audit ledger tracking who accessed the patient's record, purpose, facility, and cryptographic verification.
- **Emergency Break-Glass:** Trauma override unlocking life-critical safety attributes with mandatory clinical rationale.

### 2. Patient View (`/patient`)
- **Self-Service Consent Control:** Instant 1-click toggle between `ACTIVE` and `REVOKED`. If revoked, doctors are immediately blocked with HTTP 403.
- **"Who Checked My File":** Full citizen transparency showing every hospital, doctor, timestamp, and purpose that accessed their chart.
- **Digital Health Pass:** Patient-owned dynamic QR badge with zero plaintext PII.
- **Medication & Allergy Summary:** Jargon-free view of active prescriptions and confirmed drug allergies.

### 3. Public Health View (`/admin`)
- **Ward-Level Epidemic Curves:** Multi-week time-series tracking disease surges across municipal wards.
- **Automated Privacy Gate:**
  - Cell counts under 5 automatically suppressed to `<5 / Suppressed`.
  - Differencing attacks ($100 - 96 = 4 < 5$) detected and halted with HTTP 422.
  - Total exclusion of individual patient endpoints (HTTP 403 Forbidden).

### 4. Security Lab (`/security-lab`)
- **Live Attack Simulator:** Test small-cell queries, reconstruction attacks, differencing attacks, and cross-plane privilege escalation.
- **RFC-9110 Decision Cards:** Visual explanation of policy checks, actor context, and cryptographic verification.

### 5. Pitch Deck (`/pitch-deck`)
- Interactive, animated 9-slide presentation embedded directly in the application.
- One-click `.pptx` PowerPoint file generator and download.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Recharts
- **Backend:** Node.js, Express.js (ES Modules), JSON Web Tokens (JWT)
- **Deployment:** Vercel Serverless Architecture (`vercel.json` + `api/index.js`)
- **Security:** In-memory immutable audit vault, $k$-anonymity suppression engine, differencing detection

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/Krishnav1310/the-cure-crew.git
cd the-cure-crew

# Install dependencies
npm install

# Start both backend and frontend concurrently
npm run dev
```

* **Frontend:** `http://localhost:5173`
* **Backend API:** `http://localhost:5001/api`

---

## 🧪 Verification & Testing

Run the automated backend security verification suite:

```bash
npm run test:security
```

**Results:** 13/13 tests passing (100% boundary verification across clinician access, consent revocation, admin exclusion, $k$-anonymity suppression, differencing attack detection, emergency break-glass, and audit logging).
