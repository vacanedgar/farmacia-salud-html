import React, { useEffect, useState } from "react";

function Productos({ carrito, setCarrito }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  // Cargar productos desde el backend
  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando productos:", err);
        setLoading(false);
      });
  }, []);

  // Filtrar productos según la búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(p => p.id === producto.id);

      if (existe) {
        // Si ya existe, aumentar la cantidad
        return prevCarrito.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: (p.cantidad || 1) + 1 }
            : p
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  return (
    <div className="productos-container">
      <h2 className="titulo">Productos de Farmacia</h2>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            productosFiltrados.map((producto) => (
              <div key={producto.id} className="card">
                <img
                  src={`http://localhost:3001/imagenes/${producto.imagen}`}
                  alt={producto.nombre}
                  width="120"
                />
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p>${producto.precio}</p>
                <button onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Productos;