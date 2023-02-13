import dom from "@left4code/tw-starter/dist/js/dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function JoinResult() {
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
              <div className="intro-y box mt-4">
                <div className="box p-10">
                  <h2 className="intro-x font-bold text-5xl text-center">
                    WP Apply
                    <br />
                    <span className="text-xl">admin</span>
                  </h2>
                  <div className="py-8 text-center text-lg font-medium">
                    회원 가입이 완료되었습니다.
                    <br />
                    승인 처리 후 이용이 가능합니다.
                  </div>
                  <div className="intro-x mt-5 text-center ">
                    <Link to="/login">
                      <button className="btn btn-sky py-3 px-4 w-full align-top">
                        로그인
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

export default JoinResult;
