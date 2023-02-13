import {
  Dropzone,
  Lucide,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@/base-components";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function CurriculumForm() {
  // 드롭존
  const dropzoneMultipleRef = useRef();

  useEffect(() => {
    const elDropzoneMultipleRef = dropzoneMultipleRef.current;
    elDropzoneMultipleRef.dropzone.on("success", () => {
      alert("파일 업로드를 완료했습니다.");
    });
    elDropzoneMultipleRef.dropzone.on("error", () => {
      alert("더이상 업로드 할 수 없습니다.");
    });
  }, []);

  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium flex items-center">
            영재학교
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            수학
          </div>
        </div>
        <div className="intro-y p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <div className="font-medium  w-36 text-left shrink-0">
                선생님 이름 <span className="text-danger">*</span>
              </div>
              <div>
                <input type="text" className="form-control w-72" />
              </div>
            </div>
            <hr className="border-t border-dotted" />
            <div className="flex items-center">
              <div className="font-medium  w-36 text-left shrink-0">
                과목 <span className="text-danger">*</span>
              </div>
              <div>
                <input type="text" className="form-control w-72" />
              </div>
            </div>
            <hr className="border-t border-dotted" />
            <div className="flex items-center">
              <div className="font-medium w-36 text-left shrink-0">
                선생님 프로필
              </div>
              <div className="dorp_w-full w-full">
                <Dropzone
                  getRef={(el) => {
                    dropzoneMultipleRef.current = el;
                  }}
                  options={{
                    url: "https://httpbin.org/post",
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    dictRemoveFile: "삭제",
                    addRemoveLinks: true,
                    headers: { "My-Awesome-Header": "header value" },
                  }}
                  className="dropzone"
                >
                  <div className="text-lg font-medium">
                    파일 드래그 또는 클릭후 업로드 해주세요.
                  </div>
                  <div className="text-gray-600 text-sm">
                    5MB 미만의 파일만 첨부가 가능합니다.(PNG, GIF, JPG만 가능)
                  </div>
                </Dropzone>
              </div>
            </div>
            <hr className="border-t border-dotted" />
            <div className="flex items-center">
              <div className="font-medium  w-36 text-left shrink-0">
                학습영상 url
              </div>
              <div>
                <input type="text" className="form-control w-96" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="intro-y p-5 box mt-5">
        <TabGroup>
          <TabList className="nav-boxed-tabs gap-3 w-1/3">
            <Tab
              className="w-full py-2 order border-slate-200 bg-white"
              tag="button"
            >
              주중 수업 상세 커리큘럼
            </Tab>
            <Tab
              className="w-full py-2 border border-slate-200 bg-white"
              tag="button"
            >
              주말 수업 상세 커리큘럼
            </Tab>
          </TabList>
          <TabPanels className="mt-5">
            <TabPanel className="leading-relaxed">
              <table className="table table-hover">
                <tr className="bg-slate-100 text-center">
                  <td>월</td>
                  <td>차시</td>
                  <td>교재</td>
                  <td>학습목표</td>
                  <td>학습 단원 및 내용</td>
                </tr>
                <tr className="text-center">
                  <td>
                    <div className="input-group w-24">
                      <input type="number" className="form-control" />
                      <div id="input-group-price" className="input-group-text">
                        월
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="input-group w-28">
                      <input type="number" className="form-control" />
                      <div
                        id="input-group-price"
                        className="input-group-text whitespace-nowrap"
                      >
                        차시
                      </div>
                    </div>
                  </td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control w-96" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="text-center">
                    <button className="btn btn-outline-primary border-dotted">
                      <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                    </button>
                  </td>
                </tr>
              </table>
            </TabPanel>
            <TabPanel className="leading-relaxed">
              <table className="table table-hover">
                <tr className="bg-slate-100 text-center">
                  <td>월</td>
                  <td>차시</td>
                  <td>교재</td>
                  <td>학습목표</td>
                  <td>학습 단원 및 내용</td>
                </tr>
                <tr className="text-center">
                  <td>
                    <div className="input-group w-24">
                      <input type="number" className="form-control" />
                      <div id="input-group-price" className="input-group-text">
                        월
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="input-group w-28">
                      <input type="number" className="form-control" />
                      <div
                        id="input-group-price"
                        className="input-group-text whitespace-nowrap"
                      >
                        차시
                      </div>
                    </div>
                  </td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control w-96" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="text-center">
                    <button className="btn btn-outline-primary border-dotted">
                      <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                    </button>
                  </td>
                </tr>
              </table>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        <div className="flex mt-3 justify-center">
          <div className="flex gap-2">
            <Link to="/curriculum">
              <button className="btn bg-white w-24">취소</button>
            </Link>
            <Link to="/curriculum_form">
              <button className="btn btn-sky w-24">수정하기</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurriculumForm;
