/** function to call detail kereta
 * that include gerbong dan kursi
 */

import { getServerCookie } from "@/helper/server-cookie";
import { KeretaType } from "../../types";
import { axiosInstance } from "@/helper/api";
import Gerbong from "./Gerbong";
import AddGerbong from "./addGerbong";

const getDetailKereta = async (
    id: string
): Promise<KeretaType | null> => {
    try {
        const token = await getServerCookie('token')
        const  response: any = await axiosInstance.get(`/train/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.data.success === false) {
            return null
        }

        return response.data.data;

    } catch (error) {
        console.log(error);
        return null
    }
}

type props = {
    params: {
        id: string
    }
}

const DetailKeretaPage = async (
    myprops: props
) => {

    const id = myprops.params.id

    const dataKereta = await getDetailKereta(id)
    return (
        <div className="w-full p-3">
            {
                dataKereta == null ? 
                <div className="bg-yellow-100 rounded-md p-3">
                    <h1 className="text-lg font-semibold">
                        Informasi
                    </h1>
                    <p className="text-sm text-slate-500">
                        Data tidak ditemukan
                    </p>
                </div>
                :
                <div>
                    <h1 className="text-lg font-semibold">
                        {dataKereta.name}
                    </h1>
                    <p className="text-sm text-slate-500">
                        {dataKereta.descriptions}
                    </p>
                    <h2 className="text-base font-medium pb-2">
                        Daftar Gerbong
                    </h2>
                        <AddGerbong id_kereta={Number(id)} />
                    <div className="my-5">
                        {/* mapping data gerbong */}
                        {
                            dataKereta.wagons.map((gerbong, index) => (
                                <Gerbong item={gerbong} 
                                    key={`keyGerbong-${index}`} 
                                />
                            ))
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default DetailKeretaPage