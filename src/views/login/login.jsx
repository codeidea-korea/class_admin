import dom from "@left4code/tw-starter/dist/js/dom";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from '@/hooks/useAxios';
import { useCookies } from "react-cookie";
import { userState } from "@/states/userState";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";

function Login() {
	const api = useAxios();
    const navigate = useNavigate();
    const [checkAuth, setCheckAuth] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
	const [userInfo, setUserInfo] = useRecoilState(userState);
    const [loginParams, setLoginParams] = useState({
        userId: '',
        password: '',
    });
    const [alertText, setAlertText] = useState({
        alertResult: [0, ''],
    })

	const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        setLoginParams({ ...loginParams, [name]: value });
    };

	const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            requestLogin();
        }
    };

	const handleOnRememberIdChecked = (event) => {
        if(event.currentTarget.checked){
            setCookie('rememberId', loginParams.userId, {maxAge: 2000});
        } else {
            removeCookie('rememberId');
        }
    };

	const requestLogin = async () => {
		api.post('/v1/sign-in', loginParams)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                setUserInfo({...userInfo, 
                    authority: res.data.authority,
                    status: res.data.status,
                    token: res.data.token,
                    userId: res.data.userId,
                });
                navigate('/');
            }
        })
        .catch((err) => {
            setAlertText({...alertText, alertResult: [1, err.response.data.msg]})
            console.log(err);
        });
	}

	useEffect(() => {
		if (cookies['rememberId']) {
            const target = document.getElementById('userId');
            target.value = cookies['rememberId'];
			setLoginParams({ ...loginParams, userId: cookies['rememberId'] });
        }

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
									관리자 로그인
								</div>
								<div className="box p-8">
									<div className="intro-x">
										<input 
											type="text" name={'userId'} id={'userId'} 
											className="intro-x login__input form-control py-3 px-4 block" 
											placeholder="아이디를 입력해주세요." 
											onChange={handleChange} 
										/>
										<input
											type="password" name={'password'} 
											className="intro-x login__input form-control py-3 px-4 block mt-4"
											placeholder="비밀번호를 입력해주세요. " 
											onChange={handleChange} 
											onKeyPress={handleKeyPress}
										/>
										{!!alertText.alertResult[0] && <div className="text-sm text-danger mt-2 ml-2">{alertText.alertResult[1]}</div>}
									</div>
									<div className="intro-x flex text-slate-400 text-sm mt-4">
										<div className="flex items-center mr-auto">
										<input
											id="remember-me"
											type="checkbox"
											className="form-check-input border mr-2" 
											onChange={handleOnRememberIdChecked} 
                                            defaultChecked={cookies['rememberId']}
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
										<button className="btn btn-sky py-3 px-4 w-full align-top" onClick={requestLogin}>로그인</button>
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
										<Link to="/join">
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
		</React.Fragment>
	);
}

export default Login;
