
# 🇮🇳 Civic Assist India

### Making civic assistance accessible to every Indian citizen.

Civic Assist India is a citizen-focused digital assistance platform designed to simplify civic issue reporting, complaint tracking, document management, and access to legal support.

The application brings essential civic services into one accessible interface, with multilingual support and simplified workflows designed to make digital assistance easier to navigate, including for elderly users and people with accessibility needs.

## ✨ Key Features

### 🏠 Citizen Dashboard
- A personalized dashboard with quick access to essential services.
- Dynamic civic highlights and helpful reminders.
- At-a-glance indicators and shortcuts for common actions.
- An interface designed to simplify navigation and reduce complexity.

### 📝 Civic Issue Reporting
- Guided workflows for raising civic issues.
- Multiple reporting pathways, including online filing and assisted reporting.
- A dedicated flow for reviewing and submitting issue information.
- An AI-assisted review interface to support the reporting process.

### 📋 Complaint Tracking
- Access submitted requests through a dedicated tracking interface.
- View individual request details.
- Keep civic reporting workflows organized in one place.

### 📁 Secure Document Vault
- A dedicated area for managing important documents.
- A document-focused interface intended to simplify access to personal records.
- A centralized entry point for document-related workflows.

### ⚖️ Legal Assistance
- Browse an advocate directory.
- Access advocate-related communication interfaces.
- Dedicated screens for simulated advocate calls and chat interactions.

### 🚨 Emergency and Helpline Support
- Quick access to the emergency assistance interface.
- Helpline options from the main dashboard.
- A callback request interface with phone-number validation and a countdown experience.

**Important:** The availability of real emergency calls, callback services, advocate communication, and government complaint submission depends on the relevant external integrations. The presence of an interface alone does not establish that a real service has been connected.

### 🌐 Multilingual Experience
- English and Hindi interface support.
- Translated interface text for major application workflows.
- Language-aware labels, prompts, and notifications.

### ♿ Accessibility
- An elderly-friendly interface mode with enlarged text and controls.
- Simplified interaction patterns.
- Visual indicators and clearly organized actions.
- Support-oriented workflows designed to make the application easier to use.

### 👤 Profile and Security
- Profile viewing and editing interfaces.
- Login and OTP verification screens.
- Consent management.
- Security settings.
- Notification management.

### 🏛️ Civic Highlights
- A dedicated screen for civic information and highlights.
- Rotating dashboard messages designed to surface useful reminders and awareness prompts.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| TypeScript | Type-safe application development |
| Vite 6 | Development server and build tooling |
| Framer Motion | UI animations and transitions |
| Lucide React | Icons and visual interface elements |
| React Context API | Shared application state |
| CSS utility classes | Layout, styling, and responsive design |
| GitHub Actions | Repository workflow automation |

The application uses a component-based architecture, with separate screens, reusable components, shared application context, theme configuration, and centralized translation resources.

## 📂 Project Structure

```text
Civil-help-india/
├── .github/
│   └── workflows/         # GitHub Actions workflows
├── components/            # Reusable UI components
├── public/                # Public assets
├── screens/               # Application screens
│   ├── LoginScreen
│   ├── OTPScreen
│   ├── ConsentScreen
│   ├── Dashboard
│   ├── RaiseIssueFlow
│   ├── TrackRequests
│   ├── VaultScreen
│   ├── ProfileScreen
│   ├── AdvocateListScreen
│   ├── SecurityScreen
│   ├── AdvocateCallScreen
│   ├── AdvocateChatScreen
│   ├── EmergencyCallScreen
│   └── CivicHighlights
├── App.tsx                # Application screen routing
├── AppContext.tsx         # Shared application state
├── index.html             # HTML entry point
├── index.tsx              # React entry point
├── metadata.json          # Application metadata
├── theme.ts               # Theme configuration
├── translations.ts        # English/Hindi translations
├── types.ts               # TypeScript types
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

*The tree above summarizes the repository's organization; individual screen filenames may include the `.tsx` extension.*

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Raveesh06/Civil-help-india.git
cd Civil-help-india
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal. Open that URL in your browser to explore the application.

### 4. Create a production build

```bash
npm run build
```

The optimized frontend build is generated in the `dist/` directory.

### 5. Preview the production build

```bash
npm run preview
```

### GitHub Pages build

The repository also provides a build command configured for deployment under the repository's GitHub Pages path:

```bash
npm run build:ghpages
```

This sets the Vite base path to `/Civil-help-india/`. A successful build does not, by itself, configure or complete deployment; GitHub Pages must also be enabled and configured appropriately.

## 🧭 Application Workflow

The primary navigation flow is managed through a shared application context and a screen-based router.

1. **Authentication:** Start with the login, OTP, and consent interfaces.
2. **Dashboard:** Access civic reporting, tracking, documents, legal assistance, and helpline options.
3. **Report an issue:** Follow the appropriate guided reporting workflow.
4. **Track requests:** Navigate to submitted request and detail screens.
5. **Manage documents:** Open the document vault.
6. **Access assistance:** Explore advocate-related interfaces and emergency support.
7. **Manage preferences:** Update profile, security, language, and accessibility settings.

## 🔒 Privacy, Security and Limitations

Civic Assist India is a software project intended to demonstrate a more accessible civic assistance experience.

Before using it to handle real citizen information, verify and implement the necessary infrastructure for:

- Secure authentication and genuine OTP verification.
- Persistent storage of user profiles and submitted complaints.
- Secure document uploads and storage.
- Encryption and access controls for sensitive information.
- Integration with official complaint portals and government services.
- Verified advocate information and real communication services.
- Proper emergency-service integration.
- Secure handling of personal information and consent.
- API validation, error handling, and audit logging.

Some interface interactions, including callback requests, emergency calls, document workflows, and complaint management, may be demonstrative rather than connected to real services.

**Do not rely on this prototype as a substitute for official government services, qualified legal advice, or emergency response services.** In an actual emergency in India, contact the appropriate emergency service directly.

## 🗺️ Roadmap

Potential future improvements include:

- [ ] Integrate secure authentication and OTP delivery.
- [ ] Add persistent storage for users and complaints.
- [ ] Connect complaint submission to supported official services.
- [ ] Implement secure document upload and retrieval.
- [ ] Integrate verified legal professionals and appointment workflows.
- [ ] Connect real callback and communication services.
- [ ] Improve end-to-end accessibility testing.
- [ ] Add automated tests for core reporting and tracking workflows.
- [ ] Add deployment and continuous integration checks.

These items represent potential improvements, not a claim that the integrations are currently available.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application locally.
5. Open a pull request explaining your changes.

Please do not commit credentials, personal information, API keys, or other sensitive data.

## 📄 License

No explicit open-source license has been verified for this repository. Until a license is added, reuse and redistribution remain subject to applicable copyright rules.

---

<p align="center">
  <strong>
