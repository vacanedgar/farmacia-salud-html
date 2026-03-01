import React, { useEffect, useState } from "react";
import "./admin.css";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);

  // Cargar productos desde backend
  const cargarProductos = () => {
    setLoading(true);
    fetch("http://localhost:3001/productos")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Manejo de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Agregar o editar producto
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = modoEdicion
      ? `http://localhost:3001/productos/${form.id}`
      : "http://localhost:3001/productos";

    const metodo = modoEdicion ? "PUT" : "POST";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        setForm({ id: null, nombre: "", descripcion: "", precio: "", imagen: "" });
        setModoEdicion(false);
        cargarProductos();
      })
      .catch(err => console.error(err));
  };

  // Editar producto
  const editarProducto = (p) => {
    setForm(p);
    setModoEdicion(true);
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      fetch(`http://localhost:3001/productos/${id}`, { method: "DELETE" })
        .then(() => cargarProductos())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="admin-container">
      <h2>Panel Administrador</h2>

      {/* Formulario */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagen"
          placeholder="Nombre de imagen"
          value={form.imagen}
          onChange={handleChange}
          required
        />
        <button type="submit">{modoEdicion ? "Guardar cambios" : "Agregar producto"}</button>
      </form>

      {/* Lista de productos */}
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="productos-grid">
          {productos.map((producto) => (
            <div key={producto.id} className="card-admin">
              <img
                src={`http://localhost:3001/imagenes/${producto.imagen}`}
                alt={producto.nombre}
              />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>${producto.precio}</p>
              <div className="botones-admin">
                <button onClick={() => editarProducto(producto)}>Editar</button>
                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProductos;