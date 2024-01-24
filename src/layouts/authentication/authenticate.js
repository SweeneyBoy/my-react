import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import userpool from "./userpool";

export const authenticate=(Email,Password)=>{
    return new Promise((resolve,reject)=>{
        const user=new CognitoUser({
            Username:Email,
            Pool:userpool
        });

        const authDetails= new AuthenticationDetails({
            Username:Email,
            Password
        });

        user.authenticateUser(authDetails,{
            onSuccess:(result)=>{
               const accessToken = result.accessToken;
                
                localStorage.setItem('loggedIn',true);
                localStorage.setItem('token',result)
                localStorage.setItem('access',result.getAccessToken().getJwtToken())
                localStorage.setItem('idToken',result.getIdToken().getJwtToken())
                localStorage.setItem('refresh',result.getRefreshToken().getToken())
                localStorage.setItem('user',user)
                localStorage.setItem('userName',user.getUsername())
                
                console.log("login successful accessToken="+accessToken);
                console.log("login successful idToken="+result.getIdToken());
                console.log("login successful idTokenJWT="+result.getIdToken().getJwtToken());

                // console.log("login user token idTokenJWT="+user.getIdToken().getJwtToken());


                console.log(result);
                console.log(localStorage);
                console.log(user);
                console.log(user.getUsername());
                
                resolve(result);
            },
            onFailure:(err)=>{
                localStorage.setItem('loggedIn',false);
                console.log("login failed",err);
              //  console.log(user);
                // console.log(user.getUsername());
                reject(err);
            }
        });
    });
};

export const logout = () => {
    const user = userpool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
};
