import {atom} from 'recoil';

export const formDataAtom = atom({
    key: 'formDataAtom',
    default: {
    username: "",
    caption: "",
    numberOfLikes: 0,
    numberOfComments: 0,
    timeStamp: 0,
    profilePic: null,
    postPic: null,
    },
});