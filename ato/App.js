import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import * as SMS from "expo-sms";
import * as Print from "expo-print";

const App = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [recipient, setRecipient] = useState([
    "0347540613",
    "0348171864",
    "0346623117",
  ]);

  useEffect(() => {
    async function checkValidity() {
      const isSms = await SMS.isAvailableAsync();
      setIsAvailable(isSms);
    }
    checkValidity();
  }, []);

  async function createPDF() {
    const htmlContent = `<html><body><h1>Your PDF Content</h1></body></html>`;
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    return uri;
  }

  const sendSms = async () => {
    // const { result } = await SMS.sendSMSAsync(recipient, "Hello Mr :)");
    const pdfUri = await createPDF();
    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
      // Compose the SMS message
      const message = {
        recipient,
        message: "Here's the PDF you requested!",
        attachments: [
          {
            uri: pdfUri,
            mimeType: "application/pdf",
            filename: "example.pdf",
          },
        ],
      };

      // Send the SMS
      const { result } = await SMS.sendSMSAsync(message);
    } else {
      // Handle the case where SMS is not available
      console.log("SMS is not available on this device.");
    }

    console.log(result);
  };

  // async function sendSms() {
  //   const pdfUri = await createPDF();

  //   // Check if SMS is available
  //   const isAvailable = await SMS.isAvailableAsync();

  //   if (isAvailable) {
  //     // Compose the SMS message
  //     const message = {
  //       recipient,
  //       message: "Here's the PDF you requested!",
  //       attachments: [
  //         {
  //           uri: pdfUri,
  //           mimeType: "application/pdf",
  //           filename: "example.pdf",
  //         },
  //       ],
  //     };

  //     // Send the SMS
  //     await SMS.sendSMSAsync(message);
  //   } else {
  //     // Handle the case where SMS is not available
  //     console.log("SMS is not available on this device.");
  //   }
  // }

  return (
    <View style={s.container}>
      {isAvailable ? (
        <TouchableOpacity onPress={sendSms}>
          <Text>Send SMS</Text>
        </TouchableOpacity>
      ) : (
        <Text style={(s.text, s.button)}>SMS not available</Text>
      )}
      <Text style={s.text}>Hello world</Text>
    </View>
  );
};

export default App;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 20,
    paddingHorizontal: 40,
    color: "white",
    borderRadius: 20,
  },
});
