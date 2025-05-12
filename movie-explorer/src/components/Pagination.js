import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
    const maxPagesToShow = 8; // Adjust as needed

    // Calculate the range of page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1); 
    // reset to a none-one value happens when totalpages is larger than maxpagestoshow, and the current page is near the end
    if (endPage - startPage < maxPagesToShow - 1) { 
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const goToPreviousPage = () => {
        if(currentPage > 1) { onPageChange(currentPage - 1);}
    };

    return (
        <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                {'<'}
            </button>
            {startPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>1</button>
                    {startPage >2 && <span>...</span>}
                </>
            )}
            {pageNumbers.map((number) => (
                <button key={number} onClick={() => onPageChange(number)} 
                    className={currentPage === number ? 'active' : ''}>
                </button>
            ))}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span>...</span>}
                    <button onClick={() => onPageChange(totalPages)} >{totalPages}</button>
                </>
            )}
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                {'>'}
            </button>
        </div>
    );
}

export default Pagination;