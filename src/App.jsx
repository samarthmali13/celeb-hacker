import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import json from './Components/celebrities.json'
function App() {
  const [count, setCount] = useState(0)
  const celebData = json

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust the age if the current date is before the birth month/day
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const deleteItem = () => {
    alert('delete')
  }
  const editItem = () => {
    alert('Edit')
  }
  

  useEffect(() => {
    const removeDefaultOpenState = () => {
      const accordionItems = document.querySelectorAll('.accordion-item');
      accordionItems.forEach((item) => {
        const collapseElement = item.querySelector('.collapse');
        if (collapseElement.classList.contains('show')) {
          collapseElement.classList.remove('show');
        }
      });
    };

    removeDefaultOpenState();
  }, []);
  return (
    <>
      <div className='container w-75'>
        {/* <div className='row'> */}
        <div className="accordion" id="accordionExample">
          {
            celebData.map((data, index) => {
              return (
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <div className="accordion-button collapsed" type="button" data-bs-toggle={`collapse`} data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                      <img src={data.picture} width={50} height={50} className='mx-2' />
                      {data.first} {data.last}
                    </div>
                  </h2>
                  <div id={`collapse${index}`} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <div className='row'>
                        <div className="col">

                          <div>Age</div>
                          <div>{calculateAge(data.dob)} Years</div>
                        </div>
                        <div className="col">

                          <div>Gender</div>
                          <div>{data.gender}</div>
                        </div>
                        <div className="col">
                          <div>Country</div>
                          <div>{data.country}</div>
                        </div>
                      </div>
                      <div className='row'>
                        <div>
                          Description
                        </div>
                        <div>
                          {data.description}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className='mx-2' onClick={deleteItem}>
                          <i className="bi bi-trash"></i>
                        </div>
                        <div className='mx-2'>
                          <i className="bi bi-pencil" onClick={editItem}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              )
            })
          }
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default App
