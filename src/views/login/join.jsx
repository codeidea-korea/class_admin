import dom from "@left4code/tw-starter/dist/js/dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Join() {
  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login_body");
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
                  관리자 회원가입
                </div>
                <div className="box p-8">
                  <div className="intro-x">
                    <div>
                      <div className="font-medium">
                        아이디 <span className="text-danger">*</span>
                      </div>
                      <div className="flex gap-2 items-center mt-1">
                        <input
                          type="text"
                          className="intro-x login__input form-control py-3 px-4 block"
                          placeholder="아이디를 입력해주세요."
                        />
                        <button className="btn btn-primary w-20 py-3 shrink-0">
                          중복확인
                        </button>
                      </div>
                      <div className="text-sm text-danger mt-2 ml-2">
                        아이디는 5~20자의 영문 소문자, 숫자 조합으로 입력해
                        주세요.
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="font-medium">
                        비밀번호 <span className="text-danger">*</span>
                      </div>
                      <input
                        type="text"
                        className="intro-x login__input form-control py-3 px-4 block mt-1"
                        placeholder="비밀번호를 입력해주세요."
                      />
                      <div className="text-sm text-danger mt-2 ml-2">
                        8~ 16자의 영어 대소문자, 숫자를 조합하여 입력해주세요.
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="font-medium">
                        비밀번호 확인 <span className="text-danger">*</span>
                      </div>
                      <input
                        type="text"
                        className="intro-x login__input form-control py-3 px-4 block mt-1"
                        placeholder="비밀번호를 입력해주세요."
                      />
                      <div className="text-sm text-danger mt-2 ml-2">
                        비밀번호가 일치하지 않습니다.
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="font-medium">휴대전화번호</div>
                      <div className="flex gap-2 items-center mt-1">
                        <input
                          type="text"
                          className="intro-x login__input form-control py-3 px-4 block w-60"
                          placeholder="아이디를 입력해주세요."
                        />
                        <button className="btn btn-danger w-20 py-3 shrink-0">
                          인증요청
                        </button>
                        <div className="text-slate-400">02:59</div>
                      </div>
                      <div className="flex gap-2 items-center mt-3">
                        <input
                          type="text"
                          className="intro-x login__input form-control py-3 px-4 block w-60"
                          placeholder="아이디를 입력해주세요."
                        />
                        <button className="btn btn-secondary w-20 py-3 shrink-0">
                          확인
                        </button>
                      </div>
                      <div className="text-sm text-danger mt-2 ml-2">
                        입력하신 정보를 다시 한 번 확인해 주세요.
                      </div>
                    </div>
                    
                  </div>
                  <div className="intro-x mt-5 text-center ">
                    <Link to="/join_result">
                      <button className="btn btn-sky py-3 px-4 w-full align-top">
                        회원가입
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

export default Join;
