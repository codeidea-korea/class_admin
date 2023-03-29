import { atom } from 'recoil'

const content = atom({
  key: 'content',
  default: [],
})

export default content
