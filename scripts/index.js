import { resetValidation, settings, toggleButtonState } from "./validation.js";

const initialCards = [
  {
    name: "Card 1",
    link: "https://images.unsplash.com/photo-1740032004326-b0337f216f05?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Card 2",
    link: "https://images.unsplash.com/photo-1740032004135-fa85cedffbde?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Card 3",
    link: "https://images.unsplash.com/photo-1740032004036-8fa4a7f51360?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Card 4",
    link: "https://images.unsplash.com/photo-1740032004098-667fdcfadd85?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Card 5",
    link: "https://images.unsplash.com/photo-1740032004181-e64c87ed11e3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Card 6",
    link: "https://images.unsplash.com/photo-1740032004434-f9179239e255?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileModalCloseButton =
  editProfileModal.querySelector(".modal__close-btn");
const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostModalCloseButton = newPostModal.querySelector(".modal__close-btn");

//selecting the form elements
const editProfileForm = document.forms["edit-profile-modal-form"];
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const newPostForm = document.forms["new-post-modal-form"];
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);

//Elements for previewing the image
const previewModal = document.querySelector(".modal_type_preview");
const previewImage = previewModal.querySelector(".modal__preview-image");
const previewCaption = previewModal.querySelector(".modal__image-caption");
const previewCloseButton = previewModal.querySelector(
  ".modal__close-btn_preview"
);

//Elements selected for the profile
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Functions to open and close modals
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;

  openModal(editProfileModal);
  resetValidation(editProfileForm, settings);
});

editProfileModalCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});
newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostModalCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

//Functions to handle form submission
function handleEditProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;

  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

//New post modal
const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Like btn
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });

  //delete btn
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  // Open image
  cardImage.addEventListener("click", function () {
    // Set the image source, alt and caption
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;

    openModal(previewModal);
  });

  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardContainer.prepend(cardElement);
});

previewCloseButton.addEventListener("click", function () {
  closeModal(previewModal);
});

const allModals = document.querySelectorAll(".modal");

allModals.forEach((modal) => {
  modal.addEventListener("click", function (event) {
    if (
      event.target === modal ||
      event.target.classList.contains("modal__close-btn")
    ) {
      closeModal(modal);
    }
  });
});

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openModalElement = document.querySelector(".modal_is-opened");

    if (openModalElement) {
      closeModal(openModalElement);
    }
  }
}

function handleNewPostSubmit(event) {
  event.preventDefault();

  const newCard = getCardElement({
    name: newPostCaptionInput.value,
    link: newPostImageInput.value,
  });

  cardContainer.prepend(newCard);

  closeModal(newPostModal);
  newPostForm.reset();
  toggleButtonState(
    newPostForm.querySelectorAll(settings.inputSelector),
    newPostForm.querySelector(settings.submitButtonSelector),
    settings
  );
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
