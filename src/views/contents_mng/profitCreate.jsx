import { ClassicEditor } from '@/base-components'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Loading from '@/components/loading'
import request from '@/utils/request'

function ProfitEdit() {
  const navigate = useNavigate()
  const { register, setValue, handleSubmit } = useForm()

  const { mutate: createProfit, isLoading: isCreateProfit } = useMutation(
    (data) => request.post('/admin/content-management/benefit', data),
    {
      onSuccess: () => {
        navigate('/profit')
      },
    },
  )

  const onSubmit = (data) => {
    const newForm = new FormData()
    if (data.file[0]) {
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
          <div className="text-lg font-medium">공지사항</div>
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
                  <input
                    type="file"
                    className="form-control"
                    {...register('file')}
                  />
                </div>
              </div>
              <hr className="border-t border-dotted" />
              <div className="flex items-center ck_w-full">
                <div className="font-medium w-36 text-center shrink-0">
                  내용
                </div>
                <ClassicEditor
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
