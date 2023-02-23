import React, { useState, useEffect, useRef } from "react";
import { Lucide, Modal, ModalBody, ModalHeader, ModalFooter, Notification } from "@/base-components";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { userStatusName, userStatusColorClass, userSchoolYear } from '@/components/helpers';

function MemberMng() {
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
	const [users, setUsers] = useState();
	const [searchParams, setSearchParams] = useState({
		searchWord: '', schoolYear: '', grade: '', linkYN: '', status: ''
	})
	const [pageParams, setPageParams] = useState({
		totalPages: 0, totalElements: 0, currentPage: 1, pageRangeDisplayed: 10
	});
	const [selDelete, selDeleteDetail] = useState(false);
	const [alertText, setAlertText] = useState({
        alertSelUserRemove: [0, ''],
    })

	/** 회원 데이터 가져오기 */
	const getUserList = async (rstat='') => {
		let params = "";
		if (rstat === "reset"){
			setSearchParams({ ...searchParams, searchWord:'', schoolYear:'', grade:'', linkYN:'', status:'' });
			document.getElementById('schoolYear').value = "";
			document.getElementById('grade').value = "";
			document.getElementById('linkYN').value = "";
			document.getElementById('status').value = "";
		}else{
			if (searchParams.searchWord !== "") params += `&searchWord=${searchParams.searchWord}`;
			if (searchParams.schoolYear !== "") params += `&schoolYear=${searchParams.schoolYear}`;
			if (searchParams.grade !== "") params += `&grade=${searchParams.grade}`;
			if (searchParams.linkYN !== "") params += `&linkYN=${searchParams.linkYN}`;
			if (searchParams.status !== "") params += `&status=${searchParams.status}`;
		}

        await api.get(`/admin/user-management?page=${pageParams.currentPage}&limit=${pageParams.pageRangeDisplayed}${params}`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				setUsers(res.data.content);
				setPageParams({ ...pageParams, totalPages: res.data.totalPages, totalElements: res.data.totalElements })
			}
		})
		.catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    };

	// searchParams control
	const handleSearch = (event) => {
		const { name, value } = event.currentTarget;
		setSearchParams({ ...searchParams, [name]: value });
	}

	// paginate handle
	const handlePageClick = (event) => {
		setPageParams({ ...pageParams, currentPage: (event.selected + 1) })
    };

	useEffect(() => {
        (async () => {
            await getUserList();
        })();
    }, []);

	useEffect(() => {
        (async () => {
            await getUserList();
        })();
    }, [pageParams.currentPage, searchParams.schoolYear, searchParams.grade, searchParams.linkYN, searchParams.status]);

	// 체크박스 세트
    const ckAll = document.querySelector(".ck-all");
    const ckArr = Array.from(document.querySelectorAll(".ck"));
    const handlerAllCheck = (event) => {
        const checked = event.target.checked;
        ckArr.forEach(ck => {
            ck.checked = checked;
        });
    };
    const handleCheck = () => {
        let cnt = 0;
        ckArr.forEach(ck => {
            if (ck.checked) cnt++
        });
        if (cnt == ckArr.length) {
            ckAll.checked = true;
        } else {
            ckAll.checked = false;
        }
    };

	/** 회원 등급 변경 */
	const userGradeUpdate = async (gval, uid) => {
		await api.patch(`/admin/user-management/grade/${uid}?grade=${gval}`, null, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				basicNonStickyNotificationToggle();
			}
		})
		.catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
	}

	/** 회원 삭제 팝업 */
	const userSelRemovePop = () => {
		const sequences = new Array();
        const checkedInputs = Array.from(document.querySelectorAll('.ck'));
        checkedInputs.filter(item => item.value != '').forEach(item => {
            if (item.checked) sequences.push(parseInt(item.value));
        });
        if(sequences.length > 0){
			setAlertText({...alertText, alertSelUserRemove: [0, '']})
            selDeleteDetail(true);
        }else{
			setAlertText({...alertText, alertSelUserRemove: [1, '삭제할 회원을 선택해주세요.']})
		}
	}

	/** 회원 삭제 요청 */
	const userSelRemoveProc= async () => {
		const sequences = new Array();
        const checkedInputs = Array.from(document.querySelectorAll('.ck'));
        checkedInputs.filter(item => item.value != '').forEach(item => {
            if (item.checked) sequences.push(parseInt(item.value));
        });
		if(sequences.length > 0){
			//await api.delete(`/admin/user-management?users=${sequences}`,  
			await api.delete(`/admin/user-management?users=1111`,  
				{headers: {Authorization: `Bearer ${user.token}`}})
			.then((res) => {
				console.log(res)
				if (res.status === 200) {
					document.querySelectorAll('input:checked').forEach(item => {
						item.checked = false;
					});
					selDeleteDetail(false);
					getUserList('reset');
				}
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
        }else{
			setAlertText({...alertText, alertSelUserRemove: [1, '삭제할 회원을 선택해주세요.']})
		}
	}

	/** 회원 엑셀 다운로드 */
	const usersExcelDownload = async () => {
		await api.get(`/admin/user-management/excel-download`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				const url = window.URL.createObjectURL(
					new Blob([res.data],
						{type: res.headers["content-type"]})
				);
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", `회원관리.xlsx`);
				document.body.appendChild(link);
				link.click();
				link.remove();
			}
		})
		.catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
	}

	const basicNonStickyNotification = useRef();
	const basicNonStickyNotificationToggle = () => {
		basicNonStickyNotification.current.showToast();
	};

	return (
		<React.Fragment>
			{/* BEGIN: Page Layout */}
			<div className="intro-y box mt-5">
				<div className="p-3 px-5 flex items-center border-b border-slate-200/60">
					<div className="text-lg font-medium">
						목록 <span className="color-blue">{pageParams.totalElements}</span>건
					</div>
					<button className="btn ml-2" title="초기화" onClick={() => { getUserList('reset'); }}>
						<Lucide icon="RotateCcw" className="w-4 h-4"></Lucide>
					</button>
					<div className="ml-auto">
						<div className="flex flex-middle gap-3">
							<input type="text" name={"searchWord"} className="form-control w-60" placeholder="검색어 입력" 
								value={searchParams.searchWord}
								onChange={handleSearch} 
								onKeyPress={(event) => {
									if (event.key === 'Enter') { getUserList(); }
								}}
							/>
							<button type="button" className="btn btn-primary flex items-center" onClick={() => {getUserList()}}>
								<Lucide icon="Search" className="w-4 h-4 mr-2"></Lucide>검색
							</button>
						</div>
					</div>
					<button className="btn btn-green ml-3 flex items-center" onClick={usersExcelDownload}>
						<Lucide icon="Save" className="w-4 h-4 mr-2"></Lucide>엑셀 다운로드
					</button>
				</div>
				<div className="intro-y p-5">
					<div className="overflow-x-auto">
						<table className="table">
							<tbody>
							<tr className="text-center bg-slate-100 whitespace-nowrap">
								<td className="w-10">
									<input className="form-check-input ck-all" type="checkbox" onChange={handlerAllCheck}/>
								</td>
								<td className="w-20">번호</td>
								<td>아이디</td>
								<td >이름</td>
								<td>
									<select name={'schoolYear'} id="schoolYear" className="form-control" onChange={handleSearch}>
										<option value="">구분</option>
										<option value="P">학부모</option>
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
								<td>휴대폰번호</td>
								<td>이메일</td>
								<td>회원가입일</td>
								<td>
								<select name={'grade'} id="grade" className="form-control" onChange={handleSearch}>
									<option value="">등급</option>
									<option value="PREMIUM">프리미엄</option>
									<option value="GOLD">골드</option>
									<option value="SILVER">실버</option>
									<option value="BRONZE">브론즈</option>
								</select>
								</td>
								<td>
								<select name={'linkYN'} id="linkYN" className="form-control" onChange={handleSearch}>
									<option value="">자녀연동</option>
									<option value="Y">연동 회원</option>
									<option value="N">미연동 회원</option>
								</select>
								</td>
								<td>
								<select name={'status'} id="status" className="form-control" onChange={handleSearch}>
									<option value="">상태</option>
									<option value="ACTIVE">활동</option>
									<option value="SLEEP">휴면</option>
									<option value="LEAVE">탈퇴</option>
								</select>
								</td>
							</tr>
							{users?.map((item, index) => {
								let uno = parseInt(pageParams.totalElements) - (parseInt(pageParams.currentPage - 1)) * pageParams.pageRangeDisplayed - index;
								return (
									<tr key={index} className="text-center whitespace-nowrap">
										<td>
											<input className="form-check-input ck" type="checkbox" value={item.id} onChange={handleCheck}/>
										</td>
										<td>{uno}</td>
										<td>
											<Link to={`/member_view/${item.id}`} className="underline text-primary">
												{item.userId}
											</Link>
										</td>
										<td>{item.name}</td>
										<td>{userSchoolYear(item.schoolYear)}</td>
										<td>{item.phone}</td>
										<td>{item.email}</td>
										<td>{item.creDate}</td>
										<td>
											<select defaultValue={item.grade} className="form-select small w-full" 
											onChange={(event) => {
												userGradeUpdate(event.currentTarget.value, item.id);
											}}>
												<option value="PREMIUM">프리미엄</option>
												<option value="GOLD">골드</option>
												<option value="SILVER">실버</option>
												<option value="BRONZE">브론즈</option>
											</select>
										</td>
										<td>
											{
												item.children.length > 0 ? (
													<span>{item.children[0]} {item.children.length === 1 ? '' : '외 ' + (item.children.length - 1) + '명'}</span>
												) : (
													<span className="text-slate-400">미연동</span>
												) 
											}
										</td>
										<td>
										<span className={userStatusColorClass(item.status)}>{userStatusName(item.status)}</span>
										</td>
									</tr>
								)
							})}
							</tbody>
						</table>
					</div>
					<button className="btn btn-outline-danger mt-3" onClick={userSelRemovePop}>
						선택 삭제
					</button>
					{!!alertText.alertSelUserRemove[0] && <span className="text-sm text-danger mt-2 ml-2">{alertText.alertSelUserRemove[1]}</span>}
				</div>
			</div>

			<div className="mt-5 flex items-center justify-center">
				<div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
					<nav className="w-full sm:w-auto sm:mr-auto">
						<ReactPaginate
							className={'pagination justify-center'}
							pageClassName={'page-item'}
							pageLinkClassName={'page-link'}
							breakLinkClassName={'page-item'}
							breakLabel="..."
							nextClassName={'page-item'}
							nextLinkClassName={'page-link'}
							nextLabel={<ChevronRight className="w-4 h-4"/>}
							previousClassName={'page-item'}
							previousLinkClassName={'page-link'}
							onPageChange={handlePageClick}
							previousLabel={<ChevronLeft className="w-4 h-4"/>}
							activeClassName={'page-item active'}
							pageRangeDisplayed={pageParams.pageRangeDisplayed}
							pageCount={pageParams.totalPages}
							renderOnZeroPageCount={props => null}
						/>
					</nav>
				</div>
			</div>

			{/* BEGIN: Modal 선택삭제  */}
			<Modal
				size=""
				backdrop=""
				show={selDelete}
				onHidden={() => {
				selDeleteDetail(false);
				}}
			>
				<ModalHeader>
				<h2 className="font-medium text-base mr-auto">선택삭제</h2>
				<button
					className="btn btn-rounded-secondary hidden sm:flex p-1"
					onClick={() => {
					selDeleteDetail(false);
					}}
				>
					<Lucide icon="X" className="w-4 h-4" />
				</button>
				</ModalHeader>
				<ModalBody className="p-5">
				<div className="text-lg font-medium text-center">
					선택한 회원을 삭제하시겠습니까?
				</div>
				</ModalBody>
				<ModalFooter>
				<button type="button" className="btn btn-ouline-secondary w-24 mr-2" onClick={() => { selDeleteDetail(false); }}>취소</button>
				<button type="button" className="btn btn-danger w-24" onClick={userSelRemoveProc}>삭제</button>
				</ModalFooter>
			</Modal>
			{/* END: Modal 선택삭제 */}

			{/* BEGIN: Basic Non Sticky Notification Content */}
			<Notification 
				getRef={(el)=> {
					basicNonStickyNotification.current = el;
				}}
				options={{
					duration: 3000,
				}}
				className="flex flex-col sm:flex-row"
			>
				<div className="font-medium">
					성공적으로 수정되었습니다. 
				</div>
			</Notification>
			{/* END: Basic Non Sticky Notification Content */}
		</React.Fragment>
	);
}

export default MemberMng;
