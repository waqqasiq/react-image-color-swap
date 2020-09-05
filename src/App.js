import React from 'react'
import { ColorExtractor } from 'react-color-extractor'
//import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ImageUploader from 'react-images-upload';
import withStyles from "@material-ui/core/styles/withStyles";
import Axios from 'axios';
//import FileDownload from 'js-file-download';
import LoadingOverlay from "react-loading-overlay";
import { ChromePicker } from 'react-color';
import ColorizeIcon from '@material-ui/icons/Colorize';
//import { CSSTransition, TransitionGroup} from "react-transition-group";
import SampleImage from './Puppies.jpg';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoIcon from '@material-ui/icons/Info';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
        paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#000',
        height: '100vh',
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            height: 'auto'
        },
    },
    leftPaper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#000',
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            //display: 'none'
        },

    },
    leftBar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#000',
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            //display: 'none'
        },
    },
    parentGrid: {
        height: '100vh',
    },
    // imageDiv: {
    //     height: '65vh'
    // },
    // imageUploaderDiv: {
    //   height: '15vh'
    // },
    // colorParentDiv: {
    //     height: '15vh'
    // },
    contentMain: {

    },
    imgStyle: {
        width: '65%',
        height: '60vh',
        borderRadius: 5,
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%',
            height: 'auto'
        },
    },
    input: {
        color: '#fff',
    },
    textField: {
        //borderColor: '#fff'
        border: '1px solid #C0C0C0',
        borderRadius: '5px',
        padding: '10px',
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            width: '40%'
        },
    },
    leftHeader: {
        fontSize: '36px',
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            fontSize: '30px'
        },
    },
    colorBoxes: {
        width: '10vh',
        height: '10vh',
        margin: 10,
        borderRadius: 10,
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            width: 47,
            height: 47,
            margin: 5,
        },
    },
    colorText: {
        marginTop: '11vh',
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            marginTop: 50,
            fontSize: '11px'
        },

    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(2)
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
    // rightPaper: {
    //     padding: theme.spacing(2),
    //     textAlign: 'center',
    //     color: '#000',
    //     ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
    //         display: 'block'
    //     },
    //
    // },
    // rightBar: {
    //     backgroundColor: '#000',
    //     display: 'none',
    //     ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
    //         display: 'block'
    //     },
    // },

});

const notify = (message) => {
    console.log('message ', message);
    console.log('notify');
    toast(message, {autoClose: 2000, transition: Zoom, position: 'top-center', type:'error'})
};
const notifysuccess = (message) => {
    toast(message, {autoClose: 2000, transition: Zoom, position: 'bottom-center', type:'default'});
}



class App extends React.Component {
  constructor(props){

    super(props);
    this.state = {
        colors: [],
        url: SampleImage,
        textInput: '',
        file: SampleImage, //https://i.imgur.com/OCyjHNF.jpg
        targetcolor: '',
        replacecolor: '',
        filetosend: null,
        loaderActive: false,
        defaultReplaceColor: "#fff",
        showReplacePicker: false,
        defaultTargetColor: "#fff",
        showTargetPicker: false,
        deltae: '',
        open: false
    }
  }


    onDrop = (pictures) => {
      // console.log('picture ', picture[0]);
        this.setState({
            file: URL.createObjectURL(pictures[pictures.length-1]),
            filetosend: pictures[pictures.length-1]
        });
    }

