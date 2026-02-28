import { useState } from "react";

function CrearProducto({ onProductoCreado }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/backend/productos/create.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, precio }),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Producto creado con éxito!");
        setNombre("");
        setDescripcion("");
        setPrecio("");
        onProductoCreado(); // Para refrescar la lista en Productos.jsx
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Error de conexión al backend");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-producto">
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <button type="submit">Crear Producto</button>
    </form>
  );
}

export default CrearProducto;