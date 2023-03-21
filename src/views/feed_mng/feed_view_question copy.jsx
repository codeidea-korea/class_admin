import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@/base-components'
import React, { useState, useReducer, useEffect, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import FeedViewActivity from './feed_view_activity'
import request from '@/utils/request'
import { useMutation } from 'react-query'

function FeedViewQuestion({ content, feedId, feedDetail, refetchFeedDetail }) {
  const api = useAxios()
  const navigate = useNavigate()
  const user = useRecoilValue(userState)
  const [tab, setTab] = useState(0)
  const [isModal, setIsModal] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      feedback: false,
      history: false,
    },
  )
  const [feedbackModParams, setFeedbackModParams] = useState({
    elId: '',
    sentence: '',
    reply: '',
  })
  const [selection, setSelection] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      id: 0,
      start: 0,
      end: 0,
      sentence: '',
      reply: '',
    },
  )
  const handleDragMouseUp = () => {
    if (window.getSelection().toString() === '') return
    const selectionStr = window.getSelection()
    console.log('selectionStr', selectionStr)
    setSelection({
      fhId: feedId,
      start:
        selectionStr.anchorOffset < selectionStr.extentOffset
          ? selectionStr.anchorOffset
          : selectionStr.extentOffset,
      end:
        selectionStr.extentOffset > selectionStr.anchorOffset
          ? selectionStr.extentOffset
          : selectionStr.anchorOffset,
      sentence: selectionStr.toString(),
    })
  }

  /** 피드백 달기 버튼 */
  const feedbackStart = async (id) => {
    if (selection.end === 0) {
      alert('피드백할 영역을 선택해주세요.')
      return
    }
    setSelection({
      id,
    })
    setIsModal({ feedback: true })
  }

  const { mutate: createFeedback } = useMutation(
    (data) =>
      request.post(
        '/admin/feedback-management/application/answer-feedback',
        data,
      ),
    {
      onSuccess: () => {
        refetchFeedDetail()
        setIsModal({ feedback: false })
        setSelection({
          id: 0,
          start: 0,
          end: 0,
          sentence: '',
          reply: '',
        })
      },
    },
  )

  /** 피드백 자기소개서 저장 */
  const feedbackStore = async () => {
    if (selection.reply === '') {
      alert('피드백 내용을 입력해주세요.')
      return
    }
    createFeedback(selection)
  }

  /** 피드백 자기소개서 수정 */
  const feedbackUpdate = async (fid) => {
    if (feedbackModParams.reply === '') {
      alert('피드백 내용을 입력해주세요.')
      return false
    }
    await api
      .put(
        `/admin/feedback-management/application/answer-feedback/${fid}`,
        feedbackModParams,
        { headers: { Authorization: `Bearer ${user.token}` } },
      )
      .then((res) => {
        if (res.status === 200) {
          feedbackModPopClose()
          applicationFeedbackDetail()
        }
      })
      .catch((err) => {
        console.log('error', err)
        if (err.response.status === 403) {
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
          navigate('/login')
        } else {
          alert(err.response.data.msg)
          return
        }
      })
  }

  const { mutate: removeFeedback } = useMutation(
    (id) =>
      request.delete(
        `/admin/feedback-management/application/answer-feedback/${id}`,
      ),
    {
      onSuccess: () => {
        refetchFeedDetail()
      },
    },
  )

  // const fdbCls = document.querySelectorAll('.fdb_highlight')
  // fdbCls.forEach((item) => {
  //   item.addEventListener('click', () => {
  //     document.getElementById(item.id)?.classList.remove('hightlight-red')
  //     document.getElementById(item.id)?.classList.add('hightlight-purple')
  //     document.getElementById('h' + item.id)?.classList.remove('outline_red')
  //     document.getElementById('h' + item.id)?.classList.add('outline_purple')
  //     setFeedbackModParams({
  //       ...feedbackModParams,
  //       elId: item.getAttribute('data-fid').toString(),
  //       sentence: item.getAttribute('data-sentence').toString(),
  //       reply: item.getAttribute('data-reply').toString(),
  //     })
  //     setFeedbackModPop(true)
  //   })
  // })

  // const feedbackModPopClose = () => {
  //   document.querySelectorAll('.fdb_highlight').forEach((item) => {
  //     item.classList.remove('hightlight-purple')
  //     item.classList.add('hightlight-red')
  //   })
  //   document.querySelectorAll('.hfdb_highlight').forEach((item) => {
  //     item.classList.remove('outline_purple')
  //     item.classList.add('outline_red')
  //   })
  //   setFeedbackModParams({
  //     ...feedbackModParams,
  //     elId: '',
  //     sentence: '',
  //     reply: '',
  //   })
  //   setFeedbackModPop(false)
  // }
  return (
    <React.Fragment>
      <button className="btn bg-white flex items-center w-44">
        <Lucide icon="Info" className="w-4 h-4 mr-2"></Lucide>자소서 작성 꿀팁
        <Lucide icon="ChevronDown" className="w-4 h-4 ml-auto"></Lucide>
      </button>
      <div className="tipParentDiv">
        {feedDetail?.qnaList.map((item, index) => (
          <div
            key={index}
            id={'tip_' + item.number}
            className="p-5 bg-slate-50 text-pending mt-3 rounded-md tipDiv"
            style={{
              whiteSpace: 'pre-line',
              lineHeight: '1.3rem',
              display: 'none',
            }}
          >
            {item.tip}
          </div>
        ))}
      </div>
      <div className="mt-5 intro-y">
        <ul className="nav nav-tabs">
          {feedDetail?.qnaList.map((item, index) => (
            <li className="nav-item flex-1" key={item.questionId}>
              <button
                className={`nav-link w-full py-2 ${tab === index && 'active'}`}
                onClick={() => setTab(index)}
              >
                {item.number}번 문항
              </button>
            </li>
          ))}
          {feedDetail?.activityYN === 'Y' && (
            <button className="w-full py-2">탐구 활동 증빙 자료</button>
          )}
        </ul>
        <div className="tab-content w-full border-l border-r border-b">
          {feedDetail?.qnaList.map((item, index) => (
            <div
              className={`tab-pane leading-relaxed p-5 ${
                tab === index && 'active'
              }`}
              key={item.questionId}
            >
              <div className="text-base font-medium mt-5">
                {item.number}. {item.title}
                <span className="text-slate-400 text-sm ml-2">
                  (띄어쓰기 포함 {item.limit}자 이내)
                </span>
              </div>
              <div className="intro-y grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-8">
                  <div className="flex justify-end">
                    <button
                      className="btn btn-green btn-sm"
                      onClick={() => {
                        feedbackStart(item.answerId)
                      }}
                    >
                      피드백 달기
                    </button>
                  </div>
                  <div
                    className="bg-slate-100 p-5 rounded-md mt-3"
                    style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem' }}
                    // onMouseUp={handleDragMouseUp}
                  >
                    {/* <Editor
                      editorState={editorState}
                      onChange={setEditorState}
                    ></Editor> */}
                    {/* <RenderContent
                      content={item.content}
                      feedback={item.feedbackList}
                    ></RenderContent> */}
                  </div>
                  <div className="flex justify-between text-slate-400 mt-2 text-sm">
                    <div>
                      글자수(
                      {item?.content
                        ?.replace(/<br\s*\/?>/gm, '\n')
                        ?.length.toString() ?? 0}
                      /{item.limit})
                    </div>
                    <div>최종수정일 {item.modDate}</div>
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="flex justify-end">
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => {
                        setIsModal({
                          history: true,
                        })
                      }}
                    >
                      히스토리 보기
                    </button>
                  </div>

                  {item.feedbackList?.map((item, findex) => (
                    <div
                      key={findex}
                      id={`hfdb_${item.number}_${findex}`}
                      className="bg-slate-100 p-5 rounded-md mt-3 outline_red relative hfdb_highlight"
                    >
                      <div className="absolute x_button">
                        <button
                          className="btn bg-white rounded-full hover:bg-danger hover:text-white p-1"
                          onClick={() => {
                            if (
                              confirm('선택하신 피드백을 삭제하시겠습니까?')
                            ) {
                              removeFeedback(item.id)
                            }
                          }}
                        >
                          <Lucide icon="X" className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between font-bold text-slate-500">
                        <div>피드백</div>
                        <div>{user.name}</div>
                      </div>
                      <div
                        className="mt-3"
                        style={{
                          whiteSpace: 'pre-line',
                          lineHeight: '1.3rem',
                        }}
                      >
                        {item.reply}
                      </div>
                      <button
                        className="btn bg-white w-full btn-sm mt-3"
                        onClick={() => {
                          // setSelection({
                          // })
                        }}
                      >
                        수정
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <TabGroup2>
          <TabList2 className="nav-tabs">
            {feedDetail?.qnaList.map((item, index) => (
              <Tab2
                key={item.questionId}
                className={`w-full py-2 ${index === 0 && 'active'}`}
                tag="button"
              >
                {item.number}번 문항
              </Tab2>
            ))}
            {feedDetail?.activityYN === 'Y' && (
              <Tab2 className="w-full py-2" tag="button">
                탐구 활동 증빙 자료
              </Tab2>
            )}
          </TabList2>
          <TabPanels2 className="border-l border-r border-b">
            {feedDetail?.qnaList.map((item, index) => (
              <TabPanel2
                key={index}
                className={`leading-relaxed p-5 ${index === 0 && 'active'}`}
              >
                <div className="text-base font-medium mt-5">
                  {item.number}. {item.title}
                  <span className="text-slate-400 text-sm ml-2">
                    (띄어쓰기 포함 {item.limit}자 이내)
                  </span>
                </div>
                <div className="intro-y grid grid-cols-12 gap-6 mt-5">
                  <div className="col-span-8">
                    <div className="flex justify-end">
                      <button
                        className="btn btn-green btn-sm"
                        onClick={() => {
                          feedbackStart(item.answerId)
                        }}
                      >
                        피드백 달기
                      </button>
                    </div>
                    <div
                      className="bg-slate-100 p-5 rounded-md mt-3"
                      style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem' }}
                      onMouseUp={handleDragMouseUp}
                    >
                      <div>{item.content}</div>
                    </div>
                    <div className="flex justify-between text-slate-400 mt-2 text-sm">
                      <div>
                        글자수(
                        {item?.content
                          ?.replace(/<br\s*\/?>/gm, '\n')
                          ?.length.toString() ?? 0}
                        /{item.limit})
                      </div>
                      <div>최종수정일 {item.modDate}</div>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <div className="flex justify-end">
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                          setIsModal({
                            history: true,
                          })
                        }}
                      >
                        히스토리 보기
                      </button>
                    </div>

                    {item.feedbackList?.map((item, findex) => (
                      <div
                        key={findex}
                        id={`hfdb_${item.number}_${findex}`}
                        className="bg-slate-100 p-5 rounded-md mt-3 outline_red relative hfdb_highlight"
                      >
                        <div className="absolute x_button">
                          <button
                            className="btn bg-white rounded-full hover:bg-danger hover:text-white p-1"
                            onClick={() => {
                              if (
                                confirm('선택하신 피드백을 삭제하시겠습니까?')
                              ) {
                                removeFeedback(item.id)
                              }
                            }}
                          >
                            <Lucide icon="X" className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex justify-between font-bold text-slate-500">
                          <div>피드백</div>
                          <div>{user.name}</div>
                        </div>
                        <div
                          className="mt-3"
                          style={{
                            whiteSpace: 'pre-line',
                            lineHeight: '1.3rem',
                          }}
                        >
                          {item.reply}
                        </div>
                        <button
                          className="btn bg-white w-full btn-sm mt-3"
                          onClick={() => {
                            // setSelection({
                            // })
                          }}
                        >
                          수정
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel2>
            ))}
            {feedDetail?.activityYN === 'Y' && (
              <TabPanel2 className="leading-relaxed p-5">
                <FeedViewActivity />
              </TabPanel2>
            )}
          </TabPanels2>
        </TabGroup2> */}
      </div>

      {/* BEGIN: Modal 히스토리보기 */}
      <Modal
        size="modal-lg"
        show={isModal.history}
        onHidden={() => {
          setIsModal({
            history: false,
          })
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">히스토리</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              setIsModal({
                history: false,
              })
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody className="p-5 flex flex-col gap-5 h-500 overflow-x-scroll">
          <div className="p-3 border rounded-md mr-12">
            Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
            gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
            poskap.
            <div className="flex justify-end mt-3">
              <span className="font-medium mr-2 text-sm">OOO학생 자소서</span>{' '}
              <span className="text-slate-400 text-sm">2023년 1월20일</span>
            </div>
          </div>
          <div className="p-3 border rounded-md ml-12 bg-slate-100">
            Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
            gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
            poskap.
            <div className="flex justify-end mt-3">
              <span className="font-medium mr-2 text-sm">
                000 선생님 피드백
              </span>{' '}
              <span className="text-slate-400 text-sm">2023년 1월20일</span>
            </div>
          </div>
          <div className="p-3 border rounded-md mr-12">
            Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
            gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
            poskap.
            <div className="flex justify-end mt-3">
              <span className="font-medium mr-2 text-sm">OOO학생 자소서</span>{' '}
              <span className="text-slate-400 text-sm">2023년 1월20일</span>
            </div>
          </div>
          <div className="p-3 border rounded-md ml-12 bg-slate-100">
            Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
            gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
            poskap.
            <div className="flex justify-end mt-3">
              <span className="font-medium mr-2 text-sm">
                000 선생님 피드백
              </span>{' '}
              <span className="text-slate-400 text-sm">2023년 1월20일</span>
            </div>
          </div>
          <div className="p-3 border rounded-md mr-12">
            Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
            gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
            poskap.
            <div className="flex justify-end mt-3">
              <span className="font-medium mr-2 text-sm">OOO학생 자소서</span>{' '}
              <span className="text-slate-400 text-sm">2023년 1월20일</span>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Modal 히스토리보기 */}

      {/* BEGIN: Modal 피드백 입력 팝업 */}
      <Modal
        size="modal-lg"
        show={isModal.feedback}
        onHidden={() => {
          setIsModal({ feedback: false })
        }}
      >
        <ModalBody className="p-5">
          <div className="mt-6 box bg-slate-100 p-5 intro-y">
            <div className="flex items-center">
              <h2 className="font-bold text-lg">피드백 : {user.name}</h2>
              <button
                className="ml-auto"
                onClick={() => {
                  setIsModal({ feedback: false })
                }}
              >
                <Lucide icon="X" className="w-6 h-6"></Lucide>
              </button>
            </div>
            <div className="mt-3 flex">
              <div
                className="text-slate-400 w-full"
                style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem' }}
              >
                {selection.sentence}
              </div>
            </div>
            <div className="mt-3 flex">
              <div className="w-full flex items-end">
                <textarea
                  rows="7"
                  className="rounded-md w-full"
                  placeholder="피드백을 작성해 주세요."
                  onChange={(event) => {
                    setSelection({
                      reply: event.currentTarget.value,
                    })
                  }}
                ></textarea>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => {
              setIsModal({ feedback: false })
            }}
          >
            취소
          </button>
          <button
            type="button"
            className="btn btn-primary w-24"
            onClick={feedbackStore}
          >
            저장하기
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 피드백 입력 팝업 */}

      {/* BEGIN: Modal 피드백 수정 팝업 */}
      {/* <Modal
        size="modal-lg"
        show={isModal.feedback}
        onHidden={() => setIsModal({ feedback: false })}
      >
        <ModalBody className="p-5">
          <div className="mt-6 box bg-slate-100 p-5 intro-y">
            <div className="flex items-center">
              <h2 className="font-bold text-lg">피드백 : {user.name}</h2>
              <button
                className="ml-auto"
                onClick={() => setIsModal({ feedback: false })}
              >
                <Lucide icon="X" className="w-6 h-6"></Lucide>
              </button>
            </div>
            <div className="mt-3 flex">
              <div
                className="text-slate-400 w-full"
                style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem' }}
              >
                {feedbackModParams.sentence}
              </div>
            </div>
            <div className="mt-3 flex">
              <div className="w-full flex items-end">
                <textarea
                  cols=""
                  rows="7"
                  value={feedbackModParams.reply}
                  className="rounded-md w-full"
                  placeholder="피드백을 작성해 주세요."
                  onChange={(event) => {
                    setSelection({
                    })
                  }}
                ></textarea>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={feedbackModPopClose}
          >
            취소
          </button>
          <button
            type="button"
            className="btn btn-primary w-24"
            onClick={() => {
              feedbackUpdate(feedbackModParams.elId)
            }}
          >
            저장하기
          </button>
        </ModalFooter>
      </Modal> */}
      {/* END: Modal 피드백 수정 팝업 */}
    </React.Fragment>
  )
}

const hightlightColor = {
  0: 'hightlight-red',
  1: 'hightlight-blue',
}

const RenderContent = memo(({ content, feedback }) => {
  const replaceAt = (str, start, end, chr) => {
    return str.substring(0, start) + chr + str.substring(end)
  }
  const replaceText = feedback?.map((item, index) =>
    replaceAt(
      content,
      item.start,
      item.end,
      `<span class="fdb_highlight hightlight-red">${item.sentence}</span>`,
    ),
  )
  if (feedback.length) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: replaceText,
        }}
      ></div>
    )
  } else {
    return content
  }
})

export default FeedViewQuestion
