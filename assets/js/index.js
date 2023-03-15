const Events = data.events

let contenedorCards = document.getElementById("cards");
console.log(contenedorCards.innerHTML)

let Eventos = ""

function eventosTodos(array) {

  for (let i = 0; i < array.length; i++) {
    Eventos += `
  <div class="card" style="width: 17rem;">
     <img src="${array[i].image}" class="card-img-top fotocard" alt="${array[i].name}"> 
    <div class="card-body">
      <h5 class="card-title">${array[i].name}</h5>
      <p class="card-text">${array[i].description}</p>
      <p>Date: ${array[i].date}</p>
    </div>   
    <div class="card3">
      <p>Price $ ${array[i].price}</p>
      <a href="./details.html" class="btn btn-outline-secondary">More details</a>
    </div>
  </div>`
  }
}

eventosTodos(Events);
contenedorCards.innerHTML = Eventos











