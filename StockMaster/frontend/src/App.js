import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; 
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import StoreRegister from './pages/storeRegister';
import AddProduct from './pages/addProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/storeReg" element={<StoreRegister />} />
        
        {/* Protected Routes */}
        <Route
          path="*"
          element={
            <div className="flex h-screen">
              <div className='w-1/4 '>
                <Sidebar/>
              </div>
              <div className="flex flex-col w-3/4 ">
                <Header />
                <div className="flex-1 p-4 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/addProduct" element={<AddProduct />} />
                    <Route path="/d" element={<div>Some other content here</div>} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
