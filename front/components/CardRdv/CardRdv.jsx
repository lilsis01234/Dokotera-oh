import { s } from "./CardRdv.style"
import { Text, View, Image } from "react-native-web"

export default function CardRdv () {
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
                  <label style={ s.label }>Nom</label>
                  <input type="text" placeholder="Nom" name="name" style={ s.input }/>
                </View>
                <View style={ s.form1 }>
                  <label style={ s.label }>Prenom</label>
                  <input type="text" placeholder="Jours du rendez-vous" style={ s.input }/>
                </View>
                <View style={ s.form1 }>
                  <label style={ s.label }>Email</label>
                  <input type="text" placeholder="Heure du rendez-vous"name="Heure de rendz-vous" style={ s.input }/>
                </View>
                <View style={ s.form1 }>
                  <label style={ s.label }>Phone</label>
                  <input
                    type="tel"
                    pattern="\+?\d{0,3}[\s\(\-]?([0-9]{2,3})[\s\)\-]?([\s\-]?)([0-9]{3})[\s\-]?([0-9]{2})[\s\-]?([0-9]{2})"
                    placeholder="telephone"
                    id="phone-fbbe"
                    name="phone"
                    style={ s.input }
                  />
                </View>
                <View style={ s.button }>
                  <input
                    type="submit"
                    defaultValue="submit"
                    style={ s.inputButton }
                  />
                </View>
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
                <colgroup>
                  <col style= {{width:"20.5%"}} />
                  <col style= {{width:"19.5%"}} />
                  <col style= {{width:"20.3%"}} />
                  <col style= {{width:"19.9%"}} />
                  <col style= {{width:"19.800000000000004%"}} />
                </colgroup>
                <tbody style={ s.tableBody }>
                  <tr style={{ height: 53 }}>
                    <td style={ s.td }>Lundi</td>
                    <td style={ s.td }>Mardi</td>
                    <td style={ s.td }>Mercredi</td>
                    <td style={ s.td }>Jeudi</td>
                    <td style={ s.td }>Vendredi</td>
                  </tr>
                  <tr style={{ height: 59 }}>
                    <td style={ s.td }>8h à 10h</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                  </tr>
                  <tr style={{ height: 59 }}>
                    <td style={ s.td }>10h à 12h</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                  </tr>
                  <tr style={{ height: 59 }}>
                    <td style={ s.td  }>12h à 14h</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                  </tr>
                  <tr style={{ height: 59 }}>
                    <td style={ s.td  }>14h à 16h</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                  </tr>
                  <tr style={{ height: 54 }}>
                    <td style={ s.td  }>16h à 18h</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                    <td style={ s.td  }>Disponible</td>
                  </tr>
                </tbody>
              </table>
            </View>
            </View>
          </View>
 
</>
  )}

