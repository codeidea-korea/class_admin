import { Link, useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'
import Loading from '@/components/loading'

function NoticeView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL

  const { data: noticeData, isLoading: isNoticeData } = useQuery(
    'getNoticeData',
    () => request.get(`/admin/content-management/notice/${id}`),
  )

  const { mutate: deleteNotice, isLoading: isDeleteNotice } = useMutation(
    (id) =>
      request.delete(`/admin/content-management/notice`, {
        params: {
          ids: id,
        },
      }),
    {
      onSuccess: () => {
        alert('삭제되었습니다.');
        navigate('/notice')
      },
    },
  )

  const handleDelete = (id) => {
    if (confirm('삭제하시겠습니까?')) {
      deleteNotice(id)
    }
  }

  return (
    <>
      <div className="intro-y box mt-5 relative">

        {(isNoticeData || isDeleteNotice) && <Loading />}

        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">공지사항</div>
        </div>

        <div className="intro-y p-5">
          <div className="px-8">
            <div className="flex">
              <div className="text-slate-400 font-medium w-24">제목</div>
              <div>{noticeData?.title}</div>
            </div>
            <div className="flex mt-5 gap-48">
              <div className="flex">
                <div className="text-slate-400 font-medium w-24">작성자</div>
                <div>{noticeData?.writerName}</div>
              </div>
              <div className="flex">
                <div className="text-slate-400 font-medium w-24">등록일</div>
                <div>{noticeData?.creDate}</div>
              </div>
              <div className="flex">
                <div className="text-slate-400 font-medium w-24">첨부파일</div>
                <div>
                  {noticeData?.fileId && (
                    <a href={`${baseUrl}/v1/contents-data/file-download/${noticeData?.fileId}`}>
                      {noticeData?.fileName}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="py-5">
            <hr className="border-t border-dotted" />
          </div>

          {/* 첨부파일을 등록했는데 그걸 이미지로 확정짓고 개발하는건 아닌것같음, 위에 첨부파일 항목 추가했음 */}
          {noticeData?.fileId && (
            <div className="p-5">
              <img
                src={`${baseUrl}/v1/contents-data/file-download/${noticeData?.fileId}`}
                alt=""
              />
            </div>
          )}

          <div
            className="p-5"
            dangerouslySetInnerHTML={{
              __html: noticeData?.content,
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
              <Link to="/notice">
                <button className="btn bg-white w-24">목록</button>
              </Link>
              <Link to={`/notice/edit/${id}`}>
                <button className="btn btn-sky w-24">수정</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoticeView
