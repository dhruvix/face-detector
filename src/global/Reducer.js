export const INITIAL_STATE ={
    input:'',
    imageurl:'',
    box:[],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
};

export const reducer = (state, action) =>{
    switch(action.type){
        case 'CHANGE_ROUTE': return {
            ...state,
            route: action.payload
        };
        case 'TOGGLE_SIGNIN': return {
            ...state,
            isSignedIn: !state.isSignedIn
        };
        case 'SET_BOX': return {
            ...state,
            box: action.payload
        };
        case 'SET_INPUT': return {
            ...state,
            input: action.payload
        };
        case 'SET_URL': return {
            ...state,
            imageurl: action.payload
        };
        case 'LOAD_USER': return {
            ...state,
            user: action.payload
        };
        case 'INC_COUNT': return {
            ...state,
            user: {
                ...state.user,
                entries:action.payload
            }
        };
        case 'SIGN_OUT': return INITIAL_STATE;
        default: return state;
    }
};

export const setRoute = (route) =>{
    return {
        type: 'CHANGE_ROUTE',
        payload: route
    }
};

export const setSignIn = () =>{
    return {
        type: 'TOGGLE_SIGNIN'
    }
};

export const setBox = (route) =>{
    return {
        type: 'SET_BOX',
        payload: route
    }
};

export const setInput = (route) =>{
    return {
        type: 'SET_INPUT',
        payload: route
    }
};

export const setUrl = (route) =>{
    return {
        type: 'SET_URL',
        payload: route
    }
};

export const setUser = (route) =>{
    return {
        type: 'LOAD_USER',
        payload: route
    }
};

export const incrementCount = (count) =>{
    return {
        type: 'INC_COUNT',
        payload: count
    }
};

export const signOut = () =>{
    return {
        type: 'SIGN_OUT'
    }
};