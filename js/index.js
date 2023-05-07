let gamestart = document.querySelector('.game_start')
let gamemain = document.querySelector('.game_main')
let lifespan = document.getElementById('life_span')
let heart_l = document.getElementsByClassName('heart_life')
let l = gamemain.getBoundingClientRect();
// let player = document.querySelector('#player')
let key = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, space: false }
var player_detail = { speed: 5, life: 3, score: 0, level: '1' } // object created of player//
let ballspeed = {
    first_left_speed: 2, first_top_speed: 2.6,
    second_l_speed: 2, second_t_speed: 2.6
};
let returnflag = false
let returnflag2 = false
let score_main = document.querySelector('#score_main')
let player_hero = document.getElementById('player')
let hitted = document.querySelector('#hitted')
let playerbody = document.querySelector('.player_body')
let l_score = document.querySelector('#lscore')
let ufomove = { left: 6, right: 6 }
let gameover_main = document.querySelector('.gameover')
let highest_score = document.querySelector('#highest_score')
let down=true



//personal gamedata of no of bullet and ufo running,will increase as level;//
let game_data = { noofbullet: 4, noofufo: 1, noofbullet2: 4 }

// adding of an event keyevent using arrow function//
window.addEventListener('keydown', (a) => {
    key[a.key] = true
    if (a.keyCode == 32) {
        key.space = true

    }

})
window.addEventListener('keyup', (a) => {
    key[a.key] = false
    player_hero.className = 'character';
  

})
gamestart.addEventListener('click', () => {
    gamestart.style.display = 'none'
    lifespan.style.display = 'block'
    maingamestart()
})

// creation of cactus element using js way and appending in html dom//
function cactuscollide(cactus) {
    let cactus_info = cactus.getBoundingClientRect()
    let player = document.querySelector('#player')
    let player_info = player.getBoundingClientRect()
    return (player_info.top > cactus_info.bottom || player_info.bottom < cactus_info.top || player_info.left > cactus_info.right || player_info.right < cactus_info.left)




}
// collision detection apply for the sword(arrow) & bomb  if collide then bomb will destroy in sky//
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
        let arrowmain = document.querySelectorAll('.arrowmain');
        arrowmain.forEach((item) => {
            item.y += 5;

            if (item.y > 660) {
                item.y = 0;
                key.space = false;
            }

            item.style.bottom = item.y + 'px';
            if (collide_infoboth(item, bomb) == false)//argument as a value passing to function collide_infoboth parameter + condition applied here//
            {
                bomb.style.backgroundImage = "url('../images/bomb1.png')";
                setTimeout(() => {
                    bomb.style.display = 'none';
                    item.style.display = 'none';
                    bomb.style.backgroundImage = "url('../images/sprites.png')";
                }, 100)

                // weapon(sword of player) visible after 1 seconds
                setTimeout(() => {
                    item.style.display = 'block';
                }, 1000)

                setTimeout(() => {
                    //bomb also visible after 9 seconds//
                    bomb.style.display = 'block';


                }, 10000)
            }



        })





    }
}

function playerlight() { // The function here when collide player lightup+scaleup//
    hitted.style.display = 'block';
    setTimeout(() => {
        hitted.style.display = 'none';
    }, 1000)


}
function playermove() {
    let player = document.querySelector('#player');
    var top = player.offsetTop;
    var side = player.offsetLeft;
    let playerdata = player.getBoundingClientRect();
    let cactus_all = document.querySelectorAll('.cactus');

    if (key.ArrowUp) {


        if (playerdata.top > 560) {
            top -= player_detail.speed;
        }
        player_hero.className = 'character walk up ';



    }
    if (key.ArrowLeft) {

        if (playerdata.left > 0) {
            side -= player_detail.speed;
        }
        player_hero.className = 'character walk left ';

    }
    if (key.ArrowRight) {
        if (playerdata.left < 1500) {
            side += player_detail.speed;
        }
        player_hero.className = 'character walk right ';



    }
    if (key.ArrowDown) {

        if (playerdata.top < 660) {
            top += player_detail.speed;

        }
        player_hero.className = 'character walk down';

    }
    player.style.top = top + 'px';
    player.style.left = side + 'px';


    cactus_all.forEach((item) => {
        if (cactuscollide(item) == false) {
            setTimeout(() => {
                key.ArrowDown = false;
                key.ArrowLeft = false;
                key.ArrowRight = false;
                key.ArrowUp = false;
            }, 13)
        }
    })




}

