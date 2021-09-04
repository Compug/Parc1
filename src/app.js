// Imports
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';


//  -------------Basic Configuration ---------//
let gui = undefined;
let size = 0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
// const gui = new dat.GUI(); Removed from the top at: 14;59



const palette = {
  bgColor: '#428185', // CSS String
  
};

//When pasted - Explanation is on min 52:53
let plane = undefined;
let spotLight;
/* const objects = {};
const Lights = {
    sp: undefined
};  */



// Variables Generales//  min 46 vid 2
 let countCube = undefined; 
 let GUIFolderCube = 1; // para que entenda lo delgui
 let countSphere = undefined; 
 let GUIFolderSphere = 1;
 let countLight = undefined; 
 let GUIFolderLight = 1;
 

 let countLight1 = undefined; 
 let GUIFolderLight1 = 1;
/* let countSphere = undefined();
let countLight = undefined();  */
/* Arreglos de Objetos */ // min 45 vid 2
const objectsCube = [];
const objectsSphere = [];
const objectsLight = [];
const objectsSpotLight = [];
const objectsAmbientLight = [];
window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    //camera.update = updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, true); // to make windoe rezisable
    // make "the window to change when change size
};






/// --------- Video #6 new -----4:13
/*
export function closeScene() {

  renderer.dispose(); 
  gui.destroy()
  //console.log('Se cerro la Escena') // esto se tiene para poder verificar que si se cerrro la escena o que esta funncionando en el .log

}*/   // Solved With HTML Deleted an move gui where it waas

///-------- AT THE TOP FUNCTION NEVER USED COSE IT WAS SOPOSED TO BE SOLVED WITH HTML
// AT THE END IT WAS SOLVED AT MIN 20:21 WITH JAVA USING THE STYLES.CSS USING BODY RENDER SCENE*

//creacion de la funcion RESET EXPORTANDOLA Y LLAMNDOLA EN EL MAIN
/*export function reset() {
   scene.children = [];
   renderer.setSize(0,0,true);  // ahora debemos llamar esta funcion en otro lado, en este caso en la funcion index, cuando se llama el boton volver
                            /////// ---- TO BACK BOTOM -----/////

 ; // lo que hacee es eliminar todo al darle reset. Como son variables no constantes, entonces puedo editarlo.
} */
//

export function reset(){
  scene.children = []; // lo que hace en este momento es igualaarlo a un arreglo vacio eliminando todo al llamar rese
                        //ya que estas espeficamente son variables no constantes, entonces se pueden modificar y usar como queramos.
  renderer.setSize(0,0,true); // aca deberiamos volver a setear el tamano cada ves al darle al boton
                              //-----------RESETEA ELIMINA TODO Y QUEDA LIMPIO PARA CUANDO SE VUELVE A PRESIONAR EL BOTON -------
                                      /////---- DE ESTA MANERA NO SE SOBREPONEN LOS TAMANOS Y SE RESETEA CADA VEZ QUE SE ABRA UN NUEVO BOTON.----
  countCube = 0; // cada que se reseteee o se reinicie este cube o su conteo va a inciar en 0 always.
  GUIFolderCube = 1;
  countSphere = 0;
  GUIFolderSphere=1;
  countLight = 0;
  GUIFolderLight=1;
 
};
export function main (optionSize){
//size = optionSize;
reset(); //cada ves que inicialicemos el main se hace el reset para que aparezca en vacio always. min 48:41 vid2
 // console.log(size); NOO NEED - to show wich one i am pressing an to know if its working wl



// Configurracion inicial  - Explicacion rapida en MINUTO 58:34 Clase 5 - Server en Vite y Configuración ThreeJs
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(palette.bgColor, 1);
  document.body.appendChild(renderer.domElement);


  //------------ Posicion de la camara super vertical
  //camera.position.z = 20;
  //camera.position.y = 0;
  //----- Inclinado -------
  // ---------- Modificar la camara para que se vea de manera picado al plano.
  camera.position.z = 15;
  camera.position.y = 15;


  //Controls to move the plane
new OrbitControls(camera, renderer.domElement);

//Plano por defecto
  defaultPlane(optionSize);
// GUI
 loadGUI();
 // Light
 setupLights();
 // para que el plano empiece de manera vertical
 // ADEMAS DE QUE EL PLANO EMPIECE VERTICAL TENDRIAMOS QUE MODIFICAR LA CAMARA A 15 X 15
 
 //Render
 animate();


}
function defaultPlane(size){
 const geometry = new THREE.PlaneGeometry(size, size, size, size); 
 const material = new THREE.MeshBasicMaterial({
   color: '#f1c40f',
   side: THREE.DoubleSide,
   // For the WireFrame
   wireframe : true,
 });
 const plane = new THREE.Mesh(geometry, material);
 scene.add(plane);
 plane.recieveShadow =  true;
 plane.rotation.x = Math.PI / 2;
}

