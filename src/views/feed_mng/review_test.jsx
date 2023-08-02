import { Lucide, Modal, ModalBody, ModalFooter, ModalHeader } from '@/base-components'
import React, { useReducer, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import request from '@/utils/request'
import Loading from '@/components/loading'

const ReviewTest = () => {
  const api = useAxios()
  const user = useRecoilValue(userState)
  const [searchedStudentList, setSearchedStudentList] = useState()
  const [popSearchStrudentSelMentorId, setPopSearchStrudentSelMentorId] =
    useState(0)
  const [addMentorPop, setAddMentorPop] = useState(false)
  const [addStudentPop, setAddStudentPop] = useState(false)
  const [txtSearchWord, setTxtSearchWord] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      searchStudentWord: '',
      searchTeacherWord: '',
      searchField: '',
    },
  )
  const [addTeacherParams, setAddTeacherParams] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      teacherId: 0,
    },
  )
  const [studentId, setStudentId] = useState([])
  const [page, setPage] = useState(1)
  const limit = 10

  const {
    data: teacherList,
    refetch: arefetchTeacherList,
    isLoading: isGetTeacherList,
  } = useQuery(['getTeacherList', page], () =>
    request.get('/admin/mentor-management/application/teacher', {
      params: {
        page,
        limit,
        searchWord: txtSearchWord.searchTeacherWord,
      },
    }),
  )

  /** 멘토(학급) 전체 목록 */
  const { data: mentorList, refetch: refetchMentorList } = useQuery(
    'getMentorList',
    () =>
      request.get('/admin/mentor-management/review-test/list/mentor'),
    {
      select: (data) => data,
    },
  )

  /** 학생 검색 */
  const searchStudent = async () => {
    if (txtSearchWord.searchStudentWord === '') {
      alert('검색할 학생의 아이디/전화번호/이름을 입력해주세요.')
      return false
    }
    await api
      .get(
        `/admin/mentor-management/review-test/list/student?searchWord=${txtSearchWord.searchStudentWord}`,
        { headers: { Authorization: `Bearer ${user.token}` } },
      )
      .then((res) => {
        console.log('searchStudent', res)
        if (res.status === 200) {
          setSearchedStudentList(res)
        }
      })
  }

  /** 학생 등록 */
  const addStudentProc = async () => {
    if (studentId === '') {
      alert('등록할 학생들을 체크해주세요.')
      return false
    }
    let params = `{
			"id": ${popSearchStrudentSelMentorId},
			"studentId": ${studentId}
        }`
    await api
      .put(`/admin/mentor-management/review-test/add/student`, params, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setAddStudentPop(false)
          setPopSearchStrudentSelMentorId(0)
          setTxtSearchWord({
            searchStudentWord: '',
            searchTeacherWord: '',
            serachField: '',
          })
          setSearchedStudentList()
          location.reload()
        }
      })
  }

  /** 멘토(선생님) 검색 */
  const searchTeacher = (e) => {
    e.preventDefault()
    if (txtSearchWord.searchTeacherWord === '') {
      alert('검색할 선생님의 아이디/전화번호/이름을 입력해주세요.')
      return false
    }
    refetchTeacherList()
  }

  const { mutate: addMentor } = useMutation(
    () =>
      request.put(
        `/admin/mentor-management/review-test/add/mentor?id=${addTeacherParams.teacherId}`,
      ),
    {
      onSuccess: () => {
        setAddMentorPop(false)
        setAddTeacherParams({ teacherId: '' })
        setTxtSearchWord({
          searchStudentWord: '',
          searchTeacherWord: '',
          searchField: '',
        })
      },
    },
  )

  /** 멘토(선생님) 등록 */
  const addTeacherProc = async () => {
    if (addTeacherParams.teacherId === '') {
      alert('등록할 선생님의 아이디/전화번호/이름을 입력해주세요.')
      return false
    }
    addMentor()
  }

  const handleTxtSearchWord = (event) => {
    const { name, value } = event.currentTarget
    setTxtSearchWord({ [name]: value })
  }

  return (
    <React.Fragment>
      <div className='intro-y box mt-5'>
        <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
          <div className='ml-auto'>
            <div className='flex flex-middle gap-3'>
              <button
                className='btn btn-outline-primary border-dotted'
                onClick={() => {
                  setTxtSearchWord({
                    searchStudentWord: '',
                    searchTeacherWord: '',
                    serachField: '',
                  })
                  setAddMentorPop(true)
                }}
              >
                <Lucide icon='Plus' className='w-4 h-4 mr-2'></Lucide>멘토
                추가하기
              </button>
              <input
                type='text'
                name=''
                className='form-control w-60'
                placeholder='검색어 입력'
              />
              <button
                type='button'
                className='btn btn-primary flex items-center'
              >
                <Lucide icon='Search' className='w-4 h-4 mr-2'></Lucide>검색
              </button>
            </div>
          </div>
        </div>

        {mentorList?.length > 0 && (
          mentorList?.map((item, index) => {
            return (
              <div className='intro-y p-5' key={`mentor-${item.id}`}>
                <div className='border p-5 rounded-md border-dotted mb-5'>
                  <div className='flex flex-col gap-2'>
                    <div className='text-lg font-medium flex items-center'>
                      <button className='ml-auto'>
                        <Lucide icon='X' className='w-6 h-6' />
                      </button>
                    </div>
                    <div className='font-medium'>담당선생님 : {item.teacherName}</div>
                    <div className='flex items-center gap-2 font-medium'>
                      담당학생
                      <button
                        className='btn btn-outline-primary btn-sm'
                        onClick={() => {
                          setPopSearchStrudentSelMentorId(item.id)
                          setAddStudentPop(true)
                        }}
                      >
                        <Lucide icon='Plus' className='w-4 h-4 mr-1'></Lucide>
                        학생 추가하기
                      </button>
                    </div>
                  </div>
                  <div className='overflow-x-auto mt-5'>
                    <table className='table table-hover'>
                      <tbody>
                      <tr className='text-center bg-slate-100 font-medium'>
                        <td>번호</td>
                        <td>아이디</td>
                        <td>이름</td>
                        <td>학교</td>
                        <td>학년</td>
                        <td>학생 등록일</td>
                        <td>분류</td>
                        <td>테스트</td>
                        <td>
                          <button className='btn btn-outline-danger bg-white btn-sm'>
                            삭제
                          </button>
                        </td>
                      </tr>
                      {item.studentList?.map((child, index) => (
                        <tr className='text-center' key={`student-${child.id}`}>
                          <td>{index + 1}</td>
                          <td>{child.userId}</td>
                          <td>{child.name}</td>
                          <td>{child.schoolName}</td>
                          <td>{child.grade}</td>
                          <td>{child.creDate}</td>
                          <td></td>
                          <td>
                            <Link
                              to={`/mento_mng/view?id=${child.id}&teacher-id=${item.id}&name=${child.name}&teacher-name=${item.teacherName}`}
                              className='btn btn-outline-primary btn-sm'
                            >
                              복습테스트
                            </Link>
                          </td>
                          <td>
                            <input
                              type='checkbox'
                              className='form-check-input chk1 custom-cursor-on-hover'
                            />
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* BEGIN: Modal 멘토 추가하기*/}
      <Modal
        size='modal-lg'
        show={addMentorPop}
        onHidden={() => {
          setAddMentorPop(false)
        }}
      >
        <ModalHeader>
          <h2 className='font-medium text-base mr-auto'>멘토 추가하기</h2>
          <button
            className='btn btn-rounded-secondary hidden sm:flex p-1'
            onClick={() => {
              setAddMentorPop(false)
            }}
          >
            <Lucide icon='X' className='w-4 h-4' />
          </button>
        </ModalHeader>
        <ModalBody className='p-5'>
          <div className='mt-5'>
            <form onSubmit={searchTeacher} className='flex gap-3 justify-end'>
              <input
                type='text'
                name={'searchTeacherWord'}
                className='form-control w-52'
                placeholder='아이디/전화번호/이름'
                onChange={(e) =>
                  setTxtSearchWord({ searchTeacherWord: e.target.value })
                }
              />
              <button
                className='btn btn-primary shrink-0'
                onClick={searchTeacher}
              >
                <Lucide icon='Search' className='w-4 h-4 mr-2'></Lucide>검색
              </button>
            </form>
            <div className='relative'>
              {isGetTeacherList && <Loading />}
              <table className='table table-hover mt-3'>
                <tbody>
                <tr className='bg-slate-100 font-medium text-center'>
                  <td></td>
                  <td>이름</td>
                  <td>전화번호</td>
                  <td>아이디</td>
                </tr>
                {!teacherList?.teacherList.length && (
                  <tr className='text-center'>
                    <td colSpan={4}>검색된 선생님이 없습니다.</td>
                  </tr>
                )}
                {teacherList?.teacherList.map((item) => (
                  <tr className='text-center' key={item.id}>
                    <td>
                      <input
                        type='radio'
                        className='form-check-input'
                        onChange={() => {
                          setAddTeacherParams({
                            teacherId: item.id,
                          })
                        }}
                      />
                    </td>
                    <td>
                      <label htmlFor={`tl_${item.id}`}>{item.name}</label>
                    </td>
                    <td>
                      <label htmlFor={`tl_${item.id}`}>{item.phone}</label>
                    </td>
                    <td>
                      <label htmlFor={`tl_${item.id}`}>{item.userId}</label>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type='button'
            className='btn btn-ouline-secondary w-24 mr-2'
            onClick={() => {
              setAddMentorPop(false)
            }}
          >
            취소
          </button>
          <button
            type='button'
            className='btn btn-sky w-24'
            onClick={addTeacherProc}
          >
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 멘토 추가하기 */}

      {/* BEGIN: Modal 학생 추가하기*/}
      <Modal
        size='modal-lg'
        show={addStudentPop}
        onHidden={() => {
          setPopSearchStrudentSelMentorId(0)
          setAddStudentPop(false)
        }}
      >
        <ModalHeader>
          <h2 className='font-medium text-base mr-auto'>학생 추가하기</h2>
          <button
            className='btn btn-rounded-secondary hidden sm:flex p-1'
            onClick={() => {
              setPopSearchStrudentSelMentorId(0)
              setAddStudentPop(false)
            }}
          >
            <Lucide icon='X' className='w-4 h-4' />
          </button>
        </ModalHeader>
        <ModalBody className='p-5'>
          <div className='mt-5'>
            <div className='flex gap-3 justify-end'>
              <input
                type='text'
                name={'searchStudentWord'}
                className='form-control w-52'
                placeholder='아이디/전화번호/이름'
                onChange={handleTxtSearchWord}
              />
              <button
                className='btn btn-primary shrink-0'
                onClick={searchStudent}
              >
                <Lucide icon='Search' className='w-4 h-4 mr-2'></Lucide>검색
              </button>
            </div>
            <div>
              <table className='table table-hover mt-3'>
                <tbody>
                <tr className='bg-slate-100 font-medium text-center'>
                  <td></td>
                  <td>이름</td>
                  <td>전화번호</td>
                  <td>아이디</td>
                </tr>
                {searchedStudentList?.data.length > 0 && (
                  searchedStudentList?.data.map((sitem, sindex) => (
                    <tr className='text-center' key={sitem.id}>
                      <td>
                        <input
                          name='student[]'
                          id={`sl_${sindex}`}
                          className='form-check-input stu'
                          type='radio'
                          value={sitem.id}
                          onChange={(event) => {
                            event.currentTarget.checked
                              ? setStudentId(event.currentTarget.value)
                              : setStudentId('')
                          }}
                        />
                      </td>
                      <td>
                        <label htmlFor={`sl_${sindex}`}>{sitem.name}</label>
                      </td>
                      <td>
                        <label htmlFor={`sl_${sindex}`}>{sitem.phone}</label>
                      </td>
                      <td>
                        <label htmlFor={`sl_${sindex}`}>{sitem.userId}</label>
                      </td>
                    </tr>
                  ))
                )}
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type='button'
            className='btn btn-ouline-secondary w-24 mr-2'
            onClick={() => {
              setPopSearchStrudentSelMentorId(0)
              setAddStudentPop(false)
            }}
          >
            취소
          </button>
          <button
            type='button'
            className='btn btn-sky w-24'
            onClick={addStudentProc}
          >
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 학생 추가하기 */}
    </React.Fragment>
  )
}
export default ReviewTest
