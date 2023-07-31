import { Lucide } from '@/base-components'
import { Link, useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import request from '@/utils/request'

const ShOnlineMngEdit = () => {
  const userLocation = useLocation()
  const queryParams = new URLSearchParams(userLocation.search)
  const curTab = queryParams.get('curTab')
  const subName = queryParams.get('subject')
  const subId = queryParams.get('id')
  const [delDataList, setDelDataList] = useState([])
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
    () => request.get(`/admin/content-management/scienceOnlineClass`, {
      params: {
        subjectUnitId: subId,
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
    if(confirm('삭제하시겠습니까?')) {
      if (itemParam.row_id && itemParam.row_id > 0) {
        setDelDataList([...delDataList, itemParam])
      }
      reset({
        list: getValues('list').filter((_, i) => i !== index),
      })
    }
  }

  // 저장하기 버튼 클릭
  const handleSave = async () => {
    if(getValues('list')?.length === 0) {
      alert('저장할 데이터를 입력하세요.');
      return;
    }

    let temp = true;
    let rowIdList = [], subjectUnitIdList = [], titleList = [], linkUrlList = [], delYnList = [];

    getValues('list').map((item) => {
      if(!temp) return;

      // 제목, 링크는 필수값
      if(!item?.title) {
        alert('제목을 입력하세요.');
        temp = false;
        return temp;
      }
      if(!item?.link_url) {
        alert('링크를 입력하세요.');
        temp = false;
        return temp;
      }

      rowIdList.push(item.row_id ? item.row_id : 0);
      subjectUnitIdList.push(subId);
      titleList.push(item.title ? item.title : '');
      linkUrlList.push(item.link_url ? item.link_url : '');
      delYnList.push(item.delYN ? item.delYN : 'N');
    })

    if(!temp) return;

    delDataList.forEach((item) => {
      rowIdList.push(item.row_id)
      subjectUnitIdList.push(item.subjectUnitId)
      titleList.push('')
      linkUrlList.push('')
      delYnList.push('Y')
    });

    const formData = new FormData()
    formData.append('row_id', rowIdList.join(','));
    formData.append('subjectUnitId', subjectUnitIdList.join(','))
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
      subjectUnitId: 0,
      title: null,
      link_url: null,
      delYN: 'N',
    }
    setValue('list', [
      ...getValues('list'),
      newSchedule,
    ])
  }

  return (
    <>
      <div className='intro-y box mt-5'>
        <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
          <div className='text-lg font-medium flex items-center'>
            과학고 영상 학습 관리
            <Lucide icon='ChevronRight' className='w-6 h-6 mx-3'></Lucide>
            {curTab === 'MATH' ? '수학' : '과학'}
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            {subName}
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
                  {getValues('list')?.length > 1 &&
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