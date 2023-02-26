import React, { useState, useEffect } from "react";
import { Lucide, Modal, ModalBody, ModalHeader, ModalFooter } from "@/base-components";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import { ReactSortable } from "react-sortablejs";

function ClOutline(props) {
    const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);

    const [addForm, setAddForm] = useState(false);
    const [modForm, setModForm] = useState(false);
    const [modOutlineId, setModOutlineId] = useState(0);
    const [addOutlineParams, setAddOutlineParams] = useState({
        typeId: props.typeId, number: 0, title: '', limit: 0
    });
    const [modOutlineParams, setModOutlineParams] = useState({
        typeId: props.typeId, number: 0, title: '', limit: 0
    });

    /** handler */
    const handleAddParams = (event) => {
        const { name, value } = event.currentTarget;
        setAddOutlineParams({ ...addOutlineParams, [name]: value });
    }
    const handleModParams = (event) => {
        const { name, value } = event.currentTarget;
        setModOutlineParams({ ...modOutlineParams, [name]: value });
    }
    
    /** 개요 등록 */
    const addOutlineStore = async () => {
        if (addOutlineParams.title === "") { alert('문항 타이틀을 입력해주세요.'); return false; }
        if (addOutlineParams.limit === "") { alert('글자수 제한을 입력해주세요.'); return false; }
        await api.post(`/admin/personal-statement/outline`, addOutlineParams, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
                setAddOutlineParams({ ...addOutlineParams, number: 0, title: '', limit: 0 });
                setAddForm(false);
                props.personalStatement();
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

    /** 개요 수정 */
    const modOutlineStore = async () => {
        if (modOutlineParams.title === "") { alert('문항 타이틀을 입력해주세요.'); return false; }
        if (modOutlineParams.limit === "") { alert('글자수 제한을 입력해주세요.'); return false; }
        await api.put(`/admin/personal-statement/outline/${modOutlineId}`, modOutlineParams, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
                setModOutlineParams({ ...modOutlineParams, number: 0, title: '', limit: 0 });
                setModForm(false);
                props.personalStatement();
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

    /** 개요 삭제 */
    const removeOutlineProc = async (pkid) => {
        if (confirm('선택하신 개요표를 삭제하시겠습니까?')){
            await api.delete(`/admin/personal-statement/outline/${pkid}`,  
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

    /** 개요 순서 변경 */
    const [moveOutlineId, setMoveOutlineId] = useState(0);
    const outlineSortUpdate = async () => {
        let arrOrd = [];        
        props.outlineList?.map((item, index) => {
            arrOrd.push({id: item.id, number: (index + 1)});
        })

        await api.patch(`/admin/personal-statement/outline/sort`, arrOrd, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
				props.personalStatement();
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
            console.log(props.outlineList)
        })();
    }, []);

	return (
		<React.Fragment>
            <div className="flex w-full justify-end gap-3">
                <button className="btn" onClick={outlineSortUpdate} >순서 정하기</button>
                <button className="btn btn-outline-primary border-dotted flex itmes-center" 
                    onClick={() => { 
                        setAddForm(true); 
                        setAddOutlineParams({ ...addOutlineParams, 
                            number: props.outlineList?.length + 1 
                        })
                    }}
                >
                    <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                    문항추가
                </button>
            </div>
            
            {props.outlineList?.length > 0 && 
                <ReactSortable group="outlineList" list={props.outlineList} setList={props.setOutlineList}>
                    {props.outlineList?.map((item, index) => {
                        return (
                            <div key={index} className="mt-6 box bg-slate-100 p-5 intro-y" draggable={true}
                                onDragStart={()=>{console.log('drag');setMoveOutlineId(item.id)}} 
                            >
                                <div className="flex items-center">
                                    <h2 className="font-bold text-lg">{item.number}번 문항</h2>
                                    <button className="ml-auto" onClick={() => {console.log('delete');removeOutlineProc(item.id)}}>
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
                                    <div className="text-slate-400 w-24 shrink-0">글자수 제한</div>
                                    <div>{item.limit}</div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="btn bg-white" 
                                        onClick={() => { 
                                            console.log('modify')
                                            setModOutlineId(item.id);
                                            setModForm(true); 
                                            setModOutlineParams({ ...addOutlineParams, 
                                                number: item.number, title: item.title, limit: item.limit 
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
                        setAddOutlineParams({ ...addOutlineParams, number: props.outlineList?.length + 1 })
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
                                value={addOutlineParams.title} onChange={handleAddParams}></textarea>
                                <span className="text-slate-400 w-24 ml-3">100자 이내</span>
                            </div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">글자수 제한</div>
                            <div>
                                <input type="number" name={'limit'} className="form-control w-24" placeholder="글자수" 
                                value={addOutlineParams.limit} onChange={handleAddParams} />
                            </div>
                        </div>
                    </div>
				</ModalBody>
				<ModalFooter>
                    <button type="button" className="btn btn-ouline-secondary w-24 mr-2" onClick={() => { setAddForm(false); }}>취소</button>
                    <button type="button" className="btn btn-primary w-24" onClick={addOutlineStore}>저장하기</button>
				</ModalFooter>
			</Modal>

            <Modal size="modal-xl" backdrop="" show={modForm} onHidden={() => {setModForm(false);}}>
				<ModalBody className="p-5">
                    <div className="mt-6 box bg-slate-100 p-5 intro-y">
                        <div className="flex items-center">
                            <h2 className="font-bold text-lg">{modOutlineParams.number}번 문항 수정</h2>
                            <button className="ml-auto" onClick={() => {setModForm(false)}}>
                                <Lucide icon="X" className="w-6 h-6"></Lucide>
                            </button>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">문항 타이틀</div>
                            <div className="w-full flex items-end">
                                <textarea name={'title'} cols="" rows="2" className="rounded-md w-full" placeholder="타이틀을 작성해 주세요." 
                                value={modOutlineParams.title} onChange={handleModParams}></textarea>
                                <span className="text-slate-400 w-24 ml-3">100자 이내</span>
                            </div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">글자수 제한</div>
                            <div>
                                <input type="number" name={'limit'} className="form-control w-24" placeholder="글자수" 
                                value={modOutlineParams.limit} onChange={handleModParams} />
                            </div>
                        </div>
                    </div>
				</ModalBody>
				<ModalFooter>
                    <button type="button" className="btn btn-ouline-secondary w-24 mr-2" onClick={() => { setModForm(false); }}>취소</button>
                    <button type="button" className="btn btn-primary w-24" onClick={modOutlineStore}>저장하기</button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
}

export default ClOutline;
