document.body.addEventListener("htmx:load", function (evt) {
  initRegisterForm();
});

function initRegisterForm() {
  const form = document.getElementById("register-form");

  if (!form) {
    console.error("❌ Форма #register-form не знайдена після htmx:afterSwap");
    return;
  }
  if (form.dataset.listenerAttached) return;
  form.dataset.listenerAttached = "true";
  console.log("✅ Форма знайдена, навішуємо submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const user = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("📤 Відправляю користувача:", user);

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await res.json();
      console.log("📥 Відповідь сервера:", result);

      if (res.ok) {
        alert(result.message);
      } else {
        alert(result.error || "Помилка при реєстрації");
      }
    } catch (err) {
      console.error("❌ Помилка при відправці:", err);
      alert("Не вдалося підключитися до сервера.");
    }
  });
}
