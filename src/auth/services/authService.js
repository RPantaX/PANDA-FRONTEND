
export const loginUser = (userLogin) => {
    return (userLogin.email === 'admin' && userLogin.password==='12345') ? true :false;
}
