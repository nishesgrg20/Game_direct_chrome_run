let gamestart = document.querySelector('.game_start')
let gamemain = document.querySelector('.game_main')
let lifespan = document.getElementById('life_span')
let heart_l = document.getElementsByClassName('heart_life')
let l = gamemain.getBoundingClientRect();
// let player = document.querySelector('#player')
let key = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }
var player_detail = { speed: 6, life: 3 ,score:0}
let returnflag=false
let returnflag2=false
let score_main=document.querySelector('#score_main')


//personal gamedata of no of bullet and ufo running,will increase as level;//
let game_data = { noofbullet: 2, noofufo: 1, noofbullet2: 2 }
window.addEventListener('keydown', (a) => {
    key[a.key] = true
})
window.addEventListener('keyup', (a) => {
    key[a.key] = false
})
gamestart.addEventListener('click', () => {
    gamestart.style.display = 'none'
    lifespan.style.display='block'
    maingamestart()
})



function playermove() {
    let player=document.querySelector('#player_main')
    var top = player.offsetTop
    var side = player.offsetLeft
    let playerdata = player.getBoundingClientRect();

    if (key.ArrowUp) {

        if (playerdata.top > 560) {
            top -= player_detail.speed
        }



    }
    if (key.ArrowLeft) {
        if (playerdata.left > 328) {
            side -= player_detail.speed
        }

    }
    if (key.ArrowRight) {
        if (playerdata.left < 1163) {
            side += player_detail.speed
        }
    }
    if (key.ArrowDown) {
        if (playerdata.top < 670) {
            top += player_detail.speed
        }
    }
    player.style.top = top + 'px'
    player.style.left = side + 'px'



}
function lifeminus(){
    
        if(heart_l.length==3){
            lifespan.removeChild(heart_l[0])

        }

        else if (heart_l.length==2 && returnflag==true){    //loop runs here more than one time so conditon applied//
            lifespan.removeChild(heart_l[0])
            setTimeout(()=>{
                returnflag2=true
            },400)
          
        }
      
        else if(heart_l.length==1 && returnflag2==true){
            lifespan.removeChild(heart_l[0])
           
            gameover()
            
            //GAME OVER LOGIC HERE //
           
        }
    
        
        setTimeout(()=>{returnflag=true},500)
    




}
function collapse(bitem) {
    let player_main=document.querySelector('#player_main')
    let player_info = player_main.getBoundingClientRect();


    let bomb_info = bitem.getBoundingClientRect();
    return (player_info.top > bomb_info.bottom || player_info.bottom < bomb_info.top || player_info.right < bomb_info.left || player_info.left > bomb_info.right)



}
function bulletmove() {


    let allbullets = document.querySelectorAll('.bullet')
    allbullets.forEach((item, index) => {
        if (index == 1) {
            item.x = 0
            item.y += 1
        }
        if (item.y < 680 && item.x < 390) {
            item.y += 2
            item.x += 1
        }

        else {
            item.y = 10
            item.x = 0
        }


        item.style.opacity = 1
        item.style.top = item.y + 'px'
        item.style.left = item.x + 'px'
        if(collapse(item)==false){
            lifeminus()
        }





    })
    let allbullets2 = document.querySelectorAll('.bullet2')
    allbullets2.forEach((item, index) => {
        if (index == 1) {
            item.y += 2
            item.x -= 1
        }
        if (item.y < 680 && item.x < 460) {
            item.y += 2
            item.x += 2
        }
        else {
            item.y = 0
            item.x = 0
        }

        item.style.opacity = 1
        item.style.top = item.y + 'px'
        item.style.right = item.x + 'px'


        if(collapse(item)==false){
            lifeminus()
        }





    })


}
function spaceshipmove() {
    let spaceship = document.querySelectorAll('.ufo')
    spaceship.forEach((item) => {

        if (item.x >= -60 && item.x < 880 && item.start == true) {
            item.x += 5
            item.style.left = item.x + 'px'


        }
        else {
            item.start = false
            item.x -= 5
            item.style.left = item.x + 'px'
            if (item.x == -50) {
                item.start = true
            }

        }






    })

}

// .player{width: 40px;height: 50px;background-image: url('../images/head1.png');background-size: contain;background-repeat: no-repeat;
// position: absolute;top: 661px;left: 400px;display: none;}
function maingamestart() {
    gamemain.innerHTML=''
  
    // let h_l=document.querySelectorAll('.heart_life')
   
    let player_main=document.createElement('div')
    player_main.setAttribute('id','player_main')
    player_main.style.width='40px';
    player_main.style.height='50px';
    player_main.style.backgroundImage='url(../images/head1.png)';
    player_main.style.backgroundSize='contain';
    player_main.style.backgroundRepeat='no-repeat';
    player_main.style.position='absolute';
    player_main.style.top='661px';
    player_main.style.left='400px';
    gamemain.appendChild(player_main)
    



    for (i = 0; i < game_data.noofufo; i++) {
        let ufo = document.createElement('div')
        ufo.setAttribute('class', 'ufo')
        ufo.x = 440
        ufo.start = true
        ufo.style.left = ufo.x + 'px'
        gamemain.appendChild(ufo)
    }

    let ufo = document.querySelector('.ufo')

    for (i = 0; i < game_data.noofbullet; i++) {
        let bullet = document.createElement('div')
        bullet.setAttribute('class', 'bullet')
        bullet.style.background = 'red'
        bullet.style.position = 'absolute'
        bullet.x = i * Math.floor((Math.random() * 450))
        bullet.style.left = bullet.x + 'px'
        bullet.y = i * Math.floor((Math.random() * 470 + 10))
        bullet.style.top = bullet.y + 'px'
        bullet.style.opacity = 0
        ufo.appendChild(bullet)
    }
    for (i = 0; i < game_data.noofbullet2; i++) {
        let bullet2 = document.createElement('div')
        bullet2.setAttribute('class', 'bullet2')
        bullet2.style.background = 'pink'
        bullet2.style.position = 'absolute'
        //GENERATING RANDOM NUMBERS TO CHANGE POSITION OF BOMB X-AXIS//
        bullet2.x = i * Math.floor((Math.random() * 40 + 30))
        bullet2.style.right = bullet2.x + 'px'
        //GENERATING RANDOM NUMBERS TO CHANGE POSITION OF BOMB y-AXIS//
        bullet2.y = i * Math.floor((Math.random() * 470 + 30))
        bullet2.style.top = bullet2.y + 'px'
        bullet2.style.opacity = 1
        ufo.appendChild(bullet2)
    }




        // playermoving=setInterval(playermove,5)
        // bulletmoving=setInterval(bulletmove,5)
        // spaceshipmoving=setInterval(spaceshipmove,5)
     ok=setInterval(() => { //Using as animation type of to move elements using js//
        player_detail.score+=1
        score_main.innerHTML=`<h4>YOUR SCORE IS :${ player_detail.score}</h4>`

        playermove()
        bulletmove()
        spaceshipmove()



    }, 5);



    


}

function gameover(){
    clearInterval(ok)
    lifespan.style.display='none';
    gamestart.style.display='block';
    gamestart.innerHTML=`<h4>GAME OVER ... YOUR HIGHEST SCORE IS:${player_detail.score}</h4>`;
    player_detail.score=0;
    gamestart.addEventListener('click',()=>{
        location.reload()
    })

}