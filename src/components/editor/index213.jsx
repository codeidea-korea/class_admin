import React, { useMemo } from 'react'
import { Editable, withReact, useSlate, useSelected } from 'slate-react'
import { Slate } from 'slate-react'
import {
  Transforms,
  Editor,
  Range,
  createEditor,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'In addition to block nodes, you can create inline nodes. Here is a ',
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlink' }],
      },
      {
        text: ', and here is a more unusual inline: an ',
      },
      {
        type: 'button',
        children: [{ text: 'editable button' }],
      },
      {
        text: '!',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'There are two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected. ',
      },
      // The following is an example of an inline at the end of a block.
      // This is an edge case that can cause issues.
      {
        type: 'link',
        url: 'https://twitter.com/JustMissEmma/status/1448679899531726852',
        children: [{ text: 'Finally, here is our favorite dog video.' }],
      },
      { text: '' },
    ],
  },
]
const InlinesExample = () => {
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    [],
  )

  const addHighlight = () => {
    if (editor.selection) {
      const { selection } = editor
      const selectedText = Editor.string(editor, selection)
      const isCollapsed = selection && Range.isCollapsed(selection)
      if (isCollapsed) {
        return
      }

      const [highlightNode] = Editor.nodes(editor, {
        match: (n) => n.type === 'button',
      })

      if (!highlightNode) {
        Transforms.wrapNodes(
          editor,
          {
            type: 'button',
            children: [],
          },
          { split: true },
        )
        Transforms.collapse(editor, { edge: 'end' })
      }
    }
  }

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        onSelect={() => addHighlight()}
        renderElement={(props) => <Element {...props} />}
        renderLeaf={(props) => <Text {...props} />}
      />
    </Slate>
  )
}

const withInlines = (editor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) =>
    ['link', 'button'].includes(element.type) || isInline(element)

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertButton = (editor) => {
  if (editor.selection) {
    wrapButton(editor)
  }
}

const unwrapButton = (editor) => {
  console.log('asd')
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'button',
  })
}

const wrapButton = (editor) => {
  if (isButtonActive(editor)) {
    unwrapButton(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const button = {
    type: 'button',
    children: isCollapsed ? [{ text: 'Edit me!' }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, button)
  } else {
    console.log('asd?', button)
    Transforms.wrapNodes(
      editor,
      {
        type: 'button',
        children: [],
      },
      { split: true },
    )
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const Element = (props) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'button':
      return (
        <span
          {...props.attributes}
          style={{ background: 'rgba(251, 0, 0, 0.3)' }}
        >
          {props.children}
        </span>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Text = (props) => {
  const { attributes, children } = props
  return <span {...attributes}>{children}</span>
}

const ToggleEditableButtonButton = () => {
  const editor = useSlate()
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault()
        if (isButtonActive(editor)) {
          unwrapButton(editor)
        } else {
          insertButton(editor)
        }
      }}
    >
      smart_button
    </button>
  )
}

export default InlinesExample
