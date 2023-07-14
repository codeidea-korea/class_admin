import { Lucide, Litepicker } from '@/base-components'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import request from '@/utils/request'
import $ from "jquery";

function ClassVideoForm({ isCreate }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { register, watch, getValues, setValue, reset, handleSubmit } = useForm(
    {
      defaultValues: {
        teacher_name: '',
        field_name: '',
        subject: searchParams.get('subject'),
        profile: null,
        profile_name: '',
        classVideoScheduleRequests: [
          // {
          //   key: 0,
          //   order_number: 0,
          //   gubun: '주중 B반',
          //   cdate: '1월 3일(화)',
          //   unit: '물질의 상태',
          //   content: '물질, 물질의 상태, 물의 특이한 상태변화, 물의 가열 곡선',
          //   link_url: 'https://www.youtube.com/watch?v=I-w6oYs-_yY',
          // },
        ],
      },
    },
  )

  const { data: videoDetail } = useQuery(
    'getVideoDetail',
    () => request.get(`/admin/content-management/class-video/${id}`),
    {
      enabled: !isCreate,
      onSuccess: (data) => {
        console.log(data)
      },
    },
  )

  const { mutate: createVideo } = useMutation(
    (data) => request.post('/admin/content-management/class-video', data),
    {
      onSuccess: () => {
        setTimeout(function() {
          alert('저장되었습니다.');
          navigate('/classVideo');
        },500)
      },
      onError: () => {
        alert('오류가 발생하였습니다.');
      }
    },
  )

  const null_blob = new Blob(['null'], {type: 'image/png'})
  const null_file = new File([null_blob], 'null.png', {
    type: 'image/png',
  })

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('field_name', '영재학교')
    formData.append('subject', searchParams.get('subject'))
    formData.append('teacher_name', data.teacher_name)
    formData.append('teacher_subject', data.teacher_subject)

    if(isCreate) {
      if (data?.profile?.length > 0 && data?.profile[0]) {
        // 새로 추가된 파일이 있으면
        formData.append('profile', data.profile[0]);
      }
    }

    data.classVideoScheduleRequests.map((item) => {
      formData.append('order_number', item.order_number)
      formData.append('gubun', item.gubun)
      formData.append('cdate', item.cdate)
      formData.append('unit', item.unit)
      formData.append('content', item.content)
      formData.append('link_url', item.link_url)

      if (item.file && item.file.length) {
        formData.append('file', item.file[0])

      }else {
        formData.append('file', null_file)
        // newFileDelYN.push('N')
      }
    })

    // createVideo(formData)
  }

  // + 버튼 클릭
  const handleAddSchedule = () => {
    /*
    * 기존에 하던 방식대로 하면 자꾸 이전 파일들이 사라짐
    * 대충 원인은 알겠으나 해결 방법을 모르겠음
    * 그냥 첫번째 객체 복사하고 초기화 하는 방법으로 대체했음..
    */

    let origin = getValues('classVideoScheduleRequests');
    let copy = {};

    for(let key in origin[0]) {
      copy[key] = origin[0][key];
    }

    copy['file'] = new DataTransfer().files;
    copy['order_number'] = '';
    copy['gubun'] = '';
    copy['cdate'] = getToday();
    copy['unit'] = '';
    copy['content'] = '';
    copy['link_url'] = '';

    origin.push(copy);
    setValue('classVideoScheduleRequests',origin);
  }

  // 뭐지
  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    setValue('profile_name', file.name)
    reader.readAsDataURL(file)
    reader.onload = () => {
      setValue('profile', reader.result.split(',')[1])
    }
  }

  // 삭제 버튼 클릭
  const handleDeleteVideo = (index) => {
    if (confirm('삭제하시겠습니까?')) {
      let origin = getValues('classVideoScheduleRequests');
      origin.splice(index,1);
      setValue('classVideoScheduleRequests', origin);
    }
  }

  function getToday(){
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium flex items-center">
            영재학교
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            {searchParams.get('subject')}
          </div>
        </div>
        <div className="intro-y p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <div className="font-medium  w-36 text-left shrink-0">
                선생님 이름 <span className="text-danger">*</span>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control w-72"
                  {...register('teacher_name', { required: true })}
                />
              </div>
            </div>
            <hr className="border-t border-dotted" />
            <div className="flex items-center">
              <div className="font-medium  w-36 text-left shrink-0">
                과목 <span className="text-danger">*</span>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control w-72"
                  {...register('teacher_subject', { required: true })}
                />
              </div>
            </div>
            <hr className="border-t border-dotted" />
            <div className="flex items-center">
              <div className="font-medium w-36 text-left shrink-0">
                선생님 프로필
              </div>
              <div className="dorp_w-full w-full">
                <div className="input-group w-72">
                  <input
                    type="file"
                    className="form-control"
                    {...register('profile')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="intro-y p-5 box mt-5">
        <table className="table table-hover">
          <thead>
            <tr className="bg-slate-100 text-center">
              <td>차시</td>
              <td>수업구분</td>
              <td>수업일자</td>
              <td>단원</td>
              <td>학습 내용</td>
              <td>영상학습URL</td>
              <td>학습자료</td>
              <td>삭제</td>
            </tr>
          </thead>
          <tbody>
            {watch('classVideoScheduleRequests')?.map((item, index) => (
              <tr className="text-center" key={`list-${index}`}>
                <td>
                  <div className="input-group w-28">
                    <input
                      type="number"
                      className="form-control"
                      {...register(
                        `classVideoScheduleRequests.${index}.order_number`,
                      )}
                    />
                    <div
                      id="input-group-price"
                      className="input-group-text whitespace-nowrap"
                    >
                      차시
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    {...register(`classVideoScheduleRequests.${index}.gubun`)}
                  />
                </td>
                <td>
                  <Litepicker
                    value={item.cdate}
                    className="form-control"
                    onChange={(value) => {
                      const newList = [
                        ...getValues('classVideoScheduleRequests'),
                      ]
                      newList[index].cdate = value
                      setValue('classVideoScheduleRequests',newList)
                    }}
                    options={{
                      numberOfMonths: 1,
                      format: 'YYYY-MM-DD',
                      dropdowns: {
                        minYear: 1950,
                        maxYear: null,
                        months: true,
                        years: true,
                      },
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    {...register(`classVideoScheduleRequests.${index}.unit`)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    {...register(`classVideoScheduleRequests.${index}.content`)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    {...register(
                      `classVideoScheduleRequests.${index}.link_url`,
                    )}
                  />
                </td>
                <td>
                  <div className="input-group">
                    <input
                      type="file"
                      className="dp_none"
                      id={`file-upload-${index}`}
                      {...register(
                        `classVideoScheduleRequests.${index}.file`,
                      )}
                    />
                    <label htmlFor={`file-upload-${index}`} className="flex items-center">
                      <input
                        type="text"
                        className="form-control file_up bg-white"
                        placeholder=""
                        value={item?.file.length > 0 ? item?.file[0]?.name : ''}
                        readOnly
                      />
                      <div className="input-group-text whitespace-nowrap file_up_btn">
                        찾기
                      </div>
                    </label>
                  </div>
                </td>
                {index !== 0 && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger bg-white btn-sm whitespace-nowrap"
                      onClick={() => handleDeleteVideo(index)}
                    >
                      삭제
                    </button>
                  </td>
                )}
              </tr>
            ))}
            <tr>
              <td colSpan={8} className="text-center">
                <button
                  type="button"
                  className="btn btn-outline-primary border-dotted"
                  onClick={handleAddSchedule}
                >
                  <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex mt-3 justify-center">
          <div className="flex gap-2">
            <Link to="/classVideo">
              <button className="btn bg-white w-24" type="button">
                취소
              </button>
            </Link>
            <button className="btn btn-sky w-24">저장하기</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ClassVideoForm
