import "./estilos.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";


import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Clientes from "./pages/Clientes";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";

function App() {

  // 🛒 Carrito persistente
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const cantidadTotal = carrito.reduce(
  (acc, item) => acc + item.cantidad,
  0
);

const total = carrito.reduce(
  (acc, item) => acc + item.precio * item.cantidad,
  0
);

const totalFormateado = total.toLocaleString("es-CO");

  return (
    <BrowserRouter>
      <header className="header">
  <img
    src={process.env.PUBLIC_URL + "/img/logo.jpeg"}
    alt="Logo Farmacia Salud"
    className="logo"
  />
  <h1>Farmacia Salud</h1>

  <nav className="navbar">
    <Link to="/">Inicio</Link>
    <Link to="/productos">Productos</Link>
    <Link to="/clientes">Clientes</Link>
    <Link to="/contacto">Contacto</Link>

    {/* Carrito con ícono y cantidad */}
    <Link to="/carrito" className="carrito-link">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
        alt="Carrito"
        width="24"
      />
      <span className="carrito-count">
        {cantidadTotal > 0 ? `(${cantidadTotal})` : ""}
      </span>
    </Link>
  </nav>
</header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route 
            path="/productos" 
            element={<Productos carrito={carrito} setCarrito={setCarrito} />} 
          />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route 
            path="/carrito" 
            element={<Carrito carrito={carrito} setCarrito={setCarrito} />} 
          />
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
