import React from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';

function AddFileComponent() {
  return (
    <View style={styles.container}>
      <Modal transparent={true} animationType="slide">
        <View style={styles.formContainer}>
          <Text>hello</Text>
        </View>
      </Modal>
    </View>
  );
}

export default AddFileComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
