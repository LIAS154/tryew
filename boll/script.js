import * as THREE from "three";


/* ==================================================
   THREE.JS SETUP
================================================== */

const scene = new THREE.Scene();

scene.background =
  new THREE.Color(0x20252b);


const camera =
  new THREE.PerspectiveCamera(
    75,
    window.innerWidth /
      window.innerHeight,
    0.1,
    200
  );


const renderer =
  new THREE.WebGLRenderer({
    antialias: true
  });

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
);

renderer.shadowMap.enabled = true;

renderer.domElement.style.touchAction =
  "none";

document.body.appendChild(
  renderer.domElement
);


/* ==================================================
   LIGHT
================================================== */

const ambientLight =
  new THREE.HemisphereLight(
    0xffffff,
    0x444444,
    1.5
  );

scene.add(
  ambientLight
);


const directionalLight =
  new THREE.DirectionalLight(
    0xffffff,
    1.5
  );

directionalLight.position.set(
  5,
  15,
  5
);

directionalLight.castShadow = true;

scene.add(
  directionalLight
);


/* ==================================================
   GYM
================================================== */

const GYM_WIDTH = 40;
const GYM_DEPTH = 40;
const GYM_HEIGHT = 10;
const WALL_THICKNESS = 0.5;


/* ==================================================
   FLOOR
================================================== */

const floor =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      GYM_WIDTH,
      0.5,
      GYM_DEPTH
    ),

    new THREE.MeshStandardMaterial({
      color: 0x777777,
      roughness: 0.8
    })

  );

floor.position.y = -0.25;

floor.receiveShadow = true;

scene.add(
  floor
);


/* ==================================================
   WALL MATERIAL
================================================== */

const wallMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xd9d9d9,
    roughness: 0.8
  });


/* ==================================================
   BACK WALL
================================================== */

const backWall =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      GYM_WIDTH,
      GYM_HEIGHT,
      WALL_THICKNESS
    ),

    wallMaterial

  );

backWall.position.set(
  0,
  GYM_HEIGHT / 2,
  -GYM_DEPTH / 2
);

backWall.receiveShadow = true;

scene.add(
  backWall
);


/* ==================================================
   FRONT WALL
================================================== */

const frontWall =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      GYM_WIDTH,
      GYM_HEIGHT,
      WALL_THICKNESS
    ),

    wallMaterial

  );

frontWall.position.set(
  0,
  GYM_HEIGHT / 2,
  GYM_DEPTH / 2
);

frontWall.receiveShadow = true;

scene.add(
  frontWall
);


/* ==================================================
   LEFT WALL
================================================== */

const leftWall =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      WALL_THICKNESS,
      GYM_HEIGHT,
      GYM_DEPTH
    ),

    wallMaterial

  );

leftWall.position.set(
  -GYM_WIDTH / 2,
  GYM_HEIGHT / 2,
  0
);

leftWall.receiveShadow = true;

scene.add(
  leftWall
);


/* ==================================================
   RIGHT WALL
================================================== */

const rightWall =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      WALL_THICKNESS,
      GYM_HEIGHT,
      GYM_DEPTH
    ),

    wallMaterial

  );

rightWall.position.set(
  GYM_WIDTH / 2,
  GYM_HEIGHT / 2,
  0
);

rightWall.receiveShadow = true;

scene.add(
  rightWall
);


/* ==================================================
   CEILING
================================================== */

const ceiling =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      GYM_WIDTH,
      0.5,
      GYM_DEPTH
    ),

    new THREE.MeshStandardMaterial({
      color: 0xbcbcbc
    })

  );

ceiling.position.y =
  GYM_HEIGHT;

scene.add(
  ceiling
);


/* ==================================================
   PLAYER
================================================== */

const player = {

  position:
    new THREE.Vector3(
      0,
      1,
      12
    ),

  velocityY: 0,

  grounded: true

};


camera.position.copy(
  player.position
);


/* ==================================================
   CAMERA
================================================== */

let yaw = 0;
let pitch = 0;

const LOOK_SPEED = 0.004;

const MAX_PITCH =
  Math.PI / 2 - 0.05;


/* ==================================================
   HIDE OLD CSS BOW
================================================== */

const oldBow =
  document.getElementById(
    "bow"
  );

if (oldBow) {

  oldBow.style.display =
    "none";

}


/* ==================================================
   DORAEMON-LIKE HAND
================================================== */

const handGroup =
  new THREE.Group();

camera.add(
  handGroup
);

scene.add(
  camera
);


