import { Lucide, Modal, ModalBody } from '@/base-components'
import { Link, useNavigate ,useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Default_img from '@/assets/images/default_image.jpg'
import Loading from '@/components/loading'
import Person from '@/assets/images/img02.png'
import { useQuery } from 'react-query'
import request from '@/utils/request'

function CurriCulum() {
  const url = useLocation().search;
  const navigate = useNavigate();
  const cuCurTab = sessionStorage.getItem('cuCurTab') == null ? '영재학교' : sessionStorage.getItem('cuCurTab')
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL
  const [video, videoDetail] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')
  const [fieldName, setFieldName] = useState('')

  useEffect(()=>{
    if(url=="?sch"){
      setFieldName('과학고')
    }else{
      setFieldName('영재학교')
    }
  },[url])

  const { data: curriculumList, isLoading: isGetCurriculumList } = useQuery(
    ['getCurriculum', fieldName],
    () => request.get(`/admin/content-management/curriculum?fieldName=${fieldName}`),
    {
      select: (data) => ({
        mathematics: data?.contentCurriculumTeacherList?.filter(item => item.subject === '수학'),
        science: data?.contentCurriculumTeacherList?.filter(item => item.subject === '과학'),
      }),
    },
  )

  // 학습 전략 영상 보기 버튼 클릭시 비디오 경로 설정 및 모달 노출
  const setVideo = (src) => {
    let videoSrc = src.split('watch?v=')
    videoSrc = videoSrc.length < 2 ? '' : 'https://www.youtube.com/embed/' + videoSrc[1]
    setVideoSrc(videoSrc)
    videoDetail(true)
  }

  return (
    <>
      <div className='flex gap-2 mt-5'>
        <button className={'btn w-36' + (fieldName === '영재원' ? ' btn-primary' : ' bg-white')} onClick={() => {
          alert('준비중입니다.')
          {/*setFieldName('영재원')
            sessionStorage.setItem('cuCurTab', '영재원')
            // 영재원 탭 사용시 navigate 추가와 위에 url 변경시 탭 수정 필요
          */}
        }}>영재원
        </button>
        <button className={'btn w-36' + (fieldName === '영재학교' ? ' btn-primary' : ' bg-white')} onClick={() => {
          setFieldName('영재학교')
          sessionStorage.setItem('cuCurTab', '영재학교')
          navigate('')
        }
        }>영재학교
        </button>
        <button className={'btn w-36' + (fieldName === '과학고' ? ' btn-primary' : ' bg-white')} onClick={() => {
          {/*alert('준비중입니다.');*/
          }
          setFieldName('과학고')
          sessionStorage.setItem('cuCurTab', '과학고')
          navigate('?sch')
        }}>과학고
        </button>
      </div>

      <div className='intro-y box mt-5 relative'>
        {isGetCurriculumList && <Loading />}
        <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
          <div className='text-lg font-medium'>수학(Mathmetic)</div>
        </div>
        <div className='intro-y p-5'>
          <ul className='gall_ul curriculum'>
            {curriculumList?.mathematics?.map(
              (item) => (
                <li key={item.id}>
                  <div className='inner'>
                    <div className='subject'>
                      {item.teacher_name} 선생님
                      <span className='sub'>{item.teacher_subject}</span>
                    </div>
                    <div className='thumb'>
                      {item?.profileId ? (
                        <img src={`${baseUrl}/v1/contents-data/file-download/${item?.profileId}`} />
                      ) : (
                        <img src={Default_img} />
                      )}
                    </div>
                    <div className='btnSet'>
                      <button
                        className='btn btn-sky w-full rounded-full'
                        onClick={() => {
                          setVideo(item.teacher_url)
                        }}
                      >
                        학습 전략 영상 보기
                        <Lucide
                          icon='ChevronRight'
                          className='w-4 h-4'
                        ></Lucide>
                      </button>
                      <Link
                        // to={`/curriculum_view?subject=${item.subject}`}
                        to={`/curriculum/${item.id}?subject=${item.subject}`}
                        className='w-full'
                      >
                        <button className='btn btn-secondary  w-full rounded-full'>
                          상세 커리큘럼 보기
                          <Lucide
                            icon='ChevronRight'
                            className='w-4 h-4'
                          ></Lucide>
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              ),
            )}
            <li className='add zoom-in'>
              <Link to={`/curriculum/create?subject=수학&fieldName=${fieldName}`} className=''>
                <Lucide icon='Plus' className='w-10 h-10'></Lucide>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='intro-y box mt-5 relative'>
        {isGetCurriculumList && <Loading />}
        <div className='p-3 px-5 flex items-center border-b border-slate-200/60'>
          <div className='text-lg font-medium'>과학(Science)</div>
        </div>
        <div className='intro-y p-5'>
          <ul className='gall_ul curriculum'>
            {curriculumList?.science?.map((item) => (
              <li key={item.id}>
                <div className='inner'>
                  <div className='subject'>
                    {item.teacher_name} 선생님
                    <span className='sub'>{item.teacher_subject}</span>
                  </div>
                  <div className='thumb'>
                    {item?.profileId ? (
                      <img src={`${baseUrl}/v1/contents-data/file-download/${item?.profileId}`} />
                    ) : (
                      <img src={Default_img} />
                    )}
                  </div>
                  <div className='btnSet'>
                    <button
                      className='btn btn-sky w-full rounded-full'
                      onClick={() => {
                        setVideo(item.teacher_url)
                      }}
                    >
                      학습 전략 영상 보기
                      <Lucide icon='ChevronRight' className='w-4 h-4'></Lucide>
                    </button>
                    <Link
                      to={`/curriculum/${item.id}?subject=${item.subject}`}
                      className='w-full'
                    >
                      <button className='btn btn-secondary  w-full rounded-full'>
                        상세 커리큘럼 보기
                        <Lucide
                          icon='ChevronRight'
                          className='w-4 h-4'
                        ></Lucide>
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
            <li className='add zoom-in'>
              <Link to={`/curriculum/create?subject=과학&fieldName=${fieldName}`} className=''>
                <Lucide icon='Plus' className='w-10 h-10'></Lucide>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BEGIN: Modal 영상보기 */}
      <Modal
        size='modal-xl'
        backdrop=''
        show={video}
        onHidden={() => {
          videoDetail(false)
        }}
      >
        <ModalBody className='video_frame'>
          <button
            className='video_x'
            onClick={() => {
              videoDetail(false)
            }}
          >
            <Lucide icon='X' className='w-8 h-8 text-white' />
          </button>
          <iframe
            src={videoSrc}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </ModalBody>
      </Modal>
      {/* END: Modal 영상보기 */}
    </>
  )
}

export default CurriCulum
