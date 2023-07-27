import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useQuery } from 'react-query'
import request from '@/utils/request'
import { useForm } from 'react-hook-form'

const ShOnlineMng = () => {
  // 과목추가 모달
  const [subject, setSubject] = useState(false)

  // 탭 이동
  const [curTab, setCurTab] = useState('MATH')

  const [subId, setSubId] = useState()
  const [subName, setSubName] = useState()
  const [pageParams, setPageParams] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    pageRangeDisplayed: 10,
  })

  const { getValues, watch, reset, register } = useForm({
    defaultValues: {
      subjectUnit: '',
    },
  })

  const handlePageClick = (event) => {
    setPageParams({ ...pageParams, currentPage: (event.selected + 1) })
  }

  // 단원 리스트 가져오기
  const {
    data: basicClassSubject,
    isLoading: isBasicClassSubject,
    refetch: refetchBasicClassSubject,
  } = useQuery(
    'getBasicClassSubject',
    () =>
      request.get(`/admin/content-management/onlineSubjectUnit`, {
        params: {
          subjectType: curTab,
          studentType: 'HIGHSCHOOL',
        },
      }),
    {
      onSuccess: (data) => {
        if (data[0]) {
          setSubId(data[0].row_id)
          setSubName(data[0].title)
        }
      },
    },
  )

  // 리스트 가져오기
  const {
    data: basicClass,
    isLoading: isBasicClassm,
    refetch: refetchBasicClass,
  } = useQuery(
    ['getBasicClass', subId],
    () =>
      request.get(`/admin/content-management/scienceOnlineClass`, {
        params: {
          subjectUnitId: subId,
          page: pageParams.currentPage,
          limit: pageParams.pageRangeDisplayed,
        },
      }),
    {
      enabled: !!subId,
      onSuccess: (data) => {
        setPageParams({ ...pageParams, totalPages: data.totalPages, totalElements: data.totalElements })
      }
    },
  )

  useEffect(() => {
    refetchBasicClassSubject()
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
          <div>구분:</div>
          <select
            className='form-control w-28'
            onChange={(e) => {
              setSubId(e.target.value)
              setSubName(e.target.selectedOptions[0].innerText)
            }}
          >
            {basicClassSubject?.map((item) => (
              <option key={item.row_id} value={item.row_id}>
                {item.title}
              </option>
            ))}
          </select>
          <div className='flex ml-auto gap-2'>
            <Link to={`/sh_online_mng/edit?curTab=${curTab}&subject=${subName}&id=${subId}`}>
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
          {basicClass?.content?.length > 0 ? (
            basicClass?.content?.map((item, index) => (
              <tr className='text-center' key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td><a href={item.link_url} target='_blank'>{item.link_url}</a></td>
              </tr>
            ))
          ) : (
            <tr className='text-center'>
              <td colSpan={3}>데이터가 존재하지 않습니다.</td>
            </tr>
          )}
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