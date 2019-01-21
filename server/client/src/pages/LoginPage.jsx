import React from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {Grid, Paper, Input, Button, createMuiTheme, FormControl, InputAdornment} from '@material-ui/core';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import {FavoriteBorder, AccountCircle, VpnKey, } from '@material-ui/icons/';
import ImageLightBox from '../components/ImageLightbox/ImageLightBox.jsx';
import imgLogin from '../images/login.png'
import imgSearch from '../images/search.png'

const themeInput = createMuiTheme({
    overrides: {
        MuiInput:{
            root: {
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: `#ffc4c5`,
                background: "#644E5B",
                // paddingLeft: `5px`,
            },
            input: {
                // background: "#644E5B",
                // border: "1px solid black"
                paddingLeft: `5px`,
            },
            underline:{
                '&:before': {
                  borderBottom:`1px solid #000`,
                  
                },
                '&:after': {
                  borderBottom:`1px solid #ffc4c5`,
                },
            },
        },
        MuiInputLabel: {
            formControl:{
            //   color: `#ffc4c5`,
            },
        },
        MuiInputAdornment: {
            root: {
                // background: "#644E5B",
                paddingRight: "5px",

            },
        }
    }
});
const themeLoginButton = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          background: '#314455',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 30,
          '&:hover': {
              backgroundColor: '#838e99',
              color: "#fff"
          },
          outline: "none",
        },

      },
    },
  });
const styles = theme => ({
    paper: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 270,
        background: `repeating-linear-gradient(
          -45deg,
          #C96567,
          #C96567 22px,
          #9E5A63 22px,
          #9E5A63 44px
        )`,
        zIndex: 2,
      },
    react: {
        color: '#61DAFB',
    },
    heart: {
        color: "#c96567"
      },
    // loginIcons:{
    //     color: `#ffc4c5`,
    //     // width: "50%",
    //     textAlign: "center",
    //     // zIndex: 1,
    //     // position: `relative`,
    // },
    loginBackground: {
        height: 790,
        overflowY: 'hidden',
        // width: 1700,
        background: `#000 url(http://www.fullhdwpp.com/wp-content/uploads/Bicycling-Downhill_www.FullHDWpp.com_.jpg?x69613)`,
        backgroundPosition: `0px 0px`,
        backgroundAttachment: `fixed`,
        filter: 'grayscale(90%)',
      },
    introduction:{
        position: 'fixed',
        top: '20%',
        left: '7%',
        width: 500,
        height: 100,
        // border: "1px solid #000",
        zIndex: 3,
    },
    loginElement: {
        padding: "7px 0px 0px 22px",
    },
})
class LoginPage extends React.Component {
    state = {
        fullscreenOpen: false,
        picArray: [{src: 'https://i.imgur.com/BokwoDd.png'}, {src: 'https://i.imgur.com/Kw46nND.png'}],
        login: `ads`,
        password: `asd`,
        loginInput: '',
        passwordInput: '',
    };
    handleClickShowFeatures = (fullscreen, picArray) => {
        // console.log(process.env.REACT_APP_DEMO_CREDENTIALS_LOGIN);
        // console.log(process.env.REACT_APP_DEMO_CREDENTIALS_PASSWORD);
        this.setState({
          fullscreenOpen: fullscreen, 
          
        }, ()=> {});
    };
    handleInputUsername = ({target}) => {
        console.log(target.value);
        this.setState({loginInput: target.value});
    };
    handleInputPassword = ({target}) => {
        console.log(target.value);
        this.setState({passwordInput: target.value});
    };
    handleLogin = async () => {
        console.log(`pending login ${this.state.loginInput} / ${this.state.passwordInput}...`);
        await axios.post(`/api/authenticate`, {
            login: this.state.loginInput,
            password: this.state.passwordInput,
        })
        .then(response  => response.data)
        .then(result => {
            if (result.length > 0){
                console.log(`logged as ${result[0].name}`);
                this.props.handleLoggedIn(true, result[0].name);
                this.props.history.push('/');
                window.scrollTo(0, 0);
            } else {
                console.log('nie git');
            }
        })
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        //nextProps.handleGoLogin();
    };
    componentDidMount(){
        this.props.handleGoLogin(true);    
    };
    componentWillUnmount(){
        this.props.handleGoLogin(false);
    };
    render(){

        const {classes} = this.props;
        
        return (
        <div>
            <div className={classes.introduction}>
            <Typography component="h2" variant="h1" gutterBottom>
                This is <b>bikeysh</b> - compact application which <b><i>scores</i></b> offers from bike parts market
                and shows <b><i>the best</i></b> ones for specific category. 
                <br/>
                <br/>
            </Typography>
            <Typography component="h4" gutterBottom>
                Build with <span>React.js</span>&nbsp;<i className="fab fa-react" style={{color: '#61DAFB', fontSize: '1rem'}}/>
                &nbsp;|&nbsp;Node.js&nbsp;
                <i class="fab fa-node-js" style={{color: "#90C53F", fontSize: '1rem'}}/>
                &nbsp;|&nbsp;MongoDB&nbsp;and&nbsp;                
                Material-UI
                {/* <FavoriteBorder className={classes.heart}/>   */}
                <br/>
            
            </Typography>
            <MuiThemeProvider theme={themeLoginButton}>
                <Button size="small" onClick={() => {this.handleClickShowFeatures(true)}}>
                    Show Features
                </Button>
            </MuiThemeProvider>
            </div>
            <Paper className={classes.paper} elevation={10} square="true">
                <Grid container justify="center" alignContent="center">
                    <MuiThemeProvider theme={themeInput}>
                        <Grid item xs={12} className={classes.loginElement}>
                            <Typography component="h4" gutterBottom>Demo version v1.0</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.loginElement}>
                            <br/>
                        </Grid>
                        <Grid item xs={12} className={classes.loginElement}>
                            <FormControl>
                                <MuiThemeProvider theme={themeInput}>
                                <Input
                                    placeholder="username" defaultValue={this.state.login}
                                    disableUnderline={false}
                                    onChange={this.handleInputUsername}
                                    endAdornment={
                                    <InputAdornment position="end" className={classes.inputSearchBox}>
                                        <AccountCircle/>
                                    </InputAdornment>
                                    }
                                    onKeyUp={()=>{}}
                                />
                                </MuiThemeProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className={classes.loginElement}>
                            <FormControl>
                                <MuiThemeProvider theme={themeInput}>
                                <Input
                                    placeholder="password" defaultValue={this.state.password}
                                    disableUnderline={false}
                                    type='password'
                                    onChange={this.handleInputPassword}
                                    endAdornment={
                                    <InputAdornment position="end" className={classes.inputSearchBox}>
                                        <VpnKey/>
                                    </InputAdornment>
                                    }
                                    onKeyUp={()=>{}}
                                />
                                </MuiThemeProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}><br/></Grid>
                        <Grid item xs={12}>
                            <MuiThemeProvider theme={themeLoginButton}>
                                <Button 
                                    fullWidth="true" 
                                    autoCapitalize="false" 
                                    style={{outline: "none",}}
                                    onClick={this.handleLogin}
                                >Login</Button>
                            </MuiThemeProvider>
                        </Grid>
                    </MuiThemeProvider>
                </Grid>
                                    
            </Paper>
            <ImageLightBox 
                open={this.state.fullscreenOpen}
                close={this.handleClickShowFeatures}
                picArray={this.state.picArray}
                />
            <div className={classes.loginBackground} />
        </div>
        )   
    }
}


export default withStyles(styles)(withRouter(LoginPage));