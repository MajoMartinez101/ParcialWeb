// --- Configuración y estado ---
var baseUrl = "https://rickandmortyapi.com";
var personajeId = 8; // comenzamos en el 8

// Referencias al DOM
var btnCargar   = document.getElementById("btnCargar");
var btnSiguiente= document.getElementById("btnSiguiente");
var btnAnterior = document.getElementById("btnAnterior");
var btnAleatorio= document.getElementById("btnAleatorio");
var btnBuscar   = document.getElementById("btnBuscar");
var txtId       = document.getElementById("txtId");
var contenedor  = document.getElementById("resultado");

// Construye la URL según el id actual
function construirUrl(){
  return baseUrl + "/api/character/" + personajeId;
}

// Pide y muestra el personaje actual
function cargarDatos(){
  contenedor.innerHTML = "Cargando...";
  fetch(construirUrl())
    .then(function(respuesta){
      if(!respuesta.ok){ throw new Error("No encontrado"); }
      return respuesta.json();
    })
    .then(function(json){
      var html = "";
      html += "<h3>#"+ personajeId +" — " + json.name + "</h3>";
      html += "<p>Estado: " + json.status + "</p>";
      html += "<p>Especie: " + json.species + "</p>";
      html += "<img src='" + json.image + "' width='220'>";
      contenedor.innerHTML = html;
    })
    .catch(function(error){
      contenedor.innerHTML = "Error: " + error.message + ". Prueba otro ID.";
    });
}

// Navegación básica
function siguiente(){
  personajeId = personajeId + 1;
  cargarDatos();
}
function anterior(){
  if(personajeId > 1){
    personajeId = personajeId - 1;
    cargarDatos();
  }
}
function aleatorio(){
  // rango típico 1..826 (si alguno falla, muestra error y puedes probar otro)
  var minimo = 1;
  var maximo = 826;
  personajeId = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
  cargarDatos();
}
function buscarPorId(){
  var v = parseInt(txtId.value, 10);
  if(!isNaN(v) && v > 0){
    personajeId = v;
    cargarDatos();
  } else {
    contenedor.innerHTML = "Ingresa un ID válido (número entero).";
  }
}

// Eventos
btnCargar.addEventListener("click", cargarDatos);
btnSiguiente.addEventListener("click", siguiente);
btnAnterior.addEventListener("click", anterior);
btnAleatorio.addEventListener("click", aleatorio);
btnBuscar.addEventListener("click", buscarPorId);

// Opcional: carga el primero al abrir
// cargarDatos();
