import { Lucide } from "@/base-components";
import { Link } from "react-router-dom";

function Profit() {
  return (
    <>
      {/* BEGIN: 관리자 계정 초대 */}
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">
            목록 <span className="color-blue">25</span>건
          </div>
        </div>
        <div className="intro-y p-5">
          <div className="overflow-x-auto">
            <table className="table table-hover">
              <tr className="text-center bg-slate-100">
                <td className="w-10">
                  <input className="form-check-input" type="checkbox" />
                </td>
                <td className="w-20">번호</td>
                <td className="w-550">제목</td>
                <td>작성자</td>
                <td>작성일</td>
              </tr>
              <tr className="text-center">
                <td>
                  <input className="form-check-input" type="checkbox" />
                </td>
                <td>
                  <div className="flex justify-center">
                    <Lucide icon="Star" className="w-4 h-4"></Lucide>
                  </div>
                </td>
                <td>
                  <Link to="/profit_view" className="underline text-primary text-left">
                    <div className="w-550 truncate">시험 응원 이벤트</div>
                  </Link>
                </td>
                <td>최철호</td>
                <td>2022-10-11</td>
              </tr>
              <tr className="text-center">
                <td>
                  <input className="form-check-input" type="checkbox" />
                </td>
                <td>10</td>
                <td>
                  <Link to="/profit_view" className="underline text-primary">
                    <div className="w-550 truncate text-left">모의고사 성적 상품</div>
                  </Link>
                </td>
                <td>최철호</td>
                <td>2022-10-11</td>
              </tr>
            </table>
          </div>
          <div className="flex mt-3">
            <button className="btn btn-outline-danger ">선택 삭제</button>
            <Link to="/profit_edit" className="ml-auto">
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
      {/* END: Page Layout */}
    </>
  );
}

export default Profit;
