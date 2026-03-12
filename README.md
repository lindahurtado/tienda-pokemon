Tienda Pokemon 

Es una tienda que cuenta con el catalogo de los pokemon en donde en cada tarjeta se encuentra el nombre, categoria y precio, así mismo se puede realizar la debida compra pero si o si debes estar logueado para hacerla, también puedes lograr ver la página del carrito de compras donde puedes eliminar productos si así lo deseas.

FRONTEND

Tecnologías utilizadas:
Frontend: React (Vite), Typescropt, React Router DOM.
Persistencia: LocalStorage
API: PokeAPI.

Instalación y configuración
1. Clonar el repositorio
  bash
  git clone https://github.com/lindahurtado/tienda-pokemon.git
  cd tienda-pokemon
2. Configurar el Backend (Especificaciones en la carpeta de tienda-pokemon-backend en el README.md)
3. Configurar el Frontend
  Bash
  #En otra terminal desde la raíz escribir lo siguiente
  cd tienda-pokemon
  npm install
  npm run dev
  La aplicación correra en http://localhost:5173/

Arquitectura y Decisiones técnicas
1. Manejo de estados (Context API):
  Se utilizó React Context API para gestionar el carrito de compras y la sesión del usuario. Esta decisión se tomó para evitar el "Prop Drilling" y garantizar que la información del carrito sea consistente en todas las vistas (Tienda, Detalle, Carrito, Header)

2. Persistencia de Datos
  
  Carrito: Se implementó un useEffect que sincroniza el estado del carrito con LocalStorage del navegador, permitiendo que los productos no se pierdan al recargar la página.

3. Lógica del stock dinámico

  El stock no es un valor estático. Se implementó una lógica de Estado derivado donde: 
  * Stock disponible = stock base (10) - cantidad en carrito
  * Esto asegura que el usuario no pueda exceder el inventario disponible y que el stock se recupere instantáneamente si se elimina un producto del carrito.

Integración con PokeAPI

Para la obtención de datos de los productos, se consumió la PokeAPI, integrando los siguientes procesos:

1. Extracción y transformación
Dado que la PokeAPI entrega datos especificos y técnicos de cada pokemon como: tipos, habilidades entre otros, se implemento un mapeador de datos, el cual trandforma la respuesta de la API  aun modelo de negocio apto para una tienda virtual. 

* ID y nombre: identificadores únicos del pokémon.
* Imágenes: Se priorizó el uso de official-artwork para garantizar una alta calidad visual en la galería.
* Precio dinámico: Calculado a partir de la propiedad base:experience para simular un valor comercial coherente.
* Categoría: Mapeo del primer tipo del pokémon (Fuego, agua, etc) como categoría del producto.

2. Estrategia de carga
Paginación: Se limitó la consulta inicial a los primeros 20/50 resultados para optimizar los tiempos de carga y el rendimiento del navegador.

Carga paralela: Se utilizó promise.all para obtener los detalles de cada pokémon de forma simultánea, reduciendo drásticamente el tiempo de respuesta en comparación con las peticiones secuenciales. 

3. Sincronización de Stock 
Aunque la API no provee inventario, se estableció un Stock Base Inmutable de 10 unidades por producto. La lógica de negocio del frontend calcula la disponibilidad en tiempo real restando la cantidad de ítems en el carrito de este stock base, asegurando que la interfaz refleje siempre la realidad de la bodega.

BACKEND

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
