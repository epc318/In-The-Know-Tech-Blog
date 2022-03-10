async function comment(event) {
    event.preventDefault();
    const comment_input = document.querySelector("#comment").value.trim();
    const post_id = window.location.toString().split("/")
    [
        window.location.toString().split("/").length - 1
    ];

    if(comment_input) {
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                post_id,
                comment_input
            }),
            headers: {
                "credential": "appJson"
            }
        });

        if(response.ok) {
            document.location.reload();
        }
    }
}

document.querySelector(".newComment").addEventListener("submit", comment);