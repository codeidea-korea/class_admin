import { Lucide, Modal, ModalBody } from '@/base-components'
import {Link, useParams, useSearchParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Default_img from '@/assets/images/default_image.jpg'
import {useQuery} from "react-query";
import request from "@/utils/request";

function ClassVideoView() {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL;
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [video, videoDetail] = useState(['',false]);
  const [videoSrc, setVideoSrc] = useState('');

  const { data: classVideoDetail, isLoading: loading } = useQuery(
    'getClassVideoDetail',
    () => request.get(`/admin/content-management/class-video/${id}`),
    {
      onSuccess: (data) => {

      },
    },
  )

  return (
    <>
      { !loading &&
      <>
        <div className="intro-y box mt-5">
          <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
            <div className="text-lg font-medium flex items-center">
              영재학교
              <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
              {searchParams.get('subject')}
            </div>
          </div>
          <div className="intro-y p-5">
            <div className="bg-slate-50 flex p-5 gap-6 w-1/2">
              <div className="profile_img">
                {classVideoDetail[0]?.profileId ? (
                  <img
                    src={`${baseUrl}/v1/contents-data/file-download/${classVideoDetail[0]?.profileId}`}
                    className="rounded-md"
                  />
                ) : (
                  <img src={Default_img} className="rounded-md" />
                )}
              </div>
              <div className="w-full flex flex-col gap-6">
                <div className="text-lg font-medium flex items-center">
                  {classVideoDetail[0]?.teacher_name} 선생님
                  <span className="bg-white border outline-secondary p-1 rounded-full text-sm w-16 text-center block ml-3">
                  {classVideoDetail[0]?.teacher_subject}
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box p-5 mt-5">
          <table className="table table-hover">
            <thead>
            <tr className="bg-slate-100 text-center">
              <td className="">차시</td>
              <td>수업구분</td>
              <td>수업일자</td>
              <td>단원</td>
              <td>학습내용</td>
              <td>영상학습</td>
              <td>학습자료</td>
            </tr>
            </thead>
            <tbody>
            {classVideoDetail[0]?.classVideoScheduleResponseList?.map((item) => (
              <tr className="text-center" key={`classVideo-${item.id}`}>
                <td>{item.order_number}</td>
                <td>{item.gubun}</td>
                <td>{item.cdate}</td>
                <td>{item.unit}</td>
                <td className="text-left">{item.content}</td>
                <td>
                  <div className="flex justify-center">
                    <button
                      className="btn btn-outline-primary flex items-center gap-2"
                      onClick={() => {
                        videoDetail([item.link_url?.replace('/watch?v=', '/embed/'), true])
                      }}
                    >
                      <Lucide icon="Video" className="w-4 h-4"></Lucide>
                      영상보기
                    </button>
                  </div>
                </td>
                <td>
                  {item?.fileId &&
                    <div className="flex justify-center">
                      <a
                        className="btn btn-outline-pending flex items-center gap-2"
                        href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item?.fileId}`}
                        download
                      >
                        <Lucide icon="File" className="w-4 h-4"></Lucide>
                        학습자료
                      </a>
                    </div>
                  }
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <div className="flex mt-3">
            <button className="btn btn-outline-danger w-24">삭제</button>
            <div className="flex gap-2 ml-auto">
              <Link to="/classVideo">
                <button className="btn bg-white w-24">목록</button>
              </Link>
              <Link to={`/classVideo/edit/${id}?subject=${searchParams.get('subject')}`}>
                <button className="btn btn-sky w-24">수정하기</button>
              </Link>
            </div>
          </div>
        </div>
      </>
      }

      {/* BEGIN: Modal 영상보기 */}
      <Modal
        size="modal-xl"
        backdrop=""
        show={video[1]}
        onHidden={() => {
          videoDetail([0,false])
        }}
      >
        <ModalBody className="video_frame">
          <button
            className="video_x"
            onClick={() => {
              videoDetail([0,false])
            }}
          >
            <Lucide icon="X" className="w-8 h-8 text-white" />
          </button>
          <iframe
            src={video[0]}
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

export default ClassVideoView
