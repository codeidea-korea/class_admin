import React, { Fragment, useState, useReducer, useEffect } from 'react'
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
import { QuestionContent } from '@/stores/content'
import dayjs from 'dayjs'

function FeedViewQuestion({
  feedId,
  feedDetail,
  refetchFeedDetail,
  setIsLoading,
}) {
  const user = useRecoilValue(userState)
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL
  const [content, setContent] = useRecoilState(QuestionContent)
  const [tab, setTab] = useState(0)
  const [feedbackParams, setFeedbackParams] = useState({
    color: '',
    tab: 0,
  })
  const [feedbackContent, setFeedbackContent] = useState({})

  useEffect(() => {
    console.log(feedbackContent)
    console.log(JSON.stringify(feedbackContent))
  }, [feedbackContent])

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
    setContent(feedDetail.qnaList.map((item) => item.content))
  }, [])

  /** 피드백 달기 버튼 */
  const feedbackStart = async (id, activity, content) => {
    if (!activity) {
      if (selection.sentence === '') {
        alert('피드백할 영역을 선택해주세요.')
        return
      }
      setSelection({
        id,
        fhId: feedId,
      })
    } else {
      console.log(id)
      setSelection({
        id,
        fhId: feedId,
        sentence: '',
        content: content,
      })
    }
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
          fhId: 0,
          teacherName: '',
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
      content: content[tab],
    })
  }

  const { mutate: createFeedbackActive } = useMutation(
    (data) =>
      request.post(
        '/admin/feedback-management/application/activity-feedback',
        data,
      ),
    {
      onSuccess: () => {
        refetchFeedDetail()
        setIsModal({ feedback: false })
        setSelection({
          id: 0,
          fhId: 0,
          teacherName: '',
          sentence: '',
          reply: '',
          content: '',
          color: '',
        })
      },
    },
  )

  // 피드백 탐구활동 저장
  const feedbackStoreActive = async () => {
    createFeedbackActive({
      ...selection,
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

  // 탐구활동 증빙자료 수정
  const { mutate: updateFeedback2 } = useMutation(
    () =>
      request.put(
        `/admin/feedback-management/application/activity-feedback/${feedbackModParams.id}`,
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
        JSON.parse(JSON.stringify(feedbackContent)),
      ),
    {
      onSuccess: () => {
        alert('피드백이 삭제되었습니다.')
        refetchFeedDetail()
        setIsLoading(false)
      },
    },
  )

  const [activeTab, setActiveTab] = useState(0)

  return (
    <Fragment>
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
            <li className="nav-item flex-1">
              <button
                className={`nav-link w-full py-2 ${
                  tab === feedDetail?.qnaList.length && 'active'
                }`}
                onClick={() => setTab(feedDetail?.qnaList.length)}
              >
                탐구 활동 증빙 자료
              </button>
            </li>
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
                      {content[index]
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
                  {item.feedbackList?.map((items) => (
                    <FeedbackList
                      key={`feed-${items.id}`}
                      item={items}
                      setIsModal={setIsModal}
                      setFeedbackParams={setFeedbackParams}
                      setFeedbackModParams={setFeedbackModParams}
                      removeFeedback={removeFeedback}
                      setFeedbackContent={setFeedbackContent}
                      content={content[index]}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div
            className={`tab-pane leading-relaxed p-5 ${
              tab === feedDetail?.qnaList.length && 'active'
            }`}
          >
            {/* 1번 테이블 */}
            {feedDetail?.activityList?.map((item, index) => (
              <Fragment key={`activity-${item.id}`}>
                <div className="intro-y grid grid-cols-12 gap-6 mt-5">
                  <div className="col-span-8">
                    <div className="flex justify-end">
                      <button
                        className="btn btn-green btn-sm"
                        onClick={() => {
                          feedbackStart(item.id, true, item.content)
                        }}
                      >
                        피드백
                      </button>
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
                          setActiveTab(index)
                        }}
                      >
                        히스토리 보기
                      </button>
                    </div>
                  </div>
                </div>
                <div className="intro-y grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <table className="table table-bordered mt-3">
                      <tbody>
                        <tr>
                          <td className="bg-slate-100">연번</td>
                          <td className="bg-slate-100">증빙 자료 유형</td>
                          <td className="bg-slate-100">제작 연월일</td>
                          <td className="bg-slate-100  w-96">제목</td>
                        </tr>
                        <tr>
                          <td className="bg-slate-100">{index + 1}</td>
                          <td>-</td>
                          <td>
                            {dayjs(item.productAt).format('YYYY년 M월 D일')}
                          </td>
                          <td>{item.title}</td>
                        </tr>
                        <tr>
                          <td className="bg-slate-100">첨부파일</td>
                          <td colSpan={4}>
                            {item.fileName ? (
                              <div className="flex items-center">
                                <div className="w-full">
                                  파일명: {item.fileName}
                                </div>
                                <div className="ml-auto">
                                  <a
                                    href={`${baseUrl}/v1/contents-data/file-download/${item.fileId}`}
                                    className="btn btn-primary w-20 btn-sm"
                                  >
                                    다운로드
                                  </a>
                                </div>
                              </div>
                            ) : (
                              '파일없음'
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan={3} className="bg-slate-100">
                            내용
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4}>
                            <p className="btn btn-sm btn-secondary">
                              증빙 자료에 대한 요약설명(*띄어쓰기를 포함하여
                              200자 이내)
                            </p>
                            {/* <div className="mt-3">{item.content}</div> */}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="flex items-center">
                              <div className="btn mr-2">글자 수</div>
                              <div className="mr-10">
                                ({item.content?.length} / 200)
                              </div>
                              <div className="btn mr-2">최종 수정일</div>
                              <div className="">
                                {dayjs(item.modDate).format('YYYY년 M월 D일')}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-span-4">
                    {item.feedbackList?.map((item) => (
                      <FeedbackList
                        key={`feed-${item.id}`}
                        item={item}
                        setIsModal={setIsModal}
                        setFeedbackParams={setFeedbackParams}
                        setFeedbackModParams={setFeedbackModParams}
                        removeFeedback={removeFeedback}
                      />
                    ))}
                    {/* <div className="bg-slate-100 p-5 rounded-md mt-3 outline_red relative">
            <div className="font-bold text-slate-500">피드백</div>
            <div className="mt-3">피드백 내용 출력</div>
            <button className="btn bg-white w-full btn-sm mt-3">수정</button>
          </div> */}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
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
          </div> */}
          {(tab === feedDetail?.qnaList.length
            ? Object.entries(
                feedDetail?.activityList[activeTab].feedbackHistory,
              )
            : Object.entries(feedDetail?.qnaList[tab]?.feedbackHistory)
          ).map(([key, value]) => (
            <Fragment key={value[0].id}>
              {value.reverse().map((item, index) => (
                <Fragment key={index}>
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

                  <div className="p-3 border rounded-md ml-12 bg-slate-100 text-right">
                    <div>{item.reply}</div>
                    <div className="flex justify-end mt-3">
                      <span className="font-medium mr-2 text-sm">
                        {item.teacherName} 선생님 피드백
                      </span>
                      <span className="text-slate-400 text-sm">
                        {item.creDate}
                      </span>
                    </div>
                  </div>
                </Fragment>
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
            // onClick={feedbackStore}
            onClick={() => {
              if (tab == feedDetail?.qnaList.length) {
                // 탐구활동
                feedbackStoreActive()
              } else {
                feedbackStore()
              }
            }}
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
              if (tab === feedDetail?.qnaList.length) {
                updateFeedback2()
              } else {
                updateFeedback()
              }
            }}
          >
            저장하기
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 피드백 수정 팝업 */}
    </Fragment>
  )
}

const FeedbackList = ({
  setFeedbackParams,
  setFeedbackModParams,
  removeFeedback,
  setIsModal,
  item,
  setFeedbackContent,
  content,
}) => {
  return (
    <div
      className="bg-slate-100 p-5 rounded-md mt-3 outline_red relative"
      style={{ borderColor: item.color }}
    >
      <div className="absolute x_button">
        <button
          className="btn bg-white rounded-full hover:bg-danger hover:text-white p-1"
          onClick={() => {
            if (confirm('선택하신 피드백을 삭제하시겠습니까?')) {
              // setFeedbackParams({
              //   color: item.color,
              //   // tab,
              // })
              setFeedbackContent({
                // content: JSON.stringify(content),
                content: content,
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
        <div>피드백 {item.id}</div>
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
  )
}

export default FeedViewQuestion