// the lifeminus function only runs on the place where after collide take place the code will be used there and run in as //
 //it is being called there//
function lifeminus() {

    if (heart_l.length == 3) {
        lifespan.removeChild(heart_l[0]);

    }

    else if (heart_l.length == 2 && returnflag == true) {    //loop runs here more than one time so conditon applied//
        lifespan.removeChild(heart_l[0]);
        setTimeout(() => {
            returnflag2 = true;
        }, 300)

    }

    else if (heart_l.length == 1 && returnflag2 == true) {
       
        player_hero.classList.add('dead');
      
        setTimeout(()=>{
            gameover()
        },350)
    }
    

    setTimeout(() => { returnflag = true }, 400);





}

function collapse(bitem) {
    let player_main = document.querySelector('#player');
    let player_info = player_main.getBoundingClientRect();


    let bomb_info = bitem.getBoundingClientRect();
    // the code here(collosion detection) which will return if collide with bomb and player return false , life decrease//
    return (player_info.top > bomb_info.bottom || player_info.bottom < bomb_info.top || player_info.right < bomb_info.left || player_info.left > bomb_info.right);



}
function bulletmove() {


    let allbullets = document.querySelectorAll('.bullet');
    allbullets.forEach((item) => {

        if (item.y < 560 && item.x < 1500) {
            item.y += ballspeed.first_top_speed;
            item.x += ballspeed.first_left_speed;
        }


        else {
            item.style.backgroundImage = "url('../images/bomb1.png')";
            item.style.backgroundPosition = "94px";
            item.style.width = '34px';
            item.style.height = '70px';
            item.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                item.style.backgroundImage = "url('../images/sprites.png')";

                item.style.backgroundPosition = "-96px -401px";
                item.style.width = '31px';
                item.style.height = '10px';
                item.style.transform = 'rotate(90deg)';
                item.y = 10;
                item.x = 0;
            }, 240)

        }


        item.style.opacity = 1;
        item.style.top = item.y + 'px';
        item.style.left = item.x + 'px';
        // if the return value of collapse came false means false and the life derecrase here //
        if (collapse(item) == false) {
            lifeminus();
            playerlight();
        }
        destroy(item);





    })
    let allbullets2 = document.querySelectorAll('.bullet2');
    allbullets2.forEach((item, index) => {
        if (index == 1) {
            item.y += 2;
            item.x -= 1;
        }
        if (item.y < 610 && item.x < 1560) {
            item.y += ballspeed.second_t_speed;
            item.x += ballspeed.second_l_speed;
        }
        else {
            item.style.backgroundImage = "url('../images/bomb1.png')";
            item.style.backgroundPosition = "94px";
            item.style.width = '34px';
            item.style.height = '70px';
            item.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                item.style.backgroundImage = "url('../images/sprites.png')";
                item.style.backgroundPosition = "-96px -401px";
                item.style.width = '31px';
                item.style.height = '10px';
                item.style.transform = 'rotate(90deg)';
                item.y = 0;
                item.x = 0;
            }, 240)

        }

        item.style.opacity = 1;
        item.style.top = item.y + 'px';
        item.style.right = item.x + 'px';


        if (collapse(item) == false) {
            lifeminus();     //when function here call copy the code from main function also run here internally.//
            playerlight();
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
            item.x -= ufomove.left
            item.style.left = item.x + 'px'
            if (item.x == -60) {
                item.start = true
            }
        }
       
        if (item.y<80 && down==true){
            item.y+=0.5
            item.style.top=item.y+'px'
           
        }
        else{
       
            down=false
            item.y-=0.5
            item.style.top=item.y+'px'
            if (item.y==0){
                down=true
            }
           
        }
        
  






    })

}
for (i = 0; i < 1; i++) {   //Sword for hero created the loop runs here one time//
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

    playerbody.appendChild(arrow)


}

