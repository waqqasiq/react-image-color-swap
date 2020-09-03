import React from 'react'
import { ColorExtractor } from 'react-color-extractor'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ImageUploader from 'react-images-upload';
import withStyles from "@material-ui/core/styles/withStyles";
import Axios from 'axios';
import FileDownload from 'js-file-download';
import LoadingOverlay from "react-loading-overlay";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
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
    contentMain: {

    },
    imgStyle: {
        width: 630,
        height: 450,
        borderRadius: 5,
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%',
            height: 300
        },
    },
    input: {
        color: '#fff'
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
        width: 75,
        height: 75,
        margin: 10,
        borderRadius: 10,
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            width: 47,
            height: 47,
            margin: 5,
        },
    },
    colorText: {
        marginTop: 80,
        ['@media (max-width: 600px)']: { // eslint-disable-line no-useless-computed-key
            marginTop: 50,
            fontSize: '11px'
        },

    }
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


class App extends React.Component {
  constructor(props){
    super(props);
    let data = []
    this.state = {
        colors: [],
        url: 'https://i.imgur.com/OCyjHNF.jpg',
        textInput: '',
        file: 'https://i.imgur.com/OCyjHNF.jpg',
        targetcolor: '',
        replacecolor: '',
        filetosend: null,
        loaderActive: false,
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

    handleSubmit = () => {
      console.log('handleSubmit ');
      console.log('this.state.filetosend ', this.state.filetosend);
      console.log('this.state.targetcolor ', this.state.targetcolor);
      console.log('this.state.replacecolor ', this.state.replacecolor);
      let tgcolor = this.state.targetcolor;
      let rpcolor = this.state.replacecolor;

      if( tgcolor && rpcolor && tgcolor.length === 6 && rpcolor.length === 6 && this.state.filetosend !== null) {

          this.setState({
              loaderActive: true
          })
          tgcolor = "#"+tgcolor;
          rpcolor = "#"+rpcolor;

          var formData = new FormData();
          formData.append("img_upload", this.state.filetosend);
          formData.append('targetColor', tgcolor);
          formData.append('replaceColor', rpcolor);

          let baseUrl = 'https://swap-imgcolor-node.herokuapp.com/';

          Axios.post(baseUrl + 'replace-color', formData,
              {headers: {'Content-Type': 'multipart/form-data'}, responseType: 'blob'}
          ).then((res) => {
              console.log('res data ', res.data);

              this.setState({
                  file: URL.createObjectURL(res.data),
                  loaderActive: false
              });
              // let url = window.URL.createObjectURL(res.data); //blob
              // let a = document.createElement('a');
              // a.href = url;
              // a.download = 'image-output.jpg';
              // a.click();
              //FileDownload(res.data, 'output.jpg'); can also use this instead of a tag stuff
          }).catch((err) => {
              console.log(err);
          });
      }
      else {
          alert('Wrong Input Provided');
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


  render() {
    const {classes} = this.props;

    return (

        <div className={classes.root}>

            <Grid container spacing={2} className={classes.parentGrid}>


                <Grid item xs={12} sm={3} className={classes.leftBar}>
                    <Paper className={classes.leftPaper} style={{backgroundColor: '#000', color: '#fff', paddingTop: '20px'}}><h1 className={classes.leftHeader}>SWAP COLORS</h1></Paper>
                    <LoadingOverlay
                        active={this.state.loaderActive}
                        spinner
                        // text=''
                    >
                        <Paper className={classes.leftPaper}>
                            <Grid xs={12} >
                                <TextField name={'targetcolor'} onChange={this.handleText} className={classes.textField} InputProps={{className: classes.input}}  placeholder={'Target Color Code'}/>
                            </Grid>
                        </Paper>
                    </LoadingOverlay>
                        <Paper className={classes.leftPaper}>
                            <Grid xs={12}>
                                <TextField name={'replacecolor'} onChange={this.handleText} className={classes.textField}  InputProps={{ className: classes.input}}  placeholder={'Replace Color Code'}/>
                            </Grid>
                        </Paper>
                        <Paper className={classes.leftPaper}>
                            <Grid xs={12} sm={12} >
                                <Button variant={'contained'} onClick={this.handleSubmit}>SUBMIT</Button>
                            </Grid>
                        </Paper>

                </Grid>
                <Grid item xs={12} sm={9} className={classes.contentMain}>
                    <Paper elevation={10} className={classes.paper}>
                           <ColorExtractor  getColors={this.getColors}>
                             <img
                                src={this.state.file}
                                className={classes.imgStyle}
                            />
                          </ColorExtractor>
                            <div style={{marginTop: 10}}>

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
                                  height: 120
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
                                      ><p style={{textAlign: 'center', color: color}} className={classes.colorText}>{color}</p>

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