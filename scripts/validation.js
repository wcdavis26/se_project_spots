export const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  config
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorActiveClass);
};
export const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorActiveClass);
  errorElement.textContent = "";
};
export const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
export function resetValidation(formElement, config) {
  const inputs = formElement.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => {
    hideInputError(formElement, input, config);
  });

  const submitButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, submitButton, config);
}

export const hasInvalidInput = (inputs) => {
  return Array.from(inputs).some((input) => !input.validity.valid);
};
export const toggleButtonState = (inputs, buttonElement, config) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Function to set event listeners for each form
export const setEventListeners = (formElement, config) => {
  const inputs = formElement.querySelectorAll(config.inputSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, buttonElement, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, config);
      toggleButtonState(inputs, buttonElement, config);
    });
  });
};
export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
  errorActiveClass: "modal__error_active",
};
// Enable validation for all forms
enableValidation(settings);
