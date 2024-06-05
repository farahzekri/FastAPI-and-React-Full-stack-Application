from fastapi import APIRouter
from models.model import Product,Supplier
from config.database import collection_name,collection_namesup
from schemas.schema import list_serial_product,list_serial_supplier,individual_serial_product
from bson import ObjectId

from typing import List

from fastapi import BackgroundTasks, FastAPI
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import BaseModel, EmailStr
from starlette.responses import JSONResponse
from dotenv import load_dotenv
import os
router=APIRouter()

@router.post("/supplier")
async def post_supplier(supplier_info:Supplier):
    collection_namesup.insert_one(dict(supplier_info))
    return {"status": "ok"}

@router.get("/getsupplier")
async def get_supplier():
    supplierr = list_serial_supplier(collection_namesup.find())
    return supplierr

@router.get("/getsupplier/{id}")
async def get_supplier_parid(id:str):
    supplierr=collection_namesup.find_one({"_id":ObjectId(id)})
    return supplierr

@router.put("/putsupplier/{id}")
async def put_todo(id:str,supplier:Supplier):
   collection_namesup.find_one_and_update({"_id":ObjectId(id)},{"$set":dict(supplier)})

@router.delete("/deletesupplier/{id}")
async def delete_supplier(id:str):
    collection_namesup.find_one_and_delete({"_id":ObjectId(id)})   

@router.post("/product/{supplied_id}")
async def post_product(supplied_id: str, product: Product):
    supplier = collection_namesup.find_one({"_id": ObjectId(supplied_id)})
    if supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    product_data = product.dict()
    product_data["supplied_by"] = supplied_id
    product_data['revenue'] += product_data['quantity_sold']*product_data['unit_price'] 
    collection_name.insert_one(product_data)
    return {"status": "ok"}


@router.get("/getproduct")
async def get_product():
    products = list_serial_product(collection_name.find())
    return products

@router.get("/getproduct/{id}")
async def get_product_parid(id:str):
    product=collection_name.find_one({"_id":ObjectId(id)})
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return individual_serial_product(product)

@router.put("/putproduct/{id}")
async def put_product(id:str,product:Product):
   collection_name.find_one_and_update({"_id":ObjectId(id)},{"$set":dict(product)})    

@router.delete("/deleteproduct/{id}")
async def delete_product(id:str):
    collection_name.find_one_and_delete({"_id":ObjectId(id)}) 
###################################################################

load_dotenv()

# Define the Pydantic model for email schema
class EmailSchema(BaseModel):
    email: List[EmailStr]
class EmailContent(BaseModel):
    message:str
    subject:str
# Configure the email connection settings
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("EMAIL"),
    MAIL_PASSWORD=os.getenv("Pass"),
    MAIL_FROM=os.getenv("EMAIL"),
    MAIL_PORT=465,  # or 587 for TLS
    MAIL_SERVER="smtp.esprit.tn",
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

@router.post('/email/{product_id}')
async def send_email(product_id: str, content: EmailContent):
    product =collection_name.find_one({"_id":ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    supplier = collection_namesup.find_one({"_id":ObjectId(product['supplied_by'])}) 
    supplier_email = [supplier['email']]

    html = f"""
    <h5>John Doe Business LTD</h5> 
    <br>
    <p>{content.message}</p>
    <br>
    <h6>Best regards</h6>
    <br>
    <h5>John Doe Business LTD</h5> 
    """
    
    message = MessageSchema(
        subject=content.subject,
        recipients=supplier_email,
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})
    ####################