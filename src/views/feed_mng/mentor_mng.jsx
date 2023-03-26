import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@/base-components'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import { userSchoolYear } from '@/components/helpers'
import { useQuery } from 'react-query'
import request from '@/utils/request'

function MentoMng() {
  const api = useAxios()
  const navigate = useNavigate()
  const user = useRecoilValue(userState)
  const [pageParams, setPageParams] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    pageRangeDisplayed: 10,
  })
  const [mentorDataList, setMentorDataList] = useState()
  const [searchedStudentList, setSearchedStudentList] = useState()
  const [searchedTeacherList, setSearchedTeacherList] = useState()
  const [fieldList, setFieldList] = useState()
  const [popSearchStrudentSelMentorId, setPopSearchStrudentSelMentorId] =
    useState(0)
  const [addMentorPop, setAddMentorPop] = useState(false)
  const [addStudentPop, setAddStudentPop] = useState(false)
  const [txtSearchWord, setTxtSearchWord] = useState({
    searchStudentWord: '',
    searchTeacherWord: '',
    serachField: '',
  })
  const [addTeacherParams, setAddTeacherParams] = useState({
    fieldId: 0,
    teacherId: 0,
  })
  const [addStudentIds, setAddStudentIds] = useState([])

  /** 멘토(학급) 전체 목록 */
  const mentorFindAll = async () => {
    await api
      .get(
        `/admin/mentor-management/application/mentor?page=${pageParams.currentPage}&limit=${pageParams.pageRangeDisplayed}`,
        { headers: { Authorization: `Bearer ${user.token}` } },
      )
      .then((res) => {
        console.log('mentorFindAll', res)
        if (res.status === 200) {
          setMentorDataList(res.data.content)
          setPageParams({
            ...pageParams,
            totalPages: res.data.totalPages,
            totalElements: res.data.totalElements,
          })
        }
      })
      .catch((err) => {
        console.log('error', err)
        if (err.response.status === 403) {
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
          navigate('/login')
        }
      })
  }

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
      .catch((err) => {
        console.log('error', err)
        if (err.response.status === 403) {
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
          navigate('/login')
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
            ...txtSearchWord,
            searchStudentWord: '',
            searchTeacherWord: '',
            serachField: '',
          })
          setSearchedStudentList()
          setAddStudentIds([])
          mentorFindAll()
        }
      })
      .catch((err) => {
        console.log('error', err)
        if (err.response.status === 403) {
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
          navigate('/login')
        } else {
          alert(err.response.data.msg)
          return
        }
      })
  }

  /** 학생 삭제 */
  const removeStudentProc = async (sid) => {
    if (confirm('선택하신 학생을 삭제하시겠습니까?')) {
      await api
        .delete(`/admin/mentor-management/application/student?id=${sid}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            mentorFindAll()
          }
        })
        .catch((err) => {
          console.log('error', err)
          if (err.response.status === 403) {
            alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
            navigate('/login')
          } else {
            alert(err.response.data.msg)
            return
          }
        })
    } else {
      return false
    }
  }

  /** 멘토(선생님) 검색 */
  const searchTeacher = async () => {
    if (txtSearchWord.searchTeacherWord === '') {
      alert('검색할 선생님의 아이디/전화번호/이름을 입력해주세요.')
      return false
    }
    await api
      .get(
        `/admin/mentor-management/application/teacher?searchWord=${txtSearchWord.searchTeacherWord}`,
        { headers: { Authorization: `Bearer ${user.token}` } },
      )
      .then((res) => {
        console.log('searchTeacher', res)
        if (res.status === 200) {
          setSearchedTeacherList(res.data.teacherList)
        }
      })
      .catch((err) => {
        console.log('error', err)
        if (err.response.status === 403) {
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
          navigate('/login')
        }
      })
  }

  /** 멘토(선생님) 등록 */
  const addTeacherProc = async () => {
    if (addTeacherParams.teacherId === 0) {
      alert('등록할 선생님의 아이디/전화번호/이름을 입력해주세요.')
      return false
    }
    if (addTeacherParams.fieldId === 0) {
      alert('담당영역을 선택해주세요.')
      return false
    }
    await api
      .post(`/admin/mentor-management/application/mentor`, addTeacherParams, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setAddMentorPop(false)
          setAddTeacherParams({ ...addTeacherParams, fieldId: 0, teacherId: 0 })
          setTxtSearchWord({
            ...txtSearchWord,
            searchStudentWord: '',
            searchTeacherWord: '',
            serachField: '',
          })
          setSearchedTeacherList()
          mentorFindAll()
        }
      })
      .catch((err) => {
        console.log('error', err)
        if (err.response.status === 403) {
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
          navigate('/login')
        } else {
          alert(err.response.data.msg)
          return
        }
      })
  }

  /** 멘토(선생님) 삭제 */
  const removeTeacherProc = async (tid) => {
    if (confirm('선택하신 멘토를 삭제하시겠습니까?')) {
      await api
        .delete(`/admin/mentor-management/application/mentor?id=${tid}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            mentorFindAll()
          }
        })
        .catch((err) => {
          console.log('error', err)
          if (err.response.status === 403) {
            alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
            navigate('/login')
          } else {
            alert(err.response.data.msg)
            return
          }
        })
    } else {
      return false
    }
  }

  /** 담당 영역 목록 */
  const getFieldList = async () => {
    await api
      .get(`/admin/mentor-management/application/field`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        console.log('getFieldList', res)
        if (res.status === 200) {
          setFieldList(res.data.fieldList)
        }
      })
      .catch((err) => {
        console.log('error', err)
        if (err.response.status === 403) {
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
          navigate('/login')
        }
      })
  }

  const handleTxtSearchWord = (event) => {
    const { name, value } = event.currentTarget
    setTxtSearchWord({ ...txtSearchWord, [name]: value })
  }

  useEffect(() => {
    ;(async () => {
      mentorFindAll()
      getFieldList()
    })()
  }, [])
  const [page, setPage] = useState(1)
  const limit = 10

  const { data: teacherList } = useQuery(['getTeacherList', page], () =>
    request.get('/admin/mentor-management/application/teacher', {
      params: {
        page,
        limit,
      },
    }),
  )

  return (
    <React.Fragment>
      <div className="flex gap-2 mt-5">
        <Link to="/mento_mng">
          <button className="btn btn-primary w-36">자기소개서</button>
        </Link>
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          문제은행
        </button>
      </div>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="ml-auto">
            <div className="flex flex-middle gap-3">
              <button
                className="btn btn-outline-primary border-dotted"
                onClick={() => {
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

        {mentorDataList?.map((item) => (
          <div className="intro-y p-5" key={item.id}>
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
                    {item.mentorApplicationList?.map((item2) => (
                      <tr className="text-center" key={item2.id}>
                        <td>{item2.id}</td>
                        <td>{item2.userId}</td>
                        <td>{item2.name}</td>
                        <td>{item2.schoolName}</td>
                        <td>{userSchoolYear(item2.schoolYear)}</td>
                        <td>{item2.creDate}</td>
                        <td>{item2.applicationTypeName}</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                              removeStudentProc(item2.id)
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
              onChange={(event) => {
                setAddTeacherParams({
                  ...addTeacherParams,
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
            <div className="flex gap-3 justify-end">
              <input
                type="text"
                name={'searchTeacherWord'}
                className="form-control w-52"
                placeholder="아이디/전화번호/이름"
                onChange={handleTxtSearchWord}
              />
              <button
                className="btn btn-primary shrink-0"
                onClick={searchTeacher}
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
                  {teacherList?.teacherList.map((item) => (
                    <tr className="text-center" key={item.id}>
                      <td>
                        <input
                          name={'teacher'}
                          id={`tl_${item.id}`}
                          className="form-check-input"
                          type="radio"
                          onChange={() => {
                            setAddTeacherParams({
                              ...addTeacherParams,
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
                  {searchedStudentList?.map((sitem, sindex) => {
                    return (
                      <React.Fragment key={sindex}>
                        <tr className="text-center">
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
                                          choice !=
                                          event.currentTarget.navalueme,
                                      ),
                                    )
                              }}
                            />
                          </td>
                          <td>
                            <label htmlFor={`sl_${sindex}`}>{sitem.name}</label>
                          </td>
                          <td>
                            <label htmlFor={`sl_${sindex}`}>
                              {sitem.phone}
                            </label>
                          </td>
                          <td>
                            <label htmlFor={`sl_${sindex}`}>
                              {sitem.userId}
                            </label>
                          </td>
                        </tr>
                      </React.Fragment>
                    )
                  })}
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
