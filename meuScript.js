
const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');
canvas.style.border = '1px solid black';
//AQUI INSTANCIAR OS PLAYERS E OBJETOS
let player = {x:100,y:100,w:30,h:30};
let centroPlayer = {x:player.x+(player.w/2),y:player.y+(player.h/2)}
let ponto = {x:0,y:0};
let speed = 5;
const raio = 100;
const incrementoAngulo = Math.PI / 4; 
let anguloAtual = 0;
let keyDown,keyUp,keyLeft,keyRight = false
let teleport = true;
let teleportCooldown = false;
proximoPontoEmSentidoHorario(centroPlayer, raio, incrementoAngulo)



//Funções adjacentes
function proximoPontoEmSentidoHorario(centroPlayer, raio, incrementoAngulo) {
    // Calcula as coordenadas x e y do próximo ponto
    const x = centroPlayer.x + raio * Math.cos(anguloAtual);
    const y = centroPlayer.y + raio * Math.sin(anguloAtual);

    // Atualiza o ângulo atual para o próximo ponto em sentido horário
    anguloAtual += incrementoAngulo;

    // Garante que o ânguloAtual fique entre 0 e 2*PI
    if (anguloAtual >= 2 * Math.PI) {
        anguloAtual -= 2 * Math.PI;
    }

    // Retorna as coordenadas do próximo ponto
    ponto.x = x;
    ponto.y = y;
}

function teletransport(ponto,centroPlayer){
    if(teleport){
        centroPlayer.x = ponto.x
        centroPlayer.y = ponto.y
        player.x = centroPlayer.x-(player.w/2)
        player.y = centroPlayer.y-(player.h/2)
        teleport=false
        setTimeout(()=>{
            teleport=true
        },5000)
    }
}







//NÃO MEXER NO INIT QUE ELE ESTÁ PRONTO
function init(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw();
    move();
    colision();

    requestAnimationFrame(init);
}
function draw(){
    ctx.beginPath();
    //AQUI ENTRA A CRIAÇÃO DAS COISAS NA TELA
        //CUBO
        ctx.fillStyle = "gray"
        ctx.fillRect(player.x,player.y,player.w,player.h)
        
        
        
        
        
        //LINHA DE TELEPORT
        
        ctx.lineWidth = 5
        ctx.moveTo(centroPlayer.x, centroPlayer.y);
        ctx.lineTo(ponto.x, ponto.y);
        ctx.stroke();
    ctx.closePath()
}
function move(){
    //AQUI ENTRA A MOVIMENTAÇÃO E MANIPULAÇÃO DOS OBJETOS
    document.addEventListener('keydown',(e)=>{
        if(e.code == 'ArrowDown'){
            keyDown=true
        }
        if(e.code == 'ArrowUp'){
            keyUp=true
        }
        if(e.code == 'ArrowLeft'){
            keyLeft=true
        }
        if(e.code == 'ArrowRight'){
            keyRight=true
        }
        if(e.code == 'Space'){
            teletransport(ponto,centroPlayer)
        }
    })
    document.addEventListener('keyup',(e)=>{
        if(e.code == 'ArrowDown'){
            keyDown=false
        }
        if(e.code == 'ArrowUp'){
            keyUp=false
        }
        if(e.code == 'ArrowLeft'){
            keyLeft=false
        }
        if(e.code == 'ArrowRight'){
            keyRight=false
        }
    })

    



    if(keyDown){
        player.y+=speed
        ponto.y+=speed
        centroPlayer.x=player.x+(player.w/2)
        centroPlayer.y=player.y+(player.h/2)
    }
    if(keyUp){
        player.y-=speed
        ponto.y-=speed
        centroPlayer.x=player.x+(player.w/2)
        centroPlayer.y=player.y+(player.h/2)
    }
    if(keyLeft){
        player.x-=speed
        ponto.x-=speed
        centroPlayer.x=player.x+(player.w/2)
        centroPlayer.y=player.y+(player.h/2)
    }
    if(keyRight){
        player.x+=speed
        ponto.x+=speed
        centroPlayer.x=player.x+(player.w/2)
        centroPlayer.y=player.y+(player.h/2)
    }
    //MOVIMENTACAO ACABA AQUI
}
function colision(){
    //AQUI ENTRA A COLISAO

    //COLISÃO ACABA AQUI
}
init()
setInterval(()=>{
    proximoPontoEmSentidoHorario(centroPlayer, raio, incrementoAngulo); 
},500)