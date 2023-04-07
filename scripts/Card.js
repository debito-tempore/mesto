export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._element = undefined;
  }
  
  _getTemplate () {
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }
    
  _handleCardLike() {
    this.likeButton.classList.toggle('element__button-like_active');
  }
  
  _handleCardDelete() {
    this._element.remove();
  }
  
  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._handleCardLike();
    })
    this.trashButton.addEventListener('click', () => {
      this._handleCardDelete();
    })
    this.cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }
  
  generateCard () {
    this._element = this._getTemplate();
    this.cardImage = this._element.querySelector('.element__image');
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this.likeButton = this._element.querySelector('.element__button-like');
    this.trashButton = this._element.querySelector('.element__button-delete');
    this._setEventListeners();
  
    return this._element;
  }
  
}