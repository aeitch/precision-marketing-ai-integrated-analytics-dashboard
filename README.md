# Precision Manufacturing Ltd — Predictive Analytics Suite

![Precision Manufacturing Logo](src/assets/logo.png)

## Overview

The **Precision Manufacturing Ltd Predictive Analytics Suite** is a next-generation industrial monitoring platform designed for real-time asset health tracking, AI-powered fault detection, and predictive maintenance scheduling. Built for manufacturing environments where uptime is critical.

## Key Features

### 🌡️ Central Hub Dashboard
Real-time monitoring of three primary sensor streams:
- **Heat Signatures (Thermal Analysis)** — Continuous temperature monitoring with 85°C threshold alerts
- **Vibration Analysis** — Detecting mechanical wear patterns before failure
- **Structural Health Monitoring** — AI-powered visual inspection results

### 🔧 Asset Management
- Complete inventory of legacy and modern hardware
- Health Score tracking per asset
- Days Until Predicted Maintenance countdown
- Risk classification (Low/Medium/High/Critical)

### 🤖 AI Vision Log
PyTorch-powered computer vision analysis for:
- Micro-fault detection
- Structural crack identification
- Thermal anomaly mapping
- Surface defect recognition

### 🚨 Alerting System
- Emergency notifications with machine IDs
- Failure probability percentages
- Supervisor escalation protocols
- Edge-to-Cloud streaming alerts

## Performance Metrics

| Metric | Improvement |
|--------|-------------|
| Downtime Reduction | **50%** |
| Cost Savings | **20%** |
| Safety Increase | **15%** |

## Technology Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **UI Components:** Shadcn/UI, Radix Primitives
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router v6

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd precision-manufacturing-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── assets/          # Brand assets and images
├── components/
│   ├── dashboard/   # Dashboard widgets and panels
│   ├── layout/      # Sidebar, Header, Layout components
│   └── ui/          # Reusable UI primitives
├── lib/             # Utilities and mock data generators
├── pages/           # Route pages
└── hooks/           # Custom React hooks
```

## Environment Configuration

The platform supports configuration for:
- Sensor data polling intervals
- Alert threshold customization
- Edge function endpoints
- Cloud streaming parameters

## License

© 2026 Precision Manufacturing Ltd. All rights reserved.

---

*Powered by Edge-to-Cloud Inference Engine Technology*
