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
export default tabs;