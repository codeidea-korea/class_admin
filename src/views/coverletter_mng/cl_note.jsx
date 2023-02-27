import React, { useState, useEffect, useRef } from "react";
import { Lucide, Modal, ModalBody, ModalHeader, ModalFooter } from "@/base-components";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

function ClNote(props) {
    const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);
    const [modForm, setModForm] = useState(false);
    const [modNoteParams, setModNoteParams] = useState({
        typeId: props.typeId, note: '', confirm: '' 
    });

    /** handle field */
    const handleParams = (event) => {
        const { name, value } = event.currentTarget;
        setModNoteParams({ ...modNoteParams, [name]: value });
    }

    /** 유의사항 업데이트 */
    const modNoteUpdate = async () => {
        if (modNoteParams.note === "") { alert('자기소개서 관련 유의사항을 입력해주세요.'); return false; }
        if (modNoteParams.confirm === "") { alert('지원 학생 확인 서약을 입력해주세요.'); return false; }
        await api.put(`/admin/personal-statement/note`, modNoteParams, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log(res)
			if (res.status === 200) {
                setModNoteParams({ ...modNoteParams, note: '', confirm: '' });
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

    useEffect(() => {
        (async () => {
            //
        })();
    }, []);

	return (
		<React.Fragment>
            <div className="p-5 bg-slate-50 mt-6">
                <div className="font-bold text-lg mb-2">자기소개서 관련 유의사항</div>
                <span style={{ whiteSpace: 'pre-line', lineHeight: '1.6rem' }}>{props.psnNote.note}</span>
                <div className="font-bold text-lg mt-6 mb-2">지원 학생 확인 서약</div>
                <span style={{ whiteSpace: 'pre-line', lineHeight: '1.6rem' }}>{props.psnNote.confirm}</span>
                <div className="flex justify-end">
                    <button className="btn btn-outline-primary border-dotted" onClick={() => {
                        setModNoteParams({ ...modNoteParams, note: props.psnNote.note, confirm: props.psnNote.confirm })
                        setModForm(true);
                    }}>수정하기</button>
                </div>
            </div>
            <Modal size="modal-xl" backdrop="" show={modForm} onHidden={() => {setModForm(false);}}>
				<ModalBody className="p-5">
                    <div className="p-5 bg-slate-50 mt-6">
                        <div className="font-bold text-lg">자기소개서 관련 유의사항</div>
                        <div className="flex flex-col gap-2 mt-3">
                            <textarea name={'note'} cols="" rows="5" className="form-control" 
                            value={modNoteParams.note} placeholder="유의사항을 작성해 주세요" 
                            onChange={handleParams}></textarea>
                        </div>
                        <div className="font-bold text-lg mt-6">지원 학생 확인 서약</div>
                        <div className="flex flex-col gap-2 mt-3">
                            <textarea name={'confirm'} cols="" rows="5" className="form-control" 
                            value={modNoteParams.confirm} placeholder="서약 내용을 작성해 주세요" 
                            onChange={handleParams}></textarea>
                        </div>
                    </div> 
				</ModalBody>
				<ModalFooter>
                    <button type="button" className="btn btn-ouline-secondary w-24 mr-2" onClick={() => { setModForm(false); }}>취소</button>
                    <button type="button" className="btn btn-primary w-24" onClick={modNoteUpdate}>수정하기</button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
}

export default ClNote;
