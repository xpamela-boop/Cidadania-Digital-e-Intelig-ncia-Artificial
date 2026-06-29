// Banco de perguntas do Quiz (true para FATO, false para FAKE)
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
        text: "Movimentos oculares estranhos ou a falta de piscadas naturais no rosto de alguém em um vídeo podem ser sinais de um vídeo gerado por IA (deepfake).",
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

const questionTextElement = document.getElementById("question-text");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");

function loadQuestion() {
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback-box";
    
    if (currentQuestionIndex < questions.length) {
        questionTextElement.textContent = questions[currentQuestionIndex].text;
    } else {
        // Fim do Jogo
        questionTextElement.textContent = "Parabéns! Você concluiu o desafio de Cidadania Digital.";
        document.querySelector(".btn-group").style.display = "none";
        feedbackElement.textContent = `Obrigado por jogar e combater a desinformação!`;
    }
}

function checkAnswer(userAnswer) {
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
    
    // Espera 4 segundos para carregar a próxima pergunta para dar tempo de ler o feedback
    setTimeout(loadQuestion, 4000);
}

// Inicia o jogo ao carregar a página
window.onload = loadQuestion;
