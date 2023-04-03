import { atom } from 'recoil'

const QuestionContent = atom({
  key: 'QuestionContent',
  default: [],
})

const OutlineContent = atom({
  key: 'OutlineContent',
  default: [],
})

export { QuestionContent, OutlineContent }
