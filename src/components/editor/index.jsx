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
    value && value !== '' ? JSON.parse(value) : defaultValue,
  )

  const addHighlight = () => {
    const [highlightNode] = Editor.nodes(editor, {
      match: (n) => n.type === 'highlight',
    })
    if (editor.selection && !highlightNode) {
      const { selection } = editor
      const selectedText = Editor.string(editor, selection).trim()
      const isCollapsed = selection && Range.isCollapsed(selection)
      if (isCollapsed || selectedText === '') {
        return
      }

      Transforms.unwrapNodes(editor, {
        at: [],
        match: (n) =>
          n.type === 'highlight' && n.color === colors[feedbackList.length],
      })

      Transforms.wrapNodes(
        editor,
        {
          type: 'highlight',
          color: colors[feedbackList.length],
          children: [],
        },
        { split: true },
      )

      setSelection({
        content: JSON.stringify(editor.children),
        sentence: selectedText,
        color: colors[feedbackList.length],
      })
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
    console.log(JSON.stringify(editor.children))
    setSelection({
      content: JSON.stringify(editor.children),
    })
  }

  return (
    <Slate editor={editor} value={editorValue}>
      <Editable
        style={{ minHeight: '400px' }}
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
