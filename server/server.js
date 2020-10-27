import path from "path";
import fs from "fs";
// import serviceAcc from "../service-acc.json"
import fetch from "isomorphic-fetch";
// import firebase from "firebase"
// import { https } from "firebase-functions"
// import admin from "firebase-admin"

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../src/App";
// import Home from "../src/Home";
import UserPage from "../src/UserPage";
// const path = require("path");
// const fs = require("fs");
// const serviceAcc = require("../service-acc.json");
// const fetch = require("isomorphic-fetch");
// const firebase = require("firebase");
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");

// const express = require("express");
// const React = require("react");
// const ReactDOMServer = require("react-dom/server");
// const { StaticRouter } = require("react-router-dom");

// const App = require("../src/App");
// // const Home = require("../src/Home");
// const UserPage = require("../src/UserPage");

// admin.initializeApp({ credential: admin.credential.cert(serviceAcc) })
// admin.initializeApp({
//   apiKey: "AIzaSyCYUWy85EYaycc_vooGr29VGu7C9GAYMzk",
//   authDomain: "cra-mui-async-seo.firebaseapp.com",
//   databaseURL: "https://cra-mui-async-seo.firebaseio.com",
//   projectId: "cra-mui-async-seo",
//   storageBucket: "cra-mui-async-seo.appspot.com",
//   messagingSenderId: "1049570714878",
//   appId: "1:1049570714878:web:f0defaefc983498fdef1af",
//   measurementId: "G-MEJ2JTTJFJ"
// })

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "../build")));
app.use(express.static(path.resolve(__dirname, "../public")));

const router = express.Router();

app.get("/", async function (req, res) {
  fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    const app = (
      <StaticRouter>
        <App />
      </StaticRouter>
    );

    res.send(
      data
        .replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(app)}</div>`
        )
        .replace("<title>React App</title>", `<title>Home</title>`)
    );
  });
});

app.get("/user/:name", async function (req, res) {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const api = await response.json();

  fs.readFile(path.resolve("./build/index.html"), "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    res.send(
      data
        .replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(
            <UserPage name={req.params.name} />
          )}</div>`
        )
        .replace(
          `"{ data: undefined }"`,
          `${JSON.stringify({ name: req.params.name, data: { ...api } })}`
        )
        .replace("<title>React App</title>", `<title>${api.title}</title>`)
        .replace(/\$OG_TITLE/g, api.title)
        .replace(/\$OG_DESCRIPTION/, api.title)
        .replace(/\$OG_URL/, req.url)
        .replace(
          /\$OG_IMAGE/,
          "https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png"
        )
    );
  });
});

// tell the app to use the above rules
app.use(router);

// app.use(express.static('./build'))
app.listen(port, () => {
  console.log(`SSR running on port ${port}`);
});

// export let ssrApp = functions.https.onRequest(app)
// exports.ssrApp = https.onRequest(app)
