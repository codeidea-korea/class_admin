import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const userState = atom({
    key: 'userState',
    default: {
        authority: '',
        status: '',
        token: '',
        userId: '',
        loginModal: false, 
    },
    effects_UNSTABLE: [persistAtom],
});

export { userState };