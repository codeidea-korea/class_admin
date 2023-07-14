import { Lucide } from '@/base-components'
import { Link } from 'react-router-dom'

import Default_img from '@/assets/images/default_image.jpg'
import Person from '@/assets/images/img02.png'

import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'

function ClassVideo() {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL;

  const { data: videoList } = useQuery(
    'getVideoList',
    () => request.get('/admin/content-management/class-video'),
    {
      select: (data) => ({
        mathematics: data?.classVideoList?.filter(item => item.subject === '수학'),
        science: data?.classVideoList?.filter(item => item.subject === '과학')
      }),
      onSuccess: (data) => {
        console.log(data)
      }
    },
  )
  return (
    <>
      <div className="flex gap-2 mt-5">
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          영재원
        </button>
        <Link to="/classVideo">
          <button className="btn btn-primary w-36">영재학교</button>
        </Link>
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          과학고
        </button>
      </div>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">수학(Mathmetic)</div>
        </div>
        <div className="intro-y p-5">
          <ul className="gall_ul curriculum">
            {videoList?.mathematics?.map(
              (item, key) => (
                <li key={`video-${key}`}>
                  <div className="inner">
                    <div className="subject">
                      {item.teacher_name} 선생님
                      <span className="sub">{item.teacher_subject}</span>
                    </div>
                    <div className="thumb">
                      {item?.fileId ? (
                        <img
                          src={`${baseUrl}/v1/contents-data/file-download/${item?.fileId}`}
                          className="rounded-md"
                        />
                      ) : (
                        <img src={Default_img} className="rounded-md" />
                      )}
                    </div>
                    <div className="btnSet w-full">
                      <Link to={`/classVideo/${item.id}?subject=${item.subject}`} className="w-full">
                        <button className="btn btn-sky w-full rounded-full">
                          영상 학습하기
                          <Lucide
                            icon="ChevronRight"
                            className="w-4 h-4"
                          ></Lucide>
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              ),
            )}
            <li className="add zoom-in">
              <Link to="/classVideo/create?subject=수학" className="">
                <Lucide icon="Plus" className="w-10 h-10"></Lucide>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">과학(Science)</div>
        </div>
        <div className="intro-y p-5">
          <ul className="gall_ul curriculum">
            {videoList?.science?.map((item, key) => (
              <li key={`sub-${key}`}>
                <div className="inner">
                  <div className="subject">
                    {item.teacher_name} 선생님<span className="sub">{item.teacher_subject}</span>
                  </div>
                  <div className="thumb">
                    {item?.fileId ? (
                      <img
                        src={`${baseUrl}/v1/contents-data/file-download/${item?.fileId}`}
                        className="rounded-md"
                      />
                    ) : (
                      <img src={Default_img} className="rounded-md" />
                    )}
                  </div>
                  <div className="btnSet">
                    <Link to={`/classVideo/${item.id}?subject=${item.subject}`} className="w-full">
                      <button className="btn btn-sky w-full rounded-full">
                        영상 학습하기
                        <Lucide
                          icon="ChevronRight"
                          className="w-4 h-4"
                        ></Lucide>
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
            <li className="add zoom-in">
              <Link to="/classVideo/create?subject=과학" className="">
                <Lucide icon="Plus" className="w-10 h-10"></Lucide>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ClassVideo
