# Resumen de Clean Architecture

## Idea central

- El negocio manda.
- Las capas externas dependen de las internas, nunca al reves.
- Frameworks, HTTP y base de datos son detalles reemplazables.

Regla de dependencias:

- Infrastructure -> Adapters -> Application -> Domain
- Domain no conoce capas externas.
- Application conoce dominio y puertos (interfaces), no implementaciones concretas.

---

## 1) Domain

Ubicacion recomendada:

- src/01-domain
- src/01-domain/entities
- src/01-domain/value-objects
- src/01-domain/interfaces

Responsabilidades:

- Modelar reglas de negocio puras.
- Definir entidades y value objects.
- Definir contratos (puertos) que el negocio necesita, como repositorios o generadores.

Caracteristicas:

- Sin Express, sin SQL, sin drivers.
- Alta testabilidad.
- Debe ser la capa mas estable.

Ejemplos en este proyecto:

- src/01-domain/entities/Client.ts
- src/01-domain/value-objects/Email.ts
- src/01-domain/interfaces/ClientRepository.ts
- src/01-domain/interfaces/IdGenerator.ts

---

## 2) Application

Ubicacion recomendada:

- src/02-application

Responsabilidades:

- Orquestar casos de uso.
- Recibir DTOs de entrada y devolver DTOs de salida.
- Coordinar dominio y puertos para ejecutar una intencion de negocio.

Caracteristicas:

- No depende de Express ni de una base de datos concreta.
- Contiene flujo de negocio, no detalles tecnicos.

Ejemplo en este proyecto:

- src/02-application/CreateClientUseCase.ts

---

## 3) Adapters

Ubicacion recomendada:

- src/03-adapters
- src/03-adapters/http
- src/03-adapters/persistence

Responsabilidades:

- Traducir entre mundo externo y application/domain.
- Entrada: HTTP (controllers y rutas).
- Salida: implementaciones concretas de puertos (in-memory, DB real, etc.).

Caracteristicas:

- Aqui si viven Express, ORM, drivers y mapeos.
- Si cambias framework o DB, normalmente cambias adapters.
- Deben ser delgados: adaptar y delegar.

### Controller en Clean (funcion principal)

- Recibir request.
- Extraer y mapear input (body, params, query).
- Llamar al use case.
- Traducir salida a response HTTP (status y json).
- Traducir errores a respuestas HTTP.

Que NO debe hacer un controller:

- Reglas de negocio profundas.
- SQL o acceso directo a DB.
- Generar IDs de dominio.
- Decisiones de persistencia.

Ejemplos en este proyecto:

- src/03-adapters/http/ClientController.ts
- src/03-adapters/http/clientRoutes.ts
- src/03-adapters/persistence/InMemoryClientRepository.ts

---

## 4) Infrastructure

Ubicacion recomendada:

- src/04-infrastructure

Responsabilidades:

- Composition root (wiring): instanciar y conectar dependencias.
- Arranque de servidor y configuracion tecnica.
- Punto de entrada de la aplicacion.

Caracteristicas:

- Aqui decides que implementacion concreta inyectar.
- Si cambias de in-memory a Postgres, normalmente cambia este wiring.

Ejemplo en este proyecto:

- src/04-infrastructure/server.ts

---

## 5) Shared

Ubicacion recomendada:

- src/05-shared

Responsabilidades:

- Utilidades transversales no ligadas al dominio.
- Tipos comunes y constantes compartidas (solo si realmente son compartidas).

Caracteristicas:

- Evitar logica de negocio en esta capa.
- Evitar convertirla en carpeta cajon de sastre.

---

## Guia rapida: que va en cada capa

- Regla de email valido: Domain (value object).
- Flujo de crear cliente: Application (use case).
- Endpoint POST /clients: Adapters HTTP (controller/routes).
- Guardado en memoria o DB: Adapters Persistence.
- app.listen y wiring: Infrastructure.
- Helpers generales reutilizables: Shared.

---

## Senales de que vas bien en Clean

- Puedes cambiar Express sin tocar domain.
- Puedes cambiar in-memory por DB real sin tocar el caso de uso.
- Entidades y value objects no importan infraestructura.
- Controllers delgados: adaptan entrada/salida y delegan en use cases.
