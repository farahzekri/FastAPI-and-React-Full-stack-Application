const AddProduct = () => {
    const [product, setproductData] = useState({
        name: '',
        quantity_in_stock: 0,
        quantity_sold: 0,
        unit_price: 0.0,
        revenue:0.0,
        supplied_by:''
    
      });
      const handleChange = () => {
        const { name, value } = e.target;
        setproductData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    return ( 
        <>
        <form onSubmit={handleConfirm}>
            <div className='mb-5'>
                <h3>Add A Supplier</h3>
            </div>
            
            <div className="col mb-3">
             <label htmlFor="">name</label>
                <input
                 type="text" 
                 className="form-control" 
                 placeholder=" Name"
                 name='name'
                 value={product.name}
                 onChange={handleChange} />
            </div>

            <div className="col mb-3">
              <label htmlFor=""> quantity_in_stock</label>
                <input 
                type="number" 
                className="form-control" 
                placeholder=" quantity_in_stock"
                name='quantity_in_stock'
                value={product.quantity_in_stock}
                onChange={handleChange} />
            </div>

            <div className="col mb-3">
            <label htmlFor=""> quantity_sold</label>
                <input type="number" 
                className="form-control" 
                placeholder="quantity_sold"
                name='quantity_sold'
                value={product.quantity_sold}
                onChange={handleChange} />
            </div>

            <div className="col mb-3">
            <label htmlFor=""> unit_price</label>
                <input
                 type="text"
                 className="form-control"
                  placeholder="unit_price" 
                  name='unit_price'
                  value={product.unit_price}
                  onChange={handleChange} />
            </div>

            <div className="col mb-3">
            <label htmlFor="">  revenue</label>
                <input
                 type="text"
                  className="form-control" 
                  placeholder=" revenue" 
                  name='revenue'
                  value={product.revenue}
                  onChange={handleChange} />
            </div>
            <div className="col mb-3">
            <label htmlFor="">  supplied_by</label>
                <input
                 type="text"
                  className="form-control" 
                  placeholder=" revenue" 
                  name='supplied_by'
                  value={product.supplied_by}
                  onChange={handleChange} />
            </div>

            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Add a supplier</button>
        </form>
    </>
    );
}
 
export default AddProduct;