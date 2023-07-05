
import Navbar from './components/navbar/Navbar';
import './App.css';
import {Routes , Route } from'react-router-dom';
import Signin from './pages/signin/Signin';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import AboutUs from './pages/aboutUs/AboutUs';
import Shop from './pages/shop/Shop';
import AdminOnlyroute from './components/adminOnlyRoute/AdminOnlyroute';





function App() {
  return (
    <div className="App">
    <Navbar/>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/Sign-in" element={<Signin/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/admin/*" element={
<AdminOnlyroute>

<Admin/>

</AdminOnlyroute>
}/>
<Route path="/about-us" element={<AboutUs/>}/>
<Route path="/shop" element={<Shop/>}/>
</Routes>



    </div>
  );
}

export default App;
