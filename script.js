function verificarResposta(isCorrect) {
    const resultado = document.getElementById("resultado-quiz");
    
    if (isCorrect) {
        resultado.textContent = "Parabéns! Você agiu certo. Sempre verifique canais oficiais antes de acreditar ou transferir qualquer valor.";
        resultado.className = "correto";
    } else {
        resultado.textContent = "Cuidado! Esse é um golpe comum usando deepfake de voz e vídeo. Sempre desconfie e cheque em fontes seguras.";
        resultado.className = "errado";
    }
}
