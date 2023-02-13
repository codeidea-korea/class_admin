import dom from "@left4code/tw-starter/dist/js/dom";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function FindIdResult() {
	const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const findId = state?.findId;

	useEffect(() => {
		if (typeof(findId) === 'undefined') navigate('/')

		dom("body")
		.removeClass("main")
		.removeClass("error-page")
		.addClass("login_body");
	}, []);

	return (
		<React.Fragment>
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
								<div className="p-3 px-5 flex items-center border-b border-slate-200/6 text-lg font-medium">
								아이디/비밀번호 찾기
								</div>
								<div className="box p-8">
									<div className="flex items-center gap-3 find_form">
										<Link to="/id_find" className="w-full">
											<button className="w-full py-2 text-base font-medium on">
												아이디 찾기
											</button>
										</Link>
										<Link to="/pw_find_step1" className="w-full">
											<button className="w-full py-2 text-base font-medium">
												비밀번호 재설정
											</button>
										</Link>
									</div>
								<div className="py-10 text-center text-xl font-medium">
									회원님의 ID는 <span className="text-danger">{findId}</span>{" "}
									입니다.
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
		</React.Fragment>
	);
}

export default FindIdResult;
  