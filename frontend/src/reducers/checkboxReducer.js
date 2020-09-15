const checkboxReducer = (state ={structure:[], checkboxes: [], expanded: [], version: null}, action) => {
    var expanded = []
    switch(action.type){
        case "SET_STRUCTURE":
            return {...state,structure:action.structure,expanded:generateExpanded(action.structure, 0)};
        case "SET_CHECKBOXES":
            return {...state,checkboxes:action.checkboxes,version:action.version};
        case "UPDATE_CHECKBOX":
            var checkboxes = state.checkboxes.filter(cb=>{return cb.checkboxId!==action.checkbox.checkboxId})
            checkboxes.push(action.checkbox)
            return {...state,checkboxes:checkboxes,version:action.version};
        case "EXPAND_CHECKBOX":
            expanded = [...state.expanded]
            expanded[action.checkboxId].value=true
            return {...state,expanded}
        case "REDUCE_CHECKBOX":
            expanded = [...state.expanded]
            expanded[action.checkboxId].value=false
            return {...state,expanded}
        case "TOGGLE_CHECKBOX":
            expanded = [...state.expanded]
            expanded[action.checkboxId].value=!state.expanded[action.checkboxId].value
            return {...state,expanded}
        case "EXPAND_COMMENT":
            expanded = [...state.expanded]
            expanded[action.checkboxId].commentValue=true
            return {...state,expanded}
        case "REDUCE_COMMENT":
            expanded = [...state.expanded]
            expanded[action.checkboxId].commentValue=false
            return {...state,expanded}
        case "TOGGLE_COMMENT":
            expanded = [...state.expanded]
            expanded[action.checkboxId].commentValue=!state.expanded[action.checkboxId].commentValue
            return {...state,expanded}
        default:
            return state;
    }
}

function generateExpanded(boxes, level) {
let expanded = [];

console.log(boxes)

for(let box in boxes){
    expanded.push(generateBoxExpansion(boxes[box],level))
    expanded.push(...generateExpanded(boxes[box].boxes,level+1))
}
return expanded
}

function generateBoxExpansion(box, level) {
if(level<1){
    return {
        id: box.id,
        value: true,
        commentValue: false
    }
} else {
    return{
        id: box.id,
        value: false,
        commentValue: false
    }
}
}




export default checkboxReducer;