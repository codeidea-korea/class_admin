import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import { userStatusName, userSchoolYear, convertBirthdayStr, userAuthorityName } from '@/components/helpers';

function MemberView() {
	const { id } = useParams()
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
	const [userInfo, setUserInfo] = useState();

	/** 회원 상세 데이터 가져오기 */
	const getUserData = async () => {
        await api.get(`/admin/user-management/${id}`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				console.log(res.data)
				setUserInfo(res.data);
			}
		})
		.catch((err) => {
			console.log('error', err);
			if (err.response.status === 401){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    };

	useEffect(() => {
        (async () => {
            await getUserData();
        })();
    }, []);

	return (
		<React.Fragment>
			{/* BEGIN: Page Layout */}
			<div className="grid grid-cols-12 gap-6 mt-5">
				<div className="intro-y col-span-6">
					<div className="flex">
						<h2 className="text-lg font-bold">회원정보</h2>
					</div>
					<div className="intro-y box mt-3 p-5">
						<table className="table table_layout01">
							<tbody>
							<tr>
								<td className="w-48">
									<span className="text-slate-400 font-bold">회원유형</span>
								</td>
								<td>{userAuthorityName(userInfo?.authority)}</td>
							</tr>
							<tr>
								<td>
								<span className="text-slate-400 font-bold">이름</span>
								</td>
								<td>{userInfo?.name}</td>
							</tr>
							<tr>
								<td>
								<span className="text-slate-400 font-bold">등급</span>
								</td>
								<td>{userInfo?.grade}</td>
							</tr>
							<tr>
								<td>
								<span className="text-slate-400 font-bold">아이디</span>
								</td>
								<td>{userInfo?.userId}</td>
							</tr>
							<tr>
								<td>
								<span className="text-slate-400 font-bold">생년월일</span>
								</td>
								<td>{convertBirthdayStr(userInfo?.birthDay)}</td>
							</tr>
							<tr>
								<td>
								<span className="text-slate-400 font-bold">학교</span>
								</td>
								<td>{userInfo?.schoolName}</td>
							</tr>
							<tr>
								<td>
								<span className="text-slate-400 font-bold">학년</span>
								</td>
								<td>{userSchoolYear(userInfo?.schoolYear)}</td>
							</tr>
							<tr>
								<td>
								<span className="text-slate-400 font-bold">이메일</span>
								</td>
								<td>{userInfo?.email}</td>
							</tr>
							<tr>
								<td>
								<span className="text-slate-400 font-bold">휴대전화번호</span>
								</td>
								<td>{userInfo?.phone}</td>
							</tr>
							<tr>
								<td>
								<span className="text-slate-400 font-bold">주소</span>
								</td>
								<td>{userInfo?.addr} {userInfo?.addrDetail}</td>
							</tr>
							<tr>
								<td>
								<div className="text-white font-bold w-full bg-dark rounded-md p-2 text-center">
									최종로그인
								</div>
								</td>
								<td>{userInfo?.lastLoginAt}</td>
							</tr>
							<tr>
								<td>
									<div className="text-white font-bold w-full bg-dark rounded-md p-2 text-center">
										회원 상태
									</div>
								</td>
								<td>{userStatusName(userInfo?.status)}</td>
							</tr>
							<tr>
								<td>
									<div className="text-white font-bold w-full bg-dark rounded-md p-2 text-center">
										마케팅 정보 수신동의
									</div>
								</td>
								<td>{userInfo?.tos4YN === "Y" ? "동의함" : "동의안함"}</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="intro-y col-span-6">
					{userInfo?.authority === "STUDENT" ? (
						<React.Fragment>
							<div className="flex">
								<h2 className="text-lg font-bold">부모연동 </h2>
							</div>
							{userInfo.parents !== null && (
								<div className="intro-y box mt-3 p-5">
									<table className="table table_layout01">
										<tbody>
										<tr>
											<td className="w-48">
												<span className="text-slate-400 font-bold">이름</span>
											</td>
											<td>{userInfo.parents.name}</td>
										</tr>
										<tr>
											<td>
												<span className="text-slate-400 font-bold">전화번호</span>
											</td>
											<td>{userInfo.parents.phone}</td>
										</tr>
										<tr>
											<td>
												<span className="text-slate-400 font-bold">아이디</span>
											</td>
											<td>{userInfo.parents.userId}</td>
										</tr>
										</tbody>
									</table>
								</div>
							)}
						</React.Fragment>
					) : (
						<React.Fragment>
							<div className="flex">
								<h2 className="text-lg font-bold">자녀연동</h2>
							</div>
							{userInfo?.children.length > 0 && (
								userInfo?.children.map((item, index) => {
									return (
										<div key={index} className="intro-y box mt-3 p-5">
											<table className="table table_layout01">
												<tbody>
												<tr>
													<td className="w-48">
													<span className="text-slate-400 font-bold">이름</span>
													</td>
													<td>{item.name}</td>
												</tr>
												<tr>
													<td>
													<span className="text-slate-400 font-bold">전화번호</span>
													</td>
													<td>{item.phone}</td>
												</tr>
												<tr>
													<td>
													<span className="text-slate-400 font-bold">아이디</span>
													</td>
													<td>{item.userId}</td>
												</tr>
												</tbody>
											</table>
										</div>
									)
								})
							)}
						</React.Fragment>
					)}
				</div>
			</div>

			{/* button 시작*/}
			<div className="flex mt-5 justify-center gap-3">
				<Link to="/"><button className="btn bg-white w-24">목록</button></Link>
				<Link to={`/member_edit/${id}`}><button className="btn w-24 btn-sky">수정</button></Link>
			</div>
			{/* button 끝*/}
			{/* END: Page Layout */}
		</React.Fragment>
	);
}

export default MemberView;
