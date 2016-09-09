/**
 * Created by zhoubo on 16/9/8.
 */
const initialListSize = {
    friendsTimeline : {}
}

export default function getFriendsTimeline(state=initialListSize, action){

    switch(action.type){
        case 'getFriendsTimeline':
            return Object.assign({}, state, {friendsTimeline: action.friendsTimeline});
        default:
            return state;
    }
}