function logout(){
    const url = "http://localhost:4444/auth/logout";
    fetch(url, {method: "DELETE"})
        .then(async (res)=> {
            if(res.status === 200){
                res = await res.json();
                location.href = res.redirectUrl;
            }else {
                console.log(res);
            }
        })
        .catch((err)=>console.log(err));
}