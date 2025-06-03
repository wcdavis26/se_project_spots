const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("modal__input-type-error_active");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__error_active");
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("modal__input-type-error_active");
  errorElement.classList.remove("modal__error_active");
  errorElement.textContent = "";
};
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputs) => {
  return Array.from(inputs).some((input) => !input.validity.valid);
};
const toggleButtonState = (inputs, buttonElement) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add("modal__submit-btn_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("modal__submit-btn_disabled");
    buttonElement.disabled = false;
  }
};

// Function to set event listeners for each form
const setEventListeners = (formElement, config) => {
  const inputs = formElement.querySelectorAll(".modal__input");
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, buttonElement);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input);
      toggleButtonState(inputs, buttonElement);
    });
  });
};
const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};
// Enable validation for all forms
enableValidation(settings);
