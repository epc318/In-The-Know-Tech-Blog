async function comment(event) {
    event.preventDefault();
    const comment_input = document.querySelector("").value.trim();
    const post_id = window.location.toString().split("/")
    [
        window.location.toString().split("/").length - 1
    ];

    if(comment_input) {
        const response = await fetch("/api/comments", {
            method: "post",
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

//*add comment form to query selctor document.querySelector("").addEventListener("submit", comment);