# Activity 4 – FitFlow High-Level Architecture

## Overview

The FitFlow architecture is designed to support a cross-platform fitness
application with personalized workout plans, nutrition tracking, progress
monitoring, social features, and real-time notifications.

The architecture uses React Native for the frontend, Node.js with Express
for the main backend, PostgreSQL for structured data, Firebase for
real-time services, Firebase Authentication for authentication, and an
AI/ML service for intelligent features.

## High-Level Architecture

```text
                         ┌─────────────────────┐
                         │    FitFlow Users    │
                         │   Android / iOS     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ React Native App    │
                         │     Frontend        │
                         └──────────┬──────────┘
                                    │
                              HTTPS / REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Node.js + Express   │
                         │    Backend API      │
                         └──────────┬──────────┘
                                    │
             ┌──────────────────────┼─────────────────────┐
             │                      │                     │
             ▼                      ▼                     ▼
    ┌─────────────────┐    ┌─────────────────┐   ┌─────────────────┐
    │   PostgreSQL    │    │    Firebase     │   │   AI Service    │
    │                 │    │                 │   │                 │
    │ Users           │    │ Real-time Data  │   │ Personalization │
    │ Workouts        │    │ Social Features │   │ Nutrition AI    │
    │ Nutrition       │    │ Notifications   │   │ ML Processing   │
    │ Progress        │    │                 │   │                 │
    └─────────────────┘    └─────────────────┘   └─────────────────┘
             │                                           │
             │                                           ▼
             │                                  ┌─────────────────┐
             │                                  │ TensorFlow Lite │
             │                                  │ / ML Models     │
             │                                  └─────────────────┘
             │
             ▼
    ┌─────────────────┐
    │  Caching Layer  │
    │ Frequently Used │
    │      Data       │
    └─────────────────┘