export class FormValidator {
  constructor(setting, form) {
    this._setting = setting;
    this._form = form;
    this._inputList = this._form.querySelectorAll(this._setting.inputSelector);
    this._submitButton = this._form.querySelector(this._setting.submitButtonSelector)
  }


_showInputError = (errorTextElement, validationMessage, activeErrorClass) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass);
}
  
hideInputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.textContent = '';
  errorTextElement.classList.remove(activeErrorClass);
}
  
_disableButton = (submitButton) => {
  submitButton.disabled = true;
}
  
_enableButton = (submitButton) => {
  submitButton.disabled = false;
}
  
_hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid);
}

_checkInputValidity() {
  this._inputList.forEach((input) => {
    const errorTextElement = this._form.querySelector(`${this._setting.errorClassTemplate}${input.name}`);
    if(!input.validity.valid) {
      this._showInputError(errorTextElement, input.validationMessage, this._setting.activeErrorClass);
      input.classList.add(this._setting.invalidInputClass);
    } else {
      this.hideInputError(errorTextElement);
      input.classList.remove(this._setting.invalidInputClass);
    }
  })
}

_toggleButtonState() {
  if(!this._hasInvalidInput(this._inputList)) {
    this._enableButton(this._submitButton);
  } else {
    this._disableButton(this._submitButton);
  }
}

_setEventListeners() {
  this._form.addEventListener('reset', () => {
    this._disableButton(this._submitButton);
  });
  this._inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      this._checkInputValidity(input, this._setting.errorClassTemplate, this._setting.activeErrorClass, this._setting.invalidInputClass);
      this._toggleButtonState(this._submitButton, this._inputList);
    })
  });
}

enableValidation() {
    this._setEventListeners();
  }
}