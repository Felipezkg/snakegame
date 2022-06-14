const borda_tabuleiro = 'black';
const fundo_tabuleiro = "white";
const cobra_col = 'lighblue';
const borda_cobra = 'darkblue';

let cobra = [ 
    {x:200, y:200}, 
    {x:190, y:200}, 
    {x:180, y:200}, 
    {x:170, y:200}, 
    {x:160, y:200},];

// Pontuação Inicial.
let pontuacao = 0;
// Verdadeiro para Mudar a Direção.
let mudando_direcao = false;
let comida_x;
let comida_y;
//Velocidade Horizontal.
let dx = 10;
//Velocidade Vertical.
let dy = 0;


// Puxa o Elemento Canvas.
const cobrinha_tabuleiro = document.getElementById("jogoCanvas");
// Retorna um desenho em duas Dimensões.
const cobrinha_ctx = jogoCanvas.getContext("2d");
// Começa o Jogo.
main();

gerar_comida();

document.addEventListener("keydown", mudar_direcao);

// Função principal chamada repetidamente para manter o jogo rodando.
function main(){

    if(se_o_jogo_acabar()) return;

        mudando_direcao = false;
        setTimeout(function onTick(){
        clearCanvas();
        pintar_comida();
        Mover_Cobra();
        pintarCobra();
        // Chamar o Main denovo.(Repetir)
        main();

    }, 40)
    
}
// Pinta a borda ao redor do Canvas.
function clearCanvas(){
    // Selecione a Cor para Pintar o Desenho.
    cobrinha_ctx.fillStyle = fundo_tabuleiro;
    // Selecione a Cor para a Borda do Canvas.
    cobrinha_ctx.strokestyle = borda_tabuleiro;
    // Desenhe um retângulo "preenchido" para cobrir toda a tela.
    cobrinha_ctx.fillRect(0, 0, cobrinha_tabuleiro.width, cobrinha_tabuleiro.height);
    // Desenhe uma "borda" ao redor de toda a tela.
    cobrinha_ctx.strokeRect(0, 0, cobrinha_tabuleiro.width, cobrinha_tabuleiro.height);
}
// Pintar a Cobra no Canvas.
function pintarCobra(){
    // Desenha cada Parte.
    cobra.forEach(pintarPartedaCobra);
}
// Pintar Comida no Canvas.
function pintar_comida(){
    cobrinha_ctx.fillStyle = 'lightgreen';
    cobrinha_ctx.strokestyle = 'darkgreen';
    cobrinha_ctx.fillRect(comida_x, comida_y, 10, 10);
    cobrinha_ctx.strokeRect(comida_x, comida_y, 10, 10);
}

// Pinta Uma parte da Cobra.
function pintarPartedaCobra(parteCobra){
    // Selecione a Cor para Pintar a Cobra.
    cobrinha_ctx.fillStyle = 'lightblue';
    // Selecione a Cor para a Borda da Cobra.
    cobrinha_ctx.strokestyle = 'darkblue';
    // Desenhe um retângulo "preenchido" para representar a parte da cobra nas coordenadas em 
    // que a parte está localizada
    cobrinha_ctx.fillRect(parteCobra.x, parteCobra.y, 10, 10);
    // Pinta a Borda ao redor da Cobra.
    cobrinha_ctx.strokeRect(parteCobra.x, parteCobra.y, 10, 10);
}

//---------------------------------------------------------------------------DIA: 13/06/22 -------------------------------------------------

function se_o_jogo_acabar(){
    for (let i = 4; i < cobra.length; i++){
        if(cobra[i].x === cobra[0].x && cobra[i].y === cobra[0].y) return true;
    }

    const bater_parede_esquerda = cobra[0].x < 0;
    const bater_parede_direita = cobra[0].x > cobrinha_tabuleiro.width - 10;
    const bater_parede_cima = cobra[0].y < 0;
    const bater_parede_baixo = cobra[0].y > cobrinha_tabuleiro.height - 10;
    return bater_parede_esquerda || bater_parede_direita || bater_parede_cima || bater_parede_baixo
}

function randomizar_comida(min, max){

    return Math.round((Math.random() * (max-min) + min) /10) * 10;
}

function gerar_comida(){
    // Gera a Comida em uma Posição Aleatória na Horizontal(X).
    comida_x = randomizar_comida(0, cobrinha_tabuleiro.width - 10);
    // Gera a Comida em uma Posição Aleatória na Vertical(Y).
    comida_y = randomizar_comida(0, cobrinha_tabuleiro.height - 10);
    // Se o Local de Geração for aonde a Cobra está, Gera a Comida em um Novo Local.
    cobra.forEach(function cobra_comeu_a_comida(part){
        const ela_comeu = part.x == comida_x && part.y == comida_y;
        if(ela_comeu) gerar_comida();
    });
}

function mudar_direcao(event){
    const TECLA_ESQUERDA = 37;
    const TECLA_DIREITA = 39;
    const TECLA_CIMA = 38;
    const TECLA_BAIXO = 40;

    if(mudando_direcao) return;
    mudando_direcao = true;
    const tecla_pressionada = event.keyCode;
    const para_cima = dy === -10;
    const para_baixo = dy === 10;
    const para_direita = dx === 10;
    const para_esquerda = dx === -10;

        if(tecla_pressionada === TECLA_ESQUERDA && !para_direita){
            dx = -10;
            dy = 0;
        }

        if(tecla_pressionada === TECLA_CIMA && !para_baixo){
            dx = 0;
            dy = -10;
        }

        if(tecla_pressionada === TECLA_DIREITA && !para_esquerda){
            dx = 10;
            dy = 0;
        }

        if(tecla_pressionada === TECLA_BAIXO && !para_cima){
            dx = 0;
            dy = 10;
        }

}

function Mover_Cobra(){
    // Cria uma Nova Cabeça para a Cobra.
    const cabeca = {x: cobra[0].x + dx, y: cobra[0].y + dy};
    // Adiciona uma Nova Cabeça ao Começo da Cobra.
    cobra.unshift(cabeca);
    const comeu_comida = cobra[0].x === comida_x && cobra[0].y === comida_y;
        if(comeu_comida){

            // Aumenta a Pontuação.
            pontuacao += 1;
            // Mostrar a Pontuação na Tela.
            document.getElementById('score').innerHTML = pontuacao;
            // Gera uma Nova Comida em uma Nova Localização.
            gerar_comida();
        } else {
            // Remove a ultima parte da Cobra.
            cobra.pop();
        }
}




