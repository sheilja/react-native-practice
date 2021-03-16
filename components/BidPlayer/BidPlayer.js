
import React from "react"
import { StyleSheet, View, Text } from "react-native"

function Unsold() {
  return (
    <View style={styles.view}>
      <Text>Bid Player!</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Unsold
