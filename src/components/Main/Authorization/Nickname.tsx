import React, { useState, FC  } from 'react';
import { useDispatch } from 'react-redux';
import { getDatabase, ref, push, child, update } from "firebase/database";


const Nickname: FC = () => {

    const dispatch = useDispatch()
    const [values, setValues] = useState([])

    const handleChange = (e) => {
        const fieldName = e.target.name
        setValues({...values, [fieldName]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const db: any = getDatabase();
        const newPostKey = push(child(ref(db), `${localStorage.getItem('WalletKey')}/`)).key;
        const updates = {};
        updates[`${localStorage.getItem('WalletKey')}/` + '/nickname/'] = values.nickname;
        dispatch({type: 'haveNickname'})
        return update(ref(db), updates);
    }
    
    const exitNickname = () => {
        dispatch({type: 'haveNickname'})
    }

    return (
        <div className='nickname_wrap'>
            <form className='nickname_form'  onSubmit={handleSubmit}>
            <label className='nickname_label' htmlFor="nickname">If you want enter your nickname:</label>
            <input 
                className='nickname_text'
                maxLength={15}
                type="text" 
                name="nickname" 
                id="" 
                placeholder='enter your nickname' 
                onChange={handleChange}
                />
            <div className='nickname_buttins_wrap'>
                <input className='btn nickname_submit' type="submit" value="Submit" />
                <button className='btn nickname_exit' onClick={exitNickname}>Exit</button>
            </div>
            </form>
        </div>
    );
};

export default Nickname;