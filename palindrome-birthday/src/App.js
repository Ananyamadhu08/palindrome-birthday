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
let newoutput = "";

// define var for themes
const darkTheme = ["#000000", "white"];
const lightTheme = ["#52057b", "white"];
const highlightTheme = ["#000000", "#52057B"];

let setthemeFlag = 0;

export default function App() {
  const [outputDiv, setOutputDiv] = useState("");
  const [theme, setTheme] = useState(darkTheme);
  const [highLightTheme, setHighLightTheme] = useState(highlightTheme[1]);

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
    // before checking for palindrome we have to generate the dates in different formats
    const dateArray = date.split("-"); //returns an array
    // console.log("dateArray", dateArray);
    // use the index values and get the assign the dates
    const inputYear = dateArray[0];
    const inputMonth = dateArray[1];
    const inputDate = dateArray[2];

    // we need to check it in different formats then check if its a palindrome
    let setFlag = checkAllFormatsOfDate(inputYear, inputMonth, inputDate); //function to check all date formats

    if (setFlag) {
      newoutput = `Whoa!!! Your Birthday In Format ${setFlag} is palindrome`;
    } else {
      newoutput = `Awww! Your Birthdate Is Not Palindrome`;
    }
    setOutputDiv(<p>{newoutput}</p>);
  }

  function checkAllFormatsOfDate(yyyy, mm, dd) {
    // check all the combinations
    const dateFormat1 = yyyy + mm + dd; //yyyy-mm-dd format string
    const dateFormat2 = dd + mm + yyyy; //dd-mm-yyyy format string
    const dateFormat3 = mm + dd + yyyy.substring(2); //mm-dd-yy format string
    const dateFormat4 = Number(mm) + dd + yyyy; //m-dd-yyyy

    // now we need to check for palindrome for each of these formats
    if (isPalindrome(dateFormat1)) {
      return `${yyyy} - ${mm} - ${dd}`;
    } else if (isPalindrome(dateFormat2)) {
      return `${dd} - ${mm} - ${yyyy}`;
    } else if (isPalindrome(dateFormat3)) {
      return `${mm} - ${dd} - ${yyyy.substring(2)}`;
    } else if (isPalindrome(dateFormat4)) {
      return `${Number(mm)} - ${dd} - ${yyyy}`;
    } else {
      return null;
    }
  }

  function isPalindrome(str) {
    var len = str.length;
    var mid = Math.floor(len / 2);

    for (var i = 0; i < mid; i++) {
      if (str[i] !== str[len - 1 - i]) {
        return false;
      }
    }

    return true;
  }

  return (
    <div className="App">
      {/* header the theme background */}

      <header style={{ backgroundColor: `${theme[0]}`, color: `${theme[1]}` }}>
        <div className="Nav">
          <div className="leftCorner">
            {/* left corner goes here */}
            <ul className="list">
              <li>
                <label className="switch">
                  <input
                    onChange={() => {
                      // using flag to set theme
                      setthemeFlag = setthemeFlag + 1;
                      if (setthemeFlag % 2 === 0) {
                        setTheme(darkTheme);
                        // setHighLightTheme(highLightTheme[1]);
                      } else {
                        setTheme(lightTheme);
                        // setHighLightTheme(highLightTheme[0]);
                      }
                    }}
                    type="checkbox"
                  />
                  <span className="slider round"></span>
                </label>
              </li>
              <li>Click To Change Theme</li>
            </ul>
          </div>

          <div className="RightCorner">
            {/* rightcorner goes here */}
            <a target="_blank" href="htt" rel="roreferrer">
              Github Repo
            </a>
          </div>
        </div>
        <section className="hero">
          <div className="text-section">
            <h1>Check Out If Your Birthday Is Palindrome</h1>
            <p>
              A Palindrome Is A Word / Number Which Reads The Same Backwards As
              Forwards{" "}
            </p>
            <a href="#mainSection" className="linkPrimary">
              Click Here
            </a>
          </div>
        </section>
      </header>

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
