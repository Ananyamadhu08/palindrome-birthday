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
const darkTheme = ["#34D399", "white"];
const lightTheme = ["#1e3a8a", "white"];
// const highlightTheme = ["#000000", "white"];

let setthemeFlag = 0;

//for next date

const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function App() {
  const [outputDiv, setOutputDiv] = useState("");
  const [theme, setTheme] = useState(darkTheme);
  // const [highLightTheme, setHighLightTheme] = useState(highlightTheme[1]);

  const inputDateHandler = (e) => {
    e.preventDefault();

    if (date) {
      // a function to check for the palindrome
      checkPalindrome();
    } else {
      setOutputDiv(<p>Please Fill Date Field</p>);
    }
  };

  const checkPalindrome = () => {
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
      let [nextdate, diff] = findNextDate(inputDate, inputMonth, inputYear);
      newoutput = `Awww! Your birthdate is not palindrome. Nearest palindrome date is ${nextdate} You missed it by ${diff} days.`;
    }
    setOutputDiv(<p>{newoutput}</p>);
  };

  const checkAllFormatsOfDate = (yyyy, mm, dd) => {
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
  };

  const isPalindrome = (str) => {
    var len = str.length;
    var mid = Math.floor(len / 2);

    for (var i = 0; i < mid; i++) {
      if (str[i] !== str[len - 1 - i]) {
        return false;
      }
    }

    return true;
  };

  const findNextDate = (date, month, year) => {
    let ddNo1 = Number(date);
    let mmNo1 = Number(month);
    let yyNo1 = Number(year);
    let ddNo2 = Number(date);
    let mmNo2 = Number(month);
    let yyNo2 = Number(year);

    for (let i = 1; i > 0; i++) {
      //forward check
      ddNo1 = ddNo1 + 1;
      if (ddNo1 > Number(datesInMonth[mmNo1 - 1])) {
        ddNo1 = 1;
        mmNo1 = mmNo1 + 1;
        if (mmNo1 > 12) {
          mmNo1 = 1;
          yyNo1 = yyNo1 + 1;
        }
      }
      let yyString = yyNo1.toString();
      let mmString = mmNo1.toString();
      let ddString = ddNo1.toString();
      if (mmString.length === 1) {
        mmString = "0" + mmString;
      }
      if (ddString.length === 1) {
        ddString = "0" + ddString;
      }
      let setFlagNextDate = checkAllFormatsOfDate(yyString, mmString, ddString);
      if (setFlagNextDate) {
        return [`${setFlagNextDate}`, i];
      }

      //backward check
      if (yyNo2 > 1) {
        ddNo2 = ddNo2 - 1;
        if (ddNo2 < 1) {
          mmNo2 = mmNo2 - 1;
          if (mmNo2 < 1) {
            mmNo2 = 12;
            yyNo2 = yyNo2 - 1;
            if (yyNo2 < 1) {
              break;
            }
            ddNo2 = datesInMonth[mmNo2 - 1];
          }
        }
        let yyString = yyNo2.toString();
        let mmString = mmNo2.toString();
        let ddString = ddNo2.toString();
        if (mmString.length === 1) {
          mmString = "0" + mmString;
        }
        if (ddString.length === 1) {
          ddString = "0" + ddString;
        }
        let setFlagNextDate = checkAllFormatsOfDate(
          yyString,
          mmString,
          ddString
        );
        if (setFlagNextDate) {
          return [`${setFlagNextDate}`, i];
        }
      }
    }
  };

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
            <a
              target="_blank"
              href="https://github.com/Ananyamadhu08"
              rel="noreferrer"
            >
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

      <footer style={{ backgroundColor: `${theme[0]}`, color: `${theme[1]}` }}>
        <ul className="list">
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/ananya-madhu-74479b206/"
              rel="noreferrer"
            >
              Linkedin
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/Ananyamadhu08"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://ananya-madhu-portfolio.netlify.app/index.html"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </li>
        </ul>
        <div className="footer-text">© | 2021 | AnanyaMadhu</div>
      </footer>
    </div>
  );
}
