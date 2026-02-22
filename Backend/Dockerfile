# Base Image
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Dependencies
COPY *.csproj ./
RUN dotnet restore

# Project
COPY . ./

# Tools
RUN dotnet tool restore

# Ports
EXPOSE 5016

# Running Application
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