// Lo que se encarga es de cargar el gui cada ves que se reset o se pulsa un bottom

function loadGUI() {
  cleanGUI(); //Have to be here because before the new gui is created
  /////// it creates it and then cleans it before is loaded a new one (A new GUI) 
  gui = new dat.GUI();// Moved to the top on 11:03 vid 2
  gui.open(); //for the gui to always be left open
   /*gui.show(); */
    //const folder1 = gui.addFolder('Carpeta 1');
   
}

export function cleanGUI() { // have to call this on index.html on main an then use it
  const dom = document.querySelector(".dg.main");
  if (dom) //exist then // THE ONLY THING DONE HERE AND ABOVE IS THAT IS CALLING THE DOM NOTHING ELSE
  dom.remove();

}
  
function setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
  
    spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;
      
    spotLight.castShadow = true;
  
    scene.add(spotLight);// HoW to do to change the type of light

  }


  function animate() {
    requestAnimationFrame(animate); // cada vez que se ejecute un cambio se volvera a pintar.
    updateElements();
    renderer.render(scene, camera);
    }
    
  function updateElements() {

      
      /*renderer.setClearColor(palette.bgColor, 1); // Resets once again background color
      objects.plano.material.color = new THREE.Color(palette.planeColor);
    */
    /// -------- NOTAS -------

    // En el minuto 1:17:22 Explication of what have to be on the Custom


     _updateCubes();
     _updateSpheres();  /* when solve the color gui problem on sphere. */
     _updateLights();
     _updateSpotLights();
     _updateAmbientLights();
    }


    // Create the function CleanUpGui to clean the gui every time /////

export function createCubeGeneric(){ /* should be exported be destructuration on the html because here was exported need to be imported becuase of modularization */
     
      console.log('Se ha creado el Cubo satisfactoriamente x2');
      const geometry = new THREE.BoxGeometry();/* min 39:00 //creacion del cubo para que funcione con el bootn se hace en el app.js */
      const material = new THREE.MeshBasicMaterial({  //should start on basic cose the ternary operator

        color: 0xffaec0, 
        wireframe:false});



      const cube = new THREE.Mesh(geometry,material);
      /* ahora para agregarlo a la scene deberiamos */
      scene.add(cube);
      objectsCube.push(cube);
      cube.position.y = 0.5; // para que lo levante en la vista del plano 0.5 y no quede atravesado
      cube.castShadow =  true; //recibe lights 
      cube.recieveShadow = true; //tambien recibe luces
      cube.GUIcube = _cubeObjet();

      //Calling the function from below cubegui for the modification of the parameters with the GUI
       /*creaating a parameter that is out OBJECT just created */ 
      
      _createCubeGUI(cube.GUIcube); // created below //para que el usuario los oueda editar
      

      // cada que se cree uno entonces
      countCube = countCube + 1; // para que asi se vaya anadiendo a una posicion diferente cada ves


    }



/* CREATION OF THE FUNCTIONS FOR THE MOVEMENT OF THE DIMENSIONS OF THE CUBE AND THE SPHERE INSIDE THE GUI
ONLY USING ONE GUI FOR BOTH OF THEM */

function _cubeObjet(){ // function defining the parameters that our object is gonna have

  var GUIcube = {
    material: 'Basic', /* (basic, phong or lambert) */
    materialColor: 0Xffaec0,
    scaleX:1, //scalate the geometrys in the 3 directions, starting on basic 1
    scaleY:1,
    scaleZ:1,
    posX:0,
    posY:0.5, //para qye quede al nivel del plano
    posZ:0,
    
    //Segments

  };
  return GUIcube;
}

