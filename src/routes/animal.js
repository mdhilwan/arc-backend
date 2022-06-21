import express from 'express'
import fs from 'fs';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
// import { getAnimals } from '../data/getAnimals';
import {camelize, get} from '../data/utils';
import {getAnimalsList} from "../data/getAnimals";
// import {getAnimalsList} from "../data/getAnimals";

const firebaseConfig = {
  apiKey: "AIzaSyCSiyzda8ND4fUpTNcdnxCVGo39iMDkKMI",
  authDomain: "arc-backend-software.firebaseapp.com",
  projectId: "arc-backend-software",
  storageBucket: "arc-backend-software.appspot.com",
  messagingSenderId: "1056071011789",
  appId: "1:1056071011789:web:a7a6f8d5b5e81a2cf9c884",
  measurementId: "G-R9LGSYG3FR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

function animalRoutes() {
  const router = express.Router()
  router.post('/new', newAnimal)
  router.get('/all', getAllAnimal)
  return router
}

async function getAllAnimal(req, res) {
  const animalList = await getAnimalsList(db);
  res.send(animalList);
}

async function newAnimal(req, res) {
  const cleanNewAnimalCol = req.body.map((animalBody) => cleanRequest(animalBody));
  saveAnimalCollection(cleanNewAnimalCol, 0, res);
}

function saveAnimalCollection(cleanNewAnimalCol, index, httpRes) {
  const currentAnimal = cleanNewAnimalCol[index];
  const pathSegment = currentAnimal.uid;

  console.log(`${index + 1}/${cleanNewAnimalCol.length}`);

  if (index < cleanNewAnimalCol.length - 1) {
    setDoc(doc(db, "animalsCol", pathSegment), currentAnimal)
      .then((res) => {
        setTimeout(() => {
          saveAnimalCollection(cleanNewAnimalCol, index + 1, httpRes);
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      });
  } else {
    httpRes.send('done');
  }
}

function cleanRequest(body) {
  const cleanBody = {};
  Object.keys(body).forEach((key, i) => {
    cleanBody[camelize(key)] = body[key];
  });
  return cleanBody;
}

async function getBasic(req, res) {
  // const basicProfile = await getBasicProfile(db, req.params.userId);
  // res.send(basicProfile);
}

async function getEmployment(req, res) {
  // const employments = await getEmploymentProfile(db, req.params.userId);
  // res.send(employments);
}

async function getEmploymentProfile(db, userId) {
  // const employments = [];
  // const user = await getUser(db, userId);
  // for (const eUid of user.employmentUids) {
  //   const employmentData = await get(doc(db, 'employments', eUid));
  //   employments.push(employmentData);
  // }
  // return employments;
}

async function readJsonFileSync(filepath, encoding){
  // if (typeof (encoding) == 'undefined'){
  //   encoding = 'utf8';
  // }
  // let file = fs.readFileSync(filepath, encoding);
  // return JSON.parse(file);
}

export { animalRoutes }
