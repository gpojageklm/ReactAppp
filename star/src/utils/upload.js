import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/ActionCreator';
import '../App.css';
import { bindActionCreators } from 'redux';

const changeFile = (event) => {
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
              this.props.addMessage(this.input.value, 'ME', div);
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
              this.props.addMessage(this.input.value, 'ME', div);
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addMessage
    },
    dispatch
  );
export default connect(
  mapDispatchToProps
)(changeFile);