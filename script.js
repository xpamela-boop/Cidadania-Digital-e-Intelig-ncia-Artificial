const perguntas = [
    {
        texto: "Você recebeu um vídeo de um cientista famoso no WhatsApp dizendo que a Terra vai parar de girar amanhã. A voz parece dele, mas os lábios dele estão meio borrados e piscam estranho. É real?",
        respostaCorreta: false,
        explicacao: "Falso! Movimentos estranhos nos lábios e piscadas desalinhadas são sinais clássicos de vídeos manipulados por Inteligência Artificial (Deepfakes)."
    },
    {
        texto: "Um portal de notícias de grande credibilidade publicou uma matéria assinada por jornalistas reais alertando sobre um novo golpe na internet. É seguro compartilhar?",
        respostaCorreta: true,
        explicacao: "Verdadeiro! Checar se a notícia está em portais jornalísticos conhecidos e confiáveis é uma excelente prática de cidadania digital."
    },
    {
        texto: "Um áudio de um candidato à prefeitura circulou na escola falando palavrões. O áudio não tem ruído de fundo nenhum, parece gravado em estúdio perfeito, mas o ritmo da fala está robótico. Pode ser falso?",
        respostaCorreta: false, // Falso = significa que o áudio é falso/manipulado
        explicacao: "Falso! Clonagem de voz por IA costuma deixar a fala sem ritmo natural (robótica) e sem os barulhos normais do ambiente onde a pessoa estaria."
    }
];

let indiceAtual = 0;
let acertos = 0;

function carregarPergunta() {
    if (indiceAtual < perguntas.length) {
        document.getElementById("pergunta").innerText = perguntas[indiceAtual].texto;
        document.getElementById("feedback").classList.add("escondido");
    } else {
        mostrarResultadoFinal();
    }
}

function verificarResposta(respostaUsuario) {
    const feedbackDiv = document.getElementById("feedback");
    const perguntaAtual = perguntas[indiceAtual];

    feedbackDiv.classList.remove("escondido");

    if (respostaUsuario === perguntaAtual.respostaCorreta) {
        feedbackDiv.className = "correto";
        feedbackDiv.innerText = "🎯 Parabéns, você acertou! " + perguntaAtual.explicacao;
        acertos++;
    } else {
        feedbackDiv.className = "errado";
        feedbackDiv.innerText = "❌ Ops! " + perguntaAtual.explicacao;
    }

    // Avança para a próxima pergunta após 4 segundos para dar tempo de ler o feedback
    indiceAtual++;
    setTimeout(carregarPergunta, 4500);
}

function mostrarResultadoFinal() {
    document.getElementById("caixa-jogo").classList.add("escondido");
    const resultadoDiv = document.getElementById("resultado-final");
    resultadoDiv.classList.remove("escondido");
    document.getElementById("pontuacao").innerText = `Você acertou ${acertos} de ${perguntas.length} desafios!`;
}

function reiniciarJogo() {
    indiceAtual = 0;
    acertos = 0;
    document.getElementById("caixa-jogo").classList.remove("escondido");
    document.getElementById("resultado-final").classList.add("escondido");
    carregarPergunta();
}

// Inicia o jogo ao carregar a página
carregarPergunta();
