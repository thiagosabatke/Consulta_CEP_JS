'use strict'

function salvarCep(){
    event.preventDefault();
    
    let CEP = document.getElementById('cep').value;
    let Endereco = document.getElementById('endereco').value;
    let Numero_residencia = document.getElementById('numero').value;
    let Bairro = document.getElementById('bairro').value;
    let Cidade = document.getElementById('cidade').value;
    let UF = document.getElementById('estado').value;

    if (CEP == '' || Endereco == '' || Numero_residencia == '' || Bairro == '' || Cidade == '' || UF == '') {
        window.alert('verifique se os dados estao todos preenchidos');
        return false;
    }

    if (Numero_residencia < 1) {
        window.alert('verifique se o numero esta correto');
        return false
    }


    let tabela = document.getElementById('tabela');
    let tamanho_tabela = tabela.rows.length;
    let linha = tabela.insertRow(tamanho_tabela);


    linha.id = "linha_" + tamanho_tabela;
    linha.insertCell(0).innerHTML = tamanho_tabela;
    linha.insertCell(1).innerHTML = Endereco;
    linha.insertCell(2).innerHTML = CEP;
    linha.insertCell(3).innerHTML = Numero_residencia;
    linha.insertCell(4).innerHTML = Bairro;
    linha.insertCell(5).innerHTML = Cidade;
    linha.insertCell(6).innerHTML = UF;
    
    let cell_botao = linha.insertCell(7);
    let botao_deletar = document.createElement("button");
    botao_deletar.id = "botao_deletar_" + tamanho_tabela;
    botao_deletar.innerText = "deletar";
    botao_deletar.classList.add("deletar");
    botao_deletar.onclick = function () {
        deletarEndereco(linha);
    }
    cell_botao.appendChild(botao_deletar);

    salvarDadosLocalStorage();

    limparDados();
}

function limparDados(){
    document.getElementById('cep').value = "";
    document.getElementById('endereco').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

function salvarDadosLocalStorage(){
    let tabela = document.getElementById('tabela');
    let dados = [];

    for (let i = 1;i < tabela.rows.length; i++){
        let linha = tabela.rows[i];
        let Enderecos = {
            "Endereco": linha.cells[1].innerHTML,
            "CEP": linha.cells[2].innerHTML,
            "Numero_residencia": linha.cells[3].innerHTML,
            "Bairro": linha.cells[4].innerHTML,
            "Cidade": linha.cells[5].innerHTML,
            "UF": linha.cells[6].innerHTML,
        };
        dados.push(Enderecos);
    }

    localStorage.setItem("dados_enderecos", JSON.stringify(dados));
}

function carregarDadosLocalStorage(){
    let dados = localStorage.getItem("dados_enderecos");

    if(dados !== null) {
        dados = JSON.parse(dados);

        for (let Enderecos of dados) {
            let tabela = document.getElementById('tabela');
            let tamanho_tabela = tabela.rows.length;
            let linha = tabela.insertRow(tamanho_tabela);

            linha.id = "linha_" + tamanho_tabela;
            linha.insertCell(0).innerHTML = tamanho_tabela;
            linha.insertCell(1).innerHTML = Enderecos.Endereco;
            linha.insertCell(2).innerHTML = Enderecos.CEP;
            linha.insertCell(3).innerHTML = Enderecos.Numero_residencia;
            linha.insertCell(4).innerHTML = Enderecos.Bairro;
            linha.insertCell(5).innerHTML = Enderecos.Cidade;
            linha.insertCell(6).innerHTML = Enderecos.UF;

            let cell_botao = linha.insertCell(7);
            let botao_deletar = document.createElement("button");
            botao_deletar.id = "botao_deletar_" + tamanho_tabela;
            botao_deletar.innerText = "deletar";
            botao_deletar.classList.add("deletar");
            botao_deletar.onclick = function () {
                deletarEndereco(linha);
            }
            cell_botao.appendChild(botao_deletar);
        }
    }
}

function deletarEndereco(linha){
    let index = linha.rowIndex;
    let tabela = document.getElementById('tabela');
    tabela.deleteRow(index);

    salvarDadosLocalStorage();
}

window.onload = function() {
    carregarDadosLocalStorage();
};