import axios from "axios";

class Http {
  static instance = new Http();

  defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded'
  };

  get = async (url) => {
    try {
      let res = await fetch(url, {
        headers: this.defaultHeaders,
        method: "GET",
      });

      let json = await res.json();
      return json;
    } catch (err) {
      console.log("http get method err", err);
      throw Error(err);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: "POST",
        headers: this.defaultHeaders,
        body: JSON.stringify(body),
      });

      let json = await req.json();
      return json;
    } catch (error) {
      console.log("http post method err", error);
      throw Error(error);
    }
  };
}

export default Http;
