const initial = {
    status:'n',
    scroll: true 
  }
  
  export const SettingReducer = (state = initial , action) => {
      switch (action.type) {
          case 'Setting_Reload':
            return {
                ...state ,
                status : action.data
            }
          case 'Setting_Scroll' : 
            return {
              ...state,
              scroll : action.data
            }
  
          default:
            return state;
      }
  }