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
        <p class="container m-2">${this._createdAt}</p>
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

const deletebtn = document.querySelector(".deletebtn");
console.log(deletebtn);

// deletebtn.addEventListener("click", (evt) => {
//   const id = document.querySelectorAll("input");
//   const idArr = Array.from(id);
//   const values = idArr.map((id) => id.value);
//   if (parseInt(values[1]) - parseInt(values[0]) > 20) {
//     alert("Less Then 20 Delete Allowed At A Time");
//   }
//   alert(parseInt(values[1]) - parseInt(values[0]));
//   for (let i = values[0]; i <= values[1]; i++) {
//    debugger
//       fetch(baseUrl + "users/" + parseInt(i), { method: "DELETE" })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("Request failed with status " + res.status);
//           }
//           console.log(res);
//         })
//         .catch((error) => {
//           console.error("An error occurred:", error);
//         });
//   }
 
// });


deletebtn.addEventListener("click", async (evt) => {
  debugger;
  const id = document.querySelectorAll("input");
  const idArr = Array.from(id);
  const values = idArr.map((id) => id.value);
  
  try {
    debugger
    if((values[1]-values[0]>11)){
      alert("range size must be less then 10")
    }
    for (let i = values[0]; i <= values[1]; i++) {
      const response = await fetch(baseUrl + "users/" + parseInt(i), { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      console.log(response);
    }
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
