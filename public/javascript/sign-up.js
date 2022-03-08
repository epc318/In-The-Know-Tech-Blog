async function signUp(event) {
  event.preventDefault();

  const pseudonym = document.querySelector("#pseudonym-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if(pseudonym && email && password) {
      const response = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ pseudonym, email, password }),
          headers: { "Content-Type": "application/json"}
      })
      if(response.ok) {
        alert("Account Successfully Created!");
      }  
      else{
        alert(response.statusText);
    }
  }
}


document.querySelector(".formSignUp").addEventListener("submit", signUp);