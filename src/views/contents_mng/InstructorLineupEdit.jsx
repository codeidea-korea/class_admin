import { useState } from 'react'
import { Lucide } from '@/base-components'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import request from '@/utils/request'
import { useForm } from 'react-hook-form'

const InstructorLineupEdit = () => {
  const navigate = useNavigate()
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
      subject: '',
      name: '',
      type: '',
      delYn: 'N',
      profileId: '',
      profileName: '',
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
      request.get(`/admin/content-management/instructor-lineup`, {
        params: {
          page: pageParams.currentPage,
          limit: pageParams.pageRangeDisplayed,
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
    (data) =>
      request.put(`/admin/content-management/instructor-lineup`, data),
    {
      onSuccess: () => {
        alert('저장되었습니다.')
        navigate('/prior_question')
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
    let idList = [], subjectList = [], nameList = [], typeList = [], delYnList = []

    getValues('list').map((item) => {
      if (!temp) return

      if (!item?.subject) {
        alert('과목을 입력하세요.')
        temp = false
        return temp
      }

      if (!item?.name) {
        alert('이름을 입력하세요.')
        temp = false
        return temp
      }

      if (!item?.type) {
        alert('강사 유형을 입력하세요.')
        temp = false
        return temp
      }

      idList.push(item.id ? item.id : 0)
      subjectList.push(item.subject ? item.subject : '')
      nameList.push(item.name ? item.name : '')
      typeList.push(item.type ? item.type : '')
      delYnList.push(item.delYN ? item.delYN : 'N')
    })

    if (!temp) return

    // 삭제할 데이터 리스트 셋팅
    delDataList.forEach((item) => {
      idList.push(item.id)
      subjectList.push('')
      nameList.push('')
      typeList.push('')
      delYnList.push('Y')
    })

    const formData = new FormData()
    formData.append('id', idList.length > 1 ? idList.join(',') : idList)
    formData.append('subject', subjectList.length > 1 ? subjectList.join(',') : subjectList)
    formData.append('name', nameList.length > 1 ? nameList.join(',') : nameList)
    formData.append('type', typeList.length > 1 ? typeList.join(',') : typeList)
    formData.append('delYN', delYnList.length > 1 ? delYnList.join(',') : delYnList)

    const newFileDelYN = []

    /* 파일 */
    const null_blob = new Blob(['null'], { type: 'image/png' })
    const null_file = new File([null_blob], 'null.png', {
      type: 'image/png',
    })

    getValues('list').map((item) => {
      if (item.profileId > 0) { // 기존에 등록된 파일이 있으면
        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          newFileDelYN.push('Y')
          formData.append('file', item.file[0])

        } else { // 새로 등록할 파일이 없으면
          if (item.profileName) { // 기존 파일을 유지하는 경우
            formData.append('file', null_file)
            newFileDelYN.push('N')
          } else { // 기존 파일을 삭제하는 경우
            formData.append('file', null_file)
            newFileDelYN.push('Y')
          }
        }

      } else { // 기존에 등록된 파일이 없으면
        newFileDelYN.push('N')

        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          formData.append('file', item.file[0])
        } else {
          formData.append('file', null_file)
        }
      }
    })

    delDataList.map((item) => {
      if (item.profileId > 0) { // 기존에 등록된 파일이 있으면
        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          newFileDelYN.push('Y')
          formData.append('file', item.file[0])

        } else { // 새로 등록할 파일이 없으면
          if (item.profileName) { // 기존 파일을 유지하는 경우
            formData.append('file', null_file)
            newFileDelYN.push('N')
          } else { // 기존 파일을 삭제하는 경우
            formData.append('file', null_file)
            newFileDelYN.push('Y')
          }
        }

      } else { // 기존에 등록된 파일이 없으면
        newFileDelYN.push('N')

        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          formData.append('file', item.file[0])
        } else {
          formData.append('file', null_file)
        }
      }
    })
    formData.append('savedFileDelYN', newFileDelYN.join(','))

    saveData(formData)
  }


  return (
    <>
      <div className='intro-y box mt-5'>
        {/* <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium flex items-center">영재원</div>
        </div> */}
        <div className='intro-y p-5'>
          <table className='table table-hover'>
            <thead>
            <tr className='bg-slate-100 text-center'>
              <td>번호</td>
              <td>과목</td>
              <td>이름</td>
              <td>강사유형</td>
              <td>프로필 이미지</td>
              <td>삭제</td>
            </tr>
            </thead>
            <tbody>
            {watch('list')?.map((item, index) => (
              <tr className='text-center' key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type='text'
                    className='form-control w-28'
                    defaultValue={item.subject}
                    key={item.subject}
                    {...register(`list[${index}].subject`)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.name}
                    key={item.name}
                    {...register(`list[${index}].name`)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.type}
                    key={item.type}
                    {...register(`list[${index}].type`)}
                  />
                </td>
                <td>
                  <div className='input-group justify-center'>
                    {watch(`list.${index}.profileName`) ? (
                      <div className='flex items-center gap-2'>
                        <a
                          href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${watch('profileId')}`}
                          className='cursor-pointer text-blue underline'
                        >
                          {watch(`list.${index}.profileName`)}
                        </a>
                        <Lucide
                          icon='X'
                          className='w-4 h-4 text-danger cursor-pointer'
                          onClick={() => {
                            let list = getValues('list')
                            list[index].profileName = ''

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
                          {...register(`list.${index}.file`)}
                        />
                        <label htmlFor={`file-upload-${index}`} className='flex items-center'>
                          <input
                            type='text'
                            className='form-control file_up bg-white'
                            placeholder=''
                            value={item?.file?.length > 0 ? item?.file[0]?.name : ''}
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
                  {index >= 0 && (
                    <button
                      className='btn btn-outline-danger bg-white btn-sm whitespace-nowrap'
                      onClick={() => deleteHandle(item.id, index)}
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
              <Link to='/prior_question'>
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
export default InstructorLineupEdit
