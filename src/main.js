import './style.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// After DOM loads, set up animations & FAQ logic
document.addEventListener('DOMContentLoaded', () => {
  // Hero animations
  gsap.from('.hero h1', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })

  gsap.from('.hero-subtitle', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power4.out'
  })

  gsap.from('.cta-buttons', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: 'power4.out'
  })

  // FAQ functionality
  const faqItems = document.querySelectorAll('.faq-item')
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question')
    const answer = item.querySelector('.faq-answer')
    
    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true'
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false')
          otherItem.classList.remove('active')
        }
      })
      
      // Toggle current item
      question.setAttribute('aria-expanded', !isOpen)
      item.classList.toggle('active')
    })
  })

  // Problem Section Carousel
  function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let interval;

    function showItem(index) {
      // Remove active and fade-out classes from all items
      items.forEach(item => {
        item.classList.remove('active', 'fade-out');
      });

      // Add active class to current item
      items[index].classList.add('active');
    }

    function nextItem() {
      // Add fade-out class to current item
      items[currentIndex].classList.add('fade-out');

      // Update index
      currentIndex = (currentIndex + 1) % items.length;

      // Show next item after a short delay
      setTimeout(() => {
        showItem(currentIndex);
      }, 300); // Match this with the CSS transition duration
    }

    // Show first item immediately
    showItem(0);

    // Start the carousel
    interval = setInterval(nextItem, 3000); // Change item every 3 seconds

    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });

    carousel.addEventListener('mouseleave', () => {
      interval = setInterval(nextItem, 3000);
    });
  }

  // Initialize the carousel when the DOM is loaded
  initCarousel();

  // Video Modal
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeModal = document.querySelector('.close-modal');
  const playbackSpeed = document.getElementById('playbackSpeed');
  const watchDemoBtn = document.querySelector('.hero .btn-secondary');

  function openModal() {
    videoModal.classList.add('active');
    modalVideo.play();
  }

  function closeVideoModal() {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  // Event Listeners
  watchDemoBtn.addEventListener('click', openModal);
  closeModal.addEventListener('click', closeVideoModal);

  // Close modal when clicking outside
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  // Handle playback speed
  playbackSpeed.addEventListener('change', (e) => {
    modalVideo.playbackRate = parseFloat(e.target.value);
  });

  // Handle keyboard events
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });
})