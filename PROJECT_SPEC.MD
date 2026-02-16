# Project Specification

## Project Name
clean-response

## Project Goal
Create a professional npm package built with TypeScript that standardizes API responses for backend applications (Express, Fastify, Node.js).

This package should:
- Be lightweight
- Be fully typed (TypeScript)
- Be production-ready
- Follow clean architecture
- Be publishable to npm

---

# Core Features

## 1. Success Response
Function:
success<T>(data: T, message?: string)

Default format:
{
  success: true,
  message: "Success",
  data: T,
  timestamp: string
}

---

## 2. Error Response
Function:
error(message: string, code?: number)

Format:
{
  success: false,
  message: string,
  code: number,
  timestamp: string
}

---

## 3. Paginated Response
Function:
paginate<T>(data: T[], meta: PaginationMeta)

Meta:
{
  page: number
  perPage: number
  total: number
  totalPages: number
}

---

# Technical Requirements

- TypeScript
- ESM + CJS support
- Proper folder structure
- Build with tsup or rollup
- Includes:
  - README.md
  - Proper typing
  - Example usage
  - JSDoc comments

---

# Folder Structure

src/
  success.ts
  error.ts
  paginate.ts
  types.ts
  index.ts

dist/

---

# Package.json Requirements

- main
- module
- types
- exports
- keywords
- author
- repository
- proper semantic versioning

---

# Testing

Include basic unit testing using:
- Vitest or Jest

---

# Landing Page Website

Create a modern landing page inspired by:
https://flins.tech/

Style:
- Minimal
- Dark theme
- Modern typography
- Animated hero section
- Code preview section
- Feature grid
- Installation section
- Footer with GitHub link

Tech Stack:
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- Responsive design

---

# Landing Page Sections

1. Hero
   - Package name
   - Short tagline
   - Install command
   - CTA button

2. Features
   - Type-safe
   - Lightweight
   - Express ready
   - Clean API design

3. Code Example
   Show success() usage

4. Why This Package?
   Explain problem it solves

5. Footer
   - GitHub
   - npm
   - Author

---

# Branding

Tone:
Modern backend engineer tool

Audience:
Backend developers
Fullstack developers
Startups

---

# Extra

Add:
- SEO meta tags
- Open Graph support
- Clean animation
- Professional UI feel
