import React from 'react';
import './Dino.css'

const Dino = () => {

    let score = 0;

    const startGame = (e) => {
        e.stopPropagation();

        const dino = document.querySelector('.dino')
        const spike = document.querySelector('.spike')
        const divJump = document.querySelector('.game_base')
        const btnStart = document.querySelector('.dino_btn_start')
        let spikeY = 90
        let spikeSpeed = 25
        score = 0;
        spike.style.left = spikeY + "%"
        btnStart.classList.add('dino_btn_start_visible')

        let spikeMow = setInterval(move, spikeSpeed)

        function move() {            
            if (spikeY === -2.5) {
                spikeY = 90
                spike.style.left = spikeY + "%"
            } else {
                spikeY -=2.5
                spike.style.left = spikeY + "%"
            }
        }

        const startCounting = setInterval(tick, 100);
        function tick()
            {
                score++;
                document.querySelector(".dino_timer").childNodes[0].nodeValue = "Score: " + score;
            }            

        document.addEventListener('keydown', function(e) {
            if (e.code === 'ControlLeft' || e.code === 'KeyC') {
                jump()
            }
        })

        divJump.addEventListener("click", function() {
                jump()
        })

        const jump = () => {
            if (dino.classList !== "dinoJump") {
                dino.classList.add("dinoJump")
            }
            setTimeout( function() {
                dino.classList.remove("dinoJump")
            }, 300)
        }
        const acceleration = setInterval(tick2, 2000)
        function tick2() {
            clearInterval(spikeMow)
            spikeSpeed = spikeSpeed - Math.random()
            spikeMow = setInterval(() => {
                move()
            }, spikeSpeed)

        }
        const isAlive = setInterval(() => {
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
            let spikeLeft = parseInt(window.getComputedStyle(spike).getPropertyValue("left"))

            if (spikeLeft < 37 && spikeLeft > 0 && dinoTop >= 58) {
                spikeY = 90
                spike.classList.remove('spikeMov')
                btnStart.classList.remove('dino_btn_start_visible')
                clearInterval(spikeMow)
                clearInterval(acceleration)
                clearInterval(startCounting);
                clearInterval(tick2)
                clearInterval(isAlive);
            }
        }, 0.1);
    }

    

    return (
        <div className='Dino_wrap'>
            <div className='dino_container'>
                <div className="game_base">
                    <div className='dino_btn_wrapper'>
                        <div className='dino_timer'>Score: {score}</div>
                        <button className='dino_btn dino_btn_start' onClick={startGame}>START</button>
                    </div>
                    <div className="dino"></div>
                    <div className="spike"></div>
                </div>
            </div>
            <div className='dino_instruction'>
                <ol className='dino_instruction_list'>
                    <li className='dino_instruction_list_item'>Press "START" to start the game!</li>
                    <li className='dino_instruction_list_item'>Сlick anywhere in the game  or "C" or "ControlLeft" to jump!</li>
                    <li className='dino_instruction_list_item'>ENJOY!</li>
                </ol>
            </div>
        </div>
    );
};

export default Dino;