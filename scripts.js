let popupReminderElement = document.querySelector(".popup_reminder");
let popupReminderContainer = popupReminderElement.querySelector(".popup__container_reminder");
let popupReminderCloseButton = popupReminderElement.querySelector(".popup__container__close-button");


function popupReminderOpen() {
  popupReminderElement.classList.add("popup_opened");
  popupReminderContainer.classList.add("popup__container_opened");
}

function popupReminderClose() {
  popupReminderElement.classList.remove("popup_opened");
  popupReminderContainer.classList.remove("popup__container_opened");
}

popupReminderCloseButton.addEventListener("click", function(event) {
  popupReminderClose();
  event.stopPropagation();
})

setTimeout(popupReminderOpen, 200);


//GALLERY

// Gallery Control
let popupGallery = document.querySelector(".popup_gallery");
let popupGalleryImage = popupGallery.querySelector(".popup__image");

let popupGalleryCloseButton = popupGallery.querySelector(".popup__close-button");
let popupGalleryNextButton = popupGallery.querySelector(".popup__next-button");
let popupGalleryPrevButton = popupGallery.querySelector(".popup__prev-button");


let imageArray = Array.from(document.querySelectorAll(".card__image"));

let currentImage = document.querySelector(".card__image");
let currentImageLink = currentImage.src;

let pos = 0

function openPopupGallery() {
  popupGallery.classList.add("popup_opened");
  popupGalleryImage.classList.add("popup__image_opened");
}

function closePopupGallery() {
  popupGallery.classList.remove("popup_opened");
  popupGalleryImage.classList.remove("popup__image_opened");
}

function switchNext() {
  ++pos;
  currentImage = imageArray[pos];
  currentImageLink = currentImage.src;
}

function switchPrev() {
  --pos;
  currentImage = imageArray[pos];
  currentImageLink = currentImage.src;
}


function switchNavigationButtons() {
  if (pos == 0) {
      popupGalleryPrevButton.classList.add("popup__prev-button_disabled");
  } else {
      popupGalleryPrevButton.classList.remove("popup__prev-button_disabled");
  }
  if (pos == imageArray.length - 1) {
      popupGalleryNextButton.classList.add("popup__next-button_disabled");
  } else {
      popupGalleryNextButton.classList.remove("popup__next-button_disabled");
  }
}

function setImage() {
  popupGalleryImage.src = currentImageLink;
}

imageArray.forEach(function (item) {
  item.addEventListener("click", function () {
      console.log(item);
      currentImage = item;
      currentImageLink = item.src;
      pos = imageArray.indexOf(item);
      setImage();
      openPopupGallery();
      switchNavigationButtons();
  })
})

popupGalleryNextButton.addEventListener("click", function (event) {
  switchNext();
  setImage();
  switchNavigationButtons();
  event.stopPropagation();
})

popupGalleryPrevButton.addEventListener("click", function (event) {
  switchPrev();
  setImage();
  switchNavigationButtons();
  event.stopPropagation();
})

popupGalleryCloseButton.addEventListener("click", function (event) {
  closePopupGallery();
  event.stopPropagation();
})

popupGalleryImage.addEventListener("click", function (event) {
  event.stopPropagation();
})

popupGallery.addEventListener("click", function (event) {
  closePopupGallery();
  event.stopPropagation();
})

//CONTACT_CONTAINER

let ContactButton = document.querySelector(".contact-button");
let popupContact = document.querySelector(".popup_contact-form");
let popupContactContainer = popupContact.querySelector(".popup__container_contact-form");
let popupContactCloseButton = popupContact.querySelector(".popup__close-button");


let contactFormIsOpened = false;

function openContactForm() {
  contactFormIsOpened = true;
  popupContact.classList.add("popup_opened");
  popupContactContainer.classList.add("popup__container_opened");
}

function closeContactForm() {
  contactFormIsOpened = false;
  popupContact.classList.remove("popup_opened");
  popupContactContainer.classList.remove("popup__container_opened");
  formSendButton.classList.add("contact-form__send-button_disabled");
}

function buttonClickCloseContact(event) {
  if (contactFormIsOpened) {
    closeContactForm();
  } else {
    openContactForm();
  }
  event.stopPropagation();
}

ContactButton.addEventListener("click", buttonClickCloseContact);
popupContactCloseButton.addEventListener("click", buttonClickCloseContact);

//CONTACT-FORM

// Form Control

let contactForm = document.querySelector(".contact-form");
let formInputEmail = contactForm.querySelector(".contact-form__input_email");
let formInputName = contactForm.querySelector(".contact-form__input_name");
let formInputRequestText = contactForm.querySelector(".contact-form__input_request-text");


const formSendButton = contactForm.querySelector(".contact-form__send-button");
const formErrorEmail = contactForm.querySelector(".contact-form__error-message_email");
const formErrorName = contactForm.querySelector(".contact-form__error-message_name");


function showInputError(elementInput, elementError) {
  elementInput.classList.add("popup__input_error");
  elementError.classList.remove("contact-form__error-message_disabled");
}

function hideInputError(elementInput, elementError) {
  elementInput.classList.remove("popup__input_error");
  elementError.classList.add("contact-form__error-message_disabled");
}

function isValid(elementInput, elementError) {
  if (!elementInput.validity.valid) {
    showInputError(elementInput, elementError);
  } else {
    hideInputError(elementInput, elementError);
  }
}

function switchButton() {
  if (formInputEmail.validity.valid && formInputName.validity.valid) {
    formSendButton.classList.remove("contact-form__send-button_disabled");
  } else {
    formSendButton.classList.add("contact-form__send-button_disabled");
  }
}

formInputEmail.addEventListener("input", function(event){
  isValid(formInputEmail, formErrorEmail);
  switchButton();
  event.stopPropagation();
});

formInputName.addEventListener("input", function(event){
  isValid(formInputName, formErrorName);
  switchButton();
  event.stopPropagation();
});

function createPost(newPost) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        email: newPost.email,
        name: newPost.name,
        request_text: newPost.text
      })
  }).then(res=>res.json())
}

formSendButton.addEventListener('click', function (event) {
  event.preventDefault();

  let email = formInputEmail.value;
  let name = formInputName.value;
  let message = formInputRequestText.value;

  createPost({
      email: email,
      name: name,
      message: message
  });

  formSendButton.textContent = "Sending";

  setTimeout(()=>{
    formSendButton.textContent = "Sent";
    formSendButton.style.background = '#32CD32';
  },
  500);

  setTimeout(()=>{
    contactForm.reset();
    formSendButton.textContent = "Succesfully sent Send again?";
    closeContactForm();
  },
  500);
});

//COUNTDOWN

const countdown = document.querySelector('.countdown');
const targetDate = new Date('2024-06-01T00:00:00');
 
function updateCountdown() {
  const now = new Date();
  const remainingTime = targetDate - now;
 
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
 
  document.getElementById('days').innerText = days.toString().padStart(2, '0');
  document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
  document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}
 
// Обновляем счетчик каждую секунду
setInterval(updateCountdown, 1000);