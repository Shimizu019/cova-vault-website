# Cova Vault Website

## Project Structure

This repository contains the official Cova Vault website, which presents the Cova Vault application and serves as a distribution point for the Android application.

## Overview

The Cova Vault Website is a static website that:
- Provides information about Cova Vault
- Documents the features and capabilities of the application
- Serves as the official download hub for the Android application
- Explains Cova Vault's security and privacy philosophy
- Acts as documentation for the application

## Architecture

### Project Structure

```
cova-vault-website/
├── public/
│   ├── assets/           // Static assets available to the website
│   ├── favicon/          // Favicon files
│   └── fonts/            // Font files
│
├── src/
│   ├── components/       // Reusable UI components
│   ├── pages/            // Website pages
│   ├── layouts/          // Page layouts
│   ├── styles/           // CSS files
│   ├── data/             // Structured data for the website
│   └── config/           // Site-wide configuration
│
├── docs/                 // Documentation and planning
│   ├── planning/         // Website planning documents
│   ├── design/           // Design specifications
│   ├── content/          // Content specifications
│   └── releases/         // Release process documentation
│
├── .github/
│   └── workflows/        // GitHub Actions workflows
│
├── LICENSE
└── package.json
```

### Key Principles

1. **No Backend**: The website is static and contains no user authentication, databases, or server APIs.
2. **GitHub as Source of Truth**: Release information should eventually be sourced directly from GitHub releases.
3. **Content First**: Content is structured in data files rather than hardcoded into components.
4. **Security-Focused**: Security claims are carefully vetted against actual implementation.

## Project Contents

### Pages

The website currently includes these pages:

1. **Home**: Main landing page with overview, features, and download call-to-action
2. **Features**: Detailed explanation of Cova Vault's capabilities
3. **Security**: Documentation of security and privacy practices
4. **Download**: Android application download page
5. **Changelog**: Historical release information
6. **Documentation**: User-facing documentation
7. **About**: Information about the project

### Components

Reusable UI components include:
- Layout components (main layout, etc.)
- Navigation components (navbar, etc.)
- Interactive components (buttons, cards, etc.)
- Common components (shared functionality)

### Data

Structured website content:
- Feature specifications
- Release information
- Documentation content

### Configuration

Centralized site configuration for:
- Product information
- Repository details
- Download locations
- Social links

## Deployment

The website will be built and deployed via GitHub Actions from this repository. The deployment pipeline will:

1. Detect changes to the repository
2. Build the static website
3. Deploy to production hosting (provider TBD)

## Development

This project uses React with Vite for building the static website. The development setup will include:

- Hot module replacement for faster development
- TypeScript support (if chosen)
- CSS styling system

## Licensing

This project is part of the Cova Vault project and follows the project's licensing terms.

## Future Enhancements

Planned features include:

1. **GitHub Integration**: Direct integration with GitHub releases for automatic release information
2. **Advanced Content Management**: More sophisticated content organization and management
3. **Performance Optimization**: Image optimization and caching strategies
4. **Accessibility**: Enhanced accessibility compliance

## Documentation

Technical documentation is stored in the `docs/` directory, including:
- Planning documents
- Design specifications
- Content guidelines
- Release process