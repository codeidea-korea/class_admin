import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const naviState = atom({
  key: 'naviState',
  default: {
    menu01 : '회원 관리',
    menu02 : '회원 관리'
  },
  effects_UNSTABLE: [ persistAtom ],
});

export { naviState };