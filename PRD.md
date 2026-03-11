# Retail Performance Tracker - PRD

## 1. Product Overview

Retail Performance Tracker is an internal web application for retail operations teams, area managers, and store managers to monitor performance against targets.

The app does not allow manual data entry for store master data, manager mappings, targets, or sales. All source data is managed outside the app in Google Sheets and/or Metabase, and is pushed into the database through n8n workflows.

The app is a read-only dashboard with authentication, reports, rankings, and incentive visibility.

---

## 2. Objective

Build a mobile-responsive internal web app that allows authorized users to:

- log in securely
- view store-wise performance against weekly targets
- view area-manager-wise and state-wise performance summaries
- view top and bottom performers
- view calculated incentives for area managers and store managers

---

## 3. Users and Roles

### Admin
Can view all data across all stores, area managers, and states.

### Area Manager
Can view only data relevant to their assigned stores.

### Store Manager
Can view only data relevant to their assigned store.

Note:
Role assignment and store-manager mappings may be stored in the database, but are not managed through the UI.

---

## 4. Data Flow

### External Systems
- Google Sheets
- Metabase
- n8n

### Data Flow
- Source data lives in Google Sheets and/or Metabase
- n8n extracts/transforms data
- n8n writes cleaned data into Supabase
- The web app reads data from Supabase only

### Important Constraint
The app UI should not include:
- store master management
- area manager mapping management
- target entry forms
- sales import forms
- Metabase integration screens
- alert configuration screens

---

## 5. In Scope

### Authentication
- secure login
- protected routes
- role-based data visibility

### Dashboard
- summary cards for current weekly performance
- total target quantity
- total achieved quantity
- achievement percentage
- total stores covered

### Reports
- store-wise weekly achievement
- area-manager-wise weekly achievement
- state-wise weekly achievement
- daily sales summary at store level

### Rankings
- top performing states
- top performing area managers
- top performing stores
- optional bottom performers

### Incentives
- show calculated weekly incentives for:
  - area managers
  - store managers

### Mobile Responsiveness
- app must work well on mobile and desktop

---

## 6. Out of Scope

The following are not needed in the UI for MVP:

- manual store master editing
- area manager mapping UI
- weekly target entry UI
- daily sales import UI
- Google Sheets integration UI
- live Metabase integration inside app
- auto alerts / notifications
- advanced incentive rule builder
- complicated incentive slabs editor
- audit logs
- complex admin settings
- fancy analytics
- edge-case-heavy permissions system

---

## 7. Functional Requirements

## 7.1 Authentication
- users must log in to access the app
- unauthenticated users should be redirected to login
- each user has a role:
  - admin
  - area_manager
  - store_manager

## 7.2 Data Visibility Rules
- admin can view all data
- area manager can view only assigned stores and related summaries
- store manager can view only their own store data

## 7.3 Dashboard
The dashboard should show:
- current week target quantity
- current week achieved quantity
- current week achievement %
- total sales amount
- total stores in view

## 7.4 Reports
The app should support:
- daily sales report by store
- weekly achievement report by store
- weekly achievement summary by area manager
- weekly achievement summary by state

Users should be able to filter reports by:
- date / week
- state
- area manager
- store
- category

## 7.5 Rankings
The app should show rankings for:
- states
- area managers
- stores

Ranking should be based on weekly achievement percentage.

## 7.6 Incentives
The app should display calculated incentives from the database for:
- area managers
- store managers

The app does not need to calculate complex rules in the UI.
If needed, calculations can be precomputed in the database or by n8n.

---

## 8. Data Assumptions

The following data will be available in the database via n8n:

- store master data
- state information
- area manager mapping
- store manager mapping
- category-wise weekly targets
- daily sales data
- achievement data or raw data needed to calculate achievement
- incentive data or raw data needed to calculate incentives

---

## 9. Suggested MVP Pages

### 1. Login
- email/password login

### 2. Dashboard
- summary cards
- weekly overview
- quick ranking snapshot

### 3. Reports
- store-wise report
- area-manager-wise report
- state-wise report
- daily sales report

### 4. Rankings
- top stores
- top area managers
- top states

### 5. Incentives
- weekly incentive list for area managers and store managers

---

## 10. Suggested Database Entities

These are suggested entities in Supabase:

- profiles
- stores
- categories
- weekly_targets
- daily_sales
- weekly_achievement_summary
- weekly_rankings
- weekly_incentives

Note:
Some summary tables may be generated by SQL views, materialized views, or n8n workflows.

---

## 11. Non-Functional Requirements

- mobile responsive
- simple and clean UI
- fast report loading
- secure authentication
- internal-use only
- easy for non-technical users

---

## 12. Recommended Tech Stack

- Frontend: Next.js
- Language: TypeScript
- UI: Tailwind CSS
- Backend / Database / Auth: Supabase
- Automation: n8n
- Version Control: Git + GitHub

---

## 13. MVP Build Order

1. project setup
2. Git and GitHub setup
3. Next.js app setup
4. Supabase project setup
5. login flow
6. protected routes
7. dashboard
8. reports page
9. rankings page
10. incentives page
11. mobile responsiveness cleanup

---

## 14. Success Criteria

The MVP is successful if:
- users can log in
- admins can see all data
- area managers can see only their area data
- store managers can see only their store data
- weekly target vs achievement is visible
- rankings are visible
- incentives are visible
- app is mobile responsive