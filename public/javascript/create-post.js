async function createPost(event) {
    event.preventDefault();

    const postName = document.querySelector("#post-name").value;

    const response = await fetch("/api/posts", {
        method: "post",
        body: JSON.stringify({ postName }),
        headers: {
            "credential": "appJson"
        }
    });
    if(response.ok) {
        document.location.replace("/dashboard");
    }
};


document.querySelector(".newPost").addEventListener("submit", createPost);