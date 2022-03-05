async function signOut() {
    const response = await fetch("/api/users/sign-out", {
        method: "post",
        headers: { "credential": "appJson"}
    });
    if(response.ok) {
        document.location.replace("/");
    }
}

// *add logout form to query selctor document.querySelector("").addEventListener("click", signOut);