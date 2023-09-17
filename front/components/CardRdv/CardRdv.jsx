import { s } from "./CardRdv.style"
import { Text, View, Image, Button } from "react-native-web"
import React, { Component } from "react"
import axios, { Axios } from "axios"

class CardRdv extends Component {

  constructor() {
    super()
    this.state = {
      patient:"",
      docteur:"",
      description:"",
      heureStart:"",
      date:""
    }
  }


  componentDidMount()  {
    axios.get("http://localhost:3000/rendez/vous")
    .then(response => {
           this.setState({
            patient: response.data,
            docteur: response.data,
           })
    })
    .catch(error => {
      console.error('Erreur de requête :', error)
    })
    axios.post("http://localhost:3000/rendez/vous")
    .then(response => {
      this.setState({
        description: response.data,
        heureStart: response.data,
        date: response.data
      })
    })
    .catch(error => {
      console.error('Erreur tolotra:', error)
    })
  }

   render() {
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
                  <label style={ s.label }>Nom:</label>
                  <input type="text" placeholder="Entrez votre Nom ici" id="name" style={ s.input }/>
                </View>
                <View style={ s.form1 }>
                  <label style={ s.label }>Prénom:</label>
                  <input type="text" placeholder="Entrez votre Prénom ici" style={ s.input }/>
                </View>
                <View style={ s.form1 }>
                  <label style={ s.label }>Date:</label>
                  <input type="text" placeholder="Entrez la date du rendez-vous ici" style={ s.input }/>
                </View>
                <View style={ s.form1 }>
                  <label style={ s.label }>Heures:</label>
                  <input type="text" placeholder="Entrez l'Heure du rendez-vous ici"name="Heure de rendz-vous" style={ s.input }/>
                </View>
                <View style={ s.form1 }>
                  <label style={ s.label }>Telephone:</label>
                  <input
                    type="tel"
                    pattern="\+?\d{0,3}[\s\(\-]?([0-9]{2,3})[\s\)\-]?([\s\-]?)([0-9]{3})[\s\-]?([0-9]{2})[\s\-]?([0-9]{2})"
                    placeholder="Entrez votre numero de téléphone ici"
                    id="phone-fbbe"
                    name="Telephone"
                    style={ s.input }
                  />
                </View>
                <Button
                    style={ s.button }
                    title="Envoyer"
                    color="#00bfa6"
                 />
                      
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