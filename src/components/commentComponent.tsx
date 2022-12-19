import {Comments} from '../types/comments';
import {StyleSheet, Text, View} from 'react-native';

export const CommentComponent = (comment: Comments) => {
  return (
    <View style={styles.comment}>
      <Text style={styles.title}>{comment.name}</Text>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 10,
    fontWeight: 'bold',
  },

  body: {
    padding: 10,
  },
  comment: {
    padding: 10,
  },
});
