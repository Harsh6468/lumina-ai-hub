import { BASE_URL } from "../constants"


export const getRoles = async () => {
    const res = await fetch(`${BASE_URL}/roles/get-roles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok){
        throw new Error("Failed to fetch roles.");
    }
    const roles = await res.json()
    return roles;
}

export const addRole = async (role) => {
    const res = await fetch(`${BASE_URL}/roles/add-role`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(role),
    });

    if (!res.ok){
        throw new Error("Failed to add role.");
    }
    const newRole = await res.json()
    return newRole;
}

