// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { addDoc,collection, where,query, getFirestore,onSnapshot, deleteDoc, doc, getDoc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyDMXfbAb8ulYnw_JUE35ODU7_wDVNkCVLE",

  authDomain: "pedidossilviailustra.firebaseapp.com",

  projectId: "pedidossilviailustra",

  storageBucket: "pedidossilviailustra.appspot.com",

  messagingSenderId: "680110968631",

  appId: "1:680110968631:web:56f4865dc4e84e90f114b2"

}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//getFirestore es una funcion de firestorm que retorna la Base de datos para su uso
const db = getFirestore(app)

//funcion asincrona para verificar

const validarRun = async (run, docId = null) => {
  const collectionRef = collection(db,'Pedidos');
  const consulta = query(collectionRef, where ('run', '==',run));
  if (docId){
    consulta = query(collectionRef, where ('run', '==',run));
  }
  const snapshot = await getDocs(consulta);
  return snapshot.size ===0; //True si es único, False si es duplicado
}


//funcion para guardar datos
export const save = async (e) => {
const runUnico = await validarRun(e.run);
  if (!runUnico){
    Swal.fire({
      title: "¡Ese RUT ya existe!",
      text: "Por favor ingresa un nuevo RUT",
      icon: "error"
    });
    return;
  }

  try {
 
    await addDoc(collection(db, 'Pedidos'), e);
    Swal.fire({
      title: "¡Registro Exitoso!",
      text: "Pedido añadido a la base de datos",
      icon: "success"
    });
  } catch (error) {
    console.error('Error al guardar el pedido:', error);
    Swal.fire({
      title: "Algo salió mal",
      text: "Error al registrar el pedido",
      icon: "error"
    });
  }
};

//funcion que trae todos los documentos de la coleccion
export const getData = (data) => {
  //onSnapshot es el metodo que permite traer todos los documentos y asignarlos a variable "data"
  onSnapshot(collection(db,'Pedidos'),data)
}

//función remove que sirve para eliminar un documento
export const remove = async (id) => {
  try {
    await deleteDoc(doc(db, 'Pedidos', id));
    Swal.fire({
      title: "¡Éxito!",
      text: "Pedido borrado de Firestore jejede la base de datos"
    });
  } catch (error) {
    console.error('Error al eliminar el pedido:', error);
    Swal.fire({
      title: "Algo salió mal",
      text: "Error al borrar el pedido",
      icon: "error"
    });
  }
};

//funcion que me permite seleccionar un documento
//getDoc es la funcion de firestore que permite obtener un documento por su id
export const selectOne = (id) => getDoc(doc(db,'Pedidos',id))

//crearemos la funcion que permita editar un documento
export const edit = async (id, pedido) => {
  try {
    await updateDoc(doc(db, 'Pedidos', id), pedido);
    Swal.fire({
      title: "¡Éxito!",
      text: "Pedido editado en Firestore jeje",
      icon: "success"
    });
  } catch (error) {
    console.error('Error al editar el pedido:', error);
    Swal.fire({
      title: "Algo salió mal",
      text: "Error al editar el pedido",
      icon: "error"
    });
  }
};

