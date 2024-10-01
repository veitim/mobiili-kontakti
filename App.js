import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contactList, setContactList] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContactList(data);
        //console.log(data[0]);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contactList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
          <View>
            <Text>{item.name} {item.phoneNumbers[0].number}</Text>
          </View>
        }
      />
      <Button title="Get Contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
