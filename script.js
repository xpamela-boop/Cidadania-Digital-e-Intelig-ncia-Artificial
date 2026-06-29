const perguntas = [
    {
        texto: "Você recebeu um vídeo de um cientista famoso no WhatsApp dizendo que a Terra vai parar de girar amanhã. A voz parece dele, mas os lábios estão levemente borrados e piscam de forma estranha. É real?",
        respostaCorreta: false,
        explicacao: "Falso! Movimentos artificiais nos lábios e falhas visuais ao redor dos olhos ou boca são indícios clássicos de vídeos manipulados por IA (Deepfakes)."
    },
    {
        texto: "Um portal de notícias de grande credibilidade publicou uma matéria assinada por jornalistas reais alertando sobre um novo golpe na internet. É seguro compartilhar?",
        respostaCorreta: true,
        explicacao: "Verdadeiro! Cruzar informações e buscar fontes jornalísticas conhecidas e com expediente transparente é uma excelente prática de cidadania digital."
    },
    {
        texto: "Um áudio atribuído a um diretor de escola circula nos grupos dos alunos cancelando as aulas. O áudio não tem ruído de fundo, a voz soa perfeitamente limpa, mas o ritmo da fala é robótico e sem entonação emocional. É autêntico?",
        respostaCorreta: false,
        explicacao: "Falso! Ferramentas de clonagem de voz por IA costumam gerar falhas na cadência natural da fala, resultando em frases excessivamente robóticas ou sem respiração adequada."
    }
];

let indiceAtual = 0;
let acertos = 0;

function carregarPergunta() {
    // Esconde o container de feedback e reativa os botões de resposta
    document.getElementById("container-feedback").classList.add("escondido");
    alternarBotoesResposta(false);

    if (indiceAtual < perguntas.length) {
        document.getElementById("progresso").innerText = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
        document.getElementById("pergunta").innerText = perguntas[indiceAtual].texto;
    } else {
        mostrarResultadoFinal();
    }
}

function verificarResposta(respostaUsuario) {
    const feedbackDiv = document.getElementById("feedback");
    const containerFeedback = document.getElementById("container-feedback");
    const perguntaAtual = perguntas[indiceAtual];

    // Desativa os botões para o usuário não clicar múltiplas vezes
    alternarBotoesResposta(true);
    containerFeedback.classList.remove("escondido");

    if (respostaUsuario === perguntaAtual.respostaCorreta) {
        feedbackDiv.className = "correto";
        feedbackDiv.innerText = "🎯 Parabéns, você acertou! " + perguntaAtual.explicacao;
        acertos++;
    } else {
        feedbackDiv.className = "errado";
        feedbackDiv.innerText = "❌ Ops, não é bem assim! " + perguntaAtual.explicacao;
    }
}

function avancarPergunta() {
    indiceAtual++;
    carregarPergunta();
}

function alternarBotoesResposta(desabilitar) {
    document.getElementById("btn-verdadeiro").disabled = desabilitar;
    document.getElementById("btn-falso").disabled = desabilitar;
}

function mostrarResultadoFinal() {
    document.getElementById("caixa-jogo").classList.add("escondido");
    const resultadoDiv = document.getElementById("resultado-final");
    resultadoDiv.classList.remove("escondido");
    
    let mensagemDesempenho = "";
    if (acertos === perguntas.length) {
        mensagemDesempenho = "Excelente! Você é um verdadeiro Detetive Digital e sabe se proteger da desinformação. 🛡️";
    } else if (acertos > 0) {
        mensagemDesempenho = "Bom trabalho! Mas fique atento aos detalhes para não ser enganado por mídias manipuladas. 🔍";
    } else {
        mensagemDesempenho = "Cuidado! É importante estudar mais sobre deepfakes para navegar na internet com segurança. ⚠️";
    }

    document.getElementById("pontuacao").innerHTML = `Você acertou <strong>${acertos}</strong> de <strong>${perguntas.length}</strong> desafios.<br><br>${mensagemDesempenho}`;
}

function reiniciarJogo() {
    indiceAtual = 0;
    acertos = 0;
    document.getElementById("caixa-jogo").classList.remove("escondido");
    document.getElementById("resultado-final").classList.add("escondido");
    carregarPergunta();
}

// Inicializa o jogo
carregarPergunta();
