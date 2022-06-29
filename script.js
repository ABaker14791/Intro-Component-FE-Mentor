const firstnameEl = document.querySelector("#firstname");
const lastnameEl = document.querySelector("#lastname");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");

const form = document.querySelector("#signup");

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate forms
  let isFirstNameValid = checkFirstname(),
    isLastNameValid = checkLastname(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();

  let isFormValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

// Utility functions
const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

// Error function
const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

// Success function
const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

// Validate First Name field
const checkFirstname = () => {
  let valid = false;

  const firstname = firstnameEl.value.trim();

  if (!isRequired(firstname)) {
    showError(firstnameEl, "Last Name cannot be empty");
  } else {
    showSuccess(firstnameEl);
    valid = true;
  }
  return valid;
};

//  Validate Last Name field
const checkLastname = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const lastname = lastnameEl.value.trim();

  if (!isRequired(lastname)) {
    showError(lastnameEl, "Last Name cannot be empty");
  } else {
    showSuccess(lastnameEl);
    valid = true;
  }
  return valid;
};

// Validate Email field
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be empty");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Looks like this is not an email");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be empty");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};
