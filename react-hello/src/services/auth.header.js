const auth = {}
auth.authHeader = function(){
    const user = JSON.parse(localStorage.getItem("user"));
    if (user){
        return {"x-access-token": user.token}
    }else{
        return {};
    }
}

export default auth;