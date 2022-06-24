// Variavel da Cobra
let cobra = [ 
    {x:250, y:250}, 
    {x:225, y:250}, 
    {x:200, y:250},];

// Pontuação Inicial.
let pontuacao = 0;

// Variaveis da Comida
let comida_x;
let comida_y;

// Se Verdadeiro muda a Direção.
let mudando_direcao = false;

//Velocidade Horizontal.
let dx = 25;
//Velocidade Vertical.
let dy = 0;

// Puxa o Elemento Canvas - Seleciona a Tela.
const tela = document.querySelector('canvas');

// Retorna um desenho em duas Dimensões - Pinta na Tela.
const pincel = canvas.getContext("2d");

// Variavel responsavel por Controlar a Velocidade da Cobra.
let velocidade = 170;

let btn_reiniciar = document.getElementById('btn-reiniciar');

// Função Central, Responsavel por Puxar todas as Outras.
atualizaTela();

gerar_comida();

document.addEventListener("keydown", leDoTeclado);



function atualizaTela(){

    if(se_o_jogo_acabar()) return;

        mudando_direcao = false;
        setTimeout(function onTick(){
        limpaTela();
        pintar_comida();
        Mover_Cobra();
        pintarCobra();
        
        atualizaTela();
        speed();
    }, velocidade)
}

function limpaTela() {
    var descer = 0;
    while (descer <= 600) {
        for (var imp = 0; imp <= 600; imp = imp + 25) {
            pincel.fillStyle = "black";
            pincel.strokeStyle = "black";
            //pincel.lineWidth = 10;
            pincel.beginPath();
            pincel.rect(imp, descer, 25, 25);
            pincel.closePath();
            pincel.fill();
            pincel.stroke();
        }
        descer = descer + 25;
    }
}

// Pintar a Cobra no Canvas.
function pintarCobra(){
    // Desenha as Partes.
    cobra.forEach(pintarPartedaCobra);
}

// Pintar Comida no Canvas.
function pintar_comida(){
    pincel.fillStyle = 'Crimson';
    pincel.strokestyle = 'red';
    pincel.fillRect(comida_x, comida_y, 25, 25);
    pincel.strokeRect(comida_x, comida_y, 25, 25);
}

function randomizar_comida(min, max){

    return Math.round((Math.random() * (max-min) + min) /25) * 25;
}

function gerar_comida(){
    // Gera a Comida em uma Posição Aleatória na Horizontal(X).
    comida_x = randomizar_comida(0, tela.width - 25);
    // Gera a Comida em uma Posição Aleatória na Vertical(Y).
    comida_y = randomizar_comida(0, tela.height - 25);
    // Se o Local de Geração for aonde a Cobra está, Gera a Comida em um Novo Local.
    cobra.forEach(function cobra_comeu_a_comida(part){
        const ela_comeu = part.x == comida_x && part.y == comida_y;
        if(ela_comeu) gerar_comida();
    });
}

function pintarPartedaCobra(parteCobra){
    // Selecione a Cor para Pintar a Cobra.
    pincel.fillStyle = 'lightgreen';
    // Selecione a Cor para a Borda da Cobra.
    pincel.strokeStyle = 'black';
    // Desenhe um retângulo "preenchido" para representar a parte da cobra nas coordenadas em 
    // que a parte está localizada
    pincel.fillRect(parteCobra.x, parteCobra.y, 25, 25);
    // Pinta a Borda ao redor da Cobra.
    pincel.strokeRect(parteCobra.x, parteCobra.y, 25, 25);
}

function leDoTeclado(event){
    const TECLA_ESQUERDA = 37;
    const TECLA_DIREITA = 39;
    const TECLA_CIMA = 38;
    const TECLA_BAIXO = 40;

    if(mudando_direcao) return;
    mudando_direcao = true;
    const tecla_pressionada = event.keyCode;
    const para_cima = dy === -25;
    const para_baixo = dy === 25;
    const para_direita = dx === 25;
    const para_esquerda = dx === -25;

        if(tecla_pressionada === TECLA_ESQUERDA && !para_direita){
            dx = -25;
            dy = 0;
        }

        if(tecla_pressionada === TECLA_CIMA && !para_baixo){
            dx = 0;
            dy = -25;
        }

        if(tecla_pressionada === TECLA_DIREITA && !para_esquerda){
            dx = 25;
            dy = 0;
        }

        if(tecla_pressionada === TECLA_BAIXO && !para_cima){
            dx = 0;
            dy = 25;
        }
}

function se_o_jogo_acabar(){
    for (let i = 1; i < cobra.length; i++) {
        if (cobra[i].x === cobra[0].x && cobra[i].y === cobra[0].y) return true
      }
      const bater_parede_esquerda = cobra[0].x < 0;
      const bater_parede_direita = cobra[0].x > tela.width - 25;
      const bater_parede_cima = cobra[0].y < 0;
      const bater_parede_baixo = cobra[0].y > tela.height - 25;

      return bater_parede_esquerda || bater_parede_direita || bater_parede_cima || bater_parede_baixo
}

function Mover_Cobra(){
     // Cria uma Nova Cabeça para a Cobra.
     const cabeca = {x: cobra[0].x + dx, y: cobra[0].y + dy};
     // Adiciona uma Nova Cabeça ao Começo da Cobra.
     cobra.unshift(cabeca);
     const comeu_comida = cobra[0].x === comida_x && cobra[0].y === comida_y;
        if(comeu_comida){

            // Aumenta a Pontuação.
            pontuacao += 10;

            if(pontuacao >= 110){
                pontuacao = pontuacao += 10;
            };
            
            if(pontuacao >= 320){
                pontuacao = pontuacao += 30;  
            }

            // Mostrar a Pontuação na Tela.
            document.getElementById('score').innerHTML = pontuacao;
            // Gera uma Nova Comida em uma Nova Localização.
            gerar_comida();
        } else {
             // Remove a ultima parte da Cobra.
             cobra.pop();
        }
}

function speed(){
    if(pontuacao >= 100){ velocidade = 120};
    if(pontuacao >= 300){ velocidade = 90}
}

function reiniciar(){
    atualizaTela();   
}


speed();

btn_reiniciar.addEventListener('click', reiniciar);





