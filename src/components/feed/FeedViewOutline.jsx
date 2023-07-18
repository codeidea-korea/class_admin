import React, { Fragment, useState, useReducer, useEffect, useRef } from 'react'
import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@/base-components'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState } from '@/states/userState'
import request from '@/utils/request'
import { useMutation } from 'react-query'
import Editor from '@/components/editor'
import { OutlineContent } from '@/stores/content'

function FeedViewQuestion({
  feedId,
  feedDetail,
  refetchFeedDetail,
  setIsLoading,
}) {
  const user = useRecoilValue(userState)
  const [content, setContent] = useRecoilState(OutlineContent)
  const [feedbackParams, setFeedbackParams] = useState({
    color: '',
    tab: 0,
  })
  const [isModal, setIsModal] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      feedback: false,
      history: false,
      editFeedback: false,
    },
  )
  const [feedbackModParams, setFeedbackModParams] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      elId: '',
      sentence: '',
      reply: '',
    },
  )
  const [selection, setSelection] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      id: 0,
      fhId: '',
      teacherName: user.name,
      sentence: '',
      reply: '',
      color: '',
    },
  )
  useEffect(() => {
    setContent(feedDetail.outlineQnaList.map((item) => item.content))
  }, [])

  /** 피드백 달기 버튼 */
  const feedbackStart = (id, index) => {
    setSelection({
      id,
      index,
      fhId: feedId,
    })
    setIsModal({ feedback: true })
  }

  const { mutate: createFeedback } = useMutation(
    (data) =>
      request.post(
        '/admin/feedback-management/application/outline-feedback',
        data,
      ),
    {
      onSuccess: () => {
        refetchFeedDetail()
        setIsModal({ feedback: false })
        setSelection({
          id: 0,
          index: 0,
          fhId: 0,
          sentence: '',
          reply: '',
          content: '',
          color: '',
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
    createFeedback({
      ...selection,
      content: content[selection.index],
    })
  }

  const { mutate: updateFeedback } = useMutation(
    () =>
      request.put(
        `/admin/feedback-management/application/answer-feedback/${feedbackModParams.id}`,
        feedbackModParams,
      ),
    {
      onSuccess: () => {
        alert('피드백이 수정되었습니다.')
        refetchFeedDetail()
        setIsModal({ editFeedback: false })
        setFeedbackModParams({
          id: '',
          sentence: '',
          reply: '',
        })
      },
    },
  )

  /** 피드백 자기소개서 수정 */
  const feedbackUpdate = () => {
    if (feedbackModParams.reply === '') {
      alert('피드백 내용을 입력해주세요.')
      return false
    }
    updateFeedback()
  }

  const { mutate: removeFeedback } = useMutation(
    (id) =>
      request.delete(
        `/admin/feedback-management/application/answer-feedback/${id}`,
      ),
    {
      onSuccess: () => {
        refetchFeedDetail()
        setIsLoading(false)
      },
    },
  )
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
      <div className="border mt-5 intro-y">
        {feedDetail?.outlineQnaList?.map((item, index) => (
          <div className="leading-relaxed p-5" key={item.outlineQuestionId}>
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
                      feedbackStart(item.outlineAnswerId, index)
                    }}
                  >
                    피드백 달기
                  </button>
                </div>
                <div className="bg-slate-100 p-5 rounded-md mt-3">
                  {content[index] && (
                    <Editor
                      content={content[index]}
                      setContent={setContent}
                      contentIndex={index}
                      feedbackParams={feedbackParams}
                      setSelection={setSelection}
                      feedbackList={item.feedbackList}
                    ></Editor>
                  )}
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
                      setSelection({
                        index,
                      })
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
                    className="bg-slate-100 p-5 rounded-md mt-3 outline_red relative"
                    style={{ borderColor: item.color }}
                  >
                    <div className="absolute x_button">
                      <button
                        className="btn bg-white rounded-full hover:bg-danger hover:text-white p-1"
                        onClick={() => {
                          if (confirm('선택하신 피드백을 삭제하시겠습니까?')) {
                            setFeedbackParams({
                              color: item.color,
                              tab,
                            })
                            setTimeout(() => {
                              removeFeedback(item.id)
                            }, 100)
                          }
                        }}
                      >
                        <Lucide icon="X" className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between font-bold text-slate-500">
                      <div>피드백</div>
                      <div>{item.teacherName}</div>
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
                        setFeedbackModParams({
                          id: item.id,
                          reply: item.reply,
                          sentence: item.sentence,
                        })
                        setIsModal({
                          editFeedback: true,
                        })
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
          {/* <div className="p-3 border rounded-md mr-12">
            Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
            gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
            poskap.
            <div className="flex justify-end mt-3">
              <span className="font-medium mr-2 text-sm">OOO학생 자소서</span>{' '}
              <span className="text-slate-400 text-sm">2023년 1월20일</span>
            </div>
          </div> */}
          {feedDetail?.outlineQnaList[selection.index] &&
            Object.entries(
              feedDetail?.outlineQnaList[selection.index]?.feedbackHistory,
            )?.map(([key, value]) => (
              <Fragment key={value[0].id}>
                {value.reverse().map((item, index) => (
                  <>
                    {item.sentence.length !== 0 && (
                      <div className="p-3 border rounded-md mr-12">
                        {item.sentence}
                        <div className="flex justify-end mt-3">
                          <span className="font-medium mr-2 text-sm">
                            학생 자소서
                          </span>
                          <span className="text-slate-400 text-sm">
                            {item.creDate}
                          </span>
                        </div>
                      </div>
                    )}

                    <div
                      className="p-3 border rounded-md ml-12 bg-slate-100 text-right"
                      key={index}
                    >
                      <div className="break-all">{item.reply}</div>
                      <div className="flex justify-end mt-3">
                        <span className="font-medium mr-2 text-sm">
                          {item.teacherName} 선생님 피드백
                        </span>
                        <span className="text-slate-400 text-sm">
                          {item.creDate}
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </Fragment>
            ))}
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
                  value={selection.reply}
                  className="rounded-md w-full"
                  placeholder="피드백을 작성해 주세요."
                  onChange={(event) => {
                    setSelection({
                      reply: event.target.value,
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
      <Modal
        size="modal-lg"
        show={isModal.editFeedback}
        onHidden={() => setIsModal({ editFeedback: false })}
      >
        <ModalBody className="p-5">
          <div className="mt-6 box bg-slate-100 p-5 intro-y">
            <div className="flex items-center">
              <h2 className="font-bold text-lg">피드백 : {user.name}</h2>
              <button
                className="ml-auto"
                onClick={() => setIsModal({ editFeedback: false })}
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
                  rows="7"
                  value={feedbackModParams.reply}
                  className="rounded-md w-full"
                  placeholder="피드백을 작성해 주세요."
                  onChange={(event) => {
                    setFeedbackModParams({
                      reply: event.target.value,
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
            onClick={() => setIsModal({ editFeedback: false })}
          >
            취소
          </button>
          <button
            type="button"
            className="btn btn-primary w-24"
            onClick={() => {
              updateFeedback()
            }}
          >
            저장하기
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 피드백 수정 팝업 */}
    </React.Fragment>
  )
}

export default FeedViewQuestion
