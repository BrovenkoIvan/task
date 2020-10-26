import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppLoader} from '../components/AppLoader';

const AuthorsScreen = ({navigation}) => {
  const [listAuthors, setListAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAuthors, setFilteredAuthors] = useState();
  const [term, setTerm] = useState('');
  const {
    renderContainer,
    circleContainer,
    itemsContainer,
    textName,
    textEmail,
    iconContainer,
  } = styles;

  useEffect(() => {
    getAuthors();
  }, []);

  useEffect(() => {
    setFilteredAuthors(
      listAuthors.filter((author) => {
        var str = author.name + '' + author.email;
        return str.toLowerCase().includes(term.toLowerCase());
      }),
    );
  }, [term, listAuthors]);

  const getAuthors = async () => {
    setLoading(true);
    await fetch('https://jsonplaceholder.typicode.com/users')
      .then((responce) => responce.json())
      .then((json) => setListAuthors(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  if (loading) return <AppLoader />;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <SearchBar term={term} onTermChange={setTerm} />
      <FlatList
        data={filteredAuthors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          var str = item.name;
          var matches = str.match(/\b(\w)/g);
          var acronym = matches.join('');
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Posts', {
                  title: item.name,
                  userId: item.id,
                })
              }>
              <View style={renderContainer}>
                <View style={circleContainer}>
                  <Text style={{fontSize: 18}}>{acronym}</Text>
                </View>
                <View style={itemsContainer}>
                  <Text style={textName}>{item.name}</Text>
                  <Text style={textEmail}>{item.email}</Text>
                </View>
                <View style={iconContainer}>
                  <Icon name="right" size={30} style={{paddingLeft: 10}} />
                  <Text style={{fontSize: 16}}>10 posts</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  renderContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  circleContainer: {
    flex: 1.1,
    width: 50,
    height: 50,
    backgroundColor: 'rgb(101,207,156)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsContainer: {
    flex: 4.4,
    paddingLeft: 15,
  },
  textName: {
    paddingBottom: 5,
    fontSize: 18,
  },
  textEmail: {
    color: 'grey',
    fontSize: 13,
  },
  iconContainer: {
    flex: 2.8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});
export default AuthorsScreen;
