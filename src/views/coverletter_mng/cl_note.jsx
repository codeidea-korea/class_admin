import React, { useState, useEffect, useRef } from "react";


function ClNote(props) {

    useEffect(() => {
        (async () => {
            console.log(123)
        })();
    }, []);

	return (
		<React.Fragment>
            {/* 기존 */}
            {/* <div className="p-5 bg-slate-50 mt-6">
                <div className="font-bold text-lg">자기소개서 관련 유의사항</div>
                <ul className="flex flex-col gap-2 mt-3">
                    <li>1. 서류 제출 마감 시간인 6. 8(수) 17:00(한국 현지 시각 기준)까지 입력해야 합니다.</li>
                    <li>2. 자기소개서는 입학 전형의 중요한 평가 자료이므로 사실에 기초하여 본인이 직접 작성하여야 합니다. (학생기록물평가와 영재성 다면평가에서 자기소개서 기재 사항의 진위 여부를 확인함.)</li>
                </ul>
                <div className="font-bold text-lg mt-6">지원 학생 확인 서약</div>
                <ul className="flex flex-col gap-2 mt-3">
                    <li>1. 본인은 자기소개서를 사실에 입각하여 직접 작성하였음.</li>
                    <li>2. 본인은 한국과학기술원(KAIST) 부설 한국과학영재학교에서 자기소개서와 관련하여 내용 확인을 요청할 경우 적극적으로 협조할 것임</li>
                    <li>3. 본인은 자기소개서에 고의적인 허위 사실 기재, 대리 작성, 기타 부적절한 도움을 받은 사실이 발견되는 경우와 추천인에게 고의적인 허위 정보 제공, 추천인 외 제3 자에게 추천서의 대리 작성을 의뢰한 사실이 확인되는 경우 에는 합격 취소 및 향후 입학 전형에서 지원 자격을 제한 받는 등의 불이익을 감수할 것임</li>
                    <li>4. 본인은 자기소개서와 함께 제출하는 추천서 및 추천서에 관한 정보의 열람 및 공개를 청구할 권리를 포기하고, 향후 이에 관한 정보의 열람 및 공개를 청구하지 아니할 것임</li>
                </ul>
                <div className="flex justify-end">
                    <button className="btn btn-outline-primary border-dotted">수정하기</button>
                </div>
            </div>  */}
            
            {/* textarea 변경 */}
            <div className="p-5 bg-slate-50 mt-6">
                <div className="font-bold text-lg">자기소개서 관련 유의사항</div>
                <div className="flex flex-col gap-2 mt-3">
                    <textarea name="" id="" cols="" rows="5" className="form-control" placeholder="유의사항을 작성해 주세요"></textarea>
                </div>
                <div className="font-bold text-lg mt-6">지원 학생 확인 서약</div>
                <div className="flex flex-col gap-2 mt-3">
                    <textarea name="" id="" cols="" rows="5" className="form-control" placeholder="서약 내용을 작성해 주세요"></textarea>
                </div>
                <div className="flex justify-end">
                    <button className="btn btn-outline-primary border-dotted">수정하기</button>
                </div>
            </div> 
		</React.Fragment>
	);
}

export default ClNote;
