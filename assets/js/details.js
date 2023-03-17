
let eventsApi 

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then(respuesta => {
       eventsApi = respuesta
       const datos = eventsApi.events
       const id = new URLSearchParams(location.search).get("id")
       const events = datos.find(element => element._id == id)

       let contenedorDetail = document.getElementById("cont_det")

contenedorDetail.innerHTML = `
<div class="card mb-3 card_det" style="max-width: 740px;">
        <div class="row g-0">
            <div class="col-md-5 det_img">
                <img src="${events.image}" class="img-fluid rounded-start" alt="${events.name}">
            </div>
            <div class="col-md-7">
                <div class="card-body">
                    <h5 class="card-title">${events.name}</h5>
                    <p class="card-text">${events.description}</p>
                </div>
                <div class="card3">
                    <p class="card-text">Date: ${events.date}</p>
                    <p class="card-text">Place: ${events.place}</p>
                </div>
                <div class="card3">
                    <p class="card-text">Category: ${events.category}</p>
                    <p>${events.assistance !== undefined ? 'Assistance: ' + events.assistance : ''}</p>
                    <p>${events.estimate !== undefined ? 'Estimate: ' + events.estimate : ''}</p>
                </div>
                <div class="card3">
                    <p class="card-text">Capacity: ${events.capacity}</p>
                    <p class="card-text">Price $ ${events.price}</p>
                    <a href="./index.html" class="btn btn-outline-secondary">Home</a>
                </div>
            </div>
        </div>
    </div>
`
})