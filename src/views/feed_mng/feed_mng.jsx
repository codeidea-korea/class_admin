import { Lucide } from "@/base-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FeedMng() {
  const navigate = useNavigate();
  const navigateToPurchase = () => {
    navigate("/feed_view");
  };

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
          <div className="overflow-x-auto">
            <table className="table table-hover">
              <tr className="text-center bg-slate-100 font-medium">
                <td>피드백 요청일</td>
                <td>아이디</td>
                <td>이름</td>
                <td>학교</td>
                <td>학년</td>
                <td>지원학교</td>
                <td>전형</td>
                <td>상태</td>
              </tr>
              <tr
                className="text-center cursor-pointer"
                onClick={navigateToPurchase}
              >
                <td>2023-11-12</td>
                <td>hong123</td>
                <td>홍길동</td>
                <td>여명중학교</td>
                <td>중3</td>
                <td>한국과학영재학교</td>
                <td>장영실 전형</td>
                <td>
                  <span className="text-danger">미학인</span>
                </td>
              </tr>
              <tr
                className="text-center cursor-pointer"
                onClick={navigateToPurchase}
              >
                <td>2023-11-12</td>
                <td>hong123</td>
                <td>홍길동</td>
                <td>여명중학교</td>
                <td>중3</td>
                <td>한국과학영재학교</td>
                <td>장영실 전형</td>
                <td>
                  <span className="text-primary">확인</span>
                </td>
              </tr>
              <tr
                className="text-center cursor-pointer"
                onClick={navigateToPurchase}
              >
                <td>2023-11-12</td>
                <td>hong123</td>
                <td>홍길동</td>
                <td>여명중학교</td>
                <td>중3</td>
                <td>한국과학영재학교</td>
                <td>장영실 전형</td>
                <td>
                  <span className="text-slate-400">피드백 완료</span>
                </td>
              </tr>
            </table>
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
    </>
  );
}

export default FeedMng;
