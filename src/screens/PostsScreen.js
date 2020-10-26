import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import SearchBar from '../components/SearchBar';
import {AppLoader} from '../components/AppLoader';

const PostsScreen = ({navigation, route}) => {
  const {title, userId} = route.params;
  const [listPosts, setListPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState();
  const [term, setTerm] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((responce) => responce.json())
      .then((json) =>
        setListPosts(json.filter((item) => item.userId === userId)),
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setFilteredPosts(
      listPosts.filter((post) => {
        var str = post.title + '' + post.body;
        return str.toLowerCase().includes(term.toLowerCase());
      }),
    );
  }, [term, listPosts]);

  if (loading) return <AppLoader />;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <SearchBar term={term} onTermChange={setTerm} />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 13,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 17,
    paddingLeft: 18,
    paddingTop: 12,
    paddingBottom: 10,
    paddingRight: 17,
  },
  body: {
    color: 'grey',
    paddingLeft: 18,
    paddingBottom: 12,
    paddingRight: 17,
  },
});
export default PostsScreen;
