export const recetas = [
    {
        id:1,
        nombre: "Pizza Margarita",
        categoria: "Plato principal",
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
        id:2,
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
        id:3,
        nombre: "Tortilla de patatas",
        categoria: "Plato principal",
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
        id:4,
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

//Contar el total de recetas
export function totalRecetas(recetas) {
    return recetas.length;
}

//CRUD
//Filtrar por categorías
//Marcar como hecha
//Marcar como favorita
