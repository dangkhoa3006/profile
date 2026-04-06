"use client";

import * as THREE from "three";
import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { ThreeEvent } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: object;
    meshLineMaterial: object & {
      color?: string;
      depthTest?: boolean;
      resolution?: [number, number];
      lineWidth?: number;
      transparent?: boolean;
      opacity?: number;
    };
  }
}

// ─────────────────────────────────────────────
// Draw the card face onto a canvas texture
// ─────────────────────────────────────────────
function buildCardTexture(): THREE.CanvasTexture {
  const W = 512;
  const H = 720;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0d1117");
  bg.addColorStop(1, "#0f1923");
  ctx.fillStyle = bg;
  ctx.roundRect(0, 0, W, H, 22);
  ctx.fill();

  // Glowing border
  ctx.strokeStyle = "rgba(161,250,255,0.45)";
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "#a1faff";
  ctx.shadowBlur = 18;
  ctx.roundRect(3, 3, W - 6, H - 6, 20);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Top accent bar
  const accentGrad = ctx.createLinearGradient(0, 0, W, 0);
  accentGrad.addColorStop(0, "transparent");
  accentGrad.addColorStop(0.3, "rgba(161,250,255,0.18)");
  accentGrad.addColorStop(0.7, "rgba(161,250,255,0.18)");
  accentGrad.addColorStop(1, "transparent");
  ctx.fillStyle = accentGrad;
  ctx.roundRect(0, 0, W, 64, [20, 20, 0, 0]);
  ctx.fill();

  // Lanyard hole
  ctx.fillStyle = "#070c12";
  ctx.strokeStyle = "rgba(161,250,255,0.7)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#a1faff";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(W / 2, 32, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Avatar ring
  ctx.strokeStyle = "rgba(161,250,255,0.5)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#a1faff";
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(W / 2, 190, 72, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Avatar circle fill
  const radialGrad = ctx.createRadialGradient(W / 2, 190, 0, W / 2, 190, 72);
  radialGrad.addColorStop(0, "rgba(161,250,255,0.12)");
  radialGrad.addColorStop(1, "rgba(161,250,255,0.04)");
  ctx.fillStyle = radialGrad;
  ctx.beginPath();
  ctx.arc(W / 2, 190, 72, 0, Math.PI * 2);
  ctx.fill();

  // Avatar initials fallback
  ctx.font = "bold 52px 'Courier New', monospace";
  ctx.fillStyle = "rgba(161,250,255,0.6)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("DK", W / 2, 190);
  ctx.textBaseline = "alphabetic";

  // Name
  ctx.font = "bold 34px 'Courier New', monospace";
  ctx.fillStyle = "#a1faff";
  ctx.textAlign = "center";
  ctx.shadowColor = "#a1faff";
  ctx.shadowBlur = 16;
  ctx.fillText("ĐĂNG KHOA", W / 2, 308);
  ctx.shadowBlur = 0;

  // Title
  ctx.font = "500 16px 'Courier New', monospace";
  ctx.fillStyle = "rgba(161,250,255,0.65)";
  ctx.letterSpacing = "0.2em";
  ctx.fillText("FULLSTACK DEVELOPER", W / 2, 340);

  // Divider
  const lineGrad = ctx.createLinearGradient(60, 0, W - 60, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.5, "rgba(161,250,255,0.25)");
  lineGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 365);
  ctx.lineTo(W - 60, 365);
  ctx.stroke();

  // Skill tags
  const tags = [
    { label: "React", color: "#61dafb" },
    { label: "Next.js", color: "#a1faff" },
    { label: "NestJS", color: "#e0234e" },
    { label: "Flutter", color: "#54c5f8" },
  ];
  ctx.font = "bold 13px 'Courier New', monospace";
  const tagH = 28;
  const tagPad = 14;
  const tagGap = 10;
  const tagWidths = tags.map((t) => ctx.measureText(t.label).width + tagPad * 2);
  const totalTagW = tagWidths.reduce((a, b) => a + b, 0) + tagGap * (tags.length - 1);
  let tagX = (W - totalTagW) / 2;
  tags.forEach((t, i) => {
    const tw = tagWidths[i];
    ctx.fillStyle = `${t.color}22`;
    ctx.strokeStyle = `${t.color}88`;
    ctx.lineWidth = 1;
    ctx.roundRect(tagX, 385, tw, tagH, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = t.color;
    ctx.textAlign = "left";
    ctx.fillText(t.label, tagX + tagPad, 404);
    tagX += tw + tagGap;
  });

  // Scanline overlay
  ctx.fillStyle = "rgba(0,0,0,0.04)";
  for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 2);

  // GitHub
  ctx.font = "12px 'Courier New', monospace";
  ctx.fillStyle = "rgba(161,250,255,0.38)";
  ctx.textAlign = "center";
  ctx.fillText("github.com/dangkhoa3006", W / 2, 456);

  // Decorative grid
  ctx.fillStyle = "rgba(161,250,255,0.06)";
  const cellSize = 22;
  for (let gx = 0; gx < 8; gx++) {
    for (let gy = 0; gy < 7; gy++) {
      if ((gx + gy) % 2 === 0) {
        ctx.fillRect(
          (W - 8 * cellSize - 7 * 4) / 2 + gx * (cellSize + 4),
          490 + gy * (cellSize + 4),
          cellSize,
          cellSize
        );
      }
    }
  }

  // ID line
  ctx.font = "10px 'Courier New', monospace";
  ctx.fillStyle = "rgba(161,250,255,0.22)";
  ctx.fillText("#DK-2002 · FULLSTACK · HCM", W / 2, 698);

  return new THREE.CanvasTexture(canvas);
}

// ─────────────────────────────────────────────
// The lanyard Band + Card physics component
// ─────────────────────────────────────────────
function Band({ maxSpeed = 50, minSpeed = 10 }: { maxSpeed?: number; minSpeed?: number }) {
  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  
  const lerpedPositions = useRef<WeakMap<RapierRigidBody, THREE.Vector3>>(new WeakMap());

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2,
  };

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  });
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  // Canvas texture for the card front
  const cardTexture = useMemo(() => buildCardTexture(), []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        const body = ref.current;
        if (!body) return;
        
        let lerped = lerpedPositions.current.get(body);
        if (!lerped) {
          lerped = new THREE.Vector3().copy(body.translation() as THREE.Vector3);
          lerpedPositions.current.set(body, lerped);
        }
        
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, lerped.distanceTo(body.translation() as THREE.Vector3))
        );
        lerped.lerp(
          body.translation() as THREE.Vector3,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation() as THREE.Vector3);
      curve.points[1].copy(lerpedPositions.current.get(j2.current!)!);
      curve.points[2].copy(lerpedPositions.current.get(j1.current!)!);
      curve.points[3].copy(fixed.current.translation() as THREE.Vector3);
      (band.current.geometry as MeshLineGeometry).setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel() as THREE.Vector3);
      const q = card.current.rotation();
      rot.set(q.x, q.y, q.z);
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });


  return (
    <>
      <group position={[0, 4, 0]}>
        {/* Fixed anchor at top */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        {/* Rope joints */}
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* The badge card */}
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              if (e.target && 'releasePointerCapture' in e.target) {
                (e.target as Element).releasePointerCapture(e.pointerId);
              }
              drag(false);
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              if (e.target && 'setPointerCapture' in e.target) {
                (e.target as Element).setPointerCapture(e.pointerId);
              }
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            {/* Card back (dark metallic) */}
            <mesh>
              <boxGeometry args={[0.8 * 2, 1.125 * 2, 0.025]} />
              <meshPhysicalMaterial
                color="#0a1018"
                roughness={0.2}
                metalness={0.6}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>

            {/* Card front face with canvas texture */}
            <mesh position={[0, 0, 0.014]}>
              <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
              <meshStandardMaterial
                map={cardTexture}
                transparent
                roughness={0.15}
                metalness={0.1}
              />
            </mesh>

            {/* Metallic clip at top */}
            <mesh position={[0, 1.125, 0.02]}>
              <boxGeometry args={[0.12, 0.12, 0.06]} />
              <meshPhysicalMaterial
                color="#b0c4de"
                roughness={0.1}
                metalness={0.95}
                clearcoat={1}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* The lanyard band */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#a1faff"
          depthTest={false}
          resolution={[width, height]}
          lineWidth={1}
          transparent
          opacity={0.85}
        />
      </mesh>
    </>
  );
}

// ─────────────────────────────────────────────
// Main exported scene
// ─────────────────────────────────────────────
export function LanyardBadge3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 25 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
      <Environment>
        <Lightformer
          intensity={2}
          color="#a1faff"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="#a1faff"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
}
