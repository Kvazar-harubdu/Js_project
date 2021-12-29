import {clouseModal, openModal} from './modalWindow';
import {postData} from '../servises/servises';

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
      postData('http://localhost:3000/requests', json)
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
    openModal('.modal', modalTimerId);

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
      clouseModal('.modal');
    }, 3000);
  }

  fetch('http://localhost:3000/menu')
    .then(item => item.json())
    .then(res => console.log(res));
}
export default forms;