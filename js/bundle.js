/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/moduls/calculate.js":
/*!********************************!*\
  !*** ./js/moduls/calculate.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculate() {
   //Калькулятор
   const result = document.querySelector('.calculating__result span');
   let sex = 'female',
     height, weight, age,
     ratio = 1.375;

   if (localStorage.getItem('sex')) {
     sex = localStorage.getItem('sex')
   } else {
     sex = 'female'
     localStorage.setItem('sex', 'female');
   }
   if (localStorage.getItem('ratio')) {
     ratio = localStorage.getItem('ratio')
   } else {
     ratio = 1.375
     localStorage.setItem('ratio', 1.375);
   }

   function initLocalSetting(selector, activeClas) {
     const elements = document.querySelectorAll(selector);
     elements.forEach(elem => {
       elem.classList.remove(activeClas);
       if (elem.getAttribute('id') == localStorage.getItem('sex')) {
         elem.classList.add(activeClas);
       }
       if (elem.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
         elem.classList.add(activeClas);
       }
     });
   }
   initLocalSetting('#gender div', 'calculating__choose-item_active');
   initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');

   function calcTotal() {
     if (!sex || !height || !weight || !age) {
       result.textContent = '_____';
       return;
     }
     if (sex === 'female') {
       result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
     } else {
       result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);

     }
   }
   calcTotal();

   function getStaticInformation(selector, activClas) {
     const elements = document.querySelectorAll(selector);

     elements.forEach(elem => {
       elem.addEventListener('click', (e) => {

         if (e.target.getAttribute('data-ratio')) {
           ratio = +e.target.getAttribute('data-ratio');
           localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
         } else {
           sex = e.target.getAttribute('id');
           localStorage.setItem('sex', e.target.getAttribute('id'))
         }

         elements.forEach(elem => {
           elem.classList.remove(activClas);
         });
         e.target.classList.add(activClas);

         calcTotal();
       });
     });
   }
   getStaticInformation('#gender div', 'calculating__choose-item_active');
   getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

   function getDinamicInformation(selector) {
     const input = document.querySelector(selector);



     input.addEventListener('input', () => {

       if (input.value.match(/\D/g)) {
         input.style.border = '1px solid red'
       } else {
         input.style.border = 'none'
       }

       switch (input.getAttribute('id')) {
         case 'height':
           height = +input.value;
           break;
         case 'weight':
           weight = +input.value;
           break;
         case 'age':
           age = +input.value;
           break;
       }
       calcTotal();
     });
   }
   getDinamicInformation('#height');
   getDinamicInformation('#weight');
   getDinamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculate);

/***/ }),

/***/ "./js/moduls/cards.js":
/*!****************************!*\
  !*** ./js/moduls/cards.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _servises_servises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../servises/servises */ "./js/servises/servises.js");


