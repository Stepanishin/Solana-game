import React, { useState } from 'react';
import './dodge.css'
import DodgeRecords from './DodgeRecords';
import { getDatabase, ref, get, child, push, update } from "firebase/database";

const Dodge = () => {

    const db = getDatabase();
    let isGame = false
    let score = 0;
    const [change, setChange] = useState([])

    const startGame = () => {
        let pokeball = document.getElementsByClassName("pokeball")
        const pokeballFirst = document.querySelector(".pokeball_first")
        const squirtle = document.querySelector(".squirtle")
        let newPokeball3 = document.querySelector(".pokeball3")
        const btnStart = document.querySelector('.dodge_btn_start')
        const gameContainer = document.querySelector('.dodge_game_base')
        score = 0;
        let squirtleTop = 60
        let pokeballLeft = 93
        let pokeballTop = 50
        for (let i = 0; i < pokeball.length; i++) {
            pokeball[i].style.top = pokeballTop + "px"
            pokeball[i].style.left = pokeballLeft + "%"
        }
        let pokeballSpeed = 24 
        squirtle.style.top = squirtleTop + "px"
        isGame = true
        btnStart.classList.add('dodge_btn_start_visible')

        let pokeballMow = setInterval(move, pokeballSpeed)


        let initialPoint;
        let finalPoint;
        let touchStart = function (e) {
        e.preventDefault();
        e.stopPropagation();
        initialPoint=e.changedTouches[0];
        }

        let touchEnd = function (e) {
        e.preventDefault();
        e.stopPropagation();
        finalPoint=e.changedTouches[0];
        let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
        if (finalPoint.pageX < initialPoint.pageX){
        /*СВАЙП ВЛЕВО*/}
        else{
        /*СВАЙП ВПРАВО*/}
        }
        else {
        if (finalPoint.pageY < initialPoint.pageY && squirtle.style.top.slice(0,-2) > 0){
        /*СВАЙП ВВЕРХ*/
            squirtleTop = squirtleTop - 12
            squirtle.style.top = squirtleTop + "px"
        }
        else if (finalPoint.pageY > initialPoint.pageY && squirtle.style.top.slice(0,-2) < 126) {
        /*СВАЙП ВНИЗ*/
            squirtleTop = squirtleTop + 12
            squirtle.style.top = squirtleTop + "px"
        }
        }
        }
        }



        let listener = function (e) {
            if (isGame) {
                if (e.code === 'KeyS' && squirtle.style.top.slice(0,-2) < 126) {
                    squirtleTop = squirtleTop + 12
                    squirtle.style.top = squirtleTop + "px"
                }
                if (e.code === 'KeyW' && squirtle.style.top.slice(0,-2) > 0 ) {
                    squirtleTop = squirtleTop - 12
                    squirtle.style.top = squirtleTop + "px"
                }
            }
          };

        function move() {
            const records = score * 10  
            if (pokeballLeft < 0) {
                for (let i =0; i < pokeball.length; i++) {
                    pokeballLeft = 93
                    function getRandomIntInclusive(min, max) {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1)) + min; 
                      }
                    pokeballTop = getRandomIntInclusive(0, 140)
                    pokeball[i].style.left = pokeballLeft + "%"
                    pokeball[i].style.top = pokeballTop + "px"
                    
                }
            } else {
                for (let i =0; i < pokeball.length; i++) {
                    if (Number(pokeball[i].style.top.slice(0, -2)) > Number(squirtle.style.top.slice(0,-2)) - 12
                    && Number(pokeball[i].style.top.slice(0, -2)) < Number(squirtle.style.top.slice(0,-2)) + 20
                    && Number(pokeball[i].style.left.slice(0, -1)) < 8 
                    && Number(pokeball[i].style.left.slice(0, -1)) > 3) 
                    {   
                        clearInterval(pokeballMow)
                        clearInterval(startCounting)
                        clearInterval(newPokeballs)
                        isGame = false
                        btnStart.classList.remove('dodge_btn_start_visible')
                        squirtleTop = 60
                        squirtle.style.top = squirtleTop + "px"

                        Array.from(pokeball).forEach(async (item) => {
                                item.classList.add("pokeball3")     
                                item.classList.remove("pokeball")

                        })
                        pokeballFirst.classList.add("pokeball")
                        pokeballFirst.classList.remove("pokeball3")

                        newPokeball3 = document.getElementsByClassName("pokeball3")
                        Array.from(newPokeball3).forEach(async (item) => {
                            item.style.left = ''
                            item.style.top = ''    
                        })

                        pokeballFirst.style.left = 93 + "%"
                        document.removeEventListener('keydown', listener, false)
                        gameContainer.removeEventListener('touchstart', touchStart, false)
                        gameContainer.removeEventListener('touchend', touchEnd, false )

                        const getRecords = ( ) => {
                            const dbRef = ref(getDatabase());
                            get(child(dbRef, '/')).then((snapshot) => {
                            if (snapshot.exists()) {
                                let arr = Object.entries(snapshot.val())
                                for (let i = 0; i < arr.length; i++) {
                                    if (arr[i][0] === localStorage.getItem('WalletKey')) {
                                        if (arr[i][1].DodgeRecords === undefined || arr[i][1].DodgeRecords < records) {
                                            const newPostKey = push(child(ref(db), `${localStorage.getItem('WalletKey')}/`)).key;
                                            const updates = {};
                                            updates[`${localStorage.getItem('WalletKey')}/` + '/DodgeRecords/'] = records;
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
                    } else {
                        pokeballLeft -= 0.33; 
                        pokeball[i].style.left = pokeballLeft + "%"
                    }
                }
            }
            
        };


        let newPokeballs = setInterval(newPokeball, 13750)
        function newPokeball() {
            newPokeball3 = document.querySelector(".pokeball3")
            newPokeball3.classList.add("pokeball")
            newPokeball3.classList.remove("pokeball3")
            pokeball = document.getElementsByClassName("pokeball")
          }
       
        document.addEventListener('keydown', listener, false)
        gameContainer.addEventListener('touchstart', touchStart, false)
        gameContainer.addEventListener('touchend', touchEnd, false )

        const startCounting = setInterval(tick, 100);
        function tick()
            {
                score++;
                document.querySelector(".dodge_timer").childNodes[0].nodeValue = "Score: " + score;
            } 
    }

    return (
        <div className='Dodge_wrap'>
            <div className='dodge_btn_wrapper'>
                <div className='dodge_timer'>Score: {score}</div>
                <button className='dodge_btn dodge_btn_start' onClick={startGame}>START</button>
            </div>
            <div className='dodge_container'>
                <div className='dodge_game_base'>
                    <div className="squirtle"></div>
                    <div className="pokeball pokeball_first"></div>
                    <div className="pokeball3"></div>
                    <div className="pokeball3"></div>
                    <div className="pokeball3"></div>
                    <div className="pokeball3"></div>
                    <div className="pokeball3"></div>
                    <div className="pokeball3"></div>
                </div>
            </div>
            <div className='dodge_instruction'>
                <ol className='dodge_instruction_list'>
                    <li className='dodge_instruction_list_item'>Press "START" to start the game!</li>
                    <li className='dodge_instruction_list_item'>Press "W" or swipe to the top in the play area to go up!</li>
                    <li className='dodge_instruction_list_item'>Press "S" or swipe to the down in the play area to go down!</li>
                    <li className='dodge_instruction_list_item'>ENJOY!</li>
                </ol>
            </div>
            <DodgeRecords change={change} />
        </div>
    );
};

export default Dodge;