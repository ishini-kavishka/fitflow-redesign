# FitFlow Redesign

## IT3060 – Human Computer Interaction
### Lab Exercise 05 – Technology Stack and System Architecture

FitFlow is a fitness tracking application redesign focused on improving the user experience through personalized workout plans, nutrition tracking, progress monitoring, social interaction, and intelligent AI-powered features.

This repository contains the technology evaluation, recommended technology stack, high-level system architecture, and supporting documentation prepared for the FitFlow redesign.

## Project Objectives

The main objectives of the FitFlow redesign are to:

- Provide personalized and adaptive workout plans
- Improve workout and progress tracking
- Support nutrition tracking
- Provide social and community features
- Support real-time notifications
- Integrate AI/ML functionality
- Provide a secure, scalable, and maintainable system

## Recommended Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React Native |
| Backend | Node.js + Express |
| Primary Database | PostgreSQL |
| Real-Time Services | Firebase |
| Authentication | Firebase Authentication |
| AI/ML | TensorFlow Lite / AI Service |
| API Communication | REST APIs over HTTPS |

## Project Structure

fitflow-redesign/
- frontend/
  - README.md
- backend/
  - README.md
- ai-service/
  - README.md
- docs/
  - frontend-comparison.md
  - backend-comparison.md
  - database-auth-comparison.md
  - comparison-matrix.md
  - architecture.md
  - ADR.md
- README.md

## Lab Activities

### Activity 1 – Frontend Technology Comparison

Flutter, React Native, Kotlin Multiplatform, and Swift/SwiftUI were compared based on development speed, code reusability, performance, ecosystem support, learning curve, web compatibility, AI/ML integration, real-time features, maintenance cost, and security.

React Native was selected as the recommended frontend technology.

### Activity 2 – Backend, Database and Authentication Comparison

Backend technologies, database solutions, and authentication services were evaluated.

The selected technologies are:

- Node.js + Express for the main backend
- PostgreSQL for structured application data
- Firebase for real-time functionality
- Firebase Authentication for user authentication
- A separate AI/ML service where required

### Activity 3 – Technology Decision Matrix

A weighted decision matrix was created using criteria such as:

- Performance
- Scalability
- Development speed
- Security
- Cost efficiency
- AI/ML support
- Real-time support
- Maintainability

The results were used to support the final technology stack selection.

### Activity 4 – High-Level Architecture

A high-level architecture was designed to show the interaction between:

- React Native frontend
- Node.js/Express backend
- PostgreSQL database
- Firebase services
- Authentication
- AI/ML services
- Caching layer

An Architecture Decision Record (ADR) was also prepared to document the technology selection and its rationale.

### Activity 5 – GitHub Repository

The FitFlow project repository was created with separate folders for frontend, backend, AI services, and project documentation.

## Documentation

Detailed technology comparisons and architecture documentation are available in the `docs` directory.

## Conclusion

The selected architecture provides FitFlow with a suitable foundation for cross-platform development, real-time functionality, structured data management, AI integration, security, scalability, and future maintainability.