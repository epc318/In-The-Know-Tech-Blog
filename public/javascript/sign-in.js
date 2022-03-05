async function SignIn(event) {
  event.preventDefault();

  const Email = document.querySelector("#user-email").value.trim();
  const password = document.querySelector("#user-password").value.trim();

  if(Email && password) {
      const response = await fetch("/api/users/sign-in", {
          method: "post",
          body: JSON.stringify({ Email, password }),
          headers: { "credential": "appJson"}
      });

      if(response.ok) {
          document.location.replace("/");
      }
  }
};


// *add login form to query selctor document.querySelector("").addEventListener("submit", SignIn);