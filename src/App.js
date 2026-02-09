import "./estilos.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Clientes from "./pages/Clientes";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <BrowserRouter>
     <header className="header">
  <img src="/img/logo.jpeg" alt="Logo Farmacia Salud" className="logo" />
  <h1>Farmacia Salud</h1>
  <nav>
    <Link to="/">Inicio</Link>
    <Link to="/productos">Productos</Link>
    <Link to="/clientes">Clientes</Link>
    <Link to="/contacto">Contacto</Link>
  </nav>
</header>



      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>

      <footer>
        <p>Contacto: farmacia.salud@example.com</p>
        <p>Derechos reservados © 2026 José Arboleda</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
