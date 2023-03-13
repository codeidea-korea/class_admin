import $ from 'jquery';
import {Lucide, Modal, ModalBody, ModalHeader, ModalFooter, TabGroup2, TabList2, Tab2, TabPanels2, TabPanel2 } from "@/base-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import FeedViewActivity from './feed_view_activity';

function FeedViewQuestion(props) {
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
    const [History, HistoryDetail] = useState(false); //  히스토리 보기
    
    const [qnaList, setQnaList] = useState();
    const [feedbackStorePop, setFeedbackStorePop] = useState(false);
    const [feedbackModPop, setFeedbackModPop] = useState(false);
    const [feedbackStoreParams, setFeedbackStoreParams] = useState({ id: 0, sentence: '', reply: '' })
    const [feedbackModParams, setFeedbackModParams] = useState({ elId: '', sentence: '', reply: '' })
    const [selectedText, setSelectedText] = useState("");
    const handleDragMouseUp = () => {
		const text = window.getSelection().toString();
    	setSelectedText(text);
  	};

    /** 자기소개서 관련 데이터 가져오기 */
	const applicationFeedbackDetail = async () => {
		await api.get(`/admin/feedback-management/application/${props.feedId}`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log('applicationFeedbackDetail2', res)
			if (res.status === 200) {
				setQnaList(res.data.qnaList);
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
	}  	

    /** 피드백 달기 버튼 */  
    const feedbackStart = async (id) => {
        if (selectedText === "") { alert('피드백할 영역을 선택해주세요.'); return false; }
        setFeedbackStoreParams({ ...feedbackStoreParams, id: id, sentence: selectedText });
        setFeedbackStorePop(true);
    }

    /** 피드백 자기소개서 저장 */
    const feedbackStore = async () => {
        if (feedbackStoreParams.reply === "") { alert('피드백 내용을 입력해주세요.'); return false; }
        await api.post(`/admin/feedback-management/application/answer-feedback`, feedbackStoreParams, 
            {headers: {Authorization: `Bearer ${user.token}`}}
        ).then((res) => {
            if (res.status === 200) {
                setFeedbackStoreParams({ ...feedbackStoreParams, id: 0, sentence: '', reply: '' });
                setFeedbackStorePop(false);
                applicationFeedbackDetail();
            }
        }).catch((err) => {
            console.log('error', err);
            if (err.response.status === 403){
                alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
                navigate('/login');
            }else{
                alert(err.response.data.msg); return;
            }
        });
    }

    /** 피드백 자기소개서 수정 */
    const feedbackUpdate = async (fid) => {
        if (feedbackModParams.reply === "") { alert('피드백 내용을 입력해주세요.'); return false; }
        await api.put(`/admin/feedback-management/application/answer-feedback/${fid}`, feedbackModParams, 
            {headers: {Authorization: `Bearer ${user.token}`}}
        ).then((res) => {
            if (res.status === 200) {
                feedbackModPopClose();
                applicationFeedbackDetail();
            }
        }).catch((err) => {
            console.log('error', err);
            if (err.response.status === 403){
                alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
                navigate('/login');
            }else{
                alert(err.response.data.msg); return;
            }
        });
    }

    /** 피드백 자기소개서 삭제 */
    const feedBackRemove = async (fid) => {
        if (confirm('선택하신 피드백을 삭제하시겠습니까?')){
            await api.delete(`/admin/feedback-management/application/answer-feedback/${fid}`, 
                {headers: {Authorization: `Bearer ${user.token}`}}
            ).then((res) => {
                if (res.status === 200) {
                    applicationFeedbackDetail();
                }
            }).catch((err) => {
                console.log('error', err);
                if (err.response.status === 403){
                    alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
                    navigate('/login');
                }else{
                    alert(err.response.data.msg); return;
                }
            });
        }else{
            return false;
        }
    }

    const fdbCls = document.querySelectorAll('.fdb_highlight');
    fdbCls.forEach((item) => {
        item.addEventListener('click', () => {
            document.getElementById(item.id)?.classList.remove('hightlight-red');
            document.getElementById(item.id)?.classList.add('hightlight-purple');
            document.getElementById('h'+item.id)?.classList.remove('outline_red');
            document.getElementById('h'+item.id)?.classList.add('outline_purple');
            setFeedbackModParams({ ...feedbackModParams, 
                elId: item.getAttribute('data-fid').toString(), 
                sentence: item.getAttribute('data-sentence').toString(), 
                reply: item.getAttribute('data-reply').toString() });
            setFeedbackModPop(true);
        })
    })

    const feedbackModPopClose = () => {
        document.querySelectorAll('.fdb_highlight').forEach((item) => {
            item.classList.remove('hightlight-purple');
            item.classList.add('hightlight-red');
        })
        document.querySelectorAll('.hfdb_highlight').forEach((item) => {
            item.classList.remove('outline_purple');
            item.classList.add('outline_red');
        })
        setFeedbackModParams({ ...feedbackModParams, elId: '', sentence: '', reply: '' });
        setFeedbackModPop(false);
    }

	useEffect(() => {
        (async () => {
            setTimeout(() => {
                $('.nav-link').eq(2).trigger('click'); 
            }, 700)
            await applicationFeedbackDetail();

            $(document).ready(function(){
                $('.nav-link').click(function(){
                    if ($(this).text() === "자기소개서" || $(this).text() === "개요표 작성하기"){
                    }else{
                        $('.tipDiv').hide();
                        $('#tip_' + $(this).text().substring(0,1)).show();
                    }
                })
            });
        })();
    }, []);

	return (
		<React.Fragment>
            <button className="btn bg-white flex items-center w-44" onClick={() => {$('.tipParentDiv').toggle()}}>
                <Lucide icon="Info" className="w-4 h-4 mr-2"></Lucide>자소서 작성 꿀팁
                <Lucide icon="ChevronDown" className="w-4 h-4 ml-auto"></Lucide>
            </button>
            <div className="tipParentDiv" style={{ display: 'none' }}>
            {
                qnaList?.map((item, index) => {
                    return (
                        <div key={index} id={'tip_' + item.number} className="p-5 bg-slate-50 text-pending mt-3 rounded-md tipDiv" 
                        style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem', display: 'none' }}>{item.tip}</div>
                    )
                })
            }
            </div>
            <div className="mt-5 intro-y">
                <TabGroup2>
                    <TabList2 className="nav-tabs">
                        {qnaList?.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Tab2 className="w-full py-2" tag="button">{item.number}번 문항</Tab2>
                                </React.Fragment>
                            )
                        })}
                        {props.activityYN === "Y" && (
                            <Tab2 className="w-full py-2" tag="button">탐구 활동 증빙 자료</Tab2>
                        )}
                    </TabList2>
                    <TabPanels2 className="border-l border-r border-b">
                        {qnaList?.map((item, index) => {
                            let answerContent = item.content;
                            return (
                                <TabPanel2 key={index} className="leading-relaxed p-5">
                                    <div className=" text-base font-medium mt-5">
                                        {item.number}. {item.title}
                                        <span className="text-slate-400 text-sm ml-2">(띄어쓰기 포함 {item.limit}자 이내)</span>
                                    </div>
                                    <div className="intro-y grid grid-cols-12 gap-6 mt-5">
                                        <div className="col-span-8">
                                            <div className="flex justify-end">
                                                <button className="btn btn-green btn-sm" onClick={() => {feedbackStart(item.answerId)}}>피드백 달기</button>
                                            </div>
                                            <div className="bg-slate-100 p-5 rounded-md mt-3" style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem' }} 
                                            onMouseUp={handleDragMouseUp}>
                                                {
                                                item.feedbackList?.length > 0 && (
                                                    item.feedbackList?.map((fitem, findex) => {
                                                        answerContent = answerContent.replace(`${fitem.sentence}`,`<span class="fdb_highlight hightlight-red" id="fdb_${item.number}_${findex}" 
                                                        data-reply="${fitem.reply}"data-sentence="${fitem.sentence}"data-fid="${fitem.id}">
                                                        ${fitem.sentence}</span>`)
                                                    })
                                                )}
                                                <p dangerouslySetInnerHTML={{ __html : answerContent }}></p>
                                            </div> 
                                            <div className="flex justify-between text-slate-400 mt-2 text-sm">
                                                <div>글자수({item.content.replace(/<br\s*\/?>/gm, "\n").length.toString()}/{item.limit})</div>
                                                <div>최종수정일 {item.modDate}</div>
                                            </div>
                                        </div>

                                        <div className="col-span-4">
                                            <div className="flex justify-end">
                                                <button className="btn btn-dark btn-sm" onClick={() => {HistoryDetail(true);}}>
                                                    히스토리 보기
                                                </button>
                                            </div>

                                            {item.feedbackList?.map((fitem, findex) => {
                                                return (
                                                    <div key={findex} id={`hfdb_${item.number}_${findex}`} 
                                                    className="bg-slate-100 p-5 rounded-md mt-3 outline_red relative hfdb_highlight">
                                                        <div className="absolute x_button">
                                                            <button className="btn bg-white rounded-full hover:bg-danger hover:text-white p-1" 
                                                            onClick={() => {feedBackRemove(fitem.id)}}><Lucide icon="X" className="w-4 h-4" /></button>
                                                        </div>
                                                        <div className="flex justify-between font-bold text-slate-500">
                                                            <div>피드백</div><div>{user.name}</div>
                                                        </div>
                                                        <div className="mt-3" style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem' }}>
                                                            {fitem.reply}
                                                        </div>
                                                        <button className="btn bg-white w-full btn-sm mt-3" onClick={() => {
                                                            document.getElementById(`fdb_${item.number}_${findex}`)?.classList.remove('hightlight-red');
                                                            document.getElementById(`fdb_${item.number}_${findex}`)?.classList.add('hightlight-purple');
                                                            document.getElementById(`hfdb_${item.number}_${findex}`)?.classList.remove('outline_red');
                                                            document.getElementById(`hfdb_${item.number}_${findex}`)?.classList.add('outline_purple');
                                                            setFeedbackModParams({ ...feedbackModParams, 
                                                                elId: fitem.id, 
                                                                sentence: fitem.sentence, 
                                                                reply: fitem.reply });
                                                            setFeedbackModPop(true);
                                                        }}>수정</button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </TabPanel2>
                            )
                        })}
                        {props.activityYN === "Y" && (
                            <TabPanel2 className="leading-relaxed p-5">
                                <FeedViewActivity />
                            </TabPanel2>
                        )}
                    </TabPanels2>
                </TabGroup2>
            </div>

            {/* BEGIN: Modal 히스토리보기 */}
			<Modal size="modal-lg" show={History} onHidden={() => {HistoryDetail(false);}}>
				<ModalHeader>
					<h2 className="font-medium text-base mr-auto">히스토리</h2>
					<button className="btn btn-rounded-secondary hidden sm:flex p-1" onClick={() => {HistoryDetail(false);}}>
						<Lucide icon="X" className="w-4 h-4" />
					</button>
				</ModalHeader>
				<ModalBody className="p-5 flex flex-col gap-5 h-500 overflow-x-scroll">
					<div className="p-3 border rounded-md mr-12">
						Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
						gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
						poskap.
						<div className="flex justify-end mt-3">
						<span className="font-medium mr-2 text-sm">OOO학생 자소서</span>{" "}
						<span className="text-slate-400 text-sm">2023년 1월20일</span>
						</div>
					</div>
					<div className="p-3 border rounded-md ml-12 bg-slate-100">
						Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
						gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
						poskap.
						<div className="flex justify-end mt-3">
							<span className="font-medium mr-2 text-sm">
								000 선생님 피드백
							</span>{" "}
							<span className="text-slate-400 text-sm">2023년 1월20일</span>
						</div>
					</div>
					<div className="p-3 border rounded-md mr-12">
						Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
						gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
						poskap.
						<div className="flex justify-end mt-3">
							<span className="font-medium mr-2 text-sm">OOO학생 자소서</span>{" "}
							<span className="text-slate-400 text-sm">2023년 1월20일</span>
						</div>
					</div>
					<div className="p-3 border rounded-md ml-12 bg-slate-100">
						Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
						gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
						poskap.
						<div className="flex justify-end mt-3">
							<span className="font-medium mr-2 text-sm">
								000 선생님 피드백
							</span>{" "}
							<span className="text-slate-400 text-sm">2023년 1월20일</span>
						</div>
					</div>
					<div className="p-3 border rounded-md mr-12">
						Lörem ipsum krodinock tres vasade. Heminoning. Vavis anande hall då
						gigahet att rediligt. Multiss kreddig. Jining autorar när ånt
						poskap.
						<div className="flex justify-end mt-3">
							<span className="font-medium mr-2 text-sm">OOO학생 자소서</span>{" "}
							<span className="text-slate-400 text-sm">2023년 1월20일</span>
						</div>
					</div>
				</ModalBody>
			</Modal>
			{/* END: Modal 히스토리보기 */}

            {/* BEGIN: Modal 피드백 입력 팝업 */}
			<Modal size="modal-lg" show={feedbackStorePop} onHidden={() => {setFeedbackStorePop(false);}}>
                <ModalBody className="p-5">
                    <div className="mt-6 box bg-slate-100 p-5 intro-y">
                        <div className="flex items-center">
                            <h2 className="font-bold text-lg">피드백 : {user.name}</h2>
                            <button className="ml-auto" onClick={() => {setFeedbackStorePop(false)}}>
                                <Lucide icon="X" className="w-6 h-6"></Lucide>
                            </button>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-full" style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem' }}>{feedbackStoreParams.sentence}</div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="w-full flex items-end">
                                <textarea cols="" rows="7" className="rounded-md w-full" placeholder="피드백을 작성해 주세요." 
                                onChange={(event) => {
                                    setFeedbackStoreParams({ ...feedbackStoreParams, reply: event.currentTarget.value }); 
                                }}></textarea>
                            </div>
                        </div>
                    </div>
				</ModalBody>
				<ModalFooter>
                    <button type="button" className="btn btn-ouline-secondary w-24 mr-2" onClick={() => { setFeedbackStorePop(false); }}>취소</button>
                    <button type="button" className="btn btn-primary w-24" onClick={feedbackStore}>저장하기</button>
				</ModalFooter>
			</Modal>
			{/* END: Modal 피드백 입력 팝업 */}

            {/* BEGIN: Modal 피드백 수정 팝업 */}
			<Modal size="modal-lg" show={feedbackModPop} onHidden={feedbackModPopClose}>
                <ModalBody className="p-5">
                    <div className="mt-6 box bg-slate-100 p-5 intro-y">
                        <div className="flex items-center">
                            <h2 className="font-bold text-lg">피드백 : {user.name}</h2>
                            <button className="ml-auto" onClick={feedbackModPopClose}>
                                <Lucide icon="X" className="w-6 h-6"></Lucide>
                            </button>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-full" style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem' }}>{feedbackModParams.sentence}</div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="w-full flex items-end">
                                <textarea cols="" rows="7" value={feedbackModParams.reply} className="rounded-md w-full" placeholder="피드백을 작성해 주세요." 
                                onChange={(event) => {
                                    setFeedbackModParams({ ...feedbackModParams, reply: event.currentTarget.value }); 
                                }}></textarea>
                            </div>
                        </div>
                    </div>
				</ModalBody>
				<ModalFooter>
                    <button type="button" className="btn btn-ouline-secondary w-24 mr-2" onClick={feedbackModPopClose}>취소</button>
                    <button type="button" className="btn btn-primary w-24" onClick={() => {feedbackUpdate(feedbackModParams.elId)}}>저장하기</button>
				</ModalFooter>
			</Modal>
			{/* END: Modal 피드백 수정 팝업 */}
		</React.Fragment>
	);
}

export default FeedViewQuestion;
