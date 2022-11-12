// npm dependencies
// "dependencies": {
//     "express": "^4.18.2",
//     "firebase-admin": "^11.2.1",
//     "ws": "^8.11.0"
//   },

const express = require('express')
const app = express()
const port = 8000

const { Server } = require('ws');

const wss = new Server({ port: 8080 });

//  FIrebase stuff
// const admin = require("firebase-admin")
// const serviceAccount = require("./development-fefbe-firebase-adminsdk-3oam3-0d903a5484.json")

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://development-fefbe-default-rtdb.firebaseio.com"
// });

// const db = admin.firestore();

wss.on('connection', ws => {
    console.log("Client attached")

    ws.on('message', message => {
        console.log(`Received message => ${message}`)
        // console.log("Firestore Live fetching enabled!!!")


        // const doc = db.collection('sampleTest').doc(String(message));

        // global.observer = doc.onSnapshot(docSnapshot => {
        //     // console.log(`Received doc snapshot: ${docSnapshot}`);
        //     console.log(docSnapshot.data());
        //     ws.send(JSON.stringify(docSnapshot.data()))

        // }, err => {
        //     console.log(`Encountered error: ${err}`);
        // });

    })

    var interval = setInterval(function () {
        data = "Real-Time Update ";
        console.log("SENT: " + data);
        ws.send(data)
    }, 5 * 1000);



    ws.on('close', function close() {
        console.log("Client de-attached")
        clearInterval(interval);

        // if (global.observer)
        //     global.observer();
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
