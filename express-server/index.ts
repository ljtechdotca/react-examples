import express from "express";

const app = express();

app.listen(3001, () => {
  console.log("listening on 3001");
});

interface ApiResponse {
  status: boolean;
  message: string;
  data: any;
}

let apiResponse: ApiResponse = {
  status: false,
  message: "Bad Method",
  data: {},
};


// this is your api endpoint
app.get("/api", (req, res) => {

  // destructure the method and query from your frontend request
  const { method, query } = req;

  // handle the api response
  try {
    apiResponse.status = true;
    apiResponse.message = "Successful Response";
    apiResponse.data = { method, query };
    res.send(apiResponse);
  } catch (error) {
    if (error instanceof Error) apiResponse.message = error.message;
    res.send(apiResponse);
  }
});
