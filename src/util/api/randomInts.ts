import axios from "axios";

const randomInts = async (n: number, min: number, max: number, replacement: boolean) => {
  return new Promise<number[]>(async (resolve, reject) => {
    axios
      .post("https://api.random.org/json-rpc/4/invoke", {
        jsonrpc: "2.0",
        method: "generateIntegers",
        params: {
          apiKey: process.env.RANDOM_API_KEY,
          n,
          min,
          max,
          replacement,
        },
        id: 0,
      })
      .then((res) => {
        resolve(res.data.result.random.data as number[]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default randomInts;
