// index.js

class Slideshow {
    constructor() {
      this.slideIndex = 1;
    }
  
    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    }
  
    currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    }
  
    showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("numbertext");
  
      if (n > slides.length) {
        this.slideIndex = 1; // Reset to the first slide if at the end
      }
      if (n < 1) {
        this.slideIndex = slides.length; // Wrap to the last slide if at the beginning
      }
  
      // Hide all slides
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
  
      // Remove the "active" class from all numbertext elements
      for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
      }
  
      // Display the current slide and set the "active" class to the corresponding numbertext element
      slides[this.slideIndex - 1].style.display = "block";
      dots[this.slideIndex - 1].classList.add("active");
    }
  }