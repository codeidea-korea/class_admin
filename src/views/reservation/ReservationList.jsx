import {
  Lucide,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/base-components'
import { Link } from 'react-router-dom'

const ReservationList = () => {
  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">상담 예약 확인</div>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="table table-hover">
              <tbody>
                <tr className="text-center bg-slate-100">
                  <td>접수일</td>
                  <td>제목</td>
                  <td>연락처</td>
                  <td>상담일자</td>
                  <td>시간대</td>
                  <td>유형</td>
                  <td>영역</td>
                  <td>대응여부</td>
                </tr>
                <tr className="text-center">
                  <td>23.07.18</td>
                  <td>
                    <Link
                      to="/reservation/view/1"
                      className="underline text-primary text-left"
                    >
                      <div className="truncate">
                        제목이 입력되는 위치입니다.
                      </div>
                    </Link>
                  </td>
                  <td>010-1234-1234</td>
                  <td>22.10.11</td>
                  <td>15:00 ~ 16:00</td>
                  <td>재원생 상담</td>
                  <td>영재학교</td>
                  <td>대응</td>
                </tr>
                <tr className="text-center">
                  <td>23.07.18</td>
                  <td>
                    <Link
                      to="/reservation/view/1"
                      className="underline text-primary text-left"
                    >
                      <div className="truncate">
                        제목이 입력되는 위치입니다.
                      </div>
                    </Link>
                  </td>
                  <td>010-1234-1234</td>
                  <td>22.10.11</td>
                  <td>15:00 ~ 16:00</td>
                  <td>재원생 상담</td>
                  <td>영재학교</td>
                  <td>대응</td>
                </tr>
                <tr className="text-center">
                  <td>23.07.18</td>
                  <td>
                    <Link
                      to="/reservation/view/1"
                      className="underline text-primary text-left"
                    >
                      <div className="truncate">
                        제목이 입력되는 위치입니다.
                      </div>
                    </Link>
                  </td>
                  <td>010-1234-1234</td>
                  <td>22.10.11</td>
                  <td>15:00 ~ 16:00</td>
                  <td>재원생 상담</td>
                  <td>영재학교</td>
                  <td>대응</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <Link className="page-link" to="">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  1
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default ReservationList
