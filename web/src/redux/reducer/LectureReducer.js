const initial = {
    status : "n",
    current : 0 ,
    last : 0 ,
    total : 0 ,
    perPage : 0 ,
    hasMore : true ,
    items:[],
    lecture_data:{} ,
    attendance : {
        current : 0 ,
        last : 0 ,
        total : 0 ,
        perPage : 0 ,
        hasMore : true ,
        items : []
    },
    lecture_permission : []
}

export const LectureReducer = (state = initial , action) => {
    switch(action.type) {
        case "Lecture_Status" : 
            return {
                ...state,
                status : action.data
            }
        case "Lecture_Data" : 
            return {
                ...state ,
                ...action.data
            }
        case "Lecture_Attendance" : 
            return {
                ...state ,
                attendance:{
                    ...state.attendance ,
                    ...action.data ,
                    items : [
                        ...state.attendance.items ,
                        ...action.items
                    ]
                }
            }
        case "Lecture_Listing" : 
            return {
                ...state ,
                ...action.data,
                items:[
                    ...state.items,
                    ...action.items
                ]
            }
        default :
            return state;
    }
}