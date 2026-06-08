# DOTrack

🌿 Branch Strategy

main → Production-ready code
develop-backend → Base branch for backend
dev-backend → Active backend development
develop-frontend → Base branch for frontend
dev-frontend → Active frontend development

👉 Workflow:

Create feature branches from dev-frontend or dev-backend.
Merge into develop-frontend / develop-backend.
Final tested code goes to main. 



This file is **pure documentation**.
Later, you’ll convert these entities into:

* DB schemas (MongoDB / SQL)
* TypeScript interfaces
* API contracts


# Core Entities

## User
## Project
## DeploymentRequest
```

Now let’s define **each entity**, with **attributes + explanation**.

---

## 🧑 User Entity

### Purpose

Represents a person using the platform.

### Attributes to add

```md
## User

| Field        | Type        | Description |
|-------------|------------|-------------|
| id          | string     | Unique identifier |
| name        | string     | User full name |
| email       | string     | Unique email address |
| password    | string     | Hashed password |
| role        | enum       | user / admin |
| createdAt  | datetime   | Account creation time |
| updatedAt  | datetime   | Last update time |
```

### Relationships

* A **User can own multiple Projects**
* A **User can create multiple DeploymentRequests**

---

## 📦 Project Entity

### Purpose

Represents an application or service owned by a user.

### Attributes

```md
## Project

| Field        | Type        | Description |
|-------------|------------|-------------|
| id          | string     | Unique project ID |
| name        | string     | Project name |
| description | string     | Project description |
| ownerId     | string     | Reference to User |
| repoUrl     | string     | Git repository URL |
| createdAt   | datetime   | Project creation time |
| updatedAt   | datetime   | Last update time |
```

### Relationships

* A **Project belongs to one User**
* A **Project can have many DeploymentRequests**

---

## 🚀 DeploymentRequest Entity

### Purpose

Represents a request to deploy a project (CI/CD style).

### Attributes

```md
## DeploymentRequest

| Field        | Type        | Description |
|-------------|------------|-------------|
| id          | string     | Unique deployment ID |
| projectId   | string     | Reference to Project |
| requestedBy | string     | User who triggered deployment |
| status      | enum       | pending / running / success / failed |
| environment | enum       | dev / staging / production |
| createdAt   | datetime   | Request time |
| completedAt | datetime   | Completion time |
```

### Relationships

* A **DeploymentRequest belongs to one Project**
* A **DeploymentRequest is triggered by one User**

---

## 🔗 Relationship Summary (Very Important)

Add this at the bottom of the file:

```md
## Entity Relationships

User 1 ──── * Project  
User 1 ──── * DeploymentRequest  
Project 1 ──── * DeploymentRequest
```

This helps:

* Backend schema design
* API design
* Frontend state modeling

---

## 🧠 Why this is important (real-company reason)

This document becomes the **single source of truth** for:

* Database schemas
* `/packages/shared-types`
* API request/response models
* Frontend forms & tables

Senior engineers **always do this before coding**.

---

## What comes NEXT after this issue?

After this issue is closed:

1. Convert these entities into **TypeScript interfaces**
2. Put them into:

   ```
   /packages/shared-types
   ```
3. Use them in:

   * Backend APIs
   * Frontend components

---

If you want, next I can:

* Convert this **directly into `entities.md`**
* Create **TypeScript interfaces**
* Design **MongoDB schemas**
* Or map this to **REST API endpoints**

Just tell me what’s next 👌
