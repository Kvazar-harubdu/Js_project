import {getResorce} from '../servises/servises';

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

  

  getResorce('http://localhost:3000/menu')
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

export default cards;