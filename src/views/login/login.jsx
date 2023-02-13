import dom from "@left4code/tw-starter/dist/js/dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {
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
                  관리자 로그인
                </div>
                <div className="box p-8">
                  <div className="intro-x">
                    <input
                      type="text"
                      className="intro-x login__input form-control py-3 px-4 block"
                      placeholder="아이디"
                    />
                    <input
                      type="password"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="비밀번호"
                    />
                    <div className="text-danger mt-2 text-sm ml-2">
                      입력하신 아이디 또는 비밀번호가 일치하지 않습니다.
                    </div>
                    <div className="text-danger mt-2 text-sm ml-2">
                      다시 한 번 확인해 주세요.
                    </div>
                    <div className="text-danger mt-2 text-sm ml-2">
                      미승인/휴직/퇴직 처리 중인 아이디 입니다.
                    </div>
                    <div className="text-danger mt-2 text-sm ml-2">
                      고객센터 전화를 이용해주세요
                    </div>
                  </div>
                  <div className="intro-x flex text-slate-400 text-sm mt-4">
                    <div className="flex items-center mr-auto">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="form-check-input border mr-2"
                      />
                      <label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        아이디 저장
                      </label>
                    </div>
                  </div>
                  <div className="intro-x mt-5 text-center ">
                    <button className="btn btn-sky py-3 px-4 w-full align-top">
                      로그인
                    </button>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <Link to="/id_find" className="w-full">
                      <button className="btn bg-white w-full">
                        아이디 찾기
                      </button>
                    </Link>
                    <Link to="/pw_find_step1" className="w-full">
                      <button className="btn bg-white w-full">
                      비밀번호 찾기
                      </button>
                    </Link>
                  </div>
                  <div className="intro-x mt-5 text-center ">
                    <Link to="/join_result">
                      <button className="btn btn-primary py-3 px-4 w-full align-top">
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

export default Login;
