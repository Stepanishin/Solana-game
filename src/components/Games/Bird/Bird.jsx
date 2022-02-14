import React from 'react';
import "./Bird.css"

const Bird = () => {
    
    let score = 0;

    const startGame = (e) => {
        const bird = document.querySelector(".bird")
        const pipeUp = document.querySelector(".pipeUp")
        const pipeBottom = document.querySelector(".pipeBottom")
        const btnStart = document.querySelector(".bird_btn_start")
        const divFly = document.querySelector('.bird_wrap')
        
        btnStart.classList.add('dino_btn_start_visible')
        let birdTop = 60
        let pipeX = 90
        let pipeY = -79
        let birdSpeed = 24
        let gap = 50;
        let score = 0;

        bird.style.top = birdTop + "px"
        pipeUp.style.left = pipeX + "%"
        pipeUp.style.top = pipeY + "px"
        pipeBottom.style.left = pipeX + "%"
        pipeBottom.style.top = pipeY + gap + "px"

        let birdMow = setInterval(move, birdSpeed)

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function move() {            
            if (birdTop > 205 || birdTop < 15) {
                birdTop = 60
                pipeX = 90
                bird.style.top = birdTop + "px"
                pipeUp.style.left = pipeX + "%"
                pipeBottom.style.left = pipeX + "%"
                clearInterval(birdMow)
                clearInterval(startCounting);
                clearInterval(acceleration)
                btnStart.classList.remove('dino_btn_start_visible')
            } else if (pipeX === -3) {
                pipeX = 90
                pipeY = getRandomArbitrary(-81, -5)
                pipeUp.style.left = pipeX + "%"
                pipeUp.style.top = pipeY + "px"
                pipeBottom.style.left = pipeX + "%"
                pipeBottom.style.top = pipeY + gap + "px"
            }
            else if ((birdTop < pipeY+145 || birdTop > pipeY+190) && pipeX === 15) {
                birdTop = 60
                pipeX = 90
                bird.style.top = birdTop + "px"
                pipeUp.style.left = pipeX + "%"
                pipeBottom.style.left = pipeX + "%"
                clearInterval(birdMow)
                clearInterval(startCounting);
                clearInterval(acceleration)
                btnStart.classList.remove('dino_btn_start_visible')
            }
            else {
                birdTop +=1.5
                pipeX -= 1.5
                bird.style.top = birdTop + "px"
                pipeUp.style.left = pipeX + "%"
                pipeBottom.style.left = pipeX + "%"
            }
        }

        document.addEventListener('keydown', function(e) {
            if (e.code === 'ControlLeft' || e.code === 'KeyC') {
                fly()
            }
        })

        divFly.addEventListener("click", function() {
            fly()
        })

        const fly = () => {
            birdTop -=20
            bird.style.top = birdTop + "px"
        }

        const startCounting = setInterval(tick, 100);
        function tick()
            {
                score++;
                document.querySelector(".bird_timer").childNodes[0].nodeValue = "Score: " + score;
            }     
            
        const acceleration = setInterval(tick2, 3000)
        function tick2() {
            clearInterval(birdMow)
            birdSpeed = birdSpeed - Math.random()
            birdMow = setInterval(() => {
                move()
            }, birdSpeed)
    
            }    
    }

    return (
        <div className='bird_container'>
            <div className='bird_wrap'>
                <div className="bird"></div>
                <div className="pipeUp"></div>
                <div className="pipeBottom"></div>
                <div className='fg_top'></div>
                <div className='fg_bottom'></div>
                <div className='bird_btn_wrapper'>
                        <div className='bird_timer'>Score: {score}</div>
                        <button className='bird_btn bird_btn_start' onClick={startGame}>START</button>
                </div>
            </div>
            <div className='bird_instruction'>
                <ol className='bird_instruction_list'>
                    <li className='bird_instruction_list_item'>Press "START" to start the game!</li>
                    <li className='bird_instruction_list_item'>Сlick anywhere in the game  or "C" or "ControlLeft" to fly!</li>
                    <li className='bird_instruction_list_item'>ENJOY!</li>
                </ol>
            </div>
        </div>
    );
};

export default Bird;