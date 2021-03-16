import React, { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Unsold from "./components/Unsold/Unsold"
import BidPlayer from "./components/BidPlayer/BidPlayer"

function Teams() {
  return (
    <View style={styles.view}>
      <Text>Teams1!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

export default function App() {
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])

  const addPlayers = (text) => {
    const oldElements = players
    const temp = text.split(",")
    setPlayers(oldElements.concat(temp))
  }

  const addTeams = (text) => {
    const oldElements = teams
    const temp = text.split(",")
    setTeams(oldElements.concat(temp))
  }

  const editPlayerName = (oldName, newName) => {
    if (newName) {
      const index = players.findIndex((el) => el === oldName)
      if (index !== -1) {
        const temp = [...players]
        temp.splice(index, 1)
        temp.splice(index, 0, newName)

        setPlayers(temp)
      }
    }
  }

  const deletePlayer = (player) => {
    setPlayers((pre) => {
      return pre.filter((item) => item !== player)
    })
  }

  const deleteTeam = (team) => {
    setTeams((pre) => {
      return pre.filter((item) => item !== team)
    })
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Unsold"
          children={() => (
            <Unsold
              players={players}
              addPlayers={addPlayers}
              deletePlayer={deletePlayer}
              editPlayerName={editPlayerName}
              addTeams={addTeams}
              deleteTeam={deleteTeam}
              teams={teams}
            />
          )}
        />
        <Tab.Screen name="Bid Player" component={BidPlayer} />
        <Tab.Screen name="Teams" component={Teams} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
