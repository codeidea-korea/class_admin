import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ReservationList = () => {
  const api = useAxios()
  const user = useRecoilValue(userState)
  const [reservations, setReservation] = useState([])
  const [pageParams, setPageParams] = useState({
    totalPages: 0, totalElements: 0, currentPage: 1, pageRangeDisplayed: 10,
  })

  const getMyReservationList = () => {
    if (user.userId != null) {
      api.get(`/admin/consulting/reservation-list?page=${pageParams.currentPage}&limit=${pageParams.pageRangeDisplayed}`,
        { headers: { Authorization: `Bearer ${user.token}` } })
        .then((res) => {
          if (res.status === 200) {
            setReservation(res.data.content)
            setPageParams({ ...pageParams, totalPages: res.data.totalPages, totalElements: res.data.totalElements })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handlePageClick = (event) => {
    setPageParams({ ...pageParams, currentPage: (event.selected + 1) })
  }

  useEffect(() => {
    getMyReservationList()
  }, [pageParams.currentPage])

  const renderDataAsElements = (dataArray) => {
    console.log(dataArray)
    return dataArray.map((item, index) => (
      <React.Fragment key={index}>
        <tr className='text-center'>
          <td>{item.authority === 'PARENTS' ? '학부모' : item.authority === 'STUDENT' ? '학생' : item.authority === null ? '비회원' : item.authority}</td>
          <td>{item.userId === '' ? '-' : item.userId}</td>
          <td>{item.creDate}</td>
          <td>
            <Link
              to={`/reservation/view/${item.id}`}
              className='underline text-primary text-left'>
              <div className='truncate'>
                {item.title}
              </div>
            </Link>
          </td>
          <td>{item.phone}</td>
          <td>{item.date}</td>
          <td>{item.time}</td>
          <td>{item.consultingType}</td>
          <td>{item.area}</td>
          <td>{item.consultingStatus === 'WAIT' ? '대기' : item.consultingStatus === 'SUCCESS' ? '완료' : '보류'}</td>
        </tr>
      </React.Fragment>
    ))
  }

  return (
    <>
      <div className='intro-y box mt-5'>
        <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
          <div className='text-lg font-medium'>상담 예약 확인</div>
        </div>
        <div className='p-5'>
          <div className='overflow-x-auto'>
            <table className='table table-hover'>
              <tbody>
              <tr className='text-center bg-slate-100'>
                <td>유형</td>
                <td>계정정보</td>
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
      <div className='mt-5 flex items-center justify-center'>
        <div className='intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center'>
          <nav className='w-full sm:w-auto sm:mr-auto'>
            <ReactPaginate
              className={'pagination justify-center'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              breakLinkClassName={'page-item'}
              breakLabel='...'
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              nextLabel={<ChevronRight className='w-4 h-4' />}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              onPageChange={handlePageClick}
              previousLabel={<ChevronLeft className='w-4 h-4' />}
              activeClassName={'page-item active'}
              pageRangeDisplayed={pageParams.pageRangeDisplayed}
              pageCount={pageParams.totalPages}
              renderOnZeroPageCount={props => null}
            />
          </nav>
        </div>
      </div>
    </>
  )
}

export default ReservationList
