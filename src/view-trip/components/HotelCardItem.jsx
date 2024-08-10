import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({hotel}) {
    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
        hotel && GetPlacePhotos();
    }, [hotel])

    const GetPlacePhotos = async () => {
        const data = {
        textQuery: hotel?.name
        }
        const result= await GetPlaceDetails(data).then(resp => {
        console.log(resp.data.places[0].photos[3].name)
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}",resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
        })
    };

  return (
    <Link to={'https://google.com/maps/search/?api=1&query=' + hotel?.name + ", " + hotel?.address} target="_blank">
        <div className="hover:scale-105 transition-all cursor-pointer">
            <img src={photoUrl? photoUrl : "placeholder.jpg"} className="rounded-xl h-[180px] w-full object-cover"/>
            <div className="flex flex-col my-2 gap-2">
                <h2 className="font-medium">{hotel?.name}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
                <h2 className="text-sm">💰 {hotel?.price}</h2>
                <h2 className="text-sm">⭐ {hotel?.rating}</h2>
            </div>
        </div>
    </Link>
  )
}
export default HotelCardItem