import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";

const BirdRecords = (props) => {

    let [records, setRecords] = useState([])
    const {change} = props

    useEffect(() => {
        getRecords()
    }, [change])
    
    const getRecords = ( ) => {
        const dbRef = ref(getDatabase());
        let table = []
        get(child(dbRef, '/')).then((snapshot) => {
        if (snapshot.exists()) {
            let arr = Object.entries(snapshot.val())
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][1].BirdRecords) {
                    table.push(arr[i])
                }
            }
            setRecords(records =  Object.entries(Object.fromEntries(table)))
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    }

    return (
        <div className='BirdRecords_container'>
                <ul className='BirdRecords_list'>
                    {   
                        records.sort((a, b) => b[1].BirdRecords - a[1].BirdRecords).slice(0, 3).map(item => {
                            return (
                            <li className='BirdRecords_item' key={item[0]} id={item[0]}>
                                <div>{records.sort((a, b) => b[1].BirdRecords - a[1].BirdRecords).indexOf(item) + 1}</div>
                                <div>{item[1].nickname === undefined ? item[1].username.slice(0, 3) + "..." + item[1].username.slice(item[1].username.length - 3, item[1].username.length) : item[1].nickname}</div>
                                <div>{item[1].BirdRecords}</div>
                            </li>
                            )
                        })
                    }
                </ul>
        </div>
    );
};

export default BirdRecords;