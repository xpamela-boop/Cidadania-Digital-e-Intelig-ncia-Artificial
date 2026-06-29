// Banco de perguntas do Quiz
const questions = [
    {
        text: "Uma deepfake pode imitar perfeitamente a voz de uma pessoa usando apenas alguns segundos de uma gravação real.",
        answer: true,
        explanation: "Correto! Inteligências Artificiais avançadas conseguem clonar vozes com amostras curtíssimas de áudio."
    },
    {
        text: "Todas as imagens e vídeos que circulam nas redes sociais com o selo de 'Urgente' são verdadeiros.",
        answer: false,
        explanation: "Falso! Muitas fake news utilizam termos alarmistas como 'Urgente' ou 'Alerta' para gerar pânico e compartilhamentos rápidos."
    },
    {
        text: "Movimentos oculares estranhos ou a falta de piscadas naturais no rosto de alguém em um vídeo podem ser sinais de um vídeo gerado por IA.",
        answer: true,
        explanation: "Correto! Muitas ferramentas de IA ainda falham em reproduzir perfeitamente reflexos e piscadas biológicas."
    },
    {
        text: "Se uma notícia foi compartilhada por um amigo ou parente próximo no WhatsApp, significa que ela já foi checada e é segura.",
        answer: false,
        explanation: "Falso! Pessoas próximas também podem ser enganadas e repassar desinformação sem saber."
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Mapeamento dos elementos do HTML
const questionTextElement = document.getElementById("question-text");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const btnFato = document.getElementById("btn-fato");
const btnFake = document.getElementById("btn-fake");

function loadQuestion() {
    // Limpa feedbacks anteriores e reativa os botões
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback-box";
    btnFato.disabled = false;
    btnFake.disabled = false;
    
    if (currentQuestionIndex < questions.length) {
        questionTextElement.textContent = questions[currentQuestionIndex].text;
    } else {
        // Fim do Jogo
        questionTextElement.textContent = "Parabéns! Você concluiu o desafio de Cidadania Digital.";
        document.querySelector(".btn-group").style.display = "none";
        feedbackElement.textContent = "Obrigado por jogar e combater a desinformação!";
        feedbackElement.className = "feedback-box";
    }
}

function checkAnswer(userAnswer) {
    // Desativa os botões temporariamente para evitar cliques duplos durante o feedback
    btnFato.disabled = true;
    btnFake.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    
    if (userAnswer === currentQuestion.answer) {
        score++;
        feedbackElement.textContent = "Acertou! " + currentQuestion.explanation;
        feedbackElement.className = "feedback-box correct";
    } else {
        feedbackElement.textContent = "Errou... " + currentQuestion.explanation;
        feedbackElement.className = "feedback-box incorrect";
    }
    
    scoreElement.textContent = `Pontuação: ${score}`;
    currentQuestionIndex++;
    
    // Avança para a próxima pergunta após 3.5 segundos
    setTimeout(loadQuestion, 3500);
}

// Inicializa a primeira pergunta assim que a página carregar
window.onload = loadQuestion;
