# M7-2-Proyecto Node + PostgreSQL

## Descripción
Proyecto de ejemplo para gestionar clientes utilizando Node.js, Express, PostgreSQL y JavaScript en el frontend.  
Permite crear, listar, modificar y eliminar clientes mediante un **frontend interactivo** que consume una **API REST** con consultas parametrizadas.

## Tecnologías utilizadas
- Node.js  
- Express  
- PostgreSQL  
- pg (cliente de PostgreSQL para Node)  
- HTML / CSS / JavaScript  
- npm para gestión de dependencias  


## Funcionalidades

- Crear un nuevo cliente con **rut, nombre y edad**.  
- Modificar el **nombre** de un cliente existente.  
- Eliminar un cliente por **rut**.  
- Listar todos los clientes en el frontend.  
- Validaciones:
  - Todos los campos obligatorios.
  - Edad debe ser numérica.
  - Control de **RUT duplicado**.

  ## Endpoints

| Método | Endpoint          | Descripción                          | Códigos HTTP posibles                  |
|--------|-----------------|--------------------------------------|---------------------------------------|
| GET    | `/clientes`      | Retorna todos los clientes           | 200 OK, 500 Internal Server Error     |
| POST   | `/clientes`      | Crea un nuevo cliente                | 201 Created, 400 Bad Request, 409 Conflict, 500 Internal Server Error |
| PUT    | `/clientes/:rut` | Modifica el nombre de un cliente     | 200 OK, 400 Bad Request, 404 Not Found, 500 Internal Server Error |
| DELETE | `/clientes/:rut` | Elimina un cliente por rut           | 200 OK, 404 Not Found, 500 Internal Server Error |

## Uso
1. Configurar el archivo .env_ejemplo con las credenciales de tu base de datos. 
2. Instalar dependencias  npm install
3. Ejecutar Servidor npm start
4. Abrir Navegador http://localhost:3000.


# Notas 
- La lista de clientes solo se despliega al presionar el botón “Listar Todos”.
- Para actualizar la lista despues de  modificar o crear un cliente, debes cerrar la lista y hacer clic en el boton listar todos.
- Los botones de acción muestran alertas y mensajes de error según la respuesta del servidor.

## Autor
Fernanda Álvarez para curso Fullstack Javascript Sence.
