const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileModalCloseButton =
  editProfileModal.querySelector(".modal__close-btn");
const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostModalCloseButton = newPostModal.querySelector(".modal__close-btn");

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
