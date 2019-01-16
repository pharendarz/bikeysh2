import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
//app components
import BestOfferBar from '../containers/BestOfferBar/BestOfferBar';
import BestOfferInfo from '../containers/PageInfos/PageInfo';
import SnackbarHideOffer from '../components/Snackbars/Snackbar';
const styles = theme => ({
    root: {
      flexGrow: 1,
      background: '#C96567',
      overflowX: 'hidden'
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });

class BestOfferPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //unused?
            // crankHits: [],
            // dhFramesHits: [],
            // wheelsHits: [],
            // hubsHits: [],
            // enduroFramesHits: [],
            page: null,
            loading: false,
            reloadBars: false,
            //snack
            showSnackHideOffer: false,
            objOffer: {id: 0, trueName: ''}
            //
        }
    }
    handleSnack = (objOffer) => {
        if (!this.props.searchPending)
            this.setState({showSnackHideOffer: true, objOffer: objOffer}, () => {
                console.log(`snack state on bestOfferPage = ${this.state.showSnackHideOffer}`);
            });
    }
    handleReload = () => {
        this.setState({reloadBars: !this.state.reload});
        this.forceUpdate();
    }
    shouldComponentUpdate(){
        return true;
    }
    render(){
        const { classes } = this.props;
        const spacing = 8;

        return(
            <div>
            <SnackbarHideOffer 
                open={this.state.showSnackHideOffer} 
                objOffer={this.state.objOffer} 
                reload={this.handleReload}
                searchPending={this.props.searchPending}
            />
            <BestOfferInfo imageUrl={this.props.imageUrls.defaultImage} pageInfoTitle={`best offers this week so far ...`}/>
            {/* <div className={classNames(classes.main, classes.mainRaised)}> */}
                {/* <div className={classes.container}> */}
                <Paper className={classes.root} elevation={10}>
                    <div>
                    <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="flex-start" spacing={Number(spacing)}>
                        <BestOfferBar 
                            category="Cranks" 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            //offerCount={cranks} 
                            //fetchUrl={this.props.fetchUrls.cranks} 
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.cranks}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>

                    <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="center" spacing={Number(spacing)}>
                        <BestOfferBar 
                            category="Downhill Frames" 
                            //offerCount={dhframes} 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            //fetchUrl={this.props.fetchUrls.dhFrames} 
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.dhframes}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>
                    <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="center" spacing={Number(spacing)}>
                        <BestOfferBar 
                            category="Hubs" 
                            //offerCount={hubs} 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            //fetchUrl={this.props.fetchUrls.hubs} 
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.hubs}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>
                    <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="center" spacing={Number(spacing)}>
                        <BestOfferBar 
                            category="Wheels" 
                            //offerCount={hubs} 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            //fetchUrl={this.props.fetchUrls.wheels} 
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.wheels}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>
                    <Grid container direction="row" className={classes.root} justify="space-evenly" alignItems="center" spacing={Number(spacing)}>
                        <BestOfferBar 
                            category="Enduro Frames" 
                            //offerCount={hubs} 
                            bestUrl={this.props.fetchUrls.bestoffer}
                            //fetchUrl={this.props.fetchUrls.wheels} 
                            tagUrl={this.props.fetchUrls.tags}
                            model={this.props.models.enduroframes}
                            showSnack={this.handleSnack}
                            reloadBar={this.state.reloadBars}
                            showFavorites={this.props.showFavorites}
                            showWithoutTags={this.props.showWithoutTags}
                            searchPending={this.props.searchPending}
                        />
                        <br/>
                    </Grid>
                    
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </Paper>
                {/* </div> */}
            </div>
            // </div>
        )
    }
}
BestOfferPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BestOfferPage);