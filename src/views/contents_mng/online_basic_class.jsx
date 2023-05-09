import { useReducer } from 'react'
import {
  Lucide,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/base-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import request from '@/utils/request'
import Loading from '@/components/loading'

function OnlinebasicClass() {
  // 비디오 영상 모달
  const [video, videoDetail] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      modal: false,
      url: '',
    },
  )
  const { getValues, watch, reset, register } = useForm({
    defaultValues: {
      id: '',
      field_name: '',
      subject: '',
      youtube: 'https://www.youtube.com/watch?v=IB5bcf_tMVE',
    },
  })

  // 과목추가하기 모달
  const [SubjectsAdd, SubjectsAddDetail] = useState(false)

  const {
    data: basicClassSubject,
    isLoading: isBasicClassSubject,
    refetch: refetchBasicClassSubject,
  } = useQuery(
    'getBasicClassSubject',
    () =>
      request.get(`/admin/content-management/basic-class-subject`, {
        params: {
          fieldName: '영재학교',
        },
      }),
    {
      onSuccess: (data) => {
        reset({ id: data[0].id, subject: data[0].subject })
      },
    },
  )
  const {
    data: basicClass,
    isLoading: isBasicClassm,
    refetch: refetchBasicClass,
  } = useQuery(
    ['getBasicClass', getValues('id')],
    () =>
      request.get(`/admin/content-management/basic-class/${getValues('id')}`),
    {
      enabled: !!getValues('id'),
    },
  )

  const { mutate: addClassSubject, isLoading: isAddClassSubject } = useMutation(
    (data) =>
      request.post(`/admin/content-management/basic-class-subject`, data),
    {
      onSuccess: () => {
        refetchBasicClassSubject()
      },
    },
  )

  const { mutate: deleteClassSubject, isLoading: isDeleteClassSubject } =
    useMutation(
      (id) =>
        request.delete(`/admin/content-management/basic-class-subject/${id}`),
      {
        onSuccess: () => {
          refetchBasicClassSubject()
          alert('삭제되였습니다.')
        },
      },
    )

  return (
    <>
      <div className="flex gap-2 mt-5">
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          영재원
        </button>
        <Link to="/online_basic_class">
          <button className="btn btn-primary w-36">영재학교</button>
        </Link>
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          과학고
        </button>
      </div>
      <div className="intro-y box mt-5 relative">
        {(isBasicClassSubject || isBasicClassm) && <Loading />}
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div>과목:</div>
            <select
              className="form-control w-40"
              onChange={(e) => {
                reset({
                  id: e.target.value,
                  subject: basicClassSubject.find(
                    (item) => item.id === Number(e.target.value),
                  ).subject,
                })
              }}
            >
              {basicClassSubject?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.subject}
                </option>
              ))}
            </select>

            <button
              className="btn btn-outline-primary border-dotted"
              onClick={() => {
                SubjectsAddDetail(true)
              }}
            >
              <Lucide icon="Plus" className="w-4 h-4"></Lucide>
            </button>

            <div className="flex ml-auto gap-2">
              <button
                className="btn btn-danger w-24"
                onClick={() => {
                  if (confirm('과목을 삭제하시겠습니까?')) {
                    deleteClassSubject(getValues('id'))
                  }
                }}
              >
                과목삭제
              </button>
              <Link
                to={`/online_basic_class_form/${getValues(
                  'id',
                )}?subject=${getValues('subject')}`}
              >
                <button className="btn btn-sky w-24">수정</button>
              </Link>
            </div>
          </div>

          <table className="table table-hover mt-5">
            <thead>
              <tr className="bg-slate-100 text-center">
                <td className="">번호</td>
                <td>수업구분</td>
                <td>단원</td>
                <td>학습내용</td>
                <td>영상학습</td>
                <td>학습자료</td>
              </tr>
            </thead>
            <tbody>
              {basicClass?.map((item, index) => (
                <tr className="text-center" key={`basicClass-${item.row_id}`}>
                  <td>{index + 1}</td>
                  <td>{item.gubun}</td>
                  <td>{item.unit}</td>
                  <td className="text-left">{item.content}</td>
                  <td>
                    <div className="flex justify-center">
                      <button
                        className="btn btn-outline-primary flex items-center gap-2"
                        onClick={() => {
                          videoDetail({
                            modal: true,
                            url: item.link_url,
                          })
                        }}
                      >
                        <Lucide icon="Video" className="w-4 h-4"></Lucide>
                        영상보기
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <Link
                        to={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item.fileId}`}
                      >
                        <button className="btn btn-outline-pending flex items-center gap-2">
                          <Lucide icon="File" className="w-4 h-4"></Lucide>
                          학습자료
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BEGIN: Modal 영상보기 */}
      <Modal
        size="modal-xl"
        backdrop=""
        show={video.modal}
        onHidden={() => {
          videoDetail({
            modal: false,
          })
        }}
      >
        <ModalBody className="video_frame relative">
          {isDeleteClassSubject && <Loading />}
          <button
            className="video_x"
            onClick={() => {
              videoDetail({
                modal: false,
              })
            }}
          >
            <Lucide icon="X" className="w-8 h-8 text-white" />
          </button>
          <iframe
            src={video.url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </ModalBody>
      </Modal>
      {/* END: Modal 영상보기 */}

      {/* BEGIN: Modal 과목추가하기 */}
      <Modal
        show={SubjectsAdd}
        onHidden={() => {
          SubjectsAddDetail(false)
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">과목 추가하기</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              SubjectsAddDetail(false)
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center">
            <div className="w-16 shrink-0">과목</div>
            <input
              type="text"
              className="form-control w-full"
              {...register('subject')}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => {
              SubjectsAddDetail(false)
            }}
          >
            취소
          </button>
          <button
            type="button"
            className="btn btn-sky w-24"
            onClick={() =>
              addClassSubject({
                field_name: '영재학교',
                subject: getValues('subject'),
              })
            }
          >
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 과목추가하기 */}
    </>
  )
}

export default OnlinebasicClass
