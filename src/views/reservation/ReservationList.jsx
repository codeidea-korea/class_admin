import { Lucide } from '@/base-components'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'

const ReservationList = () => {
  const api = useAxios();
  const user = useRecoilValue(userState);
  const [reservations, setReservation] = useState([]);

  const leftPad = (value) => {
    if (value >= 10) { return value; }
    return `0${value}`;
  }

  const getMyReservationList = () => {
    if(user.userId != null) {
      api.get('/admin/consulting/reservation-list',
        {headers: {Authorization: `Bearer ${user.token}`}})
        .then((res) => {
          if (res.status === 200) {
            setReservation(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getMyReservationList();
  }, [])

  const renderDataAsElements = (dataArray) => {
    return dataArray.map((item, index) => (
      <React.Fragment key={index}>
        <tr className="text-center">
          <td>{item.creDate[0] + "-" + leftPad(item.creDate[1]) + "-" + leftPad(item.creDate[2])}</td>
          <td>
            <Link
              to={`/reservation/view/${item.id}`}
              className="underline text-primary text-left">
              <div className="truncate">
                {item.title}
              </div>
            </Link>
          </td>
          <td>{item.phone}</td>
          <td>{item.date}</td>
          <td>{item.time}</td>
          <td>{item.consultingType}</td>
          <td>{item.area}</td>
          <td>{item.consultingStatus === 'WAIT' ? '대기' : item.consultingStatus === 'SUCCESS' ? '성공' : '보류'}</td>
        </tr>
      </React.Fragment>
    ));
  };

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
                {renderDataAsElements(reservations)}
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
              <li className="page-item active">
                <Link className="page-link" to="">
                  1
                </Link>
              </li>
              <li className="page-item">
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
