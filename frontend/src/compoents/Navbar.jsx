import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ProductContext} from '../product_contesx'
import { useContext } from 'react';
import { Badge } from 'react-bootstrap';

const Navbars = () => {
    const [products,setproduct]=useContext(ProductContext);
    return ( 
    
      <Navbar expand="lg" className="bg-body-tertiary fixed-top" >
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
           <Badge className='mt-2' variant="primary">Products In Stock {products?.length ?? 0}</Badge>
           
          </Nav>
          <Button variant="primary">Add Product</Button>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    );
}
 
export default Navbars;