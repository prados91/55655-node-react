import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pagination } from 'react-bootstrap'
const PagesCount = ({ page, totalPages, setPage }) => {
    return (
        <Pagination>
            <Row className="d-flex justify-content-md-center">
                <Col className="p-0">
                    <button
                        className="btn btn-secondary"
                        disabled={page === 1}
                        onClick={() => setPage(1)}>
                        First
                    </button>
                </Col>
                <Col className="p-0">
                    <button
                        className="btn btn-secondary"
                        disabled={page === 1}
                        onClick={() => setPage((prevState) => prevState - 1)}>
                        Prev
                    </button>
                </Col>
                <Col className="p-0">
                    {page === 1 ?
                        (<button
                            className="btn btn-secondary"
                            disabled={page === 1}>
                            ...
                        </button>) :
                        (<button
                            className="btn btn-secondary"
                            onClick={() => setPage((prevState) => prevState - 1)}>
                            {page - 1}
                        </button>)}
                </Col>
                <Col className="p-0">
                    <button className="btn btn-secondary active">
                        {page}
                    </button>
                </Col>
                <Col className="p-0">
                    {page === totalPages ?
                        (<button
                            className="btn btn-secondary"
                            disabled={page === totalPages}>
                            ...
                        </button>) :
                        (<button
                            className="btn btn-secondary"
                            onClick={() => setPage((prevState) => prevState + 1)}>
                            {page + 1}
                        </button>)}
                </Col>
                <Col className="p-0">
                    <button
                        className="btn btn-secondary"
                        disabled={page === totalPages}
                        onClick={() => setPage((prevState) => prevState + 1)}>
                        Next
                    </button>
                </Col>
                <Col className="p-0">
                    <button
                        className="btn btn-secondary"
                        disabled={page === totalPages}
                        onClick={() => setPage(totalPages)}>
                        Last
                    </button>
                </Col>
            </Row>
        </Pagination>
    )
}

export default PagesCount