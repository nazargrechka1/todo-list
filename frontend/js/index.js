document.body.addEventListener("htmx:afterSwap", function (evt) {
  import("./register.js");
  import("./login.js");
  console.log("✅ index.js завантажився");

});
