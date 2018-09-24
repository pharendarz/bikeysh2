import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Close';
import NoTag from '@material-ui/icons/AddCircle';

const styles = theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit,
    },
  });


class TagChip extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        tagExist: false
      }
      this.handleSearchTag = this.handleSearchTag.bind(this);
    }
    componentWillMount(){
      

      this.handleSearchTag();
      
    }
    handleSearchTag = async (event) => {
      for(var i=0; i<this.props.existingTags.length; i++){
        console.log(this.props.existingTags[i])
        if(this.props.word === this.props.existingTags[i]){
          this.setState({tagExist: true});
          break;
        }
      }
    }
    handleDeleteTag = async () => {
        console.log('You clicked the delete icon.'); 
        // const create = await axios.post(this.props.tagUrl + 'create', {
        //   offerId: this.props.offerId,
        //   offerOrigin: this.props.offerOrigin,
        //   tagName: this.props.word,
        //   active: true,
        //   ignore: false
        // })
      }
      
      handleAddTag() {
        console.log('You clicked the Chip.'); 
      }
        
      handleIgnoreTag() {
        console.log('You ignored the Chip.'); 
      }
    render(){
        const { classes } = this.props;
        // console.log(this.props.tagUrl + '/' + this.props.offerId  + '/' + this.props.offerOrigin  + '/' + this.props.word);
        return(
            <Chip
            avatar={
              <Avatar>{this.props.word.charAt(0).toUpperCase()}</Avatar>
            }
            label={this.props.word}
            onDelete={this.handleDeleteTag}
            deleteIcon={this.state.tagExist ? <DeleteIcon /> : <NoTag/>}
            onClick={this.handleAddTag}
            className={classes.chip}
            color={this.state.tagExist ? "secondary" : "primary"}
            />
        )
    }
}
TagChip.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(TagChip);