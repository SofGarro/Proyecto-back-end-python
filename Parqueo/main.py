from fastapi import FastAPI
from database import engine, Base
from routes import users, vehicles, reservations, payments

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ParkEase API")

app.include_router(users.router)
app.include_router(vehicles.router)
app.include_router(reservations.router)
app.include_router(payments.router)
