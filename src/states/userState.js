import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

const userState = atom({
  key: 'userState',
  default: {
    id: 0,
    authority: '',
    grade: '',
    name: '',
    userId: '',
    birthDay: '',
    gender: '',
    email: '',
    phone: '',
    authenticationType: '',
    schoolName: '',
    schoolYear: '',
    addr: '',
    addrDetail: '',
    tos4YN: '',
    status: '',
    token: '',
    loginModal: false,
    mainChildId: 0,
  },
  effects_UNSTABLE: [persistAtom],
})

export { userState }
