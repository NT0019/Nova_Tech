const programas = [
  {
    slug: "desarrollo-software",
    nombre: "Desarrollo de Software",
    duracion: "6 semestres",
    modalidad: "Presencial / mixta",
    descripcion: "Programación web, bases de datos y buenas prácticas de desarrollo.",
    icono: '<path d="m9 8-4 4 4 4"></path><path d="m15 8 4 4-4 4"></path>',
  },
  {
    slug: "redes-telecomunicaciones",
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
    slug: "administracion-empresas",
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
    slug: "mecatronica-industrial",
    nombre: "Mecatrónica Industrial",
    duracion: "6 semestres",
    modalidad: "Presencial",
    descripcion: "Automatización, control de procesos y mantenimiento industrial.",
    icono:
      '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path>' +
      '<path d="M19.4 13.5a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19.4a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4.6a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V4.6a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V10a1.65 1.65 0 0 0 1.51 1H19.4a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1 1.51Z"></path>',
  },
];

let menuAbierto = false;

const crearTarjetaPrograma = (programa) => {
  const enlace = document.createElement("a");
  enlace.className = "programa-card-link";
  enlace.href = `programas/${programa.slug}.html`;

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
    <span class="programa-ver">
      Ver programa
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>
      </svg>
    </span>
  `;
  enlace.appendChild(card);
  return enlace;
};

function renderizarProgramas() {
  const contenedor = document.getElementById("programasGrid");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  for (let i = 0; i < programas.length; i++) {
    const tarjeta = crearTarjetaPrograma(programas[i]);
    contenedor.appendChild(tarjeta);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProgramas();

  const anio = document.getElementById("anioActual");
  if (anio) anio.textContent = new Date().getFullYear();
});

const menuToggle = document.getElementById("menuToggle");
const menuPrincipal = document.getElementById("menuPrincipal");

function cerrarMenu() {
  menuAbierto = false;
  menuPrincipal.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && menuPrincipal) {
  menuToggle.addEventListener("click", () => {
    menuAbierto = !menuAbierto;
    menuPrincipal.classList.toggle("show", menuAbierto);
    menuToggle.setAttribute("aria-expanded", String(menuAbierto));
  });

  menuPrincipal.querySelectorAll(".nav-link").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      if (menuAbierto) cerrarMenu();
    });
  });
}

const navIndicator = document.getElementById("navIndicator");
const menuLista = document.getElementById("menuLista");
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

const mensaje = document.getElementById("mensaje");
const mensajeContador = document.getElementById("mensajeContador");

if (mensaje && mensajeContador) {
  mensaje.addEventListener("input", () => {
    const longitud = mensaje.value.length;
    mensajeContador.textContent = `${longitud} / 200`;
  });
}

const reglas = {
  correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  telefono: /^[0-9]{9}$/,
};

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
    evento.preventDefault();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const programa = document.getElementById("programa");
    const terminos = document.getElementById("terminos");

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

    if (!formularioValido) {
      resultadoEnvio.textContent =
        "Revisa los campos marcados en rojo antes de enviar el formulario.";
      resultadoEnvio.className = "resultado-envio error";
      return;
    }

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

function enviarRegistro(datos) {
  const metodo = "POST";

  console.log(`Simulando solicitud ${metodo} → /api/registro`);
  console.log("Cuerpo de la solicitud (JSON):", JSON.stringify(datos, null, 2));

  const queryGET = new URLSearchParams(datos).toString();
  console.log(`Equivalente por GET sería: /api/registro?${queryGET}`);

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
