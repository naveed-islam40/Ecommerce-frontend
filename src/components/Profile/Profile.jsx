import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { UserCircle, Mail, Calendar, Package, Key, Pencil } from "lucide-react"


export default function Profile() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signup")
    }
  }, [navigate, isAuthenticated])

  if (loading || !user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">My Profile</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Details and account information.</p>
            </div>
            <Link
              to="/me/update"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no-underline"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <UserCircle className="h-5 w-5 mr-2 text-gray-400" />
                  Full Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gray-400" />
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                  Joined On
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Profile Image</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.avatar && user.avatar.url ? (
                    <img
                      src={user.avatar.url}
                      alt={user.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-24 w-24 text-gray-300" />
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/order/me"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 no-underline"
          >
            <Package className="h-4 w-4 mr-2" />
            My Orders
          </Link>
          <Link
            to="/password/update"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 no-underline"
          >
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Link>
        </div>
      </div>
    </div>
  )
}