const skinMaterial =
  new THREE.MeshStandardMaterial({

    color: 0xe0a078,

    roughness: 0.85

  });


/* ==================================================
   ARM
================================================== */

const arm =
  new THREE.Mesh(

    new THREE.CapsuleGeometry(
      0.16,
      0.65,
      8,
      16
    ),

    skinMaterial

  );

arm.rotation.z =
  -0.35;

arm.position.set(
  0.48,
  -0.75,
  -1.15
);

handGroup.add(
  arm
);


/* ==================================================
   ROUND PALM
================================================== */

const palm =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      0.3,
      20,
      16
    ),

    skinMaterial

  );

palm.scale.set(
  1.05,
  1.05,
  0.8
);

palm.position.set(
  0.55,
  -0.42,
  -1.35
);

handGroup.add(
  palm
);


/* ==================================================
   ROUND FINGER BLOB
================================================== */

const fingerBlob =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      0.16,
      16,
      12
    ),

    skinMaterial

  );

fingerBlob.scale.set(
  1.25,
  0.75,
  0.8
);

fingerBlob.position.set(
  0.53,
  -0.30,
  -1.55
);

handGroup.add(
  fingerBlob
);


/* ==================================================
   THUMB
================================================== */

const thumb =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      0.18,
      16,
      12
    ),

    skinMaterial

  );

thumb.scale.set(
  0.9,
  1.15,
  0.8
);

thumb.position.set(
  0.31,
  -0.45,
  -1.48
);

handGroup.add(
  thumb
);


/* ==================================================
   HAND ANIMATION
================================================== */

let handTargetZ = 0;

let handKick = 0;


/* ==================================================
   KEYBOARD
================================================== */

const keys = {};

window.addEventListener(
  "keydown",
  e => {

    keys[e.code] = true;

    if (
      e.code === "Space"
    ) {

      jump();

    }

  }
);


window.addEventListener(
  "keyup",
  e => {

    keys[e.code] = false;

  }
);


/* ==================================================
   PLAYER PHYSICS
================================================== */

const JUMP_POWER = 7;

const PLAYER_GRAVITY = 22;


function jump() {

  if (
    player.grounded
  ) {

    player.velocityY =
      JUMP_POWER;

    player.grounded =
      false;

  }

}


/* ==================================================
   JOYSTICK
================================================== */

let joystickX = 0;
let joystickY = 0;

const joystick =
  document.getElementById(
    "joystick"
  );

const joystickKnob =
  document.getElementById(
    "joystickKnob"
  );


let joystickActive = false;

let joystickCenterX = 0;
let joystickCenterY = 0;

const joystickRadius = 45;


if (
  joystick &&
  joystickKnob
) {

  joystick.style.touchAction =
    "none";


  joystick.addEventListener(
    "pointerdown",
    e => {

      e.preventDefault();

      e.stopPropagation();

      joystickActive =
        true;

      joystick.setPointerCapture(
        e.pointerId
      );


      const rect =
        joystick.getBoundingClientRect();


      joystickCenterX =
        rect.left +
        rect.width / 2;


      joystickCenterY =
        rect.top +
        rect.height / 2;


      updateJoystick(
        e.clientX,
        e.clientY
      );

    }
  );


  joystick.addEventListener(
    "pointermove",
    e => {

      if (
        !joystickActive
      ) {

        return;

      }

      e.preventDefault();

      e.stopPropagation();

      updateJoystick(
        e.clientX,
        e.clientY
      );

    }
  );


  joystick.addEventListener(
    "pointerup",
    e => {

      e.preventDefault();

      e.stopPropagation();

      resetJoystick();

    }
  );


  joystick.addEventListener(
    "pointercancel",
    resetJoystick
  );

}


function updateJoystick(
  clientX,
  clientY
) {

  let dx =
    clientX -
    joystickCenterX;

  let dy =
    clientY -
    joystickCenterY;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  if (
    distance >
    joystickRadius
  ) {

    dx =
      dx /
      distance *
      joystickRadius;

    dy =
      dy /
      distance *
      joystickRadius;

  }


  joystickX =
    dx /
    joystickRadius;


  joystickY =
    dy /
    joystickRadius;


  if (
    joystickKnob
  ) {

    joystickKnob.style.transform =
      `translate(${dx}px, ${dy}px)`;

  }

}


function resetJoystick() {

  joystickActive =
    false;

  joystickX = 0;
  joystickY = 0;


  if (
    joystickKnob
  ) {

    joystickKnob.style.transform =
      "translate(0px, 0px)";

  }

}


