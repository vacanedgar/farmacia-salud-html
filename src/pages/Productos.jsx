const productos = [
  {
    nombre: "Paracetamol",
    imagen: "/img/paracetamol.png",
    descripcion: "Alivia el dolor y la fiebre."
  },
  {
    nombre: "Ibuprofeno",
    imagen: "/img/ibuprofeno.jpeg",
    descripcion: "Reduce inflamación y dolor."
  },
  {
    nombre: "Jarabe para la tos",
    imagen: "/img/jarabe.jpeg",
    descripcion: "Alivia la tos y la congestión."
  }
];

function Productos() {
  return (
    <div className="main-content">
      {productos.map((producto, index) => (
        <div className="card" key={index}>
          <img src={producto.imagen} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

export default Productos;


