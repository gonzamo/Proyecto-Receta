const URL = "http://localhost:3000/recetas";

export class RecetasAPI {

    static async getAll() {
        const res = await fetch(URL);
        return await res.json();
    }

    static async getById(id) {
        const res = await fetch(`${URL}/${id}`);
        return await res.json();
    }

    static async create(data) {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await res.json()
    }

    static async update(id, data) {
        const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await res.json()
    }

    static async delete(id) {
        const res = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        })

        return await res.json();
    }
}