import { Dropzone, Lucide } from "@/base-components";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function ClassVideoForm() {
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

  //파일 업로드 시 플레이스 홀더 변경
  const [fileName, setFileName] = useState("");

  const handleChange = (event) => {
    setFileName(event.target.files[0].name);
  };
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
          </div>
        </div>
      </div>

      <div className="intro-y p-5 box mt-5">
        <table className="table table-hover">
          <tr className="bg-slate-100 text-center">
            <td>차시</td>
            <td>수업구분</td>
            <td>수업일자</td>
            <td>단원</td>
            <td>학습 내용</td>
            <td>영상학습URL</td>
            <td>학습자료</td>
            <td>삭제</td>
          </tr>
          <tr className="text-center">
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
              <input type="text" className="form-control" />
            </td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <div className="input-group">
                <input
                  type="file"
                  className="dp_none"
                  id="file-upload"
                  onChange={handleChange}
                />
                <label htmlFor="file-upload" className="flex items-center">
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
              <div className="flex gap-2 mt-3">
                <button className="btn btn-secondary p-2 flex gap-3 items-center">
                  page.jpg
                  <Lucide icon="X" className="w-4 h-4 text-danger"></Lucide>
                </button>

                <button className="btn btn-secondary p-2 flex gap-3 items-center">
                  page.jpg
                  <Lucide icon="X" className="w-4 h-4 text-danger"></Lucide>
                </button>
              </div>
            </td>
            <td>
              <button className="btn btn-outline-danger bg-white btn-sm whitespace-nowrap">
                삭제
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan={8} className="text-center">
              <button className="btn btn-outline-primary border-dotted">
                <Lucide icon="Plus" className="w-4 h-4"></Lucide>
              </button>
            </td>
          </tr>
        </table>
        <div className="flex mt-3 justify-center">
          <div className="flex gap-2">
            <Link to="/class_video">
              <button className="btn bg-white w-24">취소</button>
            </Link>
            <button className="btn btn-sky w-24">저장하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassVideoForm;
