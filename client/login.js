const API_BASE = "https://onlinecourse-backend-ccmw.onrender.com/api/auth";

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password");
    return;
  }

  try {
    let res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    res = await res.json();

    if (res.success) {
      alert("✅ Login successful");
      localStorage.setItem("user", JSON.stringify(res.user));
      window.location.href = "index.html";
    } else {
      alert(res.message || "Login failed");
    }
  } catch (err) {
    alert("❌ Server not reachable");
    console.log(err);
  }
}

// Attach button click
document.getElementById("loginBtn").addEventListener("click", login);
