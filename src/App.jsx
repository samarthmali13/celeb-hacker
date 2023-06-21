import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import json from "./Components/celebrities.json";
function App() {
  const [count, setCount] = useState(0);
  const [celebData, setCelebData] = useState(json);
  const [editState, setEditState] = useState(null);
  const [editData, setEditData] = useState({})
  const [showModal, setshowModal] = useState(true)
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleConfirm = () => {
    // Handle delete action here
    handleCloseDialog();
  };
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
  const saveEdit = () => {
    const fullName = editData.name
    const nameArray = fullName.split(' ');
    const updatedData = celebData.map(item => {
      if (item.id === editData.id) {
        return {
          ...item,
          first: nameArray[0],
          last: nameArray[nameArray.length - 1],
          dob: editData.dob,
          gender: editData.gender,
          country: editData.country,
          description: editData.description

        }; // Update the country property
      }
      return item;
    });
    setCelebData(updatedData)
    setEditState(null);

  };
  const cancelEdit = () => {
    setEditState(null);
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
        data.first.toLowerCase().includes(searchValue) ||
        data.last.includes(searchValue) 
      );
    });
    setCelebData(searchResult);
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
  }, []);
  return (
    <>

      

      <div className="container ">
        <div className="d-flex my-2">
          <div className="form-inline d-flex">
            <div className="">
              <input className="form-control mr-sm-2 rounded-pill" type="search" placeholder="Search" aria-label="Search"  onChange={(e) => setSearchValue(e.target.value)} />
            </div>
          </div>

        </div>
        <div className="accordion object-fit-contain my-2" id="accordionExample">
          {celebData.map((data, index) => {
            return (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <div
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle={`collapse`}
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
                        <div>Age</div>
                        {editState !== data.id ? (
                          <div>{calculateAge(data.dob)} Years</div>
                        ) : (
                          <div>
                            <input type="date"
                              name="date"
                              value={editData.dob}
                              onChange={handleInputChange}
                            />
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <div>Gender</div>
                        {editState !== data.id ? (
                          <div>{data.gender}</div>
                        ) : (
                          <div>
                            <select
                              name="gender"
                              value={editData.gender}
                              onChange={handleInputChange}
                            >
                              <option value="male">male</option>
                              <option value="female">female</option>
                              <option value='Prefer not to say'>Prefer not to say</option>
                            </select>
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <div>Country</div>
                        {editState !== data.id ? (
                          <div>{data.country}</div>
                        ) : (
                          <div>
                            <input type="text"
                              name="country"
                              value={editData.country}
                              onChange={handleInputChange}
                              pattern="/^[^0-9]+$/"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div>Description</div>
                      {
                        editState !== data.id ? (
                          <div>{data.description}</div>
                        ) : (
                          // <div>
                          <textarea rows="3"
                            name="description"
                            value={editData.description}
                            onChange={handleInputChange}
                          />
                        )
                        // </div>
                      }
                    </div>
                    {/* <div className="d-flex"> */}
                    {editState !== data.id ? (
                      <div className="d-flex">
                        <div
                          className="mx-2"
                          
                          data-bs-toggle="modal" data-bs-target="#exampleModal"
                        >
                          <i className="bi bi-trash" style={{color:'red'}}></i>
                        </div>
                        <div className="mx-2">
                          <i className="bi bi-pencil" onClick={() => editItem(data)} style={{color:'blue'}}></i>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex">
                        <div className="mx-2 "onClick={cancelEdit}>
                          <i className="bi bi-x-circle" style={{color:'red'}}></i>
                        </div>
                        <div className="mx-2" onClick={saveEdit} style={{color:'green'}}>
                          <i className="bi bi-check-circle"></i>
                        </div>
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
          <h1 className="modal-title fs-5" id="exampleModalLabel">Are you Sure you want to delete</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
  
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={() => deleteItem(data.id)}>Delete</button>
        </div>
      </div>
    </div>
  </div>
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
