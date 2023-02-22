const likes = document.querySelectorAll('.element__button-like');

likes.forEach(function(like) {
  like.addEventListener("click", function() {
    if (like.classList.contains('element__button-like_active')) {
      like.classList.remove('element__button-like_active');
    } else {
      like.classList.add('element__button-like_active');
    }
  });
});


// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_about');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
  let userName = nameInput.value;
  let userJob = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
  let userNameElement = document.querySelector('.profile__title');
  let userJobElement = document.querySelector('.profile__subtitle');
    // Вставьте новые значения с помощью textContent
  userNameElement.textContent = userName;
  userJobElement.textContent = userJob;   
  popupClosed();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 


let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit-button');
function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__subtitle').textContent;
}
openButton.addEventListener('click', popupOpen);

let closeButton = document.querySelector('.popup__esc');
function popupClosed() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', popupClosed);