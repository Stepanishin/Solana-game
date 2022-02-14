const defaultTitleState = {
    // title: 'TokenPhantom',
    isToken: false
}

export const getTokenPhantomReducer = (state  = defaultTitleState, action) => {
    switch (action.type) {
        case "auth":
            return {...state, 
                // title: JSON.parse(window.localStorage.getItem('user')).email,
                isToken: true
                }
        
        case "logOut":
            return {...state, 
                // title: 'AUTHORIZATION',
                isToken: false
                }
        default:
            return state
        }
}