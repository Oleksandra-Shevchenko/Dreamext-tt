import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getAllPosts} from '../api/posts';
import {Posts} from '../types/posts';
import {Loader} from '../loader/loader';
import {PostComponent} from '../components/postComponent';
import Snackbar from 'react-native-snackbar';

interface HomeNavigationProps {
  navigation: any;
}
export const HomeScreen = (props: HomeNavigationProps) => {
  const [postsItems, setPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadPhones(): Promise<any> {
    try {
      setIsLoading(true);
      const responseFromServer = await getAllPosts();

      setPosts(responseFromServer);
    } catch (error) {
      return Snackbar.show({
        text: 'Сталась помилка',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Повторити запит',
          textColor: 'green',
          onPress: () => {
            loadPhones();
          },
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPhones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => props.navigation.goBack();
  return (
    <>
      <TouchableOpacity style={styles.rightButton} onPress={() => goBack()}>
        <Text style={styles.text}>Log out</Text>
      </TouchableOpacity>

      {isLoading && <Loader />}

      {!isLoading && (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.content}
          data={postsItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <PostComponent
              title={item.title}
              body={item.body}
              postId={item.id}
            />
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rightButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '30%',
    height: 50,
    borderRadius: 40,
    marginTop: 4,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DE3163',
    marginBottom: 20,
  },
  text: {
    color: 'white',
  },
  list: {
    top: 60.0,
  },
  content: {
    paddingBottom: 60.0,
  },
});
