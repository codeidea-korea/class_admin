import { useState, useImperativeHandle, useEffect } from 'react'
import { createEditor, Editor, Range, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'

const colors = [
  '#BBE2F2',
  '#F2E307',
  '#F2BDD0',
  '#CED9B8',
  '#F2EAE4',
  '#D9C9BA',
  '#FFEAEA',
  '#F5C6EC',
  '#FFF2CC',
  '#F5EBEB',
  '#9D7BFF',
  '#EDF1D6',
  '#FFFFE8',
  '#F5EBE0',
  '#F5EBE0',
  '#F0DBDB',
  '#DBA39A',
  '#EFF5F5',
  '#D6E4E5',
  '#D2DAFF',
]
const defaultValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
]

const FeedbackEditor = ({ value, feedbackList, setSelection, color }) => {
  const [editor] = useState(() =>
    withInlines(withHistory(withReact(createEditor()))),
  )
  const [editorValue, setEditorValue] = useState(
    value ? JSON.parse(value) : defaultValue,
  )

  const addHighlight = () => {
    if (editor.selection) {
      const { selection } = editor
      const selectedText = Editor.string(editor, selection).trim()
      const isCollapsed = selection && Range.isCollapsed(selection)
      if (isCollapsed || selectedText === '') {
        return
      }

      setSelection({
        sentence: selectedText,
        color: colors[feedbackList.length],
      })

      const [highlightNode] = Editor.nodes(editor, {
        match: (n) => n.type === 'highlight',
      })

      Transforms.unwrapNodes(editor, {
        at: [],
        match: (n) =>
          n.type === 'highlight' && n.color === colors[feedbackList.length],
      })

      if (highlightNode) {
        Transforms.wrapNodes(
          editor,
          {
            type: 'highlight',
            color: colors[feedbackList.length],
            children: [],
          },
          { split: true },
        )
      } else {
        Transforms.wrapNodes(
          editor,
          {
            type: 'highlight',
            color: colors[feedbackList.length],
            children: [],
          },
          { split: true },
        )
        Transforms.collapse(editor, { edge: 'end' })
      }
      editor.onChange()
    }
  }

  useEffect(() => {
    if (color) {
      deleteFeedback(color)
    }
  }, [color])

  const deleteFeedback = (col) => {
    Transforms.unwrapNodes(editor, {
      at: [],
      match: (n) => n.type === 'highlight' && n.color === col,
    })
    editor.onChange()
  }
  const isKorean = (txt) => {
    const c = txt.charCodeAt(0)
    if (0x1100 <= c && c <= 0x11ff) return true
    if (0x3130 <= c && c <= 0x318f) return true
    if (0xac00 <= c && c <= 0xd7a3) return true
    return false
  }

  return (
    <Slate
      editor={editor}
      value={editorValue}
      onChange={(value) =>
        setSelection({
          content: JSON.stringify(value),
        })
      }
    >
      <Editable
        onKeyDown={(e) => e.preventDefault()}
        onKeyUp={(e) => {
          // console.log(e)
          // document.dispatchEvent(
          //   new KeyboardEvent('keydown', { key: 'Backspace' }),
          // )
          // if (isKorean(e.key)) {
          // }
          e.preventDefault()
        }}
        onSelect={() => addHighlight()}
        renderElement={(props) => <Element {...props} />}
        renderLeaf={(props) => <Text {...props} />}
      />
    </Slate>
  )
}

const Element = (props) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'highlight':
      return (
        <span {...props.attributes} style={{ backgroundColor: element.color }}>
          {props.children}
        </span>
      )
    default:
      return <div {...attributes}>{children}</div>
  }
}

const Text = (props) => {
  const { attributes, children, leaf } = props
  return <span {...attributes}>{children}</span>
}

const withInlines = (editor) => {
  const { isInline } = editor

  editor.isInline = (element) =>
    ['highlight'].includes(element.type) || isInline(element)

  return editor
}

export default FeedbackEditor
