// Функция попап окна для проверки возраста 
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const over18Btn = document.getElementById('over18-btn');
  const under18Btn = document.getElementById('under18-btn');
  
  const daysToRemember = 5;
  const storageKey = 'ageConfirmation';
  
  function showModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // блокируем скролл
  }
  
  function hideModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // разблокируем скролл
  }
  
  function setConfirmationInStorage() {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + daysToRemember * 24 * 60 * 60 * 1000);
    localStorage.setItem(storageKey, expirationDate.toISOString());
  }
  
  function getConfirmationFromStorage() {
    const expirationDateString = localStorage.getItem(storageKey);
    if (!expirationDateString) {
      return null;
    }
    const expirationDate = new Date(expirationDateString);
    const now = new Date();
    return now < expirationDate;
  }
  
  function redirectToGoogle() {
    window.location.href = 'https://www.google.com';
  }
  
  function handleOver18Click() {
    setConfirmationInStorage();
    hideModal();
  }
  
  function handleUnder18Click() {
    redirectToGoogle();
  }
  
  over18Btn.addEventListener('click', handleOver18Click);
  under18Btn.addEventListener('click', handleUnder18Click);
  
  const shouldShowModal = !getConfirmationFromStorage();
  if (shouldShowModal) {
    showModal();
  }
});






// Слайдеры
$(document).ready(function() {
    $('.slider-about-club').slick({
        arrows: true,
        dots: false,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        touchMove: true,
        waitForAnimate: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1141,
            settings: {
              arrows: false,
              // slidesToShow: 3
            }
          },
          {
            breakpoint: 851,
            settings: {
              arrows: false,
              slidesToShow: 1,
            }
          }
        ]
    });

    $('.skills-slider').slick({
      arrows: true,
      dots: false,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 2500,
      touchMove: true,
      waitForAnimate: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1551,
          settings: {
            arrows: false,
          }
        },
        {
          breakpoint: 1000,
          settings: {
            arrows: false,
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 641,
          settings: {
            arrows: false,
            slidesToShow: 1,
          }
        },
        
      ]
  });


  $('.events-slider').slick({
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    touchMove: true,
    waitForAnimate: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  });

});

// Мобильное меню 
const menuBtn = document.querySelector('.mobile-menu__btn');
const closeMenuBtn = document.querySelector('.menu-mobile__close-btn');
const menuMobile = document.querySelector('.menu-mobile');

menuBtn.addEventListener('click', function() {
    menuMobile.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', function() {
    menuMobile.classList.remove('active');
    document.body.style.overflow = 'auto';
});



// Кнопка скролла наверх 
const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function toggleScrollToTopBtn() {
    if (window.scrollY > 600) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
}

window.addEventListener('scroll', toggleScrollToTopBtn);
toggleScrollToTopBtn();










