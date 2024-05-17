import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Tilt } from 'react-tilt'
import { Dialog, DialogPanel, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  const [data, setData] = useState([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  })

  useEffect(() => {
    axios
      .get('https://tacnique-backend.onrender.com/api/one')
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  const defaultOptions = {
    reverse: false,
    max: 35,
    perspective: 1000,
    scale: 1.1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: 'cubic-bezier(.03,.98,.52,.99)',
  }

  function deleteUser(id) {
    axios
      .delete('https://tacnique-backend.onrender.com/api/' + id)
      .then((res) => {
        console.log(res)
        console.log('deleted successfully')
        setData(data.filter((item) => item._id !== id))
        closeDeleteModal()
      })
      .catch((err) => console.log(err))
  }

  function openEditModal(item) {
    setSelectedUser(item)
    setFormValues({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      department: item.department,
    })
    setIsEditOpen(true)
  }

  function closeEditModal() {
    setIsEditOpen(false)
    setSelectedUser(null)
  }

  function openDeleteModal(item) {
    setSelectedUser(item)
    setIsDeleteOpen(true)
  }

  function closeDeleteModal() {
    setIsDeleteOpen(false)
    setSelectedUser(null)
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    console.log(formValues)
    axios
      .patch(
        'https://tacnique-backend.onrender.com/api/' + selectedUser._id,
        formValues
      )
      .then((res) => {
        console.log('updated successfully', res)
        setData(
          data.map((item) => (item._id === selectedUser._id ? res.data : item))
        )
        closeEditModal()
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[50px] px-[10px] sm:px-[50px] py-[50px]">
        {loading
          ? [...Array(9)].map((_, index) => (
              <Skeleton key={index} count={1} height={200} width={300} />
            ))
          : data.map((item) => (
              <Link to={`/viewUser/${item._id}`} key={item._id}>
                <Tilt
                  options={defaultOptions}
                  className="hover:bg-gray-100 transition duration-75 ease-in-out group">
                  <div className="shadow-lg px-[20px] py-[30px] ">
                    <div className="flex place-content-center py-[10px] gap-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[35px]  self-center stroke-2 group-hover:stroke-gray-600">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>

                      <h1 className="text-[30px] font-medium group-hover:text-gray-600 truncate">
                        {item.firstName} {item.lastName}
                      </h1>
                    </div>
                    <div className="flex place-content-center gap-[10px] py-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[20px] stroke-2 group-hover:stroke-gray-600">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                        />
                      </svg>

                      <h1 className="text-[18px] font-medium group-hover:text-gray-600 truncate">
                        {item.email}
                      </h1>
                    </div>
                    <div className="flex place-content-center gap-[10px] py-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[20px] stroke-2 group-hover:stroke-gray-600">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.182 48.182 0 0 0-7.5 0"
                        />
                      </svg>

                      <h1 className="text-[18px] font-medium group-hover:text-gray-600 truncate">
                        {item.department}
                      </h1>
                    </div>

                    <div className="flex justify-center gap-[10px]">
                      <Link to="/">
                        <button
                          onClick={() => openEditModal(item)}
                          className="bg-gray-600 px-[10px] py-[5px] group-hover:bg-gray-300 group-hover:text-black font-medium rounded-lg text-white">
                          EDIT
                        </button>
                      </Link>
                      <Link to="/">
                        <button
                          onClick={() => openDeleteModal(item)}
                          className="bg-gray-600 px-[10px] py-[5px] group-hover:bg-gray-300 group-hover:text-black font-medium rounded-lg text-white">
                          DELETE
                        </button>
                      </Link>
                    </div>
                  </div>
                </Tilt>
              </Link>
            ))}
      </div>

      {selectedUser && (
        <Transition appear show={isEditOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95">
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div>
                      <h1 className="text-2xl text-black font-medium tracking-wide">
                        EDIT {selectedUser.firstName} {selectedUser.lastName}{' '}
                        DETAILS
                      </h1>

                      <form onSubmit={handleFormSubmit}>
                        <input
                          name="firstName"
                          value={formValues.firstName}
                          onChange={handleInputChange}
                          className="border bg-gray-100 px-[10px] py-[5px] focus:outline-none w-full rounded-md my-[10px]"
                        />
                        <br />
                        <input
                          name="lastName"
                          value={formValues.lastName}
                          onChange={handleInputChange}
                          className="border bg-gray-100 px-[10px] py-[5px] rounded-md focus:outline-none w-full my-[10px]"
                        />
                        <br />
                        <input
                          name="email"
                          value={formValues.email}
                          onChange={handleInputChange}
                          className="border bg-gray-100 px-[10px] py-[5px] rounded-md focus:outline-none w-full my-[10px]"
                        />
                        <br />
                        <input
                          name="department"
                          value={formValues.department}
                          onChange={handleInputChange}
                          className="border bg-gray-100 px-[10px] py-[5px] rounded-md focus:outline-none w-full my-[10px]"
                        />
                        <br />
                        <div className="flex justify-between mt-4">
                          <button
                            type="submit"
                            className="bg-gray-200 px-2 py-1 font-medium rounded-md">
                            Submit
                          </button>
                          <button
                            type="button"
                            className="bg-gray-200 px-2 py-1 font-medium rounded-md"
                            onClick={closeEditModal}>
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}

      {selectedUser && (
        <Transition appear show={isDeleteOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95">
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div>
                      <h1 className="text-2xl text-black font-medium tracking-wide">
                        Confirm Deletion
                      </h1>
                      <p className="mt-4">
                        Are you sure you want to delete {selectedUser.firstName}{' '}
                        {selectedUser.lastName}?
                      </p>
                      <div className="flex justify-between mt-6">
                        <button
                          className="bg-red-600 text-white px-4 py-2 font-medium rounded-md"
                          onClick={() => deleteUser(selectedUser._id)}>
                          Delete
                        </button>
                        <button
                          className="bg-gray-200 px-4 py-2 font-medium rounded-md"
                          onClick={closeDeleteModal}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  )
}
