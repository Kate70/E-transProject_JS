const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup('E-trans')
  .openPopup();

const createElem = (tag, attr) => {
  const elem = document.createElement(tag);
  return Object.assign(elem, {...attr});
}  


const createModal = (title, description) =>{
  const overlayElem = createElem('div', {className: 'modal'});
  const modalElem = createElem ('div', {className: 'modal__block'});
  const modalContainerElem = createElem ('div', 
  {className: 'model__container'})
  const titleElem = createElem('h2', {
    className:'modal__title',
    textContent: `Order ${title}`
  })

  const descriptionElem = createElem('p', {
    className:'modal__description',
    textContent: description

  }) 

  const form = createElem ('form', {
    className: "modal__form",
    method: 'post',
    action: 'https://jsonplaceholder.typicode.com/posts',
    id: 'order'    
  })

  const nameLabelElem = createElem('label', {className: 'modal__label'})
  const nameSpanElem = createElem('span', {className: 'modal__text', textContent: 'Name'})
  const nameInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Put your name',
    name: "name",
    required: true
  })

  const phoneLabelElem = createElem('label', {className: 'modal__label'})
  const phoneSpanElem = createElem('span', {className: 'modal__text', textContent: 'phone'})
  const phoneInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Put your phone number',
    name: "phone",
    required: true
  });

  const hideInput = createElem('input',{
    type: 'hidden',
    name: 'product',
    value: title,
  })

  const btnSubmit = createElem('button', {
    className: 'modal__btn',
    textContent: 'Choose',
    type: 'submit'
  })
  btnSubmit.setAttribute('form', 'order');
  const closeModalElem = createElem ('button', {
    className: 'modal__close',
    innerHTML: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="#18171A"/>
    </svg>
    `
  })

  overlayElem.addEventListener('click', event => {
    const target = event.target;
    if (target === overlayElem || target.closest('.modal__close')){
      overlayElem.remove()
      enabledScroll()
    }
  })


  nameLabelElem.append(nameSpanElem, nameInputElem)
  phoneLabelElem.append(phoneSpanElem, phoneInputElem)
  form.append(nameLabelElem, phoneLabelElem, hideInput)
  modalContainerElem .append(titleElem, descriptionElem, form, btnSubmit, closeModalElem)
  modalElem.append( modalContainerElem )
  overlayElem.append(modalElem);
  disabledScroll()
  return overlayElem
}

const productTitle = document.querySelectorAll('.product__title')
const productDescription = document.querySelectorAll('.product__desctiption')
const productBtn = document.querySelectorAll('.product__btn');

for (let i=0; i<productBtn.length; i++){
  productBtn[i].addEventListener('click', () =>{
   const title = productTitle[i].textContent;
    const description = productDescription[i].textContent;
    const modal = createModal(title, description)
    document.body.append(modal)
  })
}

function disabledScroll(){
  document.body.scrollPosition = window.scrollY;
  document.body.style.cssText = `
  overflow: hidden;
  position: fixed;
  top: -${document.body.scrollPosition}px;
  left:0;
  height: 100wh;
  width: 100wv;
  padding-right: ${window.innerWidth - document.body.offsetWidth}px
  `
}

function enabledScroll(){
  document.body.style.cssText = '';
  window.scroll({top: document.body.scrollPosition})
}