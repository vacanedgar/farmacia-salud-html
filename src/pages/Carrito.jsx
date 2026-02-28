import React from "react";

function Carrito({ carrito, setCarrito }) {

  const total = carrito.reduce((acc, item) => acc + Number(item.precio), 0);

  const eliminar = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  return (
    <div className="productos-container">
      <h2>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <div className="grid">
            {carrito.map((item, index) => (
              <div key={index} className="card">
                <h3>{item.nombre}</h3>
                <p>${item.precio}</p>
                <button
                  className="btn"
                  onClick={() => eliminar(index)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: "20px" }}>
            Total: ${total.toFixed(2)}
          </h3>
        </>
      )}
    </div>
  );
}

export default Carrito;