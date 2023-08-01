import { useState } from 'react'
import { Lucide } from '@/base-components'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import request from '@/utils/request'

const PriorQuestionEdit = () => {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL;
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
      year: '',
      schoolName: '',
      linkUrl: '',
      fileId: '',
      fileName: '',
    }
    setValue('list', [...getValues('list'), addData])
  }

  // 삭제
  const [delDataList, setDelDataList] = useState([])
  const deleteHandle = (data, index) => {
    if(confirm('삭제하시겠습니까?')) {
      if (data.id > 0) {
        setDelDataList([...delDataList, data])
      }

      reset({ list: getValues('list').filter((i, n) => n !== index) })
    }
  }

  // 리스트 가져오기
  const {
    data: priorQuestion,
    isLoading: isPriorQuestion,
    refetch: refetchPriorQuestion,
  } = useQuery(
    'getPriorQuestion',
    () =>
      request.get(`/admin/content-management/prior-question`, {
        params: {
          page: pageParams.currentPage,
          limit: pageParams.pageRangeDisplayed,
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
      request.put(`/admin/content-management/prior-question`, data),
    {
      onSuccess: () => {
        alert('저장되었습니다.')
        location.reload()
      },
      onError: (e) => {
        console.log(e)
      },
    },
  )

  // 저장버튼
  const handleSave = () => {
    if(getValues('list')?.length === 0) {
      alert('저장할 데이터를 입력하세요.');
      return;
    }

    let temp = true;
    let idList = [], yearList = [], schoolNameList = [], linkUrlList = [], delYnList = [];

    getValues('list').map((item) => {
      if(!temp) return;

      // 제목, 링크는 필수값
      if(!item?.schoolName) {
        alert('제목을 입력하세요.');
        temp = false;
        return temp;
      }

      if(!item?.linkUrl) {
        alert('링크를 입력하세요.');
        temp = false;
        return temp;
      }

      idList.push(item.id ? item.id : 0);
      yearList.push(item.year ? item.year : '');
      schoolNameList.push(item.schoolName ? item.schoolName : '');
      linkUrlList.push(item.linkUrl ? item.linkUrl : '');
      delYnList.push(item.delYN ? item.delYN : 'N');
    })

    if(!temp) return;

    // 삭제할 데이터 리스트 셋팅
    delDataList.forEach((item) => {
      idList.push(item.id)
      yearList.push('')
      schoolNameList.push('')
      linkUrlList.push('')
      delYnList.push('Y')
    })

    const formData = new FormData()
    formData.append('id', idList.length > 1 ? idList.join(',') : idList)
    formData.append('year', yearList.length > 1 ? yearList.join(',') : yearList)
    formData.append('schoolName', schoolNameList.length > 1 ? schoolNameList.join(',') : schoolNameList)
    formData.append('linkUrl', linkUrlList.length > 1 ? linkUrlList.join(',') : linkUrlList)
    formData.append('delYN', delYnList.length > 1 ? delYnList.join(',') : delYnList)

    const newFileDelYN = []

    /* 파일 */
    const null_blob = new Blob(['null'], { type: 'image/png' })
    const null_file = new File([null_blob], 'null.png', {
      type: 'image/png',
    })

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

    delDataList.map((item) => {
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

    saveData(formData);
  }

  return (
    <>
      <div className="intro-y box mt-5">
        {/* <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium flex items-center">영재원</div>
        </div> */}
        <div className="intro-y p-5">
          <table className="table table-hover">
            <thead>
              <tr className="bg-slate-100 text-center">
                <td>번호</td>
                <td>년도</td>
                <td>과학고등학교</td>
                <td>기출문제</td>
                <td>풀이영상</td>
                <td>삭제</td>
              </tr>
            </thead>
            <tbody>
              {watch('list')?.map((item, index) => (
                <tr className="text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control w-28"
                      defaultValue={item.year}
                      key={item.year}
                      {...register(`list[${index}].year`)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.schoolName}
                      key={item.schoolName}
                      {...register(`list[${index}].schoolName`)}
                    />
                  </td>
                  <td>
                    <div className="input-group justify-center">
                      {watch(`list.${index}.fileName`) ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={`${baseUrl}/v1/contents-data/file-download/${watch('fileId')}`}
                            className="cursor-pointer text-blue underline"
                          >
                            {watch(`list.${index}.fileName`)}
                          </a>
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger cursor-pointer"
                            onClick={() => {
                              let list = getValues('list');
                              list[index].fileName = '';

                              setValue('list', list);
                            }}
                          ></Lucide>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            className="dp_none"
                            id={`file-upload-${index}`}
                            {...register(`list.${index}.file`)}
                          />
                          <label htmlFor={`file-upload-${index}`} className="flex items-center">
                            <input
                              type="text"
                              className="form-control file_up bg-white"
                              placeholder=""
                              value={item?.file?.length > 0 ? item?.file[0]?.name : ''}
                              readOnly
                            />
                            <div className="input-group-text whitespace-nowrap file_up_btn">
                              찾기
                            </div>
                          </label>
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.linkUrl}
                      key={item.linkUrl}
                      {...register(`list[${index}].linkUrl`)}
                    />
                  </td>
                  <td>
                    {index >= 0 && (
                      <button
                        className="btn btn-outline-danger bg-white btn-sm whitespace-nowrap"
                        onClick={() => deleteHandle(item.rowId)}
                      >
                        삭제
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} className="text-center">
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
          <div className="flex mt-3 justify-center">
            <div className="flex gap-2">
              <Link to="/prior_question">
                <button className="btn bg-white w-24">취소</button>
              </Link>
              <button className="btn btn-sky w-24" onClick={handleSave}>저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PriorQuestionEdit
