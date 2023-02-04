import React, { useState } from 'react'

const Form = () => {

  const formData = {
    firstname:"",
    address:"",
    pincode:"",
    phonenumber:"",
    design:"",
    note:""
  }
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(formData)

  const handleInput = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setData({
      ...data,
      [e.target.name] : value,
    })
    console.log("FORM DATA~~~~>>>>>", data)
    // setSubmitted(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
      if(data.firstname && data.address && data.pincode && data.phonenumber && data.design && data.note) {
        console.log("SUBMIT~~>>")
      }
      
  }

  return (
    <div class="container-xxl card m-5">
        <div class="card-header">
        <h5 class="mb-0">FORM</h5>
        {/* <small class="text-muted float-end">Merged input group</small> */}
        </div>
    <div class="card-body">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label class="form-label" for="basic-icon-default-fullname">Full Name <span className='error'>*</span> </label>
          <div class="input-group input-group-merge">
            <span id="basic-icon-default-fullname2" className={submitted && !data.firstname ? `input-group-text invalid ` : `input-group-text`}
              ><i class="bx bx-user"></i></span>
            <input
              type="text"
              className={submitted && !data.firstname ? `form-control invalid ` : `form-control`}
              id="basic-icon-default-fullname"
              name="firstname"
              value={data.firstname || ""}
              placeholder="John Doe"
              aria-label="John Doe"
              aria-describedby="basic-icon-default-fullname2"
              onChange={handleInput}
            />
          </div>
            {
              submitted && !data.firstname && <label class="error" for="basic-icon-default-fullname">Name is required</label>
            }
        </div>

        <div class="mb-3">
          <label class="form-label" for="basic-icon-default-address">Address <span className='error'>*</span></label>
          <div class="input-group input-group-merge">
            <span id="basic-icon-default-address" className={submitted && !data.address ? `input-group-text invalid ` : `input-group-text`}
              ><i class="bx bx-buildings"></i></span>
            <input
              type="text"
              className={submitted && !data.address ? `form-control invalid ` : `form-control`}
              id="basic-icon-default-address"
              name="address"
              value={data.address || ""}
              placeholder="Street, city"
              aria-label="Street, city"
              aria-describedby="basic-icon-default-fullname2"
              onChange={handleInput}
            />
          </div>
            {
              submitted && !data.address && <label class="error" for="basic-icon-default-fullname">Enter Address</label>
            }
        </div>

        <div class="mb-3">
          <label class="form-label" for="basic-icon-default-pincode">Pin Code <span className='error'>*</span></label>
          <div class="input-group input-group-merge">
            <span id="basic-icon-default-pincode" className={submitted && !data.pincode ? `input-group-text invalid ` : `input-group-text`}
              ><i class="bx bx-globe"></i></span>
            <input
              type="text"
              className={submitted && !data.pincode ? `form-control invalid ` : `form-control`}
              id="basic-icon-default-pincode"
              name="pincode"
              value={data.pincode || ""}
              placeholder="123456"
              aria-label="123456"
              aria-describedby="basic-icon-default-fullname2"
              onChange={handleInput}
            />
          </div>
            {
              submitted && !data.pincode && <label class="error" for="basic-icon-default-fullname">Provide Pincode</label>
            }
        </div>

        <div class="mb-3">
          <label class="form-label" for="basic-icon-default-phonenumber">Phone Number <span className='error'>*</span></label>
          <div class="input-group input-group-merge">
            <span id="basic-icon-default-phone2" className={submitted && !data.phonenumber ? `input-group-text invalid ` : `input-group-text`}
              ><i class="bx bx-phone"></i></span>
            <input
              type="text"
              className={submitted && !data.phonenumber ? `form-control invalid ` : `form-control`}
              id="basic-icon-default-phonenumber"
              name="phonenumber"
              value={data.phonenumber || ""}
              placeholder="123 456 4560"
              aria-label="123 456 4560"
              aria-describedby="basic-icon-default-fullname2"
              onChange={handleInput}
            />
          </div>
            {
              submitted && !data.phonenumber && <label class="error" for="basic-icon-default-fullname">Enter Phone number</label>
            }
        </div>

        <div class="mb-3">
          <label class="form-label" for="basic-icon-default-design">Design <span className='error'>*</span></label>
          <div class="input-group input-group-merge">
            <span id="basic-icon-default-design" className={submitted && !data.design ? `input-group-text invalid ` : `input-group-text`}
              ><i class="bx bx-card"></i></span>
            <input
              type="text"
              className={submitted && !data.design ? `form-control invalid ` : `form-control`}
              id="basic-icon-default-design"
              name="design"
              value={data.design || ""}
              placeholder="..."
              aria-label="..."
              aria-describedby="basic-icon-default-fullname2"
              onChange={handleInput}
            />
          </div>
            {
              submitted && !data.design && <label class="error" for="basic-icon-default-fullname">Design is required</label>
            }
        </div>
        
        <div class="mb-3">
            <label for="formFile" class="form-label">photo Upload</label>
            <input class="form-control" type="file" id="formFile" />
        </div>

        <div class="mb-3">
          <label class="form-label" for="basic-icon-default-note">Note</label>
          <div class="input-group input-group-merge">
            <span id="basic-icon-default-note" class="input-group-text"
              ><i class="bx bx-comment"></i></span>
              <textarea
              id="basic-icon-default-note"
              name="note"
              value={data.note || ""}
              class="form-control"
              placeholder="Hi, Do you have a moment to talk Joe?"
              aria-label="Hi, Do you have a moment to talk Joe?"
              aria-describedby="basic-icon-default-message2"
              onChange={handleInput}
            ></textarea>
          </div>
            
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </div>
  </div>
                
  )
}

export default Form