function _createCubeGUI(GUIcube) {     ///esto hara que empiece en 1
  const folder = gui.addFolder ('Cube' + GUIFolderCube );


  //Material
  folder.addColor(GUIcube,'materialColor');
  folder.add(GUIcube, 'material', ['Basic','Phong','Lambert']);

  //Scale
  folder.add(GUIcube, 'scaleX');
  folder.add(GUIcube, 'scaleY');
  folder.add(GUIcube, 'scaleZ');
  
  //Position
  folder.add(GUIcube, 'posX');
  folder.add(GUIcube, 'posY');
  folder.add(GUIcube, 'posZ');

  GUIFolderCube = GUIFolderCube + 1; // For the creation of Multiple spheres or cubes


}

/* ------ FUNCION PARA ACTUALIZAR LOS ELEMENTOS -------*/

      /*----- this case is for the cube*/

function _updateCubes() {
  Object.keys(objectsCube).forEach(i  =>{  /* / para que ene cada posicion de nuestros objetos el haga algo ****propia funcion de java script */
    // llamando la lista de nuestro arreglo de objetos cubo
    const cubeSelected = objectsCube[i];


    // cube MATERIAL --- Operadores ternarios

    cubeSelected.GUIcube.material =='Basic'
    ? (cubeSelected.material = new THREE.MeshBasicMaterial({
        color: cubeSelected.GUIcube.materialColor,
      }))
    : cubeSelected.GUIcube.material =='Lambert'
    ?(cubeSelected.material = new THREE.MeshLambertMaterial({
        color: cubeSelected.GUIcube.materialColor,
      }))
    : (cubeSelected.material = new THREE.MeshPhongMaterial({
      color: cubeSelected.GUIcube.materialColor,

    }));

    // para que el boxgeometry se actualice igualmente cada VES EN XYX
    cubeSelected.geometry = new THREE.BoxGeometry(
        cubeSelected.GUIcube.scaleX,
        cubeSelected.GUIcube.scaleY,
        cubeSelected.GUIcube.scaleZ,
       );


       // ---- POR ULTIMO ACOMODAR LA POSICION ------


       cubeSelected.position.x = cubeSelected.GUIcube.posX;
       cubeSelected.position.y = cubeSelected.GUIcube.posY;
       cubeSelected.position.z = cubeSelected.GUIcube.posZ;
  });    /*  Explication of what the code does on 1:16:00 */
          //ternary operator if or else 

          // is based in a condition that if is done, it does something and if not tit does something else
          //ask for the trhth of the statemet 
          // ----- A BETTER IF --------
}




export function createSphereGeneric(){ /* should be exported be destructuration on the html because here was exported need to be imported becuase of modularization */
  console.log('Se ha creado la Sphere satisfactoriamente x2');
  /*
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere); */
/* min 39:00 //creacion del cubo (CHECK HOW TO DO IT FOR THE PLANE  )para que funcione con el bootn se hace en el app.js */
const geometry = new THREE.SphereGeometry(2,10,10); // (radius, widthSegments, heightSegments)  
//const material = new THREE.MeshPhongMaterial( {color: 0xffff00} ); /* -------- TAKE FROM https://www.codegrepper.com/code-examples/javascript/three.js+create+a+sphere ------- */

const material = new THREE.MeshBasicMaterial({
  color: 0xffff00, 
  wireframe:false});



const sphere = new THREE.Mesh(geometry,material);
  /* ahora para agregarlo a la scene deberiamos */

  scene.add(sphere);
  objectsSphere.push(sphere);
  sphere.position.y = 2; // para que empiece rozandoel plani
  sphere.castShadow =  true; //recibe lights 
  sphere.recieveShadow = true; //tambien recibe luces    
//Calling the function from below cubegui for the modification of the parameters with the GUI

sphere.GUIsphere = _sphereObject(); /*creaating a parameter that is out OBJECT just created */
//_createSphereGUI(sphere.GUIsphere); // created below

_createSphereGUI(sphere.GUIsphere);
// cada que se cree uno entonces
countSphere = countSphere + 1; // para que asi se vaya anadiendo a una posicion diferente cada ves



}///// Finished parcially when cubes where created and gui was defined at the top 52:52m

