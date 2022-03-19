import React, {  useState } from 'react';
import './Dino.css'
import DinoRecords from './DinoRecords';
import { getDatabase, ref, get, child, push, update } from "firebase/database";

const Dino = () => {

    let score = 0;
    let isGame = false
    const [change, setChange] = useState([])
    
    const startGame = (e) => {
        e.stopPropagation();

        const db = getDatabase();
        const dino = document.querySelector('.dino')
        const spike = document.querySelector('.spike')
        const divJump = document.querySelector('.game_base')
        const btnStart = document.querySelector('.dino_btn_start')
        let spikeY = 90
        let spikeSpeed = 25
        score = 0;
        spike.style.left = spikeY + "%"
        btnStart.classList.add('dino_btn_start_visible')
        isGame = true

        let spikeMow = setInterval(move, spikeSpeed)

        function move() {            
            if (spikeY === -2.5) {
                function getRandomInt(max) {
                    return Math.floor(Math.random() * max);

                  }
                let randomPicture = getRandomInt(3);
                if (randomPicture === 0) {
                    spike.classList.add('spike1')
                    spike.classList.remove('spike2')
                    spike.classList.remove('spike3')
                }else if(randomPicture === 1) {
                    spike.classList.remove('spike1')
                    spike.classList.add('spike2')
                    spike.classList.remove('spike3')
                }else if(randomPicture === 2) {
                    spike.classList.remove('spike1')
                    spike.classList.remove('spike2')
                    spike.classList.add('spike3')
                }
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
            if (isGame) {
                if (e.code === 'ControlLeft' || e.code === 'KeyC') {
                    jump()
                }
            }

        })

        divJump.addEventListener("click", function() {
            if (isGame) {
                jump()
            }
        })

        const jump = () => {
            if (dino.classList !== "dinoJump") {
                dino.classList.add("dinoJump")
            }
            setTimeout( function() {
                dino.classList.remove("dinoJump")
            }, 350)
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
            const records = score * 10

            if (spikeLeft < 37 && spikeLeft > 0 && dinoTop >= 45) {
                spikeY = 90
                spike.classList.remove('spikeMov')
                btnStart.classList.remove('dino_btn_start_visible')
                clearInterval(spikeMow)
                clearInterval(acceleration)
                clearInterval(startCounting);
                clearInterval(tick2)
                clearInterval(isAlive);
                isGame = false


                const getRecords = ( ) => {
                    const dbRef = ref(getDatabase());
                    get(child(dbRef, '/')).then((snapshot) => {
                    if (snapshot.exists()) {
                        let arr = Object.entries(snapshot.val())
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i][0] === localStorage.getItem('WalletKey')) {
                                if (arr[i][1].DinoRecords === undefined || arr[i][1].DinoRecords < records) {
                                    const newPostKey = push(child(ref(db), `${localStorage.getItem('WalletKey')}/`)).key;
                                    const updates = {};
                                    updates[`${localStorage.getItem('WalletKey')}/` + '/DinoRecords/'] = records;
                                    setChange(records)
                                    return update(ref(db), updates);
                                }
                            }
                        }
                    } else {
                        console.log("No data available");
                    }
                    }).catch((error) => {
                    console.error(error);
                    });
                }
                getRecords()
                  
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
            <DinoRecords change={change} />
        </div>
    );
};

export default Dino;