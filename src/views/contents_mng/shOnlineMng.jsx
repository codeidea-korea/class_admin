import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import useAxios from '@/hooks/useAxios'

const ShOnlineMng = () => {
  const [listLength, setListLength] = useState(0)
  const api = useAxios()
  const user = useRecoilValue(userState)
  // const [data, setData] = useState([
  //   { rowId: 1, title: '초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학', link: 'https://youtu.be/hwCFXw35ctc' },
  //   { rowId: 2, title: '초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학', link: 'https://youtu.be/hwCFXw35ctc' },
  //   { rowId: 3, title: '초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학', link: 'https://youtu.be/hwCFXw35ctc' },
  //   { rowId: 4, title: '초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학', link: 'https://youtu.be/hwCFXw35ctc' },
  // ])
  const [data, setData] = useState([])
  const [pageParams, setPageParams] = useState({
    totalPages: 0, totalElements: 0, currentPage: 1, pageRangeDisplayed: 10,
  })
  // 과목추가 모달
  const [subject, setSubject] = useState(false)

  // 탭 이동
  const [curTab, setCurTab] = useState('MATH')

  // 페이지네이션 클릭
  const handlePageClick = () => {
  }

  const getDataList = () => {
    api.get(`/admin/content-management/scienceOnlineClass?subjectType=${curTab}&page=${pageParams.currentPage}&limit=${pageParams.pageRangeDisplayed}`,
      { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.content)
          setPageParams({ ...pageParams, totalPages: res.data.totalPages, totalElements: res.data.totalElements })
          setListLength(Number(res.data.totalElements) - ((pageParams.currentPage - 1) * 10))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDataList()
  }, [curTab])

  return (<>
    <div className='flex gap-2 mt-5'>
      <button className={'btn w-32 ' + (curTab === 'MATH' ? 'btn-primary' : 'bg-white')}
              onClick={() => {
                setCurTab('MATH')
              }}>수학
      </button>
      <button className={'btn w-32 ' + (curTab === 'SCIENCE' ? 'btn-primary' : 'bg-white')}
              onClick={() => {
                setCurTab('SCIENCE')
              }}>과학
      </button>
    </div>
    <div className='intro-y box mt-5 relative'>
      <div className='p-5'>
        <div className='flex items-center gap-3'>
          <div className='flex ml-auto gap-2'>
            <Link to={`/sh_online_mng/edit?curTab=${curTab}`}>
              <button className='btn btn-sky w-24'>수정</button>
            </Link>
          </div>
        </div>
        <table className='table table-hover mt-5'>
          <thead>
          <tr className='bg-slate-100 text-center'>
            <td>번호</td>
            <td>제목</td>
            <td>링크</td>
          </tr>
          </thead>
          <tbody>
          {data?.length > 0 ? data?.map((item, index) => (
              <tr className='text-center' key={index}>
                <td>{listLength - index}</td>
                <td>{item.title}</td>
                <td><a href={item.link_url} target='_blank'>{item.link_url}</a></td>
              </tr>
            )) :
            <tr className='text-center'>
              <td colSpan={3}>데이터가 존재하지 않습니다.</td>
            </tr>
          }
          </tbody>
        </table>
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
      </div>
    </div>
  </>)
}
export default ShOnlineMng