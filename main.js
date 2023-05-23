const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

//Traemos los elementos del DOM necesarios pra realizar el ejercicio

const resultContainer = document.getElementById("resul-container");
const form = document.querySelector(".add-form");
const input = document.querySelector(".input-number");

//Pizza activa
const activePizza = JSON.parse(localStorage.getItem("pizza")) || null;

//Guardar la Pizza

const saveToLocalStorage = (pizza) => {
  if (!pizza) return;
  localStorage.setItem("pizza", JSON.stringify(pizza));
};

const searchPizza = (value) => pizzas.find((pizza) => pizza.id === value);

const renderCard = (pizza) => {
  const { nombre, precio, ingredientes, imagen } = pizza;
  return `
  <div class = "card">
    <img src = "${imagen}" alt = "${nombre}"   class = "card_img">
    <div class = "card_info">
    <h2 class = "card_title"> ${nombre} </h2> 
    <div class = "card_body" >
    <span class = "card_description" > ${ingredientes
      .map((ingrediente) => ingrediente)
      .join(", ")} </span> 
    <h2 class = "card_price" > PRECIO $${precio} </h2> 
    </div> 
    </div> 
    </div>

  `;
};

const showEmptyError = () => {
  resultContainer.innerHTML = `
  <div class="pizza-container">
  <i class = "fas fa-solid fa-triangle-exclamation error"> </i> 
  <h2> Por favor, ingrese un numero para que podamos bucar u pizza en el menu</h2>
  </div> `;
};

const renderResult = (pizza) => {
  if (!pizza) {
    resultContainer.innerHTML = `
    <div class="pizza-container">
  <i class = "fas fa-solid fa-triangle-exclamation error"></i>
  <h2>No existe una Pizza con el id ingresado</h2>
  <p>Realice una nueva buqueda</p>
  </div>`;
  } else {
    resultContainer.innerHTML = renderCard(pizza);
  }
};

//Funcion que renderisa la el en caaso de recargar la pagina

const initilRender = () => {
  if (!activePizza) {
    resultContainer.innerHTML = `
    <div class="pizza-container">
        <i class="fas fa-solid fa-triangle-exclamation error"></i>
        <h2>No hay ninguna pizza guardada en el LS.</h2>
      </div>`;
  } else {
    resultContainer.innerHTML = `
    <h2> Ultima Pizza Buscada</h2>
    ${renderCard(activePizza)}`;
  }
};

const submitSearch = (e) => {
  e.preventDefault();
  const searchedValue = input.value;
  if (!searchedValue) {
    showEmptyError(searchedValue);
    return;
  }
  const searchedPizza = searchPizza(Number(searchedValue));
  renderResult(searchedPizza);
  saveToLocalStorage(searchedPizza);

  form.reset();
};

//funcion inicializadora. Coloca el listener del form y a la funcion initialRender
const init = () => {
  initilRender();
  form.addEventListener("submit", submitSearch);
};

init();
