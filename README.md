# ParcelRelay Frontend

A responsive courier and logistics management web application built with Next.js, React, and TypeScript. The frontend provides role-specific workflows for customers, couriers, and administrators and connects to the ParcelRelay REST API.

## Live Application

- **Frontend:** https://parcel-relay-frontend.vercel.app
- **Backend API:** https://parcel-relay-backend.vercel.app
- **Frontend Repository:** https://github.com/mahmudulhaque13/parcel-relay-frontend
- **Backend Repository:** https://github.com/mahmudulhaque13/parcel-relay-backend

## Features

### Authentication and Access Control

- Login, registration, email verification, and password recovery flows
- Role-specific experiences for Customer, Courier, and Admin
- Protected dashboard areas and role-aware navigation
- Form validation and user-facing error feedback

### Customer

- Create shipments and view shipment details
- View shipment history and shipment status
- Track shipments
- Manage profile information
- View payment-related information

### Courier

- Courier registration and verification flow
- View assigned shipments
- View shipment details and update shipment statuses

### Admin

- Review courier applications and approve couriers
- Manage hubs and delivery zones
- Manage pricing
- Access administrative dashboard and reports

### Shipment and Payment Experience

- Shipment creation and details pages
- Public shipment tracking
- Stripe test-payment flow, including success and cancellation pages
- Loading, empty, and error states across supported workflows

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** React, TypeScript, Tailwind CSS
- **Data fetching/state:** TanStack Query
- **Forms:** Project-configured form and validation libraries
- **API communication:** ParcelRelay REST API
- **Payments:** Stripe test mode
- **Deployment:** Vercel

> Keep this list aligned with the packages actually installed in the repository. Do not list a library that the current codebase does not use.

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm
- A running ParcelRelay backend for API-dependent functionality

### 1. Clone the repository

```bash
git clone https://github.com/mahmudulhaque13/parcel-relay-frontend.git
cd parcel-relay-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root. Use the variable name expected by the current API client configuration.

Example:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

For production, configure the corresponding variable in Vercel with your deployed backend API base URL, for example:

```env
NEXT_PUBLIC_API_BASE_URL=https://parcel-relay-backend.vercel.app/api/v1
```

**Important:** Confirm the exact environment-variable name and API base path in the project's API client before using these examples. Never put private API keys, database credentials, JWT secrets, or Stripe secret keys in frontend environment variables.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build and run for production

```bash
npm run build
npm run start
```

## Main Application Areas

The frontend includes public pages and role-specific application areas, including:

- Public pages: Home, About, Services, Pricing, and Contact
- Authentication: Login, registration, email verification, and password recovery
- Customer: Dashboard, shipments, shipment creation, shipment details, payments, and profile
- Courier: Dashboard, registration, verification, and assigned shipment details
- Admin: Dashboard, courier applications, hubs, zones, pricing, and reports
- Payment: Success and cancellation pages

Routes and available features may change as the application evolves.

## Backend Integration

The frontend communicates with the ParcelRelay backend through REST API endpoints.

- **Production backend:** https://parcel-relay-backend.vercel.app
- **Backend repository:** https://github.com/mahmudulhaque13/parcel-relay-backend

The backend is responsible for server-side business logic, authentication enforcement, data persistence, shipment operations, and payment verification. For backend setup and API implementation details, see the backend repository.

## Deployment

The frontend is deployed on Vercel.

1. Import the frontend repository into Vercel.
2. Configure the required environment variables.
3. Ensure the backend is deployed and reachable.
4. Configure backend CORS to allow the production frontend origin.
5. Deploy and test authentication, shipment creation, tracking, and the Stripe test-payment flow on the live site.

## Author

**Mahmudul Haque**

GitHub: https://github.com/mahmudulhaque13
