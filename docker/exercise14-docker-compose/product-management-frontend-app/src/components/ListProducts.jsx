import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductService from '../services/ProductService';


 class ListProducts extends Component {

  constructor(props) {
  super(props);
    this.state = {
       products :[]
    }

    this.addProduct = this.addProduct.bind(this);

  }
  
  componentDidMount(){
    
     ProductService.getProducts().then(response => {
   // console.log(response.data);
     this.setState({products: response.data});
   
     
     
    })
     
  }
  addProduct(){

    this.props.history.push('/addproduct');
    
  }
  view(id){
    this.props.history.push(`/viewProduct/${id}`);
  }
  delete(id){
    this.props.history.push(`/deleteProduct/${id}`);
  }
  update(id){
    this.props.history.push(`/updateProduct/${id}`);
  }
  
  render() {
    return (
     <div>
   <h1 className='text-center'>List Of Products Page </h1>
<button className='btn btn-primary' onClick={this.addProduct}>Add Product</button>
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Product Id </th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Price</th>
      <th scope="col">Product Quantity</th>
    </tr>
  </thead>
  <tbody>
    {
       this.state.products.map(product => 
             <tr key ={product.id}>
             <td>{product.id}</td>
             <td>{product.name}</td>
             <td>{product.price}</td>
             <td>{product.quantity}</td>

            <td>
            <button className="btn btn-info" onClick ={()=>this.view(product.id)}>View</button>
            <button className="btn btn-danger" onClick ={()=>this.delete(product.id)}>Delete</button>
            <button className="btn btn-success" onClick ={()=>this.update(product.id)}>Update</button>
            </td>
             </tr>
       
       )
    }
   
   
   
  </tbody>
</table>
   
     </div>
    )
  }
}

export default ListProducts

