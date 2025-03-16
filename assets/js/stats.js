let eventTable = document.getElementById("tableEvents")
let upcomingTable = document.getElementById("tableUpcoming")
let pastTable = document.getElementById("tablePast")

let eventsApi = ""

async function fromApi() {
   const Events = data.events
   let currentDate = data.currentDate
   // console.log(Events)

   let arrayUpcoming = Events.filter(evento => currentDate < evento.date)
   let arrayPast = Events.filter(evento => currentDate > evento.date)

   let arrayEventUp = []
   arrayUpcoming.filter(event => arrayEventUp.push(
      {
         name: event.name,
         category: event.category,
         price: event.price,
         revenues: event.estimate * event.price,
         estimate: event.estimate,
         capacity: event.capacity,
         percentage: ((event.estimate * 100) / event.capacity).toFixed(1)
      }))
   //console.log(arrayEventUp)

   let arrayEventPast = []
   arrayPast.filter(evento => arrayEventPast.push(
      {
         name: evento.name,
         category: evento.category,
         price: evento.price,
         revenues: evento.assistance * evento.price,
         assistance: evento.assistance,
         capacity: evento.capacity,
         percentage: ((evento.assistance * 100) / evento.capacity).toFixed(1)
      }))
   //console.log(arrayEventPast)


   function eventsStatistics() {
      let pastOrdenado = ""
      pastOrdenado = arrayEventPast.filter(param => param.percentage).sort((a, b) => b.percentage - a.percentage)

      capacidadOrden = ""
      capacidadOrden = arrayEventPast.filter(param => param.capacity).sort((a, b) => b.capacity - a.capacity)

      eventTable.innerHTML = `
    <tr>
      <td>${pastOrdenado[0].name + " " + pastOrdenado[0].percentage}%</td>
       <td>${pastOrdenado[pastOrdenado.length - 1].name + " " + pastOrdenado[pastOrdenado.length - 1].percentage}%</td>
       <td>${capacidadOrden[0].name + " capacity " + capacidadOrden[0].capacity}</td>
    <tr>`
   }

   eventsStatistics()


   function upcomingStatistics() {
      var mapCategorias = arrayEventUp.map(categoria => categoria.category)
      const arrayCategorias = new Set(mapCategorias)
      categorias = arrayCategorias

      let porcentajeCatUp = [];
      let ingresosPorcentajes = [];
      categorias.forEach(categori => {
         porcentajeCatUp.push({
            categoria: categori,
            data: arrayEventUp.filter(datos => datos.category == categori)
         })
      })
      //console.log(porcentajeCatUp);

      porcentajeCatUp.map(valor => {
         ingresosPorcentajes.push({
            category: valor.categoria,
            estimateRevenue: valor.data.map(item => item.estimate * item.price),
            estimate: valor.data.map(item => item.estimate),
            capacity: valor.data.map(item => item.capacity)
         })
      })
      // console.log(ingresosPorcentajes);

      ingresosPorcentajes.forEach(categori => {
         let totalEstimate = 0
         categori.estimate.forEach(estimado => totalEstimate += Number(estimado))
         categori.estimate = totalEstimate

         let ingresosEstimados = 0
         categori.estimateRevenue.forEach(ingresosEstim => ingresosEstimados += Number(ingresosEstim))
         categori.estimateRevenue = ingresosEstimados

         let totalCapacityFut = 0
         categori.capacity.forEach(capacidad => totalCapacityFut += Number(capacidad))
         categori.capacity = totalCapacityFut

         categori.porcentajeAsistencia = ((totalEstimate * 100) / totalCapacityFut).toFixed(2)
      })
      // console.log(ingresosPorcentajes)

      let catOrdenUp = ""
      catOrdenUp = ingresosPorcentajes.filter(categori => categori.porcentajeAsistencia).sort((a, b) => b.porcentajeAsistencia - a.porcentajeAsistencia)
      // console.log(catOrdenUp);

      var tablaUpcoming = ""
      catOrdenUp.forEach(element => {
         element.catOrdenUp
         tablaUpcoming += `
   <tr>
      <td>${element.category}</td>
      <td>$ ${element.estimateRevenue}</td>
      <td>${element.porcentajeAsistencia}%</td>
   <tr>
`})
      upcomingTable.innerHTML = tablaUpcoming;
   }
   upcomingStatistics()


   function pastStatistics() {
      var mapCategorias = arrayEventPast.map(categoria => categoria.category)
      const arrayCategorias = new Set(mapCategorias)
      categorias = arrayCategorias

      let porcentajeCatPast = [];
      let ingresosPorcentajes = [];
      categorias.forEach(categori => {
         porcentajeCatPast.push({
            categoria: categori,
            data: arrayEventPast.filter(datos => datos.category == categori)
         })
      })
      // console.log(porcentajeCatPast);

      porcentajeCatPast.map(valor => {
         ingresosPorcentajes.push({
            category: valor.categoria,
            revenue: valor.data.map(item => item.assistance * item.price),
            assistance: valor.data.map(item => item.assistance),
            capacity: valor.data.map(item => item.capacity)
         })
      })
      // console.log(ingresosPorcentajes);

      ingresosPorcentajes.forEach(categori => {
         let totalAssistance = 0
         categori.assistance.forEach(asistencia => totalAssistance += Number(asistencia))
         categori.assistance = totalAssistance

         let totalRevenue = 0
         categori.revenue.forEach(ingresos => totalRevenue += Number(ingresos))
         categori.revenue = totalRevenue

         let totalCapacity = 0
         categori.capacity.forEach(capacidad => totalCapacity += Number(capacidad))
         categori.capacity = totalCapacity

         categori.porcentajeAsistencia = ((totalAssistance * 100) / totalCapacity).toFixed(2)
      })
      // console.log(ingresosPorcentajes)
      let catOrdenPast = ""
      catOrdenPast = ingresosPorcentajes.filter(categori => categori.porcentajeAsistencia).sort((a, b) => b.porcentajeAsistencia - a.porcentajeAsistencia)
      // console.log(catOrdenPast);

      var tablaPast = ""
      catOrdenPast.forEach(element => {
         element.catOrdenPast
         tablaPast += `
   <tr>
     <td>${element.category}</td>
     <td>$ ${element.revenue}</td>
     <td>${element.porcentajeAsistencia}%</td>
   <tr>
 `})
      pastTable.innerHTML = tablaPast;
   }
   pastStatistics()
}

fromApi()