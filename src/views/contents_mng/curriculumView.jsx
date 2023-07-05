import {
  Lucide,
  Modal,
  ModalBody,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@/base-components'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Default_img from '@/assets/images/default_image.jpg'
import request from '@/utils/request'

function CurriCulumView() {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL;
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [video, videoDetail] = useState(false);

  const { data: curriculumDetail } = useQuery('getCurriculum', () =>
    request.get(`/admin/content-management/curriculum/${id}`),
  )

  return (
    <>
      <TabGroup>
        <div className="intro-y box mt-5">
          <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
            <div className="text-lg font-medium flex items-center">
              영재학교
              <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
              {searchParams.get('subject')}
            </div>
          </div>
          <div className="intro-y p-5">
            <div className="bg-slate-50 flex items-center p-5 gap-6 w-1/2">
              <div className="profile_img">
                {curriculumDetail?.teachers?.profileId ? (
                  <img
                    src={`${baseUrl}/v1/contents-data/file-download/${curriculumDetail?.teachers?.profileId}`}
                    className="rounded-md"
                  />
                ) : (
                  <img src={Default_img} className="rounded-md" />
                )}
              </div>
              <div className="w-full flex flex-col gap-6">
                <div className="text-lg font-medium flex items-center">
                  {curriculumDetail?.teachers?.teacher_name} 선생님
                  <span className="bg-white border outline-secondary p-1 rounded-full text-sm w-16 text-center block ml-3">
                    {curriculumDetail?.teachers?.teacher_subject}
                  </span>
                </div>
                <button
                  className="btn btn-sky w-44 rounded-full"
                  onClick={() => {
                    videoDetail(true)
                  }}
                >
                  학습 전략 영상 보기
                  <Lucide icon="ChevronRight" className="w-4 h-4"></Lucide>
                </button>
                <TabList className="nav-boxed-tabs gap-3 w-full ">
                  <Tab
                    className="w-full py-2 bg-white border border-slate-200"
                    tag="button"
                  >
                    주중 수업 상세 커리큘럼
                  </Tab>
                  <Tab
                    className="w-full py-2 bg-white border border-slate-200"
                    tag="button"
                  >
                    주말 수업 상세 커리큘럼
                  </Tab>
                </TabList>
              </div>
            </div>
          </div>
        </div>
        <TabPanels className="intro-y mt-5">
          <TabPanel className="leading-relaxed">
            <div className="box p-5 ">
              <table className="table table-hover">
                <thead>
                <tr className="bg-slate-100 text-center">
                  <td className=" w-16">월</td>
                  <td>차시</td>
                  <td>교재</td>
                  <td>학습목표</td>
                  <td>학습 단원 및 내용</td>
                </tr>
                </thead>
                <tbody>
                {curriculumDetail?.scheduleWeeks?.map((item) => (
                  <tr
                    className="text-center"
                    key={`scheduleWeeks-${item.id}`}
                  >
                    <td>{item.month}월</td>
                    <td>{item.order_number}차시</td>
                    <td>{item.textbook}</td>
                    <td>{item.objective}</td>
                    <td>{item.content}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              <div className="flex mt-3">
                {/*<button className="btn btn-outline-danger w-24">삭제</button>*/}
                <div className="flex gap-2 ml-auto">
                  <Link to="/curriculum">
                    <button className="btn bg-white w-24">목록</button>
                  </Link>
                  <Link to={`/curriculum/edit/${id}?subject=${searchParams.get('subject')}`}>
                    <button className="btn btn-sky w-24">수정하기</button>
                  </Link>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="leading-relaxed">
            <div className="box p-5 ">
              <table className="table table-hover">
                <thead>
                <tr className="bg-slate-100 text-center">
                  <td className=" w-16">월</td>
                  <td>차시</td>
                  <td>교재</td>
                  <td>학습목표</td>
                  <td>학습 단원 및 내용</td>
                </tr>
                </thead>
                <tbody>
                {curriculumDetail?.scheduleWeekends?.map((item) => (
                  <tr
                    className="text-center"
                    key={`scheduleWeeks-${item.id}`}
                  >
                    <td>{item.month}월</td>
                    <td>{item.order_number}차시</td>
                    <td>{item.textbook}</td>
                    <td>{item.objective}</td>
                    <td>{item.content}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              <div className="flex mt-3">
                {/*<button className="btn btn-outline-danger w-24">삭제</button>*/}
                <div className="flex gap-2 ml-auto">
                  <Link to="/curriculum">
                    <button className="btn bg-white w-24">목록</button>
                  </Link>
                  <Link to={`/curriculum/edit/${id}?subject=${searchParams.get('subject')}`}>
                    <button className="btn btn-sky w-24">수정하기</button>
                  </Link>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* BEGIN: Modal 영상보기 */}
      <Modal
        size="modal-xl"
        backdrop=""
        show={video}
        onHidden={() => {
          videoDetail(false)
        }}
      >
        <ModalBody className="video_frame">
          <button
            className="video_x"
            onClick={() => {
              videoDetail(false)
            }}
          >
            <Lucide icon="X" className="w-8 h-8 text-white" />
          </button>
          <iframe
            src={curriculumDetail?.teachers?.teacher_url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </ModalBody>
      </Modal>
      {/* END: Modal 영상보기 */}
    </>
  )
}

export default CurriCulumView
