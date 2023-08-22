import { useState } from 'react'
import { Lucide } from '@/base-components'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import request from '@/utils/request'

const CompetQuestionEdit = () => {
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL
  const params = new URLSearchParams(location.search)
  const subId = params.get('sub-id')

  const [pageParams, setPageParams] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    pageRangeDisplayed: 9999,
  })

  const { getValues, setValue, watch, reset, register } = useForm({
    defaultValues: {
      list: [],
    },
  })

  // + 버튼 클릭
  const handleAddList = () => {
    const addData = {
      id: 0,
      content: '',
      linkUrl: '',
      questionFileId: '',
      questionFileName: '',
      analyzeFileId: '',
      analyzeFileName: '',
    }
    setValue('list', [...getValues('list'), addData])
  }

  // 삭제
  const [delDataList, setDelDataList] = useState([])
  const deleteHandle = (data, index) => {
    if (confirm('삭제하시겠습니까?')) {
      if (data.id > 0) {
        setDelDataList([...delDataList, data])
      }
      reset({ list: getValues('list').filter((i, n) => n !== index) })
    }
  }

  useQuery(
    'getPriorQuestion',
    () =>
      request.get(`/admin/content-management/compet-question`, {
        params: {
          page: pageParams.currentPage,
          limit: pageParams.pageRangeDisplayed,
          competType: subId,
        },
      }),
    {
      onSuccess: (data) => {
        reset({ list: data.content })
      },
    },
  )

  // 저장
  const { mutate: saveData } = useMutation(
    (data) =>
      request.put(`/admin/content-management/compet-question`, data),
    {
      onSuccess: () => {
        alert('저장되었습니다.')
        navigate('/compet_question')
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  // 저장버튼
  const handleSave = () => {
    if (getValues('list')?.length === 0) {
      alert('저장할 데이터를 입력하세요.')
      return
    }

    let temp = true
    let idList = [], contentList = [], linkUrlList = [], delYnList = []

    getValues('list').map((item) => {
      if (!temp) return

      if (!item?.content) {
        alert('내용을 입력하세요.')
        temp = false
        return temp
      }
      idList.push(item.id ? item.id : 0)
      contentList.push(item.content ? item.content : '')
      linkUrlList.push(item.linkUrl ? item.linkUrl : '')
      delYnList.push(item.delYN ? item.delYN : 'N')
    })

    if (!temp) return

    // 삭제할 데이터 리스트 셋팅
    delDataList.forEach((item) => {
      idList.push(item.id)
      contentList.push('')
      linkUrlList.push('')
      delYnList.push('Y')
    })

    const formData = new FormData()
    formData.append('id', idList.length > 1 ? idList.join(',') : idList)
    formData.append('content', contentList.length > 1 ? contentList.join(',') : contentList)
    formData.append('linkUrl', linkUrlList.length > 1 ? linkUrlList.join(',') : linkUrlList)
    formData.append('delYN', delYnList.length > 1 ? delYnList.join(',') : delYnList)

    const newQuestionFileDelYN = []
    const newAnalyzeFileDelYN = []

    /* 파일 */
    const null_blob = new Blob(['null'], { type: 'image/png' })
    const null_file = new File([null_blob], 'null.png', {
      type: 'image/png',
    })

    getValues('list').map((item) => {
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
        if (item.questionFile && item.questionFile.length) { // 새로 등록할 파일이 있으면
          formData.append('questionFile', item.questionFile[0])
        } else {
          formData.append('questionFile', null_file)
        }
      }

      if (item.analyzeFileId > 0) { // 기존에 등록된 파일이 있으면
        if (item.analyzeFile && item.analyzeFile.length) { // 새로 등록할 파일이 있으면
          newAnalyzeFileDelYN.push('Y')
          formData.append('analyzeFile', item.analyzeFile[0])
        } else { // 새로 등록할 파일이 없으면
          if (item.analyzeFileName) { // 기존 파일을 유지하는 경우
            formData.append('analyzeFile', null_file)
            newAnalyzeFileDelYN.push('N')
          } else { // 기존 파일을 삭제하는 경우
            formData.append('analyzeFile', null_file)
            newAnalyzeFileDelYN.push('Y')
          }
        }
      } else { // 기존에 등록된 파일이 없으면
        newAnalyzeFileDelYN.push('N')
        if (item.analyzeFile && item.analyzeFile.length) { // 새로 등록할 파일이 있으면
          formData.append('analyzeFile', item.analyzeFile[0])
        } else {
          formData.append('analyzeFile', null_file)
        }
      }
    })
    formData.append('savedQuestionFileDelYN', newQuestionFileDelYN.join(','))
    formData.append('savedAnalyzeFileDelYN', newAnalyzeFileDelYN.join(','))

    formData.append('competType', subId)

    saveData(formData)
  }

  return (
    <>
      <div className='intro-y box mt-5'>
        <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
          <div className='text-lg font-medium flex items-center'>{sessionStorage.getItem('competQuestionCurTab')}</div>
        </div>
        <div className='intro-y p-5'>
          <table className='table table-hover'>
            <thead>
            <tr className='bg-slate-100 text-center'>
              <td>번호</td>
              <td>내용</td>
              <td>기출문제</td>
              <td>분석</td>
              <td>풀이영상</td>
              <td>삭제</td>
            </tr>
            </thead>
            <tbody>
            {watch('list')?.map((item, index) => (
              <tr className='text-center' key={index}>
                <td>{watch('list').length - index}</td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.content}
                    key={item.content}
                    {...register(`list[${index}].content`)}
                  />
                </td>
                <td>
                  <div className='input-group justify-center'>
                    {watch(`list.${index}.questionFileName`) ? (
                      <div className='flex items-center gap-2'>
                        <a
                          href={`${baseUrl}/v1/contents-data/file-download/${watch('questionFileId')}`}
                          className='cursor-pointer text-blue underline'
                        >
                          {watch(`list.${index}.questionFileName`)}
                        </a>
                        <Lucide
                          icon='X'
                          className='w-4 h-4 text-danger cursor-pointer'
                          onClick={() => {
                            let list = getValues('list')
                            list[index].questionFileName = ''
                            setValue('list', list)
                          }}
                        ></Lucide>
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </td>
                <td>
                  <div className='input-group justify-center'>
                    {watch(`list.${index}.analyzeFileName`) ? (
                      <div className='flex items-center gap-2'>
                        <a
                          href={`${baseUrl}/v1/contents-data/file-download/${watch('analyzeFileId')}`}
                          className='cursor-pointer text-blue underline'
                        >
                          {watch(`list.${index}.analyzeFileName`)}
                        </a>
                        <Lucide
                          icon='X'
                          className='w-4 h-4 text-danger cursor-pointer'
                          onClick={() => {
                            let list = getValues('list')
                            list[index].analyzeFileName = ''
                            setValue('list', list)
                          }}
                        ></Lucide>
                      </div>
                    ) : (
                      <>
                        <input
                          type='file'
                          className='dp_none'
                          id={`file-upload-${index}2`}
                          {...register(`list.${index}.analyzeFile`)}
                        />
                        <label htmlFor={`file-upload-${index}2`} className='flex items-center'>
                          <input
                            type='text'
                            className='form-control file_up bg-white'
                            placeholder=''
                            value={item?.analyzeFile?.length > 0 ? item?.analyzeFile[0]?.name : ''}
                            readOnly
                          />
                          <div className='input-group-text whitespace-nowrap file_up_btn'>
                            찾기
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.linkUrl}
                    key={item.linkUrl}
                    {...register(`list[${index}].linkUrl`)}
                  />
                </td>
                <td>
                  {getValues('list')?.length > 0 && (
                    <button
                      className='btn btn-outline-danger bg-white btn-sm whitespace-nowrap'
                      onClick={() => deleteHandle(item)}
                    >
                      삭제
                    </button>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={6} className='text-center'>
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
          <div className='flex mt-3 justify-center'>
            <div className='flex gap-2'>
              <Link to='/compet_question'>
                <button className='btn bg-white w-24'>취소</button>
              </Link>
              <button className='btn btn-sky w-24' onClick={handleSave}>저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CompetQuestionEdit
