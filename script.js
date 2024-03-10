const dialogo = document.querySelector("dialog");
const dialogoDelete = document.querySelector("#DialogDelete");
const dialogoPaid = document.querySelector("#DialogPaid");
const corpo = document.querySelector("#cards");
const form = document.getElementById("form");
var CurrentID = 0;
var editando = false;
// var History = (localStorage.getItem("history") == true) ? localStorage.getItem("history") : 0;
form.addEventListener("submit", recordDebit);

function CarregarDados(){
    for (let index = 0; index < localStorage.length; index++) {
        var temp= document.createElement("div");
        temp.classList.add("card");
        const element = localStorage.key(index);
        temp.innerHTML = localStorage.getItem(element);
        corpo.append(temp);
    }
}

function SalvarDados(identification, card){
    window.localStorage.setItem(identification, card);
}

function ApagarDados(identification){
    window.localStorage.removeItem(identification);
}

function Mostrar(){
    document.getElementById("DialogTitleText").innerText = "Nova Dívida";
    dialogo.showModal();
    ColocarDataPrazoNoDiadeHoje();
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
        <table id="${CurrentID}">
                        <tr>
                            <th class="tablename" colspan="4" id="${CurrentID}n">${nome}</th>
                        </tr>
                        <tr class="tableheader">
                            <th>Falta(R$):</th>
                            <th>Pago(R$):</th>
                            <th>Dívida(R$):</th>
                            <th>Desde:</th>
                        </tr>
                        <tr class="tablebody">
                            <td id="${CurrentID}f">${falta}</td>
                            <td id="${CurrentID}p">${pago}</td>
                            <td id="${CurrentID}d">${divida}</td>
                            <td id="${CurrentID}t">${ConvertDate(desde)}</td>
                        </tr>
                        <tr class="tablefooter">
                            <th colspan="4">
                                <button class="btnEdit" onclick="Edit(${CurrentID})"><i class="fa-solid fa-pen"></i> - Atualizar</button>
                                <button class="btnDelete" onclick="Deletar(${CurrentID})"><i class="fa-solid fa-trash"></i> - Apagar</button>
                            </th>
                        </tr>
            </table>
    `;



    // Função com o butão quitar.
    // <div class="debit" id="${CurrentID}">
    //         <div class="name">
    //             <h5 id="${CurrentID}n">${nome}</h5>
    //         </div>
    //         <span>Falta: R$</span><span id="${CurrentID}f">${falta}</span>
    //         <span>Pago: R$</span><span id="${CurrentID}p">${pago}</span>
    //         <span>Dívida: R$</span><span id="${CurrentID}d">${divida}</span>
    //         <span>Desde: </span><span id="${CurrentID}t">${ConvertDate(desde)}</span>
    //         <div class="debitbtns">
    //             <button class="btns" onclick="Edit(${CurrentID})"><i class="fa-solid fa-pen"></i></button>
    //             <button class="btns" onclick="Deletar(${CurrentID})"><i class="fa-solid fa-trash"></i></button>
    //             <button class="btns" onclick="Quitar(${CurrentID})"><i class="fa-solid fa-check"></i></button>
    //         </div>
    //     </div>

    SalvarDados(CurrentID, cartao.innerHTML);

    }else{
    
    // let prazo = document.getElementById("Deadline").value;
    
    // let diasFaltando = Math.abs(((((new Date(desde) - new Date(prazo))/1000)/60)/60)/24);

    const cartao = document.createElement("div");
    // let id = document.querySelectorAll(".card").length + 1;
    // console.log("LogAlfa: " + Math.round(Math.random() *10000));
    let id = Math.round(Math.random() *10000);
    // let id = localStorage.key(localStorage.length-1) + 1;
    // console.log("logX" + eval(localStorage.key(localStorage.length-1)+1));
    // console.log("logY" + localStorage.key(localStorage.length-1)+1);
    cartao.classList.add("card");

    desde = ConvertDate(desde);

    cartao.innerHTML = `
        <table id="${id}">
                        <tr>
                            <th class="tablename" colspan="4" id="${id}n">${nome}</th>
                        </tr>
                        <tr class="tableheader">
                            <th>Falta(R$):</th>
                            <th>Pago(R$):</th>
                            <th>Dívida(R$):</th>
                            <th>Desde:</th>
                        </tr>
                        <tr class="tablebody">
                            <td id="${id}f">${falta}</td>
                            <td id="${id}p">${pago}</td>
                            <td id="${id}d">${divida}</td>
                            <td id="${id}t">${desde}</td>
                        </tr>
                        <tr class="tablefooter">
                            <th colspan="4">
                                <button class="btnEdit" onclick="Edit(${id})"><i class="fa-solid fa-pen"></i> - Atualizar</button>
                                <button class="btnDelete" onclick="Deletar(${id})"><i class="fa-solid fa-trash"></i> - Apagar</button>
                            </th>
                        </tr>
            </table>
    `;
// Antigo card sem tabela
// <div class="debit" id="${id}">
        //     <div class="name">
        //         <h5 id="${id}n">${nome}</h5>
        //     </div>
        //     <span>Falta(R$):</span><span id="${id}f">${falta}</span>
        //     <span>Pago(R$):</span><span id="${id}p">${pago}</span>
        //     <span>Dívida(R$):</span><span id="${id}d">${divida}</span>
        //     <span>Desde: </span><span id="${id}t">${desde}</span>
        //     <div class="debitbtns">
        //         <button class="btns" onclick="Edit(${id})"><i class="fa-solid fa-pen"></i></button>
        //         <button class="btns" onclick="Deletar(${id})"><i class="fa-solid fa-trash"></i></button>
        //     </div>
        // </div>

// Botão quitar
{/* <button class="btns" onclick="Quitar(${id})"><i class="fa-solid fa-check"></i></button> */}

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
    // ApagarDados(id);
    dialogoDelete.showModal();  
    
}

function Edit(id){
    editando = true;
    CurrentID = id;
    document.getElementById("DialogTitleText").innerText = "Atualizar Dívida";
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
    let hoje = new Date();
    let dia = hoje.getDate()<10 ? "0" + hoje.getDate() : hoje.getDate();
    let mes = (hoje.getMonth()+1)<10 ? "0" + (hoje.getMonth()+1) : (hoje.getMonth()+1);
    let ano = hoje.getFullYear();
    // let datadeHoje = dia.getFullYear() + "/" + (dia.getMonth()+1) + "/" + dia.getDate();
    let datadeHoje = ano + "-" + mes + "-" + dia;
    // let datadeHoje = dia.getDate() + "/" + (dia.getMonth()+1) + "/" + dia.getFullYear();
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
    elemento.parentElement.remove(elemento);
    ApagarDados(CurrentID);
    closeDeleteModal();
}

function PaidConfirm(){
    let elemento = document.getElementById(CurrentID);  
    elemento.parentElement.removeChild(elemento);
    closePaidModal();
}