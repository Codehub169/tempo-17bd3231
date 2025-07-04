#!/bin/bash

echo "Installing Node.js dependencies..."
npm install

if [ $? -ne 0 ]; then
  echo "Failed to install Node.js dependencies. Exiting."
  exit 1
fi

echo "Building the React application..."
npm run build

if [ $? -ne 0 ]; then
  echo "Failed to build the React application. Exiting."
  exit 1
}

echo "Serving the application on port 9000..."
npx serve dist -l 9000