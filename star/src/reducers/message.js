const initialState = {
    addMessages: []
};


const message = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_MESSAGE':
        return Object.assign({},state,{
            addMessages: state.addMessages.concat([
                {
                    message: action.message,
                    author: action.author,
                    id: action.id,
                    date: action.date,
                    images: action.images
                }
            ])
        })
        
        case 'MESSAGE_RECEIVED':
        return Object.assign({},state,{
         addMessages: state.addMessages.concat([{
                    message: action.message.text,
                    author: action.message.origin,
                    id: action.message.id,
                    date: new Date(action.message.timeStamp).toLocaleString(),
                    images: action.images
                }])
        })
        default:
          return state;
    }
}
       
export default message;
