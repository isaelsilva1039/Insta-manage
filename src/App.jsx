import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext'; 
import Transactions from './pages/Transactions';
import Support from './pages/Support';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import Empresa from './pages/Empresa';
import Filial from './pages/Filial';
import Login from './pages/login';
import Tokens from './pages/Tokens';
import Usuarios from './pages/Usuarios';
import LinksPagamentos from './pages/LinksPagamentos';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" />;
};

function App() {
  const [closeMenu, setCloseMenu] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="app-container">
                    <NavBar closeMenu={closeMenu} setCloseMenu={setCloseMenu} />
                  <Sidebar closeMenu={closeMenu} setCloseMenu={setCloseMenu} />
                  <div className={`main-content ${closeMenu ? "sidebar-closed" : "sidebar-open"}`}>
          
                    <Routes>
                      <Route path="/pagamentos/links" element={<LinksPagamentos />} />
                      <Route path="/empresa" element={<Empresa />} />
                      <Route path="/filial" element={<Filial />} />
                      <Route path="/tokens" element={<Tokens />} />
                      <Route path="/faturas" element={<Transactions />} />
                      <Route path="/usuarios" element={<Usuarios />} />
                    </Routes>
                  </div>
                </div>
               </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
