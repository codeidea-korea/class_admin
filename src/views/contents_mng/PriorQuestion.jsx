import { useEffect, useReducer, useState } from 'react'
import {
  Lucide,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/base-components'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PriorQuestion = () => {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL
  const [data, setData] = useState([
    {
      rowId: 1,
      year: '2022',
      title: '부산과학고',
      link_url: 'https://youtube.com/watch?v=rUpaFIOoCY0',
      fileId: '',
    },
    {
      rowId: 2,
      year: '2022',
      title: '부산일 과학고',
      link_url: '',
      fileId: '478',
    },
    {
      rowId: 3,
      year: '2021',
      title: '부산과학고',
      link_url: 'https://youtube.com/watch?v=rUpaFIOoCY0',
      fileId: '',
    },
    {
      rowId: 4,
      year: '2021',
      title: '부산일 과학고',
      link_url: '',
      fileId: '478',
    },
  ])

  // 비디오 영상 모달
  const [state, setState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    isVideo: false,
    video: '',
  })

  // 페이지네이션 클릭
  const handlePageClick = () => {}

  return (
    <>
      <div className="intro-y box mt-5 relative">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex ml-auto gap-2">
              <Link to="/prior_question/edit">
                <button className="btn btn-sky w-24">수정</button>
              </Link>
            </div>
          </div>
          <table className="table table-hover mt-5">
            <thead>
              <tr className="bg-slate-100 text-center">
                <td>번호</td>
                <td>년도</td>
                <td>과학고등학교</td>
                <td>기출문제</td>
                <td>풀이영상</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="text-center" key={index}>
                  <td>{item.rowId}</td>
                  <td>{item.year}</td>
                  <td>{item.title}</td>
                  <td>
                    <div className="flex justify-center">
                      {item.fileId && item.fileId > 0 && (
                        <a
                          href={`${baseUrl}/v1/contents-data/file-download/${item.fileId}`}
                        >
                          <button
                            type={'button'}
                            className="btn btn-outline-pending flex items-center gap-2"
                          >
                            <Lucide icon="File" className="w-4 h-4"></Lucide>
                            자료보기
                          </button>
                        </a>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      {item?.link_url &&
                        item?.link_url?.includes('/watch?v=') && (
                          <button
                            className="btn btn-outline-primary flex items-center gap-2"
                            onClick={() => {
                              setState({
                                isVideo: true,
                                video: item.link_url.replace(
                                  '/watch?v=',
                                  '/embed/',
                                ),
                              })
                            }}
                          >
                            <Lucide icon="Video" className="w-4 h-4"></Lucide>
                            영상보기
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5 flex items-center justify-center">
            <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
              <nav className="w-full sm:w-auto sm:mr-auto">
                <ReactPaginate
                  className={'pagination justify-center'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  breakLinkClassName={'page-item'}
                  breakLabel="..."
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  nextLabel={<ChevronRight className="w-4 h-4" />}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  onPageChange={handlePageClick}
                  previousLabel={<ChevronLeft className="w-4 h-4" />}
                  activeClassName={'page-item active'}
                  // pageRangeDisplayed={pageParams.pageRangeDisplayed}
                  pageRangeDisplayed={'10'}
                  // pageCount={pageParams.totalPages}
                  pageCount={'3'}
                  renderOnZeroPageCount={(props) => null}
                />
              </nav>
            </div>
          </div>
        </div>

        {/* BEGIN: Modal 영상보기 */}
        <Modal
          size="modal-xl"
          backdrop=""
          show={state.isVideo}
          onHidden={() => {
            setState({
              isVideo: false,
            })
          }}
        >
          <ModalBody className="video_frame relative">
            <button
              className="video_x"
              onClick={() => {
                setState({
                  isVideo: false,
                })
              }}
            >
              <Lucide icon="X" className="w-8 h-8 text-white" />
            </button>
            <iframe
              src={state.video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </ModalBody>
        </Modal>
        {/* END: Modal 영상보기 */}
      </div>
    </>
  )
}
export default PriorQuestion
