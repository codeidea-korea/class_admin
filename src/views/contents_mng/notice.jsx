import { useReducer } from 'react'
import { Lucide } from '@/base-components'
import { Link } from 'react-router-dom'
import request from '@/utils/request'
import { useQuery, useMutation } from 'react-query'
import Loading from '@/components/Loading'
import Pagenation from '@/components/pagenation'

function Notice() {
  const [notice, setNotice] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      list: [],
      page: 1,
    },
  )
  const {
    data: noticeData,
    isLoading: isNoticeData,
    refetch: refetchNotice,
  } = useQuery(
    ['getNoticeData', notice.page],
    () =>
      request.get('/admin/content-management/notice', {
        params: {
          page: notice.page,
          limit: 10,
        },
      }),
    {
      onSuccess: (data) => {
        const newData = data.content.map((item) => {
          return {
            ...item,
            check: false,
          }
        })
        setNotice({
          list: newData,
        })
      },
    },
  )
  const { mutate: deleteNotice, isLoading: isDeleteNocie } = useMutation(
    (ids) =>
      request.delete('/admin/content-management/notice', {
        params: {
          ids,
        },
      }),
    {
      onSuccess: () => {
        refetchNotice()
      },
    },
  )

  const handleDelete = () => {
    const ids = notice.list.filter((item) => item.check).map((item) => item.id)
    const formData = new FormData()
    formData.append('ids', ids)
    deleteNotice(formData.get('ids'))
  }
  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">
            목록 <span className="color-blue">{notice?.list?.length}</span>건
          </div>
        </div>
        <div className="intro-y p-5">
          <div className="overflow-x-auto">
            {(isNoticeData || isDeleteNocie) && <Loading />}
            <table className="table table-hover">
              <thead>
                <tr className="text-center bg-slate-100">
                  <td className="w-10">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        const newList = notice.list.map((child) => ({
                          ...child,
                          check: e.target.checked,
                        }))
                        setNotice({
                          list: newList,
                        })
                      }}
                    />
                  </td>
                  <td className="w-20">번호</td>
                  <td className="w-550">제목</td>
                  <td>작성자</td>
                  <td>작성일</td>
                </tr>
              </thead>
              <tbody>
                {notice?.list?.map((item, index) => (
                  <tr className="text-center" key={item.id}>
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={item.check}
                        onChange={(e) => {
                          const newList = notice.list.map((child, idx) => {
                            if (idx === index) {
                              return {
                                ...child,
                                check: e.target.checked,
                              }
                            }
                            return child
                          })
                          setNotice({
                            list: newList,
                          })
                        }}
                      />
                    </td>
                    <td>
                      <div className="flex justify-center">{index + 1}</div>
                    </td>
                    <td>
                      <Link
                        to={`/notice/${item.id}`}
                        className="underline text-primary text-left"
                      >
                        <div className="w-550 truncate">{item.title}</div>
                      </Link>
                    </td>
                    <td>{item.writerName}</td>
                    <td>{item.creDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex mt-3">
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                if (!notice.list.filter((item) => item.check).length) {
                  alert('삭제할 항목을 선택해주세요.')
                } else {
                  handleDelete()
                }
              }}
            >
              선택 삭제
            </button>
            <Link to="/notice/create" className="ml-auto">
              <button className="btn btn-sky">
                <Lucide icon="Plus" className="w-4 h-4 mr-2"></Lucide>
                등록하기
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Pagenation
        limit={10}
        data={noticeData}
        page={notice.page}
        setPage={(page) =>
          setNotice({
            page,
          })
        }
      />
    </>
  )
}

export default Notice
