import { Lucide, Modal, ModalHeader,ModalBody,ModalFooter,  Dropdown,DropdownToggle,DropdownMenu,DropdownContent,DropdownItem, } from '@/base-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function MockExam() {
  // 비디오 영상 모달
  const [video, videoDetail] = useState(false)

  // 과목추가하기 모달
  const [SubjectsAdd, SubjectsAddDetail] = useState(false);

  return (
    <>
      <div className="flex gap-2 mt-5">
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          영재원
        </button>
        <Link to="/mock_exam">
          <button className="btn btn-primary w-36">영재학교</button>
        </Link>
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          과학고
        </button>
      </div>
      <div className="intro-y box p-5 mt-5">
        <div className="flex gap-3">
          {/* <select name="" id="" className="form-select w-52">
            <option value="">연도</option>
            <option value="2023">2023년</option>
            <option value="2022">2022년</option>
          </select> */}

          <div className="flex items-center gap-3">
            <Dropdown>
              <DropdownToggle>
                <div className="input-group">
                  <div
                    id="input-group-email"
                    className="input-group-text whitespace-nowrap"
                  >
                    과목
                  </div>
                  <input type="text" className="form-control" value={'화학'} />
                </div>
              </DropdownToggle>
              <DropdownMenu className="w-40">
                <DropdownContent>
                  <DropdownItem>화학</DropdownItem>
                  <DropdownItem>물리</DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>

            <button
              className="btn btn-outline-primary border-dotted"
              onClick={() => {
                SubjectsAddDetail(true)
              }}
            >
              <Lucide icon="Plus" className="w-4 h-4"></Lucide>
            </button>

          </div>

          <div className="flex ml-auto">
            <Link to="/mock_exam_form">
              <button className="btn btn-sky w-24">수정</button>
            </Link>
          </div>
        </div>

        <table className="table table-hover mt-5">
          <tr className="bg-slate-100 text-center">
            <td className="">회차</td>
            <td>과목</td>
            <td>시험일자</td>
            <td>모의고사 유형</td>
            <td>풀이영상</td>
            <td>학습자료</td>
          </tr>
          <tr className="text-center">
            <td>1</td>
            <td>수학</td>
            <td>1월 21일(토)</td>
            <td className="text-left">CMS 전국 연합 종합 모의고사</td>
            <td>
              <div className="flex justify-center">
                <button
                  className="btn btn-outline-primary flex items-center gap-2"
                  onClick={() => {
                    videoDetail(true)
                  }}
                >
                  <Lucide icon="Video" className="w-4 h-4"></Lucide>
                  영상보기
                </button>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <button className="btn btn-outline-pending flex items-center gap-2">
                  <Lucide icon="File" className="w-4 h-4"></Lucide>
                  학습자료
                </button>
              </div>
            </td>
          </tr>
          <tr className="text-center">
            <td>1</td>
            <td>수학</td>
            <td>1월 21일(토)</td>
            <td className="text-left">CMS 전국 연합 종합 모의고사</td>
            <td>
              <div className="flex justify-center">
                <button
                  className="btn btn-outline-primary flex items-center gap-2"
                  onClick={() => {
                    videoDetail(true)
                  }}
                >
                  <Lucide icon="Video" className="w-4 h-4"></Lucide>
                  영상보기
                </button>
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <button className="btn btn-outline-pending flex items-center gap-2">
                  <Lucide icon="File" className="w-4 h-4"></Lucide>
                  학습자료
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>

      {/* BEGIN: Modal 영상보기 */}
      <Modal
        size="modal-xl"
        backdrop=""
        show={video}
        onHidden={() => {
          videoDetail(false)
        }}
      >
        <ModalBody className="video_frame">
          <button
            className="video_x"
            onClick={() => {
              videoDetail(false)
            }}
          >
            <Lucide icon="X" className="w-8 h-8 text-white" />
          </button>
          <iframe
            src="https://www.youtube.com/embed/IB5bcf_tMVE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </ModalBody>
      </Modal>
      {/* END: Modal 영상보기 */}
      
      {/* BEGIN: Modal 과목추가하기 */}
      <Modal
        show={SubjectsAdd}
        onHidden={() => {
          SubjectsAddDetail(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">과목 추가하기</h2>
          <button
            className="btn btn-rounded-secondary hidden sm:flex p-1"
            onClick={() => {
              SubjectsAddDetail(false);
            }}
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center">
            <div className="w-16 shrink-0">과목</div>
            <input type="text" className="form-control w-full" />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ouline-secondary w-24 mr-2"
            onClick={() => {
              SubjectsAddDetail(false);
            }}
          >
            취소
          </button>
          <button type="button" className="btn btn-sky w-24">
            확인
          </button>
        </ModalFooter>
      </Modal>
      {/* END: Modal 과목추가하기 */}
    </>
  )
}

export default MockExam