  // handleUrl = (e) => {
  //   console.log(' e ', e );
  //   this.setState({
  //     url: e,
  //     colors: this.state.colors
  //   });
  //   }
  //
  handleText = (e) => {
    console.log('e target value ', e.target.value);
    console.log('e target name', e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
    handleChange = (color) => {
        console.log(color); // color is rgb(a) string
        this.setState({ color : color });
    }

    handleSubmit = () => {
      console.log('handleSubmit ');
      console.log('this.state.filetosend ', this.state.filetosend);
      console.log('this.state.targetcolor ', this.state.targetcolor);
      console.log('this.state.replacecolor ', this.state.replacecolor);
      console.log('this.state.deltae ', this.state.deltae);
      let tgcolor = this.state.targetcolor;
      let rpcolor = this.state.replacecolor;
      let deltae = this.state.deltae;

      if( deltae && tgcolor && rpcolor && tgcolor.length === 6 && rpcolor.length === 6 && this.state.filetosend !== null) {

          this.setState({
              loaderActive: true
          })
          tgcolor = "#"+tgcolor;
          rpcolor = "#"+rpcolor;

          var formData = new FormData();
          formData.append("img_upload", this.state.filetosend);
          formData.append('targetColor', tgcolor);
          formData.append('replaceColor', rpcolor);
          formData.append('deltaE', deltae);


          let baseUrl = 'https://swap-imgcolor-node.herokuapp.com/';
          //let baseUrl = 'http://localhost:3001/';

          Axios.post(baseUrl + 'replace-color', formData,
              {headers: {'Content-Type': 'multipart/form-data'}, responseType: 'blob'}
          ).then((res) => {
              console.log('res data ', res.data);

              this.setState({
                  file: URL.createObjectURL(res.data),
                  loaderActive: false
              });
              notifysuccess('Image has been updated')
              // let url = window.URL.createObjectURL(res.data); //blob
              // let a = document.createElement('a');
              // a.href = url;
              // a.download = 'image-output.jpg';
              // a.click();
              //FileDownload(res.data, 'output.jpg'); can also use this instead of a tag stuff
          }).catch((err) => {
              console.log(err);
              this.setState({
                  loaderActive: false
              });
              //alert('Sorry, failed to perform action');
              notify('Sorry, failed to perform action');
          });
      }
      else {
          //alert('Wrong Input Provided');
          notify('Wrong Input Provided');
      }


        //


    }

  getColors = colors => {
    console.log('getColors colors ', colors);
    this.setState({colors: colors })
  }

    handleChange = (event) => {
        this.setState({
            file: window.URL.createObjectURL(event.target.files[0])
        })
    }

    handleReplaceColor = (e) => {
        console.log(e.hex);
        let temp = e.hex;
        let tempcolor = temp.substring(1);
        this.setState({
            defaultReplaceColor: e.hex,
            replacecolor: tempcolor
        })

    }
    handleTargetColor = (e) => {
        console.log(e.hex);
        let temp = e.hex;
        let tempcolor = temp.substring(1);
        this.setState({
            defaultReplaceColor: e.hex,
            targetcolor: tempcolor
        })

    }
     handleOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

  render() {
    const {classes} = this.props;

    return (

        <div className={classes.root}>

            <Grid container spacing={2} className={classes.parentGrid}>



                <Grid item xs={12} sm={3} className={classes.leftBar}>
                    <ToastContainer />
                    <Paper className={classes.leftPaper} style={{backgroundColor: '#000', color: '#fff', paddingTop: '20px'}}><h1 className={classes.leftHeader}>SWAP COLORS</h1></Paper>
                    <LoadingOverlay
                        active={this.state.loaderActive}
                        spinner
                        // text=''
                    >
                        <Paper className={classes.leftPaper}>


                            <Grid xs={12} >
                                <TextField name={'targetcolor'} value={this.state.targetcolor} onChange={this.handleText} className={classes.textField} InputProps={{className: classes.input}}  placeholder={'Target Color Code'}/>
                                <ColorizeIcon style={{marginTop: '5px', marginLeft: '5px'}} onClick={()=> this.setState({showTargetPicker: !this.state.showTargetPicker})} />
                            </Grid>

                            {this.state.showTargetPicker ? (<div style={{display: 'flex', justifyContent: 'center', marginTop: '15px', marginBottom: '10px'}}>
                                <ChromePicker color={this.state.defaultTargetColor} onChange={this.handleTargetColor}/>

                            </div>) : null}
                        </Paper>


                    </LoadingOverlay>
                        <Paper className={classes.leftPaper}>

                                <Grid xs={12} >
                                    <TextField name={'replacecolor'} value={this.state.replacecolor} onChange={this.handleText} className={classes.textField}  InputProps={{ className: classes.input}}  placeholder={'Replace Color Code'}/>
                                    <ColorizeIcon style={{marginTop: '5px', marginLeft: '5px'}} onClick={()=> this.setState({showReplacePicker: !this.state.showReplacePicker})} />
                                </Grid>

                            {this.state.showReplacePicker ? (<div style={{display: 'flex', justifyContent: 'center', marginTop: '15px', marginBottom: '5px' }}>
                                <ChromePicker  color={this.state.defaultReplaceColor} onChange={this.handleReplaceColor}/>

                            </div>) : null}
                        </Paper>

                    <Paper className={classes.leftPaper}>

                        <Grid xs={12} >
                            <TextField name={'deltae'} type={'number'} inputProps={{max: 100}} value={this.state.deltae} onChange={this.handleText} className={classes.textField}  InputProps={{ className: classes.input}}  placeholder={'Delta E value'}/>
                            <InfoIcon style={{marginTop: '5px', marginLeft: '5px'}} onClick={this.handleOpen}/>
                        </Grid>

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={this.state.open}
                                onClose={this.handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={this.state.open}>
                                <div className={classes.modalPaper}>
                                    <h2 id="transition-modal-title">Delta E Definition</h2>
                                    <p id="transition-modal-description">ΔE - (Delta E, dE) The measure of change in visual perception of two given colors. </p>
                                    <p id="transition-modal-description">On a typical scale, the Delta E value will range from 0 to 100.</p>
                                    <p id="transition-modal-description">In general, input value should be between 2 and 20.</p>

                                </div>
                            </Fade>
                        </Modal>

                    </Paper>


                        <Paper className={classes.leftPaper}>
                            <Grid xs={12} sm={12} >
                                <Button variant={'contained'} onClick={this.handleSubmit}>SUBMIT</Button>
                            </Grid>
                        </Paper>

                </Grid>
                <Grid item xs={12} sm={9} className={classes.contentMain}>
                    <Paper elevation={10} className={classes.paper}>
                        <div className={classes.imageDiv}>
                           <ColorExtractor  getColors={this.getColors}>
                             <img
                                src={this.state.file}
                                alt={'sample cat'}
                                className={classes.imgStyle}
                            />
                          </ColorExtractor>
                        </div>
                            <div style={{marginTop: 10}} className={classes.imageUploaderDiv}>


                                     <ImageUploader
                                    withIcon={false}
                                    buttonText='Choose Image'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.png', 'jpeg']}
                                    maxFileSize={5242880}
                                />
                             </div>

                        <div
                              style={{
                                marginTop: 5,
                                display: 'flex',
                                  flexDirection: 'row',
                                  flexWrap: 'nowrap',
                                justifyContent: 'center',
                                  overflowX: 'scroll',
                                  height: '18vh'
                              }}
                              className={classes.colorParentDiv}

                          >
                              {this.state.colors.map((color, id) =>
                                  (
                                      <div
                                          key={id}
                                          id="destination"
                                          style={{backgroundColor: color}}
                                          className={classes.colorBoxes}
                                      ><p style={{textAlign: 'center', color: color}} className={classes.colorText}>{color.substring(1)}</p>

                                      </div>
                                  )
                              )}
                          </div>

                    </Paper>
                </Grid>
                {/*<Grid item xs={12} sm={3} className={classes.rightBar}>*/}
                {/*    <Paper className={classes.rightPaper}>xs=3</Paper>*/}
                {/*</Grid>*/}
            </Grid>

        </div>

    )
        //
        // <div style={{ paddingTop: 30}}>
        //   <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        //   <ColorExtractor  getColors={this.getColors}>
        //     <img
        //         src={this.state.file}
        //         style={{ width: 560, height: 400, borderRadius: 5}}
        //     />
        //   </ColorExtractor>
        //
        //     <div style={{marginTop: 10}}>
        //       {/*<form className={classes.rootForm} noValidate autoComplete="off">*/}
        //       {/*  <TextField onChange={this.handleText} fullWidth={true} id="outlined-basic" label="Enter URL of image" variant="outlined" />*/}
        //       {/*</form>*/}
        //       {/*<div style={{marginTop: 15, textAlign: 'center'}}>*/}
        //       {/*   <Button variant="contained" color="primary"onClick={()=>this.handleUrl(this.state.textInput)}>OR</Button>*/}
        //       {/*</div>*/}
        //         <ImageUploader
        //             withIcon={false}
        //             buttonText='Choose Image'
        //             onChange={this.onDrop}
        //             imgExtension={['.jpg', '.png', 'jpeg']}
        //             maxFileSize={5242880}
        //         />
        //
        //     </div>
        //   </div>
        //
        //   <div
        //       style={{
        //         marginTop: 5,
        //         display: 'flex',
        //         justifyContent: 'center'
        //       }}
        //   >
        //       {this.state.colors.map((color, id) =>
        //           (
        //               <div
        //                   key={id}
        //                   id="destination"
        //                   style={{
        //                     backgroundColor: color,
        //                     width: 75,
        //                     height: 75,
        //                     margin: 10,
        //                     borderRadius: 10,
        //                   }}
        //               ><p style={{marginTop: 80, textAlign: 'center', color: color}}>{color}</p>
        //
        //               </div>
        //           )
        //       )}
        //   </div>
        // </div>
  //   )
   }
}
export default withStyles(useStyles)(App);;