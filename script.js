const perguntas = [
    {
        q: "Você vê um vídeo do diretor da escola dizendo que amanhã não haverá aula, mas a voz dele parece robótica. O que faz?",
        options: [
            { text: "Comemoro e repasso o vídeo para todos os grupos.", correct: false },
            { text: "Desconfio do áudio e confiro no canal oficial da escola.", correct: true }
        ]
    },
    {
        q: "Uma foto polêmica de um político famoso surge na internet. As bordas do rosto dele estão borradas e os dedos estão deformados. É real?",
        options: [
            { text: "Provavelmente é uma imagem gerada por IA (Deepfake).", correct: true },
            { text: "É real, os políticos saem mal em fotos às vezes.", correct: false }
        ]
    }
];

let indiceAtual = 0;

function carregarPergunta() {
    const pAtual = perguntas[indiceAtual];
    document.getElementById("pergunta").innerText = pAtual.q;
    const divAlts = document.getElementById("alternativas");
    divAlts.innerHTML = "";
    document.getElementById("resultado").innerText = "";
    document.getElementById("resultado").className = "";
    document.getElementById("btn-proximo").style.display = "none";

    pAtual.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt.text;
        btn.classList.add("btn-opt");
        btn.onclick = () => responder(opt.correct);
        divAlts.appendChild(btn);
    });
}

function responder(correto) {
    const res = document.getElementById("resultado");
    if (correto) {
        res.innerText = "🌟 Correto! Você agiu como um bom cidadão digital.";
        res.className = "sucesso";
    } else {
        res.innerText = "❌ Errado! Cuidado, assim você ajuda a espalhar desinformação.";
        res.className = "erro";
    }
    
    // Desabilita os botões após responder
    const botoes = document.querySelectorAll(".btn-opt");
    botoes.forEach(b => b.disabled = true);

    if (indiceAtual < perguntas.length - 1) {
        document.getElementById("btn-proximo").style.display = "inline-block";
    }
}

function proximaPergunta() {
    indiceAtual++;
    carregarPergunta();
}

// Inicia o jogo ao carregar a página
window.onload = carregarPergunta;
