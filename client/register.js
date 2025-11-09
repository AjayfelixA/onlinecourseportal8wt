const API_BASE = "https://onlinecourse-backend-ccmw.onrender.com/api";

async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    let res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password }),
    });

    res = await res.json();

    if (res.success) {
      alert("User registered!");
      window.location.href = "login.html";
    } else {
      alert(res.message);
    }
  } catch (err) {
    alert("Server not reachable");
  }
}
document.getElementById("registerBtn").addEventListener("click", register);