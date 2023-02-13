import dom from "@left4code/tw-starter/dist/js/dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function PwFindResult() {
  useEffect(() => {
    dom("body")
      .removeClass("main")
      .removeClass("error-page")
      .addClass("login_body");
  }, []);

  return (
    <>
      <div className="container">
        <div className="block login_con">
          {/* BEGIN: Login Form */}
          <div className="h-auto flex py-0 my-0">
            <div className="my-auto mx-auto  px-8 rounded-md shadow-md login_size">
              <h2 className="intro-x font-bold text-5xl text-center text-white">
                WP Apply
                <br />
                <span className="text-xl">admin</span>
              </h2>
              <div className="intro-y box mt-4">
                <div class="p-3 px-5 flex items-center border-b border-slate-200/6 text-lg font-medium">
                  아이디/비밀번호 찾기
                </div>
                <div className="box p-8">
                  <div className="py-3 text-center text-lg font-medium">
                    비빌번호가 변경되었습니다.
                    <br />
                    다시 로그인 해주세요.
                  </div>

                  <div className="intro-x mt-5 text-center ">
                    <Link to="/login" className="w-full">
                      <button className="btn btn-sky py-3 px-4 w-full align-top">
                        로그인 페이지로 이동
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: Login Form */}
        </div>
      </div>
    </>
  );
}

export default PwFindResult;
