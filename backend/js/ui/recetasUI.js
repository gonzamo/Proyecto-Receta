import { RecetasAPI } from "../api/recetasAPI.js";

export function crearTarjetaReceta(receta, refresh) {

    const div = document.createElement("div");

    div.innerHTML = `
        <div class="receta" data-nombre="${receta.nombre.toLowerCase()}"  data-categoria="${receta.categoria.toLowerCase()}">
            <h3 class="nombre">
                ${receta.nombre.toUpperCase()}
                <span class="categoria ${receta.categoria.toLowerCase()}">
                    ${receta.categoria}
                </span>
                <button class="fav ${receta.favorita ? 'activa' : ''}">
                    ${receta.favorita ? '✓ En favoritos' : '+ Añadir a favoritos'}
                </button>
            </h3>

            <p><strong>Tiempo preparación:</strong> ${receta.tiempoPreparacion} min</p>
            
            <div class="ingredientes">
                <strong>Ingredientes:</strong><br>
                ${receta.ingredientes
            .map(i => i.charAt(0).toUpperCase() + i.slice(1))
            .join(", ")}
            </div>

            <div class="acciones">

                <button class="hecha ${receta.receta_hecha ? 'si' : 'no'}">
                    ${receta.receta_hecha ? "✓ Hecha" : "Pendiente"}
                </button>

                <button class="editar">
                    Editar
                </button>

                <button class="eliminar">
                    Eliminar
                </button>
            </div>
        </div>
    `;

    //ACCION BOTON RECETA FAVORITA
    div.querySelector(".fav").addEventListener("click", async () => {
        await RecetasAPI.update(receta._id, {
            favorita: !receta.favorita
        });

        refresh();
    });

    //ACCION BOTON RECETA HECHA
    div.querySelector(".hecha").addEventListener("click", async () => {
        await RecetasAPI.update(receta._id, {
            receta_hecha: !receta.receta_hecha
        });

        refresh();
    });

    //ACCION BOTON ELIMINAR
    div.querySelector(".eliminar").addEventListener("click", async () => {
        await RecetasAPI.delete(receta._id);
        refresh();
    });

    //ACCION BOTON EDITAR
    div.querySelector(".editar").addEventListener("click", async () => {
        window.location.href = `../js/ui/editarReceta.html?id=${receta._id}`;
    });

    return div;
}

export function mostrarRecetas(recetas, refresh) {

    const contenedor = document.querySelector("#recetas");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    recetas.forEach(r => {
        contenedor.appendChild(
            crearTarjetaReceta(r, refresh)
        );
    });
}

export function mostrarRecetasFavoritas(recetas, refresh) {

    const contenedor = document.querySelector("#recetas");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    recetas.forEach(r => {
        if (r.favorita) {
            contenedor.appendChild(
                crearTarjetaReceta(r, refresh)
            );            
        }
    });
}
