import { Lucide } from '@/base-components'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import request from '@/utils/request'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import { useState } from 'react'

const ReviewTestEdit = () => {
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  const teacherId = params.get('teacher-id')
  const name = params.get('name')
  const teacherName = params.get('teacher-name')
  const user = useRecoilValue(userState)
  const [delDataList, setDelDataList] = useState([])

  const { getValues, setValue, watch, reset, register } = useForm({
    defaultValues: {
      list: [],
    },
  })

  // 리스트 가져오기
  const {
    data: reviewTest,
    isLoading: isReviewTest,
    refetch: refetchReviewTest,
  } = useQuery(
    'getReviewTest',
    () =>
      request.get(`/admin/mentor-management/review-test/view`, {
        params: {
          id: id,
          teacherId: teacherId,
        },
      }),
    {
      onSuccess: (data) => {
        reset({ list: data })
      },
    },
  )

  // 저장
  const { mutate: saveData } = useMutation(
    (data) => request.put(`/admin/mentor-management/review-test/update`, data),
    {
      onSuccess: () => {
        refetchReviewTest()
        alert('저장되었습니다.')
        navigate(`/mento_mng/view?id=${id}&teacher-id=${teacherId}&name=${name}&teacher-name=${teacherName}`)
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  // 저장하기 버튼 클릭
  const handleSave = async () => {
    /* 파일 */
    const null_blob = new Blob(['null'], { type: 'image/png' })
    const null_file = new File([null_blob], 'null.png', {
      type: 'image/png',
    })

    let temp = true
    let idList = [], subjectList = [], contentList = [], scoringStatusList = [], delYnList = []

    getValues('list').map((item) => {
      if (!temp) return

      if (!item?.subject) {
        alert('과목을 입력하세요.')
        temp = false
        return temp
      }
      if (!item?.content) {
        alert('학습내용을 입력하세요.')
        temp = false
        return temp
      }
      if (!item?.content) {
        alert('학습내용을 입력하세요.')
        temp = false
        return temp
      }

      idList.push(item.id ? item.id : 0)
      subjectList.push(item.subject ? item.subject : '')
      contentList.push(item.content ? item.content : '')
      scoringStatusList.push(item.scoringStatus ? item.scoringStatus : '')
      delYnList.push(item.delYN ? item.delYN : 'N')
    })

    if (!temp) return

    const formData = new FormData()

    delDataList.forEach((item) => {
      idList.push(item.id)
      subjectList.push('')
      contentList.push('')
      scoringStatusList.push('')
      delYnList.push('Y')
    })

    formData.append('id', idList.join(','))
    formData.append('subject', subjectList.join(','))
    formData.append('content', contentList.join(','))
    formData.append('scoringStatus', scoringStatusList.join(','))
    formData.append('delYN', delYnList.join(','))

    const newQuestionFileDelYN = []
    const newModelAnswerFileDelYN = []

    getValues('list').map((item) => {
      /* 문제 파일 */
      if (item.questionFileId > 0) { // 기존에 등록된 파일이 있으면
        if (item.questionFile && item.questionFile.length) { // 새로 등록할 파일이 있으면
          newQuestionFileDelYN.push('Y')
          formData.append('questionFile', item.questionFile[0])
        } else { // 새로 등록할 파일이 없으면
          if (item.questionFileName) { // 기존 파일을 유지하는 경우
            formData.append('questionFile', null_file)
            newQuestionFileDelYN.push('N')
          } else { // 기존 파일을 삭제하는 경우
            formData.append('questionFile', null_file)
            newQuestionFileDelYN.push('Y')
          }
        }
      } else { // 기존에 등록된 파일이 없으면
        newQuestionFileDelYN.push('N')
        if (item.questionFile && item.questionFile.length) {
          formData.append('questionFile', item.questionFile[0])
        } else {
          formData.append('questionFile', null_file)
        }
      }

      /* 모범 답안 파일 */
      if (item.modelAnswerFileId > 0) { // 기존에 등록된 파일이 있으면
        if (item.modelAnswerFile && item.modelAnswerFile.length) { // 새로 등록할 파일이 있으면
          newModelAnswerFileDelYN.push('Y')
          formData.append('modelAnswerFile', item.modelAnswerFile[0])
        } else { // 새로 등록할 파일이 없으면
          if (item.modelAnswerFileName) { // 기존 파일을 유지하는 경우
            formData.append('modelAnswerFile', null_file)
            newModelAnswerFileDelYN.push('N')
          } else { // 기존 파일을 삭제하는 경우
            formData.append('modelAnswerFile', null_file)
            newModelAnswerFileDelYN.push('Y')
          }
        }

      } else { // 기존에 등록된 파일이 없으면
        newModelAnswerFileDelYN.push('N')
        if (item.modelAnswerFile && item.modelAnswerFile.length) { // 새로 등록할 파일이 있으면
          formData.append('modelAnswerFile', item.modelAnswerFile[0])
        } else {
          formData.append('modelAnswerFile', null_file)
        }
      }
    })
    formData.append('savedQuestionFileDelYN', newQuestionFileDelYN.join(','))
    formData.append('savedModelAnswerFileDelYN', newModelAnswerFileDelYN.join(','))
    formData.append('studentId', id)

    saveData(formData)
  }

  // 삭제 버튼 클릭
  const handleDeleteVideo = (idx, item) => {
    if (confirm('삭제하시겠습니까?')) {
      let origin = getValues('list')
      origin.splice(idx, 1)
      setValue('list', origin)
      setDelDataList([...delDataList, item])
    }
  }

  const handleAddList = () => {
    let origin = getValues('list')
    let copy = {}

    if (origin != null) {
      for (let key in origin[0]) {
        copy[key] = origin[0][key]
      }
    } else {
      origin = []
    }

    copy['id'] = 0
    copy['teacher'] = teacherName
    copy['subject'] = ''
    copy['content'] = ''

    const date = new Date()
    copy['date'] = `${date.getFullYear()}.${
      date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    }.${date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()}`
    copy['questionFile'] = new DataTransfer().files
    copy['questionFileId'] = 0
    copy['questionFileName'] = ''
    copy['modelAnswerFile'] = new DataTransfer().files
    copy['modelAnswerFileId'] = 0
    copy['modelAnswerFileName'] = ''
    copy['scoringStatus'] = 'NO_STATUS'
    copy['delYN'] = 'N'

    origin.push(copy)
    setValue('list', origin)
  }

  return (
    <>
      <div className='flex gap-2 mt-5'>
        {user.authority == 'TEACHER' ? (
          <>
            <Link to='/feed_mng' className='btn bg-white w-36'>
              자기소개서
            </Link>
            <Link to='/feed_mng?review' className='btn btn-primary w-36'>
              복습테스트
            </Link>
          </>
        ) : (
          <>
            <Link to='/mento_mng' className='btn bg-white w-36'>
              자기소개서
            </Link>
            <Link to='/mento_mng?review' className='btn btn-primary w-36'>
              복습테스트
            </Link>
          </>
        )}
      </div>

      <div className='intro-y box mt-5 p-5'>
        <div className='flex justify-between gap-2'>
          <div>
            <div className='font-medium'>담당 선생님 : {teacherName} 선생님</div>
            <div className='flex items-center gap-2 font-medium'>
              담당 학생 : {name}
            </div>
          </div>
        </div>
        <div className='overflow-x-auto mt-5'>
          <table className='table table-hover'>
            <tbody>
            <tr className='text-center bg-slate-100 font-medium'>
              <td>번호</td>
              <td>과목</td>
              <td>출제자</td>
              <td>학습내용</td>
              <td>문제</td>
              <td>출제일시</td>
              <td>답안제출</td>
              <td>모범답안보기</td>
              <td>채점</td>
              <td>삭제</td>
            </tr>
            {watch('list')?.map((item, index) => (
              <tr className='text-center' key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type='text'
                    className='form-control text-center w-[100px]'
                    defaultValue={item.subject}
                    key={item.subject}
                    {...register(`list[${index}].subject`)}
                  />
                </td>
                <td>{item.teacher} 선생님</td>
                <td>
                  <input
                    type='text'
                    className='form-control text-center w-[150px]'
                    defaultValue={item.content}
                    key={item.content}
                    {...register(`list[${index}].content`)}
                  />
                </td>
                <td>
                  {watch(`list.${index}.questionFileName`) ? (
                    <>
                      <a
                        href={`${baseUrl}/v1/contents-data/file-download/${watch('questionFileId')}`}
                        className='cursor-pointer text-blue underline'>
                        보기
                      </a>
                      <Lucide
                        icon='X'
                        className='w-4 h-4 text-danger cursor-pointer'
                        onClick={() => {
                          let request = getValues('list')
                          request[index].questionFileName = ''
                          setValue('list', request)
                        }}
                      ></Lucide>
                    </>
                  ) : (
                    <div className='input-group justify-center w-[200px] mx-auto'>
                      <input
                        type='file'
                        className='dp_none'
                        id={`file-upload-${index}`}
                        {...register(`list.${index}.questionFile`)}
                      />
                      <label htmlFor={`file-upload-${index}`} className='flex items-center'>
                        <input
                          type='text'
                          className='form-control file_up bg-white'
                          placeholder=''
                          value={item?.questionFile?.length > 0 ? item?.questionFile[0]?.name : ''}
                          readOnly
                        />
                        <div className='input-group-text whitespace-nowrap file_up_btn'>
                          찾기
                        </div>
                      </label>
                    </div>
                  )}
                </td>
                <td>{item.creDate}
                </td>
                <td>
                  {item.answerFileId && item.answerFileId !== 0 ? (
                    <a href={`${baseUrl}/v1/contents-data/file-download/${item.answerFileId}`}
                       className='underline' download>
                      제출
                    </a>
                  ) : (
                    '미제출'
                  )}
                </td>
                <td>
                  {item.modelAnswerFileId && item.modelAnswerFileId !== 0 ? (
                    <div className='input-group justify-center w-[200px] mx-auto'>
                      <a
                        href={`${baseUrl}/v1/contents-data/file-download/${item.modelAnswerFileId}`}
                        className='cursor-pointer text-blue underline'
                      >
                        답안 확인하기
                      </a>
                      <Lucide
                        icon='X'
                        className='w-4 h-4 text-danger cursor-pointer'
                      ></Lucide>
                    </div>
                  ) : (
                    <div className='input-group justify-center w-[200px] mx-auto'>
                      <input
                        type='file'
                        className='dp_none'
                        id={`file-upload-${index}2`}
                        {...register(`list.${index}.modelAnswerFile`)}
                      />
                      <label htmlFor={`file-upload-${index}2`} className='flex items-center'>
                        <input
                          type='text'
                          className='form-control file_up bg-white'
                          placeholder=''
                          value={item?.modelAnswerFile?.length > 0 ? item?.modelAnswerFile[0]?.name : ''}
                          readOnly
                        />
                        <div className='input-group-text whitespace-nowrap file_up_btn'>
                          찾기
                        </div>
                      </label>
                    </div>
                  )}
                </td>
                <td>
                  <select
                    className='form-control'
                    defaultValue={item.scoringStatus}
                    {...register(`list.${index}.scoringStatus`)}
                  >
                    <option value='NO_STATUS'>미채점</option>
                    <option value='PASS'>PASS</option>
                    <option value='FAIL'>FAIL</option>
                  </select>
                </td>
                <td>
                  {getValues('list').length > 0 &&
                    <button
                      className='btn btn-outline-danger bg-white btn-sm whitespace-nowrap'
                      onClick={() => handleDeleteVideo(index, item)}
                    >
                      삭제
                    </button>
                  }
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={9} className='text-center'>
                <button
                  className='btn btn-outline-primary border-dotted'
                  onClick={() => handleAddList()}
                >
                  <Lucide icon='Plus' className='w-4 h-4'></Lucide>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className='flex mt-3 justify-center'>
          <div className='flex gap-2'>
            <Link to={`/mento_mng/view?id=${id}&teacher-id=${teacherId}&name=${name}&teacher-name=${teacherName}`}>
              <button className='btn bg-white w-24'>취소</button>
            </Link>
            <button className='btn btn-sky w-24' onClick={() => handleSave()}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ReviewTestEdit
