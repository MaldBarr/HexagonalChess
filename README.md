# HexagonalChess

**Creado por Carlos Sebastián Maldonado Barraza**

## Sobre el proyecto

Este proyecto busca ofrecer una nueva forma de jugar ajedrez manteniendo los aspectos populares del juego mientras se innova con un estilo que por muy popular que haya sido en épocas pasadas, no ha sido adaptado por las páginas populares de ajedrez.

Esta variante es la de Władysław Gliński, creada en 1936, popularizada en 1949 en el este de Europa, esta variante se juega en un tablero hexagonal regular de 91 casillas divididas en 3 colores, donde además de ser jugado con las piezas originales, se agrega un alfil para el nuevo color y un peón para cubrir las posiciones iniciales, debido a el nuevo estilo del tablero los movimientos de las piezas se redefinen para cubrir las nuevas posiciones.

Esta aplicación permite el juego multijugador del ajedrez hexagonal mientras se mantiene una interfaz minimalista y facil de usar.

## Requerimientos Funcionales

| ID | Descripcion                             | Prioridad |
| -- | --------------------------------------- | --------- |
| 1  | Inicio de sesión y registro de usuario | Alta      |
| 2  | Edicion de datos de cuenta              | Baja      |
| 3  | Creacion de salas de juego              | Alta      |
| 4  | Sistema de juego del ajedrez            | Maxima    |
| 5  | Sistema de Elo                          | Baja      |

## Requerimientos no funcionales

| ID | Descripcion                                                                                                                    | Prioridad |
| -- | ------------------------------------------------------------------------------------------------------------------------------ | --------- |
| 1  | Datos sensibles de cuenta encriptados                                                                                          | Alta      |
| 2  | El sistema debe estar disponivle para los usuarios mediante la disponibilidad que presente el hosting                          | Alta      |
| 3  | El Sistema deberá proteger la privacidad de las personas identificadas de acuerdo con las políticas del Gobierno de Chile    | Media     |
| 4  | El Sistema debe estar bien documentado para facilitar el mantenimiento por parte de los desarrolladores nuevos o existentes. | Media     |
| 5  | El Sistema debe funcionar en los siguientes navegadores web: Chrome, Opera, Safari, Brave, Edge                               | Media     |
| 6  | El sistema debe optimizar el tiempo de respuesta al usuario                                                                   | Alta      |

## Instrucciones de instalacion

Importar este repositorio de Github

### Cargar base de datos

1. En XAMPP iniciar Apache y MySQL
2. Presionar admin en MySQL
3. En la barra superior presionar importar
4. En archivo a importar presionar Seleccionar archivo
5. Localizar hexachess.sql y seleccionarlo
6. Bajar en la pagina y presionar importar

### Iniciar backend

1. Cargar un terminal y ejecutar los siguientes comandos
   1. cd backend
   2. npm install
   3. node App.js
2. Ahora la API deberia estar lista y escuchando en el port

### Iniciar Frontend

1. Cargar un terminal y ejecutar los siguientes comandos
   1. cd frontend
   2. npm install
   3. npm run dev
2. Ahora el frontend deberia estar listo para ser usado

## Usos de la aplicación web

### Usos basicos de la aplicación

La aplicación cuenta con usos limitados para los usuarios que aun no inician sesión, como lo es revisar las ***reglas del juego***, ver la ***información de los creadores*** y acceder a ***cuenta*** donde puede registrarse e iniciar sesión.

### Registro de usuario e inicio de sesión

Para el registro de una cuenta hay un formulario basico para crear una cuenta donde se necesitan los siguientes datos:

1. Correo
2. Nombre de usuario
3. Pais
4. Contraseña (y confirmación)

Una vez registrado el sistema nos enviará automaticamente a la pestaña de iniciar sesión donde solo se pide correo y contraseña.

### Usos para usuarios registrados

El sistema permitira a los usuarios registrados crear y unirse a salas de juego, lo cual les lleva a una pantalla de juego donde pueden jugar ajedrez con otro usuario.
