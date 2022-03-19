import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";

const DinoRecords = (props) => {

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
                if (arr[i][1].DinoRecords) {
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
        <div className='DinoRecords_container'>
                <ul className='DinoRecords_list'>
                    {   
                        records.sort((a, b) => b[1].DinoRecords - a[1].DinoRecords).slice(0, 3).map(item => {
                            return (
                            <li className='DinoRecords_item' key={item[0]} id={item[0]}>
                                <div>{records.sort((a, b) => b[1].DinoRecords - a[1].DinoRecords).indexOf(item) + 1}</div>
                                <div>{item[1].nickname === undefined ? item[1].username.slice(0, 3) + "..." + item[1].username.slice(item[1].username.length - 3, item[1].username.length) : item[1].nickname}</div>
                                <div>{item[1].DinoRecords}</div>
                            </li>
                            )
                        })
                    }
                </ul>
        </div>
    );
};

export default DinoRecords;