import { useEffect, useReducer, useState } from 'react'
import { Lucide } from '@/base-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import request from '@/utils/request'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'

const ReadOnlineEdit = () => {
  const navigate = useNavigate()
  const user = useRecoilValue(userState)
  const userLocation = useLocation()
  const queryParams = new URLSearchParams(userLocation.search)
  const curTab = queryParams.get('curTab')
  const [delDataList, setDelDataList] = useState([])

  const { getValues, setValue, watch, reset, register } = useForm({
    defaultValues: {
      list: [],
    },
  })
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      list: [],
    },
  )

  const {
    data: basicClass,
    isLoading: isBasicClassm,
    refetch: refetchBasicClass,
  } = useQuery(
    'getBasicClass',
    () => request.get(`/admin/content-management/study-material?divideType=${curTab}&page=1&limit=9999`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }),
    {
      onSuccess: (data) => {
        // setIdx(Number(idx) + res.data.content.length)
        reset({ list: data.content })
      },
    },
  )

  // 저장
  const { mutate: saveData } = useMutation(
    (data) => request.put(`/admin/content-management/study-material`, data),
    {
      onSuccess: () => {
        refetchBasicClass()
        alert('저장되었습니다.')
        navigate('/read_online')
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  // 삭제 버튼 클릭
  const handleDeleteVideo = (idx, item) => {
    if (confirm('삭제하시겠습니까?')) {
      let origin = getValues('list')
      origin.splice(idx, 1)
      setValue('list', origin)
      setDelDataList([...delDataList, item])
    }
  }

  // 저장하기 버튼 클릭
  const handleSave = async () => {
    if(getValues('list')?.length === 0) {
      alert('저장할 데이터를 입력하세요.');
      return;
    }

    /* 파일 */
    const null_blob = new Blob(['null'], { type: 'image/png' })
    const null_file = new File([null_blob], 'null.png', {
      type: 'image/png',
    })

    let temp = true;
    let idList = [], subjectNameList = [], titleList = [], videoList = [], delYnList = [];

    getValues('list').map((item) => {
      if(!temp) return;

      // 제목, 링크는 필수값
      if(!item?.title) {
        alert('제목을 입력하세요.');
        temp = false;
        return temp;
      }
      if(!item?.video) {
        alert('링크를 입력하세요.');
        temp = false;
        return temp;
      }

      idList.push(item.id ? item.id : 0);
      subjectNameList.push(item.subjectName ? item.subjectName : '');
      titleList.push(item.title ? item.title : '');
      videoList.push(item.video ? item.video : '');
      delYnList.push(item.delYN ? item.delYN : 'N');
    })

    if(!temp) return;

    const formData = new FormData();

    delDataList.forEach((item) => {
      idList.push(item.id)
      subjectNameList.push('')
      titleList.push('')
      videoList.push('')
      delYnList.push('Y')
    })

    formData.append('id', idList.join(','))
    formData.append('subjectName', subjectNameList.join(','))
    formData.append('title', titleList.join(','))
    formData.append('video', videoList.join(','))
    formData.append('delYN', delYnList.join(','))

    formData.append('totalCount', Number(getValues('list').length) + Number(delDataList.length))
    formData.append('divideType', curTab)

    const newFileDelYN = []

    getValues('list').map((item) => {
      if (item.fileId > 0) { // 기존에 등록된 파일이 있으면
        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          newFileDelYN.push('Y')
          formData.append('data', item.file[0])

        } else { // 새로 등록할 파일이 없으면
          if (item.fileName) { // 기존 파일을 유지하는 경우
            formData.append('data', null_file)
            newFileDelYN.push('N')
          } else { // 기존 파일을 삭제하는 경우
            formData.append('data', null_file)
            newFileDelYN.push('Y')
          }
        }

      } else { // 기존에 등록된 파일이 없으면
        newFileDelYN.push('N')

        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          formData.append('data', item.file[0])
        } else {
          formData.append('data', null_file)
        }
      }
    })

    delDataList.map((item) => {
      if (item.fileId > 0) { // 기존에 등록된 파일이 있으면
        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          newFileDelYN.push('Y')
          formData.append('data', item.file[0])

        } else { // 새로 등록할 파일이 없으면
          if (item.fileName) { // 기존 파일을 유지하는 경우
            formData.append('data', null_file)
            newFileDelYN.push('N')
          } else { // 기존 파일을 삭제하는 경우
            formData.append('data', null_file)
            newFileDelYN.push('Y')
          }
        }

      } else { // 기존에 등록된 파일이 없으면
        newFileDelYN.push('N')

        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          formData.append('data', item.file[0])
        } else {
          formData.append('data', null_file)
        }
      }
    })
    formData.append('savedFileDelYN', newFileDelYN.join(','))

    saveData(formData)
  }

  // + 버튼 클릭
  const handleAddList = () => {
    let origin = getValues('list')
    let copy = {}

    for (let key in origin[0]) {
      copy[key] = origin[0][key]
    }

    copy['id'] = 0
    copy['subjectName'] = ''
    copy['title'] = ''
    copy['video'] = ''
    copy['delYN'] = ''
    copy['file'] = new DataTransfer().files
    copy['fileId'] = 0
    copy['fileName'] = ''

    origin.push(copy)
    setValue('list', origin)
  }

  return (
    <>
      <div className='intro-y box mt-5'>
        <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
          <div className='text-lg font-medium flex items-center'>
            {sessionStorage.getItem('readCurTab')=="SCIENCE" ? "과학고":"영재원"}
          </div>
        </div>
        <div className='intro-y p-5'>
          <table className='table table-hover'>
            <thead>
            <tr className='bg-slate-100 text-center'>
              <td>번호</td>
              <td>관련과목</td>
              <td>제목</td>
              <td>관련 추천 영상</td>
              <td>읽기자료</td>
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
                    defaultValue={item.subjectName}
                    {...register(`list[${index}].subjectName`)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.title}
                    {...register(`list[${index}].title`)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.video}
                    {...register(`list[${index}].video`)}
                  />
                </td>
                <td>
                  <div className='input-group justify-center'>
                    {watch(`list.${index}.fileName`) ? (
                      <div className='flex items-center gap-2'>
                        <a
                          href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${watch('fileId')}`}
                          className='cursor-pointer text-blue underline'
                        >
                          {watch(`list.${index}.fileName`)}
                        </a>
                        <Lucide
                          icon='X'
                          className='w-4 h-4 text-danger cursor-pointer'
                          onClick={() => {
                            let request = getValues('list')
                            request[index].fileName = ''
                            setValue('list', request)
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
                  {getValues('list')?.length > 1 &&
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
              <Link to='/read_online'>
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
export default ReadOnlineEdit
