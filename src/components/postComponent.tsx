import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Loader} from '../loader/loader';
import {CommentComponent} from './commentComponent';
import Snackbar from 'react-native-snackbar';
import {Comments} from '../types/comments';
import {getAllComments} from '../api/comments';

export type Props = {
  postId: number;
  title: string;
  body: string;
};

export const PostComponent = (props: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [commentsItems, setComments] = useState<Comments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  function timeout(ms: number) {
    // @ts-ignore
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function loadComments(): Promise<any> {
    try {
      setIsLoading(true);
      const responseFromServer = await getAllComments(props.postId);

      setComments(responseFromServer);
    } catch (error) {
      setModalVisible(false);
      await timeout(1000);

      Snackbar.show({
        text: 'Сталась помилка',
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const toggleModal = async () => {
    setModalVisible(true);

    setIsLoading(true);
    await loadComments();
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        // @ts-ignore
        onRequestClose={() => setModalVisible(false)}>
        <>
          <Pressable
            style={styles.outsideModal}
            onPress={event => {
              if (event.target === event.currentTarget) {
                setModalVisible(false);
              }
            }}
          />
          <View style={styles.view}>
            {isLoading && <Loader />}

            {!isLoading && (
              <FlatList
                data={commentsItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <CommentComponent
                    name={item.name}
                    postId={item.postId}
                    id={item.id}
                    body={item.body}
                    email={item.email}
                  />
                )}
              />
            )}
          </View>
          <Pressable
            style={styles.outsideModal}
            onPress={event => {
              if (event.target === event.currentTarget) {
                setModalVisible(false);
              }
            }}
          />
        </>
      </Modal>
      <TouchableOpacity style={styles.block} onPress={toggleModal}>
        <Text style={styles.text}>{props.title}</Text>
        <Text>{props.body}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    margin: 20,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#FFB6C1',
    padding: 10,
  },
  text: {
    color: 'white',
    marginBottom: 15,
    alignItems: 'center',
  },
  view: {
    flex: 0,
    height: '50%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: 'pink',
    borderStyle: 'dotted',
    borderWidth: 8,
  },
  outsideModal: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
