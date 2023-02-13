import { Dropzone } from "@/base-components";
import { useEffect, useRef } from "react";
import { ClassicEditor } from "@/base-components";
import { useState } from "react";
import { Link } from "react-router-dom";

function NoticeEdit() {
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

  // 에디터
  const [editorData, setEditorData] = useState("<p>내용을 작성해 주세요</p>");

  return (
    <>
      {/* BEGIN: 관리자 계정 초대 */}
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">공지사항</div>
        </div>
        <div className="intro-y p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <div className="font-medium  w-36 text-center shrink-0">제목</div>
              <div>
                <input type="text" className="form-control w-72" />
              </div>
              <div className="form-check ml-4">
                <input
                  id="checkbox-switch-1"
                  className="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" htmlFor="checkbox-switch-1">
                  상단 고정
                </label>
              </div>
            </div>
            <hr className="border-t border-dotted" />
            <div className="flex items-center">
              <div className="font-medium w-36 text-center shrink-0">
                첨부파일
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
            <div className="flex items-center ck_w-full">
              <div className="font-medium w-36 text-center shrink-0">내용</div>
              <ClassicEditor value={editorData} onChange={setEditorData} />
            </div>
          </div>

          <div className="flex gap-2 justify-center mt-3">
            <Link to="/notice">
              <button className="btn bg-white w-24">취소</button>
            </Link>
            <button className="btn btn-sky w-24">확인</button>
          </div>
        </div>
      </div>
      {/* END: Page Layout */}
    </>
  );
}

export default NoticeEdit;
