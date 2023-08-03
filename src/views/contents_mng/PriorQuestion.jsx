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
import { useQuery } from 'react-query'
import request from '@/utils/request'
import { useForm } from 'react-hook-form'

const PriorQuestion = () => {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL
  const [pageParams, setPageParams] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    pageRangeDisplayed: 9999,
  })

  // 리스트 가져오기
  const {
    data: priorQuestion,
    isLoading: isPriorQuestion,
    refetch: refetchPriorQuestion,
  } = useQuery(
    'getPriorQuestion',
    () =>
      request.get(`/admin/content-management/prior-question`, {
        params: {
          page: pageParams.currentPage,
          limit: pageParams.pageRangeDisplayed,
        },
      }),
    {
      onSuccess: (data) => {
        setPageParams({ ...pageParams, totalPages: data.totalPages, totalElements: data.totalElements })
      },
    },
  )

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
            {priorQuestion?.content?.length > 0 ? (
              priorQuestion?.content?.map((item, index) => (
                <tr className="text-center" key={index}>
                  <td>{item.id}</td>
                  <td>{item.year}</td>
                  <td>{item.schoolName}</td>
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
                      <button
                        className="btn btn-outline-primary flex items-center gap-2"
                        onClick={
                        () => {
                          (item.linkUrl && item.linkUrl.includes('/watch?v='))
                            ? setState({
                              isVideo: true,
                              video: item.linkUrl.replace('/watch?v=', '/embed/'),
                            })
                            : alert('영상이 존재하지 않습니다.')
                          }
                        }
                      >
                        <Lucide icon="Video" className="w-4 h-4"></Lucide>
                        영상보기
                      </button>
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
          {/*<div className="mt-5 flex items-center justify-center">*/}
          {/*  <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">*/}
          {/*    <nav className="w-full sm:w-auto sm:mr-auto">*/}
          {/*      <ReactPaginate*/}
          {/*        className={'pagination justify-center'}*/}
          {/*        pageClassName={'page-item'}*/}
          {/*        pageLinkClassName={'page-link'}*/}
          {/*        breakLinkClassName={'page-item'}*/}
          {/*        breakLabel="..."*/}
          {/*        nextClassName={'page-item'}*/}
          {/*        nextLinkClassName={'page-link'}*/}
          {/*        nextLabel={<ChevronRight className="w-4 h-4" />}*/}
          {/*        previousClassName={'page-item'}*/}
          {/*        previousLinkClassName={'page-link'}*/}
          {/*        onPageChange={handlePageClick}*/}
          {/*        previousLabel={<ChevronLeft className="w-4 h-4" />}*/}
          {/*        activeClassName={'page-item active'}*/}
          {/*        // pageRangeDisplayed={pageParams.pageRangeDisplayed}*/}
          {/*        pageRangeDisplayed={'10'}*/}
          {/*        // pageCount={pageParams.totalPages}*/}
          {/*        pageCount={'3'}*/}
          {/*        renderOnZeroPageCount={(props) => null}*/}
          {/*      />*/}
          {/*    </nav>*/}
          {/*  </div>*/}
          {/*</div>*/}
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
