import { StyleSheet } from "react-native"



export const s = StyleSheet.create ({
  container: {
      backgroundColor: "#48cae4",
      borderRadius: "40px"
      
  },
  container1: { backgroundColor: "#48cae4", minHeight: "816px",
    alignItems:"center", borderRadius:"40px"
},
  text: { 
        textAlign:"center",
        color:"white",
        fontFamily:"Open Sans",
        fontSize:"20px",
        margin:"10px"
     },
  h2: {
      fontSize: "35px",
      textAlign:"center",
      fontFamily:"Open Sans",
      color:"white",
    },
  form: { 
    flex:1,
    marginTop:"50px"
   },
   area:{
    height:"90px",
    fontSize:"20px",
    alignItems:"center",
    borderRadius:"10px",
    marginTop:"15px",
    padding:"10px"
   },
    label: { 
      textAlign:"center",
      fontSize:"20px",
      color:"white",
      marginTop:"30px"
     },
    input: { 
      borderRadius: "20px",
      fontSize:"20px",
      marginTop:"10px",
      padding:"30px"
     },
    // form1: { 
    //   flex:1,
    //   alignItems:"center"
    //  },

    button: {
        margin:"30px",
        paddingVertical: "20px",
        paddingHorizontal: "40px",
        borderRadius:"20px",
        backgroundColor: "#00bfa6"
    },

    container2: { 
        backgroundColor: "white",
        flex:1,
        alignItems:"center"
     },
    image: {
      width: "100px",
      height: "100px",
      backgroundImage: 'url("images/fd.jpg")',
      backgroundPosition: "center",
      marginTop: "20px",
      marginRight: "auto",
      marginBottom: 0,
      marginLeft: "22px",
      borderRadius: "50%"
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "1px",
      fontSize: "1.875rem",
      marginTop: "-75px",
      marginRight: "63px",
      marginBottom: 0,
      marginLeft: "100px",
      fontFamily:"Open Sans"
    },
    h5: {
      letterSpacing: "1px",
      fontSize: "1.125rem",
      fontWeight: 500,
      marginTop: "10px",
      marginRight: "320px",
      marginBottom: 0,
      marginLeft: "350px"
    },
    text2: {
      fontSize: "1.375rem",
      textAlign:"center",
      margin:"30px",
      marginTop:"80px"
    },
    containerTable: { 
      alignItems:"center", 
      backgroundColor:"#00bfa6",
      borderBlockColor:"white",
      borderRadius:"40px",
      marginTop:"auto"
    },
    table: { 
      overlayColor:"white",
      marginTop:"10px",
      height:"20px",
      margin:"30px",
      alignItems:"center",
      borderColor:"white"
    },
    tableBody: {
      borderBlockColor:"white",
      backgroundColor:"blue",
      fontSize:"100px",
      height:90,
      borderColor:"white",
      borderRadius:"10px"
    },
    td: {
      textAlign: "center",
      height: -10,
      fontSize:"18px",
      borderBlockColor:"white",
      fontFamily:"Open sans",
      color:"white",
      borderBlockEndColor:"white"
    }
  })
  