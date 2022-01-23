const initialState ={
    users:[
        {id:1, name:"Yogesh Kumar",userCode:"yogi"},
        {id:2, name:"Ravi Teja",userCode:"rav122"},
        {id:3, name:"Sai Ganesh",userCode:"gh"},
        {id:4, name:"Ashok Kona",userCode:"ash56"},
        {id:5, name:"Swaroop",userCode:"swa34"},
        {id:6, name:"Pavan Kalyan",userCode:"van88"},
        {id:7, name:"Vivek",userCode:"viv76"},
        {id:8, name:"Sasi Preetham",userCode:"sas123"},
        {id:9, name:"Chaitanya Arava",userCode:"chaitu"},
        {id:10,name:"Lakshman",userCode:"man45"},
        {id:11,name:"Venkatesh",userCode:"venky765"},
        {id:12,name:"Mahesh",userCode:"mah66"},
    ],
    nextId:13
}

const userReducer = (state=initialState,action) =>{
    switch(action.type){
        case 'INCREMENT_NEXTID':
            return{
                ...state,
                nextId : action.payload+1
            }
        case 'ADD_USER':
            return{
                ...state,
                users:[...state.users,action.payload]
            }
        case 'EDIT_USER':
            state.users.map(user => {
                if(action.payload.id === user.id){
                    user.name = action.payload.name
                    user.userCode = action.payload.userCode
                }
                return state
            })
            return{
                ...state,
                users:[...state.users]
                
            }
        case 'DELETE_USER':
            return{
                ...state,
                users:state.users.filter(user => {
                    return action.payload !== user.id
                })
            }
        default: return state
    }
}

export default userReducer;
