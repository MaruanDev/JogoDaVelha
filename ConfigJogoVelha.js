document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".btn");
    let estadoTabuleiro = Array(9).fill(null); // Estado do jogo
    let jogadorAtual = 1; // 1 = "X", 0 = "O"

    // Placar
    let vitoriasJogador1 = 0; // Vitória de "X"
    let vitoriasJogador2 = 0; // Vitória de "O"
    let empates = 0; // Empates

    // Caminhos para as imagens
    const imagemX = "imagens/bolinhaGif.gif"; // Imagem para "X"
    const imagemO = "imagens/xGif.gif"; // Imagem para "O"

    // Controle de quem começa o jogo
    let iniciaComJogador1 = true; // True = Jogador 1 começa, False = Jogador 2 começa

    // Atualiza o placar na página
    function atualizarPlacar() {
        document.getElementById("placar-jogador1").textContent = vitoriasJogador1;
        document.getElementById("placar-jogador2").textContent = vitoriasJogador2;
        document.getElementById("placar-velha").textContent = empates;
    }

    // Função para atualizar a vez do jogador
    function atualizarVez() {
        const vezDeElemento = document.getElementById("placar-vez-de");
        vezDeElemento.textContent = jogadorAtual === 1 ? "O" : "X"; // Exibe "X" ou "O"
    }

    // Atualiza a vez do jogador ao carregar a página
    atualizarVez();

    // Adiciona evento de clique a cada botão
    botoes.forEach((botao, index) => {
        botao.addEventListener("click", () => {
            if (estadoTabuleiro[index] === null) {
                // Atualiza o estado do tabuleiro
                estadoTabuleiro[index] = jogadorAtual;

                // Define a imagem no botão
                const imagem = document.createElement("img");
                imagem.src = jogadorAtual === 1 ? imagemX : imagemO; // Troca de X para O e vice-versa
                botao.appendChild(imagem);
                botao.disabled = true; // Desativa o botão após o clique

                // Verifica vitória ou empate
                setTimeout(() => {
                    if (verificarVencedor()) {
                        if (jogadorAtual === 1) {
                            vitoriasJogador1++; // Jogador 1 venceu
                        } else {
                            vitoriasJogador2++; // Jogador 2 venceu
                        }
                        atualizarPlacar();
                        alert(`Jogador ${jogadorAtual === 1 ? "O" : "X"} venceu!`);
                        reiniciarJogo();
                    } else if (!estadoTabuleiro.includes(null)) {
                        empates++; // Incrementa o número de empates
                        atualizarPlacar();
                        alert("Deu velha!");
                        reiniciarJogo();
                    } else {
                        jogadorAtual = 1 - jogadorAtual; // Alterna entre 1 (X) e 0 (O)
                        atualizarVez(); // Atualiza a vez após alternar o jogador
                    }
                }, 100); // Pequeno atraso para garantir que a imagem apareça antes de verificar
            }
        });
    });

    // Função para verificar vitória
    function verificarVencedor() {
        const combinacoesVencedoras = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas verticais
            [0, 4, 8], [2, 4, 6] // Diagonais
        ];

        return combinacoesVencedoras.some((combinacao) => {
            const [a, b, c] = combinacao;
            return (
                estadoTabuleiro[a] !== null &&
                estadoTabuleiro[a] === estadoTabuleiro[b] &&
                estadoTabuleiro[b] === estadoTabuleiro[c]
            );
        });
    }

    // Função para reiniciar o jogo
    function reiniciarJogo() {
        estadoTabuleiro.fill(null); // Limpa o estado do tabuleiro
        botoes.forEach((botao) => {
            botao.innerHTML = ""; // Remove as imagens
            botao.disabled = false; // Reabilita os botões
        });

        // Alterna o jogador que vai começar na próxima partida
        iniciaComJogador1 = !iniciaComJogador1;
        jogadorAtual = iniciaComJogador1 ? 1 : 0; // Se começar com o jogador 1, ele é o X (1), caso contrário, O (0)

        // Atualiza a vez do jogador
        atualizarVez();
    }

    
});
