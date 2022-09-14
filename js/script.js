const tabelaCorpo = document.querySelector(".tabela__corpo");
const inputJogador = document.querySelector(".controle__input");
const mensagem = document.querySelector(".controle__mensagem");
const botaoAdicionaJogador = document.querySelector(".controle__adicionar");
const listaJogadores = [];

botaoAdicionaJogador.addEventListener("click", () => {
    criaNovoJogador(inputJogador.value);
    limpaCampo();
    novaRodada();
});

function criaNovoJogador(nomeJogador) {
    const nomeFormatado = formataNome(nomeJogador);
    if(!validaNome(nomeFormatado)) {
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
    listaJogadores.push(jogador);
}

function adicionaJogador(jogador) {
    tabelaCorpo.innerHTML += 
    `<tr class="jogador">
        <td class="jogador__nome">${jogador.nome}</td>
        <td class="jogador__pontos">${jogador.pontos}</td>
        <td class="jogador__baixas">${jogador.baixas}</td>
        <td class="jogador__latencia">${jogador.latencia}</td>
        <td class="jogador__voz">${adicionaIconeDeVoz(jogador.voz)}</td>
    </tr>`;
}

function adicionaJogadores(jogadores) {
    for(let jogador of jogadores) {
        adicionaJogador(jogador);
    }
}

function atualizaTela() {
    tabelaCorpo.innerHTML = "";
    adicionaJogadores(listaJogadores);
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
        mensagem.textContent = "Campo vazio!";
        return false;
    }
    if(procuraNomeRepetido(listaJogadores, jogadorNome)) {
        mensagem.textContent = "Este jogador já existe!";
        return false;
    }
    mensagem.textContent = "";
    return true;
}

function procuraNomeRepetido(listaJogadores, jogadorNome) {
    for(let jogador of listaJogadores) {
        if(jogador.nome == jogadorNome) {
            return true;
        }
    }
    return false;
}

function novaRodada() {
    if(listaJogadores.length < 2) {
        return;
    }

    const jogadores = geraJogadoresAleatorios();
    const jogador1 = jogadores[0];
    const jogador2 = jogadores[1];
    // console.log(jogadores);

    geraLatenciaAleatoria();

    if(jogador1.latencia < jogador2.latencia) {
        jogador1.pontos++;
        jogador2.baixas++;
        console.log(jogador1.nome + " matou " + jogador2.nome);
    } else if(jogador1.latencia > jogador2.latencia) {
        jogador1.baixas++;
        jogador2.pontos++;
        console.log(jogador2.nome + " matou " + jogador1.nome);
    }

    listaJogadores.sort((a, b) => {
        return b.pontos - a.pontos;
    });

    atualizaTela();
}

function geraLatenciaAleatoria() {
    for(let jogador in listaJogadores) {
        listaJogadores[jogador].latencia = Math.floor(Math.random() * 201);
    }
}

function geraIndexAleatorioDoJogador() {
    return Math.floor(Math.random() * listaJogadores.length);
}

function geraJogadoresAleatorios() {
    let jogador1 = 0;
    let jogador2 = 0;

    while(jogador1 == jogador2) {
        jogador1 = listaJogadores[geraIndexAleatorioDoJogador()];
        jogador2 = listaJogadores[geraIndexAleatorioDoJogador()];
    }

    return [jogador1, jogador2];
}