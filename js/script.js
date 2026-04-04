const toggle = document.querySelector(".toggle-2");
const nav = document.querySelector("nav");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  toggle.classList.toggle("active"); // this triggers the X animation
});
  

    const text = document.getElementById("scrollText");

    window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;
      let maxScroll = document.body.scrollHeight - window.innerHeight;
      let progress = scrollY / maxScroll;

      // Scale effect: grows big then shrinks
      let scale = progress < 0.5 
                  ? 1 + progress * 8   // from 1 → 5
                  : 5 - (progress - 0.5) * 9; // from 5 → 0.5

      text.style.transform = `translate(-50%, -50%) scale(${scale})`;

    });
  

    
  document.addEventListener("DOMContentLoaded", () => {
    const tik = document.querySelector(".tik");
    const items = document.querySelectorAll(".tik > div");
    const itemWidth = 241 + 20; // width + gap
    let index = 0;
    let paused = false;

    //  Create dots (fixed number, e.g., 5)
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("dots");
    document.querySelector(".carousel-wrapper").appendChild(dotsContainer);

    const totalDots = 5; // change this number to reduce/increase dots
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll("span");

    // Pause carousel when an item is clicked
    items.forEach(item => {
      item.addEventListener("click", () => {
        paused = !paused; // toggle pause on click
      });
    });

    function slideAndZoom() {
      if (!paused) {
        // Reset zoom on all items
        items.forEach(el => {
          const media = el.querySelector("img, video");
          if (media) media.style.transform = "scale(1)";
        });

        // Slide to current item
        tik.style.transform = `translateX(-${index * itemWidth}px)`;

        // Zoom current item
        const current = items[index].querySelector("img, video");
        if (current) current.style.transform = "scale(1.1)";

        // Return to normal size after 2 seconds
        setTimeout(() => {
          if (current) current.style.transform = "scale(1)";
        }, 2000);

        //  Update dots (map index to dot)
        const dotIndex = index % dots.length;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[dotIndex].classList.add("active");

        index++;

        // Seamless reset after first set
        if (index >= items.length / 2) {
          setTimeout(() => {
            tik.style.transition = "none"; // instant reset
            tik.style.transform = "translateX(0)";
            index = 0;
            tik.offsetHeight; // force reflow
            tik.style.transition = "transform 1s ease-in-out";
          }, 1000);
        }
      }

      setTimeout(slideAndZoom, 2000); // every 2 seconds
    }

    slideAndZoom();
  });

  
  let slideIndex = 0;
showSlides(slideIndex);

function showSlides(n) {
  let slides = document.querySelectorAll(".journal-card");
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  slides.forEach(s => s.style.display = "none");
  slides[slideIndex].style.display = "block";
}

document.querySelector(".prev").onclick = () => {
  slideIndex--;
  showSlides(slideIndex);
};

document.querySelector(".next").onclick = () => {
  slideIndex++;
  showSlides(slideIndex);
};


    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        header.classList.toggle("active");

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          content.classList.remove("show");
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add("show");
        }
      });
    });
  
