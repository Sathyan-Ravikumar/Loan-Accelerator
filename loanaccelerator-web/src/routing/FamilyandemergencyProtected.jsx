import { Navigate } from "react-router-dom";

function FamilyandEmergencyProtected({token,children})
{
    token=localStorage.getItem("token");
    if(token!=null)
        return children;
    return <Navigate to='/'/>
}

export default  FamilyandEmergencyProtected;