import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@/base-components";
import { Link } from "react-router-dom";
import { useState } from "react";

function LifeRecord() {
  // 선택삭제 모달
  const [selDelete, selDeleteDetail] = useState(false);

  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">
            목록 <span className="color-blue">25</span>건
          </div>
          <button type="button" className="btn ml-2" title="초기화">
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
          <button
            href="#"
            className="btn btn-green ml-3 flex items-center"
            onClick={() => {
              acountDetail(true);
            }}
          >
            <Lucide icon="Save" className="w-4 h-4 mr-2"></Lucide>엑셀 다운로드
          </button>
        </div>
        <div className="intro-y p-5">
          <div className="overflow-x-auto">
            <table className="table">
              <tr className="text-center bg-slate-100">
                <td className="w-10">
                  <input className="form-check-input" type="checkbox" />
                </td>
                <td className="w-20">번호</td>
                <td>이름</td>
                <td>구분</td>
                <td>학교</td>
                <td>전화번호</td>
                <td>업로드일</td>
              </tr>
              <tr className="text-center">
                <td>
                  <input className="form-check-input chk1" type="checkbox" />
                </td>
                <td>567</td>
                <td>
                  <Link
                    to="/life_record_view"
                    className="underline text-primary"
                  >
                    홍길동
                  </Link>
                </td>
                <td>초등</td>
                <td>서울중학교</td>
                <td>010-0000-0000</td>
                <td>2022-10-11</td>
              </tr>
            </table>
          </div>
          <div className="flex mt-3">
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                selDeleteDetail(true);
              }}
            >
              선택 삭제
            </button>
            <Link to="/life_record_edit" className="ml-auto">
              <button className="btn btn-sky">
                <Lucide icon="Plus" className="w-4 h-4 mr-2"></Lucide>
                등록하기
              </button>
            </Link>
          </div>
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
            선택한 생활기록부를 삭제하시겠습니까?
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

export default LifeRecord;
