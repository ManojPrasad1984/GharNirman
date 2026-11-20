# GharNirman

GharNirman connects homeowners and contractors with construction workers, crews, service providers, and suppliers. The initial launch is planned for Nagpur.

## Project structure

- `src/` — React and Vite web prototype
- `server/GharNirman.Api/` — ASP.NET Core Web API targeting .NET 10
- `GharNirman.sln` — Visual Studio solution

## Run locally

### API

Open `GharNirman.sln` in Visual Studio, set `GharNirman.Api` as the startup project, and press **F5**. Swagger UI is available at `/swagger` in the Development environment. The health endpoint is `/health`.

### Web prototype

From a terminal in the repository root:

```powershell
npm install
npm run dev
```

The web prototype currently uses sample data. Database integration and API calls are the next implementation steps.

## Planned platform

- Web: React + Vite
- Mobile: Expo + React Native
- API: ASP.NET Core on .NET 10
- API hosting: Azure App Service
- Database: Azure SQL Database; local SQL Server Express is available for development
- Background jobs: Azure Functions when needed
