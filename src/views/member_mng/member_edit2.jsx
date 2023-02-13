import { Link } from "react-router-dom";
import {
  Lucide,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/base-components";
import { useState } from "react";

function MemberEdit2() {
  // 학교검색 모달
  const [Searchschool, setSearchschool] = useState(false);

  // 자녀연동 모달
  const [SearchChildren, SearchChildrenDetail] = useState(false);

  return (
    <>
      {/* 유형이 학무보일때 */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-6">
          <div className="flex">
            <h2 className="text-lg font-bold">회원정보</h2>
          </div>

          <div className="intro-y box mt-3 p-5">
            <table className="table table_layout01">
              <tr>
                <td className="w-48">
                  <span className="font-bold">회원유형</span>
                </td>
                <td>
                  <select name="" id="" className="form-select">
                    <option value="">학생</option>
                    <option value="">학부모</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">이름</span>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={"과사람"}
                    placeholder=""
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">등급</span>
                </td>
                <td>
                  <select name="" id="" className="form-select">
                    <option value="" selected disabled>
                      등급
                    </option>
                    <option value="">프리미엄</option>
                    <option value="">골드</option>
                    <option value="">실버</option>
                    <option value="">브론즈</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">아이디</span>
                </td>
                <td>kimmisuk</td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">생년월일</span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={"2004"}
                        placeholder=""
                        aria-describedby="input-group-price"
                      />
                      <div id="input-group-price" className="input-group-text">
                        년
                      </div>
                    </div>
                    <div className="input-group w-36">
                      <input
                        type="number"
                        className="form-control"
                        value={"9"}
                        placeholder=""
                        aria-describedby="input-group-price"
                      />
                      <div id="input-group-price" className="input-group-text">
                        월
                      </div>
                    </div>
                    <div className="input-group w-36">
                      <input
                        type="number"
                        className="form-control"
                        value={"1"}
                        placeholder=""
                        aria-describedby="input-group-price"
                      />
                      <div id="input-group-price" className="input-group-text">
                        일
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">학교</span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      value={"과사람중학교"}
                    />
                    <button
                      className="btn btn-primary w-24"
                      onClick={() => {
                        setSearchschool(true);
                      }}
                    >
                      학교검색
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">학년</span>
                </td>
                <td>
                  <select name="" id="" className="form-select">
                    <option value="" selected disabled>
                      학년
                    </option>
                    <option value="">초1</option>
                    <option value="">초2</option>
                    <option value="">초3</option>
                    <option value="">초4</option>
                    <option value="">초5</option>
                    <option value="">초6</option>
                    <option value="">중1</option>
                    <option value="">중2</option>
                    <option value="">중3</option>
                    <option value="">고1</option>
                    <option value="">고2</option>
                    <option value="">고3</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">이메일</span>
                </td>
                <td>
                  <input type="text" className="form-control" />
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">휴대전화번호</span>
                </td>
                <td>
                  <input type="number" className="form-control" />
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">주소</span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <input type="text" className="form-control" />
                    <button className="btn btn-primary w-24">주소검색</button>
                  </div>
                  <input type="text" className="form-control mt-2" />
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">최종로그인</span>
                </td>
                <td>2022-10-12 18:00:00</td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">회원 상태</span>
                </td>
                <td>사용중</td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">마케팅 정보 수신동의</span>
                </td>
                <td>
                  <div className="flex">
                    <div className="form-check mr-2">
                      <input
                        id="radio-switch-4"
                        className="form-check-input"
                        type="radio"
                        name="horizontal_radio_button"
                        value="horizontal-radio-chris-evans"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="radio-switch-4"
                      >
                        동의함
                      </label>
                    </div>
                    <div className="form-check mr-2 mt-2 sm:mt-0">
                      <input
                        id="radio-switch-5"
                        className="form-check-input"
                        type="radio"
                        name="horizontal_radio_button"
                        value="horizontal-radio-liam-neeson"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="radio-switch-5"
                      >
                        동의안함
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="intro-y col-span-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold">자녀 연동</h2>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                SearchChildrenDetail(true);
              }}
            >
              자녀 등록하기
            </button>
          </div>
          <div className="intro-y box mt-3 p-5 relative">
            <div className="flex justify-end absolute del_btn">
              <button className="btn btn-rounded-secondary hover:text-danger hidden sm:flex p-1">
                <Lucide icon="Trash2" className="w-4 h-4" />
              </button>
            </div>
            <table className="table table_layout01">
              <tr>
                <td className="w-48">
                  <span className="font-bold">이름</span>
                </td>
                <td>과사람</td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">전화번호</span>
                </td>
                <td>010-1234-1234</td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">아이디</span>
                </td>
                <td>gwasaram</td>
              </tr>
            </table>
          </div>
          <div className="intro-y box mt-3 p-5 relative">
            <div className="flex justify-end absolute del_btn">
              <button className="btn btn-rounded-secondary hover:text-danger hidden sm:flex p-1">
                <Lucide icon="Trash2" className="w-4 h-4" />
              </button>
            </div>
            <table className="table table_layout01">
              <tr>
                <td className="w-48">
                  <span className="font-bold">이름</span>
                </td>
                <td>과사람</td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">전화번호</span>
                </td>
                <td>010-1234-1234</td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">아이디</span>
                </td>
                <td>gwasaram</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div className="flex mt-5 justify-center gap-3">
        <Link to="/member_mng">
          <button className="btn bg-white w-24">취소</button>
        </Link>
        <Link to="/">
          <button className="btn w-24 btn-sky">확인</button>
        </Link>
      </div>

      {/* BEGIN: Modal 학교검색  */}
      <Modal
        size=""
        backdrop=""
        show={Searchschool}
        onHidden={() => {
          setSearchschool(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">학교검색</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              setSearchschool(false);
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody className="p-5">
          <div className="flex gap-2">
            <input type="text" className="form-control" value={"인천"} />
            <button className="btn btn-primary w-24">검색</button>
          </div>
          <div className="bg-slate-100 rounded-md mt-3 p-2">검색결과</div>
          <button className="mt-2 hover:bg-slate-100 p-2 rounded-md w-full text-left">
            인천남고등학교
          </button>
          <button className="mt-2 hover:bg-slate-100 p-2 rounded-md w-full text-left">
            인천동고등학교
          </button>
          <button className="mt-2 hover:bg-slate-100 p-2 rounded-md w-full text-left">
            인천중학교
          </button>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => {
              setSearchschool(false);
            }}
          >
            취소
          </button>
          <button type="button" className="btn btn-sky w-24">
            등록
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 학교검색 */}

      {/* BEGIN: Modal 자녀연동  */}
      <Modal
        size=""
        backdrop=""
        show={SearchChildren}
        onHidden={() => {
          SearchChildrenDetail(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">자녀검색</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              SearchChildrenDetail(false);
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody className="p-5">
          <div className="flex gap-2">
            <input type="text" className="form-control" value={""} />
            <button className="btn btn-primary w-24">검색</button>
          </div>
          <div className="bg-slate-100 rounded-md mt-3 p-2">검색결과</div>
          <table className="table table-bordered table-hover mt-2">
            <tr className="bg-slate-100 text-center cursor-pointer">
              <td>이름</td>
              <td>전화번호</td>
              <td>아이디</td>
            </tr>
            <tr className="text-center cursor-pointer">
              <td>과사람</td>
              <td>010-1234-5678 </td>
              <td>gwasaram</td>
            </tr>
            <tr className="text-center cursor-pointer">
              <td>과사람</td>
              <td>010-1234-5678 </td>
              <td>gwasaram</td>
            </tr>
            <tr className="text-center cursor-pointer">
              <td>과사람</td>
              <td>010-1234-5678 </td>
              <td>gwasaram</td>
            </tr>
          </table>
        </ModalBody>
      </Modal>
      {/* END: Modal 자녀연동 */}
    </>
  );
}

export default MemberEdit2;
