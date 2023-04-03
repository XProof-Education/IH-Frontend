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
  }
};

module.exports = validation;