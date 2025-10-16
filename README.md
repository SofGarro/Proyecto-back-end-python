# ParkEase Backend

Backend desarrollado con FastAPI para la gestión de un sistema de parqueo.

## Descripción

Este proyecto es una API REST para administrar usuarios, tarifas, reservas, accesos y reportes de un sistema de estacionamiento. Está construido con FastAPI, usando Pydantic para validación y Uvicorn como servidor ASGI.

## Tecnologías usadas

- Python 3.11
- FastAPI
- Pydantic
- Uvicorn
- psycopg2 (para conexión a PostgreSQL)
- Supabase (cliente para la base de datos, si se usa)
- email-validator (validación de emails)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd parkease-backend
