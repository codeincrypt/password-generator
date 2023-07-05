import React, { useEffect, useState } from "react";
import LOAD from "./assets/load.svg";
import LOGO from "./assets/logo1.png";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";

import "./assets/import.css";

function App() {
  const [password, setPassword] = useState();
  const [length, setLength] = useState(20);
  const [isCheckedSymbol, setIsCheckedSymbol] = useState(false);
  const [isCheckedNumeric, setIsCheckedNumeric] = useState(false);

  const [copied, setCopied] = useState(false);

  const NUMERIC = "0123456789";
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const SYMBOLS = `"!@#$%^&*()_-,.><?/'+'=[]{}|"`;
  const [typeName, setTypeName] = useState("alphabet");

  function generateString(length, type) {
    console.log('length', length, type)
    setCopied(false);
    let result = "";
    const charactersLength = type.length;
    for (let i = 0; i < length; i++) {
      result += type.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const generatePassword = () => {
    let types
    if(typeName === "numeric"){
      types = NUMERIC
    } else {
      if(isCheckedNumeric && isCheckedSymbol){
        types = ALPHABET+NUMERIC+SYMBOLS
      } else if(isCheckedNumeric){
        types = ALPHABET+NUMERIC
      } else if(isCheckedSymbol) {
        types = ALPHABET+SYMBOLS
      } else {
        types = ALPHABET
      }
    }
    let result = generateString(length, types);
    setPassword(result);
  };

  const changeType = (value) => {
    setTypeName(value);

    let length2;
    let types;
    if (value === "numeric") {
      length2 = 6;
      types = NUMERIC;
      
    } else {
      length2 = 20;
      types = ALPHABET;
      setIsCheckedSymbol(false)
      setIsCheckedNumeric(false)
    }
    setLength(length2);
    let result = generateString(length2, types);
    setPassword(result);
  };

  const addSymbol = (e) => {
    let value = e.target.checked
    setIsCheckedSymbol(value)
    let types
    if (value === true) {
      types = ALPHABET + SYMBOLS
    } else {
      types = ALPHABET
    }
    if(isCheckedNumeric){
      types = types + NUMERIC
    }
    let result = generateString(length, types);
    setPassword(result);
  };

  const addNumeric = (e) => {
    let value = e.target.checked
    setIsCheckedNumeric(value)
    let types
    if (value === true) {
      types = ALPHABET + NUMERIC
    } else {
      types = ALPHABET
    }
    if(isCheckedSymbol){
      types = types + SYMBOLS
    }
    let result = generateString(length, types);
    setPassword(result);
  };

  const changeLength = (e) => {
    setLength(e)
    let types
    if(typeName === "numeric"){
      types = NUMERIC
    } else {
      if(isCheckedNumeric && isCheckedSymbol){
        types = ALPHABET+NUMERIC+SYMBOLS
      } else if(isCheckedNumeric){
        types = ALPHABET+NUMERIC
      } else if(isCheckedSymbol) {
        types = ALPHABET+SYMBOLS
      } else {
        types = ALPHABET
      }
    }
    let result = generateString(e, types);
    setPassword(result);
  }

  const copyToClipboard = () => {
    setCopied(true);
    var input = document.createElement("input");
    input.setAttribute("value", password);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand("copy");
    document.body.removeChild(input);
    return result;
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg navbar-dark transparent">
        <a class="navbar-brand" href="/">
          <img
            className="img-fluid"
            alt="password"
            style={{ width: 150 }}
            src={LOGO}
          />
        </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                without
                rel="noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/codeincrypt/"
              >
                LinkedIn
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                without
                rel="noreferrer"
                target="_blank"
                href="https://github.com/codeincrypt/"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="mt-5 mb-2">
            <h2 className="heading1 light1 text-center">
              Need a password? Try our Strong Password Generator
            </h2>
            <h6 className="heading3 light1 text-center mt-4">
              Generate secure, random passwords to stay safe online.
            </h6>
          </div>
          <div className="mt-5">
            <h6 className="heading3 light1 font-weight-bold">
              Generated password:
            </h6>
            <div className="card-display-overlay px-4 py-3 font-weight-bold">
              {password}
            </div>
            <h6 className="heading3 light1 font-weight-bold mt-3">
              Password type:
            </h6>
            <div className="mt-2">
              <div className="row">
                <div className="col-5">
                  <select
                    className="form-control form-control-lg btn-primary"
                    onChange={(e) => changeType(e.target.value)}
                  >
                    <option value="alphanumeric">Random Password</option>
                    <option value="numeric">PIN</option>
                  </select>
                </div>
                <div className="col-2 text-center">
                  <button
                    onClick={generatePassword}
                    className="transparent border-0"
                  >
                    <img className="img-fluid" alt="password" src={LOAD} />
                  </button>
                </div>
                <div className="col-5">
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    onClick={copyToClipboard}
                  >
                    Copy Secure Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 mb-3">
            {copied ? (
              <span className="badge-success">Password copied</span>
            ) : (
              <span className="badge-warning">Password not copied</span>
            )}
          </div>
          <div className="function-container p-4">
            <div className="row justify-content-center">
              {typeName === "numeric" ? (
                <Form.Group className="col-4 text-right">
                  <RangeSlider
                    value={length}
                    onChange={(e) => changeLength(e.target.value)}
                    min={1}
                    max={50}
                  />
                </Form.Group>
              ) : (
                <React.Fragment>
                  <Form.Group className="col-4 text-right">
                    <RangeSlider
                      value={length}
                      onChange={(e) => changeLength(e.target.value)}
                      min={1}
                      max={100}
                    />
                  </Form.Group>

                  <Form.Group className="col-3 text-right">
                    <Form.Check
                      name="Numbers"
                      label="Numbers"
                      onChange={(e) => addNumeric(e)}
                      id="validationFormik16"
                    />
                  </Form.Group>
                  <Form.Group className="col-3">
                    <Form.Check
                      name="Symbols"
                      label="Symbols"
                      onChange={(e) => addSymbol(e)}
                      id="validationFormik106"
                    />
                  </Form.Group>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
