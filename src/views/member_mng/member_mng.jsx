import {
  Lucide,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/base-components";
import { Link } from "react-router-dom";
import { useState } from "react";

function MemberMng() {
  // 선택삭제 모달
  const [selDelete, selDeleteDetail] = useState(false);

  return (
    <>
      {/* BEGIN: Page Layout */}
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">
            목록 <span className="color-blue">25</span>건
          </div>
          <button className="btn ml-2" title="초기화">
            <Lucide icon="RotateCcw" className="w-4 h-4"></Lucide>
          </button>
          <div className="ml-auto">
            <div className="flex flex-middle gap-3">
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
          <button className="btn btn-green ml-3 flex items-center">
            <Lucide icon="Save" className="w-4 h-4 mr-2"></Lucide>엑셀 다운로드
          </button>
        </div>
        <div className="intro-y p-5">
          <div className="overflow-x-auto">
            <table className="table">
              <tr className="text-center bg-slate-100 whitespace-nowrap">
                <td className="w-10">
                  <input
                    className="form-check-input chkall"
                    type="checkbox"
                    data-group="chk1"
                  />
                </td>
                <td className="w-20">번호</td>
                <td>아이디</td>
                <td >이름</td>
                <td>
                  <select className="form-control">
                    <option>구분</option>
                    <option>학부모</option>
                    <option>초1</option>
                    <option>초2</option>
                    <option>초3</option>
                    <option>초4</option>
                    <option>초5</option>
                    <option>초6</option>
                    <option>중1</option>
                    <option>중2</option>
                    <option>중3</option>
                    <option>고1</option>
                    <option>고2</option>
                    <option>고3</option>
                  </select>
                </td>
                <td>휴대폰번호</td>
                <td>이메일</td>
                <td>회원가입일</td>
                <td>
                  <select className="form-control">
                    <option>등급</option>
                    <option>프리미엄</option>
                    <option>골드</option>
                    <option>실버</option>
                    <option>브론즈</option>
                  </select>
                </td>
                <td>
                  <select className="form-control">
                    <option>자녀연동</option>
                    <option>연동 회원</option>
                    <option>미연동 회원</option>
                  </select>
                </td>
                <td>
                  <select className="form-control">
                    <option>상태</option>
                    <option>활동</option>
                    <option>휴먼</option>
                    <option>탈퇴</option>
                  </select>
                </td>
              </tr>

              <tr className="text-center whitespace-nowrap">
                <td>
                  <input className="form-check-input chk1" type="checkbox" />
                </td>
                <td>567</td>
                <td>
                  <Link to="/member_view" className="underline text-primary">
                    hong123
                  </Link>
                </td>
                <td>
                  <Link to="/member_view" className="underline text-primary">
                    홍길동
                  </Link>
                </td>
                <td>중3</td>
                <td>010-0000-0000</td>
                <td>ganada@gamil.com</td>
                <td>2022-10-11</td>
                <td>
                  <select className="form-select small w-full">
                    <option>프리미엄</option>
                    <option selected>골드</option>
                    <option>실버</option>
                    <option>브론즈</option>
                  </select>
                </td>
                <td>
                  <span className="text-slate-400">미연동</span>
                </td>
                <td>
                  <span className="text-primary">활동</span>
                </td>
              </tr>
              <tr className="text-center">
                <td>
                  <input className="form-check-input chk1" type="checkbox" />
                </td>
                <td>567</td>
                <td>
                  <Link to="/member_view" className="underline text-primary">
                    hong123
                  </Link>
                </td>
                <td>
                  <Link to="/member_view" className="underline text-primary">
                    홍길동
                  </Link>
                </td>
                <td>중3</td>
                <td>010-0000-0000</td>
                <td>ganada@gamil.com</td>
                <td>2022-10-11</td>
                <td>
                  <select className="form-select small w-full">
                    <option>프리미엄</option>
                    <option selected>골드</option>
                    <option>실버</option>
                    <option>브론즈</option>
                  </select>
                </td>
                <td>이강인 외1명</td>
                <td>
                  <span className="text-slate-400">휴먼</span>
                </td>
              </tr>
              <tr className="text-center">
                <td>
                  <input className="form-check-input chk1" type="checkbox" />
                </td>
                <td>567</td>
                <td>
                  <Link to="/member_view" className="underline text-primary">
                    hong123
                  </Link>
                </td>
                <td>
                  <Link to="/member_view" className="underline text-primary">
                    홍길동
                  </Link>
                </td>
                <td>중3</td>
                <td>010-0000-0000</td>
                <td>ganada@gamil.com</td>
                <td>2022-10-11</td>
                <td>
                  <select className="form-select small w-full">
                    <option>프리미엄</option>
                    <option selected>골드</option>
                    <option>실버</option>
                    <option>브론즈</option>
                  </select>
                </td>
                <td>이강인 외1명</td>
                <td>
                  <span className="text-danger">탈퇴</span>
                </td>
              </tr>
            </table>
          </div>
          <button
            className="btn btn-outline-danger mt-3"
            onClick={() => {
              selDeleteDetail(true);
            }}
          >
            선택 삭제
          </button>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <Link className="page-link" to="">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  ...
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  1
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  ...
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* BEGIN: Modal 선택삭제  */}
      <Modal
        size=""
        backdrop=""
        show={selDelete}
        onHidden={() => {
          selDeleteDetail(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">선택삭제</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              selDeleteDetail(false);
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody className="p-5">
          <div className="text-lg font-medium text-center">
            선택한 회원을 삭제하시겠습니까?
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => {
              selDeleteDetail(false);
            }}
          >
            취소
          </button>
          <button type="button" className="btn btn-danger w-24">
            삭제
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 선택삭제 */}
    </>
  );
}

export default MemberMng;
