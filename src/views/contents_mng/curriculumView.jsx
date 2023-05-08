import {
  Lucide,
  Modal,
  ModalBody,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@/base-components";
import { Link } from "react-router-dom";
import { useState } from "react";

import Default_img from "@/assets/images/default_image.jpg";

function CurriCulumView() {
  // 영상보기 모달
  const [video, videoDetail] = useState(false);

  return (
    <>
      <TabGroup>
        <div className="intro-y box mt-5">
          <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
            <div className="text-lg font-medium flex items-center">
              영재학교
              <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
              수학
            </div>
          </div>
          <div className="intro-y p-5">
            <div className="bg-slate-50 flex items-center p-5 gap-6 w-1/2">
              <div className="profile_img">
                <img src={Default_img} className="rounded-md" />
              </div>
              <div className="w-full flex flex-col gap-6">
                <div className="text-lg font-medium flex items-center">
                  박진우 선생님
                  <span className="bg-white border outline-secondary p-1 rounded-full text-sm w-16 text-center block ml-3">
                    수학
                  </span>
                </div>
                <button
                  className="btn btn-sky w-44 rounded-full"
                  onClick={() => {
                    videoDetail(true);
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
                <tr className="bg-slate-100 text-center">
                  <td className=" w-16">월</td>
                  <td>차시</td>
                  <td>교재</td>
                  <td>학습목표</td>
                  <td>학습 단원 및 내용</td>
                </tr>
                <tr className="text-center">
                  <td>1월</td>
                  <td>1차시</td>
                  <td>창의수학1</td>
                  <td>AIME(-2009)</td>
                  <td>American Invitation Mathematics Examination</td>
                </tr>
                <tr className="text-center">
                  <td>1월</td>
                  <td>1차시</td>
                  <td>창의수학1</td>
                  <td>AIME(-2009)</td>
                  <td>American Invitation Mathematics Examination</td>
                </tr>
              </table>
              <div className="flex mt-3">
                <button className="btn btn-outline-danger w-24">삭제</button>
                <div className="flex gap-2 ml-auto">
                  <Link to="/curriculum">
                    <button className="btn bg-white w-24">목록</button>
                  </Link>
                  <Link to="/curriculum_form">
                    <button className="btn btn-sky w-24">수정하기</button>
                  </Link>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="leading-relaxed">
            <div className="box p-5 ">
              <table className="table table-hover">
                <tr className="bg-slate-100 text-center">
                  <td className=" w-16">월</td>
                  <td>차시</td>
                  <td>교재</td>
                  <td>학습목표</td>
                  <td>학습 단원 및 내용</td>
                </tr>
                <tr className="text-center">
                  <td>1월</td>
                  <td>1차시</td>
                  <td>창의수학1</td>
                  <td>AIME(-2009)</td>
                  <td>American Invitation Mathematics Examination</td>
                </tr>
              </table>
              <div className="flex mt-3">
                <button className="btn btn-outline-danger w-24">삭제</button>
                <div className="flex gap-2 ml-auto">
                  <Link to="/curriculum">
                    <button className="btn bg-white w-24">목록</button>
                  </Link>
                  <Link to="/curriculum_form">
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

export default CurriCulumView;