// Настройка галерреи товара 
document.addEventListener("DOMContentLoaded", function() {
  const mainImage = document.getElementById("mainImage");
  const fullscreenContainer = document.querySelector(".fullscreen-container");
  const fullscreenImage = document.getElementById("fullscreenImage");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const closeBtnGallery = document.querySelector(".gallery-close");
  const gallery = document.querySelector(".gallery");
  const galleryWrapper = document.querySelector(".gallery-wrapper");

  let currentIndex = 0;

  // Функция для открытия фото на весь экран
  function openFullscreen() {
      fullscreenContainer.style.display = "flex";
      document.body.classList.add("fullscreen-open");
      updateActiveThumbnail(currentIndex);
  }

  // Функция для закрытия фото на весь экран
  function closeFullscreen() {
      fullscreenContainer.style.display = "none";
      document.body.classList.remove("fullscreen-open");
  }

  // Функция для обновления фото на весь экран
  function updateFullscreenImage(index) {
      fullscreenImage.src = thumbnails[index].src;
  }

  // Функция для обновления активной миниатюры
  function updateActiveThumbnail(index) {
      thumbnails.forEach(function(thumbnail) {
          thumbnail.classList.remove("active");
      });
      thumbnails[index].classList.add("active");
  }

  // Функция для обработки клика по главному изображению
  function handleMainImageClick() {
      openFullscreen();
      updateFullscreenImage(currentIndex);
  }

  // Функция для обработки клика по миниатюре
  function handleThumbnailClick(event) {
      const clickedIndex = Array.from(thumbnails).indexOf(event.target);
      currentIndex = clickedIndex;
      updateFullscreenImage(clickedIndex);
      updateActiveThumbnail(clickedIndex);
      openFullscreen(); // Добавляем открытие фуллскрина при клике на миниатюру
  }

  // Функция для обработки клика по кнопкам "Предыдущее" и "Следующее" в полноэкранном режиме
  function handlePrevNextClick(event) {
      if (event.target.classList.contains("prev")) {
          currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      } else if (event.target.classList.contains("next")) {
          currentIndex = (currentIndex + 1) % thumbnails.length;
      }
      updateFullscreenImage(currentIndex);
      updateActiveThumbnail(currentIndex);
  }

  // Функция для обработки клика по документу
  function handleDocumentClick(event) {
    const target = event.target;
    const isImageClick = target === fullscreenImage || target === mainImage || target.classList.contains("thumbnail");
    const isArrowClick = target === prevBtn || target === nextBtn;
    const isClickOutside = !isImageClick && !isArrowClick;
  
    if (isClickOutside) {
      closeFullscreen();
    }
  }

  // Назначаем обработчики событий для handleDocumentClick
  document.addEventListener("click", handleDocumentClick);

  // Назначаем обработчики событий
  mainImage.addEventListener("click", handleMainImageClick);

  thumbnails.forEach(function(thumbnail, index) {
      thumbnail.addEventListener("mouseover", function() {
          currentIndex = index;
          mainImage.src = thumbnails[index].src;
          updateActiveThumbnail(index);
      });
      thumbnail.addEventListener("click", handleThumbnailClick);
  });

  mainImage.addEventListener("mousemove", function(event) {
      const { left, top, width, height } = mainImage.getBoundingClientRect();
      const x = (event.clientX - left) / width;
      const y = (event.clientY - top) / height;
      const zoom = 1.3; // Множитель для определения степени зума, можно настроить по вашему желанию

      mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
      mainImage.style.transform = `scale(${zoom})`;
  });

  gallery.addEventListener("mouseleave", function() {
      mainImage.style.transformOrigin = "";
      mainImage.style.transform = "";
  });

  galleryWrapper.addEventListener("mouseout", function() {
    mainImage.style.transformOrigin = "";
    mainImage.style.transform = "";
  });

  prevBtn.addEventListener("click", handlePrevNextClick);
  nextBtn.addEventListener("click", handlePrevNextClick);
  closeBtnGallery.addEventListener("click", closeFullscreen);

  

  
});






// Модальное окно
// Получаем все элементы с классом 'modalBtn'
const modalBtns = document.querySelectorAll('.course-wrap__item__btn');
const closeModalBtn = document.querySelector('.modal-window-course__close-btn');
const modal = document.querySelector('.modal-window-course');
const modalContent = document.querySelector('.modal-window-course__content');

// Добавляем обработчик события на каждую кнопку
modalBtns.forEach((modalBtn) => {
  modalBtn.addEventListener('click', function() {
    modal.classList.add('active');
    modalContent.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Закрываем модальное окно при клике на кнопку "Закрыть"
if(closeModalBtn) {
  closeModalBtn.addEventListener('click', function() {
    closeModal();
  });
}

// Функция для закрытия модального окна
function closeModal() {
  modal.classList.remove('active');
  modalContent.classList.remove('active');
  document.body.style.overflow = 'auto';
}


// // Фиксированная шапка в таблице 
// const tableWrapper = document.querySelector('.table-wrapper');
// const firstColumnHeaders = document.querySelectorAll('.th-fixed, .td-fixed');

// tableWrapper.addEventListener('scroll', () => {
//   const scrollLeft = tableWrapper.scrollLeft;
//   firstColumnHeaders.forEach(header => {
//     header.style.transform = `translateX(${scrollLeft}px)`;
//   });
// });