function cards() {
  //Використання класів для карточок
  class MemuCart {
    constructor(menuImg, menuAlt, menuTitle, menuText, menuPrice, parentSelector, ...classes) {
      this.menuImg = menuImg;
      this.menuAlt = menuAlt;
      this.menuTitle = menuTitle;
      this.menuText = menuText;
      this.menuPrice = menuPrice;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 27;
      this.changeTuUAH();
    }
    changeTuUAH() {
      this.menuPrice = this.menuPrice * this.transfer;
    }
    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `      
        <img src = ${this.menuImg} alt = ${this.menuAlt}>
        <h3 class = "menu__item-subtitle">${this.menuTitle}</h3> 
        <div class = "menu__item-descr">${this.menuText}</div> 
        <div class = "menu__item-divider"></div> 
        <div class = "menu__item-price">
        <div class = "menu__item-cost">Цена:</div> 
        <div class = "menu__item-total"><span>${this.menuPrice}</span>грн/день</div> 
      `;

      this.parent.append(element);
    }
  }

  

  (0,_servises_servises__WEBPACK_IMPORTED_MODULE_0__.getResorce)('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({
        img,
        altimg,
        title,
        descr,
        price
      }) => {
        new MemuCart(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  //-----------------------------------------------------------------------------------------------------------------------

  // Використання бібліотеки axios

  // axios.get('http://localhost:3000/menu')
  //   .then(item => {
  //     item.data.forEach(({img,altimg,title,descr,price}) => {
  //       new MemuCart(img, altimg, title, descr, price, '.menu .container').render();
  //     });
  //   });

  //---------------------------------------------------------------------------------------------------------------------

  //Створення карточки якщо потрібна тільки одна без шаблонізатора 

  // getResorce('http://localhost:3000/menu')
  //   .then(data => createCard(data));
  //   function createCard(data){
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //       const element = document.createElement('div');
  //       price = price * 27;
  //       element.classList.add('menu__item');
  //       element.innerHTML = `      
  //         <img src = ${img} alt = ${altimg}>
  //         <h3 class = "menu__item-subtitle">${title}</h3> 
  //         <div class = "menu__item-descr">${descr}</div> 
  //         <div class = "menu__item-divider"></div> 
  //         <div class = "menu__item-price">
  //         <div class = "menu__item-cost">Цена:</div> 
  //         <div class = "menu__item-total"><span>${price}</span>грн/день</div> 
  //       `;
  //       document.querySelector('.menu .container').append(element);
  //     });
  //   }

  //----------------------------------------------------------------------------------------------------------

  //Побудова карток через конструктор

  // const newCart = new MemuCart(
  //   'img/tabs/vegy.jpg',
  //   'vegy',
  //   'Меню "Фитнес"',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   9,
  //   '.menu .container'
  // );
  // newCart.render();
  // //Скорочений вид запису
  // new MemuCart(
  //   'img/tabs/elite.jpg',
  //   'elite',
  //   'Меню “Премиум”',
  //   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  //   14,
  //   '.menu .container'
  // ).render();
  // new MemuCart(
  //   'img/tabs/post.jpg',
  //   'post',
  //   'Меню "Постное"',
  //   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  //   12,
  //   '.menu .container'
  // ).render();

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/moduls/forms.js":
/*!****************************!*\
  !*** ./js/moduls/forms.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalWindow */ "./js/moduls/modalWindow.js");
/* harmony import */ var _servises_servises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../servises/servises */ "./js/servises/servises.js");



function forms(formSelector, modalTimerId) {
  //Forms

  const forms = document.querySelectorAll(formSelector);
  const massage = {
    loading: 'img/form/spinner.svg',
    success: 'Дані надіслано',
    failure: 'Виникла помилка'
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  

  function bindPostData(forms) {
    forms.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = massage.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
      // forms.append(statusMessage);
      //метод довавання елемента після нашого блоку
      forms.insertAdjacentElement('afterend', statusMessage);
      //Використання XMLHttpRequest()
      // const reqvest = new XMLHttpRequest();
      // reqvest.open('POST', 'server.php');
      // reqvest.setRequestHeader('Content-type', 'multipart/form-data');
      //якщо використовуємо FormDatа() setRequestHeader() заголовок встановлюється автоматично, тому нам не потрібно прописувати
      //json для файла потрібно використовувати заголовок
      // reqvest.setRequestHeader('Content-type', 'application/json');
      const formDate = new FormData(forms);
      //Використання заголовка для вивода даних через jsone
      // const jsonMethod = JSON.stringify(objct);
      // reqvest.send(jsonMethod);
      // reqvest.addEventListener('load', () => {
      //   if (reqvest.status === 200) {
      //     console.log(reqvest.response);
      //     showThanksModal(massage.success);
      //     forms.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(massage.failure);
      //   }
      // });

      const json = JSON.stringify(Object.fromEntries(formDate.entries()));
      (0,_servises_servises__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(massage.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(massage.failure);
        })
        .finally(() => forms.reset())
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-clouse>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.clouseModal)('.modal');
    }, 3000);
  }

  fetch('http://localhost:3000/menu')
    .then(item => item.json())
    .then(res => console.log(res));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/moduls/modalWindow.js":
/*!**********************************!*\
  !*** ./js/moduls/modalWindow.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "clouseModal": () => (/* binding */ clouseModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
