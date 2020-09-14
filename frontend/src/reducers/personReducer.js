const personReducer = (state ={all:[], currentPerson: null}, action) => {
    var all = []
    switch(action.type){
        case "SET_PEOPLE":
            all = action.people
            return {...state,all:all};
        case "SET_PERSON":
            all = [...state.all]
            all = all.filter((element)=>{
                return element.id !== action.person.id
            })
            all.push(action.person)
            return {...state,all:all};
        case "SET_CURRENT_PERSON":
            return {...state,currentPerson:action.personId};
        case "SAVE_IMAGE":
            var pers = [...state.all].filter((element)=>{return element.id === action.personId})[0]
            all = [...state.all]
            all = all.filter((element)=>{return element.id !== pers.id})
            all.push({...pers,image:action.url})
            return {...state,all:all};
        default:
            return state;
    }
}
export default personReducer;