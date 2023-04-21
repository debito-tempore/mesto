import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupElement, formSubmit) {    
    super(popupElement);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;   
    });
    return this._inputValues;    
  }
  

  close() {
    super.close();
    this._formElement.reset();
  }


  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit',  (evt) => {
    evt.preventDefault();
    this._formSubmit(this._getInputValues());
    this.close();
    });
  }
}