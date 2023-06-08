const first_name_input = document.querySelector("[data-name]");
const last_name_input = document.querySelector("[data-lastname]");
const password_input = document.querySelector("[data-password]");
const email_input = document.querySelector("[data-email]");

const err_msg = Array.from(document.querySelectorAll("[data-error]"));
const submit_btn = document.querySelector("[data-submit]");

const error_messages = {
  name_error: document.querySelector("[data-name-error]"),
  last_name_error: document.querySelector("[data-lastname-error]"),
  email_error: document.querySelector("[data-email-error]"),
  password_error: document.querySelector("[data-password-error]"),
};

let tried_submit = false;

function validateName() {
  const first_name = first_name_input.value;
  if (first_name) return true;

  if (!first_name) {
    showError(error_messages.name_error);
    return false;
  }
}

function validateLastName() {
  const last_name = last_name_input.value;

  if (last_name) return true;

  if (!last_name) {
    showError(error_messages.last_name_error);
    return false;
  }
}

function validateEmail(show) {
  const email = email_input.value.trim();
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email) {
    showError(error_messages.email_error);
    return false;
  }

  if (regex.test(email)) {
    clearError(error_messages.email_error);
    return true;
  }

  if (!regex.test(email) && show) {
    showError(error_messages.email_error);
    return false;
  }
}

function validatePassword() {
  const password = password_input.value.trim();
  const lower = document.querySelector(".lower");
  const upper = document.querySelector(".upper");
  const number = document.querySelector(".number");
  const symbol = document.querySelector(".symbol");
  const length = document.querySelector(".length");

  const hasLowercase = /[a-z]/.test(password)
    ? criteriaCorrect(lower)
    : criteriaError(lower);
  const hasUppercase = /[A-Z]/.test(password)
    ? criteriaCorrect(upper)
    : criteriaError(upper);
  const hasNumber = /[0-9]/.test(password)
    ? criteriaCorrect(number)
    : criteriaError(number);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    ? criteriaCorrect(symbol)
    : criteriaError(symbol);
  const validLength =
    password.length >= 8 && password.length <= 20
      ? criteriaCorrect(length)
      : criteriaError(length);

  if (
    !hasUppercase ||
    !hasLowercase ||
    !hasNumber ||
    !hasSpecialChar ||
    !validLength
  ) {
    showError(error_messages.password_error);
    return false;
  }

  clearError(error_messages.password_error);
  return true;
}

function showError(error_elem) {
  const input_field = error_elem.parentElement.querySelector("input");
  input_field.classList.add("error");
  input_field.classList.remove("correct");
  error_elem.classList.add("open");
}

function clearError(error_elem) {
  const input_field = error_elem.parentElement.querySelector("input");
  input_field.classList.remove("error");
  input_field.classList.add("correct");
  error_elem.classList.remove("open");
}

function criteriaError(elem) {
  elem.classList.remove("correct");
  elem.classList.add("error");
  return false;
}
function criteriaCorrect(elem) {
  elem.classList.remove("error");
  elem.classList.add("correct");
  return true;
}

function handleSubmitClick(e) {
  tried_submit = true;
  const validName = validateName();
  const validLastName = validateLastName();
  const validEmail = validateEmail(true);
  const validPassword = validatePassword();

  if (validName && validLastName && validEmail && validPassword) {
    return;
  } else {
    e.preventDefault();
  }
}

function handleEmailClick() {
  if (tried_submit) {
    validateEmail(true);
  } else {
    validateEmail(false);
  }
}

function handleNameClick() {
  if (validateName()) {
    clearError(error_messages.name_error);
  }
}
function handleLastNameClick() {
  if (validateName()) {
    clearError(error_messages.last_name_error);
  }
}

first_name_input.addEventListener("input", () => handleNameClick());
last_name_input.addEventListener("input", () => handleLastNameClick());
email_input.addEventListener("input", () => handleEmailClick());
password_input.addEventListener("input", () => validatePassword());
submit_btn.addEventListener("click", (e) => handleSubmitClick(e));
