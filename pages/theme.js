import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ba68c8',
    },
    secondary: {
      main: '#4fc3f7',
    },
  //   typography://using this we can change all font family like etc
  //   {
  //     fontFamily:"Comic  Sans MS",
  //     body2:{
  //       fontFamily:"Times New Roman"
  //     }
  //   },
  //   shape://border size like 90 degree angle for company
  //   {
  //   borderRadius:30
  //   },
  //   spacing:9,//space between the component like that from nav bar
  //   overrides:{//overrides compennt class prpos by only it sel for througth app
  //   MuiButton:{
  //     root:{
  //     textTransfrom:'none',
  //     padding:'20px'
  //    },
  //    fullwidth:{
  //      maxWidth:'300px'
  //    }
  //   },
  //   props:
  //   {
  //     MuiCard:{
  //     elevation:12//shadow bihend the card componnent
  //     },
  //     MuiButton:{
  //       disableRipple:true,//in multi step form back need so we add this enable 
  //       color:"primary",  
  //       variant:"contained"      
  //     },
  //     MuiCheckbox:{
  //     disableRipple:true
  //     },
  //     MuiTextField:
  //     {    varient:'outlined',
  //          InputLabelProps:{//disable animation for company use 
  //            shrink:true,
  //          }
  //     }
  //  }
  // }
  },  
});
export default theme;