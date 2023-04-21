import {Popup} from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(popupElement) {
      super(popupElement);
      this._imageSelector = this._popupElement.querySelector('.popup-image__card');
      this._titleSelector = this._popupElement.querySelector('.popup-image__title');
    }
  
    open = (name, link) => {
      super.open()
      this._imageSelector.setAttribute('src', link);
      this._titleSelector.textContent = name;
      this._imageSelector.setAttribute('alt', name);
      super.setEventListeners()      
      }
  }