/* ==================================================
   TOUCH CAMERA CONTROL
================================================== */

/*
   ★ここを作り直した

   ・左下ジョイスティック → 無視
   ・JUMP / SHOOT → 無視
   ・それ以外をスワイプ → 視点移動
*/

let lookPointerId = null;

let lastLookX = 0;
let lastLookY = 0;


function isUIElement(
  element
) {

  if (
    !element
  ) {

    return false;

  }


  return !!element.closest(
    "#joystick, #jumpButton, #shootButton, #chargeUI"
  );

}


renderer.domElement.addEventListener(
  "pointerdown",
  e => {

    /*
       UIを触った場合は
       視点操作開始しない
    */

    if (
      isUIElement(e.target)
    ) {

      return;

    }


    /*
       右半分を中心に
       視点操作可能

       ただしジョイスティック
       周辺は除外
    */

    if (
      e.clientX <
      window.innerWidth * 0.25 &&
      e.clientY >
      window.innerHeight * 0.65
    ) {

      return;

    }


    lookPointerId =
      e.pointerId;


    lastLookX =
      e.clientX;

    lastLookY =
      e.clientY;


    renderer.domElement.setPointerCapture(
      e.pointerId
    );


    e.preventDefault();

  },
  {
    passive: false
  }
);


renderer.domElement.addEventListener(
  "pointermove",
  e => {

    if (
      lookPointerId !==
      e.pointerId
    ) {

      return;

    }


    e.preventDefault();


    const dx =
      e.clientX -
      lastLookX;


    const dy =
      e.clientY -
      lastLookY;


    lastLookX =
      e.clientX;

    lastLookY =
      e.clientY;


    yaw -=
      dx *
      LOOK_SPEED;


    pitch -=
      dy *
      LOOK_SPEED;


    pitch =
      THREE.MathUtils.clamp(
        pitch,
        -MAX_PITCH,
        MAX_PITCH
      );

  },
  {
    passive: false
  }
);


function stopLook(
  e
) {

  if (
    lookPointerId ===
    e.pointerId
  ) {

    lookPointerId =
      null;

  }

}


renderer.domElement.addEventListener(
  "pointerup",
  stopLook
);

renderer.domElement.addEventListener(
  "pointercancel",
  stopLook
);

renderer.domElement.addEventListener(
  "lostpointercapture",
  () => {

    lookPointerId =
      null;

  }
);


/* ==================================================
   TARGET
================================================== */

let target = null;


function randomRange(
  min,
  max
) {

  return (
    min +
    Math.random() *
    (max - min)
  );

}


function createTarget() {

  if (target) {

    scene.remove(
      target
    );

  }


  const targetGroup =
    new THREE.Group();


  /* -----------------------------
     OUTER
  ----------------------------- */

  const outer =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        2.2,
        2.2,
        0.18,
        48
      ),

      new THREE.MeshStandardMaterial({
        color: 0xffffff
      })

    );


  /* -----------------------------
     MIDDLE
  ----------------------------- */

  const middle =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        1.5,
        1.5,
        0.2,
        48
      ),

      new THREE.MeshStandardMaterial({
        color: 0xff3333
      })

    );


  /* -----------------------------
     CENTER
  ----------------------------- */

  const center =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.7,
        0.7,
        0.22,
        48
      ),

      new THREE.MeshStandardMaterial({
        color: 0xffff33
      })

    );


  outer.rotation.x =
    Math.PI / 2;

  middle.rotation.x =
    Math.PI / 2;

  center.rotation.x =
    Math.PI / 2;


  targetGroup.add(
    outer,
    middle,
    center
  );


  /* -----------------------------
     RANDOM WALL
  ----------------------------- */

  const walls = [
    "back",
    "front",
    "left",
    "right"
  ];


  const wallType =
    walls[
      Math.floor(
        Math.random() *
        walls.length
      )
    ];


  const margin = 3;


  const x =
    randomRange(
      -GYM_WIDTH / 2 +
        margin,

      GYM_WIDTH / 2 -
        margin
    );


  const y =
    randomRange(
      2.5,
      7
    );


  const z =
    randomRange(
      -GYM_DEPTH / 2 +
        margin,

      GYM_DEPTH / 2 -
        margin
    );


  switch (
    wallType
  ) {

    case "back":

      targetGroup.position.set(
        x,
        y,
        -GYM_DEPTH / 2 +
          0.7
      );

      targetGroup.rotation.y =
        0;

      break;


    case "front": {

      let frontX = x;


      if (
        Math.abs(
          frontX -
          player.position.x
        ) < 4
      ) {

        frontX +=
          frontX >= 0
            ? 5
            : -5;

      }


      frontX =
        THREE.MathUtils.clamp(
          frontX,
          -GYM_WIDTH / 2 +
            margin,
          GYM_WIDTH / 2 -
            margin
        );


      targetGroup.position.set(
        frontX,
        y,
        GYM_DEPTH / 2 -
          0.7
      );


      targetGroup.rotation.y =
        Math.PI;

      break;

    }


    case "left":

      targetGroup.position.set(
        -GYM_WIDTH / 2 +
          0.7,
        y,
        z
      );

      targetGroup.rotation.y =
        -Math.PI / 2;

      break;


    case "right":

      targetGroup.position.set(
        GYM_WIDTH / 2 -
          0.7,
        y,
        z
      );

      targetGroup.rotation.y =
        Math.PI / 2;

      break;

  }


  scene.add(
    targetGroup
  );


  target =
    targetGroup;

}