function maingamestart() {
    gamemain.innerHTML = ''
    l_score.innerText = player_detail.level


    for (i = 0; i < 6; i++) {
        let cactus = document.createElement('div')
        cactus.setAttribute('class', 'cactus')
        cactus.style.bottom = (i * 18) + 'px'
        cactus.style.left = (i * 280) + 'px'
        gamemain.appendChild(cactus)

    }






    for (i = 0; i < game_data.noofufo; i++) {
        let ufo = document.createElement('div')
        ufo.setAttribute('class', 'ufo')
        ufo.x = 1500
        // To change position from top of ufo randomly which we get from random() functions//
        ufo.y=Math.floor((Math.random()*102))   
        ufo.start = true
        ufo.style.left = ufo.x + 'px'
        ufo.style.top=ufo.y+'px'
        gamemain.appendChild(ufo)
    }


    let ufo = document.querySelector('.ufo')

    //bomb//

    for (i = 0; i < game_data.noofbullet; i++) {
        let bullet = document.createElement('div')
        bullet.setAttribute('class', 'bullet')

        bullet.style.position = 'absolute'
        bullet.x = i * Math.floor((Math.random() * 450))
        bullet.style.left = bullet.x + 'px'
        bullet.y = i * Math.floor((Math.random() * 270 + 10))
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
        bullet2.y = i * Math.floor((Math.random() * 770 + 30))
        bullet2.style.top = bullet2.y + 'px'
        bullet2.style.opacity = 1
        ufo.appendChild(bullet2)
    }


    // the setinterval started as making dom elements move its position as apply of animation on it//
    ok = setInterval(() => { 
        player_detail.score += 1
        

        score_main.innerText = `YOUR SCORE IS :${player_detail.score}`

        if (player_detail.score > 1200 && player_detail.score < 1500) {
            player_detail.level = '1'
            l_score.innerText = player_detail.level
            ballspeed.first_top_speed = 4
            ballspeed.second_t_speed = 4
            ballspeed.second_l_speed = 3
            ballspeed.first_left_speed = 2
            player_detail.speed = 6.8








        }
        else if (player_detail.score > 1500 && player_detail.score < 2500) {
            player_detail.level = '2'
            l_score.innerText = player_detail.level
            ballspeed.first_top_speed = 4.6
            ballspeed.second_t_speed = 4.3
            ballspeed.second_l_speed = 3.5
            ballspeed.first_left_speed = 2
            player_detail.speed = 7







        }
        // // //issues
        else if (player_detail.score > 2500) {
            player_detail.level = '3'
            l_score.innerText = player_detail.level
            ballspeed.first_top_speed = 5
            ballspeed.first_left_speed = 3
            ballspeed.second_t_speed = 5
            ballspeed.second_l_speed = 4
            ufomove.left = 8
            ufomove.right = 8
            player_detail.speed = 8



        }


        playermove()
        bulletmove()
        spaceshipmove()



    }, 5);








}

function gameover() {
    let send = document.querySelector('#send')
    let inputname = document.querySelector('#fname')
    let gameover_main2 = document.querySelector('.gameover_main')

    clearInterval(ok)

    lifespan.style.display = 'none';
    gameover_main.style.display = 'block'
    highest_score.innerText = player_detail.score
    inputname.value = ''
    send.addEventListener('click', () => {
        let gameover_logo=document.getElementsByClassName('gameover_logo');
        gameover_logo[0].style.display='none';
        let score_b=document.getElementsByClassName('score_b')
        score_b[0].style.display='block'

        let inputnamevalue = inputname.value
        if (inputnamevalue != '') {
            localStorage.setItem(inputnamevalue, player_detail.score)

            gameover_main2.innerHTML = ''
            // ISSUE//

            for (i = 0; i < localStorage.length; i++) {
                if (i == 0 && localStorage.length == 1) {
                    let a = document.createElement('span')
                    a.innerHTML = `<h5>${localStorage.key(i)}= ${localStorage.getItem(localStorage.key(i))}</h5>
                        <button id='restart'>Restart</button><button id='reset'>Reset</button>`

                    gameover_main2.appendChild(a)
                }
                else if (i == localStorage.length - 1) {
                    let a = document.createElement('span')
                    a.innerHTML = `<h5>${localStorage.key(i)} = ${localStorage.getItem(localStorage.key(i))}</h5>
                        <button id='restart'>Restart</button> <button id='reset'>Reset</button>`

                    gameover_main2.appendChild(a)

                }
                else {
                    let a = document.createElement('span')
                    a.innerHTML = `<h5>${localStorage.key(i)}= ${localStorage.getItem(localStorage.key(i))}</h5>`

                    gameover_main2.appendChild(a)

                }



            }
            let restart = document.querySelector('#restart')
            restart.addEventListener('click', () => {
                location.reload()
            })
            let reset = document.querySelector('#reset')
            reset.addEventListener('click', () => {
                localStorage.clear()
                location.reload()
            })

        }







        //here starting the code with to list all data of browser local storage saved with link to corrosponiding url of the webpage//

    })




}