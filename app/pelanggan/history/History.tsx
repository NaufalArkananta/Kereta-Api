import { HistoryType } from "@/app/karyawan/types";
import { showTime } from "../jadwal/Schedule";

interface Props {
  item: HistoryType;
}

const History = (myProp: Props) => {
  return (
    // <div className='bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-full transition-all hover:shadow-xl '>
    //   <div className='grid grid-cols-4 gap-1 mb-8'>
    //     <InfoSection
    //       title="TGL ORDER"
    //       content={showTime(props.item.purchase_date)}
    //     />
    //     <InfoSection
    //       title="Stasiun Awal"
    //       content={props.item.schedule_details.departured_location}
    //       subContent={showTime(props.item.schedule_details.departured_time)}
    //     />
    //     <InfoSection
    //       title="Stasiun Akhir"
    //       content={props.item.schedule_details.arrived_location}
    //       subContent={showTime(props.item.schedule_details.arrived_time)}
    //     />
    //     <InfoSection
    //       title="Nama Kereta"
    //       content={props.item.schedule_details.train_details?.name || "-"}
    //     />
    //   </div>


    // </div>
    <div className="w-full border rounded-md shadow-md gap-6 my-2">
      <div className="flex justify-center gap-20">
        <div className="flex flex-col p-5">
          <small className="text-xs font-semibold text-sky-700">
            Tanggal Order
          </small>
          <strong>{showTime(myProp.item.purchase_date)}</strong>
        </div>
        <div className="flex flex-col p-5">
          <small className="text-xs font-semibold text-sky-700">
            Berangkat Dari
          </small>
          <strong>{myProp.item.schedule_details.departured_location}</strong>
        </div>
        <div className="flex flex-col p-5">
          <small className="text-xs font-semibold text-sky-700">
            Waktu Keberangkatan
          </small>
          <strong>
            {showTime(myProp.item.schedule_details.departured_time)}
          </strong>
        </div>
        <div className="flex flex-col p-5">
          <small className="text-xs font-semibold text-sky-700">Tiba Di</small>
          <strong>{myProp.item.schedule_details.arrived_location}</strong>
        </div>
        <div className="flex flex-col p-5">
          <small className="text-xs font-semibold text-sky-700">
            Waktu Kedatangan
          </small>
          <strong>{showTime(myProp.item.schedule_details.arrived_time)}</strong>
        </div>
        <div className="flex flex-col p-5">
          <small className="text-xs font-semibold text-sky-700">
            Unit Kereta
          </small>
          <strong>{myProp.item.schedule_details.train_details.name}</strong>
        </div>
      </div>

      <div className="p-5">
        <h1 className="text-xs font-semibold text-sky-700 mb-3">List Penumpang</h1>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-50">
              <tr className="text-center">
                <th className="text-xs font-semibold text-sky-700">Nama</th>
                <th className="text-xs font-semibold text-sky-700">NIK</th>
                <th className="text-xs font-semibold text-sky-700">Nomor</th>
              </tr>
            </thead>
            <tbody>
              {myProp.item.purchases_details.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 text-center">
                  <td className="py-3 px-4 text-sm text-gray-800">{item.passanger_name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.passanger_id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.seat_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;