/* =========================================================
   NovaTech — script.js
   Interactividad general, generación dinámica de tarjetas,
   validación de formulario y simulación de envío GET/POST.
   Integrado como script EXTERNO (ver <script src="js/script.js">).
   ========================================================= */

// ---------- 1) VARIABLES Y TIPOS DE DATO ----------
// Array de objetos: cada objeto agrupa datos de un programa (estructura de datos)
const programas = [
  {
    nombre: "Desarrollo de Software",
    duracion: "6 semestres",
    modalidad: "Presencial / mixta",
    descripcion: "Programación web, bases de datos y buenas prácticas de desarrollo.",
  },
  {
    nombre: "Redes y Telecomunicaciones",
    duracion: "5 semestres",
    modalidad: "Presencial",
    descripcion: "Diseño, instalación y administración de redes empresariales.",
  },
  {
    nombre: "Administración de Empresas",
    duracion: "5 semestres",
    modalidad: "Presencial / mixta",
    descripcion: "Gestión, finanzas y liderazgo de equipos para pequeñas y medianas empresas.",
  },
  {
    nombre: "Mecatrónica Industrial",
    duracion: "6 semestres",
    modalidad: "Presencial",
    descripcion: "Automatización, control de procesos y mantenimiento industrial.",
  },
];

// Booleano: controla si el menú móvil está abierto
let menuAbierto = false;

// ---------- 2) FUNCIONES + MANIPULACIÓN DEL DOM ----------

// Función con arrow function: crea el HTML de una tarjeta de programa
const crearTarjetaPrograma = (programa) => {
  const card = document.createElement("article");
  card.className = "programa-card";
  card.innerHTML = `
    <span class="programa-badge">${programa.modalidad}</span>
    <h3>${programa.nombre}</h3>
    <p>${programa.descripcion}</p>
    <p class="programa-duracion">${programa.duracion}</p>
  `;
  return card;
};

// Función declarada: recorre el array con un FOR (estructura de control)
// e inserta cada tarjeta en el DOM
function renderizarProgramas() {
  const contenedor = document.getElementById("programasGrid");
  if (!contenedor) return; // operador lógico de guarda

  contenedor.innerHTML = ""; // limpia las tarjetas estáticas del HTML
                              // antes de reconstruirlas dinámicamente
  for (let i = 0; i < programas.length; i++) {
    const tarjeta = crearTarjetaPrograma(programas[i]);
    contenedor.appendChild(tarjeta);
  }
}

// ---------- 3) EVENTOS: carga inicial de la página ----------
document.addEventListener("DOMContentLoaded", () => {
  renderizarProgramas();

  const anio = document.getElementById("anioActual");
  if (anio) anio.textContent = new Date().getFullYear();
});

// ---------- 4) MENÚ MÓVIL (evento click + manipulación de clases) ----------
const menuToggle = document.getElementById("menuToggle");
const menuPrincipal = document.getElementById("menuPrincipal");

if (menuToggle && menuPrincipal) {
  menuToggle.addEventListener("click", () => {
    menuAbierto = !menuAbierto; // operador de asignación con negación lógica
    menuPrincipal.classList.toggle("show", menuAbierto);
    menuToggle.setAttribute("aria-expanded", String(menuAbierto));
  });
}

// ---------- 5) CONTADOR DE CARACTERES (evento input) ----------
const mensaje = document.getElementById("mensaje");
const mensajeContador = document.getElementById("mensajeContador");

if (mensaje && mensajeContador) {
  mensaje.addEventListener("input", () => {
    const longitud = mensaje.value.length;
    mensajeContador.textContent = `${longitud} / 200`;
  });
}

// ---------- 6) VALIDACIÓN DEL FORMULARIO ----------

// Objeto que centraliza expresiones y reglas de validación
const reglas = {
  correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  telefono: /^[0-9]{9}$/,
};

