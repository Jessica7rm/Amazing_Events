let eventTable = document.getElementById("tableEvents")

let upcomingTable = document.getElementById("tableUpcoming")

let pastTable = document.getElementById("tablePast")

let eventsApi 

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then(events => {
       eventsApi = events
    })


















