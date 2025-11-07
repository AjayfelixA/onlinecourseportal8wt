const API_BASE = "http://localhost:5000/api/auth";

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    let res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    res = await res.json();

    if (res.success) {
      alert("Login successful");
      localStorage.setItem("user", JSON.stringify(res.user));
      window.location.href = "index.html";
    } else {
      alert(res.message);
    }
  } catch (err) {
    alert("Server not reachable");
  }
}
document.getElementById("loginBtn").onclick = login;
