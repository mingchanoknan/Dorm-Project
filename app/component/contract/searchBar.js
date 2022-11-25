import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={14}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search Room ID"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo name="cross" size={16} color="gray" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View >
          <Button style={{fontSize: '12px'}}
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
                setClicked(false);
                setSearchPhrase("");
                
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",

  },
  searchBar__unclicked: {
    padding: 7,
    margin: 2,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#dee9fa",
    borderWidth: 0.55,
   borderRadius: 15,
    alignItems: "center",
    fontSize: 12
  },
  searchBar__clicked: {
    padding: 8,
    margin: 2,
    flexDirection: "row",
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: 12
  },
  input: {
    fontSize: 13,
    marginLeft: 10,
    width: "90%",
  },
});