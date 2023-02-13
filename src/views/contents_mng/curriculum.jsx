import { Lucide, Modal, ModalBody } from "@/base-components";
import { Link } from "react-router-dom";
import { useState } from "react";

import Default_img from "@/assets/images/default_image.jpg";
import Person from "@/assets/images/img02.png";

function CurriCulum() {
  // 비디오 영상 모달
  const [video, videoDetail] = useState(false);

  return (
    <>
      <div className="flex gap-2 mt-5">
        <button
          className="btn bg-white w-36"
          onClick={() => alert("준비중입니다.")}
        >
          영재원
        </button>
        <Link to="/curriculum">
          <button className="btn btn-primary w-36">영재학교</button>
        </Link>
        <button
          className="btn bg-white w-36"
          onClick={() => alert("준비중입니다.")}
        >
          과학고
        </button>
      </div>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">수학(Mathmetic)</div>
        </div>
        <div className="intro-y p-5">
          <ul className="gall_ul curriculum">
            <li>
              <div className="inner">
                <div className="subject">
                  OOO 선생님<span className="sub">수학</span>
                </div>
                <div className="thumb">
                  <img src={Person} />
                </div>
                <div className="btnSet">
                  <button
                    className="btn btn-sky w-full rounded-full"
                    onClick={() => {
                      videoDetail(true);
                    }}
                  >
                    학습 전략 영상 보기
                    <Lucide icon="ChevronRight" className="w-4 h-4"></Lucide>
                  </button>
                  <Link to="/curriculum_view" className="w-full">
                    <button className="btn btn-secondary  w-full rounded-full">
                      상세 커리큘럼 보기
                      <Lucide icon="ChevronRight" className="w-4 h-4"></Lucide>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="inner">
                <div className="subject">
                  OOO 선생님<span className="sub">수학</span>
                </div>
                <div className="thumb">
                  <img src={Default_img} />
                </div>
                <div class="btnSet">
                  <button
                    className="btn btn-sky w-full rounded-full"
                    onClick={() => {
                      videoDetail(true);
                    }}
                  >
                    학습 전략 영상 보기
                    <Lucide icon="ChevronRight" className="w-4 h-4"></Lucide>
                  </button>
                  <Link to="/curriculum_view" className="w-full">
                    <button className="btn btn-secondary  w-full rounded-full">
                      상세 커리큘럼 보기
                      <Lucide icon="ChevronRight" className="w-4 h-4"></Lucide>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
            <li className="add zoom-in">
              <Link to="/curriculum_form" className="">
                <Lucide Lucide icon="Plus" className="w-10 h-10"></Lucide>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">과학(Science)</div>
        </div>
        <div className="intro-y p-5">
          <ul className="gall_ul curriculum">
            <li>
              <div className="inner">
                <div className="subject">
                  OOO 선생님<span className="sub">물리</span>
                </div>
                <div className="thumb">
                  <img src={Person} />
                </div>
                <div className="btnSet">
                  <button
                    className="btn btn-sky w-full rounded-full"
                    onClick={() => {
                      videoDetail(true);
                    }}
                  >
                    학습 전략 영상 보기
                    <Lucide icon="ChevronRight" className="w-4 h-4"></Lucide>
                  </button>
                  <Link to="/curriculum_view" className="w-full">
                    <button className="btn btn-secondary  w-full rounded-full">
                      상세 커리큘럼 보기
                      <Lucide icon="ChevronRight" className="w-4 h-4"></Lucide>
                    </button>
                  </Link>
                </div>
              </div>
            </li>
            <li className="add zoom-in">
              <Link to="/curriculum_form" className="">
                <Lucide Lucide icon="Plus" className="w-10 h-10"></Lucide>
              </Link>
            </li>
          </ul>
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

export default CurriCulum;
