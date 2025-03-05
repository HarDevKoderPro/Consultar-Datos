"use strict";
export class Libreria {
  //-------------------------------------------------------
  // Crear Botón de Consulta
  //-------------------------------------------------------
  static crearBoton(id, texto, padre) {
    const boton = document.createElement("button");
    boton.id = id;
    boton.classList.add(id);
    boton.textContent = texto;
    document.querySelector(padre).appendChild(boton);
    return boton;
  }

  //-------------------------------------------------------
  // Realizar Consulta de Datos al Server
  //-------------------------------------------------------
  static obtenerDatosDeMySQL(url, callback) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }
        return response.json(); // Convierte la respuesta a JSON
      })

      .then((data) => {
        // Llama al callback con los datos recibidos
        callback(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }

  //-------------------------------------------------------
  // Tabla para Mostrar Datos Traidos de MySql
  //-------------------------------------------------------
  static crearTablaDatos(params) {
    // Creo el elemento principal (Tabla)
    const tabla = document.createElement("table");
    tabla.className = params.id;
    tabla.id = params.id;

    // Titulo de la tabla
    const titulo = document.createElement("caption");
    titulo.className = "tituloTabla";
    titulo.textContent = params.tituloTabla;
    tabla.appendChild(titulo);

    // Encabezados de la tabla (Campos)
    const encabezado = document.createElement("thead");
    const encabezadoFila = document.createElement("tr");
    params.campos.forEach((campo) => {
      encabezadoFila.innerHTML += `
    <th class="tablaCampos">${campo}</th>`;
    });
    encabezado.appendChild(encabezadoFila);
    tabla.appendChild(encabezado);

    // Cuerpo de la tabla (vacío)
    const cuerpo = document.createElement("tbody");
    cuerpo.id = "tablaResultados";
    cuerpo.className = "tablaResultados";
    tabla.appendChild(cuerpo);

    // Agrego la tabla al contenedor padre y la retorno
    document.querySelector(params.padre).appendChild(tabla);
  }

  //-------------------------------------------------------
  // Insertar Datos Traidos de MySql en la Tabla
  //-------------------------------------------------------
  static llenarTablaDatos(datos) {
    // Obtener el cuerpo de la tabla
    const cuerpo = document.getElementById("tablaResultados");

    // Limpiar el cuerpo de la tabla (por si ya tiene datos)
    cuerpo.innerHTML = "";

    // Agregar los datos al cuerpo de la tabla
    datos.forEach((dato) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
      <td>${dato.id}</td>
      <td>${dato.nombre}</td>
      <td>${dato.apellido}</td>
      <td>${dato.edad}</td>
    `;
      cuerpo.appendChild(fila);
    });
  }
}
