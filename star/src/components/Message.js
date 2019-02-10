import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
//import Moment from 'react-moment';
const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit ,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 2,
      background: 'linear-gradient(45deg, #F0F4C3 10%, #F0F4C3 10%)',
      
     },
    customerPaper: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
        background: 'linear-gradient(45deg, #80D8FF 10%, #80D8FF 10%)',
      },
    systemPaper: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
        background: 'linear-gradient(45deg, #66ff66 10%, #66ff66 10%)',
      }  
  });

  class Message extends React.PureComponent {
      render() {
          const { message, classes, author, date, images} = this.props;
          return (
              <Fragment>
                <Paper className={author === 'AGENT' ? classes.paper : author === 'SYSTEM' ? classes.systemPaper : classes.customerPaper}>
                    <div className="wraping"><i className="authorSet">{author}:</i> {message}</div>
                    {images ? images : null }
                    <div className="date-style">{date}</div>
                </Paper>
              </Fragment>
          )
      }
  }

Message.propTypes = {
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    images: PropTypes.object
}

export default withStyles(styles)(Message);