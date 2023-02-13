import dom from "@left4code/tw-starter/dist/js/dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function PwFindstep2() {
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
                  비밀번호 재설정
                </div>
                <div className="box p-8">
                  <div>
                    <div className="font-medium">새 비밀번호</div>
                    <input
                      type="text"
                      className="intro-x login__input form-control py-3 px-4 block mt-1"
                      placeholder="새 비밀번호를 입력해주세요."
                    />
                    <div className="text-sm text-danger mt-2 ml-2">
                      비밀번호는 8~16자의 영어 대소문자, 숫자 조합으로
                      입력해주세요.
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="font-medium">비밀번호 확인</div>
                    <input
                      type="text"
                      className="intro-x login__input form-control py-3 px-4 block mt-1"
                      placeholder="다시한번 비밀번호를 입력해주세요."
                    />
                    <div className="text-sm text-danger mt-2 ml-2">
                      비밀번호가 일치하지 않습니다. 다시 한번 확인해주세요.
                    </div>
                  </div>

                  <div className="intro-x mt-5 text-center ">
                    <Link to="/pw_find_reslut" className="w-full">
                      <button className="btn btn-sky py-3 px-4 w-full align-top">
                        확인
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

export default PwFindstep2;
