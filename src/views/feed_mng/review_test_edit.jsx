import { Lucide } from '@/base-components'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ReviewTestEdit = () => {
  const [data, setData] = useState([
    {
      subject: '화학',
      teacher: '최철호',
      content: '물질의 성질',
      date: '2023-07-28',
      student_answerYN: 'Y',
      student_answer_link: '',
      answerYN: 'Y',
      answer_fileId: '232',
      grade: '',
    },
    {
      subject: '화학',
      teacher: '최철호',
      content: '물질의 성질',
      date: '2023-07-28',
      student_answerYN: 'Y',
      student_answer_link: '',
      answerYN: 'N',
      answer_fileId: '',
      grade: '',
    },
    {
      subject: '화학',
      teacher: '최철호',
      content: '물질의 성질',
      date: '2023-07-28',
      student_answerYN: 'N',
      student_answer_link: '',
      answerYN: 'N',
      answer_fileId: '',
      grade: '',
    },
  ])
  return (
    <React.Fragment>
      <div className="flex gap-2 mt-5">
        <Link to="/mento_mng" className="btn bg-white w-36">
          자기소개서
        </Link>
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          문제은행
        </button>
        <Link to="/mento_mng?review" className="btn btn-primary w-36">
          복습테스트
        </Link>
      </div>

      <div className="intro-y box mt-5 p-5">
        <div className="flex justify-between gap-2">
          <div>
            <div className="font-medium">담당선생님 : 최철호 선생님</div>
            <div className="flex items-center gap-2 font-medium">
              담당학생 : ghdrlfehd
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="table table-hover">
            <tbody>
              <tr className="text-center bg-slate-100 font-medium">
                <td>번호</td>
                <td>과목</td>
                <td>출제자</td>
                <td>학습내용</td>
                <td>출제일시</td>
                <td>답안제출</td>
                <td>모범답안보기</td>
                <td>채점</td>
              </tr>
              {data.map((item, index) => (
                <tr className="text-center">
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center"
                      defaultValue={item.subject}
                    />
                  </td>
                  <td>{item.teacher} 선생님</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center"
                      defaultValue={item.content}
                    />
                  </td>
                  <td>{item.date}</td>
                  <td>
                    {item.student_answerYN == 'Y' ? (
                      <a href="" className="underline" download>
                        제출
                      </a>
                    ) : (
                      '미제출'
                    )}
                  </td>
                  <td>
                    {item.answerYN == 'Y' ? (
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item.answer_fileId}`}
                          className="cursor-pointer text-blue underline"
                        >
                          답안 확인하기
                        </a>
                        <Lucide
                          icon="X"
                          className="w-4 h-4 text-danger cursor-pointer"
                        ></Lucide>
                      </div>
                    ) : (
                      <div className="input-group justify-center">
                        <input
                          type="file"
                          className="dp_none"
                          id={`file-upload-${index}`}
                        />
                        <label
                          htmlFor={`file-upload-${index}`}
                          className="flex items-center"
                        >
                          <input
                            type="text"
                            className="form-control file_up bg-white"
                            placeholder=""
                            readOnly
                          />
                          <div className="input-group-text whitespace-nowrap file_up_btn">
                            찾기
                          </div>
                        </label>
                      </div>
                    )}
                  </td>
                  <td>
                    {item.student_answerYN == 'Y' ? (
                      <input
                        type="text"
                        className="form-control text-center"
                        defaultValue=""
                        placeholder="PASS or FAIL "
                      />
                    ) : (
                      '미채점'
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={8} className="text-center">
                  <button
                    className="btn btn-outline-primary border-dotted"
                    onClick={() => handleAddList()}
                  >
                    <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex mt-3 justify-center">
          <div className="flex gap-2">
            <Link to="/mento_mng/view/12">
              <button className="btn bg-white w-24">취소</button>
            </Link>
            <button className="btn btn-sky w-24" onClick={() => handleSave()}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ReviewTestEdit
