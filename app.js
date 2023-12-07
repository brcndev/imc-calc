// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

  //Seleção de elementos
  const imcTable = document.querySelector("#imc-table");
  
  const heightInput = document.querySelector("#height");
  const weightInput = document.querySelector("#weight");
  const calcBtn = document.querySelector("#calc-btn");
  const clearBtn = document.querySelector("#clear-btn");

  const imcNumber = document.querySelector("#imc-number span");
  const imcInfo = document.querySelector("#imc-info span");
  const backBtn = document.querySelector("#back-btn");

  const calcContainer = document.querySelector("#calc-container");
  const resultContainer = document.querySelector("#result-container");

 //Função seleciona os dados acima em formato de API
function createTable(data) {
    
  data.forEach((item) => {//para cara  item desse array
    const div = document.createElement("div");//cria uma div para receber as infos
    div.classList.add("table-data")//adiciona classe table data/ essa classe n existe no html, cria pra poder receber os detalhes das infos do array acima

    const classification = document.createElement("p");//cria a variavel para receber um paragrafo
    classification.innerText = item.classification;//o texto do paragrafo é a info do array acima

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);//vinculamos as infos dos paragrafos à div criada anteriormente
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);//esse elemento existe no html, na sequencia vinculamos a div criada via js.
  });
}

function cleanInputs() {
  heightInput.value = ""
  weightInput.value = ""
  imcNumber.classList = "";
  imcInfo.classList = "";
}

function validDigits(text) {//função permite apenas numeros de 1 a 9 e virgulas, o que for diferente disse será substituido por "" vazio;
  return text.replace(/[^0-9,]/g, "");
}

function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}


//Inicialização
createTable(data); //rodamos a função 

//Eventos
clearBtn.addEventListener("click", (e) =>{
  e.preventDefault();
  cleanInputs();
});

heightInput.addEventListener("input", (e) => {//os campos de height e weight usam a função para ver se existem caracteres diferentes de numeros, depois substitui o valor do campo selecionado pelo valor atualizado
  const updatedValue = validDigits(e.target.value);
  e.target.value = updatedValue;
});

weightInput.addEventListener("input", (e) => {
  const updatedValue = validDigits(e.target.value);
  e.target.value = updatedValue;
})

calcBtn.addEventListener("click", (e) => { 

  e.preventDefault();
  
  const height = +heightInput.value.replace(",", ".");
  const weight = +weightInput.value.replace(",", ".");

  if (!weight || !height) return;

  const imc = calcImc(weight, height);
  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

    if (!info) return;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    switch(info) {
      case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
      case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
      case "Sobrepeso":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
      case "Obesidade":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
      case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;

    } 

    showOrHideResults();
});
backBtn.addEventListener("click", () => {
  showOrHideResults();
  cleanInputs();
})