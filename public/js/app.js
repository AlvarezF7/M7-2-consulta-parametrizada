
const baseUrl = "http://localhost:3000/clientes";

// Función para mostrar errores
function mostrarError(idError, mensaje) {
  const errorElemento = document.getElementById(idError);
  errorElemento.textContent = mensaje;
  setTimeout(() => {
    errorElemento.textContent = "";
  }, 3000); // desaparece después de 3 segundos
}

// Crear Cliente
document.getElementById("btnCrear").addEventListener("click", async () => {
  const rut = document.getElementById("crearRut").value.trim();
  const nombre = document.getElementById("crearNombre").value.trim();
  const edad = document.getElementById("crearEdad").value.trim();

  if (!rut || !nombre || !edad) {
    mostrarError("errorCrear", "Todos los campos son obligatorios");
    return;
  }
  if (isNaN(edad)) {
    mostrarError("errorCrear", "Edad debe ser un número");
    return;
  }
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rut, nombre, edad: parseInt(edad) }),
    });

    const data = await res.json();
    if (!res.ok) {
      mostrarError("errorCrear", data.error || "Error al crear cliente");
    } else {
      alert("Cliente creado correctamente");
      document.getElementById("crearRut").value = "";
      document.getElementById("crearNombre").value = "";
      document.getElementById("crearEdad").value = "";
    }
  } catch (err) {
    mostrarError("errorCrear", "Error de conexión con el servidor");
  }
});

// Modificar Cliente
document.getElementById("btnModificar").addEventListener("click", async () => {
  const rut = document.getElementById("modRut").value.trim();
  const nombre = document.getElementById("modNombre").value.trim();

  if (!rut || !nombre) {
    mostrarError("errorModificar", "Rut y nuevo nombre son obligatorios");
    return;
  }
  try {
    const res = await fetch(`${baseUrl}/${rut}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    });
    const data = await res.json();
    if (!res.ok) {
      mostrarError("errorModificar", data.error || "Error al modificar cliente");
    } else {
      alert("Cliente modificado correctamente");
      document.getElementById("modRut").value = "";
      document.getElementById("modNombre").value = "";
    }
  } catch (err) {
    mostrarError("errorModificar", "Error de conexión con el servidor");
  }
});

// Eliminar Cliente
document.getElementById("btnEliminar").addEventListener("click", async () => {
  const rut = document.getElementById("delRut").value.trim();

  if (!rut) {
    mostrarError("errorEliminar", "Rut es obligatorio");
    return;
  }
  if (!confirm(`¿Seguro que quieres eliminar al cliente ${rut}?`)) return;
  try {
    const res = await fetch(`${baseUrl}/${rut}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      mostrarError("errorEliminar", data.error || "Error al eliminar cliente");
    } else {
      alert("Cliente eliminado correctamente");
      document.getElementById("delRut").value = "";
    }
  } catch (err) {
    mostrarError("errorEliminar", "Error de conexión con el servidor");
  }
});

// Listar y cerrar clientes
const btnListar = document.getElementById("btnListar");
const btnCerrarLista = document.getElementById("btnCerrarLista");
const lista = document.getElementById("listaClientes");

// Mostrar lista
btnListar.addEventListener("click", async () => {
  btnCerrarLista.style.display = "inline-block"; 
  btnListar.disabled = true; 
  await listarClientes(); 
});

// Cerrar lista
btnCerrarLista.addEventListener("click", () => {
  lista.innerHTML = "";
  btnCerrarLista.style.display = "none"; 
  btnListar.disabled = false; 
});

// Función para listar clientes
async function listarClientes() {
  try {
    lista.innerHTML = "<li>Cargando...</li>"; 
    const res = await fetch(baseUrl);
    const data = await res.json();

    lista.innerHTML = ""; 

    if (data.length === 0) {
      lista.innerHTML = "<li>No hay clientes registrados</li>";
      return;
    }

    data.forEach((cliente) => {
      const li = document.createElement("li");
      li.textContent = `${cliente.rut} - ${cliente.nombre} - ${cliente.edad}`;
      lista.appendChild(li);
    });
  } catch (err) {
    mostrarError("errorCrear", "Error al obtener la lista de clientes");
  }
}