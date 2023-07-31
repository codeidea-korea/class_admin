import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@/base-components'
import React, { useState, useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import { userSchoolYear } from '@/components/helpers'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'
import Loading from '@/components/loading'

function MentoMng() {
  const api = useAxios()
  const user = useRecoilValue(userState)
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 1000,
  })
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
      serachField: '',
    },
  )
  const [addTeacherParams, setAddTeacherParams] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      fieldId: 0,
      teacherId: 0,
    },
  )
  const [addStudentIds, setAddStudentIds] = useState([])
  const [page, setPage] = useState(1)
  const limit = 10

  const {
    data: teacherList,
    refetch: refetchTeacherList,
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

  const { data: fieldList } = useQuery(
    'getFieldList',
    () => request.get('/admin/mentor-management/application/field'),
    {
      select: (data) => data.fieldList,
    },
  )

  /** 멘토(학급) 전체 목록 */
  const { data: mentorList, refetch: refetchMentorList } = useQuery(
    'getMentorList',
    () =>
      request.get('/admin/mentor-management/application/mentor', {
        params: { page: pageParams.page, limit: pageParams.limit },
      }),
    {
      select: (data) => data.content,
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
        `/admin/mentor-management/application/student?id=${popSearchStrudentSelMentorId}&searchWord=${txtSearchWord.searchStudentWord}`,
        { headers: { Authorization: `Bearer ${user.token}` } },
      )
      .then((res) => {
        console.log('searchStudent', res)
        if (res.status === 200) {
          setSearchedStudentList(res.data.studentList)
        }
      })
  }

  /** 학생 등록 */
  const addStudentProc = async () => {
    if (addStudentIds.length === 0) {
      alert('등록할 학생들을 체크해주세요.')
      return false
    }
    let params = `{
			"ids": [${addStudentIds.join(',')}],
			"mentorId": ${popSearchStrudentSelMentorId}
        }`
    await api
      .post(`/admin/mentor-management/application/student`, params, {
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
          setAddStudentIds([])
          refetchMentorList()
        }
      })
  }

  const { mutate: deleteStudent } = useMutation(
    (id) =>
      request.delete(`/admin/mentor-management/application/student?id=${id}`),
    {
      onSuccess: () => {
        refetchMentorList()
      },
    },
  )

  /** 학생 삭제 */
  const removeStudentProc = (id) => {
    if (confirm('선택하신 학생을 삭제하시겠습니까?')) {
      deleteStudent(id)
    }
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
      request.post(
        '/admin/mentor-management/application/mentor',
        addTeacherParams,
      ),
    {
      onSuccess: () => {
        setAddMentorPop(false)
        setAddTeacherParams({ fieldId: '', teacherId: '' })
        setTxtSearchWord({
          searchStudentWord: '',
          searchTeacherWord: '',
          serachField: '',
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
    if (addTeacherParams.fieldId === '') {
      alert('담당영역을 선택해주세요.')
      return false
    }
    addMentor()
  }

  const { mutate: deleteMentor } = useMutation(
    (id) =>
      request.delete(`/admin/mentor-management/application/mentor?id=${id}`),
    {
      onSuccess: () => {
        refetchMentorList()
        alert('삭제되었습니다.')
      },
    },
  )

  /** 멘토(선생님) 삭제 */
  const removeTeacherProc = async (id) => {
    if (confirm('선택하신 멘토를 삭제하시겠습니까?')) {
      deleteMentor(id)
    }
  }

  const handleTxtSearchWord = (event) => {
    const { name, value } = event.currentTarget
    setTxtSearchWord({ [name]: value })
  }

  return (
    <React.Fragment>
      {/* <div className="flex gap-2 mt-5">
        <Link to="/mento_mng">
          <button className="btn btn-primary w-36">자기소개서</button>
        </Link>
        <button
          className="btn bg-white w-36"
          onClick={() => alert("준비중입니다.")}
        >
          복습테스트
        </button>
      </div> */}
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="ml-auto">
            <div className="flex flex-middle gap-3">
              <button
                className="btn btn-outline-primary border-dotted"
                onClick={() => {
                  setAddStudentIds([])
                  setTxtSearchWord({
                    searchStudentWord: '',
                    searchTeacherWord: '',
                    serachField: '',
                  })
                  setAddTeacherParams({ fieldId: '', teacherId: '' })
                  setAddMentorPop(true)
                }}
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2"></Lucide>멘토
                추가하기
              </button>
              <input
                type="text"
                name=""
                className="form-control w-60"
                placeholder="검색어 입력"
              />
              <button
                type="button"
                className="btn btn-primary flex items-center"
              >
                <Lucide icon="Search" className="w-4 h-4 mr-2"></Lucide>검색
              </button>
            </div>
          </div>
        </div>

        {mentorList?.map((item) => (
          <div className="intro-y p-5" key={`mentor-${item.id}`}>
            <div className=" border p-5 rounded-md border-dotted">
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium flex items-center">
                  {item.fieldName}
                  <button
                    className="ml-auto"
                    onClick={() => {
                      removeTeacherProc(item.id)
                    }}
                  >
                    <Lucide icon="X" className="w-6 h-6" />
                  </button>
                </div>
                <div className="font-medium">
                  담당선생님 : {item.teacherName} 선생님
                </div>
                <div className="flex items-center gap-2 font-medium">
                  담당학생
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      setPopSearchStrudentSelMentorId(item.id)
                      setAddStudentPop(true)
                    }}
                  >
                    <Lucide icon="Plus" className="w-4 h-4 mr-1"></Lucide>
                    추가하기
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto mt-5">
                <table className="table table-hover">
                  <tbody>
                    <tr className="text-center bg-slate-100 font-medium">
                      <td>번호</td>
                      <td>아이디</td>
                      <td>이름</td>
                      <td>학교</td>
                      <td>학년</td>
                      <td>학생 등록일</td>
                      <td>전형</td>
                      <td></td>
                    </tr>
                    {item.mentorApplicationList?.map((child, index) => (
                      <tr className="text-center" key={`student-${child.id}`}>
                        <td>{index + 1}</td>
                        <td>{child.userId}</td>
                        <td>{child.name}</td>
                        <td>{child.schoolName}</td>
                        <td>{userSchoolYear(child.schoolYear)}</td>
                        <td>{child.creDate}</td>
                        <td>{child.applicationTypeName}</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                              removeStudentProc(child.id)
                            }}
                          >
                            담당 학생 삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-5 pb-5">
          <button
            className="btn btn-outline-primary border-dotted"
            onClick={() => {
              setAddMentorPop(true)
            }}
          >
            <Lucide icon="Plus" className="w-6 h-6"></Lucide>
          </button>
        </div>
      </div>

      {/* BEGIN: Modal 멘토 추가하기*/}
      <Modal
        size="modal-lg"
        show={addMentorPop}
        onHidden={() => {
          setAddMentorPop(false)
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">멘토 추가하기</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              setAddMentorPop(false)
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody className="p-5">
          <div className="flex items-center">
            <div className="w-24 shrink-0 mr-3">담당 영역</div>
            <select
              className="form-select small"
              value={addTeacherParams.fieldId}
              onChange={(event) => {
                setAddTeacherParams({
                  fieldId: event.currentTarget.value,
                })
              }}
            >
              <option value="">담당영역을 선택해주세요.</option>
              {fieldList?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <form onSubmit={searchTeacher} className="flex gap-3 justify-end">
              <input
                type="text"
                name={'searchTeacherWord'}
                className="form-control w-52"
                placeholder="아이디/전화번호/이름"
                onChange={(e) =>
                  setTxtSearchWord({ searchTeacherWord: e.target.value })
                }
              />
              <button
                className="btn btn-primary shrink-0"
                onClick={searchTeacher}
              >
                <Lucide icon="Search" className="w-4 h-4 mr-2"></Lucide>검색
              </button>
            </form>
            <div className="relative">
              {isGetTeacherList && <Loading />}
              <table className="table table-hover mt-3">
                <tbody>
                  <tr className="bg-slate-100 font-medium text-center">
                    <td></td>
                    <td>이름</td>
                    <td>전화번호</td>
                    <td>아이디</td>
                  </tr>
                  {!teacherList?.teacherList.length && (
                    <tr className="text-center">
                      <td colSpan={4}>검색된 선생님이 없습니다.</td>
                    </tr>
                  )}
                  {teacherList?.teacherList.map((item) => (
                    <tr className="text-center" key={item.id}>
                      <td>
                        <input
                          type="radio"
                          className="form-check-input"
                          checked={addTeacherParams.teacherId === item.id}
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
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => {
              setAddMentorPop(false)
            }}
          >
            취소
          </button>
          <button
            type="button"
            className="btn btn-sky w-24"
            onClick={addTeacherProc}
          >
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 멘토 추가하기 */}

      {/* BEGIN: Modal 학생 추가하기*/}
      <Modal
        size="modal-lg"
        show={addStudentPop}
        onHidden={() => {
          setPopSearchStrudentSelMentorId(0)
          setAddStudentPop(false)
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">학생 추가하기</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              setPopSearchStrudentSelMentorId(0)
              setAddStudentPop(false)
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody className="p-5">
          <div className="mt-5">
            <div className="flex gap-3 justify-end">
              <input
                type="text"
                name={'searchStudentWord'}
                className="form-control w-52"
                placeholder="아이디/전화번호/이름"
                onChange={handleTxtSearchWord}
              />
              <button
                className="btn btn-primary shrink-0"
                onClick={searchStudent}
              >
                <Lucide icon="Search" className="w-4 h-4 mr-2"></Lucide>검색
              </button>
            </div>
            <div>
              <table className="table table-hover mt-3">
                <tbody>
                  <tr className="bg-slate-100 font-medium text-center">
                    <td></td>
                    <td>이름</td>
                    <td>전화번호</td>
                    <td>아이디</td>
                  </tr>
                  {searchedStudentList?.map((sitem, sindex) => (
                    <tr className="text-center" key={sitem.id}>
                      <td>
                        <input
                          name="student[]"
                          id={`sl_${sindex}`}
                          className="form-check-input stu"
                          type="checkbox"
                          value={sitem.applicationId}
                          onChange={(event) => {
                            event.currentTarget.checked
                              ? setAddStudentIds([
                                  ...addStudentIds,
                                  event.currentTarget.value,
                                ])
                              : setAddStudentIds(
                                  addStudentIds.filter(
                                    (choice) =>
                                      choice != event.currentTarget.navalueme,
                                  ),
                                )
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => {
              setPopSearchStrudentSelMentorId(0)
              setAddStudentPop(false)
            }}
          >
            취소
          </button>
          <button
            type="button"
            className="btn btn-sky w-24"
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

export default MentoMng
