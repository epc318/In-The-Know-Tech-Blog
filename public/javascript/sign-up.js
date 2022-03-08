async function signUp(event) {
  event.preventDefault();

  const pseudonym = document.querySelector("#pseudonym-signup").value.trim();
  const Email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if(pseudonym && Email && password) {
      const response = await fetch("/api/users", {
          method: "post",
          body: JSON.stringify({ pseudonym, Email, password }),
          headers: { "credential": "appJson"}
      })
      if(response.ok) {
          console.log("Account Successfully Created!");
      }
  }
}


document.querySelector(".formSignUp").addEventListener("submit", signUp);