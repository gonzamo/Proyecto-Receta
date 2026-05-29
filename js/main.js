import { recetas, totalRecetas, crearTarjetaReceta, mostrarRecetas } from "./receta.js";

const totalRecetasHTML = document.querySelector("#totalRecetas");

// Mostrar total
totalRecetasHTML.textContent = totalRecetas(recetas);

mostrarRecetas(recetas);