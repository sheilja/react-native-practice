import React, {
  useState,
} from "react"
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Alert,
  Pressable,
  TextInput,
  FlatList,
} from "react-native"
import Icon from "react-native-vector-icons/dist/FontAwesome"

function Unsold(props) {
  const [playersName, setPlayersName] = useState(null)
  const [teamsName, setTeamsName] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editDataForPlayers, setEditDataForPlayers] = useState("")
  const [playerNewName, setPlayerNewName] = useState("")
  
  const onChangePlayersName = (text) => {
    setPlayersName(text)
  }
  const onChangeTeamsName = (text) => {
    setTeamsName(text)
  }
  const onChangePlayerNewName = (text) => {
    setPlayerNewName(text)
  }

  const Player = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={[styles.deleteButton]}
          onPress={() => {
            props.deletePlayer(title)
          }}
        >
          <Icon name="remove" size={20} color="firebric" />
        </Pressable>
        <Pressable
          style={[styles.deleteButton]}
          onPress={() => {
            setEditModalVisible(true)
            setEditDataForPlayers(title)
            setPlayerNewName(title)
          }}
        >
          <Icon name="edit" size={20} color="firebric" />
        </Pressable>
      </View>
    </View>
  )

  const Team = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        style={[styles.deleteButton]}
        onPress={() => {
          props.deleteTeam(title)
        }}
      >
        <Icon name="remove" size={20} color="firebric" />
      </Pressable>
    </View>
  )

  const renderPlayer = ({ item }) => <Player title={item} />
  const renderTeam = ({ item }) => <Team title={item} />

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
          setEditModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.editModalView}>
            <TextInput
              placeholder="Enter Players Name"
              style={styles.input}
              onChangeText={onChangePlayerNewName}
              value={playerNewName}
            />
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.editButton, styles.buttonClose]}
                onPress={() => {
                  setEditModalVisible(false)
                  props.editPlayerName(editDataForPlayers, playerNewName)
                }}
              >
                <Text style={styles.textStyle}>Edit</Text>
              </Pressable>
              <Pressable
                style={[styles.editButton, styles.buttonClose]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
          setModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Enter Players Name"
                style={styles.input}
                onChangeText={onChangePlayersName}
              />
              <Pressable
                style={[styles.editButton, styles.buttonClose]}
                onPress={() => {
                  props.addPlayers(playersName)
                }}
              >
                <Text style={styles.textStyle}>Create Player</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Enter Teams Name"
                style={styles.input}
                onChangeText={onChangeTeamsName}
              />
              <Pressable
                style={[styles.editButton, styles.buttonClose]}
                onPress={() => {
                  props.addTeams(teamsName)
                }}
              >
                <Text style={styles.textStyle}>Create Teams</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.deleteButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>ADD</Text>
      </Pressable>
      <View style={styles.heading}>
        <Text style={styles.text}>Players</Text>
      </View>

      <FlatList
        data={props.players}
        renderItem={renderPlayer}
        keyExtractor={(player) => player}
      />
      <View style={styles.heading}>
        <Text style={styles.text}>Teams</Text>
      </View>

      <FlatList
        data={props.teams}
        renderItem={renderTeam}
        keyExtractor={(team) => team}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    height: "70%",
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    marginLeft: "30%",
    marginRight: "30%",
  },
  deleteButton: {
    padding: 10,
    marginRight: "3%",
  },
  editButton: {
    padding: 10,
    margin: "2%",
  },
  heading: {
    margin: 10,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  buttons: {
    flexDirection: "row",
  },
  item: {
    backgroundColor: "lightblue",
    //  padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
  },
})

export default Unsold
