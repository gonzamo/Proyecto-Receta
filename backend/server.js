import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { Receta } from "./model/Receta.js";


const app = express();
const PUERTO = 3000

// __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// frontend estático
app.use(express.static(path.join(__dirname, "public")));

// JS modules (api, services, ui)
app.use("/js", express.static(path.join(__dirname, "js")));

//Conexión a la BBDD
mongoose.connect("mongodb://mongo:27017/recetas")
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err));

//------VER RECETAS------    
app.get("/recetas", async (req, res) => {
    const recetas = await Receta.find();
    console.log(recetas);
    res.json(recetas)
})

//------VER UNA RECETA POR ID------
app.get("/recetas/:id", async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        if (!receta) {
            return res.status(404).json({ message: "Receta no encontrada" });
        }

        res.json(receta);

    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
});

//------CREAR RECETAS------    
app.post("/recetas", async (req, res) => {
    const nueva = new Receta(req.body);
    await nueva.save();
    res.json(nueva);
})

//------ACTUALIZAR RECETA------    
app.put("/recetas/:id", async (req, res) => {
    const receta = await Receta.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(receta);
})

//------BORRAR RECETA------    
app.delete("/recetas/:id", async (req, res) => {
    await Receta.findByIdAndDelete(req.params.id);
    res.json({ ok: true })
})

app.listen(PUERTO, "0.0.0.0", () => {
    console.log(`Servidor arrancado => http://localhost:${PUERTO}`);
});
