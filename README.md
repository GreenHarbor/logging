# Logging Service

## Overview
Our logging service is a critical microservice developed with NestJS. It plays a pivotal role in our application's health monitoring and debugging processes by centralizing logging mechanisms.

## Features

- **Log Capturing**: The service subscribes to RabbitMQ queues to capture logs emitted from various microservices across our application landscape.
- **Centralized Logging**: All received logs are centralized within Elasticsearch, providing a scalable log storage solution.
- **Visualization and Monitoring**: Kibana integrates with Elasticsearch to visualize logs and enables the creation of dashboards for real-time monitoring.
- **Alerts**: Kibana is also configured to trigger alerts for specific log patterns that may indicate errors or other critical issues.

## Architecture

```plaintext
Microservices --(logs)--> RabbitMQ --(subscribes)--> Logging Service --(stores)--> Elasticsearch --(visualize)--> Kibana
```
Getting Started
To set up the logging service, ensure you have NestJS, RabbitMQ, Elasticsearch, and Kibana installed and configured appropriately. Once these prerequisites are met, you can clone the repository and initialize the service.

Installation
Clone the repository:
```bash
git clone https://your-repository-url.com
```
Install dependencies:
```bash
cd your-logging-service-directory
npm install
```
Start the service:
```bash
npm start
```
