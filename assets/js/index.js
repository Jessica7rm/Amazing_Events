
let eventsApi

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then(events => {
    eventsApi = events
    let Events = eventsApi.events
    eventosTodos(Events)
    crearCheckbox(Events)

    function dobleFiltro() {
      let filtroArray = filtroBuscador(Events, input.value)
      let arrayFiltrado = filtrarPorCategory(filtroArray)
      eventosTodos(arrayFiltrado)
    }

    input.addEventListener('input', dobleFiltro)
    contenedorCheckbox.addEventListener('change', dobleFiltro)

  })

let contenedorCards = document.getElementById("cards");

const input = document.querySelector('input')
const contenedorCheckbox = document.getElementById('checkbox')

function crearCheckbox(array) {
  let arrayCategory = array.map(elemento => elemento.category)
  let setCategory = new Set(arrayCategory)
  let check = ''
  setCategory.forEach(elemento => {
    check += `<div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="${elemento}" value="${elemento}">
    <label class="form-check-label" for="${elemento}">${elemento}</label>
  </div>  `
  })
  contenedorCheckbox.innerHTML = check
}

function filtroBuscador(array, texto) {
  let filtroArray = array.filter(element => element.name.toLowerCase().includes(texto.toLowerCase()))
  return filtroArray
}

function filtrarPorCategory(array) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(checkboxes)
  let checksCheckeados = arrayChecks.filter(check => check.checked)
  if (checksCheckeados.length == 0) {
    return array
  }
  let category = checksCheckeados.map(check => check.value)
  let filtroArray = array.filter(element => category.includes(element.category))
  return filtroArray
}

function eventosTodos(array) {
  if (array.length == 0) {
    contenedorCards.innerHTML = "<h2> No hay elementos </h2>"
    return
  }
  let Eventos = ""
  array.forEach(evento => {
    Eventos += `
  <div class="card" style="width: 17rem;">
     <img src="${evento.image}" class="card-img-top fotocard" alt="${evento.name}"> 
    <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <p class="card-text">${evento.description}</p>
      <p class="card-text">Date: ${evento.date}</p>
    </div>   
    <div class="card3">
      <p class="card-text">Price $ ${evento.price}</p>
      <a href="./details.html?id=${evento._id}" class="btn btn-outline-secondary">More details</a>
    </div>
  </div>`
  })
  contenedorCards.innerHTML = Eventos
}















