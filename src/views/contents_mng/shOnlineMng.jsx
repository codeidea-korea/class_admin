import { useState , useEffect } from 'react'
import { Link , useLocation , useNavigate} from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import request from '@/utils/request'
import { useForm } from 'react-hook-form'
import { Lucide, Modal, ModalBody, ModalFooter, ModalHeader } from '@/base-components'
import Loading from '@/components/loading'

const ShOnlineMng = () => {
  const url = useLocation().search;
  const params = new URLSearchParams(location.search)
  const navigate = useNavigate();
  const shCurTab = sessionStorage.getItem('shCurTab') == null ? 'MATH' : sessionStorage.getItem('shCurTab')
  // 과목추가 모달
  const [subject, setSubject] = useState(false)

  // 탭 이동
  const [curTab, setCurTab] = useState("MATH")

  const [subId, setSubId] = useState()
  const [subName, setSubName] = useState()
  const [pageParams, setPageParams] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    pageRangeDisplayed: 9999,
  })

  const { getValues, watch, reset, register } = useForm({
    defaultValues: {
      subjectUnit: '',
    },
  })

  const handlePageClick = (event) => {
    setPageParams({ ...pageParams, currentPage: (event.selected + 1) })
  }

  // 구분 리스트 가져오기
  const {
    data: basicClassSubject,
    isLoading: isBasicClassSubject,
    refetch: refetchBasicClassSubject,
  } = useQuery(
    ['getBasicClassSubject', curTab],
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

  // 세부내용 리스트 가져오기
  const {
    data: basicClass,
    isLoading: isBasicClass,
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
      },
    },
  )

  // 단원 추가하기
  const { mutate: addClassSubject, isLoading: isAddClassSubject } = useMutation(
    (data) =>
      request.post(`/admin/content-management/onlineSubjectUnit`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    {
      onSuccess: () => {
        refetchBasicClassSubject()
        alert('추가되었습니다.')
        setSubject(false)
        reset({ subjectUnit: '' })
      },
    },
  )

  // 단원 삭제하기
  const { mutate: deleteClassSubject, isLoading: isDeleteClassSubject } =
    useMutation(
      (id) =>
        request.delete(`/admin/content-management/onlineSubjectUnit/${id}`),
      {
        onSuccess: () => {
          refetchBasicClassSubject()
          alert('삭제되었습니다.')
        },
      },
    )

  // url 수정
  useEffect(()=>{
    if(params.get('tab') == 'SCIENCE'){
      setCurTab("SCIENCE")
    }else{
      setCurTab("MATH")
    }

    if(basicClassSubject){
      if(params.get('subject')){
        setTimeout(function(){
          setSubId(params.get('subject'))
          setSubName(basicClassSubject?.find(
            (item) => item.row_id === Number(params.get('subject')),
            ).title)
        },100)
      }else{
        const select = document.querySelector('.subject_search option')
        if(select){
          setSubId(select.value)
          setSubName(select.innerText)
        }
      }
    }
    
  },[url,basicClassSubject])

  return (
    <>
      <div className='flex gap-2 mt-5'>
        <button className={'btn w-32 ' + (curTab === 'MATH' ? 'btn-primary' : 'bg-white')}
                onClick={() => {
                  setCurTab('MATH')
                  sessionStorage.setItem('shCurTab', 'MATH')
                  navigate('?tab=MATH')
                }}>수학
        </button>
        <button className={'btn w-32 ' + (curTab === 'SCIENCE' ? 'btn-primary' : 'bg-white')}
                onClick={() => {
                  setCurTab('SCIENCE')
                  sessionStorage.setItem('shCurTab', 'SCIENCE')
                  navigate('?tab=SCIENCE')
                }}>과학
        </button>
      </div>
    <div className='intro-y box mt-5 relative'>
      {
        (isBasicClassSubject || isBasicClass) ? <Loading /> :
          <div className='p-5'>
            <div className='flex items-center gap-3'>
              <div>구분:</div>
              <select
                className='form-control w-40 subject_search'
                onChange={(e) => {
                  setSubId(e.target.value)
                  setSubName(e.target.selectedOptions[0].innerText)
                  navigate(`?tab=${curTab=="MATH"?"MATH":"SCIENCE"}&subject=${e.target.value}`)
                }}
                value={subId}
              >
                {basicClassSubject?.map((item) => (
                  <option key={item.row_id} value={item.row_id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <button
                className='btn btn-outline-primary border-dotted'
                onClick={() => setSubject(true)}
              >
                <Lucide icon='Plus' className='w-4 h-4'></Lucide>
              </button>
              <div className='flex ml-auto gap-2'>
                <button
                  className='btn btn-danger w-24'
                  onClick={() => {
                    if (confirm('과목을 삭제하시겠습니까?')) {
                      deleteClassSubject(subId)
                    }
                  }}
                >
                  과목삭제
                </button>
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
            {/*<div className='mt-5 flex items-center justify-center'>
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
            </div>*/}
          </div>
      }
    </div>
    {/* BEGIN: Modal 과목추가하기 */}
    <Modal show={subject} onHidden={() => setSubject(false)}>
      <ModalHeader>
        <h2 className='font-medium text-base mr-auto'>과목 추가하기</h2>
        <button
          className='btn btn-rounded-secondary hidden sm:flex p-1'
          onClick={() => setSubject(false)}
        >
          <Lucide icon='X' className='w-4 h-4' />
        </button>
      </ModalHeader>
      <ModalBody>
        <div className='flex items-center'>
          <div className='w-16 shrink-0'>과목</div>
          <input
            type='text'
            className='form-control w-full'
            {...register('subjectUnit')}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type='button'
          className='btn btn-ouline-secondary w-24 mr-2'
          onClick={() => setSubject(false)}
        >
          취소
        </button>
        <button
          type='button'
          className='btn btn-sky w-24'
          onClick={() => {
            if(getValues('subjectUnit')) {
              addClassSubject({
                title: getValues('subjectUnit'),
                subjectType: curTab,
                studentType: 'HIGHSCHOOL',
              })
            }else {
              alert('과목을 입력하세요.');
            }
          }}
        >
          확인
        </button>
      </ModalFooter>
    </Modal>
    {/* END: Modal 과목추가하기 */}
  </>)
}
export default ShOnlineMng