const formElement = document.querySelector('[name = "edit-profile-form"]');
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="job"]');
const userNameElement = document.querySelector('.profile__title');
const userJobElement = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const closeEditButton = document.querySelector('#edit-esc');
const elements = document.querySelector('.elements');
const imagePopup = document.querySelector('#image-popup');
const openImage = document.querySelector('.popup-image__card');
const openTitle = document.querySelector('.popup-image__title');
const closeImageButton = document.querySelector('#image-esc');
const addPopup = document.querySelector('#add-popup');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('#edit-popup');
const editButton = document.querySelector('.profile__edit-button');
const closeAddButton = document.querySelector('#add-esc');
const saveEditButton = document.querySelector('#edit-save');
const saveAddButton = document.querySelector('#add-save');
const formAddElement = document.querySelector('[name="add-element-form"]');
const placeInput = document.querySelector('[name="place"]');
const linkInput = document.querySelector('[name="link"]');
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
const createCard = (card) => {
  const newCard = document.querySelector('.element-template').content.cloneNode(true);
  const cardPlace = newCard.querySelector('.element__title');
  const cardLink = newCard.querySelector('.element__image');
  cardPlace.textContent = card.name;
  cardLink.setAttribute('src', card.link);
  cardLink.setAttribute('style', 'cursor: pointer;');
  cardLink.setAttribute('alt', card.alt);
  elements.prepend(newCard);
  cardLink.addEventListener('click', function() {  
    openTitle.textContent = card.name;
    openImage.setAttribute('src', card.link);
    openedImagePopup();
  })
  const openedImagePopup = () => {
    imagePopup.classList.add('popup_opened'); 
  }
  cardLink.addEventListener('click', openedImagePopup);
  const closedImagePopup = () => {
    imagePopup.classList.remove('popup_opened');
  }
  closeImageButton.addEventListener('click', closedImagePopup);
  const trashButton = document.querySelector('.element__button-delete');
  trashButton.addEventListener('click', function() {
    const delCard = trashButton.closest('.element');
    delCard.remove();
  });
  const like = document.querySelector('.element__button-like');
  like.addEventListener("click", function() {
    if (like.classList.contains('element__button-like_active')) {
      like.classList.remove('element__button-like_active');
    } else {
      like.classList.add('element__button-like_active');
    }
  });
  return newCard;
}
initialCards.forEach(createCard);

function handleAddFormSubmit (evt) { 
  evt.preventDefault();
  const userPlace = placeInput.value;
  const userLink = linkInput.value;
  const userPlaceUp = userPlace[0].toUpperCase() + userPlace.slice(1);
  userCard = {
    name: userPlaceUp,
    link: userLink,
    alt: userPlace
  }
  createCard(userCard);
  const placeInputElement = document.querySelector('.element__title');
  const linkInputElement = document.querySelector('.element__image');
  placeInputElement.textContent = userPlaceUp;
  linkInputElement.setAttribute('src', userLink);
  evt.target.reset();  
  closedPopup(closeAddButton, addPopup);
}

function openedPopup(button, elem) {
  elem.classList.add('popup_opened');
}
function closedPopup(button, elem) {
  elem.classList.remove('popup_opened');
}
addButton.addEventListener('click', function() {
  openedPopup(addButton, addPopup);
});
closeAddButton.addEventListener('click', function() {
  closedPopup(closeAddButton, addPopup);
});
editButton.addEventListener('click', function() {
  openedPopup(editButton, editPopup);
});
closeEditButton.addEventListener('click', function() {
  closedPopup(closeEditButton, editPopup);
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  const userName = nameInput.value;
  const userJob = jobInput.value;
  userNameElement.textContent = userName;
  userJobElement.textContent = userJob;   
  closedPopup(saveEditButton, editPopup);
}

formAddElement.addEventListener('submit', handleAddFormSubmit);
formElement.addEventListener('submit', handleFormSubmit);