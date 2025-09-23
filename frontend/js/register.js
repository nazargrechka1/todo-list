initRegisterForm();

function initRegisterForm() {
  const form = document.getElementById("register-form");
  const passwordInput = document.getElementById("password");
  const pswRepeatInput = document.getElementById("psw_repeat");
  const formSubmitBlock = document.getElementById("buttonsBlock");
  const actionBtnsBlock = document.createElement('div');
  actionBtnsBlock.classList.add('action-buttons_block');
  const passwordRepeatInput = document.getElementById("psw_repeat");
  if (passwordRepeatInput && passwordRepeatInput.parentNode) {
    passwordRepeatInput.parentNode.insertBefore(actionBtnsBlock, formSubmitBlock);
  } else {
    formSubmitBlock.appendChild(actionBtnsBlock);
  }

  if (
    passwordInput &&
    pswRepeatInput &&
    !document.getElementById("generate-password-btn")
  ) {
    const genBtn = document.createElement("button");
    genBtn.type = "button";
    genBtn.id = "generate-password-btn";
    genBtn.textContent = "Generate Password";
    genBtn.classList.add("password-action-btn");
    actionBtnsBlock.appendChild(genBtn);

    genBtn.addEventListener("click", () => {
      const generated = generatePassword();
      passwordInput.value = generated;
      pswRepeatInput.value = generated;
    });
  }

  if (passwordInput && !document.getElementById("display-password-btn")) {
    const dispBtn = document.createElement("button");
    dispBtn.type = "button";
    dispBtn.id = "display-password-btn";
    dispBtn.textContent = "Show/Hide Password";
    dispBtn.classList.add("password-action-btn");
    actionBtnsBlock.appendChild(dispBtn);

    dispBtn.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      pswRepeatInput.type = type;
    });
  }

  function generatePassword() {
    const length = 12;
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const all = upper + lower + digits;
    let password = "";
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    for (let i = 3; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = passwordInput.value;
    const pswRepeat = pswRepeatInput.value;

    const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== pswRepeat) {
      alert("Passwords do not match.");
      return;
    }

    // Password validation
    const passwordValid =
      password.length >= 10 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password);
    if (!passwordValid) {
      alert(
        "Password must be at least 10 characters long and include uppercase, lowercase letters, and digits."
      );
      return;
    }

    const user = {
      username,
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message);
        window.location.href = "index.html";
      } else {
        alert(result.error || "Помилка при реєстрації");
      }
    } catch (err) {
      alert("Не вдалося підключитися до сервера.");
    }
  });
}
