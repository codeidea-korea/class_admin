import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@/base-components";
import { useState } from "react";

function Contents() {
  const [fileName, setFileName] = useState("");

  const handleChange = (event) => {
    setFileName(event.target.files[0].name);
  };

  return (
    <>
      <TabGroup>
        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownToggle className="btn bg-white">
              영재학교
              <Lucide icon="ChevronDown" className="w-4 h-4 ml-3"></Lucide>
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <DropdownItem>WP Apply</DropdownItem>
                <DropdownItem>영재원</DropdownItem>
                <DropdownItem className="drop_active">영재학교</DropdownItem>
                <DropdownItem>과학고</DropdownItem>
                <DropdownItem>대학진학</DropdownItem>
                <DropdownItem>각종대회</DropdownItem>
                <DropdownItem>With People</DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            {({ dismiss }) => (
              <>
                <DropdownToggle className="btn btn-primary">
                  {/* tab 선택할 때마다 텍스트 변경되어야함 */}
                  영재학교 메인
                  <Lucide icon="ChevronDown" className="w-4 h-4 ml-3"></Lucide>
                </DropdownToggle>
                <DropdownMenu className=" w-60">
                  <DropdownContent>
                    <TabList className="nav-boxed-tabs drop_nav">
                      <DropdownItem onClick={dismiss}>
                        <Tab tag="button">영재학교 메인</Tab>
                      </DropdownItem>
                      <DropdownItem onClick={dismiss}>
                        <Tab tag="button">영재학교 소개</Tab>
                      </DropdownItem>
                      <DropdownItem onClick={dismiss}>
                        <Tab tag="button">입학전형분석</Tab>
                      </DropdownItem>
                      <DropdownItem onClick={dismiss}>
                        <Tab tag="button">1차 서류 지원</Tab>
                      </DropdownItem>
                      <DropdownItem onClick={dismiss}>
                        <Tab tag="button">2차 창의력 문제 해결력</Tab>
                      </DropdownItem>
                      <DropdownItem onClick={dismiss}>
                        <Tab tag="button">3차 캠프</Tab>
                      </DropdownItem>
                      <DropdownItem onClick={dismiss}>
                        <Tab tag="button">영재학교 모의고사</Tab>
                      </DropdownItem>
                      <DropdownItem onClick={dismiss}>
                        <Tab tag="button">영재학교 합격생</Tab>
                      </DropdownItem>
                    </TabList>
                  </DropdownContent>
                </DropdownMenu>
              </>
            )}
          </Dropdown>
        </div>
        <div className="intro-y p-5 box mt-5">
          {/* 영재학교 메인 */}
          <TabPanels>
            <TabPanel className="leading-relaxed">
              <div className="flex justify-end">
                <button className="btn btn-sky w-24">저장</button>
              </div>
              <table className="table mt-5 table-bordered">
                <tr className="bg-slate-100 text-center">
                  <td>화면</td>
                  <td>버튼 명</td>
                  <td>링크/파일</td>
                </tr>
                <tr className="text-center">
                  <td>영재학교 준비생의 24시</td>
                  <td>합격자 인터뷰 보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>영재학교 입시 전략 설명회</td>
                  <td>설명회 영상 보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>CMS 전국 연합 모의고사</td>
                  <td>전국 연합 종합 모의고사 풀이 영상</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>영재학교 합격 리뷰</td>
                  <td>영상 보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
              </table>
            </TabPanel>

            {/* 영재학교 소개 */}
            <TabPanel className="leading-relaxed">
              <div className="flex justify-end">
                <button className="btn btn-sky w-24">저장</button>
              </div>
              <table className="table mt-5 table-bordered">
                <tr className="bg-slate-100 text-center">
                  <td>화면</td>
                  <td>버튼 명</td>
                  <td>링크/파일</td>
                </tr>
                <tr className="text-center">
                  <td>한국과학영재학교 KSA</td>
                  <td>선배들의 학교자랑 바로가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>대구과학고등학교 DSH</td>
                  <td>선배들의 학교자랑 바로가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 홈페이지 전형 바로가기</td>
                  <td>한국과학영재학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 홈페이지 전형 바로가기</td>
                  <td>대구과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 홈페이지 전형 바로가기</td>
                  <td>세종과학예술영재학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 홈페이지 전형 바로가기</td>
                  <td>서울과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 홈페이지 전형 바로가기</td>
                  <td>경기과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 홈페이지 전형 바로가기</td>
                  <td>대전과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 홈페이지 전형 바로가기</td>
                  <td>광주과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 홈페이지 전형 바로가기</td>
                  <td>인천과학예술영재학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>한국과학영재학교 학교 교육과정</td>
                  <td>자세히 보러가기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>

                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>대구과학고등학교 학교 교육과정</td>
                  <td>자세히 보러가기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>

                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>영재학교 합격 리뷰</td>
                  <td>영상 보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
              </table>
            </TabPanel>

            {/* 입학전형분석 */}
            <TabPanel className="leading-relaxed">
              <div className="flex justify-end">
                <button className="btn btn-sky w-24">저장</button>
              </div>
              <table className="table mt-5 table-bordered">
                <tr className="bg-slate-100 text-center">
                  <td>화면</td>
                  <td>버튼 명</td>
                  <td>링크/파일</td>
                </tr>
                <tr className="text-center">
                  <td>영재학교 입시 전략 설명회</td>
                  <td>설명회 영상 보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 입학 전형 바로가기</td>
                  <td>한국과학영재학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 입학 전형 바로가기</td>
                  <td>대구과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 입학 전형 바로가기</td>
                  <td>세종과학예술영재학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 입학 전형 바로가기</td>
                  <td>서울과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 입학 전형 바로가기</td>
                  <td>경기과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 입학 전형 바로가기</td>
                  <td>대전과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 입학 전형 바로가기</td>
                  <td>광주과학고등학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>학교별 입학 전형 바로가기</td>
                  <td>인천과학예술영재학교</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>한국과학영재학교 장영실 전형</td>
                  <td>자세히 보기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>영재학교 우선 선발 대비 요령</td>
                  <td>자세히 보기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
              </table>
            </TabPanel>

            {/* 1차 서류 지원 */}
            <TabPanel className="leading-relaxed">
              <div className="flex justify-end">
                <button className="btn btn-sky w-24">저장</button>
              </div>
              <table className="table mt-5 table-bordered">
                <tr className="bg-slate-100 text-center">
                  <td>화면</td>
                  <td>버튼 명</td>
                  <td>링크/파일</td>
                </tr>
                <tr className="text-center">
                  <td>자기소개서 작성법</td>
                  <td>영상 보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>영재학교 자소서 쓰기 - 수학 탐구 영역</td>
                  <td>교육영상보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>영재학교 자소서 쓰기 - 과학 탐구 영역</td>
                  <td>교육영상보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>서류 지원시 챙겨봐야할 것</td>
                  <td>교육영상보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
              </table>
            </TabPanel>

            {/* 2차 창의적 문제해결력 */}
            <TabPanel className="leading-relaxed">
              <div className="flex justify-end">
                <button className="btn btn-sky w-24">저장</button>
              </div>
              <table className="table mt-5 table-bordered">
                <tr className="bg-slate-100 text-center">
                  <td>화면</td>
                  <td>버튼 명</td>
                  <td>링크/파일</td>
                </tr>
                <tr className="text-center">
                  <td>2차 창의적 문제해결력 - 수학영역</td>
                  <td>더 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>2차 창의적 문제해결력 - 과학영역</td>
                  <td>더 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>2차 창의적 문제해결력 - 과학영역</td>
                  <td>더 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="text-center">
                  <td>한국과학영재학교 수학분석</td>
                  <td>더 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>국과학영재학교 과학분석</td>
                  <td>더 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>대구과학고등학교 수학분석</td>
                  <td>더 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>대구과학고등학교 과학분석</td>
                  <td>더 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>지필고사 기출분석 수학</td>
                  <td>영상 보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
                <tr className="text-center">
                  <td>지필고사 기출분석 과학</td>
                  <td>영상 보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
              </table>
            </TabPanel>

            {/* 3차 캠프 */}
            <TabPanel className="leading-relaxed">
              <div className="flex justify-end">
                <button className="btn btn-sky w-24">저장</button>
              </div>
              <table className="table mt-5 table-bordered">
                <tr className="bg-slate-100 text-center">
                  <td>화면</td>
                  <td>버튼 명</td>
                  <td>링크/파일</td>
                </tr>
                <tr className="text-center">
                  <td>CMS 전국 연합 모의고사</td>
                  <td>전국 연합 종합 모의고사 풀이 영상</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
              </table>
            </TabPanel>

            {/* 영재학교 모의고사 */}
            <TabPanel className="leading-relaxed">
              <div className="flex justify-end">
                <button className="btn btn-sky w-24">저장</button>
              </div>
              <table className="table mt-5 table-bordered">
                <tr className="bg-slate-100 text-center">
                  <td>화면</td>
                  <td>버튼 명</td>
                  <td>링크/파일</td>
                </tr>
                <tr className="text-center">
                  <td>3차 캠프대비</td>
                  <td>영상 보러가기</td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                </tr>
              </table>
            </TabPanel>

            {/* 영재학교 합격생 */}
            <TabPanel className="leading-relaxed">
              <div className="flex justify-end">
                <button className="btn btn-sky w-24">저장</button>
              </div>
              <table className="table mt-5 table-bordered">
                <tr className="bg-slate-100 text-center">
                  <td>화면</td>
                  <td>버튼 명</td>
                  <td>링크/파일</td>
                </tr>
                <tr className="text-center">
                  <td>한국과학영재학교 합격생반 프로그램</td>
                  <td>수학 프로그램 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>한국과학영재학교 합격생반 프로그램</td>
                  <td>과학 프로그램 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>한국과학영재학교 합격생반 프로그램</td>
                  <td>정보 프로그램 알아보기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>한국과학영재학교 학교 교육과정</td>
                  <td>자세히 보러가기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>대구과학고등학교 학교 교육과정</td>
                  <td>자세히 보러가기</td>
                  <td>
                    <div className="flex items-center gap-2">
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
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary p-2 flex gap-3 items-center">
                          page.jpg
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger"
                          ></Lucide>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
    </>
  );
}

export default Contents;
