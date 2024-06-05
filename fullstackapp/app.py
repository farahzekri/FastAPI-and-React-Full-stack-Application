from fastapi import FastAPI
from routes.route import router
from models.model import Product,Supplier
from fastapi.middleware.cors import CORSMiddleware

app= FastAPI()



app.include_router(router, prefix="/api")
@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI application"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]

)    
##############adding cors header
 
