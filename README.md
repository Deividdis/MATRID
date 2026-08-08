# MATRID v1.0

**MATRID (Mechanical Authentication and Transformation Rotor Identity Device)** es un generador de contraseñas interactivo inspirado en el diseño de las máquinas mecánicas de cifrado.

El proyecto combina una interfaz web desarrollada con **HTML5, CSS3 y JavaScript** con una estética de maquinaria mecánica, incorporando rotores interactivos, teclado, indicadores luminosos y efectos sonoros.

---

## 📸 Captura

![MATRID v1.0](screenshots/matrid-v1.png)

---

## 📌 Sobre el proyecto

MATRID nace como un proyecto personal orientado al desarrollo de una aplicación web interactiva.

El objetivo principal es combinar programación, diseño de interfaces y animaciones para crear una herramienta funcional con una identidad visual propia.

La interfaz está inspirada en dispositivos mecánicos de cifrado, utilizando elementos como:

- Rotores mecánicos.
- Indicadores luminosos.
- Teclado físico y virtual.
- Estructuras metálicas.
- Detalles en bronce y dorado.
- Fondo de madera.

---

## ✨ Características

### ⚙️ Rotores mecánicos

- Tres rotores interactivos.
- Avance mediante pulsación.
- Movimiento vertical inspirado en ruedas mecánicas.
- Indicadores de posición mediante números romanos.
- Animaciones CSS.

### ⌨️ Teclado

- Teclado virtual integrado en la interfaz.
- Compatibilidad con teclado físico.
- Letras mayúsculas y minúsculas.
- Números.
- Símbolos.
- Función SHIFT.
- Backspace y Enter.

### 💡 Indicadores

- Iluminación de las teclas al utilizarlas.
- Indicador de estado del sistema.
- Efectos visuales para las acciones del usuario.

### 🔐 Generación de contraseñas

MATRID permite generar contraseñas utilizando:

- Letras mayúsculas.
- Letras minúsculas.
- Números.
- Símbolos.

Caracteres disponibles:

```text
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789
!@#$%&*?+-_=
```

---

## ▶️ Cómo instalar MATRID

MATRID no requiere instalación de dependencias externas, ya que está desarrollado utilizando **HTML5, CSS3 y JavaScript**.

### Requisitos

Para utilizar MATRID necesitas:

- Un navegador web moderno.
- Git para clonar el repositorio.
- Opcionalmente, Visual Studio Code para trabajar con el proyecto.

### Clonar el repositorio

Puedes descargar el proyecto utilizando Git:

```bash
git clone https://github.com/Deividdis/MATRID.git
```

---

## 🚀 Cómo ejecutar MATRID

Una vez descargado el proyecto puedes ejecutar MATRID de dos formas:

1. Abre el archivo: index.html
2. Abre la carpeta MATRID en Visual Studio Code, instala la extensión Live Server, abre el archivo index.html, click enciima con botón derecho, selecciona Open with Live Server y se abrirá en el navegador.

---

## 🎮 Cómo utilizar MATRID

1. Introducir caracteres

Puedes introducir caracteres utilizando:

El teclado físico del ordenador.
El teclado virtual de MATRID.

MATRID admite:
```text
Mayúsculas:
ABCDEFGHIJKLMNOPQRSTUVWXYZ

Minúsculas:
abcdefghijklmnopqrstuvwxyz

Números:
0123456789

Símbolos:
!@#$%&*?+-_=
```
2. Utilizar SHIFT

El botón SHIFT permite cambiar entre letras mayúsculas y minúsculas.

Al activar SHIFT, las letras del teclado pasan a mostrarse en mayúsculas.

Al desactivarlo, vuelven a mostrarse en minúsculas.

3. Utilizar los rotores

MATRID dispone de tres rotores mecánicos.

Los rotores se desplazan verticalmente y muestran sus posiciones mediante números romanos.

Al pulsar sobre un rotor, este avanza a la siguiente posición.

4. Introducir la contraseña

Los caracteres introducidos se muestran en el área de entrada de MATRID.

Las teclas utilizadas también proporcionan una respuesta visual mediante sus indicadores luminosos.

5. Generar la contraseña

Una vez introducidos los caracteres deseados, utiliza el botón GENERAR.

MATRID generará una contraseña utilizando los caracteres disponibles y mostrará el resultado en el área de contraseña.

6. Copiar la contraseña

Una vez generada la contraseña, utiliza el botón COPIAR para copiarla al portapapeles.

---

## 🛠️ Tecnologías utilizadas

HTML5 — estructura de la aplicación.
CSS3 — diseño, animaciones y adaptación de la interfaz.
JavaScript — lógica e interacción de la aplicación.
Web Crypto API — generación de valores aleatorios.
Git — control de versiones.
GitHub — alojamiento del proyecto.

---

## 📂 Estructura del proyecto

```text
MATRID/
│
├── 📄 index.html
├── 🎨 styles.css
├── ⚙️ app.js
├── 📖 README.md
├── 🚫 .gitignore
│
└── 📁 assets/
    ├── 🖼️ fondo.jpg
    ├── 🔊 click.mp3
    └── 🔊 finish.mp3
```

---

## 🎯 Objetivos del proyecto

MATRID ha sido desarrollado como proyecto personal para poner en práctica diferentes conceptos de desarrollo web:

Manipulación del DOM.
Gestión de eventos.
Eventos de teclado.
Interacción con elementos HTML.
Animaciones mediante CSS.
Gestión de estados de la interfaz.
Integración de archivos multimedia.
Uso de APIs del navegador.
Diseño responsive.
Organización de proyectos web.
Control de versiones con Git.
Publicación de proyectos mediante GitHub.

---

## 🔮 Futuras mejoras

MATRID está planteado como un proyecto que puede seguir evolucionando.

Entre las futuras líneas de desarrollo se contempla:

- Crear una extensión para navegadores como Chrome, Firefox y Edge.
- Permitir utilizar MATRID directamente desde el navegador al registrarse o iniciar sesión en un sitio web.
- Gestionar las contraseñas generadas para diferentes sitios web.
- Asociar cada contraseña con su correspondiente sitio o servicio.
- Facilitar el acceso y uso de las contraseñas almacenadas.
- Mejorar el sistema de seguridad y protección de los datos almacenados.
- Incorporar un sistema de gestión de credenciales más completo.

El objetivo a largo plazo sería convertir MATRID en una herramienta de gestión de contraseñas integrada en el navegador, manteniendo la identidad visual y el concepto de los rotores mecánicos como elemento principal de la aplicación.

---
## 📄 Licencia

Este proyecto se publica con fines educativos y de portfolio personal.

Todos los derechos reservados.

© 2026 David Díaz Sánchez

---