function _sphereObject() { // llamando de un objeto para poder editar mas facil

  var GUIsphere ={
    material: 'Basic', /* (basic, phong or lambert) */
    materialColor: 0Xffaec0,
    scaleX:1, //scalate the geometrys in the 3 directions, starting on basic 1

    scaleY:1,
    scaleZ:1,

    posX:0,
    posY:0.5, //para qye quede al nivel del plano
    posZ:0,
    
    //Segments


  };
  return GUIsphere;
}
function _createSphereGUI(GUIsphere) {     ///esto hara que empiece en 1
  const folder = gui.addFolder ('Sphere' + GUIFolderSphere );

  GUIFolderSphere = GUIFolderSphere + 1; // For the creation of Multiple spheres or cubes
  //Material
  folder.addColor(GUIsphere,'materialColor');  // its not entering here cose the material color cannot be found

  folder.add(GUIsphere, 'material', ['Basic','Phong','Lambert']);

  //Scale
  folder.add(GUIsphere, 'scaleX');
  folder.add(GUIsphere, 'scaleY');
  folder.add(GUIsphere, 'scaleZ');
  
  //Position
  folder.add(GUIsphere, 'posX');
  folder.add(GUIsphere, 'posY');
  folder.add(GUIsphere, 'posZ');

  //GUIFolderSphere = GUIFolderSphere + 1;

}

// TO UPDATE SPHERES ONCE COLOR WORKS
function _updateSpheres() {
  Object.keys(objectsSphere).forEach(i  =>{  /* / para que ene cada posicion de nuestros objetos el haga algo ****propia funcion de java script */
    // llamando la lista de nuestro arreglo de objetos cubo
    const sphereSelected = objectsSphere[i];


    // cube MATERIAL --- Operadores ternarios

    sphereSelected.GUIsphere.material =='Basic'
    ? (sphereSelected.material = new THREE.MeshBasicMaterial({
        color: sphereSelected.GUIsphere.materialColor,
      }))
    : sphereSelected.GUIsphere.material =='Lambert'
    ?(sphereSelected.material = new THREE.MeshLambertMaterial({
        color: sphereSelected.GUIsphere.materialColor,
      }))
    : (sphereSelected.material = new THREE.MeshPhongMaterial({
      color: sphereSelected.GUIsphere.materialColor,

    }));

// para que el boxgeometry se actualice igualmente cada VES EN XYX
      sphereSelected.geometry = new THREE.SphereGeometry(
      sphereSelected.GUIsphere.scaleX,
      sphereSelected.GUIsphere.scaleY,
      sphereSelected.GUIsphere.scaleZ,
 );
      sphereSelected.position.x = sphereSelected.GUIsphere.posX;
      sphereSelected.position.x = sphereSelected.GUIsphere.posY;
      sphereSelected.position.x = sphereSelected.GUIsphere.posZ;
  });   

}


export function createLightGeneric(){ /* should be exported be destructuration on the html because here was exported need to be imported becuase of modularization */
  console.log('Point Light Has Been Created');
  
  const light = new THREE.PointLight( 0xff0000, 1, 100 );
 // light.position.set( 50, 50, 50 );
  scene.add( light );
  /* ahora para agregarlo a la scene deberiamos */
  /* scene.add(light); */
  objectsLight.push(light);
  light.position.y = 0.5; // para que lo levante en la vista del plano 0.5 y no quede atravesado
  light.castShadow =  true; //recibe lights 
  light.recieveShadow = true;

  light.GUILight = _lightObjet();

  _createLightGUI(light.GUILight);
  countLight = countLight + 1;
}  //after min 38:14




function _lightObjet(){ // function defining the parameters that our object is gonna have

  var GUILight = {
    //material: 'Basic',  //(basic, phong or lambert)
    color: 0Xffaec0, 
    intensity:1, //scalate the geometrys in the 3 directions, starting on basic 1
    distance:1,
    decay:1,
    poscorrect:1,
    posX:0,
    posY:0.5, //para qye quede al nivel del plano
    posZ:0,
    
    //Segments

  };
  return GUILight;
}



function _createLightGUI(GUILight) {     ///esto hara que empiece en 1
  const folder = gui.addFolder ('PointLight' + GUIFolderLight );

  GUIFolderLight = GUIFolderLight + 1;
  //Material
  folder.addColor(GUILight,'color');
  /* folder.add(GUILight, 'material', ['Basic','Phong','Lambert']);
 */
  //Scale
  folder.add(GUILight, 'intensity',0,10);
  folder.add(GUILight, 'distance',0,100);
  folder.add(GUILight, 'decay',0,10);
  folder.add(GUILight, 'poscorrect',0,10);
  //Position
  folder.add(GUILight, 'posX');
  folder.add(GUILight, 'posY');
  folder.add(GUILight, 'posZ');

  GUIFolderLight = GUIFolderLight + 1; // For the creation of Multiple spheres or cubes


}

