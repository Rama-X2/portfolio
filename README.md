<div align="center">

# Ade Ramadhani Putra — Portfolio Website

**Modern, responsive, and performance-driven personal web portfolio.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-rama--x2.my.id-4f46e5?style=flat-square&logo=google-chrome&logoColor=white)](https://rama-x2.my.id)
[![Next.js](https://img.shields.io/badge/Next.js%2014-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2018-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%203-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Resend](https://img.shields.io/badge/Resend%20API-000000?style=flat-square&logo=resend&logoColor=white)](https://resend.com/)

[Explore Live Showcase](https://rama-x2.my.id) • [View Projects](https://rama-x2.my.id#projects) • [Contact](https://rama-x2.my.id#contact)

</div>

---

## Project Overview

This repository hosts the source code and visual presentation layer for the personal portfolio of **Ade Ramadhani Putra** (Full Stack Developer & UI/UX Designer). The platform is engineered to exhibit real-world software engineering projects, industry-standard certifications, technical competencies, and an integrated direct communication channel.

Built with a modern dark glassmorphism design language, the application focuses on high visual fidelity, seamless micro-interactions, low-latency performance, and bilingual content presentation.

---

## Key Highlights

- **Dark Glassmorphism Interface**: Multi-layered translucent glass panels, dynamic ambient gradients, and responsive layouts tailored for desktop, tablet, and mobile viewports.
- **Bilingual Architecture**: Built-in Indonesian and English localization with client-side persistence via localStorage.
- **Bidirectional Scroll Animations**: Responsive scroll detection triggering fluid entrance effects on both upward and downward viewport traversal without animation stutter.
- **Interactive Project Showcase**: Curated showcase of production and full-stack software projects featuring modal details, live demonstration links, and repository access.
- **Verified Credentials & Certifications**: Structured showcase of verified industry achievements from Cisco, Dicoding, and Microsoft Learn with direct credential links.
- **In-App Resume Preview**: Native modal viewer enabling instant inspection and high-fidelity download of curriculum vitae documentation.
- **Serverless Direct Messaging**: Server-side contact routing powered by Next.js API endpoints and the Resend API with real-time input sanitization, rate-limiting, and error handling.
- **Performance & Asset Optimization**: Accelerated layout rendering, next-gen image formats, and zero-flicker CSS GPU layer management.

---

## Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Server-side rendering, routing, and static generation |
| **Core Library** | React 18 | Declarative component-driven user interface |
| **Language** | TypeScript 5 | Strict static typing and code reliability |
| **Styling** | Tailwind CSS | Utility-first responsive design and custom glass tokens |
| **Motion Engine** | Framer Motion | Smooth state transitions and micro-interactions |
| **Animation Tokens** | AOS Stylesheet | Lightweight CSS keyframes and transform coordinates |
| **Iconography** | Lucide React & SkillIcons | Unified vector icon assets |
| **Email Gateway** | Resend API | Automated serverless transactional email dispatch |

---

## Directory Overview

```text
portfolio-web/
├── app/
│   ├── api/
│   │   └── contact/        # Serverless contact dispatch endpoint
│   ├── globals.css         # Global styling, scrollbar & animation tokens
│   ├── layout.tsx          # Root layout, metadata & font definitions
│   └── page.tsx            # Main page entry point
├── components/
│   └── Portfolio.tsx       # Core interactive portfolio component & data registry
├── public/
│   ├── certificates/       # High-resolution credential assets
│   ├── cv/                 # Professional resume documentation
│   ├── favicon.png         # Site branding and favicon
│   └── images/             # Project previews and profile photography
├── next.config.mjs         # Next.js compilation settings
├── package.json            # Project dependencies and build scripts
├── tailwind.config.ts      # Tailwind design system configuration
└── tsconfig.json           # TypeScript configuration
```

---

## Author & Contact

**Ade Ramadhani Putra**  
Full Stack Developer & UI/UX Designer — Sukabumi, Indonesia

- **Website**: [rama-x2.my.id](https://rama-x2.my.id)
- **GitHub**: [@Rama-X2](https://github.com/Rama-X2)
- **LinkedIn**: [Ade Ramadhani Putra](https://www.linkedin.com/in/ade-ramadhani-putra-66270b22a)
- **Instagram**: [@rama_ext4](https://instagram.com/rama_ext4)
- **Discord**: `@rama_ext`

---

## Intellectual Property & License

**Copyright © 2026 Ade Ramadhani Putra. All rights reserved.**

The source code, custom design, visual assets, branding, and written content contained within this repository are proprietary. This repository is made publicly visible for portfolio presentation and code review purposes only.

**Unauthorized copying, cloning, modification, distribution, redistribution, sublicensing, or deployment of this project in whole or in part is strictly prohibited without prior written permission from the copyright owner.**