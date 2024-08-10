import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";



function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true)
      return;
    }

    if (
      !(
        formData?.noOfDays >= 1 &&
        formData?.noOfDays <= 6 &&
        formData?.location &&
        formData?.budget &&
        formData?.traveler 
      )
    )
    {
      toast( "Please fill all the details correctly");
      return ;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}',formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

      const result = await chatSession.sendMessage(FINAL_PROMPT)

      console.log("--",result?.response?.text());
      setLoading(false);
      SaveAITrip(result?.response?.text());



  };

  const SaveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });

    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile  = (tokenInfo) => {
    console.log("Token Info:", tokenInfo);
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,{
      headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem("user", JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  };

  return (
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
        <p className="mt-3 text-gray-500 text-xl">Simply provide some basic details, and our trip planner will create a personalized itinerary tailored to your preferences.</p>
        
        <div className="flex flex-col mt-20 gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
            <GooglePlacesAutocomplete 
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v); 
                  handleInputChange("location", v);
                }
              }}
            />
          </div>  

          <div>
              <h2 className="text-xl my-3 font-medium">How many days are you planning for your trip?</h2>
              <Input placeholder={"Just type the number of days like: 4 (Enter days from 1 to 6 only)"} type="number" 
                onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              />
          </div>
        </div>       

        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} 
              onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer duration-200 rounded-lg hover:shadow-lg
                ${formData?.budget == item.title && 'shadow-lg  border-[#8759F2]'}  
                `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg mt-2">{item.title}</h2>
                <h2 className="text-sm text-gray-500 mt-2">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium"> Who do you plan to travelling on your next adventure?</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div key={index} 
              onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border cursor-pointer duration-200 rounded-lg hover:shadow-lg
                ${formData?.traveler == item.people && 'shadow-lg border-[#8759F2]'}  
                `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg mt-2">{item.title}</h2>
                <h2 className="text-sm text-gray-500 mt-2">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="flex my-10 justify-end">
          <Button 
            disabled={loading}
            onClick={OnGenerateTrip}
          >
            {loading ?  
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/>
              : "Generate Trip" 
            }
          </Button>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" width="175" height="175"/>
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button 
                  onClick={login} 
                  className="w-full mt-5 flex gap-4 items-center"
                >
                    <FcGoogle className="h-6 w-6"/>
                    Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      </div>
  );
};
export default CreateTrip;