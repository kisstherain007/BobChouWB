/**
 * Created by zhoubo on 16/9/2.
 */
import getAccountInfo from './getAccountInfoReducer';
import getFriendsTimeline from './statusesTimelineReucers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    getAccountInfo,
    getFriendsTimeline
});

export default rootReducer;