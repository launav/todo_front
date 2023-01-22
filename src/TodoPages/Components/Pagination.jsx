import '../styles/pagination.css'

export const Pagination = ({ numPages, currentPage, setCurrentPage }) => {

    //recibe como argumento un spread de array al que le sumamos 1 al numero de paginas y nos devuelve 
    //otro array con el name de los objs, luego el slice nos devolverá una copia de este  
    const pageNumbers = [...Array(numPages + 1).keys()].slice(1);

    return (
        <div className='pagination-box-div'>
            <ul className='pagination-list'>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className={`list-pagination ${currentPage == pgNumber ? 'active' : null} `} >
                        <button onClick={() => setCurrentPage(pgNumber)}
                            // si la página actual es igual al número de página que me desactive el botón
                            disabled={currentPage === pgNumber}
                            className='page-list-link'>
                            {pgNumber}
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}
