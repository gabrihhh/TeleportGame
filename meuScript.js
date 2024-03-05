
const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');
canvas.style.border = '1px solid black';
//AQUI INSTANCIAR OS PLAYERS E OBJETOS
//tamanho da tela
const canvasWidth = 600;
const canvasHeight = 600;
//player
let player = {x:280,y:280,w:30,h:30};
let centroPlayer = {x:player.x+(player.w/2),y:player.y+(player.h/2)}

//pontos do final da linha de teleport
let ponto = {x:0,y:0};
//velocidade de movimento
let speed = 5;

//função da linha de teleport
const raio = 100;
const incrementoAngulo = Math.PI / 4; 
let anguloAtual = 0;
let cuboBorda = false;
//movimentacao
let keyDown = false;
let keyUp = false;
let keyLeft = false;
let keyRight = false

//teleport
let teleport = true;

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
        ctx.fillStyle = "black"
        ctx.fillRect(player.x,player.y,player.w,player.h)
        
        ctx.arc(ponto.x,ponto.y,2,0,Math.PI*2)
        ctx.fill()
        
        
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
            keyUp=false
            keyLeft=false
            keyRight=false
        }
        if(e.code == 'ArrowUp'){
            keyUp=true
            keyLeft=false
            keyRight=false
            keyDown=false
        }
        if(e.code == 'ArrowLeft'){
            keyLeft=true
            keyRight=false
            keyDown=false
            keyUp=false
        }
        if(e.code == 'ArrowRight'){
            keyRight=true
            keyLeft=false
            keyUp=false
            keyDown=false
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
        if(cuboBorda){
            player.y+=speed
            centroPlayer.x=player.x+(player.w/2)
            centroPlayer.y=player.y+(player.h/2)
        }else{
            player.y+=speed
            ponto.y+=speed
            centroPlayer.x=player.x+(player.w/2)
            centroPlayer.y=player.y+(player.h/2)
        }
    }
    if(keyUp){
        if(cuboBorda){
            player.y-=speed
            centroPlayer.x=player.x+(player.w/2)
            centroPlayer.y=player.y+(player.h/2)
        }else{
            player.y-=speed
            ponto.y-=speed
            centroPlayer.x=player.x+(player.w/2)
            centroPlayer.y=player.y+(player.h/2)
        }
    }
    if(keyLeft){
        if(cuboBorda){
            player.x-=speed
            centroPlayer.x=player.x+(player.w/2)
            centroPlayer.y=player.y+(player.h/2)
        }else{
            player.x-=speed
            ponto.x-=speed
            centroPlayer.x=player.x+(player.w/2)
            centroPlayer.y=player.y+(player.h/2)
        }  
    }
    if(keyRight){
        if(cuboBorda){
            player.x+=speed
            centroPlayer.x=player.x+(player.w/2)
            centroPlayer.y=player.y+(player.h/2)
        }else{
            player.x+=speed
            ponto.x+=speed
            centroPlayer.x=player.x+(player.w/2)
            centroPlayer.y=player.y+(player.h/2)
        }
    }
    //MOVIMENTACAO ACABA AQUI
}
function colision(){
    //AQUI ENTRA A COLISAO
    //Colisão do final da linha com a borda do mapa
        if(ponto.x>canvasWidth){
            ponto.x = canvasWidth
        }
        if(ponto.x<0){
            ponto.x = 0
        }
        if(ponto.y>canvasHeight){
            ponto.y = canvasHeight
        }
        if(ponto.y<0){
            ponto.y = 0
        }
    //colisão do cubo com a borda do mapa
        if(player.x<0){
            cuboBorda=true
            player.x = 0
        }
        if(player.x+player.w>canvasWidth){
            cuboBorda=true
            player.x = canvasWidth-player.w
        }
        if(player.y<0){
            cuboBorda=true
            player.y = 0   
        }
        if(player.y+player.h>canvasHeight){
            cuboBorda=true
            player.y = canvasHeight-player.h
        }
        if(player.x>0&&player.x+player.w<canvasWidth&&player.y>0&&player.y+player.h<canvasHeight){
            cuboBorda=false
        }
    //COLISÃO ACABA AQUI
}
init()
setInterval(()=>{
    proximoPontoEmSentidoHorario(centroPlayer, raio, incrementoAngulo); 
},500)