async function deletePost(event) {
    event.preventDefault();

    const ID = window.location.toString().split("/")
    [
      window.location.toString().split("/").length - 1
    ];

    const respond = await fetch(`/api/posts/${ID}`, {
        method: "delete"
    });
    if (respond.ok) {
        document.location.replace("/dashboard/");
    }
  }

 // *add delete form/class to query selctor document.querySelector("").addEventListener("click", deletePost);