import $ from "jquery";
import React, { useState, useEffect } from "react";
import { Lucide } from "@/base-components";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

function ClQuestion(props) {
    const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);

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
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

    useEffect(() => {
        (async () => {
            console.log(props.psnActivity)
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
                <button className="btn">순서 정하기</button>
                <button className="btn btn-outline-primary border-dotted flex itmes-center">
                    <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                    문항추가
                </button>
            </div>

            {props.questionList?.map((item, index) => {
                return (
                    <div key={index} className="mt-6 box bg-slate-100 p-5 intro-y">
                        <div className="flex items-center">
                            <h2 className="font-bold text-lg">{item.number}번 문항</h2>
                            <button className="ml-auto">
                                <Lucide icon="X" className="w-6 h-6"></Lucide>
                            </button>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">
                                문항 타이틀
                            </div>
                            <div className="w-full">
                                {item.title}
                            </div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">
                                자소서 꿀팁
                            </div>
                            <div className="w-full">
                                <p className="text-danger">{item.tip}</p>
                            </div>
                        </div>
                        <div className="mt-3 flex">
                            <div className="text-slate-400 w-24 shrink-0">
                                글자수 제한
                            </div>
                            <div>{item.limit}</div>
                        </div>
                        <div className="flex justify-end">
                        <button className="btn bg-white">수정하기</button>
                        </div>
                    </div>
                )
            })}
            




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
                    자소서 꿀팁
                </div>
                <div className="w-full flex items-end">
                    <textarea
                    name=""
                    id=""
                    cols=""
                    rows="2"
                    className="rounded-md w-full"
                    placeholder="자소서 팁을 작성해 주세요."
                    ></textarea>
                    <span className="text-slate-400 w-24 ml-3">200자 이내</span>
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

export default ClQuestion;
