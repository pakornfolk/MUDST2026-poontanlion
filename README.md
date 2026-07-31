# Victory Room - Modern Luxury Hotel Room Booking Management System

A modern, production-ready Luxury Hotel Room Booking & Management Web Application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Supabase** (with PostgreSQL, Auth, Realtime, Storage, and Row Level Security). Design system crafted directly according to [DESIGN.md](file:///c:/Users/poont/Desktop/All%20Project/Project_Hotel-Room/DESIGN.md) (BMW Corporate Luxury dialect).

---

## Key Features

### 1. Dual Role Architecture (User & Admin)
- **Customer Portal**: Search suites, view image carousels with Lightbox zoom, dynamic PromptPay QR payment, upload payment slips, track booking history, manage wishlist, leave reviews, multi-language (TH/EN), dark mode.
- **Admin Management Console**:
  - **7 Executive Metrics**: Total Rooms, Available, Reserved, Occupied, Today's Bookings, Monthly Revenue, Annual Revenue.
  - **Interactive Recharts**: Monthly Revenue Bar Chart, Occupancy Rate Pie Chart, Daily Demand Line Chart.
  - **Room Management (CRUD)**: Create, edit, and delete rooms with gallery manager, capacity, size, amenities, and status toggles.
  - **Booking & Payment Management**: Verification queue for uploaded payment slips. Approving slip automatically sets booking status to `Paid` and room status to `Reserved`.
  - **User Management**: Search users, toggle roles (Admin/User), trigger password reset emails.
  - **Hotel Information Editor**: Live update address, phone, email, Google Maps embed iframe, check-in/out times, policies.
  - **Reports & Export**: Export full booking reports to **PDF** (jsPDF) or **Excel** (.XLSX).
  - **Activity Log & Notification Center**: Audit trail of administrative actions + realtime toast & Web Audio doorbell sound alerts!

### 2. Dual Backend Architecture
- **Supabase Production Backend**: Connected via `@supabase/supabase-js`. Includes complete SQL schemas (`supabase/schema.sql`) and seed data (`supabase/seed.sql`) with Row Level Security (RLS) policies.
- **Interactive Local Fallback**: Works out of the box with zero setup using `localStorage` dynamic mock data engine so all actions update live.

---

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Supabase Database Setup (Optional)**:
   - Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
   - Run `supabase/schema.sql` and `supabase/seed.sql` in your Supabase SQL Editor.

---

## Deployment (Vercel / Netlify)

1. Push code to GitHub.
2. Import project into Vercel or Netlify.
3. Set environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Deploy!
