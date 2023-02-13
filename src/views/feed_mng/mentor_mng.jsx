import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@/base-components";
import { Link } from "react-router-dom";
import { useState } from "react";

function MentoMng() {

  // 멘토추가하기
  const [Mentor, MentorDetail] = useState(false);

  return (
    <>
      <div className="flex gap-2 mt-5">
        <Link to="/feed_mng">
          <button className="btn btn-primary w-36">자기소개서</button>
        </Link>
        <button
          className="btn bg-white w-36"
          onClick={() => alert("준비중입니다.")}
        >
          문제은행
        </button>
      </div>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="ml-auto">
            <div className="flex flex-middle gap-3">
              <button
                className="btn btn-outline-primary border-dotted"
                onClick={() => {
                  MentorDetail(true);
                }}
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2"></Lucide>
                멘토 추가하기
              </button>
              <input
                type="text"
                name=""
                value=""
                class="form-control w-60"
                placeholder="검색어 입력"
              />
              <button
                type="button"
                className="btn btn-primary flex items-center"
              >
                <Lucide icon="Search" className="w-4 h-4 mr-2"></Lucide>
                검색
              </button>
            </div>
          </div>
        </div>
        <div className="intro-y p-5">
          <div className=" border p-5 rounded-md border-dotted">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium flex items-center">
                영재학교
                <button className="ml-auto">
                  <Lucide icon="X" className="w-6 h-6" />
                </button>
              </div>
              <div className="font-medium">담당선생님 : 최철호 선생님</div>
              <div className="flex items-center gap-2 font-medium">
                담당학생
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    MentorDetail(true);
                  }}
                >
                  <Lucide icon="Plus" className="w-4 h-4 mr-1"></Lucide>
                  추가하기
                </button>
              </div>
            </div>
            <div className="overflow-x-auto mt-5">
              <table className="table table-hover">
                <tr className="text-center bg-slate-100 font-medium">
                  <td>번호</td>
                  <td>아이디</td>
                  <td>이름</td>
                  <td>학교</td>
                  <td>학년</td>
                  <td>학생 등록일</td>
                  <td>전형</td>
                  <td></td>
                </tr>
                <tr className="text-center">
                  <td>2023-11-12</td>
                  <td>hong123</td>
                  <td>홍길동</td>
                  <td>여명중학교</td>
                  <td>중3</td>
                  <td>한국과학영재학교</td>
                  <td>장영실 전형</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm">
                      담당 학생 삭제
                    </button>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>2023-11-12</td>
                  <td>hong123</td>
                  <td>홍길동</td>
                  <td>여명중학교</td>
                  <td>중3</td>
                  <td>한국과학영재학교</td>
                  <td>장영실 전형</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm">
                      담당 학생 삭제
                    </button>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>2023-11-12</td>
                  <td>hong123</td>
                  <td>홍길동</td>
                  <td>여명중학교</td>
                  <td>중3</td>
                  <td>한국과학영재학교</td>
                  <td>장영실 전형</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm">
                      담당 학생 삭제
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="intro-y px-5">
          <div className=" border p-5 rounded-md border-dotted">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium flex items-center">
                영재학교
                <button className="ml-auto">
                  <Lucide icon="X" className="w-6 h-6" />
                </button>
              </div>
              <div className="font-medium">담당선생님 : 최철호 선생님</div>
              <div className="flex items-center gap-2 font-medium">
                담당학생
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    MentorDetail(true);
                  }}
                >
                  <Lucide icon="Plus" className="w-4 h-4 mr-1"></Lucide>
                  추가하기
                </button>
              </div>
            </div>
            <div className="overflow-x-auto mt-5"></div>
          </div>
        </div>
        <div className="flex justify-center mt-5 pb-5">
          <button
            className="btn btn-outline-primary border-dotted"
            onClick={() => {
              MentorDetail(true);
            }}
          >
            <Lucide icon="Plus" className="w-6 h-6"></Lucide>
          </button>
        </div>
      </div>

      {/* BEGIN: Modal 멘토 추가하기*/}
      <Modal
        size="modal-lg"
        show={Mentor}
        onHidden={() => {
          MentorDetail(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">멘토 추가하기</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              MentorDetail(false);
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody className="p-5">
          <div className="flex items-center">
            <div className="w-24 shrink-0 mr-3">담당 영역</div>
            <input
              type="text"
              className="form-control"
              placeholder="담당역역을 입력해 주세요."
            />
          </div>
          <div className="mt-5">
            <div className="flex gap-3 justify-end">
              <input type="text" className="form-control w-52" />
              <button className="btn btn-primary shrink-0">
                <Lucide icon="Search" className="w-4 h-4 mr-2"></Lucide>
                검색
              </button>
            </div>
            <div>
              <table className="table table-hover mt-3">
                <tr className="bg-slate-100 font-medium text-center">
                  <td></td>
                  <td>이름</td>
                  <td>전화번호</td>
                  <td>아이디</td>
                </tr>
                <tr className="text-center">
                  <td>
                    <input
                      id="radio-switch-1"
                      className="form-check-input"
                      type="radio"
                      name="vertical_radio_button"
                      value="vertical-radio-chris-evans"
                    />
                  </td>
                  <td>
                    <label htmlFor="radio-switch-1">최철호</label>
                  </td>
                  <td>
                    <label htmlFor="radio-switch-1">010-1234-5678</label>
                  </td>
                  <td>
                    <label htmlFor="radio-switch-1">gwasaram</label>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>
                    <input
                      id="radio-switch-2"
                      className="form-check-input"
                      type="radio"
                      name="vertical_radio_button"
                      value="vertical-radio-chris-evans"
                    />
                  </td>
                  <td>
                    <label htmlFor="radio-switch-2">최철호</label>
                  </td>
                  <td>
                    <label htmlFor="radio-switch-2">010-1234-5678</label>
                  </td>
                  <td>
                    <label htmlFor="radio-switch-2">gwasaram</label>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>
                    <input
                      id="radio-switch-2"
                      className="form-check-input"
                      type="radio"
                      name="vertical_radio_button"
                      value="vertical-radio-chris-evans"
                    />
                  </td>
                  <td>
                    <label htmlFor="radio-switch-2">최철호</label>
                  </td>
                  <td>
                    <label htmlFor="radio-switch-2">010-1234-5678</label>
                  </td>
                  <td>
                    <label htmlFor="radio-switch-2">gwasaram</label>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => {
              MentorDetail(false);
            }}
          >
            취소
          </button>
          <button type="button" className="btn btn-sky w-24">
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 멘토 추가하기 */}
    </>
  );
}

export default MentoMng;
