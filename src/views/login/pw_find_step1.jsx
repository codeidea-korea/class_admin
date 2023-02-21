import dom from "@left4code/tw-starter/dist/js/dom";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from '@/hooks/useAxios';

function PwFindstep1() {
	const api = useAxios();
    const navigate = useNavigate();
    const [checkAuth, setCheckAuth] = useState(false);
    const [checkRequestAuth, setCheckRequestAuth] = useState(false);
    const [findPwdParams, setFindPwdParams] = useState({
        userId: '', 
        name: '',
        phone: '',
        code: '', 
    });
    const [alertText, setAlertText] = useState({
        alertResult: [0, ''],
    })

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        setFindPwdParams({ ...findPwdParams, [name]: value });
    };

	// 인증 요청
    const requestAuth = async () => {
        await api.get(`/v1/admin/find-password/request-number?userId=${findPwdParams.userId}&name=${findPwdParams.name}&phone=${findPwdParams.phone}`)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                setCheckRequestAuth(true);
                setTimer(179);
            }
        })
        .catch((err) => {
            setAlertText({...alertText, alertResult: [1, err.response.data.msg]})
            console.log(err);
        });
    }

    // 인증번호 확인
    const sendAuth = () => {
        if (timer <= 0 && checkRequestAuth){
            setAlertText({...alertText, alertResult: [1, '인증 시간이 초과되었습니다. 다시 인증요청해주세요.']});
            return false;
        }
        
        api.post('/v1/admin/find-password/check-number', findPwdParams)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                setCheckAuth(true);
                setAlertText({...alertText, alertResult: [1, '인증이 정상적으로 처리되었습니다.']})
            }
        })
        .catch((err) => {
            setAlertText({...alertText, alertResult: [1, err.response.data.msg]})
            console.log(err);
        });
    }

    // 비밀번호 재설정 버튼
    const linkResetPwd = () => {
        if (checkAuth){
            navigate('/pw_find_step2', {state: {userId: findPwdParams.userId, name: findPwdParams.name, phone: findPwdParams.phone}});
        }else{
            setAlertText({...alertText, alertResult: [1, '본인인증을 진행해주세요.']})
        }
    }

    /** 타이머 */
    const [timer, setTimer] = useState(0);
    let timerId = useRef(null);
    useEffect(() => {
        if (timer >= 0) {
            const Counter = setInterval(() => {
                timerId.current = timer - 1;
                if (timerId.current >= 0) setTimer(timerId.current);
            }, 1000)
            if (timerId.current === 0) setAlertText({...alertText, alertResult: [1, '인증 시간이 초과되었습니다.']})
            return () => clearInterval(Counter)
        }
    }, [timer])
    const timeFormat = (time) => {
        const m = Math.floor(time / 60).toString()
        let s = (time % 60).toString()
        if (s.length === 1) s = `0${s}`
        return `${m}:${s}`
    }

	useEffect(() => {
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
											<button className="w-full py-2 text-base font-medium">
												아이디 찾기
											</button>
										</Link>
										<Link to="/pw_find_step1" className="w-full">
											<button className="w-full py-2 text-base font-medium on">
												비밀번호 재설정
											</button>
										</Link>
									</div>
									<div className="text-slate-600 mt-6 text-center">
										회원가입 시 입력한 정보로 비밀번호를 재설정 할 수 있습니다.
									</div>
									<div className="mt-3">
										<div className="font-medium">아이디</div>
										<input type="text" className="intro-x login__input form-control py-3 px-4 block mt-1"
										name={'userId'} placeholder="아이디를 입력해주세요." onChange={handleChange} 
										/>
									</div>
									<div className="mt-3">
										<div className="font-medium">이름</div>
										<input type="text" className="intro-x login__input form-control py-3 px-4 block mt-1"
										name={'name'} placeholder="이름을 입력해주세요." onChange={handleChange} 
										/>
									</div>
									<div className="mt-3">
										<div className="font-medium">휴대전화번호</div>
										<div className="flex gap-2 items-center mt-1">
											<input type="text" className="intro-x login__input form-control py-3 px-4 block w-60"
											name={'phone'} placeholder="-를 제외한 휴대폰 번호 11자 입력" onChange={handleChange} 
											/>
											<button className="btn btn-danger w-20 py-3 shrink-0" onClick={requestAuth}>인증요청</button>
											{checkRequestAuth && (<div className="text-slate-400">{timeFormat(timer)}</div>)}
										</div>
										<div className="flex gap-2 items-center mt-3">
											<input type="text" className="intro-x login__input form-control py-3 px-4 block w-60"
											name={'code'} placeholder="인증번호를 입력해주세요." onChange={handleChange}
											/>
											<button 
												className={findPwdParams.code !== "" 
												? 'btn btn-green w-20 py-3 shrink-0' 
												: 'btn btn-secondary w-20 py-3 shrink-0'} onClick={sendAuth}>
												확인
											</button>
										</div>
										{!!alertText.alertResult[0] && <div className="text-sm text-danger mt-2 ml-2">{alertText.alertResult[1]}</div>}
									</div>

									<div className="intro-x mt-5 text-center ">
										<span className="w-full" onClick={linkResetPwd}>
											<button className="btn btn-sky py-3 px-4 w-full align-top">
												확인
											</button>
										</span>
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

export default PwFindstep1;