//Modal
function openModal(modalSelector, modalTimerId) {
  // boxModal.style.display = 'block';
  const boxModal = document.querySelector(modalSelector);
  boxModal.classList.add('show');
  boxModal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function clouseModal(modalSelector) {
  // boxModal.style.display = 'none';
  const boxModal = document.querySelector(modalSelector);
  boxModal.classList.add('hide');
  boxModal.classList.remove('show');
  document.body.style.overflow = '';
}

function modalWindow(trigerSelector, modalSelector, modalTimerId) {
  const btnModalOpen = document.querySelectorAll(trigerSelector),
    boxModal = document.querySelector(modalSelector);

  btnModalOpen.forEach(modals => {
    modals.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  boxModal.addEventListener('click', (e) => {
    if (e.target === boxModal || e.target.getAttribute('data-clouse') == '') {
      clouseModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      clouseModal(modalSelector);
    }
  });

  

  function showModalScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalScroll);
    }
  }
  window.addEventListener('scroll', showModalScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);


/***/ }),

/***/ "./js/moduls/slider.js":
/*!*****************************!*\
  !*** ./js/moduls/slider.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({containerSlider, sliderSelrct, nextArrow, prevArrow, totalCounter, carentCaunter, wrapperSlider, field}) {
 // Slider

 let offset = 0;
 let slideIndex = 1;

 const slides = document.querySelectorAll(sliderSelrct),
   slider = document.querySelector(containerSlider),
   prev = document.querySelector(prevArrow),
   next = document.querySelector(nextArrow),
   total = document.querySelector(totalCounter),
   current = document.querySelector(carentCaunter),
   slidesWrapper = document.querySelector(wrapperSlider),
   width = window.getComputedStyle(slidesWrapper).width,
   slidesField = document.querySelector(field);

 if (slides.length < 10) {
   total.textContent = `0${slides.length}`;
   current.textContent = `0${slideIndex}`;
 } else {
   total.textContent = slides.length;
   current.textContent = slideIndex;
 }

 slidesField.style.width = 100 * slides.length + '%';
 slidesField.style.display = 'flex';
 slidesField.style.transition = '0.5s all';

 slidesWrapper.style.overflow = 'hidden';

 slides.forEach(slide => {
   slide.style.width = width;
 });

 slider.style.position = 'relative';

 const indicators = document.createElement('ol'),
   dots = [];
 indicators.classList.add('carousel-indicators');
 indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
 slider.append(indicators);

 for (let i = 0; i < slides.length; i++) {
   const dot = document.createElement('li');
   dot.setAttribute('data-slide-to', i + 1);
   dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
   if (i == 0) {
     dot.style.opacity = 1;
   }
   indicators.append(dot);
   dots.push(dot);
 }

 next.addEventListener('click', () => {
   if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
     offset = 0;
   } else {
     offset += +width.slice(0, width.length - 2);
   }

   slidesField.style.transform = `translateX(-${offset}px)`;

   if (slideIndex == slides.length) {
     slideIndex = 1;
   } else {
     slideIndex++;
   }

   if (slides.length < 10) {
     current.textContent = `0${slideIndex}`;
   } else {
     current.textContent = slideIndex;
   }

   dots.forEach(dot => dot.style.opacity = ".5");
   dots[slideIndex - 1].style.opacity = 1;
 });

 prev.addEventListener('click', () => {
   if (offset == 0) {
     offset = +width.slice(0, width.length - 2) * (slides.length - 1);
   } else {
     offset -= +width.slice(0, width.length - 2);
   }

   slidesField.style.transform = `translateX(-${offset}px)`;

   if (slideIndex == 1) {
     slideIndex = slides.length;
   } else {
     slideIndex--;
   }

   if (slides.length < 10) {
     current.textContent = `0${slideIndex}`;
   } else {
     current.textContent = slideIndex;
   }

   dots.forEach(dot => dot.style.opacity = ".5");
   dots[slideIndex - 1].style.opacity = 1;
 });

 dots.forEach(dot => {
   dot.addEventListener('click', (e) => {
     const slideTo = e.target.getAttribute('data-slide-to');

     slideIndex = slideTo;
     offset = +width.slice(0, width.length - 2) * (slideTo - 1);

     slidesField.style.transform = `translateX(-${offset}px)`;

     if (slides.length < 10) {
       current.textContent = `0${slideIndex}`;
     } else {
       current.textContent = slideIndex;
     }

     dots.forEach(dot => dot.style.opacity = ".5");
     dots[slideIndex - 1].style.opacity = 1;
   });
 });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/moduls/tabs.js":
/*!***************************!*\
  !*** ./js/moduls/tabs.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabSelector, tabContentSelector, tabItemSelector, tabActive) {
   //Tabs
   const tabs = document.querySelectorAll(tabSelector),
     tabContent = document.querySelectorAll(tabContentSelector),
     tabParent = document.querySelector(tabItemSelector);


   function hidenContentTabs() {
     tabContent.forEach(item => {
       item.style.display = 'none';
     });

     tabs.forEach(item => {
       item.classList.remove(tabActive);
     });
   }

   function showContentTabs(i = 0) {
     tabContent[i].style.display = 'block';
     tabs[i].classList.add(tabActive);
   }
   hidenContentTabs();
   showContentTabs();

   tabParent.addEventListener('click', (event) => {
     const targ = event.target;
     if (targ && targ.classList.contains(tabSelector.slice(1))) {
       tabs.forEach((tab, i) => {
         if (targ == tab) {
           hidenContentTabs();
           showContentTabs(i);
         }
       });
     }
   });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/moduls/timer.js":
/*!****************************!*\
  !*** ./js/moduls/timer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
 function timer(id, dedline) {
   //Timer
   

   function getTimeRemaning(endtime) {

     const t = Date.parse(endtime) - Date.parse(new Date()),
       days = Math.floor(t / (1000 * 60 * 60 * 24)),
       hours = Math.floor((t / (1000 * 60 * 60) % 24)),
       minuts = Math.floor((t / (1000 * 60) % 60)),
       seconds = Math.floor((t / 1000) % 60);

     return {
       'total': t,
       'days': days,
       'hours': hours,
       'minuts': minuts,
       'seconds': seconds,
     };
   }

   function getZero(num) {
     if (num >= 0 && num < 10) {
       return `0 ${num}`;
     } else {
       return num;
     }
   }

   function setClock(selector, endtime) {
     const timer = document.querySelector(selector),
       days = timer.querySelector('#days'),
       hours = timer.querySelector('#hours'),
       minuts = timer.querySelector('#minutes'),
       seconds = timer.querySelector('#seconds'),
       timerInterval = setInterval(upDateClock, 1000);
     upDateClock();

     function upDateClock() {
       const t = getTimeRemaning(endtime);
       days.innerHTML = getZero(t.days);
       hours.innerHTML = getZero(t.hours);
       minuts.innerHTML = getZero(t.minuts);
       seconds.innerHTML = getZero(t.seconds);

       if (t.total <= 0) {
         clearInterval(timerInterval);
       }
     }
   }
   setClock(id, dedline);
 }

 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/servises/servises.js":
/*!*********************************!*\
  !*** ./js/servises/servises.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResorce": () => (/* binding */ getResorce)
