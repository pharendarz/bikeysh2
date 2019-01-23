import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Snackbar from '@material-ui/core/Snackbar';
//icons
import InfoIcon from '@material-ui/icons/Info';
import Delete from '@material-ui/icons/DeleteSweep';
//app components
import FavoriteButton from '../../Buttons/FavoriteButton.jsx';
import TagButton from '../../Buttons/TagButton';
import SnackbarBestOffer from '../../Snackbars/SnackbarBestOffer.jsx';
import OfferDetailsDialog from '../../Dialogs/OfferDetailsDialog.jsx';
//hoc components
import Aux from '../../../hoc/Ax/Ax';
//common
import {getOfferAttributes} from '../../../common/common';
const styles = theme => ({
    root: {
        display: 'relative',
        height: 350,
        width: 250,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      opacity: 0.6
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: `#C96567`,
      fontSize: `20px`,
      fontFamily: `Lobster`,
      textShadow: `1px 1px #314455`,
    },
    image: {
        position: 'relative',
        height: 350,
        width: 250,
        [theme.breakpoints.down('xs')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
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
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
        textShadow: '1px 1px #000',
        fontSize: '15px'
    },
    imagePrice: {
        position: 'relative',
        left: 175,
        right: 0,
        top: -150,
        opacity: 1,
        color: '#fff',
        fontSize: '15px'
    },
    imageScoring: {
        position: 'relative',
        left: 15,
        right: 0,
        top: -150,
        opacity: 1,
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
    imageActionsFavorite: {
        position: 'relative',
        zIndex: 10,
        left: movePoint,
        right: 0,
        top: 150,
        opacity: 1,
    },
    imageActionsTags: {
        position: 'relative',
        left: movePoint,
        right: 0,
        top: 150,
        opacity: 1,
    },
    imageActionsHide: {
        position: 'relative',
        left: movePoint,
        right: 0,
        top: 150,
        opacity: 1,
    },
    imageActionsInfo: {
        position: 'relative',
        left: movePoint,
        right: 0,
        top: 150,
        opacity: 1,
    },
    icon: {
        outline: "none",
    }
});
const movePoint = -35;
class BestOffer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            offerCount: this.props.offerCount,
            openStatisticsChips: false,
            favorite: this.props.offer.favorite,
            disableStatistics: false,
            scoringData: {
                trueName: '', price: 0, currency: "...", median: 0, 
                countTotal: 0, scores: 0, itemState: "not defined",
                yearTitle: 0, yearDescription: 0,
                manufacturerSetId: 0, modelSetId: 0
            },
            showOfferDetails: false,
            attributes: [],

        }
    }
    handleDisableStatistics = (disable) => {
        this.setState({ 
            disableStatistics: disable 
        });
    };
    handleShowStatisticsChips = () => {
        this.setState({openStatisticsChips: !this.state.openStatisticsChips});
    };
    handleCloseStatisticsChips = () => {
        this.setState({openStatisticsChips: false});
    };
    handleCloseOfferDetailsDialog = () => {
        this.setState({showOfferDetails: false, disableStatistics: false} , ()=> {
            console.log(`close :${this.state.disableStatistics}`);
        });
    };
    handleShowOfferDetailsDialog = () => {
        this.setState({showOfferDetails: true, disableStatistics: true} , ()=> {
            console.log(`show :${this.state.disableStatistics}`);
        });
    };
    handleSetFavorite = (setAs) => {
        this.setState({favorite: setAs}, ()=> {});
    }
    getScoringData = async () => {
        if (this.props.offer._id !== `dummy`){
            await axios.get('/scoring/' + this.props.offer._id).then(response  => response.data).then(result => {
                let scoringData = {
                    trueName: result.scoring[0].fullName,
                    price: result.scoring[0].price,
                    currency: result.scoring[0].currency,
                    median: result.scoring[0].median,
                    countTotal: result.scoring[0].countTotal,
                    scores: result.scoring[0].scores,
                    itemState: result.scoring[0].itemState,
                    yearTitle: result.scoring[0].yearTitle,
                    yearDescription: result.scoring[0].yearDescription,
                    urlActive: result.scoring[0].urlActive,
                    manufacturerSetId: parseInt(result.scoring[0].manufacturerSetId),
                    modelSetId: parseInt(result.scoring[0].modelSetId),
                }
                this.setState({scoringData: scoringData}, () => {});
            });
        }
    }
    setOfferVisibility = async () => {
        if (!this.props.searchPending)
            await axios.get('/api/scoring/update/visibility/' + this.props.offer._id).then(response  => response.data).then(result => {
                this.setState({visible: result}, () => {
                    let objOffer = {
                        id: this.props.offer._id,
                        trueName: this.state.scoringData.trueName
                    }
                    if (!this.state.visible){
                        this.props.reload(objOffer);
                    }
                });
            });
    }
    getOfferAttributes = (category) => {
        const attributes = getOfferAttributes(category, this.props.offer);
        this.setState({attributes: attributes}, () =>{});
    }
    componentWillReceiveProps(nextProps){
        // console.log(`nextProps : fav ${nextProps.offer.favorite}`);
        if (nextProps.offer.favorite !== this.state.favorite){
            this.setState({favorite: nextProps.offer.favorite}, () => {
                // console.log(`state : fav ${nextProps.offer.favorite}`);
            });
        }
    }
    async componentWillMount(){
        if (!this.props.searchPending){
            console.log(`BEST OFFER CATEGORY: ${this.props.category}`);
            if (this.props.category !== undefined){
                this.getOfferAttributes(this.props.category);
            }
            await this.getScoringData();
        }
    }
    shouldComponentUpdate(){
        return !this.props.searchPending;
    }
    render(){
        const { classes } = this.props;
        let piclink = <a>No image at all.</a>;
        if(this.props.offer.pictures !== null || this.props.offer.pictures !== undefined){
            for (var x in this.props.offer.pictures){
                piclink = this.props.offer.pictures[x];
                break;
            }
        }
        const yearTitle = this.state.scoringData.yearTitle !== undefined && this.state.scoringData.yearTitle !== 0 ? 
            this.state.scoringData.yearTitle : ``;
        const yearDescription = this.state.scoringData.yearDescription !== undefined && this.state.scoringData.yearTitle !== 0 ? 
            this.state.scoringData.yearDescription : ``;

        let yearString = ``;
        switch(true){
            case (yearTitle !== ``):
                yearString = ` [${yearTitle}]`
                break;
            case (yearDescription !== ``):
                yearString = ` [${yearDescription}]`
                break;
            default:
                break;
        }
        let offerAvailable = undefined;
        this.state.scoringData.urlActive !== undefined && this.state.scoringData.urlActive !== null ?
            JSON.parse(this.state.scoringData.urlActive) ?  offerAvailable = true : offerAvailable = false 
            : null;
        return(
            <div className={classes.root}>
                <ButtonBase
                    disableRipple={this.state.disableStatistics}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    onClick={this.handleShowStatisticsChips}
                >
                <span
                    className={classes.imageSrc}
                    style={{
                        backgroundImage: `url(${piclink})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                {this.props.offer._id !== `dummy` ? (
                <Aux>
                    <span className={classes.imageScoring}>
                        {Math.round(this.state.scoringData.scores) !== 0 ? 
                            <Avatar className={classes.avatar}>
                                {parseFloat(this.state.scoringData.scores).toFixed(1)}
                            </Avatar>
                            : 
                            <Avatar className={classes.avatar}>
                            ?
                            </Avatar>
                        }
                    </span>
                    <span className={classes.imagePrice}>
                        {`${this.state.scoringData.price} ${this.state.scoringData.currency}`}  
                    </span>
                    <span className={classes.imageButton}>
                        <b>{`${this.state.scoringData.trueName}${yearString} [${this.state.scoringData.itemState}]`}</b>
                    </span>
                    <span className={classes.imageActionsFavorite}>
                        <FavoriteButton 
                            dataKey={this.props.offer._id} 
                            favorite={this.state.favorite} 
                            fetchUrl={this.props.fetchUrl} 
                            model={this.props.model}
                            setFavorite={this.handleSetFavorite}
                        />
                    </span>
                    <span className={classes.imageActionsTags}>
                        <TagButton 
                            category={this.props.category} 
                            model={this.props.model}
                            offer={this.props.offer} 
                            tagUrl={this.props.tagUrl}
                            parentStatistics
                            disableStatistics={this.handleDisableStatistics}
                        />
                    </span>
                    <span className={classes.imageActionsHide}>
                        <IconButton onClick={this.setOfferVisibility}>
                            {/* [to do] erase tags, and make them ignored? */}
                            <Delete/> 
                        </IconButton>
                    </span>
                    <span className={classes.imageActionsInfo}>
                        <IconButton 
                            onClick={this.handleShowOfferDetailsDialog}
                            style={{outline: "none",}}
                        >
                            <InfoIcon />
                        </IconButton>
                    </span>
                </Aux>
                ): null}
                {this.state.disableStatistics ? null : 
                    <SnackbarBestOffer
                        open={this.state.openStatisticsChips}
                        close={this.handleCloseStatisticsChips}
                        manufacturerSetId={this.state.scoringData.manufacturerSetId}
                        modelSetId={this.state.scoringData.modelSetId}
                        price={this.state.scoringData.price}
                        itemState={this.state.itemState}
                        searchPending={this.props.searchPending}
                        showOfferDetailsDialog={this.handleShowOfferDetailsDialog}
                    />
                }
                <OfferDetailsDialog
                    //component
                    open={this.state.showOfferDetails}
                    close={this.handleCloseOfferDetailsDialog}
                    //base info
                    offer={this.props.offer} 
                    category={this.props.category} 
                    model={this.props.model}
                    tagUrl={this.props.tagUrl}
                    favorite={this.state.favorite}
                    //attributes
                    attributes={this.state.attributes}
                    //parent props
                    parentStatistics
                    disableStatistics={this.handleDisableStatistics}
                    setFavorite={this.handleSetFavorite}
                    //statistics
                    offerAvailable={offerAvailable}
                    itemCondition={this.state.scoringData.itemState}
                    manufacturerSetId={this.state.scoringData.manufacturerSetId}
                    modelSetId={this.state.scoringData.modelSetId}
                    price={this.state.scoringData.price}
                    scores={this.state.scoringData.scores}
                    searchPending={this.props.searchPending}
                /> 
                </ButtonBase>
            </div>
        )
    }
}

BestOffer.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(BestOffer);