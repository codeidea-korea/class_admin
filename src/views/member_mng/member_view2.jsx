import { Link } from "react-router-dom";

function MemberView2() {
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
                  <span className="text-slate-400 font-bold">회원유형</span>
                </td>
                <td>학부모</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">이름</span>
                </td>
                <td>홍길동</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">등급</span>
                </td>
                <td>골드</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">아이디</span>
                </td>
                <td>kimmisuk</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">생년월일</span>
                </td>
                <td>1982년 1월 1일</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">학교</span>
                </td>
                <td>과사람중학교</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">학년</span>
                </td>
                <td>중3</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">이메일</span>
                </td>
                <td>kimmisuk@naver.com</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">휴대전화번호</span>
                </td>
                <td>010-1234-1234</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">주소</span>
                </td>
                <td>서울특별시 관악구 중앙동 123 00아파트 102동 1201호</td>
              </tr>
              <tr>
                <td>
                  <div className="text-white font-bold w-full bg-dark rounded-md p-2 text-center">
                    최종로그인
                  </div>
                </td>
                <td>2022-10-12 18:00:00</td>
              </tr>
              <tr>
                <td>
                  <div className="text-white font-bold w-full bg-dark rounded-md p-2 text-center">
                    회원 상태
                  </div>
                </td>
                <td>사용중</td>
              </tr>
              <tr>
                <td>
                  <div className="text-white font-bold w-full bg-dark rounded-md p-2 text-center">
                    마케팅 정보 수신동의
                  </div>
                </td>
                <td>동의함</td>
              </tr>
            </table>
          </div>
        </div>

        <div className="intro-y col-span-6">
          <div className="flex">
            <h2 className="text-lg font-bold">자녀 연동</h2>
          </div>
          <div className="intro-y box mt-3 p-5">
            <table className="table table_layout01">
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">이름</span>
                </td>
                <td>과사람</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">전화번호</span>
                </td>
                <td>010-1234-1234</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">아이디</span>
                </td>
                <td>gwasaram</td>
              </tr>
            </table>
          </div>
          <div className="intro-y box mt-3 p-5">
            <table className="table table_layout01">
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">이름</span>
                </td>
                <td>과사람</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">전화번호</span>
                </td>
                <td>010-1234-1234</td>
              </tr>
              <tr>
                <td>
                  <span className="text-slate-400 font-bold">아이디</span>
                </td>
                <td>gwasaram</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div className="flex mt-5 justify-center gap-3">
        <Link to="/member_mng"><button className="btn bg-white w-24">목록</button></Link>
        <Link to="/member_edit"><button className="btn w-24 btn-sky">수정</button></Link>
      </div>
    </>
  );
}

export default MemberView2;
