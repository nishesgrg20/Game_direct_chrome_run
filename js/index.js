let gamestart = document.querySelector('.game_start')
let gamemain = document.querySelector('.game_main')
let lifespan = document.getElementById('life_span')
let heart_l = document.getElementsByClassName('heart_life')
let l = gamemain.getBoundingClientRect();
// let player = document.querySelector('#player')
let key = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, space: false }
var player_detail = { speed: 8, life: 3, score: 0, level: '1' }
let ballspeed = {
    first_left_speed: 2, first_top_speed: 2,
    second_l_speed: 2, second_t_speed: 1
};
let returnflag = false
let returnflag2 = false
let score_main = document.querySelector('#score_main')
let player_hero = document.getElementById('player')
let hitted = document.querySelector('#hitted')
let playerbody = document.querySelector('.player_body')
let l_score = document.querySelector('#lscore')
let ufomove={left:6,right:6}
let gameover_main=document.querySelector('.gameover')
let highest_score=document.querySelector('#highest_score')


//personal gamedata of no of bullet and ufo running,will increase as level;//
let game_data = { noofbullet: 4, noofufo: 1, noofbullet2:4}
window.addEventListener('keydown', (a) => {
    key[a.key] = true
    if (a.keyCode == 32) {
        key.space = true

    }

})
window.addEventListener('keyup', (a) => {
    key[a.key] = false
    player_hero.className = 'character';
    // if(a.keyCode==32){
    //     key.space=false
    // }

})
gamestart.addEventListener('click', () => {
    gamestart.style.display = 'none'
    lifespan.style.display = 'block'
    maingamestart()
})

function cactuscollide(cactus){
    let cactus_info=cactus.getBoundingClientRect()
    let player=document.querySelector('#player')
    let player_info=player.getBoundingClientRect()
    return ( player_info.top>cactus_info.bottom || player_info.bottom<cactus_info.top|| player_info.left>cactus_info.right||player_info.right<cactus_info.left)


   
 
}
function collide_infoboth(sword, bomb) {
    let bomb_info = bomb.getBoundingClientRect()
    let sword_info = sword.getBoundingClientRect()
    return (sword_info.top > bomb_info.bottom || sword_info.bottom < bomb_info.top || sword_info.left > bomb_info.right ||
        sword_info.right < bomb_info.left)

}
function destroy(bomb) {

    if (key.space) {

        setTimeout(() => {
            key.ArrowDown = false;
            key.ArrowLeft = false;
            key.ArrowRight = false;
            key.ArrowUp = false;
        }, 50)
        let arrowmain = document.querySelectorAll('.arrowmain')
        arrowmain.forEach((item) => {
            item.y += 5

            if (item.y > 660) {
                item.y = 0
                key.space = false
            }

            item.style.bottom = item.y + 'px'
            if (collide_infoboth(item, bomb) == false)//argument as a value passing to function collide_infoboth parameter + condition applied here//
            {
                bomb.style.backgroundImage="url('../images/bomb1.png')"
                setTimeout(() => {
                    bomb.style.display = 'none'
                    item.style.display = 'none'
                    bomb.style.backgroundImage="url('../images/sprites.png')"
                }, 100)

                setTimeout(() => {
                    item.style.display = 'block'      // weapon(sword of player) visible after 1s
                }, 1000)
                setTimeout(() => {
                    //bomb also visible after 9 seconds//
                    bomb.style.display = 'block'


                }, 10000)
            }



        })





    }
}

function playerlight() { // The function here when collide player lightup+scaleup//
    hitted.style.display = 'block'
    setTimeout(() => {
        hitted.style.display = 'none'
    }, 1000)


}
function playermove() {
    let player = document.querySelector('#player')
    var top = player.offsetTop
    var side = player.offsetLeft
    let playerdata = player.getBoundingClientRect();
    let cactus_all=document.querySelectorAll('.cactus')

    if (key.ArrowUp) {


        if (playerdata.top > 560) {
            top -= player_detail.speed
        }
        player_hero.className = 'character walk up ';



    }
    if (key.ArrowLeft) {

        if (playerdata.left > 0) {
            side -= player_detail.speed
        }
        player_hero.className = 'character walk left ';

    }
    if (key.ArrowRight) {
        if (playerdata.left < 1500) {
            side += player_detail.speed
        }
        player_hero.className = 'character walk right ';



    }
    if (key.ArrowDown) {

        if (playerdata.top < 660) {
            top += player_detail.speed

        }
        player_hero.className = 'character walk down';

    }
    player.style.top = top + 'px'
    player.style.left = side + 'px'
  
    
    cactus_all.forEach((item)=>{
        if(cactuscollide(item)==false){
            setTimeout(() => {
                key.ArrowDown = false;
                key.ArrowLeft = false;
                key.ArrowRight = false;
                key.ArrowUp = false;
            }, 13)
        }
    })
   



}
function lifeminus() {

    if (heart_l.length == 3) {
        lifespan.removeChild(heart_l[0])

    }

    else if (heart_l.length == 2 && returnflag == true) {    //loop runs here more than one time so conditon applied//
        lifespan.removeChild(heart_l[0])
        setTimeout(() => {
            returnflag2 = true
        }, 400)

    }

    else if (heart_l.length == 1 && returnflag2 == true) {
        lifespan.removeChild(heart_l[0])

        gameover()

        //GAME OVER LOGIC HERE //

    }


    setTimeout(() => { returnflag = true }, 500)





}

