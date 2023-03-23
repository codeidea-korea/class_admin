import React, { useState, useCallback } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )
  const [selection, setSelection] = useState(null)

  const handleSelectionChange = useCallback(() => {
    const currentSelection = editorState.getSelection()
    const start = currentSelection.getStartOffset()
    const end = currentSelection.getEndOffset()
    setSelection({ start, end })
  }, [editorState])

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  return (
    <div>
      <pre>{JSON.stringify(editorState, null, 2)}</pre>
      <button onClick={handleBoldClick}>Bold</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        onSelect={handleSelectionChange}
      />
      {selection && (
        <div>
          Selected text:{' '}
          {editorState
            .getCurrentContent()
            .getBlockForKey(editorState.getSelection().getStartKey())
            .getText()
            .slice(selection.start, selection.end)}
        </div>
      )}
    </div>
  )
}

export default TextEditor
