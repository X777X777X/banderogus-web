const form = document.querySelector("#form");
const launchBtn = document.querySelector("#launch-btn");
const goToFormButton = document.querySelector("#go-to-form-btn");
const userEmailField = document.querySelector("#user-email");

goToFormButton.addEventListener("click", function (e) {
  e.preventDefault();
  form.scrollIntoView();
});

function clearFormFields() {
  const modalFields = form.querySelectorAll("input");

  modalFields.forEach((field) => {
    field.value = "";
  });
}

function showGooseAnim() {
  const targetContainer = document.querySelector("#form");
  const gusImage = document.createElement("img");
  gusImage.setAttribute("src", "./img/gus-anim.gif");
  gusImage.classList.add("gus-anim");

  targetContainer.appendChild(gusImage);

  setTimeout(() => {
    targetContainer.removeChild(gusImage);
  }, 2000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  launchBtn.setAttribute("disabled", true);

  if (userEmailField?.value?.length > 100) {
    return;
  }

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      showGooseAnim();

      setTimeout(() => {
        launchBtn.removeAttribute("disabled");
        clearFormFields();
      }, 2000);
    })
    .catch((error) => {
      console.log("Sending form failed");
    });
});

launchBtn.addEventListener("click", onClick);

function onClick() {
  console.log("Это клик");
}
