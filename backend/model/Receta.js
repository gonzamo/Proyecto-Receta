import mongoose from "mongoose";

const recetaSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    receta_hecha: Boolean,
    favorita: Boolean,
    tiempoPreparacion: Number,
    ingredientes: [String]
});

export const Receta = mongoose.model("Receta", recetaSchema);