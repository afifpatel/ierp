import storage from 'redux-persist/lib/storage' ;


const initialState = {
    isLoggedIn : null,
    errors: {
        username: '',
        password:''
    }
    //currentURL : ''
}


export default function reducer( state=initialState, action) {

    switch(action.type) {
        case "LOGGED_IN": {                 
            return { ...state, isLoggedIn : true}
            break;
        }
        case "ERROR": {             
            return { ...state, isLoggedIn : false}
            break;
        }
        case "INITIALISE": {             
            return { ...state, isLoggedIn : false}
            break;
        }
        case "LOGGED_OUT": {    
            Object.keys(state).forEach(key => {
                storage.removeItem(`persist:${key}`);
            });
            state = initialState;         
            return state;
            break;
        }

        case "CHECK_VALID": {             
            return { ...state, errors : action.payload}
            break;
        }
        
        case "CLEAR_ERROR": {             
            return { ...state, errors : {}}
            break;
        }

        case "CLEAR_USERNAME_ERROR": {             
            return { 
                ...state, 
                errors : { 
                    ...state.errors,
                    username : action.payload.username, 
                    }
                }
            break;
        }

        case "CLEAR_PASSWORD_ERROR": {             
            return { ...state, errors : { ...state.errors, password : action.payload.password}}
            break;
        }
}

    return state;
}

// case "FETCH_USER_FULFILLED" : {        
//     return { 
//         ...state,
//         fetching : false,
//         fetched : true,
//         username: action.payload}
//         break;
//     }
//     case "SET_USER_NAME" : {
//         return {
//             ...state,
//             username: { ...state.username, username: action.payload},
//         }
//     }