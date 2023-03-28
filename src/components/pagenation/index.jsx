import ReactPaginate from 'react-paginate'
import { Lucide } from '@/base-components'

const Main = ({ limit, data, page, setPage, className }) => {
  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  }
  return (
    data &&
    (data?.total > limit || data?.data.length > limit) && (
      <div
        className={
          'intro-y col-span-12 flex items-center justify-center' +
          ` ${className}`
        }
      >
        <ReactPaginate
          nextLabel={<Lucide icon="ChevronRight" className="w-4 h-4" />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          forcePage={page - 1}
          pageCount={data ? Math.ceil(data?.total / limit) : 1}
          previousLabel={<Lucide icon="ChevronLeft" className="w-4 h-4" />}
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    )
  )
}

export default Main
