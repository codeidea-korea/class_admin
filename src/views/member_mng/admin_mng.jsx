import React, { useState, useEffect, useRef } from "react";
import { Lucide, Modal, ModalBody, ModalHeader, ModalFooter, Notification } from "@/base-components";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function AdminMng() {
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
	const [admins, setAdmins] = useState();
	const [searchWord, setSearchWord] = useState('');
	const [pageParams, setPageParams] = useState({
		totalPages: 0, totalElements: 0, currentPage: 1, pageRangeDisplayed: 10
	});
	const [AccountInvitation, acountDetail] = useState(false);
	const [selDelete, selDeleteDetail] = useState(false);
	const [alertText, setAlertText] = useState({
        alertSelUserRemove: [0, ''],
    })

	// 관리자 데이터 가져오기
	const getAdminList = async (searchString) => {
        await api.get(`/admin/admin-management?searchWord=${searchString}&page=${pageParams.currentPage}&limit=${pageParams.pageRangeDisplayed}`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				setAdmins(res.data.content);
				setPageParams({ ...pageParams, totalPages: res.data.totalPages, totalElements: res.data.totalElements })
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

	// paginate handle
	const handlePageClick = (event) => {
		setPageParams({ ...pageParams, currentPage: (event.selected + 1) })
    };

	useEffect(() => {
        (async () => {
            await getAdminList(searchWord);
        })();
    }, []);

	useEffect(() => {
        (async () => {
            await getAdminList(searchWord);
        })();
    }, [pageParams.currentPage]);

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

	/** 관리자 구분(권한) 변경하기 */
	const handleAuthorityChange = (user_no, change_status) => {
		api.patch(`/admin/admin-management/authority/${user_no}?status=${change_status}`, null, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res);
			if (res.status === 200) {
				basicNonStickyNotificationToggle();
			}
		})
		.catch((err) => {
			console.log('error', err);
			if (err.response.status === 401){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}else{
				alert(err.response.data.msg); return false;
			}
		});
	}

	// 관리자 상태값 변경하기
	const handleStatusChange = (user_no, change_status) => {
		api.patch(`/admin/admin-management/status/${user_no}?status=${change_status}`, null, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res);
			if (res.status === 200) {
				basicNonStickyNotificationToggle();
			}
		})
		.catch((err) => {
			console.log('error', err);
			if (err.response.status === 401){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}else{
				alert(err.response.data.msg); return false;
			}
		});
	}

	// 관리자 이메일 초대하기
	const [inviteEmail, setInviteEmail] = useState('');
	const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
	const [alertInviteEmail, setAlertInviteEmail] = useState({
        alertEmail: [0, ''],
    })
	const handelInviteEmail = (event) => {
		if (!emailReg.test(event.currentTarget.value)) {
			setAlertInviteEmail({...alertInviteEmail, alertEmail: [1, '이메일 형식이 아닙니다.']})
		}else {
			setAlertInviteEmail({...alertInviteEmail, alertEmail: [0, '']})
		}
		setInviteEmail(event.currentTarget.value);
	}
	const requestInvite = () => {
		if (inviteEmail === ""){ 
			setAlertInviteEmail({...alertInviteEmail, alertEmail: [1, '이메일을 입력해주세요.']}); return false;
		}else{
			if (!emailReg.test(inviteEmail)) {
				setAlertInviteEmail({...alertInviteEmail, alertEmail: [1, '이메일 형식이 아닙니다.']}); return false;
			}
		}
		api.get(`/admin/admin-management/email-invitation?email=${inviteEmail}`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res);
			if (res.status === 200) {
				alert('정상적으로 초대 메일이 발송되었습니다.');
				acountDetail(false);
			}
		})
		.catch((err) => {
			console.log('error', err);
			if (err.response.status === 401){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}else{
				setAlertInviteEmail({...alertInviteEmail, alertEmail: [1, err.response.data.msg]})
			}
		});
    };

	/** 관리자 삭제 팝업 */
	const adminSelRemovePop = () => {
		const sequences = new Array();
        const checkedInputs = Array.from(document.querySelectorAll('.ck'));
        checkedInputs.filter(item => item.value != '').forEach(item => {
            if (item.checked) sequences.push(parseInt(item.value));
        });
        if(sequences.length > 0){
			setAlertText({...alertText, alertSelUserRemove: [0, '']})
            selDeleteDetail(true);
        }else{
			setAlertText({...alertText, alertSelUserRemove: [1, '삭제할 관리자를 선택해주세요.']})
		}
	}

	/** 관리자 삭제 요청 */
	const adminSelRemoveProc= async () => {
		const sequences = new Array();
        const checkedInputs = Array.from(document.querySelectorAll('.ck'));
        checkedInputs.filter(item => item.value != '').forEach(item => {
            if (item.checked) sequences.push(parseInt(item.value));
        });
		if(sequences.length > 0){
			await api.delete(`/admin/admin-management?users=${sequences}`,  
				{headers: {Authorization: `Bearer ${user.token}`}})
			.then((res) => {
				console.log(res)
				if (res.status === 200) {
					document.querySelectorAll('input:checked').forEach(item => {
						item.checked = false;
					});
					selDeleteDetail(false);
					getAdminList('');
				}
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
        }else{
			setAlertText({...alertText, alertSelUserRemove: [1, '삭제할 관리자를 선택해주세요.']})
		}
	}

	const basicNonStickyNotification = useRef();
	const basicNonStickyNotificationToggle = () => {
		basicNonStickyNotification.current.showToast();
	};

	return (
		<React.Fragment>
			<div className="intro-y box mt-5">
				<div className="p-3 px-5 flex items-center border-b border-slate-200/60">
					<div className="text-lg font-medium">
						전체 <span className="color-blue">{pageParams.totalElements}</span>명
					</div>
					<button type="button" className="btn ml-2" title="초기화" onClick={() => { setSearchWord(''); getAdminList(''); }}>
						<Lucide icon="RotateCcw" className="w-4 h-4"></Lucide>
					</button>
					<div className="ml-auto">
						<div className="flex flex-middle gap-3">
							<input type="text" name={"searchWord"} className="form-control w-60" placeholder="검색어 입력" 
								value={searchWord}
								onChange={(event) => { setSearchWord(event.currentTarget.value) }} 
								onKeyPress={(event) => {
									if (event.key === 'Enter') { getAdminList(searchWord); }
								}}
							/>
							<button type="button" className="btn btn-primary flex items-center" onClick={() => {getAdminList(searchWord)}}>
								<Lucide icon="Search" className="w-4 h-4 mr-2"></Lucide>검색
							</button>
						</div>
					</div>
					<button
						href="#"
						className="btn btn-warning ml-3 flex items-center"
						onClick={() => {
						acountDetail(true);
						}}
					>
						<Lucide icon="Mail" className="w-4 h-4 mr-2"></Lucide>관리자 초대
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
								<td>이름</td>
								<td>구분</td>
								<td>휴대폰번호</td>
								<td>이메일</td>
								<td>회원가입일</td>
								<td>상태</td>
							</tr>
							{admins?.map((item, index) => {
								let ano = parseInt(pageParams.totalElements) - (parseInt(pageParams.currentPage - 1)) * pageParams.pageRangeDisplayed - index;
								return (
									<tr key={index} className="text-center whitespace-nowrap">
										<td>
											<input className="form-check-input ck" type="checkbox" value={item.id} onChange={handleCheck}/>
										</td>
										<td>{ano}</td>
										<td>{item.userId}</td>
										<td>{item.name}</td>
										<td>
											<select value={item.authority} className="form-select small w-24" 
											onChange={(event) => {handleAuthorityChange(item.id, event.currentTarget.value)}}>
												<option value="NORMAL">일반</option>
												<option value="ADMIN">관리자</option>
												<option value="TEACHER">선생님</option>
												<option value="DIRECTOR">원장님</option>
											</select>
										</td>
										<td>{item.phone}</td>
										<td>{item.email}</td>
										<td>{item.creDate}</td>
										<td>
											<select value={item.status} className="form-select small w-24" 
											onChange={(event) => {handleStatusChange(item.id, event.currentTarget.value)}}>
												<option value="ACTIVE">재직</option>
												<option value="SLEEP">휴직</option>
												<option value="LEAVE">퇴직</option>
												<option value="READY">미승인</option>
											</select>
										</td>
									</tr>
								)
							})}
							</tbody>
						</table>
					</div>
					<button className="btn btn-outline-danger mt-3" onClick={adminSelRemovePop}>
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



			{/* BEGIN: Modal 관리자 계정 초대*/}
			<Modal size="" backdrop="static" show={AccountInvitation}
				onHidden={() => {
					acountDetail(false);
				}}
			>
				<ModalHeader>
					<h2 className="font-medium text-base mr-auto">관리자 계정 초대</h2>
					<button className="btn btn-rounded-secondary hidden sm:flex p-1"
						onClick={() => {
							acountDetail(false);
						}}
					>
						<Lucide icon="X" className="w-4 h-4" />
					</button>
				</ModalHeader>
				<ModalBody className="p-5">
					<div className="font-bold">이메일</div>
					<div className="flex gap-3 mt-2">
						<input type="text" name={"inviteEmail"} className="form-control" onChange={handelInviteEmail}/>
						<button className="btn btn-primary w-20 shrink-0" onClick={requestInvite}>초대하기</button>

					</div>
					{!!alertInviteEmail.alertEmail[0] && <div className="text-sm text-danger mt-2 ml-2">{alertInviteEmail.alertEmail[1]}</div>}
				</ModalBody>
			</Modal>
			{/* END: Modal 관리자 계정 초대 */}

			{/* BEGIN: Modal 선택삭제  */}
			<Modal size="" backdrop="" show={selDelete}
				onHidden={() => {
					selDeleteDetail(false);
				}}
			>
				<ModalHeader>
					<h2 className="font-medium text-base mr-auto">선택삭제</h2>
					<button className="btn btn-rounded-secondary hidden sm:flex p-1"
						onClick={() => {
						selDeleteDetail(false);
						}}
					>
						<Lucide icon="X" className="w-4 h-4" />
					</button>
				</ModalHeader>
				<ModalBody className="p-5">
					<div className="text-lg font-medium text-center">
						선택한 관리자를 삭제하시겠습니까?
					</div>
				</ModalBody>
				<ModalFooter>
					<button type="button" className="btn btn-ouline-secondary w-24 mr-2" onClick={() => { selDeleteDetail(false); }}>취소</button>
					<button type="button" className="btn btn-danger w-24" onClick={adminSelRemoveProc}>삭제</button>
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
					성공적으로 변경되었습니다. 
				</div>
			</Notification>
			{/* END: Basic Non Sticky Notification Content */}
		</React.Fragment>
	);
}

export default AdminMng;
