import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function AddUser() {
  const nav = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  function addUser(data) {
    console.log(data)
    const firstName = data.firstName
    const lastName = data.lastName

    const email = data.email
    const department = data.department
    // console.log(firstName, lastName, department, email)
    axios
      .post('https://tacnique-backend.onrender.com/api', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        department: department,
      })
      .then((res) => {
        console.log('added user')
        console.log(res)
        nav('/')
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="lg:mx-[35%] lg:py-[50px] py-[10px]">
      <h1 className="text-[30px] font-medium font-mono">ADD USER</h1>
      <form
        className="border w-[500px] shadow-xl my-[20px] py-[5px]"
        onSubmit={handleSubmit(addUser)}>
        <div className="">
          <label for="fname" className="text-[20px] px-[10px] font-mono ">
            First Name :
          </label>
          <input
            id="fname"
            className="border px-[10px] py-[5px] my-[5px] sm:w-full font-mono focus:outline-gray-300"
            type="text"
            placeholder="Enter First Name"
            {...register('firstName', { required: true })}
          />
          {errors.firstName && (
            <p className="px-[10px] text-red-600 mt-[1px]">
              First Name is required
            </p>
          )}
        </div>

        <div className="my-[30px]">
          <label for="lname" className="text-[20px] px-[10px] font-mono ">
            Last Name :
          </label>
          <input
            id="lname"
            className="border px-[10px] py-[5px] my-[5px] sm:w-full font-mono focus:outline-gray-300"
            type="text"
            placeholder="Enter Last Name"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && (
            <p className="px-[10px] text-red-600 mt-[1px]">
              Last Name is required
            </p>
          )}
        </div>

        <div className="">
          <label for="email" className="text-[20px] px-[10px] font-mono ">
            Email :
          </label>

          <input
            id="email"
            className="border px-[10px] py-[5px] my-[5px] sm:w-full font-mono focus:outline-gray-300"
            placeholder="Enter Email Address"
            // type="email"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+\.\S+$/i,
            })}
          />

          {errors.email && errors.email.type === 'required' && (
            <p className="px-[10px] text-red-600 mt-[1px]">
              Email is required.
            </p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className="px-[10px] text-red-600 mt-[1px]">
              Invalid email address.
            </p>
          )}
        </div>
        <div className="my-[30px]">
          <label for="dpt" className="text-[20px] px-[10px] font-mono ">
            Department :
          </label>
          <input
            id="dpt"
            className="border px-[10px] py-[5px] my-[5px] sm:w-full font-mono focus:outline-gray-300"
            type="text"
            placeholder="Enter Department"
            {...register('department', { required: true })}
          />
          {errors.department && (
            <p className="px-[10px] text-red-600 mt-[1px]">
              Department is required
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-[10px] py-[5px] bg-gray-100 font-medium">
          ADD
        </button>
      </form>
    </div>
  )
}
