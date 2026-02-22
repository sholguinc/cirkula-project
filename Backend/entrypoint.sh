#!/bin/bash
set -e

echo "Waiting for MySQL..."
./wait-for-it.sh $MYSQL_HOST:$MYSQL_PORT --timeout=30 --strict --
echo "MySQL Ready!"

echo "Doing migrations..."
dotnet ef database update

echo "Executing seed..."
dotnet run seed

echo "Running application..."
dotnet run --urls "http://0.0.0.0:5016"
