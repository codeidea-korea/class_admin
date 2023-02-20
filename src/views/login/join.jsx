import dom from "@left4code/tw-starter/dist/js/dom";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from '@/hooks/useAxios';

function Join() {
	const navigate = useNavigate();
	const api = useAxios();
	const [isDuplicatedUserID, setIsDuplicatedUserID] = useState(false);
    const [passCheck, setPassCheck] = useState(false);
    const [idCheckBorder, setIdCheckBorder] = useState(false);
	const [checkRequestAuth, setCheckRequestAuth] = useState(false);
	const [checkAuth, setCheckAuth] = useState(false);
	const [joinParams, setJoinParams] = useState({
        userId: '',
        password: '',
		password_confirm: '', 
		phone: '', 
		code: '', 
    });
    const [alertText, setAlertText] = useState({
        alertUserID: [0, ''],
        alertPass: [0, ''],
        alertPassCheck: [0, ''],
        alertResult: [0, ''],
    })
	const idReg = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const passReg = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;

	const handleChange = (event) => {
        const { name, value } = event.currentTarget;
		if (name === 'userId') {
            setIsDuplicatedUserID(false);
            if (value.length < 5 || value.length > 20) {
                setAlertText({...alertText, alertUserID: [1, '아이디는 5~20자의 영문 소문자, 숫자 조합으로 입력해주세요.']})
                setIdCheckBorder(false);
            }else if (!idReg.test(value)) {
                setAlertText({...alertText, alertUserID: [1, '영문, 숫자를 최소 1자리를 포함해주세요.']})
                setIdCheckBorder(false);
            }else {
                setAlertText({...alertText, alertUserID: [0, '']})
                setIdCheckBorder(true);
            }
        }else if (name === 'password') {
            if (value.length < 8 || value.length >= 16) {
                setAlertText({...alertText, alertPass: [1, '8~16자리 이내로 해주세요.']})
            }else if (!passReg.test(value)) {
                setAlertText({...alertText, alertPass: [1, '영문, 숫자, 특수문자를 최소 1자리를 포함해주세요.']})
            }else {
                setAlertText({...alertText, alertPass: [0, '']})
            }
        }else if (name === 'password_confirm') {
			if (joinParams.password !== value){
				setAlertText({...alertText, alertPassCheck: [1, '비밀번호가 일치하지 않습니다.']})
			}else{
				setAlertText({...alertText, alertPassCheck: [0, '']})
				setPassCheck(true)
			}
        }
        setJoinParams({ ...joinParams, [name]: value });
    };

	// 인증 요청
    const requestAuth = async () => {
		if (idCheckBorder && passCheck && isDuplicatedUserID && joinParams.phone !== ""){
			setAlertText({...alertText, alertResult: [0, '']}); 
			await api.get(`/v1/admin/sign-up/request-number?phone=${joinParams.phone}`)
			.then((res) => {
				console.log(res)
				if (res.status === 200) {
					setCheckRequestAuth(true);
					setTimer(179);
				}
			})
			.catch((err) => {
				setAlertText({...alertText, alertResult: [1, '데이터 처리중 오류가 발생하였습니다.']})
				console.log(err);
			});
		}else{
			setAlertText({...alertText, alertResult: [1, '입력한 정보가 올바르지 않습니다. 다시 확인해주세요.']})
		}
    }
    // 인증번호 확인
    const sendAuth = () => {
        if (timer <= 0 && checkRequestAuth){
            setAlertText({...alertText, alertResult: [1, '인증 시간이 초과되었습니다. 다시 인증요청해주세요.']});
            return false;
        }
        
        api.post('/v1/admin/sign-up/check-number', joinParams)
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

	// 아이디 중복확인
	const checkUserIdDuplication = () => {
        if (!joinParams.userId) {
            setAlertText({...alertText, alertUserID: [1, '아이디는 5~20자의 영문 소문자, 숫자 조합으로 입력해주세요.']})
            return
        }
        api.get(`/v1/sign-up/check-duplicate?userId=${joinParams.userId}`)
        .then((res) => {
			console.log(res);
			if (res.status === 200){
                setIsDuplicatedUserID(true);
                setAlertText({...alertText, alertUserID: [2, '사용 가능한 아이디입니다.']})
            }
		})
		.catch((err) => {
			setIsDuplicatedUserID(false);
			setAlertText({...alertText, alertUserID: [1, err.response.data.msg]})
            console.log(err);
		});
    };

	// 회원가입
	const requestJoin = () => {
		if (checkAuth){
            api.post('v1/admin/sign-up', joinParams)
			.then((res) => {
				console.log(res)
				if (res.status === 200) {
					navigate('/join_result', {state: {code: 200}})
				}
			})
			.catch((err) => {
				setAlertText({...alertText, alertResult: [1, err.response.data.msg]})
				console.log(err);
			});
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
		dom("body").removeClass("main").removeClass("error-page").addClass("login_body");
	}, []);


	// 자세히보기
	const [isOpen, setMenu] = useState(false);
	const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }
	const [isOpen2, setMenu2] = useState(false);
	const toggleMenu2 = () => {
        setMenu2(isOpen2 => !isOpen2);
    }
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
													type="text" name={'userId'}
													className="intro-x login__input form-control py-3 px-4 block"
													placeholder="아이디를 입력해주세요."
													onChange={handleChange}
												/>
												<button className="btn btn-primary w-20 py-3 shrink-0" onClick={checkUserIdDuplication}>중복확인</button>
											</div>
											{!!alertText.alertUserID[0] && <div className="text-sm text-danger mt-2 ml-2">{alertText.alertUserID[1]}</div>}
										</div>
										<div className="mt-3">
											<div className="font-medium">
												비밀번호 <span className="text-danger">*</span>
											</div>
											<input
												type="password" name={'password'}
												className="intro-x login__input form-control py-3 px-4 block mt-1"
												placeholder="비밀번호를 입력해주세요." 
												onChange={handleChange}
											/>
											{!!alertText.alertPass[0] && <div className="text-sm text-danger mt-2 ml-2">{alertText.alertPass[1]}</div>}
										</div>

										<div className="mt-3">
											<div className="font-medium">
												비밀번호 확인 <span className="text-danger">*</span>
											</div>
											<input
												type="password" name={'password_confirm'}
												className="intro-x login__input form-control py-3 px-4 block mt-1"
												placeholder="비밀번호를 입력해주세요." 
												onChange={handleChange}
											/>
											{!!alertText.alertPassCheck[0] && <div className="text-sm text-danger mt-2 ml-2">{alertText.alertPassCheck[1]}</div>}
										</div>

										{/* 이름 추가 */}
										<div className="mt-3">
											<div className="font-medium">
												이름<span className="text-danger">*</span>
											</div>
											<input
												type="text" name={''}
												className="intro-x login__input form-control py-3 px-4 block mt-1"
												placeholder="한글만 입력 가능합니다." 
											/>
											<div className="text-sm text-danger mt-2 ml-2">이름을 입력해주세요</div>
										</div>
										{/* 이름 추가 끝 */}

										<div className="mt-3">
											<div className="font-medium">휴대전화번호</div>
											<div className="flex gap-2 items-center mt-1">
												<input
													type="number" name={'phone'}
													className="intro-x login__input form-control py-3 px-4 block w-60"
													placeholder="휴대전화번호를 입력해주세요." 
													onChange={handleChange}
												/>
												<button className="btn btn-danger w-20 py-3 shrink-0" onClick={requestAuth}>인증요청</button>
												{checkRequestAuth && (<div className="text-slate-400">{timeFormat(timer)}</div>)}
											</div>
											<div className="flex gap-2 items-center mt-3">
												<input
													type="text" name={'code'}
													className="intro-x login__input form-control py-3 px-4 block w-60"
													placeholder="인증번호를 입력해주세요." 
													onChange={handleChange}
												/>
												<button 
													className={joinParams.code !== "" 
													? 'btn btn-green w-20 py-3 shrink-0' 
													: 'btn btn-secondary w-20 py-3 shrink-0'} onClick={sendAuth}>
													확인
												</button>
											</div>
											{!!alertText.alertResult[0] && <div className="text-sm text-danger mt-2 ml-2">{alertText.alertResult[1]}</div>}
										</div>
										
									</div>
									
									{/* 약관동의 추가 */}
									<div className="mt-5">
										<h2 className="text-lg">약관동의</h2>
										<div className="border p-5 mt-2 rounded-md">
											<div className="">
												<div className="form-check">
													<input id="checkbox-switch-1" className="form-check-input" type="checkbox" value="" />
													<label className="form-check-label" htmlFor="checkbox-switch-1">회원가입 약관에 모두 동의합니다.</label>
												</div>
												<div className="mt-1 text-slate-400">이용약관, 개인정보처리 및 이용에 대한 안내(일부 선택), 개인정보의 마케팅 및 광고 활용(선택), 개인정보의 위탁(선택)에 모두 동의합니다.</div>
											</div>
											<div className="mt-3 border-t pt-3">
												<div className="flex justify-between items-center">
													<div className="form-check">
														<input id="checkbox-switch-2" className="form-check-input" type="checkbox" value="" />
														<label className="form-check-label" htmlFor="checkbox-switch-2">이용약관 <span className="text-primary">[필수]</span></label>
													</div>
													<button className="text-slate-400 underline see_detail" onClick={()=>toggleMenu()}>자세히 보기</button>
												</div>
												<div className={isOpen ? "show-menu" : "hide-menu"}>
													<div className="bg-slate-100 p-3 mt-2 rounded-md text-slate-500 h-80 overflow-y-auto" >
														내용입니다.
													</div>
												</div>
											</div>
											<div className="mt-3 border-t pt-3">
												<div className="flex justify-between items-center">
													<div className="form-check">
														<input id="checkbox-switch-3" className="form-check-input" type="checkbox" value="" />
														<label className="form-check-label" htmlFor="checkbox-switch-3">개인정보 필수항목에 대한 처리 및 이용 <span className="text-primary">[필수]</span></label>
													</div>
													<button className="text-slate-400 underline" onClick={()=>toggleMenu2()}>자세히 보기</button>
												</div>
												<div className={isOpen2 ? "show-menu" : "hide-menu"}>
													<div className="bg-slate-100 p-3 mt-2 rounded-md text-slate-500 h-80 overflow-y-auto" >
														내용입니다.
													</div>
												</div>
												
											</div>
										</div>
									</div>
									{/* 약관동의 추가 끝 */}
									<div className="intro-x mt-5 text-center ">
										<Link to="#" onClick={requestJoin}>
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
		</React.Fragment>
	);
}

export default Join;
