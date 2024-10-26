import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; 
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import StoreRegister from './pages/storeRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <Routes>
        <Route path="/storeReg" element={<StoreRegister />} />
      </Routes>

      
          <Routes>
            <Route path="/" 
              element={
                <>
                  <Sidebar />
                    <div className="flex flex-col flex-grow">
                      <Header />
                      <main className="flex-grow p-4">    
                      </main>
                    </div>
                </>
              } 
            />
            <Route path="/dashboard" 
              element={
                <>
                  <Sidebar />
                  <div className="flex flex-col flex-grow">
                    <Header />
                    <main className="flex-grow p-5">
                      <Dashboard />
                    </main>
                  </div>
                </>
                }
            />
          </Routes>
      
    </Router>
  );
}

export default App;
