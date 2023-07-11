import {useReducer, useState} from 'react'
import { Lucide } from '@/base-components'
import { Link } from 'react-router-dom'
import request from '@/utils/request'
import { useQuery, useMutation } from 'react-query'
import Loading from '@/components/loading'
import Pagenation from '@/components/pagenation'

function Profit() {
  const [listLength,setListLength] = useState(0);
  const [profit, setProfit] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      list: [],
      page: 1,
      totalLength: 0
    },
  )
  const {
    data: profitData,
    isLoading: isProfitData,
    refetch: refetchProfit,
  } = useQuery(
    ['getProfitData', profit.page],
    () =>
      request.get('/admin/content-management/benefit', {
        params: {
          page: profit.page,
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
        setProfit({
          list: newData,
          totalLength: Number(data?.totalElements)
        })

        const topY = data?.content?.filter((item) => item.topYN === 'Y').length ?? 0;
        setListLength(Number(data?.totalElements) - topY - ((profit.page-1) * 10));
      },
    },
  )
  const { mutate: deleTeProfit, isLoading: isDeleteProfit } = useMutation(
    (ids) =>
      request.delete('/admin/content-management/benefit', {
        params: {
          ids,
        },
      }),
    {
      onSuccess: () => {
        refetchProfit()
      },
    },
  )

  const handleDelete = () => {
    const ids = profit.list.filter((item) => item.check).map((item) => item.id)
    const formData = new FormData()
    formData.append('ids', ids)
    deleTeProfit(formData.get('ids'))
  }
  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">
            목록 <span className="color-blue">{profit?.list?.length}</span>건
          </div>
        </div>
        <div className="intro-y p-5">
          <div className="overflow-x-auto">
            {(isProfitData || isDeleteProfit) && <Loading />}
            <table className="table table-hover">
              <thead>
                <tr className="text-center bg-slate-100">
                  <td className="w-10">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        const newList = profit.list.map((child) => ({
                          ...child,
                          check: e.target.checked,
                        }))
                        setProfit({
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
              {profit?.list?.filter((item) => item.topYN === 'Y').map((item, index) => (
                <tr className="text-center" key={item.id}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={item.check}
                      onChange={(e) => {
                        const newList = profit.list.map((child, idx) => {
                          if (idx === index) {
                            return {
                              ...child,
                              check: e.target.checked,
                            }
                          }
                          return child
                        })
                        setProfit({
                          list: newList,
                        })
                      }}
                    />
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <Lucide
                        icon="BellRing"
                        className="w-4 h-4 text-danger"
                      />
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/profit/${item.id}`}
                      className="underline text-danger text-left"
                    >
                      <div className="w-550 truncate">{item.title}</div>
                    </Link>
                  </td>
                  <td className="text-danger">{item.writerName}</td>
                  <td className="text-danger">{item.creDate}</td>
                </tr>
              ))}
              {profit?.list?.filter((item) => item.topYN === 'N').map((item, index) => (
                <tr className="text-center" key={item.id}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={item.check}
                      onChange={(e) => {
                        const newList = profit.list.map((child, idx) => {
                          if (idx === index) {
                            return {
                              ...child,
                              check: e.target.checked,
                            }
                          }
                          return child
                        })
                        setProfit({
                          list: newList,
                        })
                      }}
                    />
                  </td>
                  <td>
                    <div className="flex justify-center">{listLength - index}</div>
                  </td>
                  <td>
                    <Link
                      to={`/profit/${item.id}`}
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
                if (!profit.list.filter((item) => item.check).length) {
                  alert('삭제할 항목을 선택해주세요.')
                } else {
                  handleDelete()
                }
              }}
            >
              선택 삭제
            </button>
            <Link to="/profit/create" className="ml-auto">
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
        data={profitData}
        page={profit.page}
        setPage={(page) =>
          setProfit({
            page,
          })
        }
      />
    </>
  )
}

export default Profit
