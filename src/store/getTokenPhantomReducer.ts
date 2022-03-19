type DefaultTitleStateType = {
    isToken: boolean
}

const defaultTitleState : DefaultTitleStateType = {
    isToken: false
}

export const getTokenPhantomReducer = (state  = defaultTitleState, action) : DefaultTitleStateType => {
    switch (action.type) {
        case "auth":
            return {...state, 
                isToken: true
                }
        
        case "logOut":
            return {...state, 
                isToken: false
                }
        default:
            return state
        }
}