import { Link } from 'react-router-dom'

const ReservationView = () => {
  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">상담 예약 확인 상세</div>
        </div>
        <div className="p-5">
          <table className="table table_layout01">
            <tbody>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">연락처</span>
                </td>
                <td>010-1211-1111</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">상담일자</span>
                </td>
                <td>2022-11-15</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">시간대</span>
                </td>
                <td>15:00 ~ 16:00</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">상담유형</span>
                </td>
                <td>재원생상담</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">영역</span>
                </td>
                <td>영재학교</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">제목</span>
                </td>
                <td>등록관련 문의드립니다.</td>
              </tr>
              <tr>
                <td className="w-48 align-top">
                  <span className="text-slate-400 font-bold">내용</span>
                </td>
                <td>
                  등록 시 한달에 등록비가 얼마인가요?
                  <br />
                  장기 등록 시 금액적인 부분 협의가 가능할까요?
                </td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold"></span>
                </td>
                <td>
                  <select name="" id="" className="form-select w-52">
                    <option value="">미대응</option>
                    <option value="">대응</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="intro-y flex mt-5 justify-center gap-3">
        <Link to="/reservation">
          <button className="btn bg-white w-24">목록</button>
        </Link>
      </div>
    </>
  )
}
export default ReservationView
