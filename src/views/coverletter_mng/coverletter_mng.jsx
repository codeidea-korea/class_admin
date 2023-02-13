import {
  Lucide,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Notification,
} from "@/base-components";
import { useRef } from "react";

function CoverletterMng() {

  // Basic non sticky notification
  const basicNonStickyNotification = useRef();
  const basicNonStickyNotificationToggle = () => {
    
  // Show notification
  basicNonStickyNotification.current.showToast();
  };

  return (
    <>
      <div className="intro-y box p-5 mt-5">
        <div className="p-5 bg-slate-50">
          <div className="font-bold text-lg">자기소개서 편집 설정 방법</div>
          <ul className="flex flex-col gap-2 mt-3">
            <li>1. 지원영역을 선택 해 주세요.</li>
            <li>2. 영역에 따른 학교를 선택해주세요.</li>
            <li>3. 지원 전형을 선택해주세요.</li>
            <li>
              4. 자기소개서 문항을 편집기능을 통해 추가하거나 제거할 수
              있습니다.
            </li>
            <li>
              5. 자기소개서 개요표 문항을 편집기능을 통해 추가하거나 제거할 수
              있습니다.
            </li>
          </ul>
        </div>

        <div className="mt-5 flex gap-20">
          {/* 지원 영역 */}
          <div className="w-full intro-y">
            <div className="text-lg font-bold">지원영역</div>
            <div className="flex items-center gap-2">
              <input type="text" className="form-control" />
              <button className="btn btn-outline-primary border-dotted" onClick={basicNonStickyNotificationToggle}>
                <Lucide icon="Plus" className="w-4 h-4"></Lucide>
              </button>
              {/* BEGIN:  Notification*/}
              <Notification getRef={(el)=> {
                  basicNonStickyNotification.current = el;
                  }}
                  options={{
                                duration: 3000,
                              }}
                  className="flex"
                  >
                  <div className="font-medium flex items-center text-danger">
                    <Lucide icon="AlertOctagon" className="mr-2 w-6 h-6"></Lucide>
                    추가할 지원영역을 입력해주세요.
                  </div>
              </Notification>
              {/* END: Notification */}
            </div>
            <div className="box mt-3 border border-slate-200 p-5 flex flex-col gap-2">
              <button className="flex items-center w-full supportlist on p-2 rounded-md">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  영재학교
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  과학고
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  영재원
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  대학진학
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>
            </div>
          </div>

          {/* 지원 학교 */}
          <div className="w-full intro-y">
            <div className="text-lg font-bold">지원학교</div>
            <div className="flex items-center gap-2">
              <input type="text" className="form-control" />
              <button className="btn btn-outline-primary border-dotted">
                <Lucide icon="Plus" className="w-4 h-4"></Lucide>
              </button>
            </div>
            <div className="box mt-3 border border-slate-200 p-5 flex flex-col gap-2">
              <button className="flex items-center w-full supportlist on p-2 rounded-md">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  한국과학영재학교
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  대구과학고등학고
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  서울과학고등학교
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  경기과학고등학교
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  대전과학고등학교
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  광주과학고등학교
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  세종과학예술영재학교
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  인천과학예술영재학교
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>
            </div>
          </div>

          {/* 지원 전형 */}
          <div className="w-full intro-y">
            <div className="text-lg font-bold">지원전형</div>
            <div className="flex items-center gap-2">
              <input type="text" className="form-control" />
              <button className="btn btn-outline-primary border-dotted">
                <Lucide icon="Plus" className="w-4 h-4"></Lucide>
              </button>
            </div>
            <div className="box mt-3 border border-slate-200 p-5 flex flex-col gap-2">
              <button className="flex items-center w-full supportlist on p-2 rounded-md">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  일반전형
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>

              <button className="flex items-center w-full p-2 rounded-md supportlist">
                <div className="flex items-center">
                  <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                  장영실 전형
                </div>
                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 bg-slate-50 mt-6">
          <div className="font-bold text-lg">자기소개서 편집 설정 방법</div>
          <ul className="flex flex-col gap-2 mt-3">
            <li>1. 지원영역을 선택 해 주세요.</li>
            <li>2. 영역에 따른 학교를 선택해주세요.</li>
            <li>3. 지원 전형을 선택해주세요.</li>
            <li>
              4. 자기소개서 문항을 편집기능을 통해 추가하거나 제거할 수
              있습니다.
            </li>
            <li>
              5. 자기소개서 개요표 문항을 편집기능을 통해 추가하거나 제거할 수
              있습니다.
            </li>
          </ul>
        </div>

        <TabGroup className="mt-6 intro-y">
          <TabList className="nav-boxed-tabs gap-6">
            <Tab className="w-full py-2 border-slate-200" tag="button">
              자기소개서 문항
            </Tab>
            <Tab className="w-full py-2 border-slate-200" tag="button">
              자기소개서 개요표
            </Tab>
          </TabList>
          <TabPanels className="mt-5">
            
            {/* 자기소개서 문항 */}
            <TabPanel className="leading-relaxed">
              <div className="flex w-full justify-end gap-3">
                <div className="form-check form-switch">
                  <input
                    id="checkbox-switch-7"
                    className="form-check-input"
                    type="checkbox"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="checkbox-switch-7"
                  >
                    탐구 활동 증빙 자료 목록
                  </label>
                </div>
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
                    자소서 꿀팁
                  </div>
                  <div className="w-full">
                    <p className="text-danger">
                      1번 문항은 지원 학생 (본인)의 장래희망(꿈), 진로계획, 장점
                      및 특기 등이 언급하면서 영재학교 설립목적에 적합함을
                      언급하면 좋습니다. 그리고 영재학교 입학을 위한 종합적으로
                      어떤 노력을 해왔으면 충분히 영재학교에서 공부할 수 있을
                      만큼 준비된 학생임을 부각시키는 것이 좋습니다.
                    </p>
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
            </TabPanel>

            {/* 자기소개서 개요표 */}
            <TabPanel className="leading-relaxed">
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
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
}

export default CoverletterMng;
