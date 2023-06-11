class foundLocation extends HTMLElement {
  constructor(ip_address, city, region, country, continent) {
    super();
    this._ip_address = ip_address;
    this._city = city;
    this._region = region;
    this._country = country;
    this._continent = continent;
  }

  render() {
    this.innerHTML = `
        <div>
          <ul>
             <li>${this._ip_address}</li>
             <li>${this._city}</li>
             <li>${this._region}</li>
             <li>${this._country}</li>
             <li>${this._continent}</li>
          </ul>
        </div>      
      `;
  }


  connectedCallback() {
    this.render();
  }
}

customElements.define("location-data", foundLocation);


const findIPbaseUrl =
  "https://ipgeolocation.abstractapi.com/v1/?api_key=72522b320c09463ea59de4ca1b704736";

const findLocation = document.querySelector(".findLocation");

var count =10;

const getLocation = (evt) => {
  const findip = document.querySelector(".findip");
  const ip_address = findip.value;
  console.log(ip_address);
  try {
    // const res = fetch(
    //   `${findIPbaseUrl}&ip_address=${value}&fields=country,city`
    // );
    const res = fetch(`${findIPbaseUrl}&ip_address=${ip_address}`);
    res.then((e) => {
      if (!e.ok) {
        throw new Error(res.statusText);
      }
      e.json().then((res) => {
        debugger
          const {ip_address,city,region,country,continent} = res;
        const foundLocationData = new foundLocation(ip_address,city,region,country,continent);
         document.querySelector(".locationData").append(foundLocationData)
      });
    });
  } catch (error) {
    debugger;
    console.log(error);
  }
};

findLocation.addEventListener("click", getLocation);