function collapse(bitem) {
    let player_main = document.querySelector('#player')
    let player_info = player_main.getBoundingClientRect();


    let bomb_info = bitem.getBoundingClientRect();
    return (player_info.top > bomb_info.bottom || player_info.bottom < bomb_info.top || player_info.right < bomb_info.left || player_info.left > bomb_info.right)



}
function bulletmove() {


    let allbullets = document.querySelectorAll('.bullet')
    allbullets.forEach((item, index) => {
        // if (index == 1) {
        //     item.x +=1
        //     item.y += 1
        // }
        if (item.y < 560 && item.x < 1500) {
            item.y += ballspeed.first_top_speed
            item.x += ballspeed.first_left_speed
        }
        
        
        else {
            item.style.backgroundImage="url('../images/bomb1.png')"
            item.style.backgroundPosition="94px"
            item.style.width='34px'
            item.style.height='70px'
            setTimeout(()=>{
                item.style.backgroundImage="url('../images/sprites.png')"
                item.style.backgroundSize='unset'
                item.style.backgroundPosition="50px"
                item.style.width='20px'
                item.style.height='20px'
                item.y = 10
                item.x = 0
            },240)
           
        }


        item.style.opacity = 1
        item.style.top = item.y + 'px'
        item.style.left = item.x + 'px'
        if (collapse(item) == false) {
            lifeminus()
            playerlight()
        }
        destroy(item)





    })
    let allbullets2 = document.querySelectorAll('.bullet2')
    allbullets2.forEach((item, index) => {
        if (index == 1) {
            item.y += 2
            item.x -= 1
        }
        if (item.y < 610 && item.x < 1560) {
            item.y += ballspeed.second_t_speed
            item.x += ballspeed.second_l_speed
        }
        else {
            item.style.backgroundImage="url('../images/bomb1.png')"
            item.style.backgroundPosition="94px"
            item.style.width='34px'
            item.style.height='70px'
            setTimeout(()=>{
                item.style.backgroundImage="url('../images/sprites.png')"
                item.style.backgroundSize='unset'
                item.style.backgroundPosition="50px"
                item.style.width='20px'
                item.style.height='20px'
                item.y = 0
                item.x = 0
            },240)
           
        }

        item.style.opacity = 1
        item.style.top = item.y + 'px'
        item.style.right = item.x + 'px'


        if (collapse(item) == false) {
            lifeminus()         //when function here call copy the code from main function also run here internally.//
            playerlight()
        }
        destroy(item)


    })


}
function spaceshipmove() {
    let spaceship = document.querySelectorAll('.ufo')
    spaceship.forEach((item) => {

        if (item.x >= -60 && item.x < 1480 && item.start == true) { //the item position must be in between to movre right// 
            //increase whenever if ihe ufo position from left is less than -59 and max upto less than 1480 ,move to right//
            item.x += ufomove.right     
            item.style.left = item.x + 'px'
         
           
            
        }
        else {
            //if condition not meet flag to false and now start to decrease as moving to left//
            item.start = false
            item.x -=ufomove.left
            item.style.left = item.x + 'px'
            if (item.x == -60) {
                item.start = true
            }
        }






    })

}
for (i = 0; i < 1; i++) {   //Sword for hero created
    let arrow = document.createElement('div');
    arrow.setAttribute('class', 'arrowmain');
    arrow.style.width = '10px'
    arrow.style.height = '35px'
    arrow.style.position = 'absolute'
    arrow.style.backgroundImage = "url('../images/sword1.png')";
    arrow.style.backgroundSize = 'auto';
    arrow.style.left = '0px'
    arrow.y = i * 30
    arrow.style.bottom = arrow.y + 'px'
    arrow.style.transform = 'rotate(180deg)'
    // arrow.style.zIndex=-2
    playerbody.appendChild(arrow)


}

