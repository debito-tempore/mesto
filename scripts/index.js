// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('[name="name"]');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('[name="job"]');// Воспользуйтесь инструментом .querySelector()
// Выберите элементы, куда должны быть вставлены значения полей
let userNameElement = document.querySelector('.profile__title');
let userJobElement = document.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__esc');


function openedPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}
function closedPopup() {
  popup.classList.remove('popup_opened');
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
  let userName = nameInput.value;
  let userJob = jobInput.value;
    // Вставьте новые значения с помощью textContent
  userNameElement.textContent = userName;
  userJobElement.textContent = userJob;   
  closedPopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
openButton.addEventListener('click', openedPopup);
closeButton.addEventListener('click', closedPopup);