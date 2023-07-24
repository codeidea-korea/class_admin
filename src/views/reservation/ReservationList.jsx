import {
  Lucide,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/base-components'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from "@/states/userState";

const ReservationList = () => {
  const api = useAxios();
  const user = useRecoilValue(userState);

  const getMyReservationList = () => {
    if(user.userId != null) {
      api.get('/admin/consulting/reservation-list',
        {headers: {Authorization: `Bearer ${user.token}`}})
        .then((res) => {
          if (res.status === 200) {
            const rootElement = document.getElementById('reservation-list');
            for(let data of res.data) {
              let tr = document.createElement("tr");
              let td1 = document.createElement("td");
              let td2 = document.createElement("td");
              let td3 = document.createElement("td");
              let td4 = document.createElement("td");
              let td5 = document.createElement("td");
              let td6 = document.createElement("td");
              let td7 = document.createElement("td");
              let td8 = document.createElement("td");
              let td9 = document.createElement("td");

              tr.classList.add('text-center');
              td1.textContent = String(data.creDate[0] + "-" + data.creDate[1] + "-" + data.creDate[2]);
              td2.innerHTML = `<Link to="/reservation/view/1" className="underline text-primary text-left">
                                  <div className="truncate">
                                    ${data.title}
                                  </div>
                                </Link>`;
              td3.textContent = data.phone;
              td4.textContent = data.date;
              td5.textContent = data.time;
              td6.textContent = data.consultingType;
              td7.textContent = data.area;

              switch (data.consultingStatus) {
                case "WAIT": td8.textContent = "대기"; break;
                case "SUCCESS": td8.textContent = "완료"; break;
                case "HOLD": td8.textContent = "보류"; break;
              }

              tr.append(td1);
              tr.append(td2);
              tr.append(td3);
              tr.append(td4);
              tr.append(td5);
              tr.append(td6);
              tr.append(td7);
              tr.append(td8);

              if(rootElement != null) {
                rootElement.append(tr);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return ['MON, TUE'];
  }

  useEffect(() => {
    getMyReservationList();
  }, [])

  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">상담 예약 확인</div>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="table table-hover">
              <tbody id={"reservation-list"}>
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
