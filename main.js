let navBar = document.querySelector(".navbar");

navBar.addEventListener("click", (evt) => {
  document.querySelector(".active").classList.remove("active");
  evt.target.classList.add("active");
});
