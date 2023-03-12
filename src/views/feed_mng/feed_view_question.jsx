import $ from 'jquery';
import {Lucide, Modal, ModalBody, ModalHeader, ModalFooter, TabGroup2, TabList2, Tab2, TabPanels2, TabPanel2 } from "@/base-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import FeedHighlightText from './feed_highlight_text';

function FeedViewQuestion(props) {
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
    const [History, HistoryDetail] = useState(false); //  히스토리 보기
    const [fileName, setFileName] = useState(""); //파일 업로드 시 플레이스 홀더 변경
    const [qnaList, setQnaList] = useState();
    const [feedbackStorePop, setFeedbackStorePop] = useState(false);
    const [feedbackModPop, setFeedbackModPop] = useState(false);
    const [feedbackParams, setFeedbackParams] = useState({ id: 0, sentence: '', reply: '' })
    const [selectedText, setSelectedText] = useState("");
    const handleDragMouseUp = () => {
		const text = window.getSelection().toString();
    	setSelectedText(text);
        console.log(text)
  	};

    const handleChange = (event) => {
		setFileName(event.target.files[0].name);
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
        setFeedbackParams({ ...feedbackParams, id: id, sentence: selectedText });
        setFeedbackStorePop(true);
    }

    /** 피드백 저장 */
    const feedbackStore = async () => {
        if (feedbackParams.reply === "") { alert('피드백 내용을 입력해주세요.'); return false; }
        await api.post(`/admin/feedback-management/application/answer-feedback`, feedbackParams, 
            {headers: {Authorization: `Bearer ${user.token}`}}
        ).then((res) => {
            if (res.status === 200) {
                setFeedbackParams({ ...feedbackParams, id: 0, sentence: '', reply: '' });
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

    const highlightMatches = (text, indices) => {
        let i = 0;
        const result = [];
    
        indices.forEach((index) => {
          result.push(text.slice(i, index));
          result.push(<mark key={index}>{text.slice(index, index + searchTerm.length)}</mark>);
          i = index + searchTerm.length;
        });
    
        result.push(text.slice(i));
        return result;
      }

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
                                                <FeedHighlightText content={item.content} feedbackList={item.feedbackList} />
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
                                                    Lörem ipsum krodinock tres vasade. Heminoning.
                                                    Vavis anande hall då gigahet att rediligt.
                                                    Multiss kreddig. Jining autorar när ånt poskap.
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
                                                    <textarea name="" id="" cols="0" rows="8" className="w-full form-control"></textarea>
                                                </div>
                                                <button className="btn btn-sky w-full btn-sm mt-3">저장</button>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel2>
                            )
                        })}
                        {props.activityYN === "Y" && (
                            <TabPanel2 className="leading-relaxed p-5">
                                <div className="intro-y grid grid-cols-12 gap-6 mt-5">
                                    <div className="col-span-8">
                                        <div className="overflow-x-auto">
                                            <table className="table table-bordered">
                                                <tbody>
                                                <tr className="text-center">
                                                <td className="bg-slate-100">연번</td>
                                                <td className="bg-slate-100">
                                                    증빙 자료 유형
                                                </td>
                                                <td className="bg-slate-100">제작 연월일</td>
                                                <td className="bg-slate-100">제목</td>
                                                </tr>
                                                <tr>
                                                <td className="bg-slate-50 text-center">1</td>
                                                <td className="">
                                                    <input
                                                    type="text"
                                                    className="form-control"
                                                    />
                                                </td>
                                                <td className="">
                                                    <input
                                                    type="text"
                                                    className="form-control"
                                                    />
                                                </td>
                                                <td className="">
                                                    <input
                                                    type="text"
                                                    className="form-control"
                                                    />
                                                </td>
                                                </tr>
                                                <tr>
                                                <td className="bg-slate-50 text-center">
                                                    첨부파일
                                                </td>
                                                <td colSpan={3}>
                                                    <div className="flex items-center justify-between">
                                                    <div className="w-full">
                                                        <div className="input-group">
                                                        <input
                                                            type="file"
                                                            className="dp_none"
                                                            id="file-upload"
                                                            onChange={handleChange}
                                                        />
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                            type="text"
                                                            className="form-control file_up bg-white"
                                                            placeholder=""
                                                            value={fileName}
                                                            readOnly
                                                            />
                                                            <div className="input-group-text whitespace-nowrap file_up_btn">
                                                            파일찾기
                                                            </div>
                                                        </label>
                                                        <button className="btn btn-secondary p-2 ml-3 flex gap-3 items-center">
                                                            page.jpg
                                                            <Lucide
                                                            icon="X"
                                                            className="w-4 h-4 text-danger"
                                                            ></Lucide>
                                                        </button>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary w-20 shrink-0">
                                                        다운로드
                                                    </button>
                                                    </div>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td className="bg-slate-50"></td>
                                                <td colSpan={3}>
                                                    <span className="text-sm">
                                                    증빙 자료에 대한 요약 설명 *띄어쓰기를
                                                    포함하여 200자 이내
                                                    </span>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td
                                                    rowSpan={2}
                                                    className="bg-slate-50 text-center"
                                                >
                                                    내용
                                                </td>
                                                <td colSpan={3}>
                                                    <textarea
                                                    name=""
                                                    id=""
                                                    cols="0"
                                                    rows="2"
                                                    className="form-control"
                                                    ></textarea>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td colSpan={3}>
                                                    <div className="flex justify-between items-center">
                                                    <div>글자수 (0/100)</div>
                                                    <div className="flex gap-3 items-center">
                                                        최종 수정일 23년 05년 30일
                                                        <button className="btn btn-outline-primary border-dotted">수정하기</button>
                                                        <button className="btn btn-sky">저장하기</button>
                                                    </div>
                                                    </div>
                                                </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <div className="bg-slate-100 p-5 rounded-md outline_red relative">
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
                                                Lörem ipsum krodinock tres vasade. Heminoning.
                                                Vavis anande hall då gigahet att rediligt.
                                                Multiss kreddig. Jining autorar när ånt poskap.
                                            </div>
                                            <button className="btn bg-white w-full btn-sm mt-3">
                                                수정
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
                            <div className="text-slate-400 w-full" style={{ whiteSpace: 'pre-line', lineHeight: '1.3rem' }}>{feedbackParams.sentence}</div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="w-full flex items-end">
                                <textarea cols="" rows="7" className="rounded-md w-full" placeholder="피드백을 작성해 주세요." 
                                onChange={(event) => {
                                    setFeedbackParams({ ...feedbackParams, reply: event.currentTarget.value }); 
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
		</React.Fragment>
	);
}

export default FeedViewQuestion;
