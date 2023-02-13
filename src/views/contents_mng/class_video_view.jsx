import { Lucide, Modal, ModalBody } from "@/base-components";
import { Link } from "react-router-dom";
import { useState } from "react";

function ClassVideoView() {
  // 비디오 영상 모달
  const [video, videoDetail] = useState(false);

  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium flex items-center">
            영재학교
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            수학
          </div>
        </div>
        <div className="intro-y p-5">
          <div className="bg-slate-50 flex p-5 gap-6 w-1/2">
            <div className="profile_img">
              <img
                src="./src/assets/images/pubimg/default_image.jpg"
                className="rounded-md"
              />
            </div>
            <div className="w-full flex flex-col gap-6">
              <div className="text-lg font-medium flex items-center">
                박진우 선생님
                <span className="bg-white border outline-secondary p-1 rounded-full text-sm w-16 text-center block ml-3">
                  수학
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box p-5 mt-5">
        <table className="table table-hover">
          <tr className="bg-slate-100 text-center">
            <td className="">번호</td>
            <td>수업구분</td>
            <td>수업일자</td>
            <td>단원</td>
            <td>학습내용</td>
            <td>영상학습</td>
            <td>학습자료</td>
          </tr>
          <tr className="text-center">
            <td>1</td>
            <td>주중 B반</td>
            <td>1월 3일(화)</td>
            <td>물질의 상태</td>
            <td className="text-left">
              물질, 물질의 상태, 물의 특이한 상태변화, 물의 가열 곡선
            </td>
            <td>
              <div className="flex justify-center">
                <button
                  className="btn btn-outline-primary flex items-center gap-2"
                  onClick={() => {
                    videoDetail(true);
                  }}
                >
                  <Lucide icon="Video" className="w-4 h-4"></Lucide>
                  영상보기
                </button>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <button className="btn btn-outline-pending flex items-center gap-2">
                  <Lucide icon="File" className="w-4 h-4"></Lucide>
                  학습자료
                </button>
              </div>
            </td>
          </tr>
          <tr className="text-center">
            <td>1</td>
            <td>주중 B반</td>
            <td>1월 3일(화)</td>
            <td>물질의 상태</td>
            <td className="text-left">
              물질, 물질의 상태, 물의 특이한 상태변화, 물의 가열 곡선
            </td>
            <td>
              <div className="flex justify-center">
                <button
                  className="btn btn-outline-primary flex items-center gap-2"
                  onClick={() => {
                    videoDetail(true);
                  }}
                >
                  <Lucide icon="Video" className="w-4 h-4"></Lucide>
                  영상보기
                </button>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <button className="btn btn-outline-pending flex items-center gap-2">
                  <Lucide icon="File" className="w-4 h-4"></Lucide>
                  학습자료
                </button>
              </div>
            </td>
          </tr>
        </table>
        <div className="flex mt-3">
          <button className="btn btn-outline-danger w-24">삭제</button>
          <div className="flex gap-2 ml-auto">
            <Link to="/class_video">
              <button className="btn bg-white w-24">목록</button>
            </Link>
            <Link to="/class_video_form">
              <button className="btn btn-sky w-24">수정하기</button>
            </Link>
          </div>
        </div>
      </div>

      {/* BEGIN: Modal 영상보기 */}
      <Modal
        size="modal-xl"
        backdrop=""
        show={video}
        onHidden={() => {
          videoDetail(false);
        }}
      >
        <ModalBody className="video_frame">
          <button
            className="video_x"
            onClick={() => {
              videoDetail(false);
            }}
          >
            <Lucide icon="X" className="w-8 h-8 text-white" />
          </button>
          <iframe
            src="https://www.youtube.com/embed/IB5bcf_tMVE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </ModalBody>
      </Modal>
      {/* END: Modal 영상보기 */}
    </>
  );
}

export default ClassVideoView;
