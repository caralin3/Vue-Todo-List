import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as firebase from 'firebase';
import * as fb from '@/firebase';
import { MutationType } from '@/store/mutation-types';
import { Comment } from '@/types';

export interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

const actions: ActionTree<CommentState, any> = {
  addComment: ({commit}, comment: Comment): any => {
    fb.commentsCollection.add(comment).then(() => {
      let newComment: Comment;
      fb.commentsCollection.where('startDate', '<=', new Date().toString())
        .orderBy('startDate', 'desc').get()
        .then((querySnapshot: any) => {
          newComment = querySnapshot.docs[0].data();
          newComment.startDate = new Date(querySnapshot.docs[0].data().startDate);
          if (newComment.updatedDate) {
            newComment.updatedDate = new Date(querySnapshot.docs[0].data().updatedDate);
          }
          newComment.id = querySnapshot.docs[0].id;
          fb.commentsCollection.get().then((snap: any) => {
            const length = snap.size;
            if (length > 1) {
              commit(MutationType.ADD_COMMENT, newComment);
            }
          });
          if (comment.featureId) {
            fb.featuresCollection.doc(comment.featureId).update({
              updatedDate: comment.updatedDate,
              comments: firebase.firestore.FieldValue.arrayUnion(newComment.id),
            });
          } else if (comment.itemId) {
            fb.itemsCollection.doc(comment.itemId).update({
              updatedDate: comment.updatedDate,
              comments: firebase.firestore.FieldValue.arrayUnion(newComment.id),
            });
          }
          fb.projectsCollection.doc(comment.projectId).update({
            updatedDate: comment.updatedDate,
            comments: firebase.firestore.FieldValue.arrayUnion(newComment.id),
          });
        });
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  editComment: ({commit}, comment: Comment): any => {
    fb.commentsCollection.doc(comment.id).update(comment).then(() => {
      const newComment = {
        ...comment,
        startDate: new Date(comment.startDate),
      };
      if (comment.updatedDate) {
        newComment.updatedDate = new Date(comment.updatedDate);
      }
      commit(MutationType.EDIT_COMMENT, comment);
      if (comment.featureId) {
        fb.featuresCollection.doc(comment.featureId).update({
          updatedDate: comment.updatedDate,
        });
      } else if (comment.itemId) {
        fb.itemsCollection.doc(comment.itemId).update({
          updatedDate: comment.updatedDate,
        });
      }
      fb.projectsCollection.doc(comment.projectId).update({
        updatedDate: comment.updatedDate,
        comments: firebase.firestore.FieldValue.arrayUnion(newComment.id),
      });
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  removeComment: ({commit}, comment: Comment): any => {
    if (comment.featureId) {
      // Delete comment id from features
      fb.featuresCollection.doc(comment.featureId).update({
        updatedDate: new Date().toString(),
        comments: firebase.firestore.FieldValue.arrayRemove(comment.id),
      }).catch((err: any) => {
        console.log(err.message);
      });
      // Update feature update time
      fb.featuresCollection.doc(comment.featureId).update({
        updatedDate: new Date().toString(),
      }).catch((err: any) => {
        console.log(err.message);
      });
    } else if (comment.itemId) {
      // Delete comment id from items
      fb.itemsCollection.doc(comment.itemId).update({
        updatedDate: new Date().toString(),
        comments: firebase.firestore.FieldValue.arrayRemove(comment.id),
      }).catch((err: any) => {
        console.log(err.message);
      });
      // Update item update time
      fb.itemsCollection.doc(comment.itemId).update({
        updatedDate: new Date().toString(),
      }).catch((err: any) => {
        console.log(err.message);
      });
    }
    // Update project update time
    fb.projectsCollection.doc(comment.projectId).update({
      updatedDate: new Date().toString(),
    });
    // Delete comment
    fb.commentsCollection.doc(comment.id).delete().then(() => {
      console.log(`Comment ${comment.id} successfully deleted!`);
      commit(MutationType.REMOVE_COMMENT, comment);
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  removeAllComments: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_COMMENTS);
  },
  setComments: ({commit}, comment: Comment): any => {
    commit(MutationType.SET_COMMENTS, comment);
  },
};

const mutations: MutationTree<CommentState> = {
  [MutationType.ADD_COMMENT]: (state: CommentState, comment: Comment) => {
    state.comments.push(comment);
  },
  [MutationType.EDIT_COMMENT]: (state: CommentState, comment: Comment) => {
    state.comments = [
      ...state.comments.filter((c: Comment) => c.id !== comment.id),
      comment,
    ];
  },
  [MutationType.REMOVE_COMMENT]: (state: CommentState, comment: Comment) => {
    state.comments.splice(state.comments.indexOf(comment), 1);
  },
  [MutationType.REMOVE_ALL_COMMENTS]: (state: CommentState) => {
    state.comments = [];
  },
  [MutationType.SET_COMMENTS]: (state: CommentState, commentList: Comment[]) => {
    state.comments = commentList;
  },
};

const getters: GetterTree<CommentState, any> = {
  commentCount(state: CommentState): number {
    return state.comments.length;
  },
};

export const comments = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
