import dom from "@left4code/tw-starter/dist/js/dom";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxios from '@/hooks/useAxios';

function PwFindstep2() {
	const location = useLocation();
    const state = location.state;
    const userNo = state?.userNo;
    const api = useAxios();
    const navigate = useNavigate();
    const [resetPwdParams, setResetPwdParams] = useState({
        pwd: '',
        pwd_confirm: '',
    });
    const [alertText, setAlertText] = useState({
        alertPwd: [0, ''],
        alertResult: [0, ''],
    })
    const passReg = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        if (name === 'pwd'){
            if (value.length < 8 || value.length >= 16) {
                setAlertText({...alertText, alertPwd: [1, '8~16자리 이내로 해주세요.']})
            }else if (!passReg.test(value)) {
                setAlertText({...alertText, alertPwd: [1, '영어 대소문자, 숫자 조합으로 입력해주세요.']})
            }else {
                setAlertText({...alertText, alertPwd: [0, '']})
            }
        }
        setResetPwdParams({ ...resetPwdParams, [name]: value });
    };

    // 비밀번호 재설정 확인 버튼
    const requestChangePassword = () => {
        if (resetPwdParams.pwd === "") {
            setAlertText({...alertText, alertPwd: [1, '비밀번호를 입력해주세요.']}); 
            return false;
        }
        if (resetPwdParams.pwd !== resetPwdParams.pwd_confirm) {
            setAlertText({...alertText, alertResult: [1, '비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.']});
            return false;
        }

        api.post('/admins/findAdminID', resetPwdParams)
        .then((res) => {
            console.log(res)
            if (res.data.code === 200) {
                if (res.data.body === null){
                    setAlertText({...alertText, alertResult: [1, '사용할 수 없는 비밀번호입니다.']})
                }else{
                    navigate('/pw_find_reslut', {state: {userNo: '11'}});
                }
            }
        })
        .catch((err) => {
            setAlertText({...alertText, alertResult: [1, '데이터 처리중 오류가 발생하였습니다.']})
            console.log(err);
        });
    }

	useEffect(() => {
		if (typeof(userNo) === 'undefined') navigate('/')
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
									비밀번호 재설정
								</div>
								<div className="box p-8">
									<div>
										<div className="font-medium">새 비밀번호</div>
										<input
											type="password" name={'pwd'} 
											className="intro-x login__input form-control py-3 px-4 block mt-1"
											placeholder="새 비밀번호를 입력해주세요."
											onChange={handleChange}
										/>
										{!!alertText.alertPwd[0] && <div className="text-sm text-danger mt-2 ml-2">{alertText.alertPwd[1]}</div>}
										{/* <div className="text-sm text-danger mt-2 ml-2">
										비밀번호는 8~16자의 영어 대소문자, 숫자 조합으로
										입력해주세요. */}
									</div>

									<div className="mt-3">
										<div className="font-medium">비밀번호 확인</div>
										<input
											type="password" name={'pwd_confirm'} 
											className="intro-x login__input form-control py-3 px-4 block mt-1"
											placeholder="다시한번 비밀번호를 입력해주세요."
											onChange={handleChange}
										/>
										{!!alertText.alertResult[0] && <div className="text-sm text-danger mt-2 ml-2">{alertText.alertResult[1]}</div>}
										{/* <div className="text-sm text-danger mt-2 ml-2">
										비밀번호가 일치하지 않습니다. 다시 한번 확인해주세요.
										</div> */}
									</div>

									<div className="intro-x mt-5 text-center ">
										<Link to="#" className="w-full" onClick={requestChangePassword}>
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
		</React.Fragment>
	);
}

export default PwFindstep2;
