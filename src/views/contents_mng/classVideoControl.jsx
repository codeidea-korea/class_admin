import { Dropzone, Lucide } from '@/base-components'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import request from '@/utils/request'

function ClassVideoForm({ isCreate }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { register, watch, getValues, setValue, handleSubmit } = useForm({
    defaultValues: {
      teacher_name: '',
      field_name: '',
      subject: searchParams.get('subject'),
      profile: null,
      profile_name: '',
      classVideoScheduleRequests: [
        {
          key: 0,
          order_number: 0,
          gubun: '주중 B반',
          cdate: '1월 3일(화)',
          unit: '물질의 상태',
          content: '물질, 물질의 상태, 물의 특이한 상태변화, 물의 가열 곡선',
          link_url: 'https://www.youtube.com/watch?v=I-w6oYs-_yY',
        },
      ],
    },
  })

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
        alert('등록 완료')
        navigate('/classVideo')
      },
    },
  )

  const onSubmit = (data) => {
    createVideo(data)
  }

  const handleAddSchedule = () => {
    const newSchedule = {
      key: getValues('classVideoScheduleRequests').length,
      order_number: 0,
      gubun: '',
      cdate: '',
      unit: '',
      content: '',
      link_url: '',
    }
    setValue('classVideoScheduleRequests', [
      ...getValues('classVideoScheduleRequests'),
      newSchedule,
    ])
  }

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    setValue('profile_name', file.name)
    reader.readAsDataURL(file)
    reader.onload = () => {
      setValue('profile', reader.result.split(',')[1])
    }
  }

  const handleDeleteVideo = (index) => {
    if (confirm('삭제하시겠습니까?')) {
      const newVideoList = getValues('classVideoScheduleRequests').filter(
        (item, i) => i !== index,
      )
      setValue('classVideoScheduleRequests', newVideoList)
    }
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
              <div className="font-medium w-36 text-left shrink-0">
                선생님 프로필
              </div>
              <div className="dorp_w-full w-full">
                <div className="input-group w-72">
                  <input
                    type="file"
                    className="dp_none"
                    id="file-upload"
                    onChange={handleChangeFile}
                  />
                  <label htmlFor="file-upload" className="flex items-center">
                    <input
                      type="text"
                      className="form-control file_up bg-white"
                      placeholder=""
                      value={watch('profile_name')}
                      readOnly
                    />
                    <div className="input-group-text whitespace-nowrap file_up_btn">
                      파일찾기
                    </div>
                  </label>
                </div>
                {/* <Dropzone
                  getRef={(el) => {
                    dropzoneMultipleRef.current = el
                  }}
                  options={{
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    dictRemoveFile: '삭제',
                    addRemoveLinks: true,
                    headers: { 'My-Awesome-Header': 'header value' },
                  }}
                  className="dropzone"
                >
                  <div className="text-lg font-medium">
                    파일 드래그 또는 클릭후 업로드 해주세요.
                  </div>
                  <div className="text-gray-600 text-sm">
                    5MB 미만의 파일만 첨부가 가능합니다.(PNG, GIF, JPG만 가능)
                  </div>
                </Dropzone> */}
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
            {watch('classVideoScheduleRequests').map((item, index) => (
              <tr className="text-center" key={item.key}>
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
                  <input
                    type="text"
                    className="form-control"
                    {...register(`classVideoScheduleRequests.${index}.cdate`)}
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
                    />
                    <label htmlFor="file-upload" className="flex items-center">
                      <input
                        type="text"
                        className="form-control file_up bg-white"
                        placeholder=""
                        readOnly
                      />
                      <div className="input-group-text whitespace-nowrap file_up_btn">
                        파일찾기
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
