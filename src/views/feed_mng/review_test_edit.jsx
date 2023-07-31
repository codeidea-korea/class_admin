import { Lucide } from '@/base-components'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { userState } from '@/states/userState'
import { useRecoilValue } from 'recoil'

const ReviewTestEdit = () => {
  const user = useRecoilValue(userState)
  const [data, setData] = useState([
    {
      subject: '화학',
      teacher: '최철호',
      content: '물질의 성질',
      date: '2023.07.28',
      student_answerYN: 'Y',
      student_answer_link: '34',
      score: 'PASS',
      answerYN: 'Y',
      answer_fileId: '232',
      grade: '',
      questionYN: 'Y',
      question_fildId: '123',
    },
    {
      subject: '화학',
      teacher: '최철호',
      content: '물질의 성질',
      date: '2023.07.28',
      student_answerYN: 'Y',
      student_answer_link: '34',
      score: 'FAIL',
      answerYN: 'N',
      answer_fileId: '',
      grade: '',
      questionYN: 'Y',
      question_fildId: '123',
    },
    {
      subject: '화학',
      teacher: '최철호',
      content: '물질의 성질',
      date: '2023.07.28',
      student_answerYN: 'N',
      student_answer_link: '',
      score: '',
      answerYN: 'N',
      answer_fileId: '',
      grade: '',
      questionYN: 'Y',
      question_fildId: '123',
    },
  ])

  const { getValues, setValue, watch, reset, register } = useForm({
    defaultValues: {
      list: [],
    },
  })
  useEffect(() => {
    reset({ list: data })
  }, [])

  const handleAddList = () => {
    const addData = {
      subject: '',
      teacher: '최철호',
      content: '',
      date: `${new Date().getFullYear()}.${
        new Date().getMonth() + 1 < 10
          ? '0' + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1
      }.${new Date().getDate()}`,
      student_answerYN: 'N',
      student_answer_link: '',
      score: '',
      answer_fileId: '',
      grade: '',
      questionYN: 'N',
      question_fildId: '',
    }
    setData([addData, ...data])
    setValue('list', [addData, ...data])
  }
  return (
    <React.Fragment>
      <div className="flex gap-2 mt-5">
        {user.authority == 'TEACHER' ? (
          <>
            <Link to="/feed_mng" className="btn bg-white w-36">
              자기소개서
            </Link>
            <Link to="/feed_mng?review" className="btn btn-primary w-36">
              복습테스트
            </Link>
          </>
        ) : (
          <>
            <Link to="/mento_mng" className="btn bg-white w-36">
              자기소개서
            </Link>
            <Link to="/mento_mng?review" className="btn btn-primary w-36">
              복습테스트
            </Link>
          </>
        )}
      </div>

      <div className="intro-y box mt-5 p-5">
        <div className="flex justify-between gap-2">
          <div>
            <div className="font-medium">담당 선생님 : 최철호 선생님</div>
            <div className="flex items-center gap-2 font-medium">
              담당 학생 : ghdrlfehd
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
                <td>문제</td>
                <td>출제일시</td>
                <td>답안제출</td>
                <td>모범답안보기</td>
                <td>채점</td>
              </tr>
              {watch('list')?.map((item, index) => (
                <tr className="text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center w-[100px]"
                      defaultValue={item.subject}
                      key={item.subject}
                    />
                  </td>
                  <td>{item.teacher} 선생님</td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center w-[150px]"
                      defaultValue={item.content}
                      key={item.content}
                    />
                  </td>
                  <td>
                    {item.questionYN == 'Y' ? (
                      <a
                        href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item.answer_fileId}`}
                        className="cursor-pointer text-blue underline"
                      >
                        보기
                      </a>
                    ) : (
                      <div className="input-group justify-center w-[200px] mx-auto">
                        <input
                          type="file"
                          className="dp_none"
                          id={`file-upload-${index}`}
                          {...register(`list.${index}.file`)}
                        />
                        <label
                          htmlFor={`file-upload-${index}`}
                          className="flex items-center"
                        >
                          <input
                            type="text"
                            className="form-control file_up bg-white"
                            placeholder=""
                            value={
                              item?.file?.length > 0 ? item?.file[0]?.name : ''
                            }
                            readOnly
                          />
                          <div className="input-group-text whitespace-nowrap file_up_btn">
                            찾기
                          </div>
                        </label>
                      </div>
                    )}
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
                      <div className="input-group justify-center w-[200px] mx-auto">
                        <input
                          type="file"
                          className="dp_none"
                          id={`file-upload-${index}2`}
                          {...register(`list.${index}.answerFile`)}
                        />
                        <label
                          htmlFor={`file-upload-${index}2`}
                          className="flex items-center"
                        >
                          <input
                            type="text"
                            className="form-control file_up bg-white"
                            placeholder=""
                            value={
                              item?.answerFile?.length > 0
                                ? item?.answerFile[0]?.name
                                : ''
                            }
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
                    <select
                      className="form-control"
                      defaultValue={item.score}
                      key={item.score}
                    >
                      <option value="">미채점</option>
                      <option value="PASS">PASS</option>
                      <option value="FAIL">FAIL</option>
                    </select>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={9} className="text-center">
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
