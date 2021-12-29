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

export default modalWindow;
export {
  clouseModal,
  openModal
};