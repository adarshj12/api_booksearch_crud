import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import EditBook from './components/EditBook';
import AddBook from './components/AddBook';
import axios from 'axios';
import { add, deleteBook } from './redux/bookSlice';
import { useTable, useSortBy } from 'react-table';

function App() {
  const items = useSelector((state) => state.book);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [flag, setFlag] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [element, setElement] = useState('');

  const [query, setQuery] = useState('');

  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    fetchData()
  }, [flag]);

  useEffect(() => {
    fetchData();
  }, [page, query]);

  async function fetchData() {
    dispatch(deleteBook());
    const res = await axios.get(`http://68.178.162.203:8080/application-test-v1.1/books?page=${page}`);
    setTotalPages(res.data.pagination.totalPages);
    res.data.data.forEach((elem, index) => {
      dispatch(add(elem));
    });
  }

  function handleOpenModal(elem) {
    setElement(elem);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleOpenAddModal() {
    setShowAddModal(true);
  }

  function handleCloseAddModal() {
    setShowAddModal(false);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Sl.no',
        accessor: (row, index) => (page - 1) * ITEMS_PER_PAGE + index + 1,
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
      {
        Header: 'Year',
        accessor: 'year',
      },
      {
        Header: 'Language',
        accessor: 'language',
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Pages',
        accessor: 'pages',
      },
      {
        Header: 'Link',
        accessor: 'link',
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <button className="edit-button" onClick={() => handleOpenModal(row.original)}>
            Edit
          </button>
        ),
      },
    ],
    [page, ITEMS_PER_PAGE]
  );

  const filteredItems = useMemo(() => {
    if (query.trim() === '') {
      return items;
    }

    return items.filter((item) => {
      const title = item.title?.toLowerCase();
      const author = item.author?.toLowerCase();
      return title?.includes(query.toLowerCase()) 
      // || author?.includes(query.toLowerCase());
    });
  }, [items, query]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredItems }, useSortBy);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => {
          setPage(i);
        }}
        className={i === page ? 'active' : ''}
      >
        {i}
      </button>
    );
  }

  return (
    <>
      <div className="container">
        <div className="app">
          <div className="row">
            <div className="col">
              <input
                className="form-control search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="col">
              <button className="btn btn-primary add-button" onClick={handleOpenAddModal}>
                Add Book
              </button>
            </div>
          </div>
          {showAddModal && <AddBook onClose={handleCloseAddModal} setFlag={setFlag} />}
          {rows.length === 0 ? (
            <h1>No items to Show</h1>
          ) : (
            <>
              <h3>Items</h3>
              <div className="table-responsive">
                <table className="table" {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="pagination">{paginationButtons}</div>
            </>
          )}
        </div>
      </div>
      {showModal && (
        <EditBook
          onClose={handleCloseModal}
          title={element.title}
          author={element.author}
          pages={element.pages}
          year={element.year}
          language={element.language}
          country={element.country}
          link={element.link}
          id={element.id}
          setFlag={setFlag}
        />
      )}

    </>
  );
}

export default App;
