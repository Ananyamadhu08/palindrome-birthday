import { React, useState } from "react";
// Take your user's birthday
// Tell whether user was born on a palindrome day or not.
// You can put dates in MM/DD/YYYY format, DD/MM/YYYY, MM/DD/YY format etc. to check if they have any chance.
// If not, then tell them what is the nearest date from their birthdate which is a palindrome date.
// Tell them by how many days they missed it.
// bonus
// show a gif when you're doing the calculation to show that numbers are being crunched.
// problem with this is that it will not slow your computer, explore setTimeout in JS to produce an artificial delay.

let date;

export default function App() {
  const [outputDiv, setOutputDiv] = useState("");

  function inputDateHandler(e) {
    e.preventDefault();

    if (date) {
      // a function to check for the palindrome
      checkPalindrome();
    } else {
      setOutputDiv(<p>Please Fill Date Field</p>);
    }
  }

  function checkPalindrome() {
    // do something
  }

  return (
    <div className="App">
      <section id="mainSection">
        <h2>
          Enter Your Birthdate And We Will Tell You If Your Birthdate Is A
          Palindrome
        </h2>

        <p style={{ fontSize: "1 rem" }}>
          This app checks your birth-date in 4 formats{" "}
          <i>yyyy-mm-dd, dd-mm-yyyy, m-dd-yyyy</i>
          <br /> e.g. if your birth-date is 01 Aug 1995, then app will check for
          19950801, 01081995,1081995
        </p>

        <form onSubmit={inputDateHandler}>
          <input
            id="datePicker"
            type="date"
            max="9999-12-31"
            required
            onChange={(e) => {
              date = e.target.value;
              console.log(date);
            }}
          />
          <button type="submit" className="linkPrimary">
            Check
          </button>
        </form>

        <div>{outputDiv}</div>
      </section>
    </div>
  );
}
