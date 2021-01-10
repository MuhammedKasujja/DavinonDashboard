import React, { useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export default function Pagination(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { totalCount, onPageChanged } = props;

    // useEffect(() => {
    //     setRowsPerPage(10)
    // }, [props])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        onPageChanged(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, rowsPerPage));
        setPage(0);
        onPageChanged(0)
    };

    return (
        <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
}