function _updateLights() {
  Object.keys(objectsLight).forEach(i  =>{  /* / para que ene cada posicion de nuestros objetos el haga algo ****propia funcion de java script */
    // llamando la lista de nuestro arreglo de objetos cubo
    const lightSelected = objectsLight[i];


 

// para que el boxgeometry se actualice igualmente cada VES EN XYX
     /*  lightSelected.geometry = new THREE.PointLight(
      lightSelected.GUILight.scaleX,
      lightSelected.GUILight.scaleY,
      lightSelected.GUILight.scaleZ,
 ); */
 lightSelected.intensity = lightSelected.GUILight.intensity;
 lightSelected.distance = lightSelected.GUILight.distance;
 lightSelected.decay = lightSelected.GUILight.decay;
 lightSelected.color.setHex(lightSelected.GUILight.color);
      // IF ADDDE THE FUNCITON IS GONE TO BLACK 
      //BIIIIIIGGGGGG QUESTIOS HERE ABOUT HOW TO ADD THE COLOR FUNCTION TO THE LIGHTS

        //ALSO HOW TO ADDD THE NUMBER INTENSITY AND DISTANCE
     // lightSelected.color =  lightSelected.GUILight.color
      lightSelected.position.x = lightSelected.GUILight.posX;
      lightSelected.position.y = lightSelected.GUILight.posY;
      lightSelected.position.z = lightSelected.GUILight.posZ;
  });   

}
// Function to create the cube inside the gui

/* function _createCubeGUI(GUIcube){     ///esto hara que empiece en 1
  const folder = gui.addFolder('Cube' + GUIFolderCube);


  //Material
  folder.addColor(GUIcube,'materialColor')
  folder.add(GUIcube, 'material',['Basic','Phong','Lambert'])

  //Scale
  folder.add(GUIcube, 'scaleX');
  folder.add(GUIcube, 'scaleY');
  folder.add(GUIcube, 'scaleZ');
  
  //Position
  folder.add(GUIcube, 'posX');
  folder.add(GUIcube, 'posY');
  folder.add(GUIcube, 'posZ');



} */


export function createSpotLightGeneric(){ /* should be exported be destructuration on the html because here was exported need to be imported becuase of modularization */
  console.log('Spot Light Has Been Created x2');
  const light = new THREE.PointLight( 0xff0000, 1, 100 );
  // light.position.set( 50, 50, 50 );
   scene.add( light );
   objectsSpotLight.push(light);
  light.position.y = 0.5; // para que lo levante en la vista del plano 0.5 y no quede atravesado
  light.castShadow =  true; //recibe lights 
  light.recieveShadow = true;

  light.GUISpotLight = _lightSpotObjet();

  _createSpotLightGUI(light.GUISpotLight);
  countLight = countLight + 1;



}  //after min 38:14

function _lightSpotObjet(){ // function defining the parameters that our object is gonna have

  var GUISpotLight = {
    //material: 'Basic',  //(basic, phong or lambert)
    color: 0Xffaec0, 
    intensity:1, //scalate the geometrys in the 3 directions, starting on basic 1
    distance:1,
    angle:1,
    penumbra:1,

    decay :1,

    posX:0,
    posY:0.5, //para qye quede al nivel del plano
    posZ:0,
    
    //Segments

  };
  return GUISpotLight;
}


function _createSpotLightGUI(GUISpotLight) {     ///esto hara que empiece en 1
  const folder = gui.addFolder ('SpotLight' + GUIFolderLight );

  GUIFolderLight = GUIFolderLight + 1;
  //Material
  folder.addColor(GUISpotLight,'color');
  /* folder.add(GUILight, 'material', ['Basic','Phong','Lambert']);
 */
  //Scale
  folder.add(GUISpotLight, 'intensity', 0, 10);
  folder.add(GUISpotLight, 'distance',0,10);
  folder.add(GUISpotLight, 'angle',0, Math.PI /2);
  folder.add(GUISpotLight, 'penumbra',0,1);
  folder.add(GUISpotLight, 'decay',0,10);
  
  
  //Position
  folder.add(GUISpotLight, 'posX');
  folder.add(GUISpotLight, 'posY');
  folder.add(GUISpotLight, 'posZ');

  GUIFolderLight = GUIFolderLight + 1; // For the creation of Multiple spheres or cubes


}

