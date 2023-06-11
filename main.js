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
const deletebtn = document.querySelector(".deletebtn");
const savebtn = document.querySelector(".savebtn");
const addbtn = document.querySelector(".addbtn");

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

const user = returnRes(baseUrl, "users", {});
user
  .then((res) => {
    res.json().then((data) => {
      data.forEach((elm) => {
        const userRow = new urow(elm);
        const tl = document.querySelector(".app");
        tl.appendChild(userRow);
      });
    });
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

deletebtn.addEventListener("click", async (evt) => {
  debugger;
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
  window.location.reload(true);
});

savebtn.addEventListener("click", (evt) => {
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
  
  fetch(`${baseUrl}users/${values[0]}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  
  setTimeout(function(){ window. location. reload(); }, 1000)
});


addbtn.addEventListener("click", (evt) => {
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
  debugger
  fetch(`${baseUrl}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });


  setTimeout(function(){ window. location. reload(); }, 1000)


});