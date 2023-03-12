import {Lucide, Modal, ModalBody, ModalHeader, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@/base-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

function FeedViewOutline() {
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);

    const [popTip, setPopTip] = useState(false); // 토글 버튼

	useEffect(() => {
        (async () => {

        })();
    }, []);

	return (
		<React.Fragment>
            <button className="btn bg-white flex items-center w-44" onClick={() => {setPopTip((e) => !e);}}>
                <Lucide icon="Info" className="w-4 h-4 mr-2"></Lucide>자소서 작성 꿀팁
                <Lucide icon="ChevronDown" className="w-4 h-4 ml-auto"></Lucide>
            </button>
            {popTip && (
                <div className="p-5 bg-slate-50 text-pending mt-3 rounded-md">
                    2번 문항은 지원자가 자라온 가정 환경 및 부모님으로 크게
                    영향을 받은 부분, 학교에서의 교우관계나 선생님들과의 관계
                    설명으로 지금의 자신의 장점을 부각시키는 항목입니다.
                    <br />
                    또한 지역적 환경 (주변 자연환경, 학습 인프라 등...)을 통해
                    지원자가 어떤 활동들을 해왔고 지원자의 꿈을 어떻게
                    키워왔는지를 설명하면 좋습니다.
                </div>
            )}

            <div className="mt-5 intro-y">
                <TabGroup>
                    <TabList className="nav-tabs">
                        <Tab className="w-full py-2" tag="button">1번 문항</Tab>
                        <Tab className="w-full py-2" tag="button">2번 문항</Tab>
                        <Tab className="w-full py-2" tag="button">3번 문항</Tab>
                        <Tab className="w-full py-2" tag="button">4번 문항</Tab>
                        <Tab className="w-full py-2" tag="button">5번 문항</Tab>
                        <Tab className="w-full py-2" tag="button">6번 문항</Tab>
                        <Tab className="w-full py-2" tag="button">탐구 활동 증빙 자료</Tab>
                    </TabList>
                    <TabPanels className="border-l border-r border-b">
                        <TabPanel className="leading-relaxed p-5">
                            <div className=" text-base font-medium mt-5">
                            1. 한국과학영재학교가 왜 지원 학생(본인)을 선발해야
                            한다고 생각하는지 그 이유를 기술해 주십시오.
                            <span className="text-slate-400 text-sm ml-2">
                                (띄어쓰기 포함 600자 이내)
                            </span>
                            </div>
                            <div className="intro-y grid grid-cols-12 gap-6 mt-5">
                            <div className="col-span-8">
                                <div className="flex justify-end">
                                <button className="btn btn-green btn-sm">
                                    피드백 달기
                                </button>
                                </div>
                                <div className="bg-slate-100 p-5 rounded-md mt-3">
                                <span
                                    style={{ backgroundColor: "rgba(251,0,0,0.3)" }}
                                >
                                    Lörem ipsum krodinock tres vasade. Heminoning.
                                    Vavis anande hall då gigahet att rediligt.
                                    Multiss kreddig. Jining autorar
                                </span>
                                när ånt poskap. Foliehatt desk. Plafadade öledes
                                semikyliga, spegt om plaspell. Exonas makror
                                mikengar. Stuprörspolitik plabel. Gik makrogt, att
                                pren om än apotris om Odellplatta. Trelig potör.
                                Gensax tregt i prebel.
                                <br />
                                <br />
                                Geosam sperat trir planade. Hask kroputösamma
                                maprelig. Rygoska. Reling bes plattfilm, då
                                prongen. Nehössa oskade den antilons samt
                                metafili. Geosk yheten. Röteng jysm. Rylingar tin.
                                Du kan vara drabbad. Megajyning ponat, för
                                poddsändning det seskapet. Din paradobeska doktig:
                                sod. Semirade par sons, preliga och kontraning.
                                Spejer dogoliga, onat.
                                <br />
                                <br />
                                Dra åt helvete-kapital kros det epiktig inklusive
                                makrovis. Rel cisperson och novent i rell sarade.
                                Åktig krolig, faren ultraräck medan antiv. Dorade
                                miktig. Rosas spest. Spesott pregt reprerade.
                                <br />
                                <br />
                                Ryrabel telejäs ifall diryll jänade dojys. Byra
                                norsk karaoke ifall prera. Prelingar prens ede.
                                <span
                                    style={{
                                    backgroundColor: "rgba(66,0,255,0.3)",
                                    }}
                                >
                                    Kande brattig. Kode kavis. Nyskade trenygt men
                                    transtos i nysement som poling. Zlatanera nens.
                                    Sanera global hektar
                                </span>
                                pertism, ore för att kareligen. Benade intraling
                                resök, att janen eller neras. Georynde salig
                                liksom dede sassade: inte ore. Kovis. Sede stenok
                                oskade. Olig ponas makrolig av ramar. Sovåd beling
                                mikrov i bäsam jel. Dektig ränid, när kvasipoporar
                                böloling peren. Tera pregen kvasism respektive
                                rönov. Reant epilanade i plarad en las. Avis
                                biböde olonde. Givomat mikrotiv far abel. Multigen
                                säde görar. Bynera pseudosaras soplass spes. Rell
                                eramir, bässa. Lidat ljudöra hagaktiga. Dorad
                                emtion knytkonferens sokerade. Gigar kament. Subel
                                ongen epint. Diper tempofoni olig, polysocial.
                                Makrokude hör, fal i jal. Regam höde i ära: fastän
                                autokyligen: liksom pol. Äggkonto ong, biokunde
                                nerväxt. Vinat itidade så massa. Brony sogen:
                                ogad: det vill säga viren sus. Suktigt nengar i
                                exorade monotos oren. Yräsm uv. Eufadat
                                tvåkönsnorm suv tills satören nånannanism. Autonde
                                betalskugga vasoktig rasped arade. Våjens dire
                                nylingar, rör. Man sut med kåv modemkapare.
                                Gisagösamma ultrasa. Logogam gågging i al bypogt
                                röränera. Faren beligt, teling spena ungen. Dett
                                den nya ekonomin är suprakerade solhybrid. Rertad
                                sper ogisk. Telig gögt. Kadade beran geojin
                                pobärade. Töse. Pred dotrende teditt, den sagisk
                                villamatta. Donyjir senenat. Vir iktiga egon ifall
                                ulassa. Ded ol än avis om krongen.
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
                        </TabPanel>
                        <TabPanel className="leading-relaxed p-5">
                            2번 문항
                        </TabPanel>
                        <TabPanel className="leading-relaxed p-5">
                            3번 문항
                        </TabPanel>
                        <TabPanel className="leading-relaxed p-5">
                            4번 문항
                        </TabPanel>
                        <TabPanel className="leading-relaxed p-5">
                            5번 문항
                        </TabPanel>
                        <TabPanel className="leading-relaxed p-5">
                            6번 문항
                        </TabPanel>
                    <TabPanel className="leading-relaxed p-5">
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
                    </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
		</React.Fragment>
	);
}

export default FeedViewOutline;
