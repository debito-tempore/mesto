const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__esc');
const formElement = document.querySelector('.popup__form');
const editPopup = document.querySelector ('.popup');

const popupInputUserName = document.querySelector('.popup__input_name');
const popupInput0ccupation = document.querySelector('.popup__input_about');

const userNameElement = document.querySelector('.profile__title');
const user0ccupationElement = document.querySelector('.profile__subtitle');


function handleFormOpen(evt) {
  editPopup.classList.add('popup__opened');
  popupInputUserName.value = userNameElement.textContent;
  popupInput0ccupation.value = user0ccupationElement.textContent;
};

function handleFormClose(evt) {
  editPopup.classList.remove('popup__opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = popupInputUserName.value;
  user0ccupationElement.textContent = popupInput0ccupation.value;
  handleFormClose();
};

editProfileButton.addEventListener('click', handleFormOpen);
closePopupButton.addEventListener ('click', handleFormClose);
formElement.addEventListener('submit',handleFormSubmit);