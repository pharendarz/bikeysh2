import React, {Component} from 'react';
import Aux from '../../hoc/Ax/Ax';
import axios from 'axios';
import OfferBikeMarkt from '../../components/Offers/OfferBikeMarkt/OfferBikeMarkt';
// import classes from './OffersList.css';
//material-ui core elements
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Button from '@material-ui/core/Button/Button';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const applyUpdateResult = (result) => (prevState) => ({
    hits: [...prevState, ...result],
    // hits: [...result],
    page: result.page,
  });
  
const applySetResult = (result) => (prevState) => ({
    hits: result,
    page: result.page,
    //totalResult: prevState.result + result.length
});

let renderCount = 0;

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

class OffersList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            offers: [],
            selectedItemId: null,
            error: null,
            fetchUrl: props.fetchUrl,
            hits: [],
            page: null,
            skip: 0,
            pageItems: props.pageLimit,
            totalResult: 0
            
            // pageItems: 10
        }
    }
    
    componentDidMount() {

        this.fetchData(this.state.skip, this.state.pageItems);
        axios.get(this.state.fetchUrl).then(response  => response.data).then(result => {
            this.setState({totalResult: result});
            console.log('array count '+ this.state.fetchUrl + ' = ' + result[Object.keys(this.state.totalResult)[0]]);
        });

        //console.log(this.state);
    }
    fetchData = (skip, pageLimit) => {
        axios.get(this.state.fetchUrl + skip + '/' + pageLimit).then(
            response => response.data
        ).then(result => this.onSetResult(result, skip))
    }
    onSetResult = (result, skip) =>{
        if (result.length !== 0){
            this.setState(applySetResult(result, skip));}
        //console.log(result);
    }


    onPaginatedSearchNext = () => {
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        let newSkip = this.state.skip + 10;
        if(newSkip >= totalArray)
            newSkip = totalArray;
        if(newSkip !== this.state.skip){
             this.setState(state => ({
                skip: newSkip
            }));
            this.fetchData(this.state.skip + this.state.pageItems, this.state.pageItems);
            console.log("state SKIP : " + this.state.skip + " state RESULT.length : " + totalArray + " state pageItems : " + this.state.pageItems);
        }
        
    }
    onPaginatedSearchPrevious = () => {
        // console.log("state SKIP : " + this.state.skip + " state RESULT.length : " + this.state.totalResult);
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        let newSkip = this.state.skip - 10;
        if(newSkip <= 0) newSkip = 0;

        console.log("previous : " + this.state.skip);
        if(newSkip !== this.state.skip){
            this.setState(state => ({
                skip: newSkip
            }));
            this.fetchData(this.state.skip - this.state.pageItems, this.state.pageItems);
        }
        
    }
        

    render(){
        const { classes } = this.props;
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        console.log('RERENDER');
        renderCount += 1;
        let offers = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error && this.state.hits !== null){
            // console.log(this.state.offers);
            // console.log('hits arr:' + this.state.hits);
            let firstLevel = 0;
            for (var x in this.state.hits){
                firstLevel += 1;
                // console.log('element 1: ' + x);
                // for(var n in this.state.offers[x]){
                //     // console.log(this.state.offers[x][n]);
                //     console.log('element 2: ' + n);
                //     break;
                // }
            }
            // console.log('first element count: ' + firstLevel);
            // if (firstLevel === 1){
            //     offers = this.state.hits['hubs'].map(offer => {
            //         return <OfferBikeMarkt
            //         key={offer._id}
            //         title={offer.title}
            //         link={offer.productUrl}
            //         // firstImage={offer.pictures[0]}
            //         />
            //     })
            // }
            // else {
            //     // offers = this.state.hits.map(offer => {
            //     //     return <Offer
            //     //     key={offer._id}
            //     //     title={offer.title}
            //     //     link={offer.productUrl}
            //     //     // firstImage={offer.pictures.picLink1}
            //     //     />
            //     // )}


            // }
        }
        return(
            <Aux>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    {/* <div className={classes.container}> */}
                        <Paper className={classes.root} elevation={1}>
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                        <Typography variant="headline" component="h3">
                            This is a sheet of paper.
                        </Typography>
                        <p>  &nbsp;</p>
                        
                            <Button variant="outlined" onClick={this.onPaginatedSearchPrevious}>Previous</Button>
                            <Button variant="outlined" onClick={this.onPaginatedSearchNext}>Next</Button>
                            <p>{this.state.skip} of {totalArray}</p>
                        {/* <GridList cellHeight={140} className={classes.gridList} cols={2}> */}
                        <div style={{margin: '10px 10px 15px 10px'}}>
                            <OfferBikeMarkt
                            offers={this.state.hits}
                            fetchUrl={this.state.fetchUrl}
                            />
                        </div>
                        {/* </GridList> */}
                            <Button variant="outlined" onClick={this.onPaginatedSearchPrevious}>Previous</Button>
                            <Button variant="outlined" onClick={this.onPaginatedSearchNext}>Next</Button>
                            <p>{this.state.skip} of {totalArray}</p>
                        </Paper>   
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                    {/* </div> */}
                </div>
            </Aux>
        )
    }
}

export default withStyles(styles)(OffersList);