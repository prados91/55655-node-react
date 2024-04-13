import React from 'react'
import { Pagination } from 'react-bootstrap'

import PagesCount from '../PageCount/PagesCount'

const PageCount = ({ page, totalPages, setPage }) => {
    return (
        <Pagination>
            <Pagination.First
                disabled={page === 1}
                onClick={() => setPage(1)}

            />
            <Pagination.Prev
                disabled={page === 1}
                onClick={() => setPage((prevState) => prevState - 1)}
            />
            {page === 1 ?
                (<Pagination.Ellipsis />) :
                (<Pagination.Item
                    onClick={() => setPage((prevState) => prevState - 1)}>
                    {page - 1}
                </Pagination.Item>)
            }
            <Pagination.Item active >{page}</Pagination.Item>
            {page === totalPages ?
                (<Pagination.Ellipsis />) :
                (<Pagination.Item
                    onClick={() => setPage((prevState) => prevState + 1)}>
                    {page + 1}
                </Pagination.Item>)
            }
            <Pagination.Next
                disabled={page === totalPages}
                onClick={() => setPage((prevState) => prevState + 1)} />
            <Pagination.Last
                disabled={page === totalPages}
                onClick={() => setPage(totalPages)} />
        </Pagination>
    )
}

export default PageCount
