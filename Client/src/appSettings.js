const serverUrl = "http://localhost:5231/";

const appSettings = {
    serverUrl,
    registerEndpoint: `${serverUrl}api/Account/SignUp`,
    loginEndpoint: `${serverUrl}api/Account/SignIn`
};

export default appSettings;
