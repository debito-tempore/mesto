const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error_visible',
  submitButtonSelector: '.popup__save',
  invalidInputClass: 'popup__input_invalid'
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

const checkInputValidity = (input, errorClassTemplate, activeErrorClass, invalidInputClass) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
  if(!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass);
    input.classList.add(invalidInputClass);
  } else {
    hideInputError(errorTextElement);
    input.classList.remove(invalidInputClass);
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

const setEventListeners = (formElement, inputList, errorClassTemplate, activeErrorClass, submitButton, invalidInputClass) => {
  formElement.addEventListener('reset', () => {
    disableButton(submitButton)
  });
  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(input, errorClassTemplate, activeErrorClass, invalidInputClass);
      toggleButtonState(submitButton, inputList);
    })
  });
}

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector)
    setEventListeners(form, inputList, config.errorClassTemplate, config.activeErrorClass, submitButton, config.invalidInputClass);
  })
}

enableValidation(config);