import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles , MuiThemeProvider,} from '@material-ui/core/styles';
import {Grid, IconButton, ButtonBase, Avatar, CircularProgress} from '@material-ui/core';
//icons
import InfoIcon from '@material-ui/icons/Info';
import Delete from '@material-ui/icons/DeleteSweep';
//app components
import FavoriteButton from '../Buttons/FavoriteButton';
import TagButton from '../Buttons/TagButton';
import SnackbarBestOffer from '../Snackbars/SnackbarBestOffer';
import OfferDetailsDialog from '../Dialogs/OfferDetailsDialog';
import Aux from '../../hoc/Ax/Ax';
//commons
import {getOfferAttributes} from '../../common/common';
//styles
import bestOfferStyle from '../../styles/components/Cards/bestOfferStyle';
import {themeIconButton, themeProgress} from '../../styles/components/Cards/bestOfferStyle';

class BestOffer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            offerCount: this.props.offerCount,
            openStatisticsChips: false,
            favorite: this.props.offer.favorite,
            disableStatistics: false,
            scoringData: {
                trueName: 'Loading...', price: 0, currency: "...", median: 0, 
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
        if (this.props.mobileView)
            return;

        this.setState({openStatisticsChips: !this.state.openStatisticsChips});
    };
    handleCloseStatisticsChips = () => {
        this.setState({openStatisticsChips: false});
    };
    handleCloseOfferDetailsDialog = () => {
        this.setState({showOfferDetails: false, disableStatistics: false} , ()=> {
        });
    };
    handleShowOfferDetailsDialog = () => {
        this.setState({showOfferDetails: true, disableStatistics: true} , ()=> {
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
                    currency: result.scoring[0].currency === 'EUR' ? '\u20AC' : result.scoring[0].currency,
                    median: result.scoring[0].median,
                    countTotal: result.scoring[0].countTotal,
                    scores: result.scoring[0].scores,
                    itemState: result.scoring[0].itemState,
                    yearTitle: result.scoring[0].yearTitle,
                    yearDescription: result.scoring[0].yearDescription,
                    urlActive: result.scoring[0].urlActive,
                    manufacturerSetId: parseInt(result.scoring[0].manufacturerSetId, 10),
                    modelSetId: parseInt(result.scoring[0].modelSetId, 10),
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
        if (nextProps.offer.favorite !== this.state.favorite){
            this.setState({favorite: nextProps.offer.favorite}, () => {
            });
        }
    }
    async componentWillMount(){
        if (!this.props.searchPending){
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
        if(this.state.scoringData.urlActive !== undefined && this.state.scoringData.urlActive !== null){
            if(JSON.parse(this.state.scoringData.urlActive)){
                offerAvailable = true
            } else {
                offerAvailable = false 
            }
        } 
        return(
            <div className={classes.root}>
                <ButtonBase
                    disableRipple={this.state.disableStatistics || this.props.mobileView}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    onClick={this.handleShowStatisticsChips}
                >
                    <div
                        className={classes.bestOfferImage}
                        style={{
                            backgroundImage: `url(${piclink})`,
                        }}
                    />
                    <div className={classes.bestOfferBackdrop} />
                    {this.props.useLoader ? 
                    <MuiThemeProvider theme={themeProgress}>
                        <div className={classes.spinner}>
                            <CircularProgress/> 
                        </div>
                    </MuiThemeProvider>
                    : null}
                    {/* //<< ELEMENTS */}
                    {this.props.offer._id !== `dummy` ? (
                    <Aux>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item xs={6} className={classes.bestOfferAvatar}>
                                {Math.round(this.state.scoringData.scores) !== 0 ? 
                                    <Avatar className={classes.bestOfferScore}>
                                        {parseFloat(this.state.scoringData.scores).toFixed(1)}
                                    </Avatar>
                                    : 
                                    <Avatar className={classes.bestOfferScore}>
                                    ?
                                    </Avatar>
                                }
                            </Grid>
                            <Grid item className={classes.bestOfferPrice} xs={6}>
                                {`${this.state.scoringData.price} ${this.state.scoringData.currency}`}  
                            </Grid>
                            <Grid item xs={12} className={classes.bestOfferDummyAboveTitle}>
                                <br/>
                            </Grid>
                            <Grid item className={classes.bestOfferTitle} xs={12}>
                                <b>{`${this.state.scoringData.trueName} ${yearString}`}</b>
                            </Grid>
                            <Grid item className={classes.bestOfferUnderTitle} xs={12}>
                                {`[${this.state.scoringData.itemState}]`}
                            </Grid>
                            <Grid item xs={12} className={classes.bestOfferDummyBelowTitle}>
                                <br/>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justify="space-between" alignItems="center">
                                    <Grid item xs={3} className={classes.bestOfferAction}>
                                        <MuiThemeProvider theme={themeIconButton}>
                                            <FavoriteButton 
                                                dataKey={this.props.offer._id} 
                                                favorite={this.state.favorite} 
                                                fetchUrl={this.props.fetchUrl} 
                                                model={this.props.model}
                                                setFavorite={this.handleSetFavorite}
                                            />
                                        </MuiThemeProvider>
                                    </Grid>
                                    <Grid item xs={3} className={classes.bestOfferAction}>
                                        <MuiThemeProvider theme={themeIconButton}>
                                            <TagButton 
                                                category={this.props.category} 
                                                model={this.props.model}
                                                offer={this.props.offer} 
                                                tagUrl={this.props.tagUrl}
                                                parentStatistics
                                                disableStatistics={this.handleDisableStatistics}
                                                mobileView={this.props.mobileView}
                                            />
                                        </MuiThemeProvider>
                                    </Grid>
                                    <Grid item xs={3} className={classes.bestOfferAction}>
                                        <MuiThemeProvider theme={themeIconButton}>
                                            <IconButton onClick={this.setOfferVisibility} >
                                                {/* [TODO] erase tags, and make them ignored? */}
                                                <Delete className={classes.icon}/> 
                                            </IconButton>
                                        </MuiThemeProvider>
                                    </Grid>
                                    <Grid item xs={3} className={classes.bestOfferAction}>
                                        <MuiThemeProvider theme={themeIconButton}>
                                            <IconButton 
                                                onClick={this.handleShowOfferDetailsDialog}
                                                style={{outline: "none"}}
                                            >
                                                <InfoIcon className={classes.icon}/>
                                            </IconButton>
                                        </MuiThemeProvider>
                                    
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Aux>)
                    : null}
                    {/* //>> ELEMENTS */}
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
                    mobileView={this.props.mobileView}
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


export default withStyles(bestOfferStyle)(BestOffer);