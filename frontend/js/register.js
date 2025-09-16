document.body.addEventListener("htmx:load", function () {
  const form = document.getElementById("register-form");

  if (!form) {
    console.error("Форма #register-form не знайдена!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = {
      username: formData.get("nickname"), 
      email: formData.get("email"),
      password: formData.get("password"),
    }
    
    delete user.submit;

    console.log("Об'єкт користувача, який відправляється:", user);

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await res.json();
      console.log("Відповідь сервера:", result);

      if (res.ok) {
        alert(result.message);
      } else {
        alert(result.error || "Помилка при реєстрації");
      }
    } catch (err) {
      console.error("Помилка при відправці запиту:", err);
      alert("Не вдалося підключитися до сервера.");
    }
  }, { once: true });
});
