import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import json from "./Components/celebrities.json";
function App() {
  const [count, setCount] = useState(0);
  const [celebData, setCelebData] = useState(json);
  const [editState, setEditState] = useState(false);
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
    console.log(updatedData);
    setCelebData(updatedData);
    // alert(`delete ${id}`)
  };
  const editItem = () => {
    // alert("Edit");
    setEditState(true);
  };

  const saveEdit = () => {};
  const cancelEdit = () => {
    setEditState(false);
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
      <div className="container w-75">
        {/* <div className='row'> */}
        <div>
          <input type="text" placeholder="Search" />
        </div>
        <div className="accordion" id="accordionExample">
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
                    <div className="d-flex">
                      <div>
                        <img
                          src={data.picture}
                          width={50}
                          height={50}
                          className="mx-2"
                        />
                      </div>
                      {editState === false ? (
                        <div>
                          {data.first} {data.last}
                        </div>
                      ) : (
                        <input type="text" />
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
                        {editState === false ? (
                          <div>{calculateAge(data.dob)} Years</div>
                        ) : (
                          <div>
                            <input type="date" />
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <div>Gender</div>
                        {editState === false ? (
                          <div>{data.gender}</div>
                        ) : (
                          <div>
                            <select>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Prefer not to say</option>
                            </select>
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <div>Country</div>
                        {editState === false ? (
                          <div>{data.country}</div>
                        ) : (
                          <div>
                            <input type="text" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div>Description</div>
                      {
                        editState === false ? (
                          <div>{data.description}</div>
                        ) : (
                          // <div>
                          <input rows="3" />
                        )
                        // </div>
                      }
                    </div>
                    {/* <div className="d-flex"> */}
                    {editState === false ? (
                      <div className="d-flex">
                        <div
                          className="mx-2"
                          onClick={() => deleteItem(data.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </div>
                        <div className="mx-2">
                          <i className="bi bi-pencil" onClick={editItem}></i>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex">
                        <div className="mx-2" onClick={cancelEdit}>
                          <i className="bi bi-x-circle"></i>
                        </div>
                        <div className="mx-2" onClick={saveEdit}>
                          <i className="bi bi-check-circle"></i>
                        </div>
                      </div>
                    )}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
