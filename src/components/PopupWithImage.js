import {Popup} from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(popupSelector, imageSelector, titleSelector) {
      super(popupSelector);
      this.imageSelector = imageSelector;
      this.titleSelector = titleSelector
    }
  
    open = (name, link) => {
      super.open()
      this.imageSelector.setAttribute('src', link);
      this.titleSelector.textContent = name;
      this.imageSelector.setAttribute('alt', name);
      super.setEventListeners()      
      }
  }