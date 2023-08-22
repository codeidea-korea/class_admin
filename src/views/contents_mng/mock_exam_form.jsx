import { Litepicker, Lucide } from '@/base-components'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import request from '@/utils/request'

function OnlineBasicClassForm() {
  const { id } = useParams()
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const [searchParams, setSearchParams] = useSearchParams()
  const { getValues, setValue, watch, reset, register } = useForm({
    defaultValues: {
      list: [],
    },
  })

  const {
    data: basicClass,
    isLoading: isBasicClassm,
    refetch: refetchBasicClass,
  } = useQuery(
    'getBasicClass',
    () => request.get(`/admin/content-management/mock-exam/${id}`),
    {
      onSuccess: (data) => {
        reset({ list: data })
      },
    },
  )

  const { mutate: saveBasicClass } = useMutation(
    (data) => request.put(`/admin/content-management/mock-exam/${id}`, data),
    {
      onSuccess: () => {
        refetchBasicClass()
        alert('저장되었습니다.')
        navigate(`/mock_exam?tab=${sessionStorage.getItem('basicCurTab') == '영재학교' ? 'gsh' : 'geh'}&subject=${params.get('gubunId')}`)
      },
    },
  )

  const handleSave = () => {
    const formData = new FormData()
    formData.append(
      'row_id',
      getValues('list')
        .map((item) => (item.row_id ? item.row_id : 0))
        .join(','),
    )
    formData.append(
      'order_number',
      getValues('list')
        .map((item) => (item.order_number ? item.order_number : 0))
        .join(','),
    )
    formData.append(
      'subject',
      getValues('list')
        .map((item) => (item.subject ? item.subject : ''))
        .join(','),
    )
    formData.append(
      'exam_date',
      getValues('list')
        .map((item) => (item.exam_date ? item.exam_date : ''))
        .join(','),
    )
    formData.append(
      'exam_type',
      getValues('list')
        .map((item) => (item.exam_type ? item.exam_type : ''))
        .join(','),
    )
    formData.append(
      'link_url',
      getValues('list')
        .map((item) => (item.link_url ? item.link_url : ''))
        .join(','),
    )

    /* 파일 */
    const null_blob = new Blob(['null'], { type: 'image/png' })
    const null_file = new File([null_blob], 'null.png', {
      type: 'image/png',
    })

    const newFileDelYN = []

    getValues('list').map((item) => {
      if (item.fileId > 0) { // 기존에 등록된 파일이 있으면
        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          newFileDelYN.push('Y')
          formData.append('file', item.file[0])

        } else { // 새로 등록할 파일이 없으면
          if (item.fileName) { // 기존 파일을 유지하는 경우
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

    saveBasicClass(formData)
  }

  // + 버튼 클릭
  const handleAddList = () => {
    /*
    * 기존에 하던 방식대로 setValue 하면 파일 객체들이 복사가 안되고 사라짐
    * 대충 원인은 알겠으나 해결 방법을 모르겠음
    * 그냥 첫번째 객체 복사하고 시켜서 추가하는 방법으로 대체했음..
    */

    let origin = getValues('list')
    let copy = {}

    for (let key in origin[0]) {
      copy[key] = origin[0][key]
    }

    copy['row_id'] = 0
    copy['order_number'] = 0
    copy['subject'] = ''
    copy['exam_date'] = getToday()
    copy['exam_type'] = ''
    copy['link_url'] = ''
    copy['file'] = new DataTransfer().files
    copy['fileId'] = 0
    copy['fileName'] = ''

    origin.push(copy)
    setValue('list', origin)
  }

  // 실제 데이터 삭제
  const removeSchedule = (idx, sId) => {
    api.delete(`/admin/content-management/class-video-schedule/${sId}`,
      { headers: { Authorization: `Bearer ${user.token}` } },
    ).then((res) => {
      if (res.status === 200) {
        let origin = getValues('list')
        origin.splice(idx, 1)
        setValue('list', origin)

        alert('삭제되었습니다.')
      }
    }).catch((err) => {
      alert('오류가 발생하였습니다.')
    })
  }

  // 삭제 버튼 클릭
  const handleDeleteVideo = (idx, sId) => {
    if (confirm('삭제하시겠습니까?')) {
      let origin = getValues('list')
      origin.splice(idx, 1)
      setValue('list', origin)

      /*if(sId > 0) {
        // sId가 있는경우 === 기존에 등록된 데이터를 삭제하는 경우
        removeSchedule(idx, sId);

      }else {
        // 기존에 등록된 데이터가 아닌 추가된 라인을 제거하는 경우
        let origin = getValues('list');
        origin.splice(idx,1);
        setValue('list', origin);
      }*/
    }
  }

  // 오늘날짜 yyyy-mm-dd 구하기
  function getToday() {
    let date = new Date()
    let year = date.getFullYear()
    let month = ('0' + (1 + date.getMonth())).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    return year + '-' + month + '-' + day
  }

  return (
    <>
      <div className='intro-y box mt-5'>
        <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
          <div className='text-lg font-medium flex items-center'>
            {sessionStorage.getItem('basicCurTab')}
            <Lucide icon='ChevronRight' className='w-6 h-6 mx-3'></Lucide>
            {searchParams.get('gubun')}
          </div>
        </div>
        <div className='intro-y p-5'>
          <table className='table table-hover'>
            <thead>
            <tr className='bg-slate-100 text-center'>
              <td>회차</td>
              <td>과목</td>
              <td>시험일자</td>
              <td>모의고사유형</td>
              <td>풀이영상</td>
              <td>학습자료</td>
              <td>삭제</td>
            </tr>
            </thead>
            <tbody>
            {watch('list')?.map((item, index) => (
              // {getValues('list').map((item, index) => (
              <tr className='text-center' key={`list-${index}`}>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.order_number}
                    {...register(`list[${index}].order_number`)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.subject}
                    {...register(`list[${index}].subject`)}
                  />
                </td>
                <td>
                  <Litepicker
                    value={item.exam_date}
                    className='form-control'
                    onChange={(value) => {
                      const newList = [
                        ...getValues('list'),
                      ]
                      newList[index].exam_date = value
                      setValue('list', newList)
                      /*const newList = getValues('list')
                      newList[index].exam_date = value
                      reset({
                        list: newList,
                      })*/
                    }}
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
                    }}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.exam_type}
                    {...register(`list[${index}].exam_type`)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.link_url}
                    {...register(`list[${index}].link_url`)}
                  />
                </td>
                <td>
                  <div className='input-group'>
                    {watch(`list.${index}.fileName`) ? (
                      <div className='flex items-center gap-2'>
                        <a
                          href={`${baseUrl}/v1/contents-data/file-download/${watch(`list.${index}.fileId`)}`}
                          className='cursor-pointer text-blue underline'
                        >
                          {watch(`list.${index}.fileName`)}
                        </a>
                        <Lucide
                          icon='X'
                          className='w-4 h-4 text-danger cursor-pointer'
                          onClick={() => {
                            let newList = getValues('list')
                            newList[index].fileName = ''

                            setValue('list', newList)
                          }}
                        ></Lucide>
                      </div>
                    ) : (
                      <>
                        <input
                          type='file'
                          className='dp_none'
                          id={`file-upload-${index}`}
                          {...register(
                            `list.${index}.file`,
                          )}
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
                  {/*{item.fileName ? (
                      <div className="flex items-center">
                        <a
                          href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item.fileId}`}
                          className="cursor-pointer text-blue underline"
                        >
                          {item.fileName}
                        </a>
                        <Lucide icon="X" className="w-4 h-4 color-red"></Lucide>
                      </div>
                    ) : (
                      <input
                        type="file"
                        className="form-control"
                        {...register(`list[${index}].file`)}
                      />
                    )}*/}
                </td>
                <td>
                  {getValues('list')?.length > 0 && (
                    <button
                      className='btn btn-outline-danger bg-white btn-sm whitespace-nowrap'
                      onClick={() => handleDeleteVideo(index, item?.row_id)}
                      /*onClick={() => {
                        reset({
                          list: getValues('list').filter((_, i) => i !== index),
                        })
                      }}*/
                    >
                      삭제
                    </button>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={8} className='text-center'>
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
              <Link
                to={`/mock_exam?tab=${sessionStorage.getItem('basicCurTab') == '영재학교' ? 'gsh' : 'geh'}&subject=${params.get('gubunId')}`}>
                <button className='btn bg-white w-24'>취소</button>
              </Link>
              <button className='btn btn-sky w-24' onClick={() => handleSave()}>
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OnlineBasicClassForm
