import {
  Lucide,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from "@/base-components";
import { Link } from "react-router-dom";
import { useState } from "react";

function OnlinebasicClass() {
  // 비디오 영상 모달
  const [video, videoDetail] = useState(false);

  // 과목추가하기 모달
  const [SubjectsAdd, SubjectsAddDetail] = useState(false);

  return (
    <>
      <div className="flex gap-2 mt-5">
        <button
          className="btn bg-white w-36"
          onClick={() => alert("준비중입니다.")}
        >
          영재원
        </button>
        <Link to="/online_basic_class">
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
        <div className="intro-y p-5">
          <div className="flex items-center gap-3">
            <Dropdown>
              <DropdownToggle>
                <div className="input-group">
                  <div
                    id="input-group-email"
                    className="input-group-text whitespace-nowrap"
                  >
                    과목
                  </div>
                  <input type="text" className="form-control" value={"화학"} />
                </div>
              </DropdownToggle>
              <DropdownMenu className="w-40">
                <DropdownContent>
                  <DropdownItem>화학</DropdownItem>
                  <DropdownItem>물리</DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>

            <button
              className="btn btn-outline-primary border-dotted"
              onClick={() => {
                SubjectsAddDetail(true);
              }}
            >
              <Lucide icon="Plus" className="w-4 h-4"></Lucide>
            </button>

            <div className="flex ml-auto gap-2">
              <button className="btn btn-danger w-24">과목삭제</button>
              <Link to="/online_basic_class_form">
                <button className="btn btn-sky w-24">수정</button>
              </Link>  
            </div>
          </div>

          <table className="table table-hover mt-5">
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

      {/* BEGIN: Modal 과목추가하기 */}
      <Modal
        show={SubjectsAdd}
        onHidden={() => {
          SubjectsAddDetail(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">과목 추가하기</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              SubjectsAddDetail(false);
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center">
            <div className="w-16 shrink-0">과목</div>
            <input type="text" className="form-control w-full" />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => {
              SubjectsAddDetail(false);
            }}
          >
            취소
          </button>
          <button type="button" className="btn btn-sky w-24">
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 과목추가하기 */}
    </>
  );
}

export default OnlinebasicClass;