createTarget();


/* ==================================================
   SCORE
================================================== */

let score = 0;


const scoreElement =
  document.getElementById(
    "score"
  );


function updateScore() {

  if (
    scoreElement
  ) {

    scoreElement.textContent =
      `SCORE: ${score}`;

  }

}


updateScore();


/* ==================================================
   ARROW
================================================== */

const arrows = [];


function createArrow() {

  const arrow =
    new THREE.Group();


  /* -----------------------------
     SHAFT
  ----------------------------- */

  const shaft =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.025,
        0.025,
        1.8,
        8
      ),

      new THREE.MeshStandardMaterial({
        color: 0x5b3a20
      })

    );


  shaft.rotation.x =
    Math.PI / 2;


  shaft.position.z =
    0.9;


  arrow.add(
    shaft
  );


  /* -----------------------------
     TIP
  ----------------------------- */

  const tip =
    new THREE.Mesh(

      new THREE.ConeGeometry(
        0.09,
        0.28,
        8
      ),

      new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.8,
        roughness: 0.25
      })

    );


  tip.rotation.x =
    -Math.PI / 2;


  tip.position.z =
    -0.12;


  arrow.add(
    tip
  );


  /* -----------------------------
     FEATHER
  ----------------------------- */

  const feather =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.16,
        0.08,
        0.35
      ),

      new THREE.MeshStandardMaterial({
        color: 0xffffff
      })

    );


  feather.position.z =
    1.45;


  arrow.add(
    feather
  );


  return arrow;

}


/* ==================================================
   ARROW POWER
================================================== */

const MIN_POWER = 8;
const MAX_POWER = 35;
const MAX_CHARGE_TIME = 2.0;

const MAX_SPREAD_DEGREES = 8;


/* ==================================================
   SHOOT
================================================== */

function shootArrow(
  power,
  chargeRatio
) {

  const arrow =
    createArrow();


  const start =
    new THREE.Vector3();


  camera.getWorldPosition(
    start
  );


  const direction =
    new THREE.Vector3(
      0,
      0,
      -1
    );


  direction.applyQuaternion(
    camera.quaternion
  );


  direction.normalize();


  /* -----------------------------
     CHARGE ACCURACY
  ----------------------------- */

  const spread =
    THREE.MathUtils.degToRad(

      MAX_SPREAD_DEGREES *
      (1 - chargeRatio)

    );


  if (
    spread > 0
  ) {

    const randomYaw =
      THREE.MathUtils.randFloat(
        -spread,
        spread
      );


    const randomPitch =
      THREE.MathUtils.randFloat(
        -spread,
        spread
      );


    const spreadQuaternion =
      new THREE.Quaternion();


    spreadQuaternion.setFromEuler(

      new THREE.Euler(
        randomPitch,
        randomYaw,
        0
      )

    );


    direction.applyQuaternion(
      spreadQuaternion
    );


    direction.normalize();

  }


  arrow.position.copy(
    start
  );


  arrow.quaternion.setFromUnitVectors(
    new THREE.Vector3(
      0,
      0,
      -1
    ),
    direction
  );


  scene.add(
    arrow
  );


  arrows.push({

    mesh: arrow,

    velocity:
      direction
        .clone()
        .multiplyScalar(
          power
        ),

    life: 0

  });


  /* -----------------------------
     HAND RECOIL
  ----------------------------- */

  handKick = 1;

  handTargetZ = 0;

}


