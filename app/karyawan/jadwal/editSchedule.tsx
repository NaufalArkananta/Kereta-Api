"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { ScheduleType } from "../types"

type props = {
    item: ScheduleType
}

const EditSchedule = (myProp: props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDepaturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDepaturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDepaturedLocation(myProp.item.departured_location)
        setArrivedLocation(myProp.item.arrived_location)
        setDepaturedTime(new Date(myProp.item.departured_time))
        setArrivedTime(new Date(myProp.item.arrived_time))
        setPrice(myProp.item.price)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `/schedule/${myProp.item.id}`
            const requestData = {
                departured_location,arrived_location,departured_time,arrived_time,price
            }
            const TOKEN = getCookie(`token`)
            const response: any = await axiosInstance.put(url,requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            const message = response.data.message
            if(response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`, 
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type:`warning`
                })
            }
        } catch (error) {
            console.log(error);
            toast(`something wrong`, {
                containerId: `toastEdit-${myProp.item.id}`,
                type: "error"
            })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.item.id}`} />
            <button className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600" 
            type="button"
            onClick={() => openModal()}>
                Edit
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Data Jadwal Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Berangkat dari
                            </small>
                            <input type="text" id={`depatured_location`}
                            value={departured_location}
                            onChange={e => setDepaturedLocation(e.target.value)}
                            className="w-full p-1 outline-none hover:border-b-sky-500"
                            required={true}/>
                        </div>
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu keberangkat
                            </small>
                            <br />
                            <DatePicker 
                            id={`depatured_time`}
                            className="w-full p-1 outline-none hover:border-b-sky-500"
                            selected={new Date(departured_time)}
                            dateFormat={`dd MMMM yyyy HH:mm`}
                            onChange={date => setDepaturedTime(date || new Date())}
                            />
                        </div>
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Tiba dari
                            </small>
                            <input type="text" id={`arrived_location`}
                            value={arrived_location}
                            onChange={e => setArrivedLocation(e.target.value)}
                            className="w-full p-1 outline-none hover:border-b-sky-500"
                            required={true}/>
                        </div>
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu kedatangan
                            </small>
                            <br />
                            <DatePicker 
                            id={`arrived_time`}
                            className="w-full p-1 outline-none hover:border-b-sky-500"
                            selected={new Date(arrived_time)}
                            dateFormat={`dd MMMM yyyy HH:mm`}
                            onChange={date => setArrivedTime(date || new Date())}
                            />
                        </div>
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Price
                            </small>
                            <input type="number" id={`price`}
                            value={price.toString()}
                            onChange={e => setPrice(Number(e.target.value))}
                            className="w-full p-1 outline-none hover:border-b-sky-500"
                            required={true}/>
                        </div>
                    </div>
                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end">
                        <button type="button"
                        onClick={() => closeModal()}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>
                        <button type="submit"
                        className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
export default EditSchedule