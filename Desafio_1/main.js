var transactionTypeInput = document.getElementById("transactionType")
var monto = document.getElementById("monto")
var description = document.getElementById("description")

var toggleTransaction = document.getElementById("toggleTransactionType")

var monthSummary = document.getElementById("monthSummary")
var monthTotal = document.getElementById("monthTotal")
var expensesPercent = document.getElementById("expensesPercent")

var gasto = document.getElementById("gasto")
var currentDate = new Date()

var gastos = new Set()
const agregarGasto = () => {
    gastos.push(gasto)
}

const fecha = {
    Day:0,
    Month:"",
    Year:0
}

function calculateExpenses(){

}
function setCustomDate(date){
    switch(date.getMonth()){
        case 0:
          month = "Enero"
        break;
          case 1:
          month = "Febrero"
        break;
          case 2:
          month = "Marzo"
        break;
          case 3:
          month = "Abril"
        break;
          case 4:
          month = "Mayo"
        break;
          case 5:
          month = "Junio"
        break;
          case 6:
          month = "Julio"
        break;
          case 7:
          month = "Agosto"
        break;
          case 8:
          month = "Septiembre"
        break;
          case 9:
          month = "Octubre"
        break;
          case 10:
          month = "Noviembre"
        break;
          case 11:
          month = "Diciembre"
        break;
      }
  fecha.Month = month
  fecha.Year = parseInt(date.getFullYear())
}

setCustomDate(currentDate)

console.log(`${fecha.Month} ${fecha.Year}`)

monthSummary.innerHTML = `${fecha.Month} ${fecha.Year}`

var containerDatos = document.getElementById("container-datos")

const ingresos = new Array()
const egresos = new Array()
let Ingreso = {
  Cantidad:0,
  Descripcion:""
}
let Egreso = {
  Cantidad:0,
  Descripcion:""
}

function MostrarDatosIngresos(){
  for (let i = 0; i < ingresos.length; i++) {
    containerDatos.innerHTML += `
    <div class="flex space-x-40 border-2 border-black p-4">
      <h1>Entrada ${i+1} <h1>+ ${ingresos[i].Cantidad}</h1></h1>
    </div>
    `
  }
}


function MostrarDatosEgreso(){
  for (let index = 0; index < egresos.length; index++) {
    containerDatos.innerHTML += `
    <div class="flex space-x-40 border-2 border-black p-4">
      <h1>Salida ${index+1} <h1>- ${egresos[i].Cantidad}</h1></h1>
    </div>
    `
  }
}

function agregarIngresos(data){
  ingresos.push(data)
}
function agregarEgresos(data){
  egresos.push(data)
}

function AgregarDatos() {
  const validationNumber = validateNumberInput(monto)

  if(monto.value != "" && description.value != "" && transactionTypeInput.value != ""){
    const cantidad = parseInt(monto.value);
  const descripcion = description.value;

  if (transactionTypeInput.value === "ingreso") {
    const ingreso = {
      Cantidad: cantidad,
      Descripcion: descripcion,
    };
    ingresos.push(ingreso);

    RenderIngresos();

    monto.value = "";
    description.value = "";
  } else if (transactionTypeInput.value === "egreso") {
    const egreso = {
      Cantidad: cantidad,
      Descripcion: descripcion
    };
    egresos.push(egreso);

    RenderEgresos();

    monto.value = "";
    description.value = "";
  }
  }else{
    if(monto.value == "" && description.value != ""){
      alert("Te Falto Agregar el Monto")
    }else if (description.value == "" && monto.value != "") {
      alert("Te Falto Agregar la Descriptcion")
    }else if(monto.value != "" && description.value != "" && transactionTypeInput.value == ""){
      alert("Te Falto Agregar El Tipo de Transaction")
    }else{
      alert("Ingresa algo papa")
    }
  }

}

const checkbox = document.getElementById('toggleTransactionType');


checkbox.addEventListener('change', function() {

  if (this.checked) {
      console.log('Checkbox is now checked');
      RenderEgresos()
  } else {
      console.log('Checkbox is now unchecked');
      RenderIngresos()
  }
});


function RenderIngresos(){
  containerDatos.innerHTML = "";

  ingresos.forEach(function(ingreso,key){
    const newIngreso = document.createElement("div");
    newIngreso.className = "grid grid-cols-2 gap-5 border-2 border-black p-4"
    newIngreso.innerHTML = `<h1>${ingreso.Descripcion} <h1 class="text-end">+ $${ingreso.Cantidad}</h1></h1>`
    containerDatos.appendChild(newIngreso);

  })
  TotalIngresos()
  PorcentajeGastosTotales()
}

function RenderEgresos(){
  containerDatos.innerHTML = "";

  egresos.forEach(function(egreso,key){
    const newEgreso = document.createElement("div");
    newEgreso.className = "grid grid-cols-2 gap-5 border-2 border-black p-4"
    newEgreso.innerHTML = `<h1>${egreso.Descripcion} <h1 class="text-end">- $${egreso.Cantidad}</h1></h1>`
    containerDatos.appendChild(newEgreso)
    checkbox.checked = !checkbox.checked; // Toggles the checked state
  })
  TotalEgresos()
  PorcentajeGastosTotales()
}

    function validateNumberInput(input) {
      const value = input.value.trim();
  if (value === "" || isNaN(parseFloat(value))) {
    return false;
  }

  return true;
    }

function TotalIngresos(){
  let total = 0;
  ingresos.forEach(function(ingreso,key){
    total += ingreso.Cantidad;
  })
  document.getElementById("total-ingresos").innerHTML = total
}
function TotalEgresos(){
  let total = 0
  egresos.forEach(function (egreso,key) {
    total += egreso.Cantidad;
  })
  document.getElementById("total-egresos").innerHTML = total
}

function TotalTransactionValue(){
  let egresosTotales = 0;
  let ingresosTotales = 0;

  egresos.forEach(function (egreso,key) {
    egresosTotales += egreso.Cantidad;
  })

  ingresos.forEach(function(ingreso,key){
    ingresosTotales += ingreso.Cantidad;
  })
  monthTotal.innerHTML = ingresosTotales - egresosTotales
}

function PorcentajeGastosTotales(){
  let egresosTotales = 0;
  let ingresosTotales = 0;

  egresos.forEach(function (egreso,key) {
    egresosTotales += egreso.Cantidad;
  })

  ingresos.forEach(function(ingreso,key){
    ingresosTotales += ingreso.Cantidad;
  })

  const total = (egresosTotales * 100)/ingresosTotales
  console.log(egresosTotales)
  console.log(ingresosTotales)
  console.log(total)
  expensesPercent.innerHTML = `${total.toFixed(2)}%`
  TotalTransactionValue()
}