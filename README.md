<div align="center">

# 🩺 CareCircle – Elderly Care & Medication Management Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore_%26_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg?style=for-the-badge)](LICENSE)

  <p align="center">
    <b>A smart, interconnected healthcare management platform helping elderly individuals manage daily medications, doctor appointments, and healthcare routines while keeping authorized family members and caregivers instantly informed.</b>
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-user-roles">User Roles</a> •
    <a href="#-ai-powered-capabilities">AI Capabilities</a> •
    <a href="#-accessibility">Accessibility</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>

</div>

---

## 🌟 Project Vision

**CareCircle** is engineered to provide a seamless, trustworthy, and senior-friendly healthcare ecosystem. The elderly individual remains at the absolute center of all healthcare decisions, empowered by high-contrast UI, large readable fonts, voice assistance, and automated family collaboration.

---

## 👥 Three Distinct User Roles

1. **Elderly User**:
   - Personalized greeting & daily health overview.
   - One-tap medication adherence confirmation with celebratory feedback.
   - Easy access to upcoming doctor appointments and emergency contacts.
   - Complete control over who can access their healthcare profile.

2. **Family Member**:
   - Secure authorized access to real-time medication adherence and logs.
   - Automated missed-medication alerts and appointment reminders.
   - View shared care activity timelines and shift updates.

3. **Caregiver**:
   - Manage assigned elderly care profiles and medication schedules.
   - Monitor adherence trends and inventory stock levels.
   - Record care notes and generate intelligent shift handovers.

---

## ✨ Core Features

- **Smart Medication Management**: Add, edit, and track prescriptions with exact dosages, frequency, timings, start/end dates, professional instructions, and inventory stock thresholds.
- **Automated Email Reminder System**: Backend-powered email notification simulator dispatching upcoming medication reminders, missed dose alerts, appointment reminders (24h & 2h prior), and low-stock alerts.
- **Doctor Appointment Management**: Schedule and manage consultations with doctors, specialists, and hospitals. Automatically generate reminders and questions to discuss.
- **Family & Caregiver Collaboration**: Invite members via secure 6-digit passcodes with expiration, granular permission tiers (View Only, Manage Medications, Manage Appointments, Confirm Doses), and member revocation.
- **Care Activity Audit Timeline**: Real-time shared audit log recording who added medications, confirmed doses, or updated care notes.

---

## 🤖 Gemini AI-Powered Capabilities

Integrated with the modern `@google/genai` SDK on the server-side:
- **AI Care Assistant Chat**: Compassionate, safety-conscious routine assistant answering schedule questions and explaining upcoming appointments.
- **Smart Adherence Insights**: Clinical pattern analysis identifying consistency trends and suggestions for doctor discussions.
- **Intelligent Care Handover**: Shift note summarization for nursing and family care teams.
- **Doctor Discussion Generator**: Automatically generates tailored questions for upcoming cardiology and endocrinology appointments.
- **AI Safety Guardrails**: Strictly enforces healthcare disclaimers (never diagnoses or alters prescribed dosages).

---

## ♿ Senior-Friendly Accessibility

- **High Contrast Mode**: Enhances visual distinction for low-vision users.
- **Large Font Mode (A+)**: Instantly scales typography across all views.
- **Text-to-Speech Helper**: Reads screen content aloud for seniors.
- **Light & Dark Themes**: Optimized for day and night comfort.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti, Motion.
- **Backend**: Node.js, Express, Vite middleware integration.
- **AI**: `@google/genai` SDK (`gemini-4-hydrogen`).
- **Persistence & Security**: Firebase Firestore, Firebase Authentication, secure role-based access rules.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/carecircle.git
   cd carecircle
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env` and configure your API keys:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   PORT=3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

Distributed under the **Apache 2.0 License**. See `LICENSE` for more information.

<div align="center">
  <p>Built with ❤️ for seniors, families, and dedicated caregivers.</p>
</div>
