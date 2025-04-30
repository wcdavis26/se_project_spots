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
editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

editProfileModalCloseButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});
newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostModalCloseButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

//Functions to handle form submission
function handleEditProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  console.log(profileName.textContent);
  console.log(profileDescription.textContent);

  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

function handleNewPostSubmit(event) {
  event.preventDefault();

  console.log(newPostImageInput.value);
  console.log(newPostCaptionInput.value);

  newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
