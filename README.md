Tecnologías utilizadas
Node.js
Express
MongoDB (Mongoose)
Handlebars
Socket.io

 Instalación
Clonar el repositorio:
git clone TU_URL_DEL_REPO
Instalar dependencias:
npm install
Ejecutar el servidor:
node src/app.js

Endpoints principales

 Productos
Obtener productos (con filtros, paginación y orden):
GET /api/products

Query params disponibles:

limit
page
sort (asc / desc)
query (categoría)
Obtener producto por ID:
GET /api/products/:pid
Crear producto:
POST /api/products
Actualizar producto:
PUT /api/products/:pid
Eliminar producto:
DELETE /api/products/:pid
 Carritos
Crear carrito:
POST /api/carts
Obtener carrito (con populate):
GET /api/carts/:cid
Agregar producto al carrito:
POST /api/carts/:cid/product/:pid
⚡ WebSockets

Vista en tiempo real:

http://localhost:8080/realtimeproducts

Permite:

Agregar productos
Eliminar productos
Actualización automática de la lista

Interfaz

Se implementa una vista con Handlebars y estilos básicos en CSS para visualizar productos en tiempo real.

Funcionalidades destacadas
Persistencia en MongoDB
Relación entre colecciones (Cart ↔ Product)
Uso de populate
Filtros, paginación y ordenamiento
Actualización en tiempo real con Socket.io
