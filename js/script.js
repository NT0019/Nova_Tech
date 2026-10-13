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
    icono: '<path d="m9 8-4 4 4 4"></path><path d="m15 8 4 4-4 4"></path>',
  },
  {
    nombre: "Redes y Telecomunicaciones",
    duracion: "5 semestres",
    modalidad: "Presencial",
    descripcion: "Diseño, instalación y administración de redes empresariales.",
    icono:
      '<circle cx="5" cy="6" r="2.2"></circle><circle cx="19" cy="6" r="2.2"></circle>' +
      '<circle cx="12" cy="18" r="2.2"></circle><path d="M6.9 7.3 10.4 16.4"></path>' +
      '<path d="M17.1 7.3 13.6 16.4"></path><path d="M7.2 6h9.6"></path>',
  },
  {
    nombre: "Administración de Empresas",
    duracion: "5 semestres",
    modalidad: "Presencial / mixta",
    descripcion: "Gestión, finanzas y liderazgo de equipos para pequeñas y medianas empresas.",
    icono:
      '<path d="M4 19V5"></path><path d="M4 19h16"></path>' +
      '<rect x="7" y="12" width="2.6" height="7"></rect>' +
      '<rect x="12" y="9" width="2.6" height="10"></rect>' +
      '<rect x="17" y="6" width="2.6" height="13"></rect>',
  },
  {
    nombre: "Mecatrónica Industrial",
    duracion: "6 semestres",
    modalidad: "Presencial",
    descripcion: "Automatización, control de procesos y mantenimiento industrial.",
    icono:
      '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path>' +
      '<path d="M19.4 13.5a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19.4a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4.6a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V4.6a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V10a1.65 1.65 0 0 0 1.51 1H19.4a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1 1.51Z"></path>',
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
    <span class="programa-logo" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        ${programa.icono}
      </svg>
    </span>
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

// ---------- 4b) INDICADOR DESLIZANTE DEL MENÚ (evento mouseenter/mouseleave) ----------
const navIndicator = document.getElementById("navIndicator");
const menuLista = document.getElementById("menuLista");
// Solo los enlaces normales del menú (se excluye el botón "Regístrate", que ya resalta solo)
const enlacesMenu = menuLista
  ? menuLista.querySelectorAll(".nav-link:not(.btn-nav-cta)")
  : [];

function moverIndicador(enlace) {
  const rectEnlace = enlace.getBoundingClientRect();
  const rectLista = menuLista.getBoundingClientRect();
  navIndicator.style.width = `${rectEnlace.width}px`;
  navIndicator.style.left = `${rectEnlace.left - rectLista.left}px`;
  navIndicator.style.opacity = "1";
}

// Solo se activa en escritorio (breakpoint lg de Bootstrap), donde el menú es horizontal
const esEscritorio = () => window.matchMedia("(min-width: 992px)").matches;

if (navIndicator && menuLista && enlacesMenu.length > 0) {
  enlacesMenu.forEach((enlace) => {
    enlace.addEventListener("mouseenter", () => {
      if (esEscritorio()) moverIndicador(enlace);
    });
  });

  menuLista.addEventListener("mouseleave", () => {
    navIndicator.style.opacity = "0";
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
