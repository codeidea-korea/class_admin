import React from 'react'
import { Link } from 'react-router-dom'
import { userState } from '@/states/userState'
import { useRecoilValue } from 'recoil'
import { useQuery } from 'react-query'
import request from '@/utils/request'

const ReviewTestView = () => {
  const params = new URLSearchParams(location.search)
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL
  const user = useRecoilValue(userState)
  const id = params.get('id')
  const teacherId = params.get('teacher-id')
  const name = params.get('name')
  const teacherName = params.get('teacher-name')

  // 리스트 가져오기
  const {
    data: reviewTest,
    isLoading: isReviewTest,
    refetch: refetchReviewTest,
  } = useQuery(
    'getReviewTest',
    () =>
      request.get(`/admin/mentor-management/review-test/view`, {
        params: {
          id: id,
          teacherId: teacherId,
        },
      }),
    {
      onSuccess: (data) => {
      },
    },
  )

  return (
    <React.Fragment>
      <div className='flex gap-2 mt-5'>
        {user.authority == 'TEACHER' ? (
          <>
            <Link to='/feed_mng' className='btn bg-white w-36'>
              자기소개서
            </Link>
            <Link to='/feed_mng?review' className='btn btn-primary w-36'>
              복습테스트
            </Link>
          </>
        ) : (
          <>
            <Link to='/mento_mng' className='btn bg-white w-36'>
              자기소개서
            </Link>
            <Link to='/mento_mng?review' className='btn btn-primary w-36'>
              복습테스트
            </Link>
          </>
        )}
      </div>

      <div className='intro-y box mt-5 p-5'>
        <div className='flex justify-between gap-2'>
          <div>
            <div className='font-medium'>담당 선생님 : {teacherName} 선생님</div>
            <div className='flex items-center gap-2 font-medium'>
              담당 학생 : {name}
            </div>
          </div>
          <div>
            <Link to={`/mento_mng/edit?id=${id}&teacher-id=${teacherId}&name=${name}&teacher-name=${teacherName}`}
                  className='btn btn-sky w-24'>
              Test 등록
            </Link>
          </div>
        </div>
        <div className='overflow-x-auto mt-5'>
          <table className='table table-hover'>
            <thead>
            <tr className='text-center bg-slate-100 font-medium'>
              <td>번호</td>
              <td>과목</td>
              <td>출제자</td>
              <td>학습내용</td>
              <td>문제</td>
              <td>출제일시</td>
              <td>답안제출</td>
              <td>모범답안보기</td>
              <td>채점</td>
            </tr>
            </thead>
            <tbody>
            {reviewTest?.length > 0 ? (
              reviewTest?.map((item, index) => (
                <tr className='text-center'>
                  <td>{index + 1}</td>
                  <td>{item.subject}</td>
                  <td>{teacherName} 선생님</td>
                  <td>{item.content}</td>
                  <td>
                    {item.questionFileId && item.questionFileId !== 0 ? (
                      <a href={`${baseUrl}/v1/contents-data/file-download/${item.questionFileId}`}
                         className='underline' download>
                        보기
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{item.creDate}</td>
                  <td>
                    {item.answerFileId && item.answerFileId !== 0 ? (
                      <a href={`${baseUrl}/v1/contents-data/file-download/${item.answerFileId}`}
                         className='underline' download>
                        제출
                      </a>
                    ) : (
                      '미제출'
                    )}
                  </td>
                  <td>
                    {item.modelAnswerFileId && item.modelAnswerFileId !== 0 ? (
                      <a
                        href={`${baseUrl}/v1/contents-data/file-download/${item.modelAnswerFileId}`}
                        className='underline' download>
                        답안 확인하기
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{item.scoringStatus === 'NO_STATUS' ? '미채점' : item.scoringStatus}</td>
                </tr>
              ))
            ) : (
              <tr className='text-center'>
                <td colSpan={9}>데이터가 존재하지 않습니다.</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ReviewTestView