/* harmony export */ });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
    return await res.json();
  };
  
const getResorce = async (url) => {
  const res = await fetch(url);
  //використовуємо встроєні ресурси які передаються в проміс для налагодження виводу, якщо винекне помилка яка не пов'язана із сервером чи інтернетом
  //Для цього використовуємо умову, якщо щось у нашому запросі res пішло щось не так виводимо
  if (!res.ok) {
    //використовуємо об'єкт помилки
    throw new Error(`Викидуємо нову помилку ${url} status = ${res.status}`);
  }
  return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moduls_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduls/tabs */ "./js/moduls/tabs.js");
/* harmony import */ var _moduls_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moduls/timer */ "./js/moduls/timer.js");
/* harmony import */ var _moduls_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moduls/slider */ "./js/moduls/slider.js");
/* harmony import */ var _moduls_modalWindow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./moduls/modalWindow */ "./js/moduls/modalWindow.js");
/* harmony import */ var _moduls_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./moduls/forms */ "./js/moduls/forms.js");
/* harmony import */ var _moduls_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./moduls/cards */ "./js/moduls/cards.js");
/* harmony import */ var _moduls_calculate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./moduls/calculate */ "./js/moduls/calculate.js");









window.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => (0,_moduls_modalWindow__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 50000);
  (0,_moduls_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', '.tabheader__item_active');
  (0,_moduls_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2022-01-01');
  (0,_moduls_modalWindow__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_moduls_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
  (0,_moduls_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_moduls_calculate__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_moduls_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
    containerSlider: '.offer__slider',
    sliderSelrct: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    carentCaunter: '#current',
    wrapperSlider: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map