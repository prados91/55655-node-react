import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pagination } from 'react-bootstrap'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import './PageCount.css'

const PageCount = ({ page, totalPages, setPage }) => {
    return (
        <Pagination>
            <Row className="d-flex justify-content-md-center gap-1">
                <Col className="p-0">
                    <button
                        className="btn btn-secondary btn-filter"
                        disabled={page === 1}
                        onClick={() => setPage(1)}>
                        <MdKeyboardDoubleArrowLeft />
                    </button>
                </Col>
                <Col className="p-0">
                    <button
                        className="btn btn-secondary btn-filter"
                        disabled={page === 1}
                        onClick={() => setPage((prevState) => prevState - 1)}>
                        <MdKeyboardArrowLeft />
                    </button>
                </Col>
                <Col className="p-0">
                    {page === 1 ?
                        (<button
                            className="btn btn-secondary btn-filter"
                            disabled={page === 1}>
                            ...
                        </button>) :
                        (<button
                            className="btn btn-secondary btn-filter"
                            onClick={() => setPage((prevState) => prevState - 1)}>
                            {page - 1}
                        </button>)}
                </Col>
                <Col className="p-0">
                    <button className="btn btn-secondary btn-filter active">
                        {page}
                    </button>
                </Col>
                <Col className="p-0">
                    {page === totalPages ?
                        (<button
                            className="btn btn-secondary btn-filter"
                            disabled={page === totalPages}>
                            ...
                        </button>) :
                        (<button
                            className="btn btn-secondary btn-filter"
                            onClick={() => setPage((prevState) => prevState + 1)}>
                            {page + 1}
                        </button>)}
                </Col>
                <Col className="p-0">
                    <button
                        className="btn btn-secondary btn-filter"
                        disabled={page === totalPages}
                        onClick={() => setPage((prevState) => prevState + 1)}>
                        <MdKeyboardArrowRight />
                    </button>
                </Col>
                <Col className="p-0">
                    <button
                        className="btn btn-secondary btn-filter"
                        disabled={page === totalPages}
                        onClick={() => setPage(totalPages)}>
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </Col>
            </Row>
        </Pagination>
    )
}

export default PageCount