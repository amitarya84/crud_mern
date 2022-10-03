import './App.css';
import { useState } from 'react';
import AddProduct from './components/AddProduct';
import Nav from './components/Nav';
import Products from './components/ProductsList';

function App() {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  return (
    <div className="App">
      <Nav setOpenAddProduct={setOpenAddProduct} />
      <AddProduct openAddProduct={openAddProduct} setOpenAddProduct={setOpenAddProduct} />
      <h1 style={{textAlign: 'center', fontWeight: 'bolder !important'}}>Products</h1>
      <Products openAddProduct={openAddProduct} />
    </div>
  );
}

export default App;