/* ==================================================
   ARROW UPDATE
================================================== */

const ARROW_GRAVITY = 9.8;


function updateArrows(
  delta
) {

  for (
    let i = arrows.length - 1;
    i >= 0;
    i--
  ) {

    const arrow =
      arrows[i];


    arrow.velocity.y -=
      ARROW_GRAVITY *
      delta;


    arrow.mesh.position.addScaledVector(
      arrow.velocity,
      delta
    );


    arrow.life +=
      delta;


    /* -----------------------------
       ROTATE ARROW
    ----------------------------- */

    if (
      arrow.velocity.lengthSq() >
      0.001
    ) {

      const direction =
        arrow.velocity
          .clone()
          .normalize();


      arrow.mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(
          0,
          0,
          -1
        ),
        direction
      );

    }


    /* -----------------------------
       TARGET COLLISION
    ----------------------------- */

    if (
      target &&
      arrow.life > 0.03
    ) {

      const localPosition =
        target.worldToLocal(

          arrow.mesh.position
            .clone()

        );


      const distanceFromCenter =
        Math.sqrt(

          localPosition.x *
            localPosition.x +

          localPosition.y *
            localPosition.y

        );


      const depth =
        Math.abs(
          localPosition.z
        );


      if (
        depth < 0.5 &&
        distanceFromCenter < 2.2
      ) {

        let points = 0;


        if (
          distanceFromCenter <
          0.7
        ) {

          points = 100;

        }

        else if (
          distanceFromCenter <
          1.5
        ) {

          points = 50;

        }

        else {

          points = 10;

        }


        score +=
          points;


        updateScore();


        scene.remove(
          arrow.mesh
        );


        arrows.splice(
          i,
          1
        );


        createTarget();


        continue;

      }

    }


    /* -----------------------------
       REMOVE ARROW
    ----------------------------- */

    if (

      arrow.mesh.position.y < 0 ||

      arrow.life > 10 ||

      Math.abs(
        arrow.mesh.position.x
      ) > 100 ||

      Math.abs(
        arrow.mesh.position.z
      ) > 100

    ) {

      scene.remove(
        arrow.mesh
      );


      arrows.splice(
        i,
        1
      );

    }

  }

}


/* ==================================================
   CHARGE SYSTEM
================================================== */

let charging = false;

let chargeTime = 0;


const shootButton =
  document.getElementById(
    "shootButton"
  );


const chargeUI =
  document.getElementById(
    "chargeUI"
  );


const chargeFill =
  document.getElementById(
    "chargeFill"
  );


if (
  shootButton
) {

  shootButton.style.touchAction =
    "none";


  shootButton.addEventListener(
    "pointerdown",
    e => {

      e.preventDefault();

      e.stopPropagation();


      if (
        charging
      ) {

        return;

      }


      charging = true;

      chargeTime = 0;

    }
  );


  shootButton.addEventListener(
    "pointerup",
    e => {

      e.preventDefault();

      e.stopPropagation();

      releaseShot();

    }
  );


  shootButton.addEventListener(
    "pointercancel",
    e => {

      e.preventDefault();

      e.stopPropagation();

      releaseShot();

    }
  );


  shootButton.addEventListener(
    "pointerleave",
    e => {

      /*
         ボタンから指が離れたら
         そのまま発射
      */

      if (
        charging
      ) {

        releaseShot();

      }

    }
  );

}


function releaseShot() {

  if (
    !charging
  ) {

    return;

  }


  const ratio =
    Math.min(
      chargeTime /
        MAX_CHARGE_TIME,
      1
    );


  const power =
    MIN_POWER +
    (
      MAX_POWER -
      MIN_POWER
    ) *
    ratio;


  shootArrow(
    power,
    ratio
  );


  charging = false;

  chargeTime = 0;


  if (
    chargeUI
  ) {

    chargeUI.style.display =
      "none";

  }


  if (
    chargeFill
  ) {

    chargeFill.style.width =
      "0%";

  }

}


/* ==================================================
   JUMP BUTTON
================================================== */

const jumpButton =
  document.getElementById(
    "jumpButton"
  );


if (
  jumpButton
) {

  jumpButton.style.touchAction =
    "none";


  jumpButton.addEventListener(
    "pointerdown",
    e => {

      e.preventDefault();

      e.stopPropagation();

      jump();

    }
  );

}


/* ==================================================
   UPDATE CHARGE
================================================== */

