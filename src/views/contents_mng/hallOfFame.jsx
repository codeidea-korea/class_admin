import { useEffect, useState } from 'react'
import { Lucide, Modal, ModalBody, ModalFooter, ModalHeader } from '@/base-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import request from '@/utils/request'
import Loading from '@/components/loading'

const HallOfFame = () => {
  const url = useLocation().search
  const params = new URLSearchParams(location.search)
  let [menuData, setMenuData] = useState({
    fieldTab: '영재원',
    subId: 0,
  })

  const navigate = useNavigate()

  // 과목추가 모달
  const [subject, setSubject] = useState(false)

  // 탭 이동
  const [fieldTab, setFieldTab] = useState(menuData.fieldTab)

  const [subId, setSubId] = useState()
  const [year, setYear] = useState()

  const { getValues, watch, reset, register } = useForm({
    defaultValues: {
      addYear: 0,
    },
  })

  // 단원 리스트 가져오기
  const {
    data: yearUnit,
    isLoading: isYearUnit,
    refetch: refetchYearUnit,
  } = useQuery(
    ['getYearUnit', fieldTab],
    () =>
      request.get(`/admin/content-management/hall-of-fame-year-unit`, {
        params: {
          fieldName: fieldTab,
        },
      }),
    {
      onSuccess: (data) => {
        if (data[0]) {
          setSubId(data[0].id)
          setYear(data[0].year)
          navigate(`?field=${fieldTab}&sub=${data[0].id}`)
        } else {
          setSubId(0)
        }
      },
    },
  )

  // 리스트 가져오기
  const {
    data: hallOfFame,
    isLoading: isHallOfFame,
    refetch: refetchHallOfFame,
  } = useQuery(
    ['getHallOfFame', subId],
    () =>
      request.get(`/admin/content-management/hall-of-fame`, {
        params: {
          yearUnitId: subId,
          fieldName: fieldTab,
        },
      }),
    {
      enabled: !!subId,
      onSuccess: (data) => {
      },
    },
  )

  // 단원 추가하기
  const { mutate: addYearUnit, isLoading: isAddYearUnit } = useMutation(
    (data) =>
      request.put(`/admin/content-management/hall-of-fame-year-unit`, data),
    {
      onSuccess: () => {
        refetchYearUnit()
        alert('추가되었습니다.')
        setSubject(false)
        reset({ yearUnit: '' })
      },
    },
  )

  // 단원 삭제하기
  const { mutate: deleteYearUnit, isLoading: isDeleteYearUnit } =
    useMutation(
      (id) =>
        request.delete(`/admin/content-management/hall-of-fame-year-unit/${subId}`),
      {
        onSuccess: () => {
          refetchYearUnit()
          alert('삭제되었습니다.')
        },
      },
    )

  const goEdit = () => {
    if (subId > 0) {
      navigate(`/hall_of_fame/edit?field=${fieldTab}&year=${year}&sub=${subId}`)
    } else {
      alert('과목을 추가해주세요.')
    }
  }

  useEffect(() => {
    if (yearUnit) {
      if (params.get('sub')) {
        setTimeout(function() {
          setSubId(params.get('sub'))
        }, 100)
      } else {
        const select = document.querySelector('.subject_search2 option')
        if (select) {
          setSubId(select.value)
        }
      }
    }
  }, [url, yearUnit])

  return (
    <>
      <div className='intro-y box mt-5 relative'>
        {(isYearUnit || isHallOfFame) && <Loading />}

        <div className='p-5'>
          <div className='flex items-center gap-3 subject_search'>
            <div>구분:</div>
            <select
              className='form-control w-40'
              onChange={(e) => {
                setFieldTab(e.target.value)
                navigate(`?field=${e.target.value}`)
              }}
              value={fieldTab}
            >
              <option value='영재원'>영재원</option>
              <option value='영재학교'>영재학교</option>
              <option value='과학고'>과학고</option>
            </select>
            <select
              className='form-control w-40 subject_search2'
              onChange={(e) => {
                setSubId(e.target.value)
                setYear(e.target.selectedOptions[0].innerText)
                navigate(`?field=${fieldTab}&sub=${e.target.value}`)
              }}
              value={subId}
            >
              {yearUnit?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.year}
                </option>
              ))}
            </select>
            <button
              className='btn btn-outline-primary border-dotted'
              onClick={() => setSubject(true)}
            >
              <Lucide icon='Plus' className='w-4 h-4'></Lucide>
            </button>

            <div className='flex ml-auto gap-2'>
              <button
                className='btn btn-danger w-24'
                onClick={() => {
                  if (confirm('연도를 삭제하시겠습니까?')) {
                    deleteYearUnit(subId)
                  }
                }}
              >
                연도삭제
              </button>
              <a onClick={goEdit}>
                <button className='btn btn-sky w-24'>수정</button>
              </a>
            </div>
          </div>
          <table className='table table-hover mt-5'>
            <thead>
            <tr className='bg-slate-100 text-center'>
              <td>번호</td>
              <td>연도</td>
              <td>학교명</td>
              <td>학교명 배경색상</td>
              <td>입학예정자 정보</td>
            </tr>
            </thead>
            <tbody>
            {hallOfFame?.length > 0 ? (
              hallOfFame?.map((item, index) => (
                <tr className='text-center' key={index}>
                  <td>{index + 1}</td>
                  <td>{year}</td>
                  <td>{item.schoolName}</td>
                  <td>{item.studentInfo}</td>
                </tr>
              ))
            ) : (
              <tr className='text-center'>
                <td colSpan={4}>데이터가 존재하지 않습니다.</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      {/* BEGIN: Modal 연도추가하기 */}
      <Modal show={subject} onHidden={() => setSubject(false)}>
        <ModalHeader>
          <h2 className='font-medium text-base mr-auto'>연도 추가하기</h2>
          <button
            className='btn btn-rounded-secondary hidden sm:flex p-1'
            onClick={() => setSubject(false)}
          >
            <Lucide icon='X' className='w-4 h-4' />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className='flex items-center'>
            <div className='w-16 shrink-0'>연도</div>
            <input
              type='text'
              className='form-control w-full'
              {...register('addYear')}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type='button'
            className='btn btn-ouline-secondary w-24 mr-2'
            onClick={() => setSubject(false)}
          >
            취소
          </button>
          <button
            type='button'
            className='btn btn-sky w-24'
            onClick={() => {
              if (getValues('addYear')) {
                addYearUnit({
                  year: getValues('addYear'),
                  fieldName: fieldTab,
                })
              } else {
                alert('연도를 입력하세요.')
              }
            }}
          >
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 연도추가하기 */}
    </>
  )
}
export default HallOfFame
