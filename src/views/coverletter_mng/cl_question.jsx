import React, { useState, useEffect } from "react";
import { Lucide, Modal, ModalBody, ModalHeader, ModalFooter } from "@/base-components";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import { ReactSortable } from "react-sortablejs";

function ClQuestion(props) {
    const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);

    const [addForm, setAddForm] = useState(false);
    const [modForm, setModForm] = useState(false);
    const [modQuestionId, setModQuestionId] = useState(0);
    const [addQuestionParams, setAddQuestionParams] = useState({
        typeId: props.typeId, number: 0, title: '', tip: '', limit: 0
    });
    const [modQuestionParams, setModQuestionParams] = useState({
        typeId: props.typeId, number: 0, title: '', tip: '', limit: 0
    });

    /** handler */
    const handleAddParams = (event) => {
        const { name, value } = event.currentTarget;
        setAddQuestionParams({ ...addQuestionParams, [name]: value });
    }
    const handleModParams = (event) => {
        const { name, value } = event.currentTarget;
        setModQuestionParams({ ...modQuestionParams, [name]: value });
    }
    
    /** 문항 등록 */
    const addQuestionStore = async () => {
        if (addQuestionParams.title === "") { alert('문항 타이틀을 입력해주세요.'); return false; }
        if (addQuestionParams.tip === "") { alert('자소서 꿀팁을 입력해주세요.'); return false; }
        if (addQuestionParams.limit === "") { alert('글자수 제한을 입력해주세요.'); return false; }
        await api.post(`/admin/personal-statement/question`, addQuestionParams, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
                setAddQuestionParams({ ...addQuestionParams, number: 0, title: '', tip: '', limit: 0 });
                setAddForm(false);
                props.personalStatement();
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 401){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

    /** 문항 수정 */
    const modQuestionStore = async () => {
        if (modQuestionParams.title === "") { alert('문항 타이틀을 입력해주세요.'); return false; }
        if (modQuestionParams.tip === "") { alert('자소서 꿀팁을 입력해주세요.'); return false; }
        if (modQuestionParams.limit === "") { alert('글자수 제한을 입력해주세요.'); return false; }
        await api.put(`/admin/personal-statement/question/${modQuestionId}`, modQuestionParams, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
                setModQuestionParams({ ...modQuestionParams, number: 0, title: '', tip: '', limit: 0 });
                setModForm(false);
                props.personalStatement();
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 401){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

    /** 문항 삭제 */
    const removeQuestionProc = async (pkid) => {
        if (confirm('선택하신 문항을 삭제하시겠습니까?')){
            await api.delete(`/admin/personal-statement/question/${pkid}`,  
                {headers: {Authorization: `Bearer ${user.token}`}})
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    props.personalStatement();
                }
            }).catch((err) => {
                console.log(err.response.data.msg);
            });
        }else{
            return false;
        }
    }

    /** 탐구활동 증빙자료 Y/N 업데이트 */
    const handleActivity = async (event) => {
        let yn = (event.target.checked) ? 'Y' : 'N';
        await api.put(`/admin/personal-statement/activity?typeId=${props.typeId}&yn=${yn}`, null, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				props.setPsnActivity(yn);
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 401){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

    /** 문항 순서 변경 */
    const [moveQuestionId, setMoveQuestionId] = useState(0);
    const questionSortUpdate = async () => {
        let arrOrd = [];        
        props.questionList?.map((item, index) => {
            arrOrd.push({id: item.id, number: (index + 1)});
        })

        await api.patch(`/admin/personal-statement/question/sort`, arrOrd, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				props.personalStatement();
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 401){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

    useEffect(() => {
        (async () => {
            //console.log(props.questionList)
        })();
    }, []);

	return (
		<React.Fragment>
            <div className="flex w-full justify-end gap-3">
                <div className="form-check form-switch">
                    <input id="checkbox-switch-7" className="form-check-input" type="checkbox" 
                        checked={props.psnActivity==="Y"} 
                        onChange={handleActivity}
                    />
                    <label className="form-check-label" htmlFor="checkbox-switch-7">탐구 활동 증빙 자료 목록</label>
                </div>
                <button className="btn" onClick={questionSortUpdate} >순서 지정하기</button>
                <button className="btn btn-outline-primary border-dotted flex itmes-center" 
                    onClick={() => { 
                        setAddForm(true); 
                        setAddQuestionParams({ ...addQuestionParams, 
                            number: props.questionList?.length + 1 
                        })
                    }}
                >
                    <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                    문항추가
                </button>
            </div>
            
            {props.questionList?.length > 0 && 
                <ReactSortable group="questionList" list={props.questionList} setList={props.setQuestionList}>
                    {props.questionList?.map((item, index) => {
                        return (
                            <div key={index} className="mt-6 box bg-slate-100 p-5 intro-y" 
                                onDragStart={()=>{setMoveQuestionId(item.id)}} 
                            >
                                <div className="flex items-center">
                                    <h2 className="font-bold text-lg">{item.number}번 문항</h2>
                                    <button className="ml-auto" onClick={() => {removeQuestionProc(item.id)}}>
                                        <Lucide icon="X" className="w-6 h-6"></Lucide>
                                    </button>
                                </div>
                                <div className="mt-3 flex">
                                    <div className="text-slate-400 w-24 shrink-0">문항 타이틀</div>
                                    <div className="w-full" style={{ whiteSpace: 'pre-line' }}>
                                        {item.title}
                                    </div>
                                </div>
                                <div className="mt-3 flex">
                                    <div className="text-slate-400 w-24 shrink-0">자소서 꿀팁</div>
                                    <div className="w-full">
                                        <p className="text-danger" style={{ whiteSpace: 'pre-line' }}>{item.tip}</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex">
                                    <div className="text-slate-400 w-24 shrink-0">글자수 제한</div>
                                    <div>{item.limit}</div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="btn bg-white" 
                                        onClick={() => { 
                                            setModQuestionId(item.id);
                                            setModForm(true); 
                                            setModQuestionParams({ ...addQuestionParams, 
                                                number: item.number, title: item.title, tip: item.tip, limit: item.limit 
                                            })
                                        }}
                                    >수정하기</button>
                                </div>
                            </div>
                        )
                    })}
                </ReactSortable>
            }

            <div className="flex flex-col items-center mt-6">
                <span className="text-slate-400 text-sm">드래그해서 항목의 순서를 변경할 수 있습니다.</span>
                <button className="btn btn-outline-primary border-dotted mt-2" 
                    onClick={() => { 
                        setAddForm(true); 
                        setAddQuestionParams({ ...addQuestionParams, number: props.questionList?.length + 1 })
                    }}
                >
                    <Lucide icon="Plus" className="w-6 h-6"></Lucide>
                </button>
            </div>

            <Modal size="modal-xl" backdrop="" show={addForm} onHidden={() => {setAddForm(false);}}>
				<ModalBody className="p-5">
                    <div className="mt-6 box bg-slate-100 p-5 intro-y">
                        <div className="flex items-center">
                            <h2 className="font-bold text-lg">문항 추가하기</h2>
                            <button className="ml-auto" onClick={() => {setAddForm(false)}}>
                                <Lucide icon="X" className="w-6 h-6"></Lucide>
                            </button>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">문항 타이틀</div>
                            <div className="w-full flex items-end">
                                <textarea name={'title'} cols="" rows="2" className="rounded-md w-full" placeholder="타이틀을 작성해 주세요."
                                value={addQuestionParams.title} onChange={handleAddParams}></textarea>
                                <span className="text-slate-400 w-24 ml-3">100자 이내</span>
                            </div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">자소서 꿀팁</div>
                            <div className="w-full flex items-end">
                                <textarea name={'tip'} cols="" rows="2" className="rounded-md w-full" placeholder="자소서 팁을 작성해 주세요." 
                                value={addQuestionParams.tip} onChange={handleAddParams}></textarea>
                                <span className="text-slate-400 w-24 ml-3">200자 이내</span>
                            </div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">글자수 제한</div>
                            <div>
                                <input type="number" name={'limit'} className="form-control w-24" placeholder="글자수" 
                                value={addQuestionParams.limit} onChange={handleAddParams} />
                            </div>
                        </div>
                    </div>
				</ModalBody>
				<ModalFooter>
                    <button type="button" className="btn btn-ouline-secondary w-24 mr-2" onClick={() => { setAddForm(false); }}>취소</button>
                    <button type="button" className="btn btn-primary w-24" onClick={addQuestionStore}>저장하기</button>
				</ModalFooter>
			</Modal>

            <Modal size="modal-xl" backdrop="" show={modForm} onHidden={() => {setModForm(false);}}>
				<ModalBody className="p-5">
                    <div className="mt-6 box bg-slate-100 p-5 intro-y">
                        <div className="flex items-center">
                            <h2 className="font-bold text-lg">{modQuestionParams.number}번 문항 수정</h2>
                            <button className="ml-auto" onClick={() => {setModForm(false)}}>
                                <Lucide icon="X" className="w-6 h-6"></Lucide>
                            </button>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">문항 타이틀</div>
                            <div className="w-full flex items-end">
                                <textarea name={'title'} cols="" rows="2" className="rounded-md w-full" placeholder="타이틀을 작성해 주세요." 
                                value={modQuestionParams.title} onChange={handleModParams}></textarea>
                                <span className="text-slate-400 w-24 ml-3">100자 이내</span>
                            </div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">자소서 꿀팁</div>
                            <div className="w-full flex items-end">
                                <textarea name={'tip'} cols="" rows="2" className="rounded-md w-full" placeholder="자소서 팁을 작성해 주세요." 
                                value={modQuestionParams.tip} onChange={handleModParams}></textarea>
                                <span className="text-slate-400 w-24 ml-3">200자 이내</span>
                            </div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">글자수 제한</div>
                            <div>
                                <input type="number" name={'limit'} className="form-control w-24" placeholder="글자수" 
                                value={modQuestionParams.limit} onChange={handleModParams} />
                            </div>
                        </div>
                    </div>
				</ModalBody>
				<ModalFooter>
                    <button type="button" className="btn btn-ouline-secondary w-24 mr-2" onClick={() => { setModForm(false); }}>취소</button>
                    <button type="button" className="btn btn-primary w-24" onClick={modQuestionStore}>저장하기</button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
}

export default ClQuestion;
