import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

const boH = 320;
const boW = 145;

const styles = theme => ({
  root: {
    height: boH,
    width: boW,
    "@media (max-width: 1024px)": {
      width: boW - 35,
      height: boH - 100,
    },
    "@media (max-width: 768px)": {
      width: boW - 70,
    },
    "@media (max-width: 425px)": {
      height: "10vh",
      width: "50vw",
    },
  },
  image: {
    height: boH,
    width: boW,
    "@media (max-width: 1024px)": {
      width: boW - 35,
      height: boH - 100,
    },
    "@media (max-width: 768px)": {
      width: boW - 70,
    },
    "@media (max-width: 425px)": {
      height: "10vh",
      width: "50vw",
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '2px solid currentColor',
      },
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});


function ButtonBases(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <ButtonBase
          focusRipple
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onClick={props.onClick}
        >
          <div
            className={classes.imageSrc} style={{border: props.mobileView ? "1px solid #97AABD" : "none"}}
          />
          <div className={classes.imageBackdrop} />
          <div className={classes.imageButton}>
              {props.caseHorizontal === `left` ? <ArrowLeft/> : <ArrowRight/>}              
          </div>
        </ButtonBase>
    </div>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);
