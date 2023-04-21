import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../components/constants';

const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="job"]');
const userNameElement = document.querySelector('.profile__title');
const userJobElement = document.querySelector('.profile__subtitle');
const imagePopup = document.querySelector('#image-popup');
const openImage = document.querySelector('.popup-image__card');
const openTitle = document.querySelector('.popup-image__title');
const addPopup = document.querySelector('#add-popup');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('#edit-popup');
const editButton = document.querySelector('.profile__edit-button');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error_visible',
  submitButtonSelector: '.popup__save',
  invalidInputClass: 'popup__input_invalid'
}

const validatorEditProfile = new FormValidator(config, document.forms["edit-profile-form"]);
const validatorAddCard = new FormValidator(config, document.forms["add-element-form"]);
const popupImage = new PopupWithImage(imagePopup);
const popupEditProfile = new PopupWithForm(editPopup, handleProfileFormSubmit);
const popupAddCard = new PopupWithForm(addPopup, handleElementFormSubmit);
const newUserInfo = new UserInfo({
  userNameSelector: userNameElement,    
  userJobSelector: userJobElement
});
const createCard = (item) => {  
  const addCard = new Card(item, '.element-template', popupImage.open)
  const cardElement = addCard.generateCard();
  return cardElement
}
const newCards = new Section({
  items: initialCards,
  renderer: (item) => {
    newCards.addItem(createCard(item));
  },
},
'.elements'
);

newCards.renderItems();

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

function handleProfileFormSubmit (values) {
    newUserInfo.setUserInfo(values['name'], values['job'])
}

function handleElementFormSubmit (values) {
  newCards.addItem(
    createCard({
      name: values.place[0].toUpperCase() + values.place.slice(1), 
      link: values.link
    })
  );
}

editButton.addEventListener('click', function() { 
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
  popupEditProfile.open()  
  validatorEditProfile.resetValidation();
}) 


addButton.addEventListener('click', function() {
  popupAddCard.open(); 
}) 
  
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners(); 