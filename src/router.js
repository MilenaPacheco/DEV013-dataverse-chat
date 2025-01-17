// variables a ser encapsuladas

// objeto que mapea las rutas de nuestro sitio web
let ROUTES = {
  // "/": Home,    esto viene del index.js
  // "/about": About
};

// referencia a nuestro elemento en html donde vamos a dibujar el contenido de nuestros componentes
let rootElement = ""; //rootEl


// se llaman set por que nos permiten setear un valor a nuestras variables
// verifican que los valores sean correctos para que ROUTES y rootElement trabajen
export const setRootElement = (newRootElementValue) => {
  // assign rootEl
  // validar si newRootElementValue es un objeto html
  rootElement = newRootElementValue;
}
//la función principal es asignar el valor del parámetro routes a ROUTES pero además garantiza que las rutas sean estructuradas de una manera que maneje errores de manera centralizada en la aplicación
export const setRoutes = (newRoutesValue) => {
  // optional Throw errors if routes isn't an object
  // optional Throw errors if routes doesn't define an /error route
  // assign ROUTES
  if (typeof newRoutesValue === "object") {
    if (newRoutesValue["/error"]) {
      ROUTES = newRoutesValue;
    }
  }
}

// no se agregó queryStringToObject porque es opcional para este proyecto
// en dataverse-chat nos enfocaremos en pathname, search es interesante pero no obligatorio

// esta es la constante que ve si pathname existe, si existe renderiza la vista, si no existe arroja el error.
const renderView = (pathname, props = {}) => {
  // clear the root element - vaciar todo nuestro elemento ROUTES, para que el contenido que se agregue no sea sumado a un contenido anterior
  const root = rootElement;
  root.innerHTML = ""; //ERROR en consola - asegúrate de que rootElement sea un objeto del DOM antes de intentar manipular su contenido con innerHTML
  // find the correct view in ROUTES for the pathname - match entre ROUTES y el pathname
  if (ROUTES[pathname]) {
    const template = ROUTES[pathname](props);
    console.log(template);
    root.appendChild(template);
  } else {
    console.log(ROUTES["/error"]());
    root.appendChild(ROUTES["/error"]());
  }
  // in case not found render the error view - si no existe una ruta cargada al pathname lanzar error
  // render the correct view passing the value of props
  // add the view element to the DOM root element
}

// navigateTo actualiza el historial de nuestro navegador a partir de las URLs que vamos digitando con history.pushState
/*export const navigateTo = (pathname, props = {}) => {
  // update window history with pushState
  const currentPath = window.location.pathname;
  const urlVisited = currentPath.endsWith(pathname) ? currentPath : currentPath + pathname;
  history.pushState("", "", urlVisited); // el primer parámetro era state
  // render the view with the pathname and props
  renderView(pathname, props);
}*/
// Función para navegar a una nueva ruta en la aplicación
export const navigateTo = (pathname, props = {}) => {
  // Create a new URL object using the current URL - Crear un nuevo objeto URL utilizando la URL actual del navegador
  const currentURL = new URL(window.location.href);
  // Update the pathname of the new URL - Actualizar la ruta (pathname) del nuevo objeto URL con la ruta proporcionada
  currentURL.pathname = pathname;
  // Update window history with pushState - Actualizar el historial del navegador utilizando pushState
  history.pushState("", "", currentURL.href);
  // Render the view with the pathname and props - Renderizar la vista correspondiente a la nueva ruta con las propiedades proporcionadas
  renderView(pathname, props);
};

//navigateTo("/about");

// es un método que tiene sentido sobre todo si la URL es compleja
export const onURLChange = () => {
  // parse the location for the pathname and search params
  const pathname = window.location.pathname;
  // convert the search params to an object
  // render the view with the pathname and object
  renderView(pathname);
} 

window.addEventListener("popstate", onURLChange);