import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react"; 
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import axios from "axios";


function Header() {

  const user = JSON.parse(localStorage.getItem("user")); 
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user)
  }, []);

  
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

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
      window.location.reload()
    })
  };

  return (
    <div className="flex p-3 shadow-sm justify-between items-center px-5">
       <a href="/">
          <img  src="/logo.svg" width={150} height={150} style={{ cursor: 'pointer' }}/>
       </a>
      <div>
        {user ? 
        <div className="flex items-center gap-3">
          <a href="/create-trip">
            <Button variant="outline" className="rounded-full">+ Create Trips</Button>
          </a>
          <a href="/my-trips">
            <Button variant="outline" className="rounded-full">My Trips</Button>
          </a>
          <Popover>
            <PopoverTrigger><img src={user?.picture} className="h-[35px] w-[35px] rounded-full"/> </PopoverTrigger>
            <PopoverContent>
              <h2 className="cursor-pointer" onClick={() => {
                googleLogout();
                localStorage.clear(); 
                window.location.reload();
              }}>Logout</h2>
            </PopoverContent>
          </Popover>
        </div>
         : <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
      }      
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
export default Header;