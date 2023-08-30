import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "@/states/userState";
import { Lucide, Modal, ModalHeader, ModalBody, ModalFooter, Litepicker } from "@/base-components";
import { userStatusName, userSchoolYear, convertBirthdayStr, userAuthorityName } from '@/components/helpers';
import DaumPostcode from 'react-daum-postcode';

function MemberEdit() {
  	const { id } = useParams()
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
	const [userInfo, setUserInfo] = useState();
	const [memberInfo, setMemberInfo] = useState({
		name: '', grade: '', birthDay: '', schoolName: '', schoolYear: '', email: '', phone: '', addr: '', addrDetail: '', tos4YN: '', children: [], fieldName: []
	});
	const [openPostcode, setOpenPostcode] = useState(false);
	const [Searchschool, setSearchschool] = useState(false);
	const [schoolSearchString, setSchoolSearchString] = useState({ searchWord: '' });
	const [searchList, setSearchList] = useState();

	/** 회원 상세 데이터 가져오기 */
	const getUserData = async () => {
        await api.get(`/admin/user-management/${id}`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				setUserInfo(res.data);
				setMemberInfo({ ...memberInfo, 
					name:res.data.name, 
					grade:res.data.grade, 
					birthDay:res.data.birthDay, 
					schoolName:res.data.schoolName, 
					schoolYear:res.data.schoolYear, 
					email:res.data.email, 
					phone:res.data.phone, 
					addr:res.data.addr, 
					addrDetail:res.data.addrDetail, 
					tos4YN:res.data.tos4YN, 
					fieldName:res.data.fieldName,
				});
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

	/** filed control */
	const handleChange = (event) => {
        const { name, value } = event.currentTarget;

				if(name === 'fieldName1' || name === 'fieldName2' || name === 'fieldName3') {
					if(event.target.checked) {
						let fieldName = memberInfo.fieldName;
						fieldName.push(value)
						setMemberInfo({...memberInfo, fieldName: fieldName})
					} else {
						setMemberInfo({...memberInfo, fieldName: memberInfo.fieldName.filter(val => val !== value)})
					}
				} else {
					setMemberInfo({ ...memberInfo, [name]: value });
				}
    };

	useEffect(() => {
		console.log(memberInfo.fieldName)
	}, [memberInfo])

	// 주소찾기
    const handlePostcode = {
        clickButton: () => {
            setOpenPostcode(current => !current);
        },
        selectAddress: (data) => {
            setMemberInfo({ ...memberInfo, addr: data.address });
            setOpenPostcode(false);
        },
    }

	/** 학교명 검색 */
	const searchSchoolProc = (str) => {
		fetch(`https://open.neis.go.kr/hub/schoolInfo?KEY=48a9a4323bd4474aac9da5521e28dc0d&Type=json&pIndex=1&pSize=100&SCHUL_NM=${str}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			if (data.RESULT){
				setSearchList();
			}else{
				setSearchList(data.schoolInfo[1].row);
			}
		});
	}

	/** 회원정보 수정 */
	const userDataUpdate = async () => {
		//console.log(memberInfo); return false;
		let api_url = "";
		if (userInfo?.authority === "STUDENT"){
			api_url = `/admin/user-management/student/${id}`;
		}else{
			api_url = `/admin/user-management/parents/${id}`;
		}
		await api.put(api_url, memberInfo, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				console.log(res.status)
				navigate(`/member_view/${id}`);
			}
		})
		.catch((err) => {
			console.log('error', err);
			if (err.response.status === 401){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
	}

	return (
		<React.Fragment>
			<div className="grid grid-cols-12 gap-6 mt-5">
				<div className="intro-y col-span-6">
					<div className="flex">
						<h2 className="text-lg font-bold">회원정보</h2>
					</div>
					<div className="intro-y box mt-3 p-5">
						<table className="table table_layout01">
							<tbody>
							<tr>
								<td className="w-48"><span className="font-bold">회원유형</span></td>
								<td>{userAuthorityName(userInfo?.authority)}</td>
							</tr>
							<tr>
								<td><span className="font-bold">이름</span></td>
								<td>
									<input type="text" name={'name'} className="form-control" defaultValue={userInfo?.name} onChange={handleChange} />
								</td>
							</tr>
							<tr>
								<td><span className="font-bold">등급</span></td>
								<td>
									<select name={"grade"} value={memberInfo.grade} className="form-select" onChange={handleChange}>
										<option value={"PREMIUM"}>프리미엄</option>
										<option value={"GOLD"}>골드</option>
										<option value={"SILVER"}>실버</option>
										<option value={"BRONZE"}>브론즈</option>
									</select>
								</td>
							</tr>
							<tr>
								<td><span className="font-bold">아이디</span></td>
								<td>{userInfo?.userId}</td>
							</tr>
							<tr>
								<td><span className="font-bold">생년월일</span></td>
								<td>
									<Litepicker value={memberInfo.birthDay} className="form-control" 
									onChange={(event) => { setMemberInfo({ ...memberInfo, birthDay:event }); }}
									options={{
										numberOfMonths: 1, 
										format: 'YYYY-MM-DD', 
										autoApply: true,
										dropdowns: {
											minYear: 1950,
											maxYear: null,
											months: true,
											years: true,
										},
									}} />
								</td>
							</tr>
							{userInfo?.authority === "STUDENT" && (
								<React.Fragment>
									<tr>
										<td>
											<span className="font-bold">학교</span>
										</td>
										<td>
											<div className="flex gap-2">
												<input type="text" name={'schoolName'} className="form-control" value={memberInfo.schoolName} onChange={handleChange}/>
												<button className="btn btn-primary w-24" onClick={() => {setSearchschool(true);}}>
													학교검색
												</button>
											</div>
										</td>
									</tr>
									<tr>
										<td><span className="font-bold">학년</span></td>
										<td>
											<select name={'schoolYear'} defaultValue={memberInfo.schoolYear} className="form-select" onChange={handleChange}>
												<option value="E1">초1</option>
												<option value="E2">초2</option>
												<option value="E3">초3</option>
												<option value="E4">초4</option>
												<option value="E5">초5</option>
												<option value="E6">초6</option>
												<option value="M1">중1</option>
												<option value="M2">중2</option>
												<option value="M3">중3</option>
												<option value="H1">고1</option>
												<option value="H2">고2</option>
												<option value="H3">고3</option>
											</select>
										</td>
									</tr>
								</React.Fragment>
							)}
							<tr>
								<td><span className="font-bold">이메일</span></td>
								<td>
									<input type="text" name={'email'} className="form-control" defaultValue={memberInfo.email} onChange={handleChange}/>
								</td>
							</tr>
							<tr>
								<td><span className="font-bold">휴대전화번호</span></td>
								<td>
									<input type="text" name={'phone'} className="form-control" defaultValue={memberInfo.phone} onChange={handleChange}/>
								</td>
							</tr>
							<tr>
								<td>
								<span className="font-bold">주소</span>
								</td>
								<td>
									<div className="flex gap-2">
										<input type="text" name={'addr'} className="form-control" defaultValue={memberInfo.addr} onChange={handleChange}/>
										<button className="btn btn-primary w-24" onClick={handlePostcode.clickButton}>주소검색</button>
									</div>
									<input type="text" name={'addrDetail'} className="form-control mt-2" defaultValue={memberInfo.addrDetail} onChange={handleChange}/>
									{openPostcode && 
                                        <DaumPostcode 
                                            onComplete={handlePostcode.selectAddress}
                                            autoClose={false}
                                            defaultQuery=''
                                        />
                                    }
								</td>
							</tr>
							<tr>
								<td><span className="font-bold">최종로그인</span></td>
								<td>{userInfo?.lastLoginAt}</td>
							</tr>
							<tr>
								<td><span className="font-bold">회원 상태</span></td>
								<td>{userStatusName(userInfo?.status)}</td>
							</tr>
							<tr>
								<td>
									<span className="font-bold">소속</span>
								</td>
								<td>
									<div className="flex">
										<div className="form-check mr-5">
											<input id="fieldName1" name="fieldName1" className="form-check-input" type="checkbox" value={'영재원'}
														 checked={memberInfo?.fieldName?.includes("영재원")} onChange={handleChange}/>
											<label className="form-check-label" htmlFor="fieldName1">영재원</label>
										</div>
										<div className="form-check mr-2 mt-2 sm:mt-0">
											<input id="fieldName2" name="fieldName2" className="form-check-input" type="checkbox" value={'과학고'}
														 checked={memberInfo?.fieldName?.includes("과학고")} onChange={handleChange}/>
											<label className="form-check-label" htmlFor="fieldName2">과학고</label>
										</div>
										<div className="form-check mr-2 mt-2 sm:mt-0">
											<input id="fieldName3" name="fieldName3" className="form-check-input" type="checkbox" value={'영재학교'}
														 checked={memberInfo?.fieldName?.includes("영재학교")} onChange={handleChange}/>
											<label className="form-check-label" htmlFor="fieldName3">영재학교</label>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
								<span className="font-bold">마케팅 정보 수신동의</span>
								</td>
								<td>
								<div className="flex">
									<div className="form-check mr-5">
										<input id="tos4Y" name="tos4YN" className="form-check-input" type="radio" value={"Y"} 
										checked={memberInfo.tos4YN === "Y"} onChange={handleChange}/>
										<label className="form-check-label" htmlFor="tos4Y">동의함</label>
									</div>
									<div className="form-check mr-2 mt-2 sm:mt-0">
										<input id="tos4N" name="tos4YN" className="form-check-input" type="radio" value={"N"} 
										checked={memberInfo.tos4YN === "N"} onChange={handleChange}/>
										<label className="form-check-label" htmlFor="tos4N">동의안함</label>
									</div>
								</div>
								</td>
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

			<div className="flex mt-5 justify-center gap-3">
				<Link to={`/member_view/${id}`}><button className="btn bg-white w-24">취소</button></Link>
				<span onClick={userDataUpdate}><button className="btn w-24 btn-sky">확인</button></span>
			</div>

			{/* BEGIN: Modal 학교검색 */}
			<Modal
				size=""
				backdrop="static"
				show={Searchschool}
				onHidden={() => {
					setSearchschool(false);
				}}
			>
				<ModalHeader>
					<h2 className="font-medium text-base mr-auto">학교검색</h2>
					<button
						className="btn btn-rounded-secondary hidden sm:flex p-1"
						onClick={() => {
							setSearchschool(false);
						}}
					>
						<Lucide icon="X" className="w-4 h-4" />
					</button>
				</ModalHeader>
				<ModalBody className="p-5">
					<div className="flex gap-2">
						<input type="text" className="form-control"
							onChange={(event) => { setSchoolSearchString({ ...schoolSearchString, searchWord: event.currentTarget.value }) }} 
							onKeyPress={(event) => {
								if (event.key === 'Enter') { searchSchoolProc(schoolSearchString.searchWord); }
							}}
						/>
						<button className="btn btn-primary w-24" onClick={() => {searchSchoolProc(schoolSearchString.searchWord)}}>검색</button>
					</div>
					<div className="bg-slate-100 rounded-md mt-3 p-2">검색결과가 없습니다.</div>
					{searchList?.map((item, index) => {
						return (
							<button key={index} className="mt-2 hover:bg-slate-100 p-2 rounded-md w-full text-left" 
								onClick={() => { setMemberInfo({ ...memberInfo, schoolName: item.SCHUL_NM }); setSearchschool(false); }}
							>{item.SCHUL_NM}</button>
						)
					})}
				</ModalBody>
				<ModalFooter>
					<button type="button" className="btn btn-sky w-24" onClick={() => { setSearchschool(false);}}>닫기</button>
				</ModalFooter>
			</Modal>
			{/* END: Modal학교검색 */}

		</React.Fragment>
	);
}

export default MemberEdit;
