const getUserBySession = async () => {
    let user = {
        _id: "",
        email: "",
        first_name: "",
        last_name: "",
    }
    let cookies = null;
    const breakpoint = document.cookie.indexOf("=");

    cookies = {
        session: document.cookie.substr(breakpoint + 1, document.cookie.length - 1)
    };

    await fetch("/auth/get_user_by_session", {
        method: "GET",
        headers: {
            "id": cookies.session
        }
    })
        .then(res => res.json())
        .then(res => {
            if (res.data) {
                if (res.data[0]) {
                    return res?.data[0]
                }
            }
        })
        .then(res => {
            user = {
                _id: res._id,
                email: res.email,
                first_name: res.first_name,
                last_name: res.last_name,
            }


        });

    return user;
}

const geez = getUserBySession();

export default setTimeout(() => {
    geez();
}, 1000);

