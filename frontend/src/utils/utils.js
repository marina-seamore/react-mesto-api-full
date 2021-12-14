export const validationConfig = {
    formSelector: '.popup__content',
    fieldSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    fieldInvalidClass: 'popup__field_invalid',
    buttonInvalidClass: 'popup__submit-button_inactive',
  };
  
  export const profileConfig = {
    profileName: '.profile__name',
    profileDescription: '.profile__description',
    profileAvatar: '.profile__avatar_image',
    elementTemplate: '.element-template'
  }
  
  export const popupConfig = {
    fullPhotoPopup: '.popup_full-photo',
    addPhotoPopup: '.popup_photo',
    profilePopup: '.popup_profile',
    editProfileAvatarPopup: '.popup_edit-avatar',
    confirmationPopup: '.popup_confirm'
  }

  export const apiConfig = {
    address: `https://mesto.nomoreparties.co/v1`,
    cohortId: `cohort-23`,
    headers: {
    authorization: `2f40adb1-d905-40eb-b5eb-fef99da08bb6`,
    'Content-Type': 'application/json'
    }
}