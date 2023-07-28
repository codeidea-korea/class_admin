import {ClassicEditor, Lucide} from '@/base-components'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {useMutation, useQuery} from 'react-query'
import Loading from '@/components/loading'
import request from '@/utils/request'

function ProfitEdit({ isCreate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { watch, reset, register, setValue, getValues, handleSubmit } = useForm()

  const { mutate: createProfit, isLoading: isCreateProfit } = useMutation(
    (data) => {
      if (isCreate) {
        request.post('/admin/content-management/benefit', data)
      } else {
        request.put(`/admin/content-management/benefit/${id}`, data)
      }
    },
    {
      onSuccess: () => {
        alert(isCreate ? '등록되었습니다.' : '수정되었습니다.');
        navigate('/profit')
      },
    },
  )

  const { data: profitData, isLoading: isProfitData } = useQuery(
    'getProfitData',
    () => request.get(`/admin/content-management/benefit/${id}`),
    {
      enabled: !isCreate,
      onSuccess: (data) => {
        data.topYN = data.topYN === 'Y'
        reset((prev) => ({
          ...prev,
          ...data,
        }))
      },
    },
  )

  const onSubmit = (data) => {
    const newForm = new FormData();

    if(!isCreate) {
      if(data.fileId > 0 && (data.fileName === '' || !data.fileName)) {
        // 기존 파일이 있었는데 제거한 경우
        newForm.append('savedProfileDelYN', 'Y')

      }else {
        newForm.append('savedProfileDelYN', 'N')
      }
    }

    if (data.file[0]) {
      //신규 등록 파일이 있는 경우
      newForm.append('file', data.file[0])
    }

    newForm.append('title', data.title)
    newForm.append('topYN', data.topYN ? 'Y' : 'N')
    newForm.append('content', data.content)
    createProfit(newForm)
  }

  return (
    <>
      <div className="intro-y box mt-5 relative">
        {isCreateProfit && <Loading />}
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">혜택</div>
        </div>
        <div className="intro-y p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="flex items-center">
                <div className="font-medium  w-36 text-center shrink-0">
                  제목
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control w-72"
                    {...register('title')}
                  />
                </div>
                <div className="form-check ml-4">
                  <input
                    id="checkbox-switch-1"
                    className="form-check-input"
                    type="checkbox"
                    {...register('topYN')}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="checkbox-switch-1"
                  >
                    상단 고정
                  </label>
                </div>
              </div>
              <hr className="border-t border-dotted" />
              <div className="flex items-center">
                <div className="font-medium w-36 text-center shrink-0">
                  첨부파일
                </div>
                <div className="dorp_w-full w-full">
                  {watch('fileName') ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${profitData?.fileId}`}
                        className="underline text-blue"
                      >
                        {watch('fileName')}
                      </a>
                      <Lucide
                        icon="X"
                        className="w-4 h-4 text-danger cursor-pointer"
                        onClick={() => {
                          reset((prev) => ({
                            ...prev,
                            fileName: '',
                          }))
                        }}
                      ></Lucide>
                    </div>
                  ) : (
                    <input
                      type="file"
                      className="form-control"
                      {...register('file')}
                    />
                  )}
                </div>
              </div>
              <hr className="border-t border-dotted" />
              <div className="flex items-center ck_w-full">
                <div className="font-medium w-36 text-center shrink-0">
                  내용
                </div>
                <ClassicEditor
                  value={watch('content')}
                  onChange={(value) => setValue('content', value)}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-center mt-3">
              <Link to="/profit">
                <button className="btn bg-white w-24">취소</button>
              </Link>
              <button className="btn btn-sky w-24">확인</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProfitEdit
