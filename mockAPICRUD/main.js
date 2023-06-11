class urow extends HTMLElement {
  constructor(userData) {
    super();
    this._id = userData["id"];
    this._createdAt = userData["createdAt"];
    this._name = userData["name"];
    this._lastname = userData["lastname"];
    this._profession = userData["profession"];
    this._randomenumber = userData["randomenumber"];
  }

  render() {
    this.innerHTML = `
      <div class="container d-flex">
        <p class="container m-2">${this._id}</p>
        <p class="container m-2">${this._name}</p>
        <p class="container m-2">${this._lastname}</p>
        <p class="container m-2">${this._profession}</p>
      </div>`;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("user-row", urow);

const baseUrl = "https://638d83c24190defdb745a6df.mockapi.io/";
const findIPbaseUrl =
  "https://ipgeolocation.abstractapi.com/v1/?api_key=72522b320c09463ea59de4ca1b704736";
const deletebtn = document.querySelector(".deletebtn");
const savebtn = document.querySelector(".savebtn");
const addbtn = document.querySelector(".addbtn");
// const findLocation = document.querySelector(".findLocation");

async function returnRes(url, endpoint, method) {
  try {
    const response = await fetch(url + endpoint, method);
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

const addUserRowsToDOM = (users) => {
  const appContainer = document.querySelector(".app");
  users.json().then((users) => {
    users.forEach((user) => {
      const userRow = new urow(user);
      appContainer.appendChild(userRow);
    });
  });
};

//populate user at First
const user = returnRes(baseUrl, "users", {});
user.then(addUserRowsToDOM).catch((error) => {
  console.error("An error occurred:", error);
});

const deleteUser = async (evt) => {
  const id = document.querySelector("input");
  try {
    const response = await fetch(`${baseUrl}/users/${id.value}`, {
      method: "DELETE",
    });
    response.json((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    });
  } catch (error) {
    console.error(error);
  }
  setTimeout(function () {
    window.location.reload();
  }, 1000);
};
const changeUser = (evt) => {
  const ipt = document.querySelector(".update").children;
  const inpArr = Array.from(ipt);
  const values = [];

  inpArr.forEach((elm) => {
    values.push(elm.value);
  });

  const payload = {
    id: values[0],
    name: values[1],
    lastname: values[2],
    profession: values[3],
  };

  try {
    fetch(`${baseUrl}users/${values[0]}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.log(error);
  }
  setTimeout(function () {
    window.location.reload();
  }, 1000);
};
const addNewUser = (evt) => {
  const addbtn = document.querySelector(".update").children;
  const addNewValues = Array.from(addbtn);
  const values = [];

  addNewValues.forEach((elm) => {
    values.push(elm.value);
  });

  const payload = {
    id: values[0],
    name: values[1],
    lastname: values[2],
    profession: values[3],
  };
  fetch(`${baseUrl}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  setTimeout(function () {
    window.location.reload();
  }, 1000);
};
// const getLocation = (evt) => {
//   const findip = document.querySelector(".findip");
//   const ip_address = findip.value;
//   console.log(ip_address);
//   try {
//     // const res = fetch(
//     //   `${findIPbaseUrl}&ip_address=${value}&fields=country,city`
//     // );
//     const res = fetch(`${findIPbaseUrl}&ip_address=${ip_address}&fields=country,city`
//     );
//     res.then((e) => {
//       if (!e.ok) {
//         throw new Error(res.statusText);
//       }
//       e.json().then((res) => {
//         console.log(res);
//         window.document.write("city : ", res?.city);
//         window.document.write(" ");
//         window.document.write("country :", res?.country);
//       });
//     });
//   } catch (error) {
//     debugger;
//     console.log(error);
//   }
// };

deletebtn.addEventListener("click", deleteUser);
savebtn.addEventListener("click", changeUser);
addbtn.addEventListener("click", addNewUser);
// findLocation.addEventListener("click", getLocation);