function maingamestart() {
    gamemain.innerHTML = ''
    l_score.innerText = player_detail.level
    // let surface=document.createElement('div')
    // surface.setAttribute('class','surface')
    // gamemain.appendChild(surface)

    for(i=0;i<6;i++){
        let cactus=document.createElement('div')
        cactus.setAttribute('class','cactus')
        cactus.style.left=(i*280)+'px'
        gamemain.appendChild(cactus)

    }
   
    




    for (i = 0; i < game_data.noofufo; i++) {
        let ufo = document.createElement('div')
        ufo.setAttribute('class', 'ufo')
        ufo.x = 1500
        ufo.start = true
        ufo.style.left = ufo.x + 'px'
        gamemain.appendChild(ufo)
    }


    let ufo = document.querySelector('.ufo')

    //bomb//
   
    for (i = 0; i < game_data.noofbullet; i++) {
        let bullet = document.createElement('div')
        bullet.setAttribute('class', 'bullet')
        // bullet.style.background = 'red'
        bullet.style.position = 'absolute'
        bullet.x = i * Math.floor((Math.random() * 450))
        bullet.style.left = bullet.x + 'px'
        bullet.y = i * Math.floor((Math.random() * 470 + 10))
        bullet.style.top = bullet.y + 'px'
        bullet.style.opacity = 0
        ufo.appendChild(bullet)
    }
    //bomb//
    for (i = 0; i < game_data.noofbullet2; i++) {
        let bullet2 = document.createElement('div')
        bullet2.setAttribute('class', 'bullet2')
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



    ok = setInterval(() => { //Using as animation type of to move elements using js//
        player_detail.score += 1

        score_main.innerText = `YOUR SCORE IS :${player_detail.score}`

        if (player_detail.score >1200 && player_detail.score <1500){
            player_detail.level = '1'
            l_score.innerText = player_detail.level
            ballspeed.first_top_speed = 4
            ballspeed.second_t_speed = 4
            ballspeed.second_l_speed = 3
            ballspeed.first_left_speed=2
          
            
        
          
          
            
          
        
           
        }
        else if ( player_detail.score >1500 && player_detail.score<2500) {
            player_detail.level = '2'
            l_score.innerText = player_detail.level
            ballspeed.first_top_speed = 4
            ballspeed.second_t_speed = 4
            ballspeed.second_l_speed = 3
            ballspeed.first_left_speed=2
            ufomove.left=8
            ufomove.right=8
           
          
         
            
            


        }
        // // //issues
        else if ( player_detail.score >2500) {
            player_detail.level = '3'
            l_score.innerText = player_detail.level
            ballspeed.first_top_speed = 5
            ballspeed.first_left_speed = 3
            ballspeed.second_t_speed = 5
            ballspeed.second_l_speed=4
            ufomove.left=8
            ufomove.right=8
           
            
           
        }
       
       
        playermove()
        bulletmove()
        spaceshipmove()



    }, 5);








}

function gameover() {
    let send=document.querySelector('#send')
    let inputname=document.querySelector('#fname')
    let gameover_main2=document.querySelector('.gameover_main')
   
    clearInterval(ok)

    lifespan.style.display = 'none';
    gameover_main.style.display='block'
    highest_score.innerText=player_detail.score
        inputname.value=''
        send.addEventListener('click',()=>{
         
            let inputnamevalue=inputname.value
            if (inputnamevalue!=''){
                localStorage.setItem(inputnamevalue,player_detail.score)

                gameover_main2.innerHTML=''
                // ISSUE//
                for(i=0;i<localStorage.length;i++){
                    if(i==0 && localStorage.length ==1){
                        let a=document.createElement('span')
                        a.innerHTML= `<h5>${localStorage.key(i)}= ${localStorage.getItem(localStorage.key(i))}</h5>
                        <button id='restart'>Restart</button><button id='reset'>Reset</button>`
                       
                        gameover_main2.appendChild(a)
                    }
                    else if(i==localStorage.length-1)
                    {
                        let a=document.createElement('span')
                        a.innerHTML= `<h5>${localStorage.key(i)} = ${localStorage.getItem(localStorage.key(i))}</h5>
                        <button id='restart'>Restart</button> <button id='reset'>Reset</button>`
                       
                        gameover_main2.appendChild(a)
        
                    }
                    else{
                        let a=document.createElement('span')
                        a.innerHTML= `<h5>${localStorage.key(i)}= ${localStorage.getItem(localStorage.key(i))}</h5>`
                       
                        gameover_main2.appendChild(a)
        
                    }
        
                   
                
                }
                let restart=document.querySelector('#restart')
                restart.addEventListener('click',()=>{
                    location.reload()
                })
                let reset=document.querySelector('#reset')
                reset.addEventListener('click',()=>{
                    localStorage.clear()
                    location.reload()
                })
                
            }
          
         
           
    
            
    
    
            //here starting the code with to list all data of browser local storage saved with link to corrosponiding url of the webpage//
    
        })
   
    
  
   
    // player_detail.score = 0;
    // gamestart.addEventListener('click', () => {
    //     location.reload()
    // })

}