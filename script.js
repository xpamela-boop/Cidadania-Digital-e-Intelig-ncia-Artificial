const fases = [
    {
        enunciado: "Você recebeu um áudio do diretor da escola em um grupo de WhatsApp cancelando as aulas por tempo indeterminado. A voz dele oscila, parecendo levemente metalizada ou robótica. O que você faz?",
        opcoes: [
            { texto: "Acredito imediatamente, afinal a voz é idêntica à dele, e compartilho em outras redes.", correta: false, justificativa: "Cuidado! Vozes podem ser facilmente clonadas por IA hoje em dia. É preciso sempre validar canais oficiais." },
            { texto: "Desconfio da oscilação do áudio e confiro as postagens nas páginas e canais oficiais da escola.", correta: true, justificativa: "Excelente escolha! Avaliar anomalias sonoras e checar fontes oficiais impede que você caia em golpes ou deepfakes de áudio." }
        ],
        badge: "🛡️ Perito em Áudio"
    },
    {
        enunciado: "Ao navegar por uma rede social, você vê a imagem de uma figura pública em uma situação muito bizarra. Olhando bem, você nota que as orelhas estão borradas e os reflexos nos olhos parecem desalinhados. Qual o diagnóstico?",
        opcoes: [
            { texto: "É altamente provável que seja uma imagem manipulada ou gerada sinteticamente por IA.", correta: true, justificativa: "Correto! Assimetrias, falta de foco em partes periféricas (como orelhas) e reflexos inconsistentes nos olhos são assinaturas típicas de imagens de IA." },
            { texto: "É apenas uma fotografia tirada com uma câmera de baixa qualidade ou iluminação ruim.", correta: false, justificativa: "Incorreto. Erros anatômicos repetitivos e falhas em detalhes finos costumam indicar manipulação algorítmica." }
        ],
        badge: "👁️ Olhar Clínico"
    },
    {
        enunciado: "Um link enviado por um perfil desconhecido traz um texto alarmante sobre uma suposta nova regra escolar de punição massiva. O texto não cita nenhuma fonte, mas pede compartilhamento rápido. Qual a melhor prática?",
        opcoes: [
            { texto: "Não compartilhar, buscar o texto completo em mecanismos de busca e verificar se veículos sérios confirmam.", correta: true, justificativa: "Perfeito! O comportamento de urgência artificial sem fontes declaradas é a base das campanhas de desinformação." },
            { texto: "Encaminhar para os grupos de amigos para alertar a todos preventivamente.", correta: false, justificativa: "Evite isso! O compartilhamento por impulso automatiza a distribuição de notícias falsas e gera pânico desnecessário." }
        ],
        badge: "🧠 Mestre Antifake"
    }
];

let faseAtual = 0;
let score = 0;
let conquistas = [];

function carregarFase() {
    const dados = fases[faseAtual];
    
    document.getElementById("num-pergunta").innerText = faseAtual + 1;
    document.getElementById("pontuacao").innerText = score;
    document.getElementById("enunciado").innerText = dados.enunciado;
    
    const feedbackBox = document.getElementById("feedback");
    feedbackBox.className = "feedback oculto";
    document.getElementById("btn-proximo").classList.add("oculto");
    
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
    
    const botoes = document.querySelectorAll(".btn-choice");
    botoes.forEach(b => b.disabled = true);
    
    if (opcaoEscolhida.correta) {
        score += 100;
        document.getElementById("pontuacao").innerText = score;
        feedbackBox.innerText = "🌟 " + opcaoEscolhida.justificativa;
        feedbackBox.className = "feedback correto";
        
        // Adiciona Item Premium (Badge)
        conquistas.push(dados.badge);
        atualizarBadges();
    } else {
        feedbackBox.innerText = "❌ " + opcaoEscolhida.justificativa;
        feedbackBox.className = "feedback errado";
    }
    
    const btnNext = document.getElementById("btn-proximo");
    btnNext.innerText = faseAtual < fases.length - 1 ? "Próxima Fase ➡️" : "Finalizar Análise 🏁";
    btnNext.classList.remove("oculto");
}

function atualizarBadges() {
    const box = document.getElementById("conquistas-container");
    const lista = document.getElementById("lista-badges");
    
    if(conquistas.length > 0) {
        box.classList.remove("oculto");
        lista.innerHTML = "";
        conquistas.forEach(badge => {
            const el = document.createElement("span");
            el.className = "badge-item";
            el.innerText = badge;
            lista.appendChild(el);
        });
    }
}

function proximaFase() {
    if (faseAtual < fases.length - 1) {
        faseAtual++;
        carregarFase();
    } else {
        const jogoSec = document.getElementById("jogo");
        let tituloFinal = score === 300 ? "👑 Detetive Digital Premium" : "🕵️ Investigador em Treinamento";
        
        jogoSec.innerHTML = `
            <h2>🎮 Caso Concluído!</h2>
            <div class="quiz-box" style="text-align: center; padding: 40px 20px;">
                <h3 style="color: #eab308; font-size: 1.8rem; margin-bottom: 10px;">${tituloFinal}</h3>
                <h4>Pontuação Final: <span class="glow-text" style="font-size: 2rem;">${score}</span> XP</h4>
                <p style="margin: 20px 0; color: #94a3b8;">Você adquiriu ${conquistas.length} de 3 medalhas de proteção cibernética disponíveis.</p>
                <button class="btn-choice" style="width: auto; margin: 10px auto 0; padding: 12px 30px;" onclick="location.reload()">Reiniciar Simulador</button>
            </div>
        `;
    }
}

window.onload = carregarFase;
