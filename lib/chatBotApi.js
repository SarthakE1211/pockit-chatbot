export async function getChatResponse(message, lang = "English") {
    try {
        console.log("getChatResponse called", message);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, lang }),
        });

        const data = await res.json();

        if (!data.success) {
            return data.error || "Something went wrong";
        }

        return data.data;
    } catch (err) {
        console.error(err);
        return "Server not reachable";
    }
}