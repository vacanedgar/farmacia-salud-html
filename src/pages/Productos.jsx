import React, { useEffect, useState } from "react";
import "./productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Simulamos consumo de API pública
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
      .then(res => res.json())
      .then(() => {
        const productosFarmacia = [
          {
            id: 1,
            title: "Paracetamol 500mg",
            price: 8.50,
            image: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
          },
          {
            id: 2,
            title: "Ibuprofeno 400mg",
            price: 10.00,
            image: "https://cdn-icons-png.flaticon.com/512/2966/2966334.png"
          },
          {
            id: 3,
            title: "Jarabe para la Tos",
            price: 12.75,
            image: "https://cdn-icons-png.flaticon.com/512/2966/2966325.png"
          },
          {
            id: 4,
            title: "Vitamina C",
            price: 15.00,
            image: "https://cdn-icons-png.flaticon.com/512/2966/2966331.png"
          },
          {
            id: 5,
            title: "Alcohol Antiséptico",
            price: 6.50,
            image: "https://cdn-icons-png.flaticon.com/512/2966/2966338.png"
          },
          {
            id: 6,
            title: "Termómetro Digital",
            price: 25.00,
            image: "https://cdn-icons-png.flaticon.com/512/2966/2966336.png"
          }
        ];

        setProductos(productosFarmacia);
      });
  }, []);

  return (
    <div className="productos-container">
      <h2>Productos disponibles</h2>

      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto.id} className="card">
            <img src={producto.image} alt={producto.title} />
            <h4>{producto.title}</h4>
            <p>${producto.price}</p>
            <button className="btn-comprar">Comprar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