function updateCharge(
  delta
) {

  if (
    !charging
  ) {

    return;

  }


  chargeTime +=
    delta;


  chargeTime =
    Math.min(
      chargeTime,
      MAX_CHARGE_TIME
    );


  const ratio =
    chargeTime /
    MAX_CHARGE_TIME;


  if (
    chargeUI
  ) {

    chargeUI.style.display =
      "block";

  }


  if (
    chargeFill
  ) {

    chargeFill.style.width =
      `${ratio * 100}%`;

  }

}


/* ==================================================
   UPDATE HAND
================================================== */

function updateHand(
  delta
) {

  if (
    charging
  ) {

    const ratio =
      Math.min(
        chargeTime /
          MAX_CHARGE_TIME,
        1
      );


    /*
       溜めるほど後ろへ
    */

    handTargetZ =
      0.15 +
      ratio * 0.45;

  }


  handGroup.position.z +=

    (
      handTargetZ -
      handGroup.position.z
    ) *

    Math.min(
      delta * 12,
      1
    );


  /* -----------------------------
     RECOIL
  ----------------------------- */

  if (
    handKick > 0
  ) {

    handKick -=
      delta * 6;


    handKick =
      Math.max(
        handKick,
        0
      );

  }


  handGroup.position.z +=
    handKick *
    delta *
    -3;

}


/* ==================================================
   PLAYER MOVEMENT
================================================== */

function updatePlayer(
  delta
) {

  const moveSpeed = 6;


  let forward = 0;
  let right = 0;


  /* -----------------------------
     KEYBOARD
  ----------------------------- */

  if (
    keys["KeyW"] ||
    keys["ArrowUp"]
  ) {

    forward += 1;

  }


  if (
    keys["KeyS"] ||
    keys["ArrowDown"]
  ) {

    forward -= 1;

  }


  if (
    keys["KeyD"] ||
    keys["ArrowRight"]
  ) {

    right += 1;

  }


  if (
    keys["KeyA"] ||
    keys["ArrowLeft"]
  ) {

    right -= 1;

  }


  /* -----------------------------
     JOYSTICK
  ----------------------------- */

  forward +=
    -joystickY;

  right +=
    joystickX;


  /* -----------------------------
     CAMERA RELATIVE MOVEMENT
  ----------------------------- */

  const forwardVector =
    new THREE.Vector3(
      0,
      0,
      -1
    );


  forwardVector.applyAxisAngle(
    new THREE.Vector3(
      0,
      1,
      0
    ),
    yaw
  );


  const rightVector =
    new THREE.Vector3(
      1,
      0,
      0
    );


  rightVector.applyAxisAngle(
    new THREE.Vector3(
      0,
      1,
      0
    ),
    yaw
  );


  const movement =
    new THREE.Vector3();


  movement.addScaledVector(
    forwardVector,
    forward
  );


  movement.addScaledVector(
    rightVector,
    right
  );


  if (
    movement.lengthSq() >
    1
  ) {

    movement.normalize();

  }


  player.position.addScaledVector(
    movement,
    moveSpeed * delta
  );


  /* -----------------------------
     WALL LIMIT
  ----------------------------- */

  const limitX =
    GYM_WIDTH / 2 - 1;


  const limitZ =
    GYM_DEPTH / 2 - 1;


  player.position.x =
    THREE.MathUtils.clamp(
      player.position.x,
      -limitX,
      limitX
    );


  player.position.z =
    THREE.MathUtils.clamp(
      player.position.z,
      -limitZ,
      limitZ
    );


  /* -----------------------------
     GRAVITY
  ----------------------------- */

  player.velocityY -=
    PLAYER_GRAVITY *
    delta;


  player.position.y +=
    player.velocityY *
    delta;


  if (
    player.position.y <= 1
  ) {

    player.position.y =
      1;

    player.velocityY =
      0;

    player.grounded =
      true;

  }


  /* -----------------------------
     CAMERA
  ----------------------------- */

  camera.position.copy(
    player.position
  );


  camera.rotation.order =
    "YXZ";


  camera.rotation.y =
    yaw;


  camera.rotation.x =
    pitch;

}


/* ==================================================
   RESIZE
================================================== */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);


/* ==================================================
   GAME LOOP
================================================== */

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const delta =
    Math.min(
      clock.getDelta(),
      0.05
    );


  updatePlayer(
    delta
  );


  updateCharge(
    delta
  );


  updateHand(
    delta
  );


  updateArrows(
    delta
  );


  renderer.render(
    scene,
    camera
  );

}


animate();