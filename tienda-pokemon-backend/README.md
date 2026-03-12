Tienda Pokemon 

Es una tienda que cuenta con el catalogo de los pokemon en donde en cada tarjeta se encuentra el nombre, categoria y precio, así mismo se puede realizar la debida compra pero si o si debes estar logueado para hacerla, también puedes lograr ver la página del carrito de compras donde puedes eliminar productos si así lo deseas.

Tecnologías utilizadas:
NestJS, Typescript 

Instalación y configuración:
1. Clonar el repositorio
  bash
  git clone https://github.com/lindahurtado/tienda-pokemon.git
  cd tienda-pokemon
2. Configuración del backend
  Bash
  git clone https://github.com/lindahurtado/tienda-pokemon.git
  cd tienda-pokemon-backend
  npm install
  npm run start:dev
  El servideor correrá en: http://localhost:4000
3. Configuración (Especificaciones en la carpeta de tienda-pokemon en el README.md)

Arquitectura y decisiones técnicas
1. Persistencia de Datos
  Usuarios: El backend en NestJS gestiona un archivo users.json para el registro y login, simulando una base de datos persistente sin dependencias externas complejas.