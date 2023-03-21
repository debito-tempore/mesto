const profileForm = document.forms["edit-profile-form"];
const cardForm = document.forms["add-element-form"];
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="job"]');
const userNameElement = document.querySelector('.profile__title');
const userJobElement = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const imagePopup = document.querySelector('#image-popup');
const openImage = document.querySelector('.popup-image__card');
const openTitle = document.querySelector('.popup-image__title');
const addPopup = document.querySelector('#add-popup');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('#edit-popup');
const editButton = document.querySelector('.profile__edit-button');
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

const getCard = (card) => {
  const newCard = document.querySelector('.element-template').content.cloneNode(true);
  const cardPlace = newCard.querySelector('.element__title');
  const cardImage = newCard.querySelector('.element__image');
  cardPlace.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.alt);

  cardImage.addEventListener('click', function() {  
    openTitle.textContent = card.name;
    openImage.setAttribute('src', card.link);
    openImage.setAttribute('alt', card.alt);
    openPopup(imagePopup);
  })
 
  const trashButton = newCard.querySelector('.element__button-delete');
  trashButton.addEventListener('click', function() {
    const deleteCard = trashButton.closest('.element');
    deleteCard.remove();
  });

  const like = newCard.querySelector('.element__button-like');
  like.addEventListener("click", function() {
    like.classList.toggle('element__button-like_active');
  });
  
  return newCard;
}

const createCard = (card) => {
  const addCard = getCard(card)
  elements.prepend(addCard);
}

initialCards.forEach(createCard);


function handleElementFormSubmit (evt) {
  evt.preventDefault();
  const userPlace = placeInput.value;
  const userLink = linkInput.value;
  const userPlaceUp = userPlace[0].toUpperCase() + userPlace.slice(1);
  const userCard = {
    name: userPlaceUp,
    link: userLink,
    alt: userPlace
  }
  createCard(userCard);
  evt.target.reset();
  closePopup(addPopup);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  const userName = nameInput.value;
  const userJob = jobInput.value;
  userNameElement.textContent = userName;
  userJobElement.textContent = userJob;
  closePopup(editPopup);
}

function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

function closePopupEscape (evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    if (popupOpen !==  null) {
      closePopup(popupOpen);
    }
  };
}

function closePopupOverlay (evt) {
  const popups = document.querySelectorAll('.popup')
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__esc')) {
        closePopup(popup)
      }
    })
  })
}

addButton.addEventListener('click', function() {
  openPopup(addPopup);
});

editButton.addEventListener('click', function() {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
  openPopup(editPopup);
  const inputs = editPopup.querySelectorAll('.popup__input');
  const savePopupButton = editPopup.querySelector('.popup__save');  
  if (savePopupButton !== null) {
    savePopupButton.disabled = false;
  }
  inputs.forEach((input) => {
    const errorTextElement = editPopup.querySelector(`${config.errorClassTemplate}${input.name}`);
    hideInputError(errorTextElement, config.activeErrorClass);
    input.classList.remove(config.invalidInputClass);
    if (!input.validity.valid) {
      savePopupButton.disabled = true;
    }
  })  
});

cardForm.addEventListener('submit', handleElementFormSubmit, cardForm.reset);
profileForm.addEventListener('submit', handleProfileFormSubmit);
document.addEventListener('click', closePopupOverlay);