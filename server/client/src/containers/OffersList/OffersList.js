import React, {Component} from 'react';
import Aux from '../../hoc/Ax/Ax';
import axios from 'axios';
import OffersPageResult from '../../components/Offers/OfferBikeMarkt/OffersBMPageResult';
// import classes from './OffersList.css';
//material-ui core elements
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Button from '@material-ui/core/Button/Button';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// # app components
import PageInfo from '../../containers/PageInfos/PageInfo.jsx';
import Pagination from '../../components/Pagination/OfferListPagination.jsx'
//styles
import containerStyle from '../../styles/components/offerListStyle';

let renderCount = 0;
const skipValue = 10;
class OffersList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            offers: [],
            loadFavorites: false,
            loadWithoutTags: false,
            selectedItemId: null,
            error: null,
            fetchUrl: props.fetchUrl,
            hits: [],
            page: null,
            skip: 0,
            pageItems: props.pageLimit,
            totalResult: 0,
            reload: false
        }
    }
    componentWillMount() {
        this.props.loadFavorites ? this.setState({loadFavorites: true}, () => {}) : this.setState({loadFavorites: false}, () => {});
        this.props.loadWithoutTags ? this.setState({loadWithoutTags: true}, () => {}) : this.setState({loadWithoutTags: false}, () => {});
    }
    componentDidMount() {
        axios.get(this.props.fetchUrl).then(response  => response.data).then(result => {
            this.setState({totalResult: result}, ()=>{
                this.fetchData(this.state.skip, this.state.pageItems);
            });
        });
    }
    async componentWillUnmount() {
        await this.props.showFavorites(false);
        await this.props.showWithoutTags(false);
    }
    fetchData = (skip, pageLimit, showFirst, showLast) => {
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        axios.get(`/api/bm/category/${this.props.model}/${skip}/${pageLimit}/${this.state.loadFavorites}/
            ${this.state.loadWithoutTags}/first=${showFirst}/last=${showLast}`)
            .then(response => response.data)
            .then(result => this.onSetResult(result, skip))
    }
    
    onSetResult = (result, skip) =>{
        if (result.length !== 0){
            this.setState({hits: result, reload: !this.state.reload}, () => {
                // this.forceUpdate();
                window.scrollTo(0, 0);
            });}
    }

    onPaginatedSearchNext = () => {
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        let newSkip = this.state.skip + skipValue;
        if(newSkip >= totalArray)
            newSkip = totalArray;
        if(newSkip !== this.state.skip){
             this.setState(() => ({
                skip: newSkip
            }), () => {
                this.fetchData(this.state.skip, this.state.pageItems);
            });
        }
        
    }
    onPaginatedSearchPrevious = () => {
        let newSkip = this.state.skip - skipValue;
        if(newSkip <= 0) newSkip = 0;
        if(newSkip !== this.state.skip){
            this.setState(() => ({
                skip: newSkip
            }), () => {
                this.fetchData(this.state.skip, this.state.pageItems);
            });
        }
        
    }
    handleShowFirstPage = () => {
        let newSkip = 0;
        if(newSkip !== this.state.skip){
            this.setState(state => ({
                skip: newSkip
            }), () => {
                this.fetchData(this.state.skip - this.state.pageItems, this.state.pageItems);
            });
        }
        // this.fetchData(this.state.skip + this.state.pageItems, this.state.pageItems, true, false);
    }
    handleShowLastPage = () => {
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        let newSkip = totalArray - skipValue;
        if(newSkip <= 0) newSkip = 0;
        if(newSkip !== this.state.skip){
            this.setState(() => ({
                skip: newSkip
            }), () => {
                this.fetchData(this.state.skip - this.state.pageItems, this.state.pageItems);
            });
        }
        // this.fetchData(this.state.skip + this.state.pageItems, this.state.pageItems, false, true);
    }
    render(){
        const { classes } = this.props;
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        renderCount += 1;
        let offers = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error && this.state.hits !== null){
            let firstLevel = 0;
            for (var x in this.state.hits){
                firstLevel += 1;
            }
        }
        let pageInfo = null;
        switch(this.props.category){
            case(`DHFRAMES`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.dhframesImage.url} 
                                pageInfoTitle={`Downhill Frames`} 
                                tweak={this.props.imageUrls.dhframesImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            case(`ENDUROFRAMES`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.enduroframesImage.url} 
                                pageInfoTitle={`Enduro Frames`} 
                                tweak={this.props.imageUrls.enduroframesImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            case(`CRANKS`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.cranksImage.url} 
                                pageInfoTitle={`Cranks`} 
                                tweak={this.props.imageUrls.cranksImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            case(`WHEELS`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.wheelsImage.url} 
                                pageInfoTitle={`Wheels`} 
                                tweak={this.props.imageUrls.wheelsImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            case(`HUBS`):
                pageInfo = <PageInfo 
                                imageUrl={this.props.imageUrls.hubsImage.url} 
                                pageInfoTitle={`Hubs`} 
                                tweak={this.props.imageUrls.hubsImage.tweak}
                                loadFavorites={this.state.loadFavorites}
                                loadWithoutTags={this.state.loadWithoutTags}
                            />
                break;
            default:
                break;
        }
        return(
            <Aux>
                {pageInfo}
                <div className={classNames(classes.main, classes.mainRaised)} style={{background: containerStyle.bikeyshBackground.background}}>
                    <div className={classes.container}>
                        <Paper className={classes.containerBackground} elevation={1}>
                        <Grid container direction="column" justify="center" alignContent="center">
                            {/* //offer list */}
                            <Grid item>
                                <OffersPageResult
                                    offers={this.state.hits}
                                    fetchUrl={this.state.fetchUrl}
                                    tagUrl={this.props.tagUrl}
                                    category={this.props.category}
                                    model={this.props.model}
                                    rerender={this.state.reload}
                                />
                            </Grid>
                            {/* // pagination */}
                            <Grid item>
                                <Pagination 
                                    show={this.state.skip + skipValue} 
                                    total={totalArray} 
                                    lastPage={this.handleShowLastPage} 
                                    firstPage={this.handleShowFirstPage}
                                    previous={this.onPaginatedSearchPrevious} 
                                    next={this.onPaginatedSearchNext}
                                />
                            </Grid>
                        </Grid>
                        </Paper>   
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default withStyles(containerStyle)(OffersList);