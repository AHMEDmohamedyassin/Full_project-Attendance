const initial = {
  status:'n',
  collage_list : []
}

export const AuthReducer = (state = initial , action) => {
    switch (action.type) {
        case 'Auth_Logout':
          return initial

        case 'Auth_Status':
          return {
            ...state ,
            status: action.data
          }

        case 'Auth_Data' : 
          return {
            ...state,
            ...action.data
          }
        
        case 'Auth_Collage' : 
          return {
            ...state , 
            collage_list : action.data
          }

        default:
          return state;
    }
}