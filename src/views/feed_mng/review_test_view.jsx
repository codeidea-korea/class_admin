import React from 'react'
import { Link } from 'react-router-dom'

const ReviewTestView = () => {
  return (
    <React.Fragment>
      <div className="flex gap-2 mt-5">
        <Link to="/mento_mng" className="btn bg-white w-36">
          자기소개서
        </Link>
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          문제은행
        </button>
        <Link to="/mento_mng?review" className="btn btn-primary w-36">
          복습테스트
        </Link>
      </div>

      <div className="intro-y box mt-5 p-5">
        <div className="flex justify-between gap-2">
          <div>
            <div className="font-medium">담당선생님 : 최철호 선생님</div>
            <div className="flex items-center gap-2 font-medium">
              담당학생 : ghdrlfehd
            </div>
          </div>
          <div>
            <Link to="/mento_mng/edit/12" className="btn btn-sky w-24">
              Test 등록
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="table table-hover">
            <tbody>
              <tr className="text-center bg-slate-100 font-medium">
                <td>번호</td>
                <td>과목</td>
                <td>출제자</td>
                <td>학습내용</td>
                <td>출제일시</td>
                <td>답안제출</td>
                <td>모범답안보기</td>
                <td>채점</td>
              </tr>
              <tr className="text-center">
                <td>1</td>
                <td>화학</td>
                <td>최철호 선생님</td>
                <td>물질의 성질</td>
                <td>YYYY-MM-DD</td>
                <td>
                  <a href="" className="underline" download>
                    제출
                  </a>
                </td>
                <td>
                  <a href="" className="underline" download>
                    답안 확인하기
                  </a>
                </td>
                <td>PASS</td>
              </tr>
              <tr className="text-center">
                <td>1</td>
                <td>화학</td>
                <td>최철호 선생님</td>
                <td>물질의 성질</td>
                <td>YYYY-MM-DD</td>
                <td>미제출</td>
                <td>-</td>
                <td>Fail</td>
              </tr>
              <tr className="text-center">
                <td>1</td>
                <td>화학</td>
                <td>최철호 선생님</td>
                <td>물질의 성질</td>
                <td>YYYY-MM-DD</td>
                <td>미제출</td>
                <td>-</td>
                <td>미채점</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ReviewTestView
