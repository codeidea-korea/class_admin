import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@/base-components";
import { Link } from "react-router-dom";
import { useState } from "react";

function FeedView() {
  // 자소서 유의사항
  const [Notes, NotesDetail] = useState(false);

  //  히스토리 보기
  const [History, HistoryDetail] = useState(false);

  // 토글 버튼
  const [isCheck, setCheck] = useState(false);

  return (
    <>
      <div className="intro-y mt-5 box">
        <div className="border-b border-slate-200/6 flex space-between p-5">
          <h2 className="text-lg font-bold">한국과학영재학교 / 일반 전형</h2>
          <button
            className="btn btn-sm ml-auto flex items-center"
            onClick={() => {
              NotesDetail(true);
            }}
          >
            <Lucide icon="Info" className="w-4 h-4 mr-2"></Lucide>
            한국과학영재학교 자소서 작성 유의사항
          </button>
        </div>
        <div className="p-5">
          <TabGroup>
            <TabList className="nav-boxed-tabs gap-6">
              <Tab className="w-full py-2 border-slate-200" tag="button">
                자기소개서
              </Tab>
              <Tab className="w-full py-2 border-slate-200" tag="button">
                개요표 작성하기
              </Tab>
            </TabList>
            <TabPanels className="mt-5">
              <TabPanel className="leading-relaxed">
                <button
                  className="btn bg-white flex items-center w-44"
                  onClick={() => {
                    setCheck((e) => !e);
                  }}
                >
                  <Lucide icon="Info" className="w-4 h-4 mr-2"></Lucide>
                  자소서 작성 꿀팁
                  <Lucide
                    icon="ChevronDown"
                    className="w-4 h-4 ml-auto"
                  ></Lucide>
                </button>
                {isCheck && (
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
                      <Tab className="w-full py-2" tag="button">
                        1번 문항
                      </Tab>
                      <Tab className="w-full py-2" tag="button">
                        2번 문항
                      </Tab>
                      <Tab className="w-full py-2" tag="button">
                        3번 문항
                      </Tab>
                      <Tab className="w-full py-2" tag="button">
                        4번 문항
                      </Tab>
                      <Tab className="w-full py-2" tag="button">
                        5번 문항
                      </Tab>
                      <Tab className="w-full py-2" tag="button">
                        6번 문항
                      </Tab>
                      <Tab className="w-full py-2" tag="button">
                        탐구 활동 증빙 자료
                      </Tab>
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
                        탐구 활동 증빙 자료 내용
                      </TabPanel>
                    </TabPanels>
                  </TabGroup>
                </div>
              </TabPanel>
              <TabPanel className="leading-relaxed p-5">
                <div className="intro-y grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <div className="flex justify-between items-center gap-6">
                      <div className=" text-base font-medium">
                        1. 지원 학생(본인) 의 장래희망(꿈)이 무엇인지 구체적으로
                        서술해 보세요.
                      </div>
                      <button className="btn btn-green btn-sm shrink-0">
                        피드백 달기
                      </button>
                    </div>
                    <div className="bg-slate-100 p-5 rounded-md mt-3">
                      <span style={{ backgroundColor: "rgba(251,0,0,0.3)" }}>
                        Lörem ipsum krodinock tres vasade. Heminoning. Vavis
                        anande hall då gigahet att rediligt. Multiss kreddig.
                        Jining autorar
                      </span>
                      när ånt poskap. Foliehatt desk. Plafadade öledes
                      semikyliga, spegt om plaspell. Exonas makror mikengar.
                      Stuprörspolitik plabel. Gik makrogt, att pren om än
                      apotris om Odellplatta. Trelig potör. Gensax tregt i
                      prebel.
                      <br />
                      <br />
                      <span
                        style={{
                          backgroundColor: "rgba(66,0,255,0.3)",
                        }}
                      >
                        Kande brattig. Kode kavis. Nyskade trenygt men transtos
                        i nysement som poling. Zlatanera nens. Sanera global
                        hektar
                      </span>
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
                        Lörem ipsum krodinock tres vasade. Heminoning. Vavis
                        anande hall då gigahet att rediligt. Multiss kreddig.
                        Jining autorar när ånt poskap.
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
                <hr className="my-10 border-t border-dotted" />
                <div className="intro-y grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <div className="flex justify-between items-center gap-6">
                      <div className=" text-base font-medium">
                        2. 지원 학생(본인) 의 진로계획을 구체적으로 서술해
                        보세요.
                      </div>
                      <button className="btn btn-green btn-sm shrink-0">
                        피드백 달기
                      </button>
                    </div>
                    <div className="bg-slate-100 p-5 rounded-md mt-3">
                      Lörem ipsum krodinock tres vasade. Heminoning. Vavis
                      anande hall då gigahet att rediligt. Multiss kreddig.
                      Jining autorar när ånt poskap. Foliehatt desk. Plafadade
                      öledes semikyliga, spegt om plaspell. Exonas makror
                      mikengar. Stuprörspolitik plabel. Gik makrogt, att pren om
                      än apotris om Odellplatta. Trelig potör. Gensax tregt i
                      prebel.
                      <br />
                      <br />
                      <span
                        style={{
                          backgroundColor: "rgba(66,0,255,0.3)",
                        }}
                      >
                        Kande brattig. Kode kavis. Nyskade trenygt men transtos
                        i nysement som poling. Zlatanera nens. Sanera global
                        hektar
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400 mt-2 text-sm">
                      <div>글자수(700/600)</div>
                      <div>최종수정일 00년 00월 00일</div>
                    </div>
                  </div>
                  <div className="col-span-4">
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
                <hr className="my-10 border-t border-dotted" />
                <div className="intro-y grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <div className="flex justify-between items-center gap-6">
                      <div className=" text-base font-medium">
                        3. 지원 학생(본인) 의 장점과 특기 사항을 구체적으로
                        서술해 보세요.
                      </div>
                      <button className="btn btn-green btn-sm shrink-0">
                        피드백 달기
                      </button>
                    </div>
                    <div className="bg-slate-100 p-5 rounded-md mt-3">
                      Lörem ipsum krodinock tres vasade. Heminoning. Vavis
                      anande hall då gigahet att rediligt. Multiss kreddig.
                      Jining autorar när ånt poskap. Foliehatt desk. Plafadade
                      öledes semikyliga, spegt om plaspell. Exonas makror
                      mikengar. Stuprörspolitik plabel. Gik makrogt, att pren om
                      än apotris om Odellplatta. Trelig potör. Gensax tregt i
                      prebel.
                    </div>
                    <div className="flex justify-between text-slate-400 mt-2 text-sm">
                      <div>글자수(700/600)</div>
                      <div>최종수정일 00년 00월 00일</div>
                    </div>
                  </div>
                  <div className="col-span-4"></div>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
      <div className="mt-5">
        <Link to="/feed_mng">
          <button className="btn bg-white w-24">목록</button>
        </Link>
      </div>

      {/* BEGIN: Modal 자소서 유의사항 */}
      <Modal
        size="modal-lg"
        show={Notes}
        onHidden={() => {
          NotesDetail(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">
            한국과학영재학교 자소서 작성 유의사항
          </h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              NotesDetail(false);
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody className="p-5">
          <div className="font-bold">자기소개서 관련 유의사항</div>
          <div className="mt-3">
            <ul className="list-num ml-4">
              <li>
                서류 제출 마감 시간인 6. 8(수) 17:00(한국 현지 시각 기준)까지
                입력해야 합니다.
              </li>
              <li>
                자기소개서는 입학 전형의 중요한 평가 자료이므로 사실에 기초하여
                본인이 직접 작성하여야 합니다. (학생기록물평가와 영재성
                다면평가에서 자기소개서 기재 사항의 진위 여부를 확인함.)
              </li>
            </ul>
          </div>

          <div className="font-bold mt-6">지원 학생 확인 서약</div>
          <div className="mt-2">
            <ul className="list-num ml-4">
              <li>본인은 자기소개서를 사실에 입각하여 직접 작성하였음.</li>
              <li>
                본인은 한국과학기술원(KAIST) 부설 한국과학영재학교에서
                자기소개서와 관련하여 내용 확인을 요청할 경우 적극적으로 협조할
                것임
              </li>
              <li>
                본인은 자기소개서에 고의적인 허위 사실 기재, 대리 작성, 기타
                부적절한 도움을 받은 사실이 발견되는 경우와 추천인에게 고의적인
                허위 정보 제공, 추천인 외 제3 자에게 추천서의 대리 작성을 의뢰한
                사실이 확인되는 경우 에는 합격 취소 및 향후 입학 전형에서 지원
                자격을 제한 받는 등의 불이익을 감수할 것임
              </li>
              <li>
                본인은 자기소개서와 함께 제출하는 추천서 및 추천서에 관한 정보의
                열람 및 공개를 청구할 권리를 포기하고, 향후 이에 관한 정보의
                열람 및 공개를 청구하지 아니할 것임
              </li>
            </ul>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Modal 자소서 유의사항 */}

      {/* BEGIN: Modal 히스토리보기 */}
      <Modal
        size="modal-lg"
        show={History}
        onHidden={() => {
          HistoryDetail(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">히스토리</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              HistoryDetail(false);
            }}
          >
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
    </>
  );
}

export default FeedView;
