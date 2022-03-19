type DefaultNicknameStateType = {
    isNickname: boolean
}

const defaultNicknameState : DefaultNicknameStateType = {
    isNickname: false
}

export const getNicknameReducer = (state  = defaultNicknameState, action) : DefaultNicknameStateType => {
    switch (action.type) {
        case "enterNickname":
            return {...state, 
                isNickname: true
                }
        
        case "haveNickname":
            return {...state, 
                isNickname: false
                }

        default:
            return state
        }
}