import { connect } from 'react-redux';
import AddMessageComponent from '../components/AddMessage';
import { addMessage } from '../actions/ActionCreator';

const mapDispatchToProps = dispatch => ({
  dispatch: (message, author, images) => {
    let payLoad = {
      message: message,
      author: author,
      images: images
    }
      dispatch(addMessage(payLoad))
    }
  })
  
  export const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent) 