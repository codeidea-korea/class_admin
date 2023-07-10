import { Lucide } from '@/base-components'
import { Link } from 'react-router-dom'
import React, { useState, useReducer } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'

function OnlineBasicClassForm() {
  let removeIndex = 0;
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
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

  //파일 업로드 시 플레이스 홀더 변경
  const [fileName, setFileName] = useState('')

  const handleChange = (event) => {
    setFileName(event.target.files[0].name)
  }

  const {
    data: basicClass,
    isLoading: isBasicClassm,
    refetch: refetchBasicClass,
  } = useQuery(
    'getBasicClass',
    () => request.get(`/admin/content-management/basic-class/${id}`),
    {
      onSuccess: (data) => {
        reset({ list: data })
      },
    },
  )

  // 저장
  const { mutate: saveBasicClass } = useMutation(
    (data) => request.put(`/admin/content-management/basic-class/${id}`, data),
    {
      onSuccess: () => {
        alert('저장되었습니다.');
        location.reload()
      },
      onError: () => {
        alert('오류가 발생하였습니다.');
      }
    },
  )

  // 삭제
  const { mutate: removeBasicClass } = useMutation(
    (pk,idx) => request.delete(`/admin/content-management/basic-class/${pk}`),
    {
      onSuccess: () => {
        alert('삭제되었습니다.');

        reset({
          list: getValues('list').filter((_, i) => i !== removeIndex),
        });
      },
      onError: () => {
        alert('오류가 발생하였습니다.');
      }
    },
  )

  // 저장하기 버튼 클릭
  const handleSave = async () => {
    const formData = new FormData()
    formData.append(
      'row_id',
      getValues('list')
      .map((item) => (item.row_id ? item.row_id : 0))
      .join(','),
    )
    formData.append(
      'gubun',
      getValues('list')
      .map((item) => (item.gubun ? item.gubun : 'null'))
      .join(','),
    )
    formData.append(
      'unit',
      getValues('list')
      .map((item) => (item.unit ? item.unit : 'null'))
      .join(','),
    )
    formData.append(
      'content',
      getValues('list')
      .map((item) => (item.content ? item.content : 'null'))
      .join(','),
    )
    formData.append(
      'link_url',
      getValues('list')
      .map((item) => (item.link_url ? item.link_url : 'null'))
      .join(','),
    )

    const null_blob = new Blob(['null'], {type: 'image/png'})
    const null_file = new File([null_blob], 'null.png', {
      type: 'image/png',
    })
    const newFileDelYN = []

    getValues('list').map((item) => {
      if (item.file && item.file.length) {
        formData.append('file', item.file[0])

        if (item.fileId) {
          newFileDelYN.push('Y')
        } else {
          newFileDelYN.push('N')
        }

      } else {
        formData.append('file', null_file)
        newFileDelYN.push('N')
      }
    })

    formData.append('savedFileDelYN', newFileDelYN.join(','))
    saveBasicClass(formData)
  }

  // + 버튼 클릭
  const handleAddList = () => {
    const newSchedule = {
      row_id: 0,
      gubun: null,
      unit: null,
      content: null,
      link_url: null,
      file: [],
      fileId: null,
      savedFileDelYN: 'N',
    }
    setValue('list', [
      ...getValues('list'),
      newSchedule
    ])
  }

  // 삭제 버튼 클릭
  const handleRemove = (pk,idx) => {
    if(pk && pk > 0) {
      // 기존 데이터 삭제
      if(confirm('삭제하시겠습니까?')) {
        removeIndex = idx;
        removeBasicClass(pk);
      }
    }else {
      reset({
        list: getValues('list').filter((_, i) => i !== idx),
      });
    }
  }

  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium flex items-center">
            영재학교
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            {searchParams.get('subject')}
          </div>
        </div>
        <div className="intro-y p-5">
          <table className="table table-hover">
            <thead>
              <tr className="bg-slate-100 text-center">
                <td>구분</td>
                <td>단원</td>
                <td>학습 내용</td>
                <td>영상학습URL</td>
                <td>학습자료</td>
                <td>삭제</td>
              </tr>
            </thead>
            <tbody>
              {watch('list').map((item, index) => (
                <tr className="text-center" key={`list-${index}`}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.gubun}
                      {...register(`list[${index}].gubun`)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.unit}
                      {...register(`list[${index}].unit`)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.content}
                      {...register(`list[${index}].content`)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.link_url}
                      {...register(`list[${index}].link_url`)}
                    />
                  </td>
                  <td>
                    {item.fileName ? (
                      <a
                        href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item.fileId}`}
                        className="cursor-pointer text-blue underline"
                      >
                        {item.fileName}
                      </a>
                    ) : (
                      <input
                        type="file"
                        className="form-control"
                        {...register(`list[${index}].file`)}
                      />
                    )}
                  </td>
                  <td>
                    {index > 0 &&
                      <button
                        className="btn btn-outline-danger bg-white btn-sm whitespace-nowrap"
                        onClick={() => { handleRemove(item.row_id,index); }}
                      >
                        삭제
                      </button>
                    }
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
          <div className="flex mt-3 justify-center">
            <div className="flex gap-2">
              <Link to="/online_basic_class">
                <button className="btn bg-white w-24">취소</button>
              </Link>
              <button className="btn btn-sky w-24" onClick={() => handleSave()}>
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
