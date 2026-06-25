import { RecetasService } from "../js/services/recetasService.js";
import { mostrarRecetas } from "../js/ui/recetasUI.js";
import { RecetasAPI } from "../js/api/recetasAPI.js";
import { mostrarRecetasFavoritas } from "../js/ui/recetasUI.js";

async function init() {

    let estadoRecetas = [];
    let vistaActual = "todas";

    const cargarRecetas = async () => {
        estadoRecetas = await RecetasService.getRecetas();
    };

    // =========================
    // REFRESCA LAS TAREAS
    // =========================

    const refresh = async () => {
        await cargarRecetas();   // 🔥 recarga datos reales del backend
        renderTodas(); // 🔥 vuelve a pintar TODO

        if (vistaActual === "favoritas") {
            renderFavoritas();
        } else {
            renderTodas();
        }
        actualizarBotones();
    };

    const renderTodas = () => {
        mostrarRecetas(estadoRecetas, refresh);
    };

    const renderFavoritas = () => {
        const favoritas = estadoRecetas.filter(r => r.favorita);
        mostrarRecetas(favoritas, refresh);
    };

    // 🔥 inicial
    await cargarRecetas();
    renderTodas();

    // =========================
    // ⭐ BOTONES FAVORITOS
    // =========================

    const btnTodas = document.querySelector("#verTodas");
    const btnFav = document.querySelector("#verFavoritas");

    if (btnTodas) {
        btnTodas.addEventListener("click", () => {
            vistaActual = "todas";
            renderTodas();
            actualizarBotones();
        });
    }

    if (btnFav) {
        btnFav.addEventListener("click", () => {
            vistaActual = "favoritas";
            renderFavoritas();
            actualizarBotones();
        });
    }

    const actualizarBotones = () => {
        if (vistaActual === "favoritas") {
            btnFav.classList.add("active");
            btnTodas.classList.remove("active");
        } else {
            btnTodas.classList.add("active");
            btnFav.classList.remove("active");
        }
    };

    // =========================
    // BUSCADOR
    // =========================

    const buscador = document.querySelector("#buscador");
    const filtro = document.querySelector("#filtro");

    if (buscador && filtro) {

        const buscar = () => {
            const resultado = RecetasService.buscarRecetas(
                buscador.value.trim(),
                filtro.value
            );

            mostrarRecetas(resultado, init);
        };

        buscador.addEventListener("input", buscar);
        filtro.addEventListener("change", buscar);
    }

    // 🔥 total
    const total = document.querySelector("#totalNumRecetas");
    if (total) {
        total.textContent = RecetasService.totalNumRecetas();
    }

    // Botón nueva receta
    const botonNuevaReceta = document.querySelector("#nuevaReceta");
    if (botonNuevaReceta) {
        botonNuevaReceta.addEventListener("click", () => {
            window.location.href = "../js/ui/formulario.html";
        });
    }

    // Botón cerrar formulario
    const cerrar = document.querySelector("#cerrarModal");
    if (cerrar) {
        cerrar.addEventListener("click", () => {
            window.history.back();
        });
    }

    // Formulario crear Receta
    const form = document.querySelector("#formReceta");

    if (form) {

        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        // 🔥 cargar datos si es edición
        if (id) {
            const receta = await RecetasAPI.getById(id);

            document.querySelector("#recetaId").value = receta._id;
            document.querySelector("#nombre").value = receta.nombre;
            document.querySelector("#categoria").value = receta.categoria;
            document.querySelector("#tiempoPreparacion").value = receta.tiempoPreparacion;
            document.querySelector("#ingredientes").value = receta.ingredientes.join(", ");
        }

        // 🔥 submit (crear + editar)
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = {
                favorita: false,
                receta_hecha: false,
                nombre: document.querySelector("#nombre").value,
                categoria: document.querySelector("#categoria").value,
                tiempoPreparacion: Number(document.querySelector("#tiempoPreparacion").value),
                ingredientes: document.querySelector("#ingredientes").value
                    .split(",")
                    .map(i => i.trim())
            };

            if (!id) {
                await RecetasAPI.create(data);
            } else {
                await RecetasAPI.update(id, data);
            }

            window.location.href = "/";
        });
    }
}

init();