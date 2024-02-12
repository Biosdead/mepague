const dialogo = document.querySelector("dialog");
const dialogoDelete = document.querySelector("#DialogDelete");
const dialogoPaid = document.querySelector("#DialogPaid");
const corpo = document.querySelector("#cards");
const form = document.getElementById("form");
var CurrentID = 0;
var editando = false;
form.addEventListener("submit", recordDebit);

function CarregarDados(){
    console.log("Carrega dados");
    var temp= document.createElement("div");
    temp.classList.add("card");

    for (let index = 0; index < localStorage.length; index++) {
        console.log("Dentro do For");
        const element = localStorage.key(index);
        temp.innerHTML = localStorage.getItem(element);
        corpo.append(temp);
        console.log("Key: " + element);
        console.log("localStorage.length: " + localStorage.length);
        console.log("Item: ");
    }
}

function SalvarDados(identification, card){
    window.localStorage.setItem(identification, card);
}

function ApagarDados(identification){
    window.localStorage.removeItem(identification);
}

function Mostrar(){
    ColocarDataPrazoNoDiadeHoje();
    dialogo.showModal();
}

function Quitar(){
    dialogoPaid.showModal();
}

function closeModal(){
    document.getElementById("DebitName").value = "";
    document.getElementById("DebitPrice").value = "";
    document.getElementById("DebitPaid").value = "";
    editando = false;
    dialogo.close();
}

function closeDeleteModal(){
    dialogoDelete.close();
}

function closePaidModal(){
    dialogoPaid.close();
}


function recordDebit() {
    event.preventDefault(); // Impede o refresh da página para não sumir os dados quando ocorrer onsubmit
    
    let nome = document.getElementById("DebitName").value;
    let divida = document.getElementById("DebitPrice").value;
    let pago = document.getElementById("DebitPaid").value;
    let desde = document.getElementById("DebitSince").value;
    let falta = divida - pago;

    if(editando){

    document.getElementById(CurrentID+"n").innerText = nome;
    document.getElementById(CurrentID+"f").innerText = falta;
    document.getElementById(CurrentID+"d").innerText = divida;
    document.getElementById(CurrentID+"p").innerText = pago;
    document.getElementById(CurrentID+"t").innerText = ConvertDate(desde);

    const cartao = document.createElement("div");
    cartao.classList.add("card");

    cartao.innerHTML = `
        <div class="debit" id="${CurrentID}">
            <div class="name">
                <h5 id="${CurrentID}n">${nome}</h5>
            </div>
            <span>Falta: R$</span><span id="${CurrentID}f">${falta}</span>
            <span>Pago: R$</span><span id="${CurrentID}p">${pago}</span>
            <span>Dívida: R$</span><span id="${CurrentID}d">${divida}</span>
            <span>Desde: </span><span id="${CurrentID}t">${ConvertDate(desde)}</span>
            <div class="debitbtns">
                <button class="btns" onclick="Edit(${CurrentID})"><i class="fa-solid fa-pen"></i></button>
                <button class="btns" onclick="Deletar(${CurrentID})"><i class="fa-solid fa-trash"></i></button>
                <button class="btns" onclick="Quitar(${CurrentID})"><i class="fa-solid fa-check"></i></button>
            </div>
        </div>
    `;

    SalvarDados(CurrentID, cartao.innerHTML);

    }else{
    
    
    // let prazo = document.getElementById("Deadline").value;
    
    // let diasFaltando = Math.abs(((((new Date(desde) - new Date(prazo))/1000)/60)/60)/24);

    const cartao = document.createElement("div");
    let id = document.querySelectorAll(".card").length + 1;
    cartao.classList.add("card");

    desde = ConvertDate(desde);

    cartao.innerHTML = `
        <div class="debit" id="${id}">
            <div class="name">
                <h5 id="${id}n">${nome}</h5>
            </div>
            <span>Falta: R$</span><span id="${id}f">${falta}</span>
            <span>Pago: R$</span><span id="${id}p">${pago}</span>
            <span>Dívida: R$</span><span id="${id}d">${divida}</span>
            <span>Desde: </span><span id="${id}t">${desde}</span>
            <div class="debitbtns">
                <button class="btns" onclick="Edit(${id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btns" onclick="Deletar(${id})"><i class="fa-solid fa-trash"></i></button>
                <button class="btns" onclick="Quitar(${id})"><i class="fa-solid fa-check"></i></button>
            </div>
        </div>
    `;
    corpo.append(cartao);
    document.getElementById("DebitName").value = "";
    document.getElementById("DebitPrice").value = "";
    document.getElementById("DebitPaid").value = "";
    SalvarDados(id, cartao.innerHTML);
}
    closeModal();
    
}


function Deletar(id){
    CurrentID = id;
    ApagarDados(id);
    dialogoDelete.showModal();  
    
}

function Edit(id){
    editando = true;
    CurrentID = id;
    let nome = document.getElementById(id+"n").innerText;
    let divida = document.getElementById(id+"d").innerText;
    let pago = document.getElementById(id+"p").innerText;
    let desde = document.getElementById(id+"t").innerText;
    desde = ReconvertDate(desde);
    document.getElementById("DebitName").value = nome;
    document.getElementById("DebitPrice").value = divida;
    document.getElementById("DebitPaid").value = pago;
    document.getElementById("DebitSince").value = desde;
    dialogo.showModal();
 
  }

  function ColocarDataPrazoNoDiadeHoje(){
    let dia = new Date();
    let datadeHoje = dia.getFullYear() + "-" + (dia.getMonth()+1) + "-" + dia.getDate();
    document.getElementById("DebitSince").value = datadeHoje; 
    // document.getElementById("Deadline").value = datadeHoje; 
  }

  function ConvertDate(date){ // converte a data do padrão iso yyyy-mm-dd para dd/mm/yyyy
    let data = date.split("-");
    return data[2] + "/" + data[1] + "/" + data[0];
  }

  function ReconvertDate(date){ // converte a data do padrão dd/mm/yyyy para iso yyyy-mm-dd 
    let data = date.split("/");
    return data[2] + "-" + data[1] + "-" + data[0];
  }

function DeleteConfirm(){
    let elemento = document.getElementById(CurrentID);  
    elemento.parentElement.removeChild(elemento);
    closeDeleteModal();
}

function PaidConfirm(){
    let elemento = document.getElementById(CurrentID);  
    elemento.parentElement.removeChild(elemento);
    closePaidModal();
}