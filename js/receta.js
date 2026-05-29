export const recetas = [
    {
        id: 1,
        nombre: "Pizza Margarita",
        categoria: "Principal",
        receta_hecha: false,
        favorita: false,
        tiempoPreparacion: 30,
        ingredientes: [
            "masa de pizza",
            "tomate triturado",
            "mozzarella",
            "aceite de oliva"
        ]
    },
    {
        id: 2,
        nombre: "Patatas bravas",
        categoria: "Entrante",
        receta_hecha: false,
        favorita: false,
        tiempoPreparacion: 25,
        ingredientes: [
            "patatas",
            "aceite de oliva",
            "sal",
            "salsa brava",
            "mayonesa (opcional)"
        ]
    },
    {
        id: 3,
        nombre: "Tortilla de patatas",
        categoria: "Principal",
        receta_hecha: true,
        favorita: true,
        tiempoPreparacion: 40,
        ingredientes: [
            "patatas",
            "huevos",
            "cebolla",
            "aceite de oliva",
            "sal"
        ]
    },
    {
        id: 4,
        nombre: "Brownie de chocolate",
        categoria: "Postre",
        receta_hecha: false,
        favorita: true,
        tiempoPreparacion: 50,
        ingredientes: [
            "chocolate negro",
            "mantequilla",
            "huevos",
            "azúcar",
            "harina",
            "nueces"
        ]
    }
];

//Crea las tarjetas en el HTML
export function crearTarjetaReceta(receta) {

    const div = document.createElement("div");
    div.classList.add("card-receta", receta.categoria.toLowerCase());

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

        <button 
            class="${receta.favorita ? "favorita" : "no-favorita"}"
            data-id="${receta.id}">
                ${receta.favorita
                ? "Quitar de favorita"
                : "Añadir a favorita"}
        </button>

        <button 
            class="${receta.receta_hecha ? "hecha" : "no-hecha"}"
            data-id="${receta.id}">
                ${receta.receta_hecha
                ? "Receta hecha"
                : "Receta sin hacer"}
        </button>

    `;

    const botones = div.querySelectorAll("button");

    //Seleccionamos el primer boton (receta favorita)
    const botonFavorita = botones[0];

    //Botón de reeta hecha
    const botonHecha = botones[1];

    //La acción que hace cuando haces click al botón
    botonFavorita.addEventListener("click", () => cambiarEstadoFavorita(receta))

    botonHecha.addEventListener("click", () => cambiarEstadoHecha(receta))

    return div;
}

// Mostrar todas las recetas
export function mostrarRecetas(listaRecetas) {

    const listaTotalRecetas =
        document.querySelector("#recetas");

    listaTotalRecetas.innerHTML = "";

    listaRecetas.forEach(receta => {

        listaTotalRecetas.appendChild(
            crearTarjetaReceta(receta)
        );

    });
}

//Contar el total de recetas
export function totalRecetas(recetas) {
    return recetas.length;
}

//CRUD
//Filtrar por categorías
//Marcar como hecha
function cambiarEstadoHecha(receta) {
    receta.receta_hecha = !receta.receta_hecha

    //Para cargar los cambios
    mostrarRecetas(recetas)
}
//Marcar como favorita
function cambiarEstadoFavorita(receta) {
    receta.favorita = !receta.favorita

    //Para cargar los cambios
    mostrarRecetas(recetas)
}