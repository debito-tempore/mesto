export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }


  close() {
    this._popupElement.classList.remove('popup_opened');      
    document.removeEventListener('keyup', this._handleEscClose);
  }

        
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }


  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__esc')) {
        this.close();
      }
    });
  }
}