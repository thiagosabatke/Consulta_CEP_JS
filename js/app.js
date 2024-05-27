'use strict';

function jsPadrao() {
    let xhr = new XMLHttpRequest();
    // define the request
    xhr.open('GET', 'https://viacep.com.br/ws/01001000/json/');

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        const DONE = 4; // readyState 4 means the request is done.
        const OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log(xhr.responseText); // 'This is the output.'
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
    xhr.send();
}

function jqueryGet() {
    $.get(`https://viacep.com.br/ws/${cep}/json/`, (data) => {
        console.log(data)
    })
}

function preencherFormulario(resposta){
    document.getElementById('endereco').value = resposta.logradouro;
    document.getElementById('bairro').value = resposta.bairro;
    document.getElementById('cidade').value = resposta.localidade;
    document.getElementById('estado').value = resposta.uf;
}

function limparFormulario(){
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

function consultaCep() {
   const cep = document.querySelector('#cep').value;
   const retorno = document.querySelector('#retorno');
   if(cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(json => {
            if(json.hasOwnProperty('erro')) {
                alert('CEP não encontrado');
                limparFormulario();
            } else {
                preencherFormulario(json);
                retorno.innerText = JSON.stringify(json);
            }
        })
   } else {
        alert('CEP inválido')
   }
   
} 

