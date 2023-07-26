import { Lucide } from '@/base-components'
import { useLocation, Link } from 'react-router-dom'
import React, { useState, useReducer } from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import request from '@/utils/request'

const ShOnlineMngEdit = () => {
  const user = useRecoilValue(userState)
  const userLocation = useLocation()
  const queryParams = new URLSearchParams(userLocation.search)
  const curTab = queryParams.get('curTab')
  // const [idx, setIdx] = useState(1)
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
    () => request.get(`/admin/content-management/scienceOnlineClass?subjectType=${curTab}&page=1&limit=9999`, {
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
    (data) => request.put(`/admin/content-management/scienceOnlineClass`, data),
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

  // 삭제
  const deleteHandle = (itemParam, index) => {
    if (itemParam.row_id && itemParam.row_id > 0) {
      setDelDataList([...delDataList, itemParam])
    }
    reset({
      list: getValues('list').filter((_, i) => i !== index),
    })
  }

  // 저장하기 버튼 클릭
  const handleSave = async () => {
    let rowIdList = getValues('list').map((item) => (item.row_id ? item.row_id : 0))
    let titleList = getValues('list').map((item) => (item.title ? item.title : ''))
    let linkUrlList = getValues('list').map((item) => (item.link_url ? item.link_url : ''))
    let delYnList = getValues('list').map((item) => (item.delYN ? item.delYN : 'N'))

    console.log(rowIdList)

    delDataList.forEach((item) => {
      rowIdList.push(item.row_id)
      titleList.push(item.title)
      linkUrlList.push(item.link_url)
      delYnList.push('Y')
    });

    const formData = new FormData()
    formData.append('row_id', rowIdList.join(','));
    formData.append('title', titleList.join(','));
    formData.append('link_url', linkUrlList.join(','));
    formData.append('delYN', delYnList.join(','));

    formData.append('totalCount', Number(getValues('list').length) + Number(delDataList.length))
    formData.append('subjectType', curTab)

    saveData(formData)
  }

  // + 버튼 클릭
  const handleAddList = () => {
    const newSchedule = {
      row_id: 0,
      title: null,
      link_url: null,
      delYN: 'N',
    }
    setValue('list', [
      ...getValues('list'),
      newSchedule,
    ])
  }

  // const saveData = () => {
  //   let rowIdList = [];
  //   let titleList = []
  //   let linkUrlList = []
  //   let delYnList = []
  //
  //   delDataList.forEach((item) => {
  //     rowIdList.push(item.row_id)
  //     titleList.push(item.title)
  //     linkUrlList.push(item.link_url)
  //     delYnList.push('Y')
  //   })
  //
  //   data.forEach((item) => {
  //     if (item.hasOwnProperty('row_id')) {
  //       rowIdList.push(item.row_id)
  //       titleList.push(item.title)
  //       linkUrlList.push(item.link_url)
  //       delYnList.push('N')
  //     } else {
  //       rowIdList.push(0)
  //       titleList.push(item.title)
  //       linkUrlList.push(item.link_url)
  //       delYnList.push('N')
  //     }
  //   })
  //
  //   // api.put('/admin/content-management/scienceOnlineClass', {
  //   //     row_id: rowIdList,
  //   //     title: titleList,
  //   //     link_url: linkUrlList,
  //   //     delYN: delYnList,
  //   //     totalCount: Number(delDataList.length) + Number(data.length),
  //   //     subjectType: curTab,
  //   //   },
  //   //   { headers: { Authorization: `Bearer ${user.token}` } })
  //   //   .then((res) => {
  //   //     if (res.status === 200) {
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err)
  //   //   })
  // }

  return (<>
    <div className='intro-y box mt-5'>
      <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
        <div className='text-lg font-medium flex items-center'>
          과학고 영상 학습 관리
          <Lucide icon='ChevronRight' className='w-6 h-6 mx-3'></Lucide>
          {curTab === 'MATH' ? '수학' : '과학'}
        </div>
      </div>
      <div className='intro-y p-5'>
        <table className='table table-hover'>
          <thead>
          <tr className='bg-slate-100 text-center'>
            <td>번호</td>
            <td>제목</td>
            <td>링크</td>
            <td>삭제</td>
          </tr>
          </thead>
          <tbody>
          {watch('list').map((item, index) => (
            <tr className='text-center' key={`list-${index}`}>
              <td>{index + 1}</td>
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
                  defaultValue={item.link_url}
                  {...register(`list[${index}].link_url`)}
                />
              </td>
              <td>
                {index >= 0 &&
                  <button
                    className='btn btn-outline-danger bg-white btn-sm whitespace-nowrap'
                    onClick={() => deleteHandle(item, index)}
                  >
                    삭제
                  </button>
                }
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} className='text-center'>
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
            <Link to='/sh_online_mng'>
              <button className='btn bg-white w-24'>취소</button>
            </Link>
            <button className='btn btn-sky w-24' onClick={() => handleSave()}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default ShOnlineMngEdit