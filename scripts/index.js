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
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);

//Elements selected for the profile
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
console.log(profileName.textContent);
console.log(profileDescription.textContent);

//Functions to open and close modals
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
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
  console.log(profileName.textContent);
  console.log(profileDescription.textContent);

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
    const previdImageTemplate = document.querySelector(
      "#preview-image-modal"
    ).content;
    const imageModal = previdImageTemplate
      .querySelector(".modal")
      .cloneNode(true);
    document.body.append(imageModal);
    const imageModalCloseButton = imageModal.querySelector(
      ".modal__close-btn_preview"
    );
    const imageModalImage = imageModal.querySelector(".modal__preview-image");
    const imageModalCaption = imageModal.querySelector(".modal__image-caption");

    imageModalImage.src = data.link;
    imageModalImage.alt = data.name;
    imageModalCaption.textContent = data.name;

    openModal(imageModal);

    imageModalCloseButton.addEventListener("click", function () {
      closeModal(imageModal);
      imageModal.remove();
    });
  });

  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardContainer.prepend(cardElement);
});

function handleNewPostSubmit(event) {
  event.preventDefault();

  const newCard = getCardElement({
    name: newPostCaptionInput.value,
    link: newPostImageInput.value,
  });

  cardContainer.prepend(newCard);

  closeModal(newPostModal);
  newPostForm.reset();
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
