import {
  Lucide,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@/base-components'
import { Link } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { useQuery, useMutation } from 'react-query'
import {useForm, useWatch} from 'react-hook-form'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import request from '@/utils/request'
import $ from "jquery";
import Loading from "@/components/loading";

function CurriculumCreate({ isCreate }) {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL;
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [delDataWeekList, setDelDataWeekList] = useState([])
  const [delDataWeekendList, setDelDataWeekendList] = useState([])
  const [isOgFile, setIsOgFile] = useState(false);
  const { register, watch, getValues, setValue, reset, resetField, handleSubmit } = useForm(
    {
      defaultValues: {
        teacher_name: '',
        field_name: '',
        teacher_subject: '',
        profileId: '',
        profileName: '',
        teacher_url: '',
        scheduleWeeks: [],
        scheduleWeekends: [],
      },
    },
  )

  // 수정시 상세정보 불러오기
  const { data: curriculumDetail } = useQuery(
    'getCurriculum',
    () => request.get(`/admin/content-management/curriculum/${id}`),
    {
      enabled: !isCreate,
      onSuccess: (data) => {
        reset(() => ({
          teacher_name : data.teachers.teacher_name,
          field_name: data.teachers.field_name,
          teacher_subject: data.teachers.teacher_subject,
          profileId: data.teachers.profileId,
          profileName: data.teachers.profileName,
          teacher_url : data.teachers.teacher_url,
          scheduleWeeks : data.scheduleWeeks,
          scheduleWeekends : data.scheduleWeekends
        }))

        // 기존 파일이 있는지 없는지 확인하는 변수
        data.teachers?.profileId && setIsOgFile(true);
      },
    },
  )

  const { mutate: createCurriculum, isLoading: isCreateCurriculum } = useMutation(
    (data) => {
      if (isCreate) {
        // 추가
        request.post('/admin/content-management/curriculum', data)
      } else {
        // 수정
        request.put(`/admin/content-management/curriculum/${id}`, data)
      }
    },
    {
      onSuccess: (data) => {
        alert(isCreate ? '등록되었습니다.' : '수정되었습니다.');
        navigate('/curriculum');
      },
    },
  )

  const onSubmit = (data) => {
    const formData = new FormData();

    // 선생님 기본 정보
    formData.append('field_name', searchParams.get('fieldName'))
    formData.append('subject', searchParams.get('subject'))
    formData.append('teacher_subject', data.teacher_subject)
    formData.append('teacher_name', data.teacher_name)
    formData.append('teacher_url', data.teacher_url)

    // 선생님 프로필 사진 파일
    if(isCreate) {
      // 등록이면
      if (data.profileId[0]) {
        // 새로 추가된 파일이 있으면
        formData.append('profile', data.profileId[0]);
      }

    }else {
      // 수정이면
      const tempLength = data?.profileId?.length;

      if(tempLength === 1) {
        // 새로 추가한 파일이 있는 경우
        formData.append('profile', data.profileId[0]);
        // 기존에 등록된 파일이 있으면
        isOgFile && formData.append('savedProfileDelYN', 'Y');

      }else if(tempLength === 0) {
        // 새로 추가한 파일은 없는데 등록된 파일을 제거한 경우
        formData.append('savedProfileDelYN', 'Y');

      }else {
        // 새로 추가한 파일도 없고 등록된 파일도 그대로일 경우
        formData.append('savedProfileDelYN', 'N');
      }
    }

    // 주중 수업 삭제
    delDataWeekList.map((item) => {
      formData.append('week_id', item.id ?? 0)
      formData.append('week_month', item.month)
      formData.append('week_order_number', item.order_number)
      formData.append('week_textbook', item.textbook)
      formData.append('week_objective', item.objective)
      formData.append('week_content', item.content)
      formData.append('week_delYN', 'Y')
    })

    // 주말 수업 삭제
    delDataWeekendList.map((item) => {
      formData.append('weekend_id', item.id ?? 0)
      formData.append('weekend_month', item.month)
      formData.append('weekend_order_number', item.order_number)
      formData.append('weekend_textbook', item.textbook)
      formData.append('weekend_objective', item.objective)
      formData.append('weekend_content', item.content)
      formData.append('weekend_delYN', 'Y')
    })

    // 주중 수업 상세 커리큘럼
    data.scheduleWeeks.map((item) => {
      formData.append('week_id', item.id ?? 0)
      formData.append('week_month', item.month)
      formData.append('week_order_number', item.order_number)
      formData.append('week_textbook', item.textbook)
      formData.append('week_objective', item.objective)
      formData.append('week_content', item.content)
      formData.append('week_delYN', 'N')
    })

    // 주말 수업 상세 커리큘럼
    data.scheduleWeekends.map((item) => {
      formData.append('weekend_id', item.id ?? 0)
      formData.append('weekend_month', item.month)
      formData.append('weekend_order_number', item.order_number)
      formData.append('weekend_textbook', item.textbook)
      formData.append('weekend_objective', item.objective)
      formData.append('weekend_content', item.content)
      formData.append('weekend_delYN', 'N')
    })

    createCurriculum(formData)
  }

  // 주중, 주말 수업 상세 커리큘럼 하단 + 버튼 클릭 이벤트
  const handleAddSchedule = (type) => {
    const newSchedule = {
      key: getValues(type).length,
      month: '',
      order_number: '',
      textbook: '',
      objective: '',
      content: '',
    }
    setValue(type, [
      ...getValues(type),
      newSchedule
    ]);

    if(type === 'scheduleWeekends') {
      // resetField('scheduleWeekends', { keepError: true })
    }
  }

  // 삭제 버튼 클릭
  const handleDeleteVideo = (idx, item, flagStr) => {
    if (confirm('삭제하시겠습니까?')) {
      if(flagStr === 'week') {
        let origin = getValues('scheduleWeeks');
        origin.splice(idx,1);
        setValue('scheduleWeeks', origin);

        setDelDataWeekList([...delDataWeekList, item])

      } else {
        let origin = getValues('scheduleWeekends');
        origin.splice(idx,1);
        setValue('scheduleWeekends', origin);

        setDelDataWeekendList([...delDataWeekendList, item])
      }
    }
  }

  return (
    <>
      { isCreateCurriculum && <Loading /> }
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
                    {watch('profileName') ? (
                      <div className="flex items-center gap-2">
                        <a
                          href={`${baseUrl}/v1/contents-data/file-download/${watch('profileId')}`}
                          className="underline text-blue"
                        >
                          {watch('profileName')}
                        </a>
                        <Lucide
                          icon="X"
                          className="w-4 h-4 text-danger cursor-pointer"
                          onClick={() => {
                            reset((prev) => ({
                              ...prev,
                              profileId: '',
                              profileName: '',
                            }))
                          }}
                        ></Lucide>
                      </div>
                    ) : (
                      <input
                        type="file"
                        className="form-control"
                        accept="image/gif, image/jpeg, image/png"
                        {...register('profileId', { required: false })}
                      />
                    )}
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

        <div className="intro-y p-5 box mt-5" id="tab-list-div">
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
                    <td>삭제</td>
                  </tr>
                  </thead>
                  <tbody>
                  {watch('scheduleWeeks')?.map((item, index) => (
                    <tr
                      className="text-center"
                      key={`scheduleWeeks-${index}`}
                    >
                      <td>
                        <div className="input-group w-24">
                          <input
                            type="number"
                            className="form-control"
                            {...register(
                              `scheduleWeeks.${index}.month`, { required: true }
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
                              `scheduleWeeks.${index}.order_number`,{ required: true }
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
                            `scheduleWeeks.${index}.textbook`,{ required: true }
                          )}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          {...register(
                            `scheduleWeeks.${index}.objective`,{ required: true }
                          )}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control w-96"
                          {...register(
                            `scheduleWeeks.${index}.content`,{ required: true }
                          )}
                        />
                      </td>
                      <td>
                        {index >= 0 &&
                          <button
                            type="button"
                            className='btn btn-outline-danger bg-white btn-sm whitespace-nowrap'
                            onClick={() => handleDeleteVideo(index, item, 'week')}
                          >
                            삭제
                          </button>
                        }
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className="text-center">
                      <button
                        className="btn btn-outline-primary border-dotted"
                        type="button"
                        onClick={() => handleAddSchedule('scheduleWeeks')}
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
                    <td>삭제</td>
                  </tr>
                  </thead>
                  <tbody>
                  {watch('scheduleWeekends')?.map((item, index) => (
                    <tr
                      className="text-center"
                      key={`scheduleWeekends-${index}`}
                    >
                      <td>
                        <div className="input-group w-24">
                          <input
                            type="number"
                            className="form-control"
                            {...register(
                              `scheduleWeekends.${index}.month`,{ required: true }
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
                              `scheduleWeekends.${index}.order_number`,{ required: true }
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
                            `scheduleWeekends.${index}.textbook`,{ required: true }
                          )}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          {...register(
                            `scheduleWeekends.${index}.objective`,{ required: true }
                          )}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control w-96"
                          {...register(
                            `scheduleWeekends.${index}.content`,{ required: true }
                          )}
                        />
                      </td>
                      <td>
                        {index >= 0 &&
                          <button
                            type="button"
                            className='btn btn-outline-danger bg-white btn-sm whitespace-nowrap'
                            onClick={() => handleDeleteVideo(index, item, 'weekend')}
                          >
                            삭제
                          </button>
                        }
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className="text-center">
                      <button
                        className="btn btn-outline-primary border-dotted"
                        type="button"
                        onClick={() => handleAddSchedule('scheduleWeekends')}
                      >
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
              {
                isCreate ? (
                  <button className="btn btn-sky w-24">추가하기</button>
                ) : (
                  <button type="submit" className="btn btn-sky w-24">수정하기</button>
                )
              }
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default CurriculumCreate
