import { Lucide } from "@/base-components";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function OnlineBasicClassForm() {


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
          <table className="table table-hover">
            <tr className="bg-slate-100 text-center">
              <td>구분</td>
              <td>단원</td>
              <td>학습 내용</td>
              <td>영상학습URL</td>
              <td>학습자료</td>
              <td>삭제</td>
            </tr>
            <tr className="text-center">
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
              <Link to="/online_basic_class">
                <button className="btn bg-white w-24">취소</button>
              </Link>
              <button className="btn btn-sky w-24">저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlineBasicClassForm;
