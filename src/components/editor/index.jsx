import { useState, useMemo, useCallback } from 'react'
import { createEditor, Editor, Transforms, Range, Text } from 'slate'
import { Editable, withReact, Slate } from 'slate-react'

const FeedbackEditor = ({ value, feedback, onChange }) => {
  const [editorValue, setEditorValue] = useState(
    value
      ? [
          {
            type: 'paragraph',
            children: [{ text: value }],
          },
        ]
      : [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
  )
  const editor = useMemo(() => withReact(createEditor()), [])
  const renderLeaf = useCallback((props) => {
    console.log(props.leaf.feedback)
    if (props.leaf.feedback) {
      return <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
    }
    return <span {...props.attributes}>{props.children}</span>
  }, [])

  const decorate = useCallback(
    ([node, path]) => {
      const ranges = []

      if (!Text.isText(node)) {
        return ranges
      }

      feedback.forEach((item) => {
        const { start, end } = item
        const endOffset = start + (end - start)

        if (path[0] === start && path[0] === end) {
          ranges.push({
            anchor: { path, offset: start },
            focus: { path, offset: end },
            feedback: item,
          })
        } else if (path[0] === start) {
          ranges.push({
            anchor: { path, offset: start },
            focus: { path, offset: end },
            feedback: item,
          })
        } else if (path[0] > start && path[0] < end) {
          ranges.push({
            anchor: { path, offset: 0 },
            focus: { path, offset: node.text.length },
            feedback: item,
          })
        } else if (path[0] === end) {
          ranges.push({
            anchor: { path, offset: 0 },
            focus: { path, offset: end - path[0] },
            feedback: item,
          })
        }
      })

      return ranges
    },
    [feedback],
  )

  const handleOnChange = useCallback(
    (newValue) => {
      // add feedback to the leaf node
      const withFeedback = newValue.map((node) => {
        if (node.type === 'paragraph') {
          return node.children.map((child) => {
            if (child.text) {
              return {
                ...child,
                feedback: false,
              }
            }
            return child
          })
        }
        return node
      })

      // check if the leaf node needs feedback
      const updated = withFeedback.map((node) => {
        return node.map((n) => {
          if (n.feedback === false) {
            const { text } = n
            feedback.forEach((f) => {
              const { start, end } = f
              if (start <= text.length && end >= text.length) {
                n.feedback = f
              }
            })
          }
          return n
        })
      })
      onChange(updated)
    },
    [feedback, onChange],
  )

  return (
    <Slate editor={editor} value={editorValue} onChange={handleOnChange}>
      <Editable decorate={decorate} renderLeaf={renderLeaf} />
    </Slate>
  )
}

export default FeedbackEditor
