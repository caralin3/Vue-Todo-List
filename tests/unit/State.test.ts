import { actions, mutations } from '@/store';
import { RootState } from '@/types';
import { User1 } from '@/store/state';
import { MutationType } from '@/store/mutation-types';

describe('store', () => {
  const initialState: RootState = {
    currentUser: User1,
    userProfile: {},
  };

  describe('actions', () => {
    const {
      resetData,
      setCurrentUser,
      setUserProfile,
      fetchUserProfile,
    } = actions;

    // helper for testing action with expected mutations
    const testAction = (
      action: ({ commit }: any, state: RootState) => void,
      payload: any,
      state: RootState,
      expectedMutations: any[],
      done: any,
    ) => {
      let count = 0;

      // mock commit
      const commit = (type: MutationType, data: any) => {
        const mutation = expectedMutations[count];

        try {
          expect(type).toEqual(mutation);
          if (data) {
            expect(data).toEqual(mutation.data);
          }
        } catch (error) {
          done(error);
        }

        count++;
        if (count >= expectedMutations.length) {
          done();
        }
      };

      // call the action with mocked store and arguments
      action({ commit, state }, payload);

      // check if no mutations should have been dispatched
      if (expectedMutations.length === 0) {
        expect(count).toEqual(0);
        done();
      }
    };

    it('resetData', (done: any) => {
      testAction(actions.resetData, null, initialState, [MutationType.RESET_DATA], done);
    });

    it('setCurrentUser', (done: any) => {
      testAction(actions.setCurrentUser, null, initialState, [MutationType.SET_CURRENT_USER], done);
    });

    it('setUserProfile', (done: any) => {
      testAction(actions.setUserProfile, null, initialState, [MutationType.SET_USER_PROFILE], done);
    });
  });

  describe('mutations', () => {
    const {
      RESET_DATA,
      SET_CURRENT_USER,
      SET_USER_PROFILE,
    } = mutations;

    it('resets data', () => {
      RESET_DATA(initialState);
      expect(initialState.currentUser).toEqual(null);
      expect(initialState.userProfile).toEqual({});
    });

    it('sets current user', () => {
      SET_CURRENT_USER(initialState, User1);
      expect(initialState.currentUser).toEqual(User1);
    });

    it('sets user profile', () => {
      SET_USER_PROFILE(initialState, User1);
      expect(initialState.userProfile).toEqual(User1);
    });
  });
});
