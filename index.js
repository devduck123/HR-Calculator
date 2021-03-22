let hours = 420;

document.addEventListener("DOMContentLoaded", function () {
  // disable submit initially
  document.querySelector("#submit").disabled = true;

  // if "name" field contains values, then we can submit
  document.querySelector("#name").onkeyup = () => {
    if (document.querySelector("#name").value.length > 0) {
      document.querySelector("#submit").disabled = false;
    } else {
      document.querySelector("#submit").disabled = true;
    }
  };

  // what happens when we click submit?
  document.querySelector("form").onsubmit = () => {
    // assigned variable "name" a value of userInput for "name" field
    const name = document.querySelector("#name").value;
    // assigned variable "h2" a value of DOM element h2
    const h2 = document.createElement("h2");

    // set variable "h2" value to be userInput value from "name" field
    document.querySelector("#container-name").innerHTML = `Employee: ${name}`;
    // clear "name" field
    document.querySelector("#name").value = "";
    // disable submit button
    document.querySelector("#submit").disabled = true;

    // do NOT submit to anywhere
    return false;
  };

  document.querySelector("#date-form").onsubmit = () => {
    let start = new Date(document.querySelector("#start").value);
    let end = new Date(document.querySelector("#end").value);
    // console.log(numWeeks);

    addWeeks(start, end);

    return false;
  };

  // update "hours"
  document.querySelector("#container-hours").innerHTML = hours;

  // when clicking subtract button, subtract from hours
  document.querySelector("#button-subtract").onclick = subtract;
});

function subtract() {
  // subract x hours when clicked, (will later take a parameter to determine x)
  hours = hours - 8;
  // x cannot be negative
  if (hours < 0) {
    hours = 0;
  }
  document.querySelector("#container-hours").innerHTML = hours;
}

function weeksBetween(start, end) {
  return Math.round((end - start) / (7 * 24 * 60 * 60 * 1000));
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getMonday(d) {
  let day = d.getUTCDay();
  if (day == 1) {
    return d;
  }
  let diff = d.getDate() - day + 1;
  return new Date(d.setDate(diff));
}

function addWeeks(start, end) {
  const weekDays = 5;
  let numWeeks = weeksBetween(start, end);
  //  FIXME: this function adds weeks to the table
  console.log(numWeeks);

  let tbodyRef = document
    .getElementById("schedule")
    .getElementsByTagName("tbody")[0];

  let currentDate = getMonday(start);

  for (let i = 0; i < numWeeks; i++) {
    currentDate = getMonday(currentDate);
    let row = tbodyRef.insertRow();


    for (let i = 0; i < weekDays; i++) {
      let cell = row.insertCell();

      let formattedDate = `${
        currentDate.getUTCMonth() + 1
      }-${currentDate.getUTCDate()}`;
      let newDiv = document.createElement("div");
      let header = document.createElement("h3");
      let newText = document.createTextNode(formattedDate);
      header.appendChild(newText);

      let hoursInput = document.createElement("input");
      hoursInput.setAttribute("type", "text");

      let codeInput = document.createElement("input");
      codeInput.setAttribute("type", "text");

      newDiv.appendChild(header);
      newDiv.appendChild(hoursInput);
      newDiv.appendChild(codeInput);
      cell.appendChild(newDiv);
      currentDate = currentDate.addDays(1);
    }
    // jump to next Monday
    currentDate = currentDate.addDays(2);
  }
}
