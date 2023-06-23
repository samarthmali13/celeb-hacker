import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import json from "./Components/celebrities.json";
function App() {
  const [celebData, setCelebData] = useState(json);
  const [editState, setEditState] = useState(null);
  const [editData, setEditData] = useState(null)
  const [filterData, setFilterData] = useState(json)
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
    const updatedData = celebData.filter((item) => item.id !== id);
    setCelebData(updatedData);

    // alert(`delete ${id}`)
  };
  const editItem = (data) => {
    // alert("Edit");
    setEditData({ ...data, name: data.first + ' ' + data.last })
    setEditState(data.id);
  };
  const saveEdit = (e) => {
    e.preventDefault()
    const fullName = editData.name
    const nameArray = fullName.split(' ');
    const updatedData = celebData.map(item => {
      if (item.id === editData.id) {
        return {
          ...item,
          first: nameArray[0],
          last: nameArray.length<2 ?"": nameArray[nameArray.length - 1],
          dob: editData.dob,
          gender: editData.gender,
          country: editData.country,
          description: editData.description

        }; // Update the country property
      }
      return item;
    });
    setCelebData(updatedData)
    setFilterData(updatedData)
    setEditState(null);
    setEditData(null)
  };
  const cancelEdit = () => {
    setEditState(null);
    setEditData(null)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fullName') {
      setEditData({
        ...editData,
        name: value
      });
    }
    else if (name === 'dob') {
      setEditData({
        ...editData,
        dob: value
      });
    }
    else if (name === 'gender') {
      setEditData({
        ...editData,
        gender: value
      });
    }
    else if (name === 'country') {
      setEditData({
        ...editData,
        country: value
      });
    } else if (name === 'description') {
      setEditData({
        ...editData,
        description: value
      });
    }
  }
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
  return (
    <>



      <div className="container ">
        <div className="d-flex my-2">
          <div className="form-inline d-flex">
            <div className="">
              <input className="form-control mr-sm-2 rounded-pill" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchValue(e.target.value)} 
                disabled ={editData ? true : false}
              />
            </div>
          </div>

        </div>
        <div className="accordion object-fit-contain my-2" id="accordionExample">
          {filterData?.map((data, index) => {
            return (
              <div className="accordion-item">
                <form onSubmit={saveEdit}>
                <h2 className="accordion-header">
                  <div
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle={editData === null ?  `collapse` :''}
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="true"
                    aria-controls={`collapse${index}`}
                  >
                    <div className="header">
                      <div className="rounded">
                        <img
                          src={data.picture}
                          width={50}
                          height={50}
                          className="mx-2 rounded-circle"
                        />
                      </div>
                      {editState !== data.id ? (
                        <div className="mx-3">
                          {data.first} {data.last}
                        </div>
                      ) : (
                        <input type="text"
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
                  id={`collapse${index}`}
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col">
                        <div><label>Age:</label></div>
                        {editState !== data.id ? (
                          <div>{calculateAge(data.dob)} Years</div>
                        ) : (
                          <div>
                            <input type="date"
                              name="dob"
                              value={editData.dob}
                              onChange={handleInputChange}
                              required
                          />
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <div><label>Gender:</label></div>
                        {editState !== data.id ? (
                          <div>{data.gender}</div>
                        ) : (
                          <div>
                            <select
                              name="gender"
                              value={editData.gender}
                              onChange={handleInputChange}
                              required
                          >
                              <option value="male">male</option>
                              <option value="female">female</option>
                              <option value='Prefer not to say'>Prefer not to say</option>
                            </select>
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <div><label>Country:</label></div>
                        {editState !== data.id ? (
                          <div>{data.country}</div>
                        ) : (
                          <div>
                            <input type="text"
                              name="country"
                              value={editData.country}
                              onChange={handleInputChange}
                              pattern="^[^0-9]*$"
                              required
                          />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div><label>Description:</label></div>
                      {
                        editState !== data.id ? (
                          <div>{data.description}</div>
                        ) : (
                          // <div>
                          <textarea rows="3"
                            name="description"
                            value={editData.description}
                            onChange={handleInputChange}
                            required
                            />
                        )
                        // </div>
                      }
                    </div>
                    {/* <div className="d-flex"> */}
                    {editState !== data.id ? (
                      <div className="d-flex my-2">
                        <div
                          className="mx-2"

                          data-bs-toggle="modal" data-bs-target="#exampleModal"
                        >
                          <i className="bi bi-trash pointer" style={{ color: 'red' }}></i>
                        </div>
                        <div className="mx-2">
                          <i className="bi bi-pencil pointer" onClick={() => editItem(data)} style={{ color: 'blue' }}></i>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex my-2">
                        <div className="mx-2 pointer" onClick={cancelEdit}>
                          <i className="bi bi-x-circle" style={{ color: 'red' }}></i>
                        </div>
                        <button className="mx-2 tick pointer" type='submit' style={{ color: 'green' }}>
                          <i className="bi bi-check-circle"></i>
                        </button>
                      </div>
                    )}
                    {/* </div> */}
                  </div>
                </div>
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteItem(data.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                </form>
                
              </div>
            );

          })}
        </div>
        <div>


        </div>

      </div>

    </>
  );
}

export default App;
