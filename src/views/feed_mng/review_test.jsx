import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@/base-components'
import React, { useState, useReducer } from 'react'
import { Link } from 'react-router-dom'
import request from '@/utils/request'
import Loading from '@/components/loading'

const ReviewTest = () => {
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

  const [addMentorPop, setAddMentorPop] = useState(false)
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
  /** 멘토(선생님) 검색 */
  const searchTeacher = (e) => {
    e.preventDefault()
    if (txtSearchWord.searchTeacherWord === '') {
      alert('검색할 선생님의 아이디/전화번호/이름을 입력해주세요.')
      return false
    }
    refetchTeacherList()
  }

  return (
    <React.Fragment>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="ml-auto">
            <div className="flex flex-middle gap-3">
              <button
                className="btn btn-outline-primary border-dotted"
                onClick={() => {
                  setTxtSearchWord({
                    searchStudentWord: '',
                    searchTeacherWord: '',
                    serachField: '',
                  })
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

        <div className="intro-y p-5">
          <div className=" border p-5 rounded-md border-dotted">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium flex items-center">
                <button className="ml-auto">
                  <Lucide icon="X" className="w-6 h-6" />
                </button>
              </div>
              <div className="font-medium">담당선생님 : 최철호 선생님</div>
              <div className="flex items-center gap-2 font-medium">
                담당학생
                <button className="btn btn-outline-primary btn-sm">
                  <Lucide icon="Plus" className="w-4 h-4 mr-1"></Lucide>
                  학생 추가하기
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
                    <td>분류</td>
                    <td></td>
                    <td>삭제</td>
                  </tr>
                  <tr className="text-center">
                    <td>1</td>
                    <td>ghdrlfehd</td>
                    <td>홍길동</td>
                    <td>장산초등학교</td>
                    <td>초6</td>
                    <td>YYYY-MM-DD</td>
                    <td>영재원</td>
                    <td>
                      <Link
                        to="/mento_mng/view/12"
                        className="btn btn-outline-primary btn-sm"
                      >
                        복습테스트
                      </Link>
                    </td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm">
                        삭제
                      </button>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td>2</td>
                    <td>ghdrlfehd</td>
                    <td>홍길동</td>
                    <td>장산초등학교</td>
                    <td>초6</td>
                    <td>YYYY-MM-DD</td>
                    <td>영재원</td>
                    <td>
                      <Link
                        to="/mento_mng/view/12"
                        className="btn btn-outline-primary btn-sm"
                      >
                        복습테스트
                      </Link>
                    </td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm">
                        삭제
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
              defaultValue={addTeacherParams.fieldId}
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
                          //   onChange={() => {
                          //     setAddTeacherParams({
                          //       teacherId: item.id,
                          //     })
                          //   }}
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
          <button type="button" className="btn btn-sky w-24">
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 멘토 추가하기 */}
    </React.Fragment>
  )
}
export default ReviewTest
