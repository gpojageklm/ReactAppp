import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from '../actions/ActionCreator';
import EmojiConvertor from 'emoji-js';
import EmojiPicker from 'emoji-picker-react';
import 'emoji-picker-react/dist/universal/style.scss';
import '../App.css';
import { bindActionCreators } from 'redux';

//Emoji Setup
let emojiConvertor = new EmojiConvertor();
emojiConvertor.init_env();

// set the style to emojione (default - apple)
emojiConvertor.img_set = 'emojione';
emojiConvertor.img_set = 'apple';
// set the storage location for all emojis
emojiConvertor.img_sets.emojione.path =
  'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
//emojiConvertor.img_sets.apple.path = 'http://my-cdn.com/emoji-apple-64/';
//emojiConvertor.img_sets.className = "emoji emoji-sizer";
emojiConvertor.allow_native = true;
emojiConvertor.replace_mode = 'unified';

class AddMessage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onKeyPressMessage = this.onKeyPressMessage.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
    this.toogleEmojiState = this.toogleEmojiState.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.dropLeave = this.dropLeave.bind(this);
    this.dropTarget = this.dropTarget.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.state = {
      emojiShown: false,
      fileData: [],
      imagePreviewUrl: null,
      active: false,
      target: false,
      hover: false
    };
  }

  componentDidMount() {
    window.addEventListener('dragover', this.dropTarget,false);
    window.addEventListener('dragleave', this.dropLeave,false);
    window.addEventListener('drop', this.handleDrop, false);
  }

  componentWillUnmount() {
    window.addEventListener('dragover', this.dropTarget,false);
    window.addEventListener('dragleave', this.dropLeave,false);
    window.addEventListener('drop', this.handleDrop,false);
  } 
  onKeyPressMessage(e) {
    const { addMessage } = this.props;
    if (e.key === 'Enter' && !e.shiftKey) {
      addMessage(this.input.value, 'AGENT', false);
      this.input.value = '';
    }
  }
  onHandleSubmit(event) {
    event.preventDefault();
    if (this.input.value !== '') {
     this.props.addMessage(this.input.value, 'AGENT', false);
      this.input.value = '';
    }
  }

   dropTarget(e) {
    if(!this.state.active){    
      this.setState({
        target: true
      });
    }
  }

  dropLeave(e) {
    if(e.screenX === 0 && e.screenY === 0) { // Checks for if the leave event is when leaving the window
    	this.setState({
    	  target: false
    	});
    }
  }

  handleDrop(e) {
    console.log(e)
    e.preventDefault();
    e.stopPropagation();
    let uploadObj = {
      target: e.dataTransfer
    };
    
    this.setState({
      target: false,
      hover: false
    });
    
    this.handleChangeFile(uploadObj);
  } 

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.active) {
      this.setState({
        hover: true
      });
    }
  }
  handleDragLeave(e) {
		this.setState({
      hover: false
    });
  }
  handleDragOver(e){
    e.preventDefault();
  }
  handleChangeFile(event) {
    if (window.File && window.FileList && window.FileReader) {
      let files = event.target.files;
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let fileName = file.name.split('.');
        let reader = new FileReader();
        //Only pics
        if (file.type.match('image')) {
          if (!file.type.match('image')) continue;

          reader.onload = e => {
            let picFile = e.target;
            let div = (
              <div>
                <img
                  className="thumbnail"
                  src={picFile.result}
                  alt={picFile.name}
                  onClick={e => console.log(e.target)}
                />
              </div>
            );
            this.props.addMessage(this.input.value, 'AGENT', div);
          };
          //Read the image
          reader.readAsDataURL(file);
        } else {
          
           reader.onload = e => {
            let attachFile = e.target;
            let div = (
              <div>
                <img src={file.type.match('pdf')? "pdf.icon_.png" : "Docs-icon.png"} alt={file.name} className="pdfIcon"></img>
                 <a className="pdfAnchor" href={attachFile.result} download={file.name}>{fileName[0]}</a>
              </div>
            );
            this.props.addMessage(this.input.value, 'AGENT', div);
          };
          reader.readAsDataURL(file); 
        }
        /* else {
          reader.onload = e => {
            let otherFile = e.target;
            console.log(file.name)
            let div = (
              <div>
              <img src="Defult-Doc.png" alt={file.name} className="pdfIcon"></img>
                 <a className="pdfAnchor" href={otherFile.result} download={file.name}>{fileName[0]}</a>
              </div>
            );
            this.props.addMessage(this.input.value, 'ME', div);
          };
          reader.readAsDataURL(file);
        } */
      }
    } else {
      console.log('Your browser does not support File API');
    }
  }

  toogleEmojiState(event) {
    this.setState({
      emojiShown: !this.state.emojiShown
    });
  }
  //displays emoji inside the input window
  handleEmojiClick = (unified, emoji, e) => {
    let emojiPic = emojiConvertor.replace_colons(`:${emoji.name}:`);
    //this.input.value = this.input.value + emojiConvertor.replace_unified(emojiPic);
    this.input.value = this.input.value + emojiPic;
    this.setState({
      emojiShown: !this.state.emojiShown
    });
  };

  render() {
    return (
      <div className="send-message">
        <textarea
          rows="4"
          cols="50"
          ref={node => {
            this.input = node;
          }}
          placeholder="Your message"
          onKeyPress={this.onKeyPressMessage}
        />
        <button type="submit" onClick={this.onHandleSubmit}>
          Send
        </button>
        <span id="show-emoji-yes" onClick={this.toogleEmojiState}>
          {'😎'}
        </span>
        {this.state.emojiShown ? (
          <div className="emoji-table">
            <EmojiPicker onEmojiClick={this.handleEmojiClick} />
          </div>
        ) : null}
        <div className="image-upload">
          <label htmlFor="file-input">
            <img src="attach-filled.png" alt="attach" />
          </label>

          <input
            id="file-input"
            type="file"
            name="file-img"
            accept="file_extension|audio/*|video/*|image/*|media_type"
            onChange={event => {
              this.handleChangeFile(event);
            }}
            onClick={event => {
              event.target.value = null;
            }}
            onDrop = {this.handleDrop}
            onDragEnter = {this.handleDragEnter}
            onDragOver = {this.handleDragOver}
            onDragLeave = {this.handleDragLeave}
            multiple
          />
        </div>
      </div>
    );
  }
}
AddMessage.propTypes = {
  // addMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      message: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};
const mapStateToProps = state => {
  return {
    messages: state.messages.addMessages
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addMessage
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMessage);
