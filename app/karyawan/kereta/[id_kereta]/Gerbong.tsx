import { GerbongType, KursiType } from "../../types"
import AddSeat from "./addSeat"
import DropGerbong from "./dropGerbong"
import EditGerbong from "./editGerbong"
import Seat from "./Seat"

type props = {
    item: GerbongType
}
const Gerbong = (myProp:props) => {
    return (
        <div className="w-full my-2 bg-slate-50 rounded-md shadow-md flex flex-wrap justify-between">
            <div className="p-3">
                <small className="text-xs">Nama Gerbong</small>
                <br />
                {myProp.item.name}
                <br />
                Jumlah Kursi: {myProp.item.seat_count}

                <div className="w-full my-2">
                    {
                        myProp.item.seats.length == 0 ?
                        <div className="flex justify-center items-center gap-3">
                            <AddSeat wagon_id={Number(myProp.item.id)}/>
                            <div className="bg-sky-200 p-3 rounded-md">
                                Gerbong ini belum mempunyai kursi
                            </div>
                        </div>
                        :
                        <div className="flex flex-wrap gap-6 rounded-md">
                            <AddSeat wagon_id={Number(myProp.item.id)}/>
                            {
                                myProp.item.seats.map((seat, index) => (
                                    <Seat key={`keySeat${index}`}
                                        item={seat} />
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="p-3 flex gap-2">
                <EditGerbong item={myProp.item} />
                <DropGerbong item={myProp.item} />
            </div>
        </div>
    )
}

export default Gerbong