import { recetas } from "./receta.js";
import * as funciones from './receta.js'

const listaTotalRecetas = document.querySelector("#recetas")
const totalRecetas = document.querySelector("#totalRecetas");

//Muestra el numero total de recetas en el HTML
totalRecetas.textContent = funciones.totalRecetas(recetas)

//Muestra cada receta y sus datos
function mostrarRecetas(listaRecetas) {

    // Limpia el contenido del contenedor antes de mostrar las recetas
    listaTotalRecetas.innerHTML = "";

    listaRecetas.forEach(receta => {
        const div = document.createElement("div");

        div.classList.add("card-receta");

        div.innerHTML = `
            <h3 class="titulo-receta">
                ${receta.nombre}
                <span class="categoria ${receta.categoria.toLowerCase()}">
                    ${receta.categoria}
                </span>
            </h3>

            <p><strong>Tiempo:</strong> ${receta.tiempoPreparacion} min</p>
            <p><strong>Favorita:</strong> ${receta.favorita ? "⭐ Sí" : "❌ No"}</p>
            <p><strong>Hecha:</strong> ${receta.receta_hecha ? "✔ Sí" : "❌ No"}</p>

            <div class="ingredientes">
                <strong>Ingredientes:</strong><br>
                ${receta.ingredientes
                .map(i => i.charAt(0).toUpperCase() + i.slice(1))
                .join(", ")}
            </div>
        `;

        listaTotalRecetas.appendChild(div);
    });

}

mostrarRecetas(recetas);