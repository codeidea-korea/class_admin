import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from "@/states/userState";

const ReservationView = () => {
  const api = useAxios();
  const user = useRecoilValue(userState);
  const params = useParams();
  const [reservations, setReservation] = useState([]);

  useEffect(() => {
    getMyReservationDetail();
  }, [])

  const getMyReservationDetail = () => {
    if(params.id != null) {
      api.get('/admin/consulting/reservation-detail',
        {params: {'id': params.id}, headers: {Authorization: `Bearer ${user.token}`}})
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

  const udtConsultingStatus = (event) => {
    const value = event.currentTarget.value;

    if(params.id != null) {
      api.post('/admin/consulting/udt-consulting-status', {id: params.id, ConsultingStatus: value},
      {headers: {Authorization: `Bearer ${user.token}`}})
        .then((res) => {
          if (res.status === 200) {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const renderStringWithLineBreaks = (str) => {
    const lines = String(str).split("<br>");
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

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
                <td>{reservations.phone}</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">상담일자</span>
                </td>
                <td>{reservations.date}</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">시간대</span>
                </td>
                <td>{reservations.time}</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">상담유형</span>
                </td>
                <td>{reservations.consultingType}</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">영역</span>
                </td>
                <td>{reservations.area}</td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold">제목</span>
                </td>
                <td>{reservations.title}</td>
              </tr>
              <tr>
                <td className="w-48 align-top">
                  <span className="text-slate-400 font-bold">내용</span>
                </td>
                <td>
                  {renderStringWithLineBreaks(reservations.content)}
                </td>
              </tr>
              <tr>
                <td className="w-48">
                  <span className="text-slate-400 font-bold"></span>
                </td>
                <td>
                  <select name="" id="" className="form-select w-52"
                          key={reservations.consultingStatus}
                          defaultValue={reservations.consultingStatus}
                          onChange={udtConsultingStatus}>
                    <option value="WAIT">대기</option>
                    <option value="SUCCESS">완료</option>
                    <option value="HOLD">보류</option>
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
