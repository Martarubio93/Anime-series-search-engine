# Evaluacion Final Modulo 2 

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de anime, que nos permite
des/marcar las series como favoritas y guardarlas en local storage.

**Estructura básica **

1. Un Campo de texto
2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

** Búsqueda **

-Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de Jikan para la búsqueda de series de anime.
-Para construir la URL de búsqueda hay que recoger el texto introducido por la usuaria en el campo de búsqueda.
-Por cada serie de contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos una imagen de la serie y el título.
-Algunas de las series que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen de relleno.


** Favoritos **

Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son sus series favoritas. Para ello, al hacer clic sobre una serie debe pasar lo siguiente:

-El color de fondo y el de la fuente se intercambian, indicando que es una serie favorita.
- Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas. Os recomendamos crear una variable o constante de tipo array en JS para almacenar las series favoritas.
-Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda.

** Almacenamiento Local **

Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos debe mostrarse.