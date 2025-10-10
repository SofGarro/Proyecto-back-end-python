from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    telefono = Column(String)

    vehiculos = relationship("Vehicle", back_populates="propietario")
    reservas = relationship("Reservation", back_populates="usuario")

class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(Integer, primary_key=True, index=True)
    placa = Column(String, unique=True, nullable=False)
    tipo = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    propietario = relationship("User", back_populates="vehiculos")
    reservas = relationship("Reservation", back_populates="vehiculo")

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    fecha_inicio = Column(DateTime, default=datetime.utcnow)
    fecha_fin = Column(DateTime)
    espacio = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))

    usuario = relationship("User", back_populates="reservas")
    vehiculo = relationship("Vehicle", back_populates="reservas")
    pago = relationship("Payment", uselist=False, back_populates="reserva")

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    monto = Column(Float)
    metodo = Column(String)
    reserva_id = Column(Integer, ForeignKey("reservations.id"))

    reserva = relationship("Reservation", back_populates="pago")
