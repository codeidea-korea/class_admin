import dom from "@left4code/tw-starter/dist/js/dom";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from '@/hooks/useAxios';

function FindId() {
	const navigate = useNavigate();
	const api = useAxios();
	const [findIdParams, setFindIdParams] = useState({
        name: '',
        phone: '',
    });
    const [alertText, setAlertText] = useState({
        alertResult: [0, ''],
    })

	const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        setFindIdParams({ ...findIdParams, [name]: value });
    };

	// 확인 버튼
    const sendAuth = () => {
		console.log(findIdParams)
        api.get(`/v1/admin/find-id?name=${findIdParams.name}&phone=${findIdParams.phone}`)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                navigate('/id_find_result', {state: {userId: res.data.userId}})
            }
        })
        .catch((err) => {
            setAlertText({...alertText, alertResult: [1, err.response.data.msg]})
            console.log(err);
        });
    }

	useEffect(() => {
		dom("body").removeClass("main").removeClass("error-page").addClass("login_body");
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
									<div className="text-slate-600 mt-6 text-center">
										회원가입 시 입력한 정보로 ID를 찾을 수 있습니다.
									</div>
									<div className="mt-3">
										<div className="font-medium">이름</div>
										<input type="text" name={'name'} className="intro-x login__input form-control py-3 px-4 block mt-1"
										placeholder="이름을 입력해주세요." onChange={handleChange}
										/>
									</div>
									<div className="mt-3">
										<div className="font-medium">휴대전화번호</div>
										<input type="text" name={'phone'} className="intro-x login__input form-control py-3 px-4 block mt-1"
										placeholder="휴대전화번호 입력해주세요."  onChange={handleChange}
										/>
										{!!alertText.alertResult[0] && <div className="text-sm text-danger mt-2 ml-2">{alertText.alertResult[1]}</div>}
									</div>
									<div className="intro-x mt-5 text-center ">
										<button className="btn btn-sky py-3 px-4 w-full align-top" onClick={sendAuth}>확인</button>
									</div>
									<div className="flex gap-3 mt-3">
										<Link to="/login" className="w-full">
											<button className="btn bg-white w-full">로그인</button>
										</Link>
										<Link to="/join" className="w-full">
											<button className="btn bg-white w-full">회원가입</button>
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

export default FindId;
