/*
 * Avatar 3D do hero: eu, de costas, programando.
 * Modelo gerado no Avaturn (assets/models/gabriel.glb). A pose sentada e a digitação
 * são feitas por código, girando os ossos do esqueleto (mesmos nomes do Mixamo).
 * Se existir assets/models/typing.fbx (Mixamo, "Without Skin"), ele substitui a pose.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const AVATAR = 'assets/models/gabriel.glb';
const MIXAMO_TYPING = 'assets/models/typing.fbx';

const host = document.getElementById('heroScene');
const status = document.getElementById('sceneStatus');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
} catch (e) {
  status.textContent = '';   // sem WebGL: o hero fica só com o texto
}

if (renderer) init();

function init() {
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  host.prepend(renderer.domElement);

  const scene = new THREE.Scene();

  // Sempre de costas: câmera por cima do ombro, olhando a tela do notebook
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  const TARGET = new THREE.Vector3(0, 0.9, 0.42);
  const OFFSET = new THREE.Vector3(0.75, 0.8, -1.85);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(TARGET);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;              // a rolagem continua rolando a página
  controls.enableRotate = finePointer;      // no celular, arrastar rola a página
  controls.minPolarAngle = Math.PI * 0.2;
  controls.maxPolarAngle = Math.PI * 0.46;
  // O avatar olha para +Z; o giro fica preso ao lado de trás (perto de ±180°)
  controls.minAzimuthAngle = Math.PI * 0.68;
  controls.maxAzimuthAngle = -Math.PI * 0.68;
  if (!finePointer) {
    renderer.domElement.style.touchAction = 'pan-y';
    const note = document.querySelector('.note--scene');
    if (note) note.textContent = 'eu, programando.';
  }

  // ---------- Luz ----------
  scene.add(new THREE.HemisphereLight('#ffffff', '#C3D3FF', 1.6));
  const sun = new THREE.DirectionalLight('#ffffff', 2.2);
  sun.position.set(2.5, 4, -1);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -1.5, right: 1.5, top: 1.5, bottom: -1.5 });
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  const screenGlow = new THREE.PointLight('#5B80FF', 1.2, 1.6);
  scene.add(screenGlow);

  // ---------- Chão (só a sombra aparece), mesa, cadeira ----------
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.ShadowMaterial({ opacity: 0.12 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const ink = new THREE.MeshStandardMaterial({ color: '#0D0F14', roughness: 0.6 });
  const wood = new THREE.MeshStandardMaterial({ color: '#E7E2D8', roughness: 0.8 });
  const blue = new THREE.MeshStandardMaterial({ color: '#2D5BFF', roughness: 0.5 });
  const box = (w, h, d, mat, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = true;
    scene.add(m);
    return m;
  };

  const DESK_Z = 0.62, DESK_TOP = 0.74, SEAT_Y = 0.47;
  box(1.3, 0.035, 0.7, wood, 0, DESK_TOP, DESK_Z);
  for (const [x, z] of [[-0.6, DESK_Z - 0.3], [0.6, DESK_Z - 0.3], [-0.6, DESK_Z + 0.3], [0.6, DESK_Z + 0.3]]) box(0.04, DESK_TOP, 0.04, ink, x, DESK_TOP / 2, z);
  box(0.48, 0.06, 0.46, blue, 0, SEAT_Y, 0);
  box(0.48, 0.5, 0.05, blue, 0, SEAT_Y + 0.28, -0.24);
  box(0.05, SEAT_Y, 0.05, ink, 0, SEAT_Y / 2, 0);
  box(0.5, 0.03, 0.05, ink, 0, 0.03, 0);
  box(0.05, 0.03, 0.5, ink, 0, 0.03, 0);

  // ---------- Notebook com código sendo digitado ----------
  const LAPTOP_Z = DESK_Z - 0.02;
  const laptop = new THREE.Group();
  laptop.position.set(0, DESK_TOP + 0.018, LAPTOP_Z);
  scene.add(laptop);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.018, 0.25), ink);
  base.castShadow = true;
  laptop.add(base);
  const lid = new THREE.Group();
  lid.position.set(0, 0.009, 0.125);
  lid.rotation.x = -0.25;
  laptop.add(lid);
  const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.01), ink);
  lidBack.position.set(0, 0.12, 0.005);
  lidBack.castShadow = true;
  lid.add(lidBack);

  const codeCanvas = document.createElement('canvas');
  codeCanvas.width = 768; codeCanvas.height = 512;
  const cx = codeCanvas.getContext('2d');
  const codeTex = new THREE.CanvasTexture(codeCanvas);
  codeTex.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.33, 0.21), new THREE.MeshBasicMaterial({ map: codeTex, toneMapped: false }));
  screen.position.set(0, 0.12, -0.001);
  screen.rotation.y = Math.PI;   // a tela olha para o avatar (−Z)
  lid.add(screen);
  screenGlow.position.set(0, DESK_TOP + 0.2, LAPTOP_Z - 0.15);

  // Exemplo no estilo da pesquisa de redes complexas
  const CODE = [
    '# redes complexas · FCA Unicamp',
    'import igraph as ig',
    'import pandas as pd',
    '',
    'df = pd.read_csv("docentes_areas.csv")',
    'g = ig.Graph.TupleList(',
    '    df.itertuples(index=False))',
    '',
    'parts = g.community_leiden(',
    '    objective_function="modularity")',
    '',
    'print(f"{len(parts)} comunidades")'
  ].join('\n');
  let typed = 0;

  function drawCode(caret) {
    cx.fillStyle = '#0D0F14';
    cx.fillRect(0, 0, 768, 512);
    cx.fillStyle = '#1B2234';
    cx.fillRect(0, 0, 768, 34);
    ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, i) => { cx.fillStyle = c; cx.beginPath(); cx.arc(22 + i * 22, 17, 6, 0, 7); cx.fill(); });
    cx.fillStyle = '#9AA0AE'; cx.font = '16px "JetBrains Mono", monospace';
    cx.fillText('redes.py', 100, 22);
    cx.font = '21px "JetBrains Mono", monospace';
    const lines = CODE.slice(0, typed).split('\n');
    lines.forEach((ln, i) => {
      const y = 72 + i * 34;
      cx.fillStyle = '#4A5068'; cx.fillText(String(i + 1).padStart(2), 18, y);
      cx.fillStyle = ln.startsWith('#') ? '#6B7080' : ln.startsWith('import') ? '#7AA3FF' : '#EEF0F5';
      cx.fillText(ln, 64, y);
    });
    if (caret) {
      const last = lines[lines.length - 1] || '';
      cx.fillStyle = '#5B80FF';
      cx.fillRect(64 + cx.measureText(last).width + 2, 72 + (lines.length - 1) * 34 - 20, 11, 26);
    }
    codeTex.needsUpdate = true;
  }

  // ---------- Pose por código ----------
  // aim(): gira um osso para apontar para uma direção do mundo,
  // sem depender de como os eixos locais de cada osso foram exportados.
  const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion(), _pq = new THREE.Quaternion(), _wq = new THREE.Quaternion();
  function aim(bone, child, dir) {
    bone.updateWorldMatrix(true, false);
    child.updateWorldMatrix(false, false);
    bone.getWorldPosition(_a);
    child.getWorldPosition(_b);
    _q.setFromUnitVectors(_b.sub(_a).normalize(), _a.copy(dir).normalize());
    bone.parent.getWorldQuaternion(_pq);
    bone.getWorldQuaternion(_wq);
    bone.quaternion.copy(_pq.invert().multiply(_q).multiply(_wq));
    bone.updateWorldMatrix(false, true);
  }
  // turn(): rotação extra no espaço do mundo (tronco e cabeça)
  function turn(bone, worldQ) {
    bone.parent.getWorldQuaternion(_pq);
    bone.getWorldQuaternion(_wq);
    bone.quaternion.copy(_pq.invert().multiply(worldQ).multiply(_wq));
    bone.updateWorldMatrix(false, true);
  }

  let avatar, mixer = null;
  const B = {}, rest = new Map();
  const v = (x, y, z) => new THREE.Vector3(x, y, z);
  const look = { x: 0, y: 0, tx: 0, ty: 0 };

  function applyPose(t) {
    rest.forEach((q, bone) => bone.quaternion.copy(q));
    avatar.updateMatrixWorld(true);
    const s = reduceMotion ? 0 : 1;

    // Tronco levemente inclinado para a mesa, com respiração
    const breathe = Math.sin(t * 1.6) * 0.012 * s;
    aim(B.Spine, B.Spine1, v(0, 1, 0.08));
    aim(B.Spine1, B.Spine2, v(0, 1, 0.14 + breathe));
    aim(B.Spine2, B.Neck, v(0, 1, 0.2));
    aim(B.Neck, B.Head, v(0, 1, 0.22));

    // Pernas: sentado
    for (const side of ['Left', 'Right']) {
      const sx = side === 'Left' ? 1 : -1;
      aim(B[side + 'UpLeg'], B[side + 'Leg'], v(0.1 * sx, -0.12, 1));
      aim(B[side + 'Leg'], B[side + 'Foot'], v(0.02 * sx, -1, 0.08));
      aim(B[side + 'Foot'], B[side + 'ToeBase'], v(0, -0.35, 1));
    }

    // Braços: cotovelos junto ao corpo, antebraços para o teclado, dedos batendo
    for (const side of ['Left', 'Right']) {
      const sx = side === 'Left' ? 1 : -1;
      const ph = side === 'Left' ? 0 : 1.7;
      const bob = Math.sin(t * 9 + ph) * 0.03 * s;
      aim(B[side + 'Arm'], B[side + 'ForeArm'], v(0.12 * sx, -1, 0.32));
      aim(B[side + 'ForeArm'], B[side + 'Hand'], v(-0.22 * sx, 0.08 + bob, 1));
      aim(B[side + 'Hand'], B[side + 'HandMiddle1'], v(-0.08 * sx, -0.28, 1));
      ['Index', 'Middle', 'Ring', 'Pinky'].forEach((f, i) => {
        const tap = Math.max(0, Math.sin(t * 11 + i * 1.9 + ph * 2)) * 0.5 * s;
        const b1 = B[`${side}Hand${f}1`], b2 = B[`${side}Hand${f}2`], b3 = B[`${side}Hand${f}3`];
        if (!b1 || !b2 || !b3) return;
        aim(b1, b2, v(-0.04 * sx, -0.35 - tap, 1));
        aim(b2, b3, v(-0.02 * sx, -0.9 - tap, 1));
      });
    }
    applyHead();
  }

  function applyHead() {
    // Vista de costas: cursor à direita da tela = lado −X do mundo, por isso o sinal negativo
    const yaw = -look.x;
    turn(B.Spine2, new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw * 0.08, 0)));
    turn(B.Head, new THREE.Quaternion().setFromEuler(new THREE.Euler(0.18 + look.y * 0.35, yaw * 0.75, 0, 'YXZ')));
  }

  // ---------- Carregamento (depois do resto da página) ----------
  function load() {
    new GLTFLoader().load(AVATAR, (gltf) => {
      avatar = gltf.scene;
      avatar.traverse((o) => {
        if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; }
        if (o.isBone) { B[o.name] = o; rest.set(o, o.quaternion.clone()); }
      });
      scene.add(avatar);

      // Garante que o modelo olha para +Z (dedos do pé apontam para a frente)
      avatar.updateMatrixWorld(true);
      const toe = B.LeftToeBase.getWorldPosition(new THREE.Vector3()), foot = B.LeftFoot.getWorldPosition(new THREE.Vector3());
      if (toe.z < foot.z) avatar.rotation.y = Math.PI;

      applyPose(0);
      // Senta: quadril um pouco acima do assento
      avatar.updateMatrixWorld(true);
      const hips = B.Hips.getWorldPosition(new THREE.Vector3());
      avatar.position.y += (SEAT_Y + 0.11) - hips.y;
      avatar.position.z += 0.02 - hips.z;

      status.remove();
      host.classList.add('is-ready');
      tryMixamo();
    }, undefined, () => { status.textContent = ''; });
  }
  if (document.readyState === 'complete') load();
  else addEventListener('load', load, { once: true });

  function tryMixamo() {
    new FBXLoader().load(MIXAMO_TYPING, (fbx) => {
      const clip = fbx.animations[0];
      if (!clip) return;
      clip.tracks = clip.tracks
        .filter((tr) => tr.name.endsWith('.quaternion'))
        .map((tr) => { tr.name = tr.name.replace(/^mixamorig:?/, ''); return tr; })
        .filter((tr) => B[tr.name.split('.')[0]]);
      mixer = new THREE.AnimationMixer(avatar);
      mixer.clipAction(clip).play();
    }, undefined, () => { /* sem typing.fbx: segue com a pose por código */ });
  }

  // ---------- Cursor: relativo ao centro da cena ----------
  addEventListener('pointermove', (e) => {
    const r = host.getBoundingClientRect();
    look.tx = THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / (innerWidth / 2), -1, 1);
    look.ty = THREE.MathUtils.clamp((e.clientY - (r.top + r.height * 0.35)) / (innerHeight / 2), -1, 1);
  });

  // ---------- Tamanho: em áreas estreitas a câmera se afasta ----------
  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const fitScale = Math.max(1, 0.95 / camera.aspect);
    camera.position.copy(TARGET).add(OFFSET.clone().multiplyScalar(fitScale));
    controls.update();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  // ---------- Loop: só roda com o hero visível ----------
  const clock = new THREE.Clock();
  let charClock = 0, caretClock = 0, visible = true;
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) clock.getDelta();   // descarta o tempo em que ficou pausado
    renderer.setAnimationLoop(visible ? tick : null);
  }).observe(host);
  drawCode(true);

  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    look.x += (look.tx - look.x) * 0.06;
    look.y += (look.ty - look.y) * 0.06;

    if (avatar) {
      if (mixer) { mixer.update(dt); avatar.updateMatrixWorld(true); applyHead(); }
      else applyPose(t);
    }

    // Digita um caractere a cada ~60 ms e recomeça depois de uma pausa
    charClock += dt; caretClock += dt;
    if (charClock > (typed >= CODE.length ? 2.5 : 0.06)) {
      charClock = 0;
      typed = typed >= CODE.length ? 0 : typed + 1;
    }
    drawCode(Math.floor(caretClock * 2) % 2 === 0);

    controls.update();
    renderer.render(scene, camera);
  }
}
