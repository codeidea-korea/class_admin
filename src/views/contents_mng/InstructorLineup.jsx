import { useEffect, useReducer, useState } from 'react'
import { Lucide, Modal, ModalBody } from '@/base-components'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useQuery } from 'react-query'
import request from '@/utils/request'

const InstructorLineup = () => {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL
  const [subId, setSubId] = useState('MATH_OLYMPIAD')
  const [pageParams, setPageParams] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    pageRangeDisplayed: 9999,
  })

  // 리스트 가져오기
  const {
    data: instructorLineup,
    isLoading: isInstructorLineup,
    refetch: refetchInstructorLineup,
  } = useQuery(
    'getPriorQuestion',
    () =>
      request.get(`/admin/content-management/instructor-lineup`, {
        params: {
          page: pageParams.currentPage,
          limit: pageParams.pageRangeDisplayed,
        },
      }),
    {
      onSuccess: (data) => {
      },
    },
  )

  // 비디오 영상 모달
  const [state, setState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    isVideo: false,
    video: '',
  })

  // 페이지네이션 클릭
  const handlePageClick = () => {
  }

  useEffect(() => {
    refetchInstructorLineup()
  }, [subId])

  return (
    <>
      <div className='intro-y box mt-5 relative'>
        <div className='p-5'>
          <div className='flex items-center gap-3'>
            <div className='flex ml-auto gap-2'>
              <Link to={`/instructor_lineup/edit`}>
                <button className='btn btn-sky w-24'>수정</button>
              </Link>
            </div>
          </div>
          <table className='table table-hover mt-5'>
            <thead>
            <tr className='bg-slate-100 text-center'>
              <td>번호</td>
              <td>과목</td>
              <td>이름</td>
              <td>강사 유형</td>
              <td>프로필 이미지</td>
            </tr>
            </thead>
            <tbody>
            {instructorLineup?.length > 0 ? (
              instructorLineup?.map((item, index) => (
                <tr className='text-center' key={index}>
                  <td>{instructorLineup?.length - index}</td>
                  <td>{item.subject}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>
                    <div className='flex justify-center'>
                      {item.profileId && item.profileId > 0 && (
                        <a
                          href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item.profileId}`}
                        >
                          <button
                            type={'button'}
                            className='btn btn-outline-pending flex items-center gap-2'
                          >
                            <Lucide icon='File' className='w-4 h-4'></Lucide>
                            이미지 보기
                          </button>
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='text-center'>
                <td colSpan={5}>데이터가 존재하지 않습니다.</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>

        {/* BEGIN: Modal 영상보기 */}
        <Modal
          size='modal-xl'
          backdrop=''
          show={state.isVideo}
          onHidden={() => {
            setState({
              isVideo: false,
            })
          }}
        >
          <ModalBody className='video_frame relative'>
            <button
              className='video_x'
              onClick={() => {
                setState({
                  isVideo: false,
                })
              }}
            >
              <Lucide icon='X' className='w-8 h-8 text-white' />
            </button>
            <iframe
              src={state.video}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          </ModalBody>
        </Modal>
        {/* END: Modal 영상보기 */}
      </div>
    </>
  )
}
export default InstructorLineup
