import { BASE_URL } from "../constants"

export const sendChat = async (messages) => {
    const res = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch response.");
    }

    const data = await res.json();
    return data.response;
}
