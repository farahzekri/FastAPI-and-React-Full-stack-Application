from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId

from decimal import Decimal


class Supplier(BaseModel):
    name: str
    company: str
    email: EmailStr
    phone: str

class Product(BaseModel):
 
    name: str
    quantity_in_stock: int 
    quantity_sold: int 
    unit_price: float 
    revenue: float = 0.0
    supplied_by: str =None

    class Config:
        json_encoders = {ObjectId: str}



    
