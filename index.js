const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__esc');
const formElement = document.querySelector('.popup__form');
const editPopup = document.querySelector ('.popup');

const popupInputUserName = document.querySelector('.popup__input_name');
const popupInputJob = document.querySelector('.popup__input_about');

const userNameElement = document.querySelector('.profile__title');
const userJobElement = document.querySelector('.profile__subtitle');


function handleFormOpen(evt) {
  editPopup.classList.add('popup_opened');
  popupInputUserName.value = userNameElement.textContent;
  popupInputJob.value = userJobElement.textContent;
};

function handleFormClose(evt) {
  editPopup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = popupInputUserName.value;
  userJobElement.textContent = popupInputJob.value;
  handleFormClose();
};

editProfileButton.addEventListener('click', handleFormOpen);
closePopupButton.addEventListener ('click', handleFormClose);
formElement.addEventListener('submit',handleFormSubmit);