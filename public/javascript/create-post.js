async function createPost(event) {
    event.preventDefault();

    const postName = document.querySelector("#post-name").value;

    const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ postName }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(response.ok) {
        document.location.replace("/dashboard");
    }
};


document.querySelector(".newPost").addEventListener("submit", createPost);