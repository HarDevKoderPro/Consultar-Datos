<?php
// Configuración de la conexión a MySQL
$host = "localhost";    // Host de la base de datos
$user = "root";         // Usuario de la base de datos
$pass = "";             // Contraseña de la base de datos
$dataBase = "pruebas";  // Nombre de la base de datos

// Crear conexión
$conexion = new mysqli($host, $user, $pass, $dataBase);

// Verificar la conexión
if ($conexion->connect_error) {
  die("Error de conexión: " . $conexion->connect_error);
}

// Consulta SQL para obtener datos
$sql = "SELECT * FROM usuarios"; 
$resultado = $conexion->query($sql);

// Verificar si hay resultados
if ($resultado->num_rows > 0) {
  // Crear un array para almacenar los datos
  $datos = array();

  // Recorrer los resultados y agregarlos al array
  while ($fila = $resultado->fetch_assoc()) {
    $datos[] = $fila; // Cada fila es un objeto asociativo
  }

  // Devolver los datos en formato JSON
  header("Content-Type: application/json");
  echo json_encode($datos);
} else {
  // Si no hay resultados, devolver un array vacío
  echo json_encode([]);
}

// Cerrar la conexión
$conexion->close();
?>