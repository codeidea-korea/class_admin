import {useEffect, useReducer, useState} from 'react'
import {
    Lucide,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from '@/base-components'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const GeOnlineMng = () => {
    const [data,setData] = useState([
      {rowId:1,subject:"융합",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link:"https://youtu.be/hwCFXw35ctc"},
      {rowId:2,subject:"융합",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link:"https://youtu.be/hwCFXw35ctc"},
      {rowId:3,subject:"융합",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link:"https://youtu.be/hwCFXw35ctc"},
      {rowId:4,subject:"융합",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link:"https://youtu.be/hwCFXw35ctc"}
    ])
    // 과목추가 모달
    const [subject,setSubject] = useState(false)

    // 탭 이동
    const [curTab,setCurTab] = useState("수학")

    // 페이지네이션 클릭
    const handlePageClick = ()=>{}

    return (<>
      <div className="flex gap-2 mt-5">
          <button className={"btn w-32 " + (curTab === "수학"?"btn-primary":"bg-white")} onClick={()=>setCurTab("수학")}>수학</button>
          <button className={"btn w-32 " + (curTab === "과학"?"btn-primary":"bg-white")}  onClick={()=>setCurTab("과학")}>과학</button>
      </div>
      <div className="intro-y box mt-5 relative">
          <div className="p-5">
              <div className="flex items-center gap-3">
                  <div>구분:</div>
                  <select className="form-control w-40">
                      <option value="초등학생">초등학생</option>
                      <option value="중학생">중학생</option>
                  </select>
                  <select className="form-control w-28">
                      <option value="융합">융합</option>
                  </select>
                  <button className="btn btn-outline-primary border-dotted" onClick={()=>setSubject(true)}>
                      <Lucide icon="Plus" className="w-4 h-4"></Lucide>   
                  </button>

                  <div className="flex ml-auto gap-2">
                      <button className="btn btn-danger w-24">
                          과목삭제
                      </button>
                      <Link to="/ge_online_mng/edit">
                          <button className="btn btn-sky w-24">수정</button>
                      </Link>
                  </div>
              </div>
              <table className='table table-hover mt-5'>
                  <thead>
                      <tr className="bg-slate-100 text-center">
                          <td>번호</td>
                          <td>과목</td>
                          <td>제목</td>
                          <td>링크</td>
                      </tr>
                  </thead>
                  <tbody>
                    {data.map((item,index)=>(
                      <tr className="text-center" key={index}>
                          <td>{item.rowId}</td>
                          <td>{item.subject}</td>
                          <td>{item.title}</td>
                          <td><a href={item.link} target="_blank">{item.link}</a></td>
                      </tr>
                    ))}
                  </tbody>
              </table>
              <div className="mt-5 flex items-center justify-center">
              <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                <nav className="w-full sm:w-auto sm:mr-auto">
                  <ReactPaginate
                    className={'pagination justify-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    breakLinkClassName={'page-item'}
                    breakLabel="..."
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    nextLabel={<ChevronRight className="w-4 h-4"/>}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    onPageChange={handlePageClick}
                    previousLabel={<ChevronLeft className="w-4 h-4"/>}
                    activeClassName={'page-item active'}
                    // pageRangeDisplayed={pageParams.pageRangeDisplayed}
                    pageRangeDisplayed = {"10"}
                    // pageCount={pageParams.totalPages}
                    pageCount={"3"}
                    renderOnZeroPageCount={props => null}
                  />
                </nav>
              </div>
            </div>
          </div>
      </div>
      {/* BEGIN: Modal 과목추가하기 */}
      <Modal
        show={subject}
        onHidden={() => setSubject(false)}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">과목 추가하기</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => setSubject(false)}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center">
            <div className="w-16 shrink-0">과목</div>
            <input
              type="text"
              className="form-control w-full"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => setSubject(false)}
          >
            취소
          </button>
          <button
            type="button"
            className="btn btn-sky w-24"
          >
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 과목추가하기 */}
  </>)
}
export default GeOnlineMng
