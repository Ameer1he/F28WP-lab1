// index.js
// Variables to keep track of the current slide
let currentSlide = 0;

// Function to increment/decrement the current slide number
function updateSlideNumber(direction) {
  if (direction === 'next') {
    currentSlide++;
    if (currentSlide >= document.getElementsByClassName('mySlides').length) {
      currentSlide = 0;
    }
  } else if (direction === 'previous') {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = document.getElementsByClassName('mySlides').length - 1;
    }
  }
  return currentSlide;
}

// Function to update the slide's visibility
function updateSlideVisibility(slideNumber) {
  // Hide all slides
  const slides = document.getElementsByClassName('mySlides');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  // Show the current slide
  slides[slideNumber].style.display = 'block';
}

// Event listeners for 'next' and 'previous' buttons
document.querySelector('.next').addEventListener('click', () => {
  currentSlide = updateSlideNumber('next');
  updateSlideVisibility(currentSlide);
});

document.querySelector('.prev').addEventListener('click', () => {
  currentSlide = updateSlideNumber('previous');
  updateSlideVisibility(currentSlide);
});

// Initially show the first slide
updateSlideVisibility(currentSlide);

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Real-time validation for username
username.addEventListener("blur", () => {
});

// Real-time validation for email
email.addEventListener("blur", () => {
});

// Real-time validation for password
password.addEventListener("blur", () => {
});

// Real-time validation for confirm password
confirmPassword.addEventListener("blur", () => {
});

// Form submission
form.addEventListener("submit", (e) => {
});