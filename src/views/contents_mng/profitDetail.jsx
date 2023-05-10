import { Link, useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'
import Loading from '@/components/loading'

function ProfitView() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: profitData, isLoading: isProfitData } = useQuery(
    'getProfitData',
    () => request.get(`/admin/content-management/benefit/${id}`),
  )

  const { mutate: deleteProfit, isLoading: isDeleteProfit } = useMutation(
    (id) =>
      request.delete(`/admin/content-management/benefit`, {
        params: {
          ids: id,
        },
      }),
    {
      onSuccess: () => {
        navigate('/profit')
      },
    },
  )

  const handleDelete = (id) => {
    if (confirm('삭제하시겠습니까?')) {
      deleteProfit(id)
    }
  }

  return (
    <>
      <div className="intro-y box mt-5 relative">
        {(isProfitData || isDeleteProfit) && <Loading />}
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">공지사항</div>
        </div>
        <div className="intro-y p-5">
          <div className="px-8">
            <div className="flex gap-48">
              <div className="flex">
                <div className="text-slate-400 font-medium w-24">작성자</div>
                <div>{profitData?.writerName}</div>
              </div>
              <div className="flex">
                <div className="text-slate-400 font-medium w-24">등록일</div>
                <div>{profitData?.creDate}</div>
              </div>
            </div>

            <div className="flex mt-5">
              <div className="text-slate-400 font-medium w-24">제목</div>
              <div>{profitData?.title}</div>
            </div>
          </div>

          <div className="py-5">
            <hr className="border-t border-dotted" />
          </div>

          {profitData?.fileId && (
            <div className="p-5">
              <img
                src={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${profitData?.fileId}`}
                alt=""
              />
            </div>
          )}

          <div
            className="p-5"
            dangerouslySetInnerHTML={{
              __html: profitData?.content,
            }}
          ></div>

          <div className="flex mt-3">
            <button
              className="btn btn-outline-danger w-24"
              onClick={() => handleDelete(id)}
            >
              삭제
            </button>
            <div className="flex gap-2 ml-auto">
              <Link to="/profit">
                <button className="btn bg-white w-24">목록</button>
              </Link>
              <button className="btn btn-sky w-24">확인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfitView
