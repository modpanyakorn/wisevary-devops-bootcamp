import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListProducts from './components/ListProducts';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Product from './components/Product';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';



function App() {
  return (

    <div>
          <Router>
                   
                   
                   <div className="container">
                        
                        <Header/>

                          <Switch>
                            
                            
                            <div className="container">
                              
                              <Route exact path="/" component={ListProducts} />
                              <Route exact path="/productsList" component={ListProducts} />
                              <Route exact path="/addproduct" component={AddProduct} />
                              <Route exact path="/viewProduct/:id" component={Product} />
                              <Route exact path="/updateProduct/:id" component={UpdateProduct} />
                              <Route exact path="/deleteProduct/:id" component={DeleteProduct} />
                           
                            </div>

                            </Switch>
                        
                        
                        <Footer/>
                   </div>
        
        
         </Router>
    </div>
  );
}

export default App;
