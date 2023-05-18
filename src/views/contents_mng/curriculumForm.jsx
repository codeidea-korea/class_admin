import {
  Lucide,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@/base-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import request from '@/utils/request'

function CurriculumForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { register, watch, getValues, setValue, reset, handleSubmit } = useForm(
    {
      defaultValues: {
        teacher_name: '',
        field_name: '',
        subject: '',
        profile: '',
        profile_name: '',
        curriculumWeekday: [],
      },
    },
  )
  const { mutate: createVideo } = useMutation(
    (data) => request.post('/admin/content-management/curriculum', data),
    {
      onSuccess: () => {
        alert('등록 완료')
        navigate('/classVideo')
      },
    },
  )

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('field_name', '영재학교')
    formData.append('subject', searchParams.get('subject'))
    formData.append('teacher_name', data.teacher_name)
    formData.append('teacher_url', data.teacher_url)
    data.curriculumWeekday.map((item) => {
      formData.append('week_month', item.week_month)
      formData.append('week_order_number', item.week_order_number)
      formData.append('week_textbook', item.week_textbook)
      formData.append('week_objective', item.week_objective)
      formData.append('week_content', item.week_content)
    })
    console.log(formData)
    createVideo(formData)
  }

  const handleAddSchedule = () => {
    const newSchedule = {
      key: getValues('curriculumWeekday').length,
      week_month: '',
      week_order_number: '',
      week_textbook: '',
      week_objective: '',
      week_content: '',
    }
    setValue('curriculumWeekday', [
      ...getValues('curriculumWeekday'),
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
              <div className="font-medium  w-36 text-left shrink-0">
                과목 <span className="text-danger">*</span>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control w-72"
                  {...register('subject', { required: true })}
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
                    {...register('profile_name')}
                  />
                </div>
              </div>
            </div>
            <hr className="border-t border-dotted" />
            <div className="flex items-center">
              <div className="font-medium  w-36 text-left shrink-0">
                선생님 URL
              </div>
              <div>
                <input
                  type="text"
                  className="form-control w-72"
                  {...register('teacher_url', { required: true })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="intro-y p-5 box mt-5">
        <TabGroup>
          <TabList className="nav-boxed-tabs gap-3 w-1/3">
            <Tab
              className="w-full py-2 order border-slate-200 bg-white"
              tag="button"
            >
              주중 수업 상세 커리큘럼
            </Tab>
            <Tab
              className="w-full py-2 border border-slate-200 bg-white"
              tag="button"
            >
              주말 수업 상세 커리큘럼
            </Tab>
          </TabList>
          <TabPanels className="mt-5">
            <TabPanel className="leading-relaxed">
              <table className="table table-hover">
                <thead>
                  <tr className="bg-slate-100 text-center">
                    <td>월</td>
                    <td>차시</td>
                    <td>교재</td>
                    <td>학습목표</td>
                    <td>학습 단원 및 내용</td>
                  </tr>
                </thead>
                <tbody>
                  {watch('curriculumWeekday').map((item, index) => (
                    <tr
                      className="text-center"
                      key={`curriculumWeekday-${index}`}
                    >
                      <td>
                        <div className="input-group w-24">
                          <input
                            type="number"
                            className="form-control"
                            {...register(
                              `curriculumWeekday.${index}.week_month`,
                            )}
                          />
                          <div
                            id="input-group-price"
                            className="input-group-text"
                          >
                            월
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="input-group w-28">
                          <input
                            type="number"
                            className="form-control"
                            {...register(
                              `curriculumWeekday.${index}.week_order_number`,
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
                          {...register(
                            `curriculumWeekday.${index}.week_textbook`,
                          )}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          {...register(
                            `curriculumWeekday.${index}.week_objective`,
                          )}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control w-96"
                          {...register(
                            `curriculumWeekday.${index}.week_content`,
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="text-center">
                      <button
                        className="btn btn-outline-primary border-dotted"
                        type="button"
                        onClick={handleAddSchedule}
                      >
                        <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabPanel>
            <TabPanel className="leading-relaxed">
              <table className="table table-hover">
                <thead>
                  <tr className="bg-slate-100 text-center">
                    <td>월</td>
                    <td>차시</td>
                    <td>교재</td>
                    <td>학습목표</td>
                    <td>학습 단원 및 내용</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td>
                      <div className="input-group w-24">
                        <input type="number" className="form-control" />
                        <div
                          id="input-group-price"
                          className="input-group-text"
                        >
                          월
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="input-group w-28">
                        <input type="number" className="form-control" />
                        <div
                          id="input-group-price"
                          className="input-group-text whitespace-nowrap"
                        >
                          차시
                        </div>
                      </div>
                    </td>
                    <td>
                      <input type="text" className="form-control" />
                    </td>
                    <td>
                      <input type="text" className="form-control" />
                    </td>
                    <td>
                      <input type="text" className="form-control w-96" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="text-center">
                      <button className="btn btn-outline-primary border-dotted">
                        <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        <div className="flex mt-3 justify-center">
          <div className="flex gap-2">
            <Link to="/curriculum">
              <button className="btn bg-white w-24" type="button">
                취소
              </button>
            </Link>
            <button className="btn btn-sky w-24">추가하기</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CurriculumForm
