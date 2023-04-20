import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

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
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Фотография хребет абишира-ахуба архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Фотография реки среди Уральских гор'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Фотография жилого района с высокоэтажками'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Фотография Камчатских гор'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Фотография рельсы уходят за горизонт'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Фотография горного побережья байкала'
  }
];
export default initialCards;
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error_visible',
  submitButtonSelector: '.popup__save',
  invalidInputClass: 'popup__input_invalid'
}

const formEdit = new FormValidator(config, document.forms["edit-profile-form"]);
const formCard = new FormValidator(config, document.forms["add-element-form"]);
const newEditPopup = new Popup(editPopup);
const newAddPopup = new Popup(addPopup);
const handleCardClick = new PopupWithImage(imagePopup, openImage, openTitle);
const submitEditForm = new PopupWithForm(editPopup, handleProfileFormSubmit);
const submitAddForm = new PopupWithForm(addPopup, handleElementFormSubmit);
const newUserInfo = new UserInfo({
  userNameSelector: userNameElement,    
  userJobSelector: userJobElement
});
const createCard = (item) => {  
  const addCard = new Card(item, '.element-template', handleCardClick.open)
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

newCards.renderItem();

formEdit.enableValidation();
formCard.enableValidation();

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


submitEditForm.setEventListeners();
submitAddForm.setEventListeners();

editButton.addEventListener('click', function() { 
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
  newEditPopup.open()
  newEditPopup.setEventListeners()
  formEdit.resetValidation();
}) 


addButton.addEventListener('click', function() {
  newAddPopup.open();
  newAddPopup.setEventListeners();
}) 
  

  