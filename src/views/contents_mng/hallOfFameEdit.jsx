import { Lucide } from '@/base-components'
import { Link, useSearchParams } from 'react-router-dom'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import request from '@/utils/request'

const hallOfFameEdit = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const field = searchParams.get('field')
  const id = searchParams.get('sub')

  const { getValues, setValue, watch, reset, register } = useForm({
    defaultValues: {
      list: [],
    },
  })

  // + 버튼 클릭
  const handleAddList = () => {
    const addData = {
      id: 0,
      schoolName: '',
      subSchoolName: '',
      subject: '',
      studentInfo: '',
      etc: '',
      delYn: 'N',
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

  // 리스트 가져오기
  useQuery(
    ['getHallOfFame', id],
    () =>
      request.get(`/admin/content-management/hall-of-fame`, {
        params: {
          yearUnitId: id,
          fieldName: field,
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
      request.put(`/admin/content-management/hall-of-fame`, data),
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
    if (delDataList.length === 0 && getValues('list')?.length === 0) {
      alert('저장할 데이터를 입력하세요.')
      return
    }

    let temp = true
    let rowIdList = [], schoolNameList = [], subSchoolNameList = [], subjectList = [], studentInfoList = [], etcList = [], delYnList = []

    getValues('list').map((item) => {
      if (!temp) return

      if (!item?.schoolName) {
        alert('학교명을 입력하세요.')
        temp = false
        return temp
      }

      if (field === '영재원' && !item?.subject) {
        alert('과목을 입력하세요.')
        temp = false
        return temp
      }

      if (!item?.studentInfo) {
        alert('입학예정자 정보를 입력하세요.')
        temp = false
        return temp
      }

      rowIdList.push(item.id ? item.id : 0)
      schoolNameList.push(item.schoolName ? item.schoolName : '')
      subSchoolNameList.push(item.subSchoolName ? item.subSchoolName : '')
      subjectList.push(item.subject ? item.subject : '')
      studentInfoList.push(item.studentInfo ? item.studentInfo : '')
      etcList.push(item.etc ? item.etc : '')
      delYnList.push(item.delYN ? item.delYN : 'N')
    })

    if (!temp) return

    // 삭제할 데이터 리스트 셋팅
    delDataList.forEach((item) => {
      rowIdList.push(item.id)
      schoolNameList.push('')
      subSchoolNameList.push('')
      subjectList.push('')
      studentInfoList.push('')
      etcList.push('')
      delYnList.push('Y')
    })

    const formData = new FormData()
    formData.append('id', rowIdList.length > 1 ? rowIdList.join(',') : rowIdList)
    formData.append('schoolName', schoolNameList.length > 1 ? schoolNameList.join(',') : schoolNameList)
    formData.append('subSchoolName', subSchoolNameList.length > 1 ? subSchoolNameList.join(',') : subSchoolNameList)
    formData.append('subject', subjectList.length > 1 ? subjectList.join(',') : subjectList)
    formData.append('studentInfo', studentInfoList.length > 1 ? studentInfoList.join(',') : studentInfoList)
    formData.append('etc', etcList.length > 1 ? etcList.join(',') : etcList)
    formData.append('delYN', delYnList.length > 1 ? delYnList.join(',') : delYnList)

    formData.append('yearUnitId', searchParams.get('sub'))
    formData.append('fieldName', searchParams.get('field'))

    saveData(formData)
  }

  return (
    <>
      <div className='intro-y box mt-5'>
        <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
          <div className='text-lg font-medium flex items-center'>
            명예의 전당 관리
            <Lucide icon='ChevronRight' className='w-6 h-6 mx-3'></Lucide>
            {searchParams.get('field')}
            <Lucide icon='ChevronRight' className='w-6 h-6 mx-3'></Lucide>
            {searchParams.get('year')}
          </div>
        </div>
        <div className='intro-y p-5'>
          <table className='table table-hover'>
            <thead>
            <tr className='bg-slate-100 text-center'>
              <td>번호</td>
              <td>학교명</td>
              <td>하위 학교명</td>
              {field === '영재원' ? (
                <td>과목</td>
              ) : (
                <></>
              )}
              <td>입학예정자 정보</td>
              <td>기타사항</td>
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
                    className='form-control'
                    defaultValue={item.schoolName}
                    key={item.schoolName}
                    {...register(`list[${index}].schoolName`)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.subSchoolName}
                    key={item.subSchoolName}
                    {...register(`list[${index}].subSchoolName`)}
                  />
                </td>
                {field === '영재원' ? (
                  <td>
                    <input
                      type='text'
                      className='form-control'
                      defaultValue={item.subject}
                      key={item.subject}
                      {...register(`list[${index}].subject`)}
                    />
                  </td>
                ) : (
                  <></>
                )}
                <td>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={item.studentInfo}
                    key={item.studentInfo}
                    {...register(`list[${index}].studentInfo`)}
                  />
                </td>
                <td>
                  <select
                    className='form-control'
                    defaultValue={item.etc}
                    key={item.etc}
                    {...register(`list.${index}.etc`)}
                  >
                    <option value=''>해당사항 없음</option>
                    <option value='조기입학'>조기입학</option>
                    <option value='우선선발'>우선선발</option>
                  </select>
                </td>
                <td>
                  {getValues('list')?.length > 0 &&
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
              <Link to={`/hall_of_fame?field=${field}&sub=${searchParams.get('sub')}`}>
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
export default hallOfFameEdit
