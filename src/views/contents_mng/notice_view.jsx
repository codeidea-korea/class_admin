import { Link } from "react-router-dom";

function NoticeView() {
  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">공지사항</div>
        </div>
        <div className="intro-y p-5">
          <div className="px-8">
            <div className="flex gap-48">
              <div className="flex">
                <div className="text-slate-400 font-medium w-24">작성자</div>
                <div>최철호</div>
              </div>
              <div className="flex">
                <div className="text-slate-400 font-medium w-24">등록일</div>
                <div>2022-09-10 16:48</div>
              </div>
            </div>

            <div className="flex mt-5">
              <div className="text-slate-400 font-medium w-24">제목</div>
              <div>제목 오는 자리</div>
            </div>
          </div>

          <div className="py-5">
            <hr className="border-t border-dotted" />
          </div>

          <div className="p-5">
            공지사항 상세글이 오는 자리입니다. 공지사항 상세글이 오는
            자리입니다. 공지사항 상세글이 오는 자리입니다. 공지사항 상세글이
            오는 자리입니다.
          </div>

          <div className="flex mt-3">
            <button className="btn btn-outline-danger w-24">삭제</button>
            <div className="flex gap-2 ml-auto">
              <Link to="/notice">
                <button className="btn bg-white w-24">목록</button>
              </Link>
              <button className="btn btn-sky w-24">확인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoticeView;
