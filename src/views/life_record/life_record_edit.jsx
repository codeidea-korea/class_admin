import { Lucide } from "@/base-components";
import { Link } from "react-router-dom";

function LifeRecordEdit() {
  return (
    <>
      <div className="flex justify-end gap-2 intro-x">
        <button className="btn btn-sky flex items-center">
          <Lucide icon="Edit" className="w-4 h-4 mr-2"></Lucide>
          저장하기
        </button>
      </div>
      <div className="intro-y box mt-5 p-5">
        <table className="table table_layout01">
          <tr>
            <td className="w-48">
              <span className="font-bold text-slate-400">이름</span>
            </td>
            <td>
              <input
                type="text"
                className="form-control w-52"
                placeholder="이름을 입력하 주세요."
              />
            </td>
          </tr>
          <tr>
            <td className="w-48">
              <span className="font-bold text-slate-400">구분</span>
            </td>
            <td>
              <select name="" id="" className="form-select w-52">
                <option value="">초등</option>
                <option value="">중등</option>
                <option value="">고등</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="w-48">
              <span className="font-bold text-slate-400">학교</span>
            </td>
            <td>
              <input
                type="text"
                className="form-control w-52"
                placeholder="학교를 입력해 주세요."
              />
            </td>
          </tr>
          <tr>
            <td className="w-48">
              <span className="font-bold text-slate-400">전화번호</span>
            </td>
            <td>
              <input
                type="number"
                className="form-control w-52"
                placeholder="전화번호를 입력해 주세요."
              />
            </td>
          </tr>
        </table>
      </div>

      <div className="intro-y mt-5 box">
        <div className="border-b border-slate-200/6 flex space-between p-5">
          <h2 className="text-lg font-bold">1. 출결 사항</h2>
        </div>
        <div className="p-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td rowSpan={2}>학년</td>
              <td colSpan={3}>결석</td>
              <td colSpan={3}>지각</td>
              <td colSpan={3}>조퇴</td>
              <td colSpan={3}>결과</td>
            </tr>
            <tr className="text-center bg-slate-50 font-medium">
              <td>결석</td>
              <td>미인정</td>
              <td>기타</td>
              <td>결석</td>
              <td>미인정</td>
              <td>기타</td>
              <td>결석</td>
              <td>미인정</td>
              <td>기타</td>
              <td>결석</td>
              <td>미인정</td>
              <td>기타</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 w-24">1학년</td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">2학년</td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">3학년</td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control text-center" />
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="intro-y mt-5 box">
        <div className="border-b border-slate-200/6 flex space-between p-5">
          <h2 className="text-lg font-bold">2. 수상 경력</h2>
        </div>
        <div className="p-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td rowSpan={5} className="w-52">
                교내 수상
              </td>
              <td className="w-36">학년(학기)</td>
              <td>수상명</td>
              <td>등급(위)</td>
              <td>수상연월일</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">
                <input
                  type="text"
                  className="form-control text-center"
                  value={"1학년(1학기)"}
                />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">
                <input
                  type="text"
                  className="form-control text-center"
                  value={"1학년(1학기)"}
                />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">
                <input
                  type="text"
                  className="form-control text-center"
                  value={"1학년(1학기)"}
                />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-center">
                <button className="btn btn-outline-primary border-dotted">
                  <Lucide icon="Plus" className="w-6 h-6"></Lucide>
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div className="px-5 pb-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td rowSpan={5} className="w-52">
                외부 수상
              </td>
              <td className="w-36">학년(학기)</td>
              <td>수상명</td>
              <td>등급(위)</td>
              <td>수상연월일</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-center">
                <button className="btn btn-outline-primary border-dotted">
                  <Lucide icon="Plus" className="w-6 h-6"></Lucide>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="intro-y mt-5 box">
        <div className="border-b border-slate-200/6 flex space-between p-5">
          <h2 className="text-lg font-bold">3. 창의적 체험 활동</h2>
        </div>
        <div className="p-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td rowSpan={4} className="w-52">
                자율활동
                <br />
                (임원활동)
              </td>
              <td className="w-52">학년</td>
              <td>내용</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">1학년</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">2학년</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">3학년</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
        <div className="px-5 pb-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td rowSpan={4} className="w-52">
                동아리활동
              </td>
              <td className="w-52">학년</td>
              <td>동아리명</td>
              <td>동아리명</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">1학년</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">2학년</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">3학년</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
          </table>
        </div>
        <div className="px-5 pb-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td rowSpan={4} className="w-52">
                봉사활동
              </td>
              <td className="w-52">학년</td>
              <td className="w-72">누계시간</td>
              <td>
                특이내용
                <span className="text-sm text-slate-400">
                  (활동내용 중 특별한 활동이 있으면 작성하세요.)
                </span>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">1학년</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">2학년</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">3학년</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
        <div className="px-5 pb-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td rowSpan={4} className="w-52">
                진로활동
              </td>
              <td className="w-52">학년</td>
              <td className="w-72">희망분야</td>
              <td>
                이유
                <span className="text-sm text-slate-400">
                  (간략하게 요약해서 작성하세요.)
                </span>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">1학년</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">2학년</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-52">3학년</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="intro-y mt-5 box">
        <div className="border-b border-slate-200/6 flex space-between p-5">
          <h2 className="text-lg font-bold">4. 교생학습발달상황</h2>
        </div>
        {/* 3학년 까지 반복 */}
        <div className="p-5">
          <div className="pb-3">(1학년)</div>
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td>학기</td>
              <td>과목</td>
              <td>원점수</td>
              <td>과목평균</td>
              <td>성취도</td>
              <td>비고</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium w-24">1</td>
              <td className="bg-slate-50 font-medium w-36">국어</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">1</td>
              <td className="bg-slate-50 font-medium">사회</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">1</td>
              <td className="bg-slate-50 font-medium">역사</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">1</td>
              <td className="bg-slate-50 font-medium">수학</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">1</td>
              <td className="bg-slate-50 font-medium">과학</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">1</td>
              <td className="bg-slate-50 font-medium">기술 가정</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">1</td>
              <td className="bg-slate-50 font-medium">영어</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">1</td>
              <td className="bg-slate-50 font-medium">외국어</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td className="bg-slate-50 font-medium">국어</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td className="bg-slate-50 font-medium">사회</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td className="bg-slate-50 font-medium">역사</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td className="bg-slate-50 font-medium">수학</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td className="bg-slate-50 font-medium">과학</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td className="bg-slate-50 font-medium">기술 가정</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td className="bg-slate-50 font-medium">영어</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td className="bg-slate-50 font-medium">외국어</td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
            </tr>
          </table>
        </div>

        <div className="px-5 pb-5">
          <div className="pb-3">(1학년)</div>
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td className="w-52">과목</td>
              <td>세부 능력 및 특기 사항</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">(1학기 수학)</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">(2학기 과학)</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">(1학기 수학)</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">(2학기 과학)</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="intro-y mt-5 box">
        <div className="border-b border-slate-200/6 flex space-between p-5">
          <h2 className="text-lg font-bold">5. 자유학기활동상황</h2>
        </div>
        <div className="p-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td className="w-24">학기</td>
              <td>영역</td>
              <td>활동</td>
              <td>시간</td>
              <td>특기사항</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="intro-y mt-5 box">
        <div className="border-b border-slate-200/6 flex space-between p-5">
          <h2 className="text-lg font-bold">6. 독서활동상황</h2>
        </div>
        <div className="p-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td className="w-24">학년</td>
              <td className="w-24">학기</td>
              <td>과목 또는 영역</td>
              <td>도서명</td>
              <td>작가</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td className="bg-slate-50">
                <input type="text" className="form-control text-center" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <input type="text" className="form-control" />
              </td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="intro-y mt-5 box">
        <div className="border-b border-slate-200/6 flex space-between p-5">
          <h2 className="text-lg font-bold">7. 행동 특성 및 종합의견</h2>
        </div>
        <div className="p-5">
          <table className="table table-bordered">
            <tr className="text-center bg-slate-100 font-medium">
              <td className="w-24">학년</td>
              <td>행동특성 및 종합의견</td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">1</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
            <tr className="text-center">
              <td className="bg-slate-50 font-medium">2</td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols=""
                  rows="2"
                  className="w-full form-control"
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="flex mt-5 justify-center gap-3">
        <Link to="/life_record_view">
          <button className="btn bg-white w-24">취소</button>
        </Link>
        <Link to="/">
          <button className="btn w-24 btn-sky">저장하기</button>
        </Link>
      </div>
    </>
  );
}

export default LifeRecordEdit;
