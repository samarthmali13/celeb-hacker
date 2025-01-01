import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import json from "./Components/celebrities.json";
import { useDispatch, useSelector } from "react-redux";
import { addBook, fetchBooks, updateBook } from "./redux/actions";
import ReactPaginate from "react-paginate";
function App() {
  const [celebData, setCelebData] = useState(json);
  const [editState, setEditState] = useState(null);
  const [editData, setEditData] = useState(null);
  const [filterData, setFilterData] = useState(json);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [sortOrder, setSortOrder] = useState('ASC');
  
  const dispatch = useDispatch();
  
  const books = useSelector((state) => state.books);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust the age if the current date is before the birth month/day
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const deleteItem = (id) => {
    // console.log(data)
    const updatedData = filterData.filter((item) => item.id !== id);
    console.log(updatedData)
    const result = window.confirm("Are you sure you want to Add ?")
    if (result) {
      setCelebData(updatedData)
      setFilterData(updatedData)
      
    } 

    // alert(`delete ${id}`)
  };
  const editItem = (data) => {
    // alert("Edit");
    setEditData({ ...data, title: data.title });
    setEditState(data.id);
  };
  const saveEdit = (e) => {
    e.preventDefault();
    dispatch(updateBook(editData));
    // setEditingBook(null);
    // setCelebData(updatedData);
    // setFilterData(updatedData);
    setEditState(null);
    setEditData(null);
  };
  const cancelEdit = () => {
    setEditState(null);
    setEditData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") {
      setEditData({
        ...editData,
        name: value,
      });
    } else if (name === "dob") {
      setEditData({
        ...editData,
        dob: value,
      });
    } else if (name === "gender") {
      setEditData({
        ...editData,
        gender: value,
      });
    } else if (name === "country") {
      setEditData({
        ...editData,
        country: value,
      });
    } else if (name === "description") {
      setEditData({
        ...editData,
        description: value,
      });
    }
  };
  const setSearchValue = (searchValue) => {
    const searchResult = celebData.filter((data) => {
      return (
        data.first.toLowerCase().includes(searchValue.toLowerCase()) ||
        data.last.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilterData(searchResult);
  };
  useEffect(() => {
    const removeDefaultOpenState = () => {
      const accordionItems = document.querySelectorAll(".accordion-item");
      accordionItems.forEach((item) => {
        const collapseElement = item.querySelector(".collapse");
        if (collapseElement.classList.contains("show")) {
          collapseElement.classList.remove("show");
        }
      });
    };

    removeDefaultOpenState();
  }, [filterData]);
  useEffect(() => {
    const addcollapsedOnDelete = () =>{
      const accordionItems = document.querySelectorAll(".accordion-item");
      accordionItems.forEach((item) => {
        const collapseElement = item.querySelector(".accordion-button ");
        if (!collapseElement.classList.contains("collapsed")) { 
          collapseElement.classList.add("collapsed");
        }
       
      });
    }
    addcollapsedOnDelete();
  }, [filterData])

  useEffect(() => {
      dispatch(fetchBooks(searchTerm, sortOrder));
  }, [searchTerm, sortOrder, dispatch]);

  const handleSearch = (e) => {
      setSearchTerm(e.target.value);
  };

  const handleSortChange = (order) => {
      setSortOrder(order);
  };

  const handleAddBook = (book) => {
      dispatch(addBook(book));
  };

  const handleEditBook = (book) => {
      dispatch(updateBook(book));
      setEditingBook(null);
  };
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 8
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = books.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(books.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % books.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <>
      <div className="container ">
        <div className="d-flex my-2">
          <div className="form-inline d-flex">
            <div className="">
              <input
                className="form-control mr-sm-2 rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
                disabled={editData ? true : false}
              />
            </div>

            <button className="btn btn-secondary mx-2" onClick={() => handleSortChange('ASC')}>Sort Ascending</button>
            <button className="btn btn-secondary mx-2" onClick={() => handleSortChange('DESC')}>Sort Descending</button>
          </div>
        </div>
        <div
          className="accordion object-fit-contain my-2"
          id="accordionExample"
        >
          {currentItems?.map((data, index) => {
            return (
              <div className="accordion-item" key={index}>
                <form onSubmit={saveEdit}>
                  <h2 className="accordion-header">
                    <div
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle={editData === null ? `collapse` : ""}
                      data-bs-target={`#collapse${data.id}`}
                      aria-expanded="true"
                      aria-controls={`collapse${data.id}`}
                    >
                      <div className="header">
                        {/* <div className="rounded">
                          <img
                            src={data.picture}
                            width={50}
                            height={50}
                            className="mx-2 rounded-circle"
                          />
                        </div> */}
                        {editState !== data.id ? (
                          <div className="mx-3">
                           <strong className="mx-1">{data.title}</strong>
                            <span>
                           By : {data.author}
                            </span>
                          </div>
                        ) : (
                          <input
                            type="text"
                            name="fullName"
                            value={editData.name}
                            onChange={handleInputChange}
                            required
                          />
                        )}
                      </div>
                    </div>
                  </h2>
                 
                  <div
                    id={`collapse${data.id}`}
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      
                      <div className="row">
                        <div className="col">
                          <div>
                            <label>Year Of Release:</label>
                          </div>
                          
                            <div>{(data.year)}</div>
                          
                        </div>
                        <div className="col">
                          <div>
                            <label>Country:</label>
                          </div>
                          
                            <div>{(data.country)}</div>
                          
                        </div>
                        <div className="col">
                          <div>
                            <label>Language:</label>
                          </div>
                         
                            <div>{(data.language)}</div>
                          
                        </div>
                        <div className="col">
                          <div>
                            <label>Link:</label>
                          </div>
                       
                            <div>{(data.link)}</div>
                          
                        </div>
                        <div className="col">
                          <div>
                            <label>Pages:</label>
                          </div>
                         
                            <div>{(data.pages)}</div>
                          
                        </div>
                        
                      </div>
                      {/* <div className="d-flex"> */}
                      {editState !== data.id ? (
                        <div className="d-flex my-2">
                          <div
                            className="mx-2"
                            onClick={() => handleAddBook(data)}
                          >
                            <i
                              class="bi bi-file-earmark-plus pointer"
                              style={{ color: "green" }}
                            ></i>
                          </div>
                          <div className="mx-2">
                            <i
                              className="bi bi-pencil pointer"
                              onClick={() => editItem(data)}
                              style={{ color: "blue" }}
                            ></i>
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex my-2">
                          <div className="mx-2 pointer" onClick={cancelEdit}>
                            <i
                              className="bi bi-x-circle"
                              style={{ color: "red" }}
                            ></i>
                          </div>
                          <button
                            className="mx-2 tick pointer"
                            type="submit"
                            style={{ color: "green" }}
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                        </div>
                      )}
                      {/* </div> */}
                      
                    </div>
                  </div>
                 
                </form>
              </div>
            );
          })}
        </div>
        <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={itemOffset}
      />
      </div>
    </>
  );
}

export default App;
