# ParcelRelay Frontend

ParcelRelay is a courier and logistics management platform built with Next.js App Router, React, TypeScript, Tailwind CSS, TanStack Query, TanStack Form, Zod, and a separate Express/Prisma backend. It supports customer shipment booking and tracking, courier application/approval and delivery status updates, and administrative management workflows.

## Live application

- **Frontend:** https://parcel-relay-frontend.vercel.app
- **Backend API base:** https://parcel-relay-backend.vercel.app/api/v1
- **Backend repository:** https://github.com/mahmudulhaque13/parcel-relay-backend
- **Frontend repository:** https://github.com/mahmudulhaque13/parcel-relay-frontend

> A dedicated public OpenAPI/Swagger documentation URL was not found in the supplied backend source snapshot. Do not submit a guessed `/docs` URL; publish or confirm the API documentation URL before final submission.

## Main workflows

- Public shipment tracking by tracking number
- Customer registration, email verification, login, shipment creation, quote review, Stripe test payment, payment history, and profile management
- Courier application, email verification, administrator approval, assigned shipment viewing, and authorized delivery status updates
- Admin dashboard, user management, courier application review, and hub, zone, pricing, and report management
- Stripe payment success and cancellation pages

## Roles

- **Customer:** create and track shipments, complete online payments, view shipment/payment information, and manage profile details.
- **Courier:** apply for approval, view assigned shipments, and update allowed shipment statuses after approval.
- **Admin:** manage operational resources and review courier applications.

The login page provides one-click demo login buttons for Customer, Courier, and Admin. These buttons use the backend `/auth/demo-login` endpoint. Demo access depends on the backend demo accounts and environment configuration being provisioned correctly. Do not commit demo passwords or production secrets to this repository.

## Tech stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- TanStack Query for server state
- TanStack Form and Zod for form handling/validation
- ofetch for API requests
- Sonner for notifications
- Lucide React icons
- Vercel deployment

## Local development

### Requirements

- Node.js version compatible with the version in `package.json` and lockfile
- npm
- A running/deployed ParcelRelay backend API

### Setup

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm ci
   ```

3. Create `.env.local` from `.env.example` and set the required public environment values.
4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL including `/api/v1` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID; required only if Google sign-in is enabled |

Example for the deployed backend:

```env
NEXT_PUBLIC_API_BASE_URL=https://parcel-relay-backend.vercel.app/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

Never put backend secrets, private API keys, passwords, or tokens in `NEXT_PUBLIC_*` variables. Never commit `.env`, `.env.local`, or production environment files.

## Useful scripts

```bash
npm run dev       # Start local development
npm run build     # Create a production build
npm run start     # Run the production build locally
npm run lint      # Run Biome checks
npm run format    # Format supported source files with Biome
```

## Route overview

### Public

- `/` — Home and shipment tracking
- `/about` — About ParcelRelay
- `/services` — Platform services and workflow
- `/pricing` — Pricing factors and quote workflow
- `/contact` — Support paths for tracking, account access, and courier applications
- `/login` and `/register` — Authentication and registration
- `/courier/register` — Courier application

### Customer

- `/dashboard` — Customer overview
- `/dashboard/shipments/create` — Create shipment and request quote
- `/dashboard/shipments/[id]` — Shipment details
- `/dashboard/profile` — Profile
- `/dashboard/payments` — Payment history/status

### Courier

- `/courier` — Assigned shipments
- `/courier/shipments/[id]` — Assigned shipment details and allowed status updates

### Admin

- `/admin` — Overview
- `/admin/manage` — Resource/user management
- `/admin/courier-applications` — Courier application review
- `/admin/hubs` — Hub management
- `/admin/zones` — Zone management
- `/admin/pricing` — Pricing-rule management
- `/admin/reports` — Reports

### Payment and account utilities

- `/payment/success` — Payment success verification
- `/payment/cancel` — Cancelled payment result
- `/verify-email`, `/forgot-password`, `/reset-password` — Account verification and recovery

## Security notes

- Authorization must be enforced by the backend API for every protected operation; hiding UI controls is not an authorization boundary.
- Use dedicated demo accounts for evaluation and rotate any credential that may have been exposed.
- Do not include `.env*` files or `.git` history in shared source archives.

## Assignment submission checklist

- [ ] Confirm the public API documentation URL (OpenAPI/Swagger or the assigned API documentation resource).
- [ ] Verify Customer, Courier, and Admin demo login in the deployed environment.
- [ ] Test the payment success and cancellation redirects in Stripe test mode.
- [ ] Verify responsive behavior, loading/empty/error states, and role restrictions.
- [ ] Record a 5–10 minute walkthrough video and set the link to viewable by evaluators.
- [ ] Submit the frontend/backend repositories, live URLs, API documentation link, demo video, and dedicated demo credentials using the assignment's required format.
