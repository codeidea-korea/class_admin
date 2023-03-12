import { Lucide } from "@/base-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import { userSchoolYear } from '@/components/helpers';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function FeedMng() {
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
	const [pageParams, setPageParams] = useState({
		totalPages: 0, totalElements: 0, currentPage: 1, pageRangeDisplayed: 10
	});
	const [feedbackList, setFeedbackList] = useState();
	const [searchParams, setSearchParams] = useState({ searchValue: '' });

	/** 전체 목록 */
    const feedbackFindAll = async () => {
        await api.get(`/admin/feedback-management/application?searchValue=${searchParams.searchValue}
			&page=${pageParams.currentPage}&limit=${pageParams.pageRangeDisplayed}`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log('feedbackFindAll', res)
			if (res.status === 200) {
				setFeedbackList(res.data.content);
				setPageParams({ ...pageParams, totalPages: res.data.totalPages, totalElements: res.data.totalElements })
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

	// paginate handle
	const handlePageClick = (event) => {
		setPageParams({ ...pageParams, currentPage: (event.selected + 1) })
    };

	useEffect(() => {
        (async () => {
			feedbackFindAll();
        })();
    }, []);

	return (
		<React.Fragment>
			<div className="flex gap-2 mt-5">
				<Link to="/feed_mng">
					<button className="btn btn-primary w-36">자기소개서</button>
				</Link>
				<button className="btn bg-white w-36" onClick={() => alert("준비중입니다.")} >문제은행</button>
			</div>
			<div className="intro-y box mt-5">
				<div className="p-3 px-5 flex items-center border-b border-slate-200/60">
					<div className="ml-auto">
						<div className="flex flex-middle gap-3">
							<input type="text" name={'searchValues'} className="form-control w-60" placeholder="아이디, 이름,학교, 학년, 지원학교, 전형" 
							value={searchParams.searchValue} onChange={(event) => {
								setSearchParams({ ...searchParams, searchValue: event.currentTarget.value })
							}}/>
							<button type="button" className="btn btn-primary flex items-center" onClick={feedbackFindAll}>
								<Lucide icon="Search" className="w-4 h-4 mr-2"></Lucide>검색
							</button>
						</div>
					</div>
				</div>
				<div className="intro-y p-5">
					<div className="overflow-x-auto">
						<table className="table table-hover">
							<tbody>
							<tr className="text-center bg-slate-100 font-medium">
								<td>피드백 요청일</td><td>아이디</td><td>이름</td><td>학교</td>
								<td>학년</td><td>지원학교</td><td>전형</td><td>상태</td>
							</tr>
							{feedbackList?.map((item, index) => {
								return (
									<React.Fragment key={index}>
										<tr className="text-center cursor-pointer" onClick={() => {navigate(`/feed_view/${item.id}`)}}>
											<td>{item.creDate}</td>
											<td>{item.userId}</td>
											<td>{item.name}</td>
											<td>{item.schoolName}</td>
											<td>{userSchoolYear(item.schoolYear)}</td>
											<td>{item.applicationSchoolName}</td>
											<td>{item.applicationTypeName}</td>
											<td>
												{(item.status === 'UNREAD') && (<span className="text-danger">미학인</span>)}
												{(item.status === 'READ') && (<span className="text-primary">학인</span>)}
												{(item.status === 'COMPLETE') && (<span className="text-slate-400">피드백 완료</span>)}
											</td>
										</tr>
									</React.Fragment>
								)
							})}
							</tbody>
						</table>
					</div>
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
		</React.Fragment>
	);
}

export default FeedMng;
