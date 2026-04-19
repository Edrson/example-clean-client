# Checklist de Revision Clean Architecture

Usa este checklist cada vez que crees o modifiques un archivo.

---

## 0) Regla base (siempre)

- [ ] Este archivo no rompe la regla de dependencias:
  - Infrastructure -> Adapters -> Application -> Domain
- [ ] No hay imports hacia capas externas desde capas internas.
- [ ] El nombre del archivo expresa su responsabilidad.

---

## 1) Si el archivo es de Domain (src/01-domain)

- [ ] Contiene reglas de negocio puras (entidad, value object, contrato).
- [ ] No importa Express, ORM, drivers, DB ni utilidades de infraestructura.
- [ ] Si es Value Object, valida invariantes en creacion.
- [ ] Si es Entity, representa comportamiento/estado de negocio, no detalles tecnicos.
- [ ] Si es interfaz (puerto), define contrato y no implementacion.

Validacion rapida:

- [ ] "Podria ejecutar este archivo sin HTTP ni base de datos".

---

## 2) Si el archivo es de Application (src/02-application)

- [ ] Implementa un caso de uso claro.
- [ ] Recibe DTO de entrada y devuelve DTO de salida.
- [ ] Orquesta dominio + puertos, sin usar implementaciones concretas.
- [ ] No contiene codigo de Express (Request/Response) ni SQL.
- [ ] No contiene logica de framework.

Validacion rapida:

- [ ] "Puedo testear este use case con mocks de interfaces".

---

## 3) Si el archivo es Adapter HTTP (src/03-adapters/http)

- [ ] Solo adapta entrada/salida HTTP.
- [ ] Convierte req a DTO del use case.
- [ ] Invoca use case.
- [ ] Convierte resultado del use case a response HTTP.
- [ ] Maneja errores con status adecuados sin meter reglas de negocio.
- [ ] No hace persistencia directa ni SQL.

Validacion rapida:

- [ ] "Si cambio Express, la logica de negocio no cambia".

---

## 4) Si el archivo es Adapter Persistence (src/03-adapters/persistence)

- [ ] Implementa una interfaz definida en domain.
- [ ] Contiene solo detalles de guardado/lectura (in-memory, DB, etc.).
- [ ] No mueve reglas de negocio aqui.
- [ ] Devuelve datos conforme al contrato del puerto.
- [ ] Maneja mapeo tecnico necesario sin contaminar domain.

Validacion rapida:

- [ ] "Si cambio de in-memory a Postgres, no debo tocar domain/use case".

---

## 5) Si el archivo es Infrastructure (src/04-infrastructure)

- [ ] Hace wiring/composition root (crea y conecta dependencias).
- [ ] Define arranque tecnico (server, config, bootstrap).
- [ ] No duplica logica de negocio.
- [ ] No reemplaza al use case con logica ad-hoc.

Validacion rapida:

- [ ] "Aqui solo conecto piezas, no invento reglas de negocio".

---

## 6) Si el archivo es Shared (src/05-shared)

- [ ] Es realmente transversal y reutilizable.
- [ ] No contiene reglas propias del dominio de cliente.
- [ ] No se convierte en "misc/cajon de sastre".

Validacion rapida:

- [ ] "Si borro este modulo, el dominio principal sigue limpio y entendible".

---

## 7) Checklist de imports (control de acoplamiento)

- [ ] Domain importa solo Domain.
- [ ] Application puede importar Domain, nunca Adapters/Infrastructure.
- [ ] Adapters pueden importar Application y Domain.
- [ ] Infrastructure puede importar todo para componer.

---

## 8) Checklist de DTOs y modelos

- [ ] Input DTO representa datos de entrada (normalmente primitivos).
- [ ] Output DTO representa contrato de salida del caso de uso.
- [ ] Entity/VO no se mezclan con shape HTTP.
- [ ] No usar any para forzar tipos entre capas.

---

## 9) Checklist de errores

- [ ] Mensajes de error claros por capa.
- [ ] Controller traduce a response HTTP (status + body).
- [ ] No filtrar detalles internos sensibles en respuestas.
- [ ] Regla de negocio fallida se detecta en domain/application.

---

## 10) Checklist de calidad antes de cerrar un cambio

- [ ] npm run build compila sin errores.
- [ ] Ruta/flujo principal probado (happy path).
- [ ] Caso invalido principal probado (error path).
- [ ] Nombres de clases/metodos expresivos.
- [ ] Comentarios solo donde aportan contexto real.

---

## Mini plantilla por archivo nuevo

Completar rapido al crear archivo:

- Capa:
- Responsabilidad unica:
- Dependencias permitidas:
- Dependencias prohibidas:
- Entrada esperada:
- Salida esperada:
- Error principal esperado:
- Como se prueba rapido:
