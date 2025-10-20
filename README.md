# IT Asset & Issue Tracker

A full-stack asset management system with issue tracking, built with SPFx, .NET Core, and Azure services.

## Project Overview

IT asset management solution that enables employees to view company equipment, track ownership history, and report issues. Built for SharePoint integration with a custom REST API backend.

## Features

- **Asset Management:** Track laptops, monitors, phones, and other equipment
- **Issue Reporting:** Employees can report problems with their assigned assets
- **Ownership History:** View complete assignment timeline for each asset
- **Filtering:** Search and filter by type, status, owner, and issues
- **Maintenance Tracking:** Schedule and track maintenance dates
- **Status:** Available, Assigned, Maintenance, Retired states

## Tech Stack

**Frontend:**
- SharePoint Framework (SPFx)
- TypeScript
- React
- Fluent UI

**Backend:**
- .NET Core 8.0 Web API
- Entity Framework Core
- SQL Server

**Cloud & DevOps:**
- Azure App Service
- Azure SQL Database
- Azure Key Vault

**Future stack improvements:**
- GH Actions with auto deployment

### Local Development

**API Setup:**
1. cd API
2. dotnet restore
3. dotnet ef database update
4. dotnet run

**SPFx Setup:**
1. cd SharePointWebPart
2. npm install
3. gulp serve

**Readme todo:**
- Add secrets managment setup guide
- Add SQL seed instructions

test