// Función pura: valida un campo de texto según su tipo (switch = estructura de control)
function validarCampo(tipo, valor) {
  switch (tipo) {
    case "nombre":
      return valor.trim().length >= 3;
    case "correo":
      return reglas.correo.test(valor.trim());
    case "telefono":
      return reglas.telefono.test(valor.trim());
    case "programa":
      return valor !== "";
    case "terminos":
      return valor === true;
    default:
      return true;
  }
}

// Muestra u oculta el mensaje de error de un campo (manipulación del DOM)
function marcarCampo(input, esValido) {
  if (esValido) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

const formRegistro = document.getElementById("formRegistro");
const resultadoEnvio = document.getElementById("resultadoEnvio");

if (formRegistro) {
  formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita el envío real: aquí se SIMULA

    // Referencias a los campos
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const programa = document.getElementById("programa");
    const terminos = document.getElementById("terminos");

    // Validación de cada campo, acumulando el resultado con AND lógico
    const nombreValido = validarCampo("nombre", nombre.value);
    const correoValido = validarCampo("correo", correo.value);
    const telefonoValido = validarCampo("telefono", telefono.value);
    const programaValido = validarCampo("programa", programa.value);
    const terminosValido = validarCampo("terminos", terminos.checked);

    marcarCampo(nombre, nombreValido);
    marcarCampo(correo, correoValido);
    marcarCampo(telefono, telefonoValido);
    marcarCampo(programa, programaValido);
    terminos.classList.toggle("is-invalid", !terminosValido);

    const formularioValido =
      nombreValido && correoValido && telefonoValido && programaValido && terminosValido;

    // Condicional if / else (estructura de control)
    if (!formularioValido) {
      resultadoEnvio.textContent =
        "Revisa los campos marcados en rojo antes de enviar el formulario.";
      resultadoEnvio.className = "resultado-envio error";
      return;
    }

    // Construye el objeto con los datos, listo para enviar
    const datosFormulario = {
      nombre: nombre.value.trim(),
      correo: correo.value.trim(),
      telefono: telefono.value.trim(),
      programa: programa.value,
      horario: document.getElementById("horario").value,
      mensaje: mensaje.value.trim(),
    };

    enviarRegistro(datosFormulario);
  });
}

// ---------- 7) SIMULACIÓN DE ENVÍO GET / POST ----------
// En un backend real, este formulario enviaría los datos con method="POST"
// a un endpoint del servidor. Aquí se simula esa llamada con fetch() para
// mostrar cómo cambiaría la solicitud según el método usado.
function enviarRegistro(datos) {
  const metodo = "POST"; // el caso práctico permite simular GET o POST; se eligió POST
                          // porque el formulario envía datos sensibles de contacto

  // Simulación de una petición POST: los datos viajan en el "body",
  // no quedan expuestos en la URL como ocurriría con GET.
  console.log(`Simulando solicitud ${metodo} → /api/registro`);
  console.log("Cuerpo de la solicitud (JSON):", JSON.stringify(datos, null, 2));

  // Si se quisiera simular GET, los mismos datos viajarían así en la URL:
  const queryGET = new URLSearchParams(datos).toString();
  console.log(`Equivalente por GET sería: /api/registro?${queryGET}`);

  // Simula la latencia de red con setTimeout antes de confirmar al usuario
  const btnEnviar = document.getElementById("btnEnviar");
  btnEnviar.disabled = true;
  btnEnviar.textContent = "Enviando...";

  setTimeout(() => {
    resultadoEnvio.textContent =
      `¡Listo, ${datos.nombre.split(" ")[0]}! Registramos tu interés en ${datos.programa}. ` +
      "Un asesor te escribirá a tu correo en menos de 24 horas.";
    resultadoEnvio.className = "resultado-envio exito";

    formRegistro.reset();
    mensajeContador.textContent = "0 / 200";
    document
      .querySelectorAll(".is-valid, .is-invalid")
      .forEach((el) => el.classList.remove("is-valid", "is-invalid"));

    btnEnviar.disabled = false;
    btnEnviar.textContent = "Enviar registro";
  }, 900);
}
