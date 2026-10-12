# Roy Moreno — Portafolio / versión 5

Web estática con diseño editorial oscuro y crema, acento naranja y tipografía local. Incluye 13 páginas y los 16 enlaces reales a proyectos de Behance.

## Abrir

1. Descomprimí el ZIP.
2. Abrí `roy-moreno-portfolio/index.html` en tu navegador.
3. Las secciones cambian dentro de la misma web, con una transición suave. El menú, la marca y el footer permanecen en su lugar.

Las páginas, filtros, CV y fuentes funcionan sin instalar herramientas ni conectar a internet. Behance, Instagram, WhatsApp y correo requieren sus servicios correspondientes.

## Cursor y navegación

- En computadora, el cursor es un círculo con un punto en el centro, inspirado en la referencia de Luis Varret. Conserva el acento naranja del portafolio, se amplía sobre enlaces y reacciona al clic.
- En celulares se mantiene la interacción táctil. Los campos de texto conservan el cursor de escritura y la navegación por teclado sigue disponible.
- Inicio, Diseños, Experiencia, Contacto, CV y todos los apartados se muestran dentro del mismo documento. No requieren un servidor al abrir el ZIP.
- Los botones Atrás y Adelante del navegador permiten recorrer las secciones visitadas. El enlace actual se marca en el menú.
- Los enlaces a Behance, redes, WhatsApp y PDF completos también utilizan la misma pestaña. Las descargas conservan su función.
- Si JavaScript está desactivado, los HTML individuales siguen abriéndose en la misma pestaña.
- La transición respeta la preferencia de movimiento reducido del dispositivo.

## Páginas

- Inicio: presentación y proyectos seleccionados.
- Diseños: 16 proyectos con filtros y buscador. Cada imagen abre su proyecto exacto en Behance.
- Experiencia: trayectoria y acceso a IIFamilia, Generación, Luis Varret y Vibrant Agency. La tarjeta de Generación muestra la imagen enviada y abre su apartado interno.
- IIFamilia, Generación y Luis Varret: rol y selección de proyectos. IIFamilia y Generación incluyen sus redes de Instagram y Facebook.
- Vibrant Agency: gestión de redes y acceso a cuatro páginas independientes.
- Springhill, Champion City, Greater Allen Cathedral y Solid Rock: participación y enlace a Instagram.
- CV: perfil digital bilingüe, vistas de ambas páginas originales y descarga ES / EN.
- Contacto: email, teléfono, WhatsApp, Behance, Instagram y formulario que prepara un mensaje.

Vibrant Agency figura en Experiencia. El footer está dedicado a Roy, su portafolio y contacto.

## Redes y podcast

- Generación: https://www.instagram.com/generacioniif/ y https://www.facebook.com/generacioniifamilia
- IIFamilia: https://www.instagram.com/iifamilia/ y https://www.facebook.com/iifamilia
- Podcast de Grupos Familiares: https://www.youtube.com/playlist?list=PLWw2UBXa-Nio

El podcast tiene un bloque propio en Experiencia e IIFamilia, que muestra la participación de Roy en programación, edición y dirección. Esta responsabilidad también se incorpora al CV digital en español e inglés; los PDF originales se conservan.

Los cinco enlaces se incorporaron tal como fueron proporcionados. No fue posible verificar el contenido de la playlist de YouTube desde este entorno.

La imagen de Generación se incluye sin modificar en `assets/trabajos/generacion-identidad.png`. Se muestra completa, sin deformación, en la tarjeta correspondiente de Experiencia.

## Proyectos y fotografías

Perfil de Behance: https://www.behance.net/royestmoreno1

Las portadas se descargaron desde las imágenes del perfil real. Quince tienen 808 × 632 px; Y2K utiliza la portada disponible de 404 × 316 px. Los nombres se corrigieron para coincidir con los proyectos publicados. `assets/trabajos/sources.json` conserva las fuentes de las portadas. Cada enlace lleva al proyecto completo.

Las tarjetas tipográficas de Vibrant identifican las iglesias y el rol de Social Media Manager. No presentan imágenes de otras iglesias como trabajo propio.

## CV

Los dos PDF originales se incluyen sin modificaciones en `assets/cv/`.
El perfil digital incorpora la experiencia actual con Vibrant, que no figura en los PDF adjuntos.

## Contacto

El formulario no requiere servidor. Prepara un email o un mensaje de WhatsApp con nombre, email, tipo de proyecto y descripción. El visitante completa el envío desde su aplicación.

## Editar

Para cambiar el contenido, editá `scripts/generate-pages.py` y ejecutá `python3 scripts/generate-pages.py` desde esta carpeta. Esto actualiza los 13 HTML y `portfolio-pages.js`, que reúne las secciones para la navegación interna. Evitá editar solo un HTML porque también se utiliza su versión incluida en ese archivo.

El diseño se edita en `styles.css`; el cursor, en `cursor.js`; las transiciones y el historial, en `navigation.js`. `script.js` y `portfolio-gallery.js` reinicializan el CV, contacto y filtros cuando se cambia de sección. Las fuentes y los assets están incluidos.

## Publicar en tu propio hosting

Subí todo el contenido de `roy-moreno-portfolio/` a un hosting estático. No requiere compilación ni dependencias de JavaScript. Conservá las rutas relativas.

## Validación

Se comprobaron los 13 HTML, 422 referencias locales, la correspondencia del contenido con las secciones incluidas para navegación y la sintaxis de los scripts. Los 36 assets originales, incluidos los PDF, fuentes y portadas, se conservaron sin cambios. La nueva imagen conserva exactamente los bytes del archivo enviado. Se verificó la ausencia de destinos que abran nuevas pestañas y la presencia de los cinco enlaces solicitados.

También pasaron 173 comprobaciones con las API del navegador simuladas: navegación dentro del documento tanto en hosting como al abrir archivos locales, restauración del historial, rutas locales al recargar, filtros, buscador, CV bilingüe, menú, cursor, correo, WhatsApp y clics rápidos durante las transiciones. La revisión visual en un navegador real no estuvo disponible en este entorno.
