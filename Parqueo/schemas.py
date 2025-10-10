from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class VehicleBase(BaseModel):
    placa: str
    tipo: str

class VehicleCreate(VehicleBase):
    user_id: int

class Vehicle(VehicleBase):
    id: int
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    nombre: str
    email: str
    telefono: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    vehiculos: List[Vehicle] = []
    class Config:
        orm_mode = True

class ReservationBase(BaseModel):
    fecha_inicio: datetime
    fecha_fin: datetime
    espacio: int
    user_id: int
    vehicle_id: int

class ReservationCreate(ReservationBase):
    pass

class Reservation(ReservationBase):
    id: int
    class Config:
        orm_mode = True

class PaymentBase(BaseModel):
    monto: float
    metodo: str
    reserva_id: int

class PaymentCreate(PaymentBase):
    pass

class Payment(PaymentBase):
    id: int
    class Config:
        orm_mode = True
