const dialogo = document.querySelector("dialog");
const corpo = document.querySelector("#cards");
function Mostrar(){
    dialogo.showModal();
}

function closeModal(){
    dialogo.close();
}

function recordDebit() {
    let nome = document.getElementById("DebitName").value;
    let divida = document.getElementById("DebitPrice").value;
    let pago = document.getElementById("DebitPaid").value;
    let desde = document.getElementById("DebitSince").value;
    let falta = divida - pago;

    const cartao = document.createElement("div");
    let id = document.querySelectorAll(".card").length + 1;
    cartao.classList.add("card");
    

    cartao.innerHTML = `
        <div class="debit" id="${id}">
            <div class="name">
                <h5>${nome}</h5>
            </div>
            <p>Falta: R$${falta}</p>
            <p>Pago: R$${pago}</p>
            <p>Dívida: R$${divida}</p>
            <p>Desde: ${desde}</p>
            <div class="debitbtns">
                <button class="btns" onclick="Atualizar(${id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btns" onclick="Deletar(${id})"><i class="fa-solid fa-trash"></i></button>
                <button class="btns" onclick="Quitar(${id})"><i class="fa-solid fa-check"></i></button>
            </div>
        </div>
    `;
    corpo.append(cartao);
    document.getElementById("DebitName").value = "";
    document.getElementById("DebitPrice").value = "";
    document.getElementById("DebitPaid").value = "";
    document.getElementById("DebitSince").value= "";

    closeModal();
}


function Deletar(id){
  let elemento = document.getElementById(id);  
  elemento.parentElement.removeChild(elemento);
}