function _updateSpotLights() {
  Object.keys(objectsSpotLight).forEach(i  =>{  /* / para que ene cada posicion de nuestros objetos el haga algo ****propia funcion de java script */
    // llamando la lista de nuestro arreglo de objetos cubo
    const lightSelected = objectsSpotLight[i];


  

/*selected.geometry = new THREE.PointLight(
      lightSelected.GUISpotLight.scaleX,
      lightSelected.GUISpotLight.scaleY,
      lightSelected.GUISpotLight.scaleZ,
 ); */

 lightSelected.intensity = lightSelected.GUISpotLight.intensity;
 lightSelected.distance = lightSelected.GUISpotLight.distance;
 lightSelected.decay = lightSelected.GUISpotLight.decay;
 lightSelected.color.setHex(lightSelected.GUISpotLight.color);
      lightSelected.GUISpotLight.x = lightSelected.GUISpotLight.posX;
      lightSelected.GUISpotLight.y = lightSelected.GUISpotLight.posY;
      lightSelected.GUISpotLight.z = lightSelected.GUISpotLight.posZ; 
  });   

}




export function createAmbientLightGeneric(){ /* should be exported be destructuration on the html because here was exported need to be imported becuase of modularization */
  console.log('Ambient Light Has Been Created x2');
 /*  ------------- WITH A BOX FOR THE TRY -------- */
  /* const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({  

    color: 0xffaec0, 
    wireframe:false});



  const light = new THREE.Mesh(geometry,material);

  scene.add(light);
  objectsAmbientLight.push(light); */
  const light = new THREE.PointLight( 0xff0000, 1, 100 );
  // light.position.set( 50, 50, 50 );
   scene.add( light );
   objectsAmbientLight.push(light);
  light.position.y = 0.5; // para que lo levante en la vista del plano 0.5 y no quede atravesado
  light.castShadow =  true; //reciEVe lights 
  light.recieveShadow = true;

  light.GUIAmbientLight = _lightAmbientObjet();

  _createAmbientLightGUI(light.GUIAmbientLight);
  countLight = countLight + 1;
} 

//after min 38:14

function _lightAmbientObjet(){ // function defining the parameters that our object is gonna have

  var GUIAmbientLight = {
    //material: 'Basic',  //(basic, phong or lambert)
    color: 0Xffaec0, 
    intensity1:1, //scalate the geometrys in the 3 directions, starting on basic 1
    distance:1,
    //Number:1,
    posX:0,
    posY:0.5, //para qye quede al nivel del plano
    posZ:0,
    
    //Segments

  };
  return GUIAmbientLight;
}


function _createAmbientLightGUI(GUIAmbientLight) {     ///esto hara que empiece en 1
  const folder = gui.addFolder ('Ambient Light' + GUIFolderLight );

  GUIFolderLight = GUIFolderLight + 1;
  //Material
  folder.addColor(GUIAmbientLight,'color');
  /* folder.add(GUILight, 'material', ['Basic','Phong','Lambert']);
 */
  //Scale
  folder.add(GUIAmbientLight, 'intensity1',0, 10);
  folder.add(GUIAmbientLight, 'distance',0,10);
  
  
  //Position
  folder.add(GUIAmbientLight, 'posX');
  folder.add(GUIAmbientLight, 'posY');
  folder.add(GUIAmbientLight, 'posZ');

  GUIFolderLight = GUIFolderLight + 1; // For the creation of Multiple spheres or cubes


}

function _updateAmbientLights() {
  Object.keys(objectsAmbientLight).forEach(i  =>{  /* / para que ene cada posicion de nuestros objetos el haga algo ****propia funcion de java script */
    // llamando la lista de nuestro arreglo de objetos cubo
    const lightSelected = objectsAmbientLight[i];
      //omo son internas se pueden definir con el mismo nombre

  



//// NEED TO ADD THE DISTANCE AND THE INTENSITY UPDATE
    /// Ambient Ligth shouldnd be updated because it is ambient so no need to moove 
    /// it needs a START POSITION THO
    //lightSelected.color.setHex(lightSelected.GUIambient.color);
    /*lightSelected.intensity = lightSelected.GUILight.intensity; */


    ////// No Need For Position /////////
     /*  lightSelected.GUIAmbientLight.x = lightSelected.GUIAmbientLight.posX;
      lightSelected.GUIAmbientLight.y = lightSelected.GUIAmbientLight.posY;
      lightSelected.GUIAmbientLight.z = lightSelected.GUIAmbientLight.posZ; */
  });   

}