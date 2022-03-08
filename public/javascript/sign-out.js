async function signOut() {
    const response = await fetch("/api/users/sign-out", {
        method: "POST",
        headers: { "Content-Type": "application/json"}
    });
    if(response.ok) {
        document.location.replace("/");
    }
}

document.querySelector(".signOut").addEventListener("click", signOut);