"use strict";
import { Libreria } from "./libreria";

// -------------------------------------------
// CREACIÓN DE ELEMENTOS DEL DOM
// -------------------------------------------
// Creo el botón de Consulta
Libreria.crearBoton("btnConsulta", "Mostrar", "#contenedorBotones");

// Creación de La Tabla de Datos
const paramsTabla = {
  id: "tablaDatos",
  padre: "#contenedorTabla",
  tituloTabla: "USUARIOS REGISTRADOS",
  campos: ["ID", "NOMBRE", "APELLIDO", "EDAD"],
  datos: [], // No hay datos iniciales
};
Libreria.crearTablaDatos(paramsTabla);

// -------------------------------------------
// REFERENCIAS A ELEMENTOS DEL DOM
// -------------------------------------------
const getEl = (id) => document.getElementById(id);
const btnConsulta = getEl("btnConsulta");
const tablaDatos = getEl("tablaDatos");

// -------------------------------------------
// PROGRAMA PRINCIPAL
// -------------------------------------------
// Verifico la existencia del Botón
if (btnConsulta) {
  btnConsulta.addEventListener("click", () => {
    if (btnConsulta.textContent === "Mostrar") {
      // Solicito los datos al server
      Libreria.obtenerDatosDeMySQL("./consultar.php", (data) => {
        // Muestro en consola los datos traidos del server
        console.log("Datos Recibidos: ", data);

        //Lleno la tabla  con los datos traidos de MySql
        Libreria.llenarTablaDatos(data);

        btnConsulta.textContent= 'Ocultar';
      });
    } else {
      // Oculto los datos de la tabla
      Libreria.llenarTablaDatos([]);
      btnConsulta.textContent= 'Mostrar';
    }
  });
} else {
  console.error("btnConsulta no existe en el DOM...");
}
