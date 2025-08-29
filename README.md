<div align="center">
  <br />
    <a href="#" target="_blank">
      <img src="https://www.shutterstock.com/search/time-management-banner" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">An AI SaaS Platform</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. ✨ [Features](#features)
4. 📷 [Screenshots](#Screenshots)

## <a name="introduction">🤖 Introduction</a>

Schedulrr is a modern scheduling platform that streamlines booking meetings without back-and-forth emails. Users can create event types, define weekly availability, share public booking links, and automatically generate Google Calendar events with Google Meet links. It offers a polished booking experience, protected routes, and a creator dashboard with upcoming meetings.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js 14 (App Router, Server Components, Server Actions)
- React 18
- Prisma ORM
- Neon (PostgreSQL)
- Clerk (Auth + Google OAuth)
- Google Calendar API (Meet link generation)
- Shadcn UI (Radix + Tailwind components)
- TailwindCSS

## <a name="features">✨ Features</a>

👉 **Authentication & Authorization (Clerk)**: Secure sign-in/sign-up, protected routes via middleware, server-side `auth()` checks.

👉 **User Onboarding**: Auto-create user record on first sign-in with synced Clerk profile and unique username.

👉 **Event Types**: Create event types with title, description, duration, and privacy (public/private).

👉 **Public Booking Pages**: Shareable links like `/[username]/[eventId]` for external users to book directly.

👉 **Availability Management**: Configure day-wise availability, start/end times, and minimum gap (`timeGap`) between bookings.

👉 **Smart Time Slots**: Server-side generation of available time slots for the next 30 days, avoiding past times and overlaps.

👉 **Google Calendar Integration**: On booking, creates a calendar event with attendees and auto-generated Google Meet link.

👉 **Booking Management**: Store bookings with attendee details, start/end time, Meet link, and `googleEventId` for future management.

👉 **Cancel Meetings**: Cancels both DB booking and Google Calendar event using stored `googleEventId`.

👉 **Dashboard Overview**: Displays the next 3 upcoming meetings for quick visibility.

👉 **Copy Event Link**: One-click copy of public booking URL from event cards.

👉 **Responsive UI/UX**: Mobile-first layouts, accessible components, smooth transitions, and visual feedback.

👉 **Reusable UI System**: Shadcn components (`Button`, `Card`, `Select`, `Drawer`, `Carousel`, etc.) themed with Tailwind.

👉 **Form Validation**: Zod + React Hook Form for robust client-side validation and error handling.

👉 **Secure Server Actions**: All mutations (events, bookings, availability) executed with `"use server"` and Clerk auth guards.

and many more, including clean code structure, reusability, and modern DX.

## <a name="Screenshots">📷 Screenshots</a>

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/7e55c5db-ef3d-4f13-913e-3cd19d063017" width="400" style="border-radius: 20px;"></td>
    <td><img src="https://github.com/user-attachments/assets/1437eff8-54e9-47bf-aab7-05ef1f97ab5e" width="400" style="border-radius: 20px;"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/247ca74f-1508-4069-8d12-e01ec46d7951" width="400" style="border-radius: 20px;"></td>
    <td><img src="https://github.com/user-attachments/assets/04bb049a-546d-4e6f-8886-ae7cac83e85e" width="400" style="border-radius: 20px;"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/65eca7b2-ecc6-4048-8429-7ca522e88875" width="400" style="border-radius: 20px;"></td>
    <td><img src="https://github.com/user-attachments/assets/02dda3ae-d630-4b74-a987-02680760af56" width="400" style="border-radius: 20px;"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/69a2f5c4-b721-4cd4-9f9f-fc9e84c0b209" width="400" style="border-radius: 20px;"></td>
    <td><img src="https://github.com/user-attachments/assets/93000cbc-7651-4764-b3df-fd6067b7ee96" width="400" style="border-radius: 20px;"></td>
  </tr>
</table>

## 💡 Author

Made with 💙 by Schedulrr

📬 shivplacement2526@gmail.com 
🌐 [LinkedIn](https://www.linkedin.com/in/shiv-shakti-7a1b52252/)

---

## ⭐ If you found this project helpful, feel free to star the repo and share it!
