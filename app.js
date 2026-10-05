// Clave usada para guardar los datos en localStorage
var CLAVE = "diarioEstudio";

// Trae las sesiones guardadas (o una lista vacía si no hay ninguna)
function cargarSesiones() {
  var texto = localStorage.getItem(CLAVE);
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

// Guarda las sesiones en localStorage
function guardarSesiones(sesiones) {
  localStorage.setItem(CLAVE, JSON.stringify(sesiones));
}

// Convierte un objeto Date a texto "YYYY-MM-DD" usando la fecha local
function aFechaLocal(fecha) {
  var anio = fecha.getFullYear();
  var mes = String(fecha.getMonth() + 1).padStart(2, "0");
  var dia = String(fecha.getDate()).padStart(2, "0");
  return anio + "-" + mes + "-" + dia;
}

// Calcula la racha: días seguidos con sesión que terminan hoy
// (o que empezaron ayer si hoy todavía no se estudia)
function calcularRacha(sesiones) {
  // Creamos un conjunto con las fechas que tienen al menos una sesión
  var diasConSesion = {};
  for (var i = 0; i < sesiones.length; i++) {
    diasConSesion[sesiones[i].fecha] = true;
  }

  // Empezamos a contar desde hoy; si hoy no hay sesión, desde ayer
  var cursor = new Date();
  var hoy = aFechaLocal(cursor);
  if (!diasConSesion[hoy]) {
    cursor.setDate(cursor.getDate() - 1);
  }

  // Contamos hacia atrás mientras cada día tenga sesión
  var racha = 0;
  while (diasConSesion[aFechaLocal(cursor)]) {
    racha++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return racha;
}

// Convierte "YYYY-MM-DD" a un texto bonito en español, ej. "5 oct 2026"
function formatearFecha(fechaTexto) {
  var partes = fechaTexto.split("-");
  var fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}

// Pintar la racha en pantalla
function mostrarRacha(sesiones) {
  var elemento = document.getElementById("rachaNumero");
  elemento.textContent = calcularRacha(sesiones);
}

// Pintar la lista de sesiones, de la más reciente a la más antigua
function mostrarSesiones(sesiones) {
  var lista = document.getElementById("listaSesiones");
  var mensajeVacio = document.getElementById("mensajeVacio");

  // Ordenamos por fecha descendente (y por tema para desempatar de forma estable)
  var ordenadas = sesiones.slice().sort(function (a, b) {
    if (a.fecha < b.fecha) return 1;
    if (a.fecha > b.fecha) return -1;
    return 0;
  });

  lista.innerHTML = "";
  mensajeVacio.style.display = ordenadas.length === 0 ? "block" : "none";

  for (var i = 0; i < ordenadas.length; i++) {
    var li = document.createElement("li");

    var tema = document.createElement("span");
    tema.className = "sesion-tema";
    tema.textContent = ordenadas[i].tema;

    var detalle = document.createElement("span");
    detalle.className = "sesion-detalle";
    detalle.textContent = formatearFecha(ordenadas[i].fecha) + " · " + ordenadas[i].minutos + " min";

    li.appendChild(tema);
    li.appendChild(detalle);
    lista.appendChild(li);
  }
}

// Puesta a punto inicial
function iniciar() {
  var sesiones = cargarSesiones();

  // Fecha por defecto: hoy
  document.getElementById("fecha").value = aFechaLocal(new Date());

  mostrarRacha(sesiones);
  mostrarSesiones(sesiones);

  var formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var fecha = document.getElementById("fecha").value;
    var tema = document.getElementById("tema").value.trim();
    var minutos = Number(document.getElementById("minutos").value);

    // Validación sencilla
    if (tema === "" || !fecha || minutos <= 0) {
      alert("Revisa los datos: el tema es obligatorio y los minutos deben ser mayores que 0.");
      return;
    }

    sesiones.push({ fecha: fecha, tema: tema, minutos: minutos });
    guardarSesiones(sesiones);

    mostrarRacha(sesiones);
    mostrarSesiones(sesiones);

    // Limpiamos el formulario y dejamos la fecha de hoy
    formulario.reset();
    document.getElementById("fecha").value = aFechaLocal(new Date());
  });
}

iniciar();
