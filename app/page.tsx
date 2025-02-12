"use client"

import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { axiosInstance } from "@/helper/api"
import { storeCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const url = `/auth`
      const requestData = {
        username,
        password
      }
      // hit endpoint
      const response: any = await axiosInstance.post(url, requestData)
      if (response.data.succes === false)  {
        const message = response.data.message
        toast(
          message,{
            containerId: `toastLogin`, type: "warning"
          }
        )
      } else {
        const message = response.data.message
        const token = response.data.token
        const role = response.data.role

        // store token in cookie
        storeCookie(`token`, token)
        
        toast(
          message,{
            containerId: `toastLogin`, type: "success"
          }
        )
        
        if(role === `ADMIN`) {
          setTimeout(
            () => router.replace(`/karyawan/kereta`),
            1000
          )
        } else {
          setTimeout(
            () => router.replace(`/pelanggan/jadwal`),
            1000
          )
        }
      }
    } catch (error) {
      console.log(error)
      toast(`Something went wrong`, {containerId: `toastLogin`, type: "error"})
    }
  }

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <ToastContainer 
      containerId={`toastLogin`}/>
      <form className="w-5/6 md:w-1/2 p-3 border rounded-lg" onSubmit={e => handleSubmit(e)}>
        {/* header login */}
        <div className="w-full bg-blue-600 text-white p-3">
          <h1 className="text-xl font-semibold">Login</h1>
        </div>
        {/* form login */}
        <div className="w-full p-5">
          <div className="mb-3">
            <span className="text-sm text-blue-600">Username</span>
            <input type="text" 
              id={`username`}
              value={username} 
              onChange={ e => setUsername(e.target.value) }
              className="w-full p-2 border rounded-md"
              required={true}
            />
          </div>

          <div className="mb-3">
            <span className="text-sm text-blue-600">Password</span>
            <input type="password" 
              id={`password`}
              value={password} 
              onChange={ e => setPassword(e.target.value) }
              className="w-full p-2 border rounded-md"
              required={true}
            />
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-800 text-white w-full rounded-md px-4 py-2">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage