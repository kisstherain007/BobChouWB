/**
 * Created by zhoubo on 16/9/7.
 */
const initialListSize = {
    accountInfo : {},
    friendsInfo : {}
};

export default function getAccountInfo(state=initialListSize, action){

    switch(action.type){
        case 'getUserInfo':
            return Object.assign({}, state, {accountInfo: action.accountInfo});
        case 'getFriendsInfo':
            return Object.assign({}, state, {friendsInfo: action.friendsInfo});
        default:
            return state;
    }
}