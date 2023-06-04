import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    // Simulated contact data
    const sampleContacts = [
      {id: 1, name: 'Abshiek Sukhla', phoneNumber: '9023455691'},
      {id: 2, name: 'Arjuna', phoneNumber: '9876543210'},
      {id: 3, name: 'John Wick', phoneNumber: '8979563423'},
      {id: 4, name: 'Prithvi Singh Raikwal', phoneNumber: '7589903445'},
      {id: 5, name: 'Pankaj Singh Raikwal', phoneNumber: '9345231278'},
      {id: 6, name: 'Shraddha Singh', phoneNumber: '8156432958'},
      {id: 7, name: 'Chandni Raikwal', phoneNumber: '8529186838'},
      {id: 8, name: 'Chandni Raikwal', phoneNumber: '8999021234'},
      {id: 9, name: 'Bhavesh Joshi', phoneNumber: '9620394857'},
      {id: 10, name: 'Sahil Parag', phoneNumber: '8365486790'},
      {id: 11, name: 'Chnmay Joshi', phoneNumber: '8537261829'},
      {id: 12, name: 'Priyansh Fartyal', phoneNumber: '7546382910'},
      {id: 13, name: 'Kartik aryan', phoneNumber: '7554321999'},
      {id: 14, name: 'Kaira adwani', phoneNumber: '8555539294'},
      {id: 15, name: 'Shruti Hassan', phoneNumber: '9012148573'},
      {id: 16, name: 'Kreeti Sannon', phoneNumber: '9638294781'},
    ];

    setContacts(sampleContacts);
    setFilteredContacts(sampleContacts);
  };

  const filterContacts = text => {
    setSearchTerm(text);
    const filtered = contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(text.toLowerCase()) ||
        contact.phoneNumber.includes(text)
      );
    });
    setFilteredContacts(filtered);
  };

  const renderContactItem = ({item}) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <View style={styles.contactItem}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleContactPress = contact => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts..."
        onChangeText={filterContacts}
        value={searchTerm}
      />
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id.toString()}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedContact?.name}</Text>
            <Text>{selectedContact?.phoneNumber}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#000538',
    color: '#00031c',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#00031c',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    color: '#000538',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    margin: 1,
    padding: 3,
  },
  closeButton: {
    margin: 1,
    padding: 3,
    color: '#fcfdff',
    borderRadius: 4,
    margin: 1,

    padding: 2,
  },
});
