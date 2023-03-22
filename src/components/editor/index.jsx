import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createEditor,
  Editor,
  Node,
  Range,
  Transforms,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'
import { nanoid } from 'nanoid'

const colors = [
  'rgba(251, 0, 0, 0.3)',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
]

const FeedbackEditor = ({ value, feedbackList, setSelection }) => {
  const nanoId = nanoid()
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    [],
  )
  const defaultValue = [
    {
      type: 'paragraph',
      children: [
        {
          text: 'qweqweqwe',
        },
        {
          type: 'button',
          children: [{ text: 'qqqq' }],
        },
        {
          text: '3453tsertgserdt',
        },
      ],
    },
  ]

  const addHighlight = () => {
    if (editor.selection) {
      const { selection } = editor
      const selectedText = Editor.string(editor, selection)
      const isCollapsed = selection && Range.isCollapsed(selection)
      if (isCollapsed) {
        return
      }
      setSelection({
        feedbackId: nanoId,
        sentence: selectedText,
      })

      const [highlightNode] = Editor.nodes(editor, {
        match: (n) => n.type === 'highlight',
      })

      if (!highlightNode) {
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
        editor.onChange()
      } else {
        Transforms.unwrapNodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === 'highlight',
        })
        setSelection({
          sentence: '',
        })
      }
    }
  }

  return (
    <Slate
      editor={editor}
      value={value ? JSON.parse(value) : defaultValue}
      onChange={(value) => {
        console.log(value)
        setSelection({
          content: JSON.stringify(value),
        })
      }}
    >
      <Editable
        onSelect={() => addHighlight()}
        onChange={(e) => e.preventDefault()}
        renderElement={(props) => (
          <Element {...props} feedbackList={feedbackList} />
        )}
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
        <span {...props.attributes} style={{ background: element.color }}>
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
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) =>
    ['highlight'].includes(element.type) || isInline(element)

  return editor
}

export default FeedbackEditor
