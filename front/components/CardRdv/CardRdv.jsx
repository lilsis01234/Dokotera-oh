import { s } from "./CardRdv.style"
import { Text, View, Image, TouchableOpacity } from "react-native-web"
import React, { Component } from "react"
import axios, { Axios } from "axios"
import { Alert } from "react-native"

class CardRdv extends Component {

  constructor() {
    super()
    this.state = {
      description:"",
      heureStart:"",
      date:""
    }
  }


  componentDidMount()  {



  }

   render() {
    const handleClick = () => {
      addRdv()
      Alert.alert("rendez-vous envoyé")
    }

    function addRdv() {
      const description = document.getElementById("description").value
      const date = document.getElementById("date").value
      const heureStart = document.getElementById("heure").value

      const dataRdv = {
        description: description,
        date: date,
        heureStart: heureStart
      }

      axios.post('http://localhost:3000/rendez/vous', dataRdv)
      .then(response => {
        alert(response.data)
      })
      .catch(error => {
        console.error(error)
      })
    }
  return (
<>

<View style={ s.container }>
  <View style={ s.container1 }>
            <h2 style={ s.h2 }>
              Prendre
              Rendez-vous
            </h2>
            <Text style={ s.text }>
              Prenez un rendez vous avec le medecin pour que vous vous diputer à
              propos de votre maladie&nbsp;
            </Text>
              <View style={ s.form }>

                  <label style={s.label}>Description du rendez-vous:</label>
                   <textarea style={s.area} name="description" id="description" cols="30" rows="30"></textarea>
  
                  <label style={s.label}>Date du render-vous:</label>
                  <input style={s.input} type="date" id="date" />
  
                  <label style={s.label}>Heures du rendez-vous:</label>
                  <input style={s.input} type="time" id="heure"/>
                </View>
                <TouchableOpacity onPressIn={handleClick}>
                    <View style={ s.button }>
                     <Text style={{ color:"white"}}>Envoyer</Text>
                  </View>
                </TouchableOpacity>
</View>
          </View>
 
</>
  )}
  }

  export default CardRdv