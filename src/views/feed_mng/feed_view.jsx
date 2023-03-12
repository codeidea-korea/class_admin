import {Lucide, Modal, ModalBody, ModalHeader, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@/base-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import FeedViewQuestion from "@/views/feed_mng/feed_view_question";
//import FeedViewOutline from "@/views/feed_mng/feed_view_outline";

function FeedView() {
	const { feedId } = useParams()
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
	const [Notes, NotesDetail] = useState(false); // 자소서 유의사항
	const [psnData, setPsnData] = useState({
		activityYN: '', confirm: '', id: 0, note: '', schoolName: '', typeName: ''
	})

	/** 자기소개서 관련 데이터 가져오기 */
	const applicationFeedbackDetail = async () => {
		await api.get(`/admin/feedback-management/application/${feedId}`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log('applicationFeedbackDetail', res)
			if (res.status === 200) {
				setPsnData({ ...psnData, 
					activityYN: res.data.activityYN, 
					confirm: res.data.confirm, 
					id: res.data.id, 
					note: res.data.note, 
					schoolName: res.data.schoolName, 
					typeName: res.data.typeName
				})
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
	}
	
	useEffect(() => {
        (async () => {
			applicationFeedbackDetail();
        })();
    }, []);

	
	

	
	

	
	

	
	

	



  	



	return (
		<React.Fragment>
			<div className="intro-y mt-5 box">
				<div className="border-b border-slate-200/6 flex space-between p-5">
					<h2 className="text-lg font-bold">{psnData.schoolName} / {psnData.typeName}</h2>
					<button className="btn btn-sm ml-auto flex items-center" onClick={() => {NotesDetail(true);}}>
						<Lucide icon="Info" className="w-4 h-4 mr-2"></Lucide>{psnData.schoolName} 자소서 작성 유의사항
					</button>
				</div>
				<div className="p-5">
					<TabGroup>
						<TabList className="nav-boxed-tabs gap-6">
							<Tab className="w-full py-2 border-slate-200" tag="button">자기소개서</Tab>
							<Tab className="w-full py-2 border-slate-200" tag="button">개요표 작성하기</Tab>
						</TabList>
						<TabPanels className="mt-5">
							<TabPanel className="leading-relaxed">
								<FeedViewQuestion feedId={feedId} activityYN={psnData.activityYN} />
							</TabPanel>


						<TabPanel className="leading-relaxed p-5">
							<div className="intro-y grid grid-cols-12 gap-6">
							<div className="col-span-8">
								<div className="flex justify-between items-center gap-6">
								<div className=" text-base font-medium">
									1. 지원 학생(본인) 의 장래희망(꿈)이 무엇인지 구체적으로
									서술해 보세요.
								</div>
								<button className="btn btn-green btn-sm shrink-0">
									피드백 달기
								</button>
								</div>
								<div className="bg-slate-100 p-5 rounded-md mt-3">
								<span style={{ backgroundColor: "rgba(251,0,0,0.3)" }}>
									Lörem ipsum krodinock tres vasade. Heminoning. Vavis
									anande hall då gigahet att rediligt. Multiss kreddig.
									Jining autorar
								</span>
								när ånt poskap. Foliehatt desk. Plafadade öledes
								semikyliga, spegt om plaspell. Exonas makror mikengar.
								Stuprörspolitik plabel. Gik makrogt, att pren om än
								apotris om Odellplatta. Trelig potör. Gensax tregt i
								prebel.
								<br />
								<br />
								<span
									style={{
									backgroundColor: "rgba(66,0,255,0.3)",
									}}
								>
									Kande brattig. Kode kavis. Nyskade trenygt men transtos
									i nysement som poling. Zlatanera nens. Sanera global
									hektar
								</span>
								</div>
								<div className="flex justify-between text-slate-400 mt-2 text-sm">
								<div>글자수(700/600)</div>
								<div>최종수정일 00년 00월 00일</div>
								</div>
							</div>
							<div className="col-span-4">
								<div className="flex justify-end">
								<button
									className="btn btn-dark btn-sm"
									onClick={() => {
									HistoryDetail(true);
									}}
								>
									히스토리 보기
								</button>
								</div>
								<div className="bg-slate-100 p-5 rounded-md mt-3 outline_red relative">
								<div className="absolute x_button">
									<button className="btn bg-white rounded-full hover:bg-danger hover:text-white p-1">
									<Lucide icon="X" className="w-4 h-4" />
									</button>
								</div>
								<div className="flex justify-between font-bold text-slate-500">
									<div>피드백</div>
									<div>최철호 원장님</div>
								</div>
								<div className="mt-3">
									Lörem ipsum krodinock tres vasade. Heminoning. Vavis
									anande hall då gigahet att rediligt. Multiss kreddig.
									Jining autorar när ånt poskap.
								</div>
								<button className="btn bg-white w-full btn-sm mt-3">
									수정
								</button>
								</div>

								<div className="bg-slate-100 p-5 rounded-md mt-6  outline_purple relative">
								<div className="absolute x_button">
									<button className="btn bg-white rounded-full hover:bg-danger hover:text-white p-1">
									<Lucide icon="X" className="w-4 h-4" />
									</button>
								</div>
								<div className="flex justify-between font-bold text-slate-500">
									<div>피드백</div>
									<div>최철호 원장님</div>
								</div>
								<div className="mt-3">
									<textarea
									name=""
									id=""
									cols="0"
									rows="8"
									className="w-full form-control"
									></textarea>
								</div>
								<button className="btn btn-sky w-full btn-sm mt-3">
									저장
								</button>
								</div>
							</div>
							</div>
							<hr className="my-10 border-t border-dotted" />
							<div className="intro-y grid grid-cols-12 gap-6">
							<div className="col-span-8">
								<div className="flex justify-between items-center gap-6">
								<div className=" text-base font-medium">
									2. 지원 학생(본인) 의 진로계획을 구체적으로 서술해
									보세요.
								</div>
								<button className="btn btn-green btn-sm shrink-0">
									피드백 달기
								</button>
								</div>
								<div className="bg-slate-100 p-5 rounded-md mt-3">
								Lörem ipsum krodinock tres vasade. Heminoning. Vavis
								anande hall då gigahet att rediligt. Multiss kreddig.
								Jining autorar när ånt poskap. Foliehatt desk. Plafadade
								öledes semikyliga, spegt om plaspell. Exonas makror
								mikengar. Stuprörspolitik plabel. Gik makrogt, att pren om
								än apotris om Odellplatta. Trelig potör. Gensax tregt i
								prebel.
								<br />
								<br />
								<span
									style={{
									backgroundColor: "rgba(66,0,255,0.3)",
									}}
								>
									Kande brattig. Kode kavis. Nyskade trenygt men transtos
									i nysement som poling. Zlatanera nens. Sanera global
									hektar
								</span>
								</div>
								<div className="flex justify-between text-slate-400 mt-2 text-sm">
								<div>글자수(700/600)</div>
								<div>최종수정일 00년 00월 00일</div>
								</div>
							</div>
							<div className="col-span-4">
								<div className="bg-slate-100 p-5 rounded-md mt-6  outline_purple relative">
								<div className="absolute x_button">
									<button className="btn bg-white rounded-full hover:bg-danger hover:text-white p-1">
									<Lucide icon="X" className="w-4 h-4" />
									</button>
								</div>
								<div className="flex justify-between font-bold text-slate-500">
									<div>피드백</div>
									<div>최철호 원장님</div>
								</div>
								<div className="mt-3">
									<textarea
									name=""
									id=""
									cols="0"
									rows="8"
									className="w-full form-control"
									></textarea>
								</div>
								<button className="btn btn-sky w-full btn-sm mt-3">
									저장
								</button>
								</div>
							</div>
							</div>
							<hr className="my-10 border-t border-dotted" />
							<div className="intro-y grid grid-cols-12 gap-6">
							<div className="col-span-8">
								<div className="flex justify-between items-center gap-6">
								<div className=" text-base font-medium">
									3. 지원 학생(본인) 의 장점과 특기 사항을 구체적으로
									서술해 보세요.
								</div>
								<button className="btn btn-green btn-sm shrink-0">
									피드백 달기
								</button>
								</div>
								<div className="bg-slate-100 p-5 rounded-md mt-3">
								Lörem ipsum krodinock tres vasade. Heminoning. Vavis
								anande hall då gigahet att rediligt. Multiss kreddig.
								Jining autorar när ånt poskap. Foliehatt desk. Plafadade
								öledes semikyliga, spegt om plaspell. Exonas makror
								mikengar. Stuprörspolitik plabel. Gik makrogt, att pren om
								än apotris om Odellplatta. Trelig potör. Gensax tregt i
								prebel.
								</div>
								<div className="flex justify-between text-slate-400 mt-2 text-sm">
								<div>글자수(700/600)</div>
								<div>최종수정일 00년 00월 00일</div>
								</div>
							</div>
							<div className="col-span-4"></div>
							</div>
						</TabPanel>
						</TabPanels>
					</TabGroup>
				</div>
			</div>
			<div className="mt-5">
				<Link to="/feed_mng">
					<button className="btn bg-white w-24">목록</button>
				</Link>
			</div>



			{/* BEGIN: Modal 자소서 유의사항 */}
			<Modal size="modal-xl" show={Notes} onHidden={() => { NotesDetail(false);}}>
				<ModalHeader>
					<h2 className="font-medium text-base mr-auto">{psnData.schoolName} 자소서 작성 유의사항</h2>
					<button className="btn btn-rounded-secondary hidden sm:flex p-1" onClick={() => {NotesDetail(false);}}>
						<Lucide icon="X" className="w-4 h-4" />
					</button>
				</ModalHeader>
				<ModalBody className="p-5">
					<div className="font-bold">자기소개서 관련 유의사항</div>
					<div className="mt-3" style={{ whiteSpace: 'pre-line', lineHeight: '1.6rem' }}>
						{psnData.note}
					</div>
					<div className="font-bold mt-6">지원 학생 확인 서약</div>
					<div className="mt-2" style={{ whiteSpace: 'pre-line', lineHeight: '1.6rem' }}>
						{psnData.confirm}
					</div>
				</ModalBody>
			</Modal>
			{/* END: Modal 자소서 유의사항 */}

			
		</React.Fragment>
	);
}

export default FeedView;
