import React, { useState, useEffect, useRef } from "react";
import {Lucide} from "@/base-components";

function ClOutline(props) {

    useEffect(() => {
        (async () => {
            console.log(123)
        })();
    }, []);

	return (
		<React.Fragment>
            <div className="flex w-full justify-end gap-3">
                <button className="btn">순서 정하기</button>
                <button className="btn btn-outline-primary border-dotted flex itmes-center">
                <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                문항추가
                </button>
            </div>

            <div className="mt-6 box bg-slate-100 p-5 intro-y">
                <div className="flex items-center">
                <h2 className="font-bold text-lg">1번 문항</h2>
                <button className="ml-auto">
                    <Lucide icon="X" className="w-6 h-6"></Lucide>
                </button>
                </div>

                <div className="mt-3 flex">
                <div className="text-slate-400 w-24 shrink-0">
                    문항 타이틀
                </div>
                <div className="w-full">
                    한국과학영재학교가 왜 지원 학생(본인)을 선발해야 한다고
                    생각하는지 그 이유를 기술해 주십시오.
                </div>
                </div>

                <div className="mt-3 flex">
                <div className="text-slate-400 w-24 shrink-0">
                    글자수 제한
                </div>
                <div>600</div>
                </div>

                <div className="flex justify-end">
                <button className="btn bg-white">수정하기</button>
                </div>
            </div>

            <div className="mt-6 box bg-slate-100 p-5 intro-y">
                <div className="flex items-center">
                <h2 className="font-bold text-lg">2번 문항</h2>
                <button className="ml-auto">
                    <Lucide icon="X" className="w-6 h-6"></Lucide>
                </button>
                </div>

                <div className="mt-3 flex">
                <div className="text-slate-400 w-24 shrink-0">
                    문항 타이틀
                </div>
                <div className="w-full flex items-end">
                    <textarea
                    name=""
                    id=""
                    cols=""
                    rows="2"
                    className="rounded-md w-full"
                    placeholder="타이틀을 작성해 주세요."
                    ></textarea>
                    <span className="text-slate-400 w-24 ml-3">100자 이내</span>
                </div>
                </div>

                <div className="mt-3 flex">
                <div className="text-slate-400 w-24 shrink-0">
                    글자수 제한
                </div>
                <div>
                    <input type="number" className="form-control w-24" placeholder="글자수" />
                </div>
                </div>

                <div className="flex justify-end">
                <button className="btn btn-primary">저장하기</button>
                </div>
            </div>

            <div className="flex flex-col items-center mt-6">
                <span className="text-slate-400 text-sm">드래그해서 항목의 순서를 변경할 수 있습니다.</span>
                <button className="btn btn-outline-primary border-dotted mt-2"><Lucide icon="Plus" className="w-6 h-6"></Lucide></button>
            </div>
		</React.Fragment>
	);
}

export default ClOutline;
