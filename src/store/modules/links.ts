import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as firebase from 'firebase';
import * as fb from '@/firebase';
import { MutationType } from '@/store/mutation-types';
import { Link } from '@/types';

export interface LinkState {
  links: Link[];
}

const initialState: LinkState = {
  links: [],
};

const actions: ActionTree<LinkState, any> = {
  addLink: ({commit}, link: Link): any => {
    fb.linksCollection.add(link).then(() => {
      let newLink: Link;
      fb.linksCollection.where('startDate', '<=', new Date().toString())
        .orderBy('startDate', 'desc').get()
        .then((querySnapshot: any) => {
          newLink = querySnapshot.docs[0].data();
          newLink.startDate = new Date(querySnapshot.docs[0].data().startDate);
          if (newLink.updatedDate) {
            newLink.updatedDate = new Date(querySnapshot.docs[0].data().updatedDate);
          }
          newLink.id = querySnapshot.docs[0].id;
          fb.linksCollection.get().then((snap: any) => {
            const length = snap.size;
            if (length > 1) {
              commit(MutationType.ADD_LINK, newLink);
            }
          });
          if (link.featureId) {
            fb.featuresCollection.doc(link.featureId).update({
              updatedDate: link.updatedDate,
              links: firebase.firestore.FieldValue.arrayUnion(newLink.id),
            });
          } else if (link.itemId) {
            fb.itemsCollection.doc(link.itemId).update({
              updatedDate: link.updatedDate,
              links: firebase.firestore.FieldValue.arrayUnion(newLink.id),
            });
          }
          fb.projectsCollection.doc(link.projectId).update({
            updatedDate: link.updatedDate,
            links: firebase.firestore.FieldValue.arrayUnion(newLink.id),
          });
        });
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  editLink: ({commit}, link: Link): any => {
    fb.linksCollection.doc(link.id).update(link).then(() => {
      const newLink = {
        ...link,
        startDate: new Date(link.startDate),
      };
      if (link.updatedDate) {
        newLink.updatedDate = new Date(link.updatedDate);
      }
      commit(MutationType.EDIT_LINK, link);
      if (link.featureId) {
        fb.featuresCollection.doc(link.featureId).update({
          updatedDate: link.updatedDate,
        });
      } else if (link.itemId) {
        fb.itemsCollection.doc(link.itemId).update({
          updatedDate: link.updatedDate,
        });
      }
      fb.projectsCollection.doc(link.projectId).update({
        updatedDate: link.updatedDate,
        links: firebase.firestore.FieldValue.arrayUnion(newLink.id),
      });
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  removeLink: ({commit}, link: Link): any => {
    console.log(link);
    if (link.featureId) {
      // Delete link id from features
      fb.featuresCollection.doc(link.featureId).update({
        updatedDate: new Date().toString(),
        links: firebase.firestore.FieldValue.arrayRemove(link.id),
      }).catch((err: any) => {
        console.log(err.message);
      });
      // Update feature update time
      fb.featuresCollection.doc(link.featureId).update({
        updatedDate: new Date().toString(),
      }).catch((err: any) => {
        console.log(err.message);
      });
    } else if (link.itemId) {
      // Delete link id from items
      fb.itemsCollection.doc(link.itemId).update({
        updatedDate: new Date().toString(),
        links: firebase.firestore.FieldValue.arrayRemove(link.id),
      }).catch((err: any) => {
        console.log(err.message);
      });
      // Update item update time
      fb.itemsCollection.doc(link.itemId).update({
        updatedDate: new Date().toString(),
      }).catch((err: any) => {
        console.log(err.message);
      });
    }
    // Update project update time
    fb.projectsCollection.doc(link.projectId).update({
      updatedDate: new Date().toString(),
    });
    // Delete link
    fb.linksCollection.doc(link.id).delete().then(() => {
      console.log(`Link ${link.id} successfully deleted!`);
      commit(MutationType.REMOVE_LINK, link);
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  removeAllLinks: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_LINKS);
  },
  setLinks: ({commit}, link: Link): any => {
    commit(MutationType.SET_LINKS, link);
  },
};

const mutations: MutationTree<LinkState> = {
  [MutationType.ADD_LINK]: (state: LinkState, link: Link) => {
    state.links.push(link);
  },
  [MutationType.EDIT_LINK]: (state: LinkState, link: Link) => {
    state.links = [
      ...state.links.filter((c: Link) => c.id !== link.id),
      link,
    ];
  },
  [MutationType.REMOVE_LINK]: (state: LinkState, link: Link) => {
    state.links.splice(state.links.indexOf(link), 1);
  },
  [MutationType.REMOVE_ALL_LINKS]: (state: LinkState) => {
    state.links = [];
  },
  [MutationType.SET_LINKS]: (state: LinkState, linkList: Link[]) => {
    state.links = linkList;
  },
};

const getters: GetterTree<LinkState, any> = {
  linkCount(state: LinkState): number {
    return state.links.length;
  },
};

export const links = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
