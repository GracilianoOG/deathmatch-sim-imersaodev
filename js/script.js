const tabelaCorpo = document.querySelector(".tabela__corpo");
const inputJogador = document.querySelector(".controle__input");
const botaoAdicionaJogador = document.querySelector(".controle__adicionar");
const gordon = {
    nome: "Gordon",
    pontos: 56,
    baixas: 45,
    latencia: 200,
    voz: true
};
const shepard = {
    nome: "Shepard",
    pontos: 5,
    baixas: 2,
    latencia: 87,
    voz: false
};
const listaJogadores = [gordon, shepard];

botaoAdicionaJogador.addEventListener("click", () => {
    criaNovoJogador(inputJogador.value);
    limpaCampo();
});

function criaNovoJogador(nomeJogador) {
    const nomeFormatado = formataNome(nomeJogador);
    if(!validaNome(nomeFormatado)) {
        console.log("Nome inválido");
        return;
    }
    const jogador = {
        nome: nomeJogador,
        pontos: 0,
        baixas: 0,
        latencia: 0,
        voz: false
    }
    adicionaJogador(jogador);
    // listaJogadores.push(jogador);
}

function adicionaJogador(jogador) {
    tabelaCorpo.innerHTML += 
    `<tr>
        <td>${jogador.nome}</td>
        <td>${jogador.pontos}</td>
        <td>${jogador.baixas}</td>
        <td>${jogador.latencia}</td>
        <td>${adicionaIconeDeVoz(jogador.voz)}</td>
    </tr>`;
}

function adicionaIconeDeVoz(bool) {
    if(bool) {
        return "🔊";
    }
    return "🔈";
}

function limpaCampo() {
    inputJogador.value = "";
}

function formataNome(jogadorNome) {
    return jogadorNome.trim();
}

function validaNome(jogadorNome) {
    if(jogadorNome == "") {
        return false;
    }
    return true;
}