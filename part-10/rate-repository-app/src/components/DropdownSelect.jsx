import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const styles = StyleSheet.create({
  container: {
    height: 70,
    padding: 10,
    zIndex: 1000,
  },
});

const DropdownSelect = ({ options, selectedValue, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={onValueChange}
        setItems={setItems}
      />
    </View>
  );
};

export default DropdownSelect;
