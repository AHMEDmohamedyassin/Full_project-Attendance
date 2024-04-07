const initial = {
    status : "n",
    current : 0 ,
    last : 0 ,
    total : 0 ,
    perPage : 0 ,
    hasMore : true ,
    items:[],
    stored_lectures : []
  }

export const StudentReducer = (state = initial , action) => {
    switch (action.type) {
        case "Student_Status" :
            return {
                ...state ,
                status : action.data
            }

        case "Student_Data" : 
            return {
                ...state ,
                ...action.data
            }

        case "Student_Items": 
            return {
                ...state,
                ...action.data ,
                items : [
                    ...state.items ,
                    ...action.items 
                ]
            }

        default:
            return state;
    }
}