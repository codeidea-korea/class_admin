import { Lucide } from '@/base-components'
import { Link } from 'react-router-dom'
import React, { useState, useReducer } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import request from '@/utils/request'
import Loading from '@/components/loading'

const GeOnlineMngEdit = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const { getValues, setValue, watch, reset, register } = useForm({
    defaultValues: {
      list: [],
    },
  })

  // + 버튼 클릭
  const handleAddList = () => {
    const addData = {
      row_id: 0,
      subjectUnitId: Number(id),
      title: '',
      link_url: '',
      delYn: 'N',
    }
    setValue('list', [...getValues('list'), addData])
  }

  // 삭제
  const [delDataList, setDelDataList] = useState([])
  const deleteHandle = (data, index) => {
    if (data.row_id > 0) {
      setDelDataList([...delDataList, data])
    }

    reset({ list: getValues('list').filter((i, n) => n !== index) })
  }

  // 리스트 가져오기
  const {
    data: basicClass,
    isLoading: isBasicClassm,
    refetch: refetchBasicClass,
  } = useQuery(
    ['getBasicClass', id],
    () =>
      request.get(`/admin/content-management/geniusOnlineClass`, {
        params: {
          subjectUnitId: id,
          page: 1,
          limit: 9999,
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
      request.put(`/admin/content-management/geniusOnlineClass`, data),
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
    let rowIdList = getValues('list').map((item) =>
      item.row_id ? item.row_id : 0,
    )
    let subjectUnitId = getValues('list').map((item) =>
      item.subjectUnitId ? item.subjectUnitId : id,
    )
    let titleList = getValues('list').map((item) =>
      item.title ? item.title : '',
    )
    let linkUrlList = getValues('list').map((item) =>
      item.link_url ? item.link_url : '',
    )
    let delYnList = getValues('list').map((item) =>
      item.delYN ? item.delYN : 'N',
    )

    delDataList.forEach((item) => {
      rowIdList.push(item.row_id)
      subjectUnitId.push(item.subjectUnitId)
      titleList.push(item.title)
      linkUrlList.push(item.link_url)
      delYnList.push('Y')
    })

    // console.log(rowIdList)

    const formData = new FormData()
    formData.append('row_id', rowIdList.join(','))
    formData.append('subjectUnitId', subjectUnitId.join(','))
    formData.append('title', titleList.join(','))
    formData.append('link_url', linkUrlList.join(','))
    formData.append('delYN', delYnList.join(','))

    formData.append(
      'totalCount',
      Number(getValues('list').length) + Number(delDataList.length),
    )
    formData.append('subjectType', searchParams.get('curTab'))

    saveData(formData);
  }

  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium flex items-center">
            영재원 영상 학습 관리
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            {searchParams.get('student') == 'MIDDLE' ? '중학생' : '초등학생'}
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            {searchParams.get('subject')}
          </div>
        </div>
        <div className="intro-y p-5">
          <table className="table table-hover">
            <thead>
              <tr className="bg-slate-100 text-center">
                <td>번호</td>
                <td>과목</td>
                <td>제목</td>
                <td>링크</td>
                <td>삭제</td>
              </tr>
            </thead>
            <tbody>
              {watch('list')?.map((item, index) => (
                <tr className="text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{searchParams.get('subject')}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.title}
                      key={item.title}
                      {...register(`list[${index}].title`)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.link_url}
                      key={item.link_url}
                      {...register(`list[${index}].link_url`)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger bg-white btn-sm whitespace-nowrap"
                      onClick={() => deleteHandle(item, index)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-center">
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
              <Link to="/ge_online_mng">
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
export default GeOnlineMngEdit
