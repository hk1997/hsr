# Medanta IR Registry

Medanta IR Registry is a modern, offline-first Progressive Web App (PWA) designed to streamline the capture, management, and tracking of Thyroid Fine Needle Aspiration (FNA) and interventional radiology case registries. 

The application utilizes a rich glassmorphism UI styled with vanilla CSS, a robust offline-first Zustand/IndexedDB state synchronizer, and a serverless AWS backend deployed via AWS Cloud Development Kit (CDK).

---

## 🌟 Key Features

### 1. Offline-First Resilience (Zero Data Loss)
- **Auto-Save Drafts**: Automatically saves form state in local **IndexedDB** as the clinician fills in details.
- **Resilient Submissions**: Stalls submissions during network drops, keeping data safe locally. Upon restoration, submitting successfully clears the local draft and synchronizes the case with AWS.

### 2. Structured 8-Step Wizard
A guided workflow designed to collect comprehensive clinical and procedural data points:
1. **Client Info**: Demographics details and UHID search integration.
2. **History & Procedure**: Log procedure types (e.g., Thyroid FNA), Operator name, and Needle gauge.
3. **Ultrasound Findings**: Dynamic site addition allowing clinicians to add multiple nodules or lymph nodes, tracking position, dimensions, TIRADS categorization, and IR team assessments.
4. **Background & Diagnosis**: Previous FNA details, indications, known thyroid diseases, and lab values.
5. **FNA Details**: Operator-specific logs.
6. **Cytology**: Bethesda classification system selector and cytology diagnosis details.
7. **Decision**: Clinical management choices, ablation types, and surgery indicators.
8. **Histopathology**: Surgical logs and post-operative histopathology records.

### 3. Admin Management Portal
- **Case Dashboard**: List, filter, detail, and edit existing cases stored in DynamoDB.
- **Doctor Directory**: Scaffolding to add, list, and delete operating doctors/radiologists.

### 4. Serverless AWS Infrastructure
- Infrastructure managed as code via AWS CDK.
- **DynamoDB Tables**: Scalable tables for Cases and Doctors.
- **API Gateway**: REST API exposing resources for CRUD operations.
- **Lambda Functions**: Lightweight Node.js handlers executing DB operations.
- **S3 Bucket Hosting**: Static web hosting bucket with CloudFront deployment capability.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | React (v19), Vite (v7), Vanilla CSS (Glassmorphism layout) |
| **Routing** | React Router DOM (v7) |
| **State Management** | Zustand (v5) |
| **Local Storage** | IndexedDB via `idb` |
| **PWA Configuration** | `vite-plugin-pwa` (service workers, manifest autogeneration) |
| **Infrastructure (IaC)**| AWS CDK (TypeScript) |
| **Backend Compute** | AWS Lambda (Node.js 20.x) |
| **Database** | Amazon DynamoDB |
| **CI/CD** | GitHub Actions |

---

## 📂 Project Layout

```text
hsr/
├── .github/
│   ├── ISSUE_TEMPLATE/     # GitHub templates for bugs and features
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline deploying CDK on push to main
├── backend/
│   ├── bin/
│   │   └── backend.ts      # CDK App entry point (MedantaIrRegistryBackendStack)
│   ├── lib/
│   │   └── backend-stack.ts# CDK Stack defining DynamoDB, Lambda, API Gateway & S3
│   ├── src/
│   │   └── handlers/       # AWS Lambda function scripts (JS CRUD files)
│   ├── test/               # Backend CDK Jest testing suites
│   ├── cdk.json            # CDK Toolkit configuration
│   └── tsconfig.json       # TypeScript compiler settings for CDK
├── src/
│   ├── components/
│   │   ├── Admin/          # CaseManagement and DoctorManagement dashboard modules
│   │   └── Wizard/         # WizardContainer form layout wrapper
│   ├── pages/
│   │   └── AdminDashboard.jsx  # Landing portal showing case listings
│   ├── steps/              # Steps 1 to 8 forms modules (Client Info, Ultrasound, etc.)
│   ├── services/
│   │   └── db.js           # IndexedDB setup, draft save/load helpers
│   ├── store/
│   │   └── useFormStore.js # Zustand state store with offline submission sync
│   ├── App.jsx             # Main routing and IndexedDB hydration entry
│   ├── main.jsx            # React root mount
│   └── index.css           # Global CSS variables, custom themes and animations
├── index.html              # Frontend HTML shell
├── vite.config.js          # Vite and PWA manifest configurations
└── Claude.md               # Extensive guide for developer handover & configuration
```

---

## 🚀 Setup & Local Development

### Prerequisites
- Install **Node.js** (v20+ recommended)
- Install **AWS CLI** (only required for local deployments)

### 1. Local Setup
Clone the repository, then install dependencies for both the frontend and backend:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Variables Configuration
Configure environment files before running the application:

- **Frontend Environment (`.env` in root folder)**:
  ```env
  VITE_API_URL=https://<api-gateway-id>.execute-api.ap-south-1.amazonaws.com/prod/
  ```
- **Backend Environment (`backend/.env` in backend folder)**:
  ```env
  AWS_ACCESS_KEY_ID=your_aws_access_key
  AWS_SECRET_ACCESS_KEY=your_aws_secret_key
  AWS_REGION=ap-south-1
  CDK_DEFAULT_ACCOUNT=your_aws_account_id
  CDK_DEFAULT_REGION=ap-south-1
  ```

### 3. Local Development Commands

- **Run Frontend locally (Vite dev server)**:
  ```bash
  npm run dev
  ```
- **Run Backend watcher locally (type check)**:
  ```bash
  cd backend
  npm run watch
  ```

### 4. Local AWS Deployment (Manual Testing)
Ensure your AWS CLI credentials are configured locally (`aws configure`). To deploy manually and fetch the live URL:

```bash
# 1. Build the production assets
npm run build

# 2. Deploy to AWS via CDK
cd backend
npx cdk deploy --require-approval never
```
Copy the printed `WebsiteUrl` from the terminal output to test the fully integrated app on AWS.

---

## 🤖 CI/CD Deployments (GitHub Actions)

A GitHub Action is configured in `.github/workflows/deploy.yml`. When changes are pushed or merged into the `main` branch, the pipeline will automatically:
1. Build the production React frontend.
2. Compile the backend CDK TypeScript stack.
3. Deploy resources to AWS.

### Required Repository Secrets
For the GitHub Actions deployment to succeed, configure the following secrets in your repository settings under **Settings -> Secrets and variables -> Actions**:
- `AWS_ACCESS_KEY_ID`: Your AWS access key.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key.
- `AWS_REGION`: The deployment region (defaults to `ap-south-1`).
