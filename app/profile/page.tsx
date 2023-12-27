"use client"
import PrivateRoute from "@/utils/PrivateRoute";
import { useAuth } from "@/utils/contextfile";
import Image from "next/image";

const Profile = () => {
    const { isAuthenticated, user, login, logout } = useAuth();
    console.log(user)

  return (
      <div className='w-full px-10 my-20'>
          {/*<h1 className='text-sm pb-14'>Hi <span className='italic'>{user.username}</span>! 👋</h1>*/}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-20 place-content-between">
                  <div key={user.id} className="bg-white w-full p-4 shadow-md rounded-md">
                      <div className="mb-4">
                          <strong>Username:</strong> {user.username}
                      </div>
                      <div className="mb-4">
                          <strong>First Name:</strong> {user.firstname}
                      </div>
                      <div className="mb-4">
                          <strong>Last Name:</strong> {user.lastname}
                      </div>
                      <div className="mb-4">
                          <strong>Email:</strong> {user.email}
                      </div>
                      <div className="mb-4">
                          <strong>Phone Number:</strong> {user.phone}
                      </div>
                      <div className="mb-4">
                          <strong>State:</strong> {user.state}
                      </div>
                      <div className="mb-4">
                          <strong>City:</strong> {user.city}
                      </div>
                      <div className="mb-4">
                          <strong>Local Govt. Area:</strong> {user.lga}
                      </div>
                      <div className="mb-4">
                          <strong>Matriculation Number:</strong> {user.mat}
                      </div>
                      <div className="mb-4">
                          <strong>Department:</strong> {user.department}
                      </div>
                      <div className="mb-4">
                          <strong>Year of Study:</strong> {user.yearofstudy}
                      </div>
                      <div className="mb-4">
                          <strong>Year of Graduation:</strong> {user.yearofgraduation}
                      </div>
                      {/* Add more fields based on your data */}

                      {/* Display face image */}
                  </div>
                  <div className="mb-4 bg-white w-full p-4 shadow-md rounded-md">
                      <strong>Face Image:</strong>
                      <div className='w-[50%]'>
                          <Image
                              src={`data:image/jpeg;base64,${user.faceUpload}`} // Assuming 'faceUpload' contains the image URL
                              alt="Face"
                              width={20}
                              height={20}
                              className="w-full h-auto mt-2"
                          />
                      </div>
                  </div>
              </div>
      </div>
  );
};

export default PrivateRoute(Profile);
