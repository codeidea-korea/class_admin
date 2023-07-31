import { useEffect, useReducer, useState } from 'react'
import { Lucide, Modal, ModalBody } from '@/base-components'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import useAxios from '@/hooks/useAxios'

const ReadOnline = () => {
  const readCurTab = sessionStorage.getItem('readCurTab') == null ? 'EDU_GIFTED' : sessionStorage.getItem('readCurTab')
  const [listLength, setListLength] = useState(0)
  const api = useAxios()
  const user = useRecoilValue(userState)
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL

  const [data, setData] = useState([])
  const [pageParams, setPageParams] = useState({
    totalPages: 0, totalElements: 0, currentPage: 1, pageRangeDisplayed: 99,
  })

  // 비디오 영상 모달
  const [state, setState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    isVideo: false,
    video: '',
  })

  // 탭 이동
  const [curTab, setCurTab] = useState(readCurTab)

  // 페이지네이션 클릭
  const handlePageClick = (event) => {
    setPageParams({ ...pageParams, currentPage: (event.selected + 1) })
  }

  const getDataList = () => {
    api.get(`/admin/content-management/study-material?divideType=${curTab}&page=${pageParams.currentPage}&limit=${pageParams.pageRangeDisplayed}`,
      { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.content)
          setPageParams({ ...pageParams, totalPages: res.data.totalPages, totalElements: res.data.totalElements })
          setListLength(Number(res.data.totalElements) - ((pageParams.currentPage - 1) * 10))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDataList()
  }, [curTab, pageParams.currentPage])

  return (<>
    <div className='flex gap-2 mt-5'>
      <button className={'btn w-32 ' + (curTab === 'EDU_GIFTED' ? 'btn-primary' : 'bg-white')}
              onClick={() => {
                setCurTab('EDU_GIFTED')
                sessionStorage.setItem('readCurTab', 'EDU_GIFTED');
              }
              }>영재원
      </button>
      <button className={'btn w-32 ' + (curTab === 'SCIENCE' ? 'btn-primary' : 'bg-white')}
              onClick={() => {
                setCurTab('SCIENCE')
                sessionStorage.setItem('readCurTab', 'SCIENCE');
              }
              }>과학고
      </button>
    </div>
    <div className='intro-y box mt-5 relative'>
      <div className='p-5'>
        <div className='flex items-center gap-3'>
          <div className='flex ml-auto gap-2'>
            <Link to={`/read_online/edit?curTab=${curTab}`}>
              <button className='btn btn-sky w-24'>수정</button>
            </Link>
          </div>
        </div>
        <table className='table table-hover mt-5'>
          <thead>
          <tr className='bg-slate-100 text-center'>
            <td>번호</td>
            <td>관련과목</td>
            <td>제목</td>
            <td>관련 추천 영상</td>
            <td>읽기자료</td>
          </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
            <tr className='text-center' key={index}>
              <td>{listLength - index}</td>
              <td>{item.subjectName}</td>
              <td>{item.title}</td>
              <td>
                <div className='flex justify-center'>
                  {
                    (item?.video && item?.video?.includes('/watch?v=')) &&
                    <button
                      className='btn btn-outline-primary flex items-center gap-2'
                      onClick={() => {
                        setState({
                          isVideo: true,
                          video: item.video.replace('/watch?v=', '/embed/'),
                        })
                      }}
                    >
                      <Lucide icon='Video' className='w-4 h-4'></Lucide>
                      영상보기
                    </button>
                  }
                </div>
              </td>
              <td>
                <div className='flex justify-center'>
                  {
                    (item.fileId && item.fileId > 0) &&
                    <a href={`${baseUrl}/v1/contents-data/file-download/${item.fileId}`}>
                      <button type={'button'} className='btn btn-outline-pending flex items-center gap-2'>
                        <Lucide icon='File' className='w-4 h-4'></Lucide>
                        학습자료
                      </button>
                    </a>
                  }
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        {/*<div className='mt-5 flex items-center justify-center'>
          <div className='intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center'>
            <nav className='w-full sm:w-auto sm:mr-auto'>
              <ReactPaginate
                className={'pagination justify-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                breakLinkClassName={'page-item'}
                breakLabel='...'
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextLabel={<ChevronRight className='w-4 h-4' />}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                onPageChange={handlePageClick}
                previousLabel={<ChevronLeft className='w-4 h-4' />}
                activeClassName={'page-item active'}
                pageRangeDisplayed={pageParams.pageRangeDisplayed}
                pageCount={pageParams.totalPages}
                renderOnZeroPageCount={props => null}
              />
            </nav>
          </div>
        </div>*/}
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
  </>)
}
export default ReadOnline