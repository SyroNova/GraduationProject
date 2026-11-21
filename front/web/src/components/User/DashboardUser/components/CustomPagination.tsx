import { Pagination } from "react-bootstrap";

type Props = {
    page: number,
    totalPages: number | undefined,
    onChange: (page: number) => void
}

export default function CustomPagination(response: Readonly<Props>) {
    if(!response) return null
    if(!response.totalPages) return null

    const currentPage = response.page
    const totalPages = response.totalPages

    const items = []

    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, currentPage + 2)

    for(let page = startPage; page <= endPage; page++){
        items.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => response.onChange(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    return (
        <Pagination className="justify-content-center">
            <Pagination.First 
                disabled={currentPage === 1}
                onClick={() => response.onChange(1)}
            />
            <Pagination.Prev 
                disabled={currentPage === 1}
                onClick={() => response.onChange(currentPage - 1)}
            />

            {startPage > 1 && (
                <>
                    <Pagination.Item
                        onClick={() => response.onChange(1)}
                    >
                        1
                    </Pagination.Item>
                    {startPage > 2 && <Pagination.Ellipsis />}
                </>
            )}

            {items}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && 
                        <Pagination.Ellipsis />
                    }

                    <Pagination.Item
                        onClick={() => response.onChange(totalPages)}
                    >
                        {totalPages}
                    </Pagination.Item>
                </>
            )}

            <Pagination.Next 
                disabled={currentPage === totalPages}
                onClick={() => response.onChange(currentPage + 1)}
            />
            <Pagination.Last 
                disabled={currentPage === totalPages}
                onClick={() => response.onChange(totalPages)}
            />
        </Pagination>
    )
}