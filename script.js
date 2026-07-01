// Banco de dados das fases do jogo
const fases = [
    {
        enunciado: "Você recebeu um áudio do diretor da escola em um grupo de WhatsApp cancelando as aulas por tempo indeterminado. A voz dele oscila, parecendo levemente metalizada ou robótica. O que você faz?",
        opcoes: [
            { texto: "Acredito imediatamente, afinal a voz é idêntica à dele, e compartilho em outras redes.", correta: false, justificativa: "Cuidado! Vozes podem ser facilmente clonadas por IA hoje em dia. É preciso sempre validar canais oficiais." },
            { texto: "Desconfio da oscilação do áudio e confiro as postagens nas páginas e canais oficiais da escola.", correta: true, justificativa: "Excelente escolha! Avaliar anomalias sonoras e checar fontes oficiais impede que você caia em golpes ou deepfakes de áudio." }
        ]
    },
    {
        enunciado: "Ao navegar por uma rede social, você vê a imagem de uma figura pública em uma situação muito bizarra. Olhando bem, você nota que as orelhas estão borradas e os reflexos nos olhos parecem desalinhados. Qual o diagnóstico?",
        opcoes: [
            { texto: "É altamente provável que seja uma imagem manipulada ou gerada sinteticamente por IA.", correta: true, justificativa: "Correto! Assimetrias, falta de foco em partes periféricas (como orelhas) e reflexos inconsistentes nos olhos são assinaturas típicas de imagens de IA." },
            { texto: "É apenas uma fotografia tirada com uma câmera de baixa qualidade ou iluminação ruim.", correta: false, justificativa: "Incorreto. Erros anatômicos repetitivos e falhas em detalhes finos costumam indicar manipulação algorítmica." }
        ]
    },
    {
        enunciado: "Um link enviado por um perfil desconhecido traz um texto alarmante sobre uma suposta nova regra escolar de punição massiva. O texto não cita nenhuma fonte, mas pede compartilhamento rápido. Qual a melhor prática?",
        opcoes: [
            { texto: "Não compartilhar, buscar o texto completo em mecanismos de busca e verificar se veículos sérios confirmam.", correta: true, justificativa: "Perfeito! O comportamento de urgência artificial sem fontes declaradas é a base das campanhas de desinformação." },
            { texto: "Encaminhar para os grupos de amigos para alertar a todos preventivamente.", correta: false, justificativa: "Evite isso! O compartilhamento por impulso automatiza a distribuição de notícias falsas e gera pânico desnecessário." }
        ]
    }
];

let faseAtual = 0;
let score = 0;

function carregarFase() {
    const dados = fases[faseAtual];
    
    // Atualiza cabeçalho e textos
    document.getElementById("num-pergunta").innerText = faseAtual + 1;
    document.getElementById("pontuacao").innerText = score;
    document.getElementById("enunciado").innerText = dados.enunciado;
    
    // Reseta elementos visuais de feedback
    const feedbackBox = document.getElementById("feedback");
    feedbackBox.className = "feedback oculto";
    document.getElementById("btn-proximo").classList.add("oculto");
    
    // Renderiza botões de opção
    const containerOpcoes = document.getElementById("opcoes-container");
    containerOpcoes.innerHTML = "";
    
    dados.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.className = "btn-choice";
        botao.innerText = opcao.texto;
        botao.onclick = () => avaliarResposta(index);
        containerOpcoes.appendChild(botao);
    });
}

function avaliarResposta(indexSelecionado) {
    const dados = fases[faseAtual];
    const opcaoEscolhida = dados.opcoes[indexSelecionado];
    const feedbackBox = document.getElementById("feedback");
    
    // Bloqueia cliques adicionais nos botões desta fase
    const botoes = document.querySelectorAll(".btn-choice");
    botoes.forEach(b => b.disabled = true);
    
    if (opcaoEscolhida.correta) {
        score += 10;
        document.getElementById("pontuacao").innerText = score;
        feedbackBox.innerText = "🌟 " + opcaoEscolhida.justificativa;
        feedbackBox.className = "feedback correto";
    } else {
        feedbackBox.innerText = "❌ " + opcaoEscolhida.justificativa;
        feedbackBox.className = "feedback errado";
    }
    
    // Exibe o botão para avançar ou concluir
    const btnNext = document.getElementById("btn-proximo");
    if (faseAtual < fases.length - 1) {
        btnNext.innerText = "Próxima Fase ➡️";
    } else {
        btnNext.innerText = "Finalizar Jogo 🏁";
    }
    btnNext.classList.remove("oculto");
}

function proximaFase() {
    if (faseAtual < fases.length - 1) {
        faseAtual++;
        carregarFase();
    } else {
        // Fim de jogo
        const quizBox = document.getElementById("quiz-container");
        document.getElementById("jogo").innerHTML = `
            <h2>🎮 Jogo Concluído!</h2>
            <div class="quiz-box" style="text-align: center; padding: 40px 20px;">
                <h3>Sua pontuação final foi de: <span style="color: #2c5364; font-size: 2rem;">${score}</span> pontos.</h3>
                <p style="margin-top: 15px;">Continue praticando a cidadania digital e analise criticamente tudo o que consome na rede!</p>
                <button class="btn-choice" style="width: auto; margin: 20px auto 0; text-align: center;" onclick="location.reload()">Jogar Novamente</button>
            </div>
        `;
    }
}

// Inicialização automática ao carregar a página
window.onload = carregarFase;
