import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { User, Mail, Upload, Loader } from "lucide-react"
import { clearError, loadUser, updateUser } from "../../action/userAction"
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant"
import MetaData from "../MetaData"



export default function UpdateProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, loading } = useSelector((state) => state.user)
  const { isUpdated, error } = useSelector((state) => state.profile)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("/images/defa.png")

  const updateSubmit = (e) => {
    e.preventDefault()
    dispatch(clearError())
    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("avatar", avatar)
    dispatch(updateUser(myForm))
  }

  const updateDataChange = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result)
        setAvatarPreview(reader.result)
      }
    }
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setAvatarPreview(user.avatar?.url || "/images/defa.png")
    }

    if (error) {
      toast.error(error)
    }

    if (isUpdated) {
      toast.success("User Details Updated Successfully")
      dispatch(loadUser())
      navigate("/account")

      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
    }
  }, [error, navigate, isUpdated, dispatch, user])

  return (
    <>
      <MetaData title="Update Profile" />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Update Your Profile</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {loading ? (
              <div className="flex justify-center">
                <Loader className="animate-spin h-8 w-8 text-indigo-600" />
              </div>
            ) : (
              <form className="space-y-6" onSubmit={updateSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                    Profile Picture
                  </label>
                  <div className="mt-2 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <img src={avatarPreview} alt="Avatar Preview" className="h-full w-full object-cover" />
                    </span>
                    <label
                      htmlFor="avatar-upload"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span>Change</span>
                      <input
                        id="avatar-upload"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        onChange={updateDataChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}