import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { 
    doc, 
    setDoc,
    getDocs,
    getDoc,
    addDoc, 
    collection,
    getFirestore,
    where,
    query } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


const firebaseConfig = {
        apiKey: "AIzaSyD5s2Rkq1NwkXrs-Xjk9AVxP94bcWO6fe8",
        authDomain: "signuploginapp-e51b2.firebaseapp.com",
        projectId: "signuploginapp-e51b2",
        storageBucket: "signuploginapp-e51b2.firebasestorage.app",
        messagingSenderId: "578364808712",
        appId: "1:578364808712:web:45701c93a9302601c93bbd",
        measurementId: "G-ZXMYXSXB97"
      };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const employeesRef = collection(db, "employees");

const formFields = [
  'name', 'contact', 'email', 'start-date', 'finish-date', 'time-spent',
  'employment-type', 'department', 'hiring-date', 'location', 'notification'
];
const formData = {};

const onboardingForm = document.getElementById('onboarding-form');

async function generateEmployeeID() {
  const min = 1000000; 
  const max = 9999999; 

  let newEmployeeID;
  let employeeExists = false; 
  // making sure its unique id
  do {
    newEmployeeID = Math.floor(Math.random() * (max - min + 1)) + min;
    const snapshot = await getDocs(employeesRef);
    employeeExists = false;
    snapshot.forEach((doc) => {
      if (doc.id === newEmployeeID.toString()) {
        employeeExists = true; 
      }
    });
  } while (employeeExists); 
  
  return newEmployeeID.toString();

}


onboardingForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
      // generate unique ID
    const employeeID = await generateEmployeeID();
    formFields.forEach(field => {
        const element = document.getElementById(field);
        formData[field] = element.type === 'file' ? element.files[0] : element.value;
    });
    const employeeRef = doc(employeesRef, employeeID); 

    setDoc(employeeRef, formData)
      .then(() => {
        console.log("Employee data added successfully!", employeeID);
    })
      .catch((error) => {
        console.error("Error adding employee data: ", error);
    });

    } catch (error) {
      console.error('error adding employee', error)
    }



    //onboardingForm.reset();
});


  




