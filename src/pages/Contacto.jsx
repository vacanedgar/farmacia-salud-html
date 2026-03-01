function Contacto() {
  return (
    <div className="main-content">
      <div className="card">
        <h3>Formulario de contacto</h3>
        <form>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo" />
          <textarea placeholder="Mensaje"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;

