
initLoginForm();

function initLoginForm() {
    const form = document.getElementById("login-form");

    if (!form) {
        return;
    }
    if (form.dataset.listenerAttached) return;
    form.dataset.listenerAttached = "true";

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");

       
        const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        
        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        const user = { email, password };

        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const result = await res.json();

            if (res.ok) {
                alert(result.message || "Login successful!");
                
                if (result.token) {
                    localStorage.setItem("token", result.token);
                }
                
                window.location.href = "index.html";
            } else {
                alert(result.error || result.message || "Помилка при вході");
            }
        } catch (err) {
            alert("Не вдалося підключитися до сервера.");
        }
    });
}