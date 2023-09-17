import { View } from 'react-native'
import { s2 } from './ListRdv.style'

export function ListRdv () {
    return (
        <>
        <View>
        <View style={ s2.container }>
        <h1 style={ s2.h1 }>Exemple de titre</h1>
        <View style={ s2.tableContainer }>
          <table style={ s2.table }>
            <tbody style={ s2.tbody }>
              <tr style={s2.tr} >
                <td style={s2.td}>Column 1 </td>
                <td style={s2.td}>Column 2 </td>
                <td style={s2.td}>Column 3 </td>
                <td style={s2.td}>Column 4 </td>
              </tr>
              <tr style={s2.tr}>
              <td style={s2.td}>Row 2</td>
                <td style={s2.td}>Description</td>
                <td style={s2.td}>Description</td>
                <td style={s2.td}>Description</td>
              </tr>
              <tr style={s2.tr}>
                <td style={s2.td}>Row 2</td>
                <td style={s2.td}>Description</td>
                <td style={s2.td}>Description</td>
                <td style={s2.td}>Description</td>
              </tr>
              <tr style={s2.tr}>
              <td style={s2.td}>Row 2</td>
                <td style={s2.td}>Description</td>
                <td style={s2.td}>Description</td>
                <td style={s2.td}>Description</td>
              </tr>
              <tr style={s2.tr}>
              <td style={s2.td}>Row 2</td>
                <td style={s2.td}>Description</td>
                <td style={s2.td}>Description</td>
                <td style={s2.td}>Description</td>
              </tr>
            </tbody>
          </table>
        </View>
        </View>
        
        </View>
        </>
    )
}
