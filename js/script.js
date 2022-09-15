const tabelaCorpo = document.querySelector(".tabela__corpo");
const inputJogador = document.querySelector(".controle__input");
const mensagem = document.querySelector(".controle__mensagem");
const botaoAdicionaJogador = document.querySelector(".controle__adicionar");
const botaoExecutaPartida = document.querySelector(".executa-partida");
const listaJogadores = [];

botaoAdicionaJogador.addEventListener("click", () => {
    criaNovoJogador(inputJogador.value);
    limpaCampo();
});

botaoExecutaPartida.addEventListener("click", () => {
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
        voz: false,
        ganhouDe: function(outroJogador) {
            this.pontos++;
            outroJogador.baixas++;
        },
        empatouCom: function(outroJogador) {
            this.pontos++;
            this.baixas++;
            outroJogador.pontos++;
            outroJogador.baixas++;
        }
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
        setaMensagem("Campo vazio!");
        return false;
    }
    if(procuraNomeRepetido(listaJogadores, jogadorNome)) {
        setaMensagem("Este jogador já existe!");
        return false;
    }
    setaMensagem();
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
        setaMensagem("Adicione pelo menos dois jogadores!");
        return;
    }

    const jogadores = geraJogadoresAleatorios();
    const jogador1 = jogadores[0];
    const jogador2 = jogadores[1];

    geraLatenciaAleatoria();

    if(jogador1.latencia < jogador2.latencia) {
        jogador1.ganhouDe(jogador2);
        console.log(jogador1.nome + " matou " + jogador2.nome);
    } else if(jogador1.latencia > jogador2.latencia) {
        jogador2.ganhouDe(jogador1);
        console.log(jogador2.nome + " matou " + jogador1.nome);
    } else {
        jogador1.empatouCom(jogador2);
        console.log(jogador1.nome + " matou " + jogador2.nome);
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

function setaMensagem(mensagemPassada = "") {
    mensagem.textContent = mensagemPassada;
}