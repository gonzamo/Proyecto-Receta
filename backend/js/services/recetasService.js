import { RecetasAPI } from "../api/recetasAPI.js";

export class RecetasService {

    static recetas = [];

    static async getRecetas() {
        this.recetas = await RecetasAPI.getAll();
        return this.recetas;
    }

    static totalNumRecetas() {
        return this.recetas.length;
    }

    static buscarRecetas(texto, filtro) {
        const valor = texto.toLowerCase();

        return this.recetas.filter(receta => {
            const campo = receta?.[filtro];

            return (campo ?? "")
                .toString()
                .toLowerCase()
                .includes(valor);
        });
    }

    static setRecetas(nuevas) {
        this.recetas = nuevas;
    }

    async cargarRecetaParaEditar(id) {
        return await RecetasAPI.getById(id);
    }
}