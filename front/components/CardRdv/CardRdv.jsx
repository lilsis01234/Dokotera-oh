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
              <View style={ s.form1 }>
                  <label style={ s.label }>Description du rendez-vous:</label>
                   <textarea name="description" id="description" cols="30" rows="30" style={ s.input }></textarea>
                </View>
                <View style={ s.form1 }>
                  <label style={ s.label }>Date du render-vous:</label>
                  <input type="date" id="date" placeholder="Entrez la date du rendez-vous ici" style={ s.input }/>
                </View>
                <View style={ s.form1 }>
                  <label style={ s.label }>Heures du rendez-vous:</label>
                  <input type="time" id="heure"  placeholder="Entrez l'Heure du rendez-vous ici"name="Heure de rendz-vous" style={ s.input }/>
                </View>
                <TouchableOpacity onPressIn={handleClick}>
                  <View style={ s.button }>
                     <Text style={{ color:"white"}}>Envoyer</Text>
                  </View>
                </TouchableOpacity>
                </View>
</View>
               
               <View style={ s.container2 }>
                <Image style={ s.image } source={require('./images/fd.jpg')} />
            <h4 style={ s.h4 }>Dr James</h4>
            <h5 style={ s.h5 }>Dermathologue</h5>
            <Text style={ s.text2 }>
              Si vous voulez faire un rendez-vous avec Dr James, il est
              disponible dans cette heure:
            </Text>
            <View style={ s.containerTable }>
              <table style={ s.table }>
                <tbody style={ s.tableBody }>
                  <tr style={{ height: 1 }}>
                    <td style={ s.td }>RDV</td>
                    <td style={ s.td }>Lun</td>
                    <td style={ s.td }>Mar</td>
                    <td style={ s.td }>Mer</td>
                    <td style={ s.td }>Jeu</td>
                    <td style={ s.td }>Ven</td>
                  </tr>
                  <tr style={{ height: 59 }}>
                    <td style={ s.td }>8h à 10h</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                  </tr>
                  <tr style={{ height: 59 }}>
                    <td style={ s.td }>10h à 12h</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                  </tr>
                  <tr style={{ height: 59 }}>
                    <td style={ s.td  }>12h à 14h</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                  </tr>
                  <tr style={{ height: 59 }}>
                    <td style={ s.td  }>14h à 16h</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                  </tr>
                  <tr style={{ height: 54 }}>
                    <td style={ s.td  }>16h à 18h</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                    <td style={ s.td  }>Dispo</td>
                  </tr>
                </tbody>
              </table>
            </View>
            </View>
          </View>
 
</>
  )}
  }

  export default CardRdv