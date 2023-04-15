const validation = (value, typeOfValue) => {
  if (typeOfValue === 'name') {
    const nameRegex = /^[a-zA-ZáéíóúàèòÁÉÍÓÚÀÈÒäëïöüÄËÏÖÜºªñ\s]+$/;
    if (nameRegex.test(value)) {
      return true;
    } else {
      return false;
    }
  } else if (typeOfValue === 'lastName') {
    const lastNameRegex = /^[a-zA-ZáéíóúàèòÁÉÍÓÚÀÈÒäëïöüÄËÏÖÜºªñ\s]+$/;
    if (lastNameRegex.test(value)) {
      return true;
    } else {
      return false;
    }
  } else if (typeOfValue === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (emailRegex.test(value)) {
      return true;
    } else {
      return false;
    }
  } else if (typeOfValue === 'fileUrl') {
    const urlRegex = /^(?:https?:)?\/\/(?:res\.cloudinary\.com|cloudinary\.com)\/.+$/;
    if (urlRegex.test(value)) {
      return true;
    } else {
      return false;
    }
  } else if (typeOfValue === 'color') {
    if (!["pink", "blue", "yellow"].includes(value)) {
      return false;
    } else {
      return true;
    }
  } else if (typeOfValue === 'message') {
    const messageRegex = /^[a-zA-ZáéíóúüÁÉÍÓÚÜ0-9\s\p{Diacritic}'¡!?¿.,;:=()%&/""]{1,200}$/u;
    if (messageRegex.test(value)) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = validation;