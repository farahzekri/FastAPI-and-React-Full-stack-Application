import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { ProductContext } from '../product_contesx';
import { useEffect ,useContext} from 'react';
const ProductTable = () => {
    const [product,setproduct]=useContext(ProductContext)
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/getproduct")
            .then(resp => resp.json())
            .then(result => {
                console.log(result);
                // Assuming result.data is an array
                if (Array.isArray(result)) {
                    setproduct(result);
                } else {
                    console.error('Expected result.data to be an array');
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [setproduct]);
    return (
        <>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Qunatity In Stock </th>
                        <th>Qunatity sold</th>
                        <th>Unit Price</th>
                        <th>Revenue</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(product) ? product.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.quantity_in_stock}</td>
                        <td>{product.quantity_sold}</td>
                        <td>{product.unit_price}</td>
                        <td>{product.revenue}</td>
                        <td>
                        <Button variant="outline-info">update</Button>
                        <Button variant="outline-success">Supplier</Button>
                        <Button variant="outline-danger">Delete</Button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="7">No products available</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
}

export default ProductTable;