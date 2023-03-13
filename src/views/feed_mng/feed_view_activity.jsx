import {Lucide, Modal, ModalBody, ModalHeader, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@/base-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

function FeedViewActivity() {
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);

    const [fileName, setFileName] = useState(""); //파일 업로드 시 플레이스 홀더 변경
    const [popTip, setPopTip] = useState(false); // 토글 버튼

	useEffect(() => {
        (async () => {

        })();
    }, []);

    const handleChange = (event) => {
		setFileName(event.target.files[0].name);
	};

	return (
		<React.Fragment>
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
		</React.Fragment>
	);
}

export default FeedViewActivity;
