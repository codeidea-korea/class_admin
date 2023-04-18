import { Lucide, Litepicker } from "@/base-components";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function MockExamForm() {
  //파일 업로드 시 플레이스 홀더 변경
  const [fileName, setFileName] = useState("");

  const handleChange = (event) => {
    setFileName(event.target.files[0].name);
  };
  return (
    <>
      <div className="intro-y box p-5 mt-5">
        <table className="table table-hover">
          <tr className="bg-slate-100 text-center">
            <td>회차</td>
            <td>과목</td>
            <td>시험일자</td>
            <td>모의고사 유형</td>
            <td>풀이영상URL</td>
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
                  회차
                </div>
              </div>
            </td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <Litepicker className="form-control" 
									options={{
										numberOfMonths: 1, 
										format: 'YYYY-MM-DD', 
										autoApply: true,
										dropdowns: {
											minYear: 1950,
											maxYear: null,
											months: true,
											years: true,
										},
									}} />
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
            <Link to="/mock_exam">
              <button className="btn bg-white w-24">취소</button>
            </Link>
            <button className="btn btn-sky w-24">저장하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MockExamForm;
