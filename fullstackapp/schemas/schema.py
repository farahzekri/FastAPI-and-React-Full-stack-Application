from decimal import Decimal
def individual_serial_product(product) -> dict:
    return {
        "id": str(product["_id"]), 
        "name":product["name"],
        "quantity_in_stock":product["quantity_in_stock"],
        "quantity_sold":product["quantity_sold"],
        "unit_price":Decimal(product["unit_price"]),
        "revenue":Decimal(product["revenue"]),
        "supplied_by": str(product.get("supplied_by", ""))
    }

# Fonction pour convertir une liste de documents MongoDB en une liste de dictionnaires formatés pour Product
def list_serial_product(products) -> list:
    return [individual_serial_product(product) for product in products]

# Exemple d'utilisation pour Supplier
def individual_serial_supplier(supplier) -> dict:
    return {
        "id": str(supplier["_id"]),
        "name":supplier["name"],
        "company":supplier["company"],
        "email":supplier["email"],
        "phone":supplier["phone"]
    }

def list_serial_supplier(suppliers) -> list:
    return [individual_serial_supplier(supplier) for supplier in suppliers]