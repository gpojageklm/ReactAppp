import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import axios from 'axios'
//import { CryptoJS } from 'crypto-js';
import  SHA256  from 'crypto-js/sha256';
import Message from './Message';
import { messageReceived } from '../actions/ActionCreator';
import { get } from '../services/Request';
import { bindActionCreators } from 'redux';

class MessageList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            items:10,
            loadingState: false,
            messages:[],
            prevItems:0,
            active: false,
            target: false,
            hover: false
        }
        this.loadMoreItems = this.loadMoreItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.fetchHistory = this.fetchHistory.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.displayItems = this.displayItems.bind(this);
        //this.handleDrop = this.handleDrop.bind(this);
        //this.dropLeave = this.dropLeave.bind(this);
       // this.dropTarget = this.dropTarget.bind(this);
        //this.changeFile = this.changeFile.bind(this);
    }
   
   componentWillMount() {
        this.fetchHistory()
    }
    componentDidMount() {
          this.refs.iScroll.addEventListener("scroll",this.onScroll,false);
    }
    componentWillUnmount() {
        this.refs.iScroll.removeEventListener("scroll",this.onScroll,false);
    }
    componentWillReceiveProps(newProps) {
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
   
    loadMoreItems() {
        this.setState({ 
            items: this.state.items+10, 
            prevItems: this.state.prevItems+10 
        });
        for(let i=this.state.prevItems;i<this.state.items;i++){
            if(this.state.messages[i]) {
                this.props.messageReceived(this.state.messages[i])
            } else {
                break; 
            }
        }
    }
    displayItems() {
        const { messages } = this.props;
        return (
            <div id="main" ref="iScroll">
            {messages.map(message =>(
                <Message key = {message.id} {...message} />
            ))}
            </div>
        )
    }

    onScroll() {
        const { refs } = this;
        const scrollTop = refs.iScroll.scrollTop;
        if (scrollTop + refs.iScroll.clientHeight >= refs.iScroll.scrollHeight){
           // this.loadMoreItems();
          }
    }

    scrollToBottom() {
        const { iScroll } = this.refs;
        const scrollHeight = iScroll.scrollHeight;
        const height = iScroll.clientHeight;
        const maxScrollTop = scrollHeight - height;
        iScroll.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    fetchHistory() {
        //const uri = './chatStub.json'
        let utcTime = Math.round(new Date().getTime()/1000);
        let crypto = "mAU8gMXyPc";
        let apiKey = "rcjhupf3nukv75fnq9y839ck";
        let security = apiKey.concat(crypto,utcTime);
        let sig = SHA256(security).toString();
        const pathUri = '257179065286098xxxfacebook?api_key='+apiKey+'&sig='+sig 
        get(pathUri)
        .then((data) => {
            this.setState(state => ({
                messages: [...state.messages, ...data.body.messages],
                loadingState: false
              }))
              for(let i=0; i<this.state.messages.length; i++) {
                  this.props.messageReceived(this.state.messages[i])
              }
        })
        .catch((errorData) => {
            console.log(errorData);
        })  
    }
    
    render() {
        return (
            <React.Fragment>{this.displayItems()}</React.Fragment>
        )
    }
}

MessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.any,
          message: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired
        }).isRequired
       ).isRequired
}

const mapStateToProps = state => ({
    messages: state.messages.addMessages
})
 const mapDispatchToProps = (dispatch) => bindActionCreators({
    messageReceived
},dispatch); 

export default connect(mapStateToProps,mapDispatchToProps)(MessageList);
            
       


