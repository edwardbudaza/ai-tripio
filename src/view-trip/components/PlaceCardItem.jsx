// import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
// import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({place}) {

    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
      place && GetPlacePhotos();
    }, [place])

    const GetPlacePhotos = async () => {
      const data = {
        textQuery: place?.location
      }
      const result= await GetPlaceDetails(data).then(resp => { 
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}",resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      })
    };


  return (
    <Link to={'https://google.com/maps/search/?api=1&query=' + place.location} target="_blank">
        <div className="flex border rounded-xl p-3 mt-2 gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
            <img 
                className="w-[130px] h-[100px] rounded-xl object-cover"
                src={photoUrl? photoUrl : "/placeholder.jpg" }
            />
            <div>
                <h2 className="font-bold text-lg">{place.location}</h2>
                <p className="text-xs text-gray-400">{place.details}</p>
                {/* <Button size="sm"><FaMapLocationDot /></Button> */}
            </div>
        </div>
    </Link>
  );
};
export default PlaceCardItem