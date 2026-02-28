import React, { useEffect, useState } from "react";


function Productos({ carrito, setCarrito }) {
  const [productoEditando, setProductoEditando] = useState(null);

  const [productos, setProductos] = useState([]);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: ""
  });

  useEffect(() => {
    fetch("http://127.0.0.1:3001/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) =>
        console.error("Error al cargar productos:", error)
      );
  }, []);

  const eliminarProducto = async (id) => {
    try {
      await fetch(`http://127.0.0.1:3001/productos/${id}`, {
        method: "DELETE",
      });

      setProductos(productos.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const agregarProducto = async () => {
    try {
      const actualizarProducto = async () => {
  try {
    const res = await fetch(
      `http://127.0.0.1:3001/productos/${productoEditando.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoEditando),
      }
    );

    const data = await res.json();

    setProductos(
      productos.map((p) =>
        p.id === data.id ? data : p
      )
    );

    setProductoEditando(null);

  } catch (error) {
    console.error("Error al actualizar:", error);
  }
};
      const res = await fetch("http://127.0.0.1:3001/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      const data = await res.json();
      setProductos([...productos, data]);

      setNuevoProducto({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
      });
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <div className="productos-container">
      <h2 className="titulo">Productos de Farmacia</h2>

      <div>
        <input
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
          }
        />
        <input
          placeholder="Descripción"
          value={nuevoProducto.descripcion}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
          }
        />
        <input
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
          }
        />
        <input
          placeholder="URL Imagen"
          value={nuevoProducto.imagen}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })
          }
        />
        <button onClick={agregarProducto}>
          Agregar Producto
        </button>
      </div>

      {productos.length === 0 ? (
        <p>Cargando productos...</p>
      ) : (
        <div>
          {productos.map((producto) => (
            <div key={producto.id}>
              <img src={producto.imagen} alt={producto.nombre} width="100" />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>${producto.precio}</p>

              <button
                onClick={() =>
                  setCarrito((prev) => [...prev, producto])
                }
              >
                Agregar al carrito
              </button>

              <button
                onClick={() => eliminarProducto(producto.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Productos;