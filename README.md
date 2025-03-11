# 🚀 Proyecto Práctico - Clean Architecture & TDD

Este repositorio es un proyecto práctico que ilustra la implementación de **Clean Architecture** y **TDD (Test-Driven Development)** utilizando las siguientes tecnologías:

- **📘 TypeScript**: 5.0.0
- **🍞 Bun**: 1.1.43
- **⚡ Fastify**: 5.2.1
- **🧪 Supertest**: 7.0.0

---

## 📋 Tabla de Contenidos

- [🛠️ Requisitos](#requisitos)
- [📥 Instalación](#instalación)
- [📂 Estructura del Proyecto](#estructura-del-proyecto)
- [⌨️ Comandos Disponibles](#comandos-disponibles)
- [✅ Buenas Prácticas](#buenas-prácticas)
- [🤝 Contribuciones](#contribuciones)
- [📜 Licencia](#licencia)

---

## 🛠️ Requisitos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Bun](https://bun.sh/) (versión 1.1.43 o superior)
- (Opcional) [Node.js](https://nodejs.org/) para herramientas complementarias o scripts adicionales
- Git para clonar el repositorio

---

## 📥 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar dependencias**

   Con Bun, instala todas las dependencias del proyecto:
   ```bash
   bun install
   ```
   Esto instalará TypeScript, Fastify y demás paquetes definidos en el archivo de configuración `package.json`.


## 📂 Estructura del Proyecto

   El proyecto está organizado siguiendo los principios de Clean Architecture para separar responsabilidades y facilitar la escalabilidad y mantenibilidad. A continuación se muestra una estructura de ejemplo:

   ```bash
   clean-architecture-ecommerce/
   ├── src/
   │   ├── user/    
   │   │   ├── application/    # Lógica de negocio, casos de uso y servicios
   │   │   │   ├── tests/      # Pruebas unitarias
   │   │   ├── domain/         # Entidades, interfaces y reglas de negocio
   │   │   ├── infrastructure/ # Adaptadores, implementación de repositorios y controladores Fastify
   │   │   └── presentation/   # Rutas, controladores y configuración del servidor
   ├── bunfig.toml         # Configuración específica de Bun
   ├── package.json        # Scripts y dependencias adicionales (si se usa)
   ├── README.md           # Información general del proyecto
   ├── .env                # Variables de entorno para el proyecto
   └── tsconfig.json       # Configuración de TypeScript

   ```

## ⌨️ Comandos Disponibles

   Estos comandos han sido sugeridos para facilitar el desarrollo, la compilación y la ejecución de pruebas:

   ### Desarrollo
   Iniciar el servidor en modo desarrollo

   ```bash
   bun run dev
   ```
   Este comando levanta el servidor Fastify con recarga automática, si está configurado.
   
   ### Producción
   Iniciar el servidor

   ```bash
   bun start
   ```
   Inicia el servidor en modo producción según la configuración definida.
   
   ### Pruebas
   Ejecutar pruebas unitarias e integrales

   ```bash
   bun run test
   ```
   Ejecuta todas las pruebas utilizando Supertest, asegurando la calidad del código a través de TDD.
   
   ### Compilación
   Compilar el proyecto (si es necesario)

   ```bash
  bun run build
   ```
   Transpila el código TypeScript a JavaScript. Este paso es opcional si Bun se encarga de la ejecución directa del código TS.

   ### Changelog
   Generar la documentación de la versión
    
   ```bash
   bun run changelog
   ```
   Se generará automaticamente el changelog de la ultima versión revisada

## ✅ Buenas Prácticas
   * **Clean Architecture:**
   
      Separa la lógica de negocio de la infraestructura, facilitando el mantenimiento y la escalabilidad. Cada capa tiene responsabilidades bien definidas.
   
   * **TDD:**

      El desarrollo guiado por pruebas asegura que cada funcionalidad esté correctamente verificada desde el inicio. Se recomienda escribir pruebas antes de implementar nuevas funcionalidades.

   * **Mantenibilidad:**

      Mantén el código modular y reutilizable. Asegúrate de documentar funciones y servicios clave.

   * **Versionado:**

      Utiliza control de versiones (Git) para gestionar cambios y facilitar colaboraciones.

## 🤝 Contribuciones
   Las contribuciones son bienvenidas. Para proponer mejoras o correcciones, sigue estos pasos:
   
   1. Haz un fork del repositorio.
   2. Crea una rama para tu feature o corrección:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
   3. Realiza los cambios y agrega pruebas para validar la funcionalidad.
   4. Envía un pull request con una descripción detallada de tus modificaciones.


## 📜 Licencia
Este proyecto está licenciado bajo la MIT License.