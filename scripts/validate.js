const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input_type_error_',
  activeErrorClass: 'popup__input-error_visible',
  submitButtonSelector: '.popup__save'
}

const showInputError = (errorTextElement, validationMessage, activeErrorClass) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass);
}

const hideInputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.textContent = '';
  errorTextElement.classList.remove(activeErrorClass);
}

const disableButton = (submitButton) => {
  submitButton.disabled = true;
}

const enableButton = (submitButton) => {
  submitButton.disabled = false;
}

const checkInputValidity = (input, errorClassTemplate, activeErrorClass) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
  if(!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass);
    input.classList.add('popup__input_invalid');
  } else {
    hideInputError(errorTextElement);
    input.classList.remove('popup__input_invalid');
  }
}

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid);
}

const toggleButtonState = (submitButton, inputList) => {
  if(!hasInvalidInput(inputList)) {
    enableButton(submitButton);
  } else {
    disableButton(submitButton);
  }
}

const setEventListeners = (form, inputList, errorClassTemplate, activeErrorClass, submitButton) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(input, errorClassTemplate, activeErrorClass);
      toggleButtonState(submitButton, inputList);
    })
  });
}

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector)
    setEventListeners(form, inputList, config.errorClassTemplate, config.activeErrorClass, submitButton);
  })
}

enableValidation(config);