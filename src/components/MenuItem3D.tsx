"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface MenuItem3DProps {
  category: "Coffee" | "Tea & Matcha" | "Refresher" | "Frappuccino" | "Bakery & Food";
  name: string;
}

export default function MenuItem3D({ category, name }: MenuItem3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3, 7.5);
    camera.lookAt(0, 0.2, 0);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
    pointLight.position.set(-3, 3, -3);
    scene.add(pointLight);

    // 4. Main Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 5. Construct Procedural 3D Geometry based on Category/Name
    const lowerName = name.toLowerCase();
    const isSweet = 
      category === "Bakery & Food" && 
      (lowerName.includes("cookie") || 
       lowerName.includes("croissant") || 
       lowerName.includes("muffin") || 
       lowerName.includes("pop") || 
       lowerName.includes("sweet") || 
       lowerName.includes("pastry") || 
       lowerName.includes("chocolat"));

    // --- COFFEE ---
    if (category === "Coffee") {
      // Cup Cylinder (Outer Glass)
      const cupGeo = new THREE.CylinderGeometry(1.2, 0.9, 3.2, 32, 1, true);
      const cupMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
        transmission: 0.9,
        roughness: 0.1,
        ior: 1.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const cupMesh = new THREE.Mesh(cupGeo, cupMat);
      modelGroup.add(cupMesh);

      // Solid bottom base
      const baseGeo = new THREE.CylinderGeometry(0.9, 0.85, 0.15, 32);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = -1.6;
      modelGroup.add(baseMesh);

      // Liquid
      const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
      const liqMat = new THREE.MeshPhysicalMaterial({
        color: 0x4e2c1c, // Cold brew brown
        transparent: true,
        opacity: 0.9,
        roughness: 0.1,
        transmission: 0.4,
      });
      const liqMesh = new THREE.Mesh(liqGeo, liqMat);
      liqMesh.position.y = -0.1;
      modelGroup.add(liqMesh);

      // Ice Cubes
      const iceGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const iceMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
        transmission: 0.88,
        roughness: 0.1,
        ior: 1.33,
      });

      const positions = [
        { x: -0.3, y: 0.8, z: 0.2, rX: 0.3, rY: 0.5 },
        { x: 0.3, y: 0.4, z: -0.3, rX: -0.2, rY: 0.8 },
        { x: -0.2, y: 0.0, z: -0.2, rX: 0.5, rY: 0.1 },
        { x: 0.2, y: -0.5, z: 0.2, rX: 0.1, rY: 0.4 },
      ];

      positions.forEach((p) => {
        const iceMesh = new THREE.Mesh(iceGeo, iceMat);
        iceMesh.position.set(p.x, p.y, p.z);
        iceMesh.rotation.set(p.rX, p.rY, 0);
        modelGroup.add(iceMesh);
      });

      // Dark stirrer
      const stirrerGeo = new THREE.CylinderGeometry(0.03, 0.03, 4.0, 8);
      const stirrerMat = new THREE.MeshStandardMaterial({
        color: 0x006241, // Starbucks green
        roughness: 0.3,
      });
      const stirrerMesh = new THREE.Mesh(stirrerGeo, stirrerMat);
      stirrerMesh.position.set(0.4, 0.5, 0.3);
      stirrerMesh.rotation.z = -Math.PI / 16;
      stirrerMesh.rotation.x = Math.PI / 18;
      modelGroup.add(stirrerMesh);
    }

    // --- TEA & MATCHA ---
    else if (category === "Tea & Matcha") {
      // Cup Outer Glass
      const cupGeo = new THREE.CylinderGeometry(1.2, 0.9, 3.2, 32, 1, true);
      const cupMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
        transmission: 0.9,
        roughness: 0.1,
        ior: 1.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const cupMesh = new THREE.Mesh(cupGeo, cupMat);
      modelGroup.add(cupMesh);

      // Solid bottom base
      const baseGeo = new THREE.CylinderGeometry(0.9, 0.85, 0.15, 32);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = -1.6;
      modelGroup.add(baseMesh);

      // Matcha Green Liquid
      const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
      const liqMat = new THREE.MeshPhysicalMaterial({
        color: 0x3d7044, // Matcha green
        transparent: true,
        opacity: 0.92,
        roughness: 0.2,
        transmission: 0.2,
      });
      const liqMesh = new THREE.Mesh(liqGeo, liqMat);
      liqMesh.position.y = -0.1;
      modelGroup.add(liqMesh);

      // Whipped foam topper
      const foamGeo = new THREE.CylinderGeometry(1.18, 1.15, 0.3, 32);
      const foamMat = new THREE.MeshStandardMaterial({
        color: 0xfaf5eb, // Foam white/cream
        roughness: 0.8,
      });
      const foamMesh = new THREE.Mesh(foamGeo, foamMat);
      foamMesh.position.y = 1.35;
      modelGroup.add(foamMesh);

      // Green straw
      const strawGeo = new THREE.CylinderGeometry(0.04, 0.04, 4.2, 8);
      const strawMat = new THREE.MeshStandardMaterial({
        color: 0x00704b,
        roughness: 0.2,
      });
      const strawMesh = new THREE.Mesh(strawGeo, strawMat);
      strawMesh.position.set(-0.3, 0.8, 0.2);
      strawMesh.rotation.z = Math.PI / 14;
      strawMesh.rotation.x = -Math.PI / 20;
      modelGroup.add(strawMesh);
    }

    // --- REFRESHER ---
    else if (category === "Refresher") {
      // Cup Outer Glass
      const cupGeo = new THREE.CylinderGeometry(1.2, 0.9, 3.2, 32, 1, true);
      const cupMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
        transmission: 0.9,
        roughness: 0.1,
        ior: 1.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const cupMesh = new THREE.Mesh(cupGeo, cupMat);
      modelGroup.add(cupMesh);

      // Solid bottom base
      const baseGeo = new THREE.CylinderGeometry(0.9, 0.85, 0.15, 32);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = -1.6;
      modelGroup.add(baseMesh);

      // Liquid - Vibrant Pink (Dragonfruit)
      const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
      const liqMat = new THREE.MeshPhysicalMaterial({
        color: 0xe02874, // Pink Refresher
        transparent: true,
        opacity: 0.85,
        roughness: 0.1,
        transmission: 0.7,
        thickness: 0.8,
      });
      const liqMesh = new THREE.Mesh(liqGeo, liqMat);
      liqMesh.position.y = -0.1;
      modelGroup.add(liqMesh);

      // Sliced fruit floating inside
      const fruitGeo = new THREE.BoxGeometry(0.3, 0.3, 0.1);
      const fruitMat = new THREE.MeshStandardMaterial({
        color: 0x7a093a, // Deep red fruit chunks
        roughness: 0.5,
      });

      const fruitPositions = [
        { x: -0.4, y: 0.9, z: 0.1, rX: 0.4, rY: 0.2 },
        { x: 0.3, y: 0.5, z: 0.4, rX: -0.5, rY: 0.9 },
        { x: 0.2, y: -0.2, z: -0.3, rX: 0.1, rY: 0.3 },
      ];

      fruitPositions.forEach((fp) => {
        const fruitMesh = new THREE.Mesh(fruitGeo, fruitMat);
        fruitMesh.position.set(fp.x, fp.y, fp.z);
        fruitMesh.rotation.set(fp.rX, fp.rY, 0.5);
        modelGroup.add(fruitMesh);
      });

      // Ice Cubes
      const iceGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const iceMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        transmission: 0.9,
        roughness: 0.1,
      });
      const ice1 = new THREE.Mesh(iceGeo, iceMat);
      ice1.position.set(-0.2, 0.4, -0.2);
      ice1.rotation.set(0.3, 0.1, 0.5);
      modelGroup.add(ice1);

      const ice2 = new THREE.Mesh(iceGeo, iceMat);
      ice2.position.set(0.2, 0.8, 0.1);
      ice2.rotation.set(-0.4, 0.5, 0.1);
      modelGroup.add(ice2);

      // Green straw
      const strawGeo = new THREE.CylinderGeometry(0.04, 0.04, 4.2, 8);
      const strawMat = new THREE.MeshStandardMaterial({
        color: 0x00704b,
        roughness: 0.2,
      });
      const strawMesh = new THREE.Mesh(strawGeo, strawMat);
      strawMesh.position.set(0.3, 0.8, -0.2);
      strawMesh.rotation.z = -Math.PI / 14;
      strawMesh.rotation.x = Math.PI / 20;
      modelGroup.add(strawMesh);
    }

    // --- FRAPPUCCINO ---
    else if (category === "Frappuccino") {
      // Cup Outer Glass
      const cupGeo = new THREE.CylinderGeometry(1.2, 0.9, 3.2, 32, 1, true);
      const cupMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
        transmission: 0.9,
        roughness: 0.1,
        ior: 1.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const cupMesh = new THREE.Mesh(cupGeo, cupMat);
      modelGroup.add(cupMesh);

      // Solid bottom base
      const baseGeo = new THREE.CylinderGeometry(0.9, 0.85, 0.15, 32);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = -1.6;
      modelGroup.add(baseMesh);

      // Blended Caramel/Coffee Liquid (Cylinder)
      const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
      const liqMat = new THREE.MeshPhysicalMaterial({
        color: 0xba926a, // Blended coffee brown
        transparent: true,
        opacity: 0.95,
        roughness: 0.3,
        transmission: 0.1,
      });
      const liqMesh = new THREE.Mesh(liqGeo, liqMat);
      liqMesh.position.y = -0.1;
      modelGroup.add(liqMesh);

      // Whipped Cream Dome (layered spheres for organic fluffy look)
      const creamGroup = new THREE.Group();
      creamGroup.position.y = 1.35;
      modelGroup.add(creamGroup);

      const creamMat = new THREE.MeshStandardMaterial({
        color: 0xfffdfa,
        roughness: 0.85,
      });

      // Layer 1
      const creamBase = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.2, 32), creamMat);
      creamGroup.add(creamBase);

      // Layer 2: Cluster of spheres
      const spheres = [
        { r: 0.5, x: 0, y: 0.2, z: 0 },
        { r: 0.35, x: 0.4, y: 0.15, z: 0.3 },
        { r: 0.35, x: -0.4, y: 0.15, z: -0.3 },
        { r: 0.35, x: 0.3, y: 0.15, z: -0.4 },
        { r: 0.35, x: -0.3, y: 0.15, z: 0.4 },
        // Top peak
        { r: 0.28, x: 0, y: 0.5, z: 0 },
      ];

      spheres.forEach((s) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(s.r, 16, 16), creamMat);
        mesh.position.set(s.x, s.y, s.z);
        creamGroup.add(mesh);
      });

      // Caramel Drizzle Lines (represented by rings/torus segments)
      const drizzleMat = new THREE.MeshStandardMaterial({
        color: 0x9e6024, // Caramel brown
        roughness: 0.2,
      });
      const drizzle1 = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.05, 8, 24), drizzleMat);
      drizzle1.position.set(0, 0.35, 0);
      drizzle1.rotation.x = Math.PI / 3;
      creamGroup.add(drizzle1);

      const drizzle2 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.04, 8, 24), drizzleMat);
      drizzle2.position.set(0, 0.55, 0);
      drizzle2.rotation.x = -Math.PI / 4;
      creamGroup.add(drizzle2);

      // Green straw
      const strawGeo = new THREE.CylinderGeometry(0.04, 0.04, 4.4, 8);
      const strawMat = new THREE.MeshStandardMaterial({
        color: 0x00704b,
        roughness: 0.2,
      });
      const strawMesh = new THREE.Mesh(strawGeo, strawMat);
      strawMesh.position.set(-0.25, 1.2, 0.1);
      strawMesh.rotation.z = Math.PI / 12;
      strawMesh.rotation.x = -Math.PI / 18;
      modelGroup.add(strawMesh);
    }

    // --- FOOD: SWEET (Croissant, Cookie, Cake Pop) ---
    else if (isSweet) {
      if (lowerName.includes("croissant")) {
        // Croissant shape: curved torus or stacked ellipsoids
        const pastryGroup = new THREE.Group();
        modelGroup.add(pastryGroup);

        const pastryMat = new THREE.MeshStandardMaterial({
          color: 0xd49b4e, // Croissant golden brown
          roughness: 0.55,
        });

        // Layered segments to emulate crescent/croissant foldings
        const segments = [
          { rX: 0.5, rY: 0.8, rZ: 0.5, x: 0, scale: 1 },
          { rX: 0.42, rY: 0.7, rZ: 0.42, x: 0.4, scale: 0.95 },
          { rX: 0.42, rY: 0.7, rZ: 0.42, x: -0.4, scale: 0.95 },
          { rX: 0.32, rY: 0.55, rZ: 0.32, x: 0.8, scale: 0.85 },
          { rX: 0.32, rY: 0.55, rZ: 0.32, x: -0.8, scale: 0.85 },
          { rX: 0.2, rY: 0.35, rZ: 0.2, x: 1.1, scale: 0.7 },
          { rX: 0.2, rY: 0.35, rZ: 0.2, x: -1.1, scale: 0.7 },
        ];

        segments.forEach((s) => {
          const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), pastryMat);
          mesh.scale.set(s.rX, s.rY, s.rZ);
          // Curve it slightly along Z
          const offsetZ = Math.max(0, 0.4 - Math.abs(s.x) * 0.3);
          mesh.position.set(s.x, s.x * s.x * -0.05, -offsetZ * 0.8);
          // Rotate slightly for crescent shape
          mesh.rotation.y = s.x * 0.2;
          pastryGroup.add(mesh);
        });

        // Add a glossy butter glaze shine (using directional light reflections)
        pastryGroup.position.set(0, 0.2, 0);
        pastryGroup.rotation.x = Math.PI / 10;
      } 
      else if (lowerName.includes("cookie")) {
        // Chocolate Chip Cookie: flat squashed cylinder
        const cookieGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.22, 24);
        const cookieMat = new THREE.MeshStandardMaterial({
          color: 0xc99453, // Baked golden cookie
          roughness: 0.7,
        });
        const cookieMesh = new THREE.Mesh(cookieGeo, cookieMat);
        cookieMesh.rotation.x = Math.PI / 8; // Tilt slightly
        cookieMesh.position.y = 0.2;
        modelGroup.add(cookieMesh);

        // Chocolate chips (scattered on top)
        const chipGeo = new THREE.BoxGeometry(0.12, 0.08, 0.12);
        const chipMat = new THREE.MeshStandardMaterial({
          color: 0x402008, // Dark chocolate brown
          roughness: 0.4,
        });

        const chipPositions = [
          { x: 0.4, y: 0.12, z: 0.3, rY: 0.4 },
          { x: -0.5, y: 0.12, z: 0.2, rY: 1.1 },
          { x: -0.2, y: 0.12, z: -0.4, rY: 0.2 },
          { x: 0.3, y: 0.12, z: -0.5, rY: 0.8 },
          { x: 0.1, y: 0.12, z: 0.0, rY: 0.5 },
          { x: 0.7, y: 0.12, z: -0.1, rY: 1.5 },
          { x: -0.6, y: 0.12, z: -0.3, rY: 0.9 },
        ];

        chipPositions.forEach((cp) => {
          const chipMesh = new THREE.Mesh(chipGeo, chipMat);
          // In cylindrical coords, top is y=0.11
          chipMesh.position.set(cp.x, cp.y, cp.z);
          chipMesh.rotation.y = cp.rY;
          cookieMesh.add(chipMesh);
        });
      } 
      else {
        // Default Sweet (Cake Pop / General Sweet)
        // Cake pop: Sphere on a stick
        const popMat = new THREE.MeshStandardMaterial({
          color: 0xdb7ca3, // Pink glaze cake pop
          roughness: 0.3,
        });
        const popGeo = new THREE.SphereGeometry(0.75, 24, 24);
        const popMesh = new THREE.Mesh(popGeo, popMat);
        popMesh.position.y = 0.7;
        modelGroup.add(popMesh);

        // Stick
        const stickGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8);
        const stickMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.5,
        });
        const stickMesh = new THREE.Mesh(stickGeo, stickMat);
        stickMesh.position.y = -0.5;
        popMesh.add(stickMesh);

        // Add sprinkles (small colored cylinders) on the pop
        const sprMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.2,
        });
        const sprGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.08, 6);
        const sprPositions = [
          { x: 0.4, y: 0.4, z: 0.4, rX: 0.5, rY: 0.2 },
          { x: -0.4, y: 0.3, z: 0.5, rX: -0.8, rY: 1.0 },
          { x: 0.1, y: 0.6, z: -0.4, rX: 0.3, rY: -0.5 },
          { x: -0.5, y: 0.5, z: -0.3, rX: 1.2, rY: 0.1 },
          { x: 0.5, y: 0.1, z: -0.3, rX: -0.2, rY: 0.8 },
        ];
        sprPositions.forEach((sp) => {
          const sprMesh = new THREE.Mesh(sprGeo, sprMat);
          sprMesh.position.set(sp.x, sp.y, sp.z);
          sprMesh.rotation.set(sp.rX, sp.rY, 0.4);
          popMesh.add(sprMesh);
        });

        popMesh.rotation.x = Math.PI / 10;
      }
    }

    // --- FOOD: SAVORY (Sandwich, Toast, Wrap) ---
    else {
      // 3D Sandwich Construction
      const foodGroup = new THREE.Group();
      modelGroup.add(foodGroup);

      const breadMat = new THREE.MeshStandardMaterial({
        color: 0xdeb887, // Golden bread crust
        roughness: 0.6,
      });

      // Bottom slice
      const bottomBread = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 1.6), breadMat);
      bottomBread.position.y = -0.4;
      foodGroup.add(bottomBread);

      // Cheese (bright yellow, slightly larger and rotated)
      const cheeseMat = new THREE.MeshStandardMaterial({
        color: 0xffd700, // Cheddar yellow
        roughness: 0.5,
      });
      const cheese = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.05, 1.7), cheeseMat);
      cheese.position.y = -0.28;
      cheese.rotation.y = Math.PI / 12; // Rotate cheese slice
      foodGroup.add(cheese);

      // Tomatoes (flat red boxes or cylinders)
      const tomatoMat = new THREE.MeshStandardMaterial({
        color: 0xcd5c5c, // Tomato red
        roughness: 0.3,
      });
      const tomato1 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16), tomatoMat);
      tomato1.position.set(-0.35, -0.18, 0.2);
      tomato1.rotation.x = Math.PI / 2;
      foodGroup.add(tomato1);

      const tomato2 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16), tomatoMat);
      tomato2.position.set(0.35, -0.18, -0.2);
      tomato2.rotation.x = Math.PI / 2;
      foodGroup.add(tomato2);

      // Lettuce (green flat wavy sheet)
      const lettuceMat = new THREE.MeshStandardMaterial({
        color: 0x556b2f, // Olive green
        roughness: 0.8,
      });
      const lettuce = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 1.6), lettuceMat);
      lettuce.position.y = -0.1;
      lettuce.rotation.y = -Math.PI / 16;
      foodGroup.add(lettuce);

      // Top slice
      const topBread = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 1.6), breadMat);
      topBread.position.y = 0.05;
      foodGroup.add(topBread);

      // Tilt sandwich slightly for presentation
      foodGroup.position.set(0, 0.2, 0);
      foodGroup.rotation.set(Math.PI / 6, -Math.PI / 8, 0);
    }

    // 6. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      // Slowly rotate the model
      modelGroup.rotation.y += 0.009;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 7. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);

      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      // Remove canvas element
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [category, name]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[260px] md:min-h-[300px] flex items-center justify-center relative overflow-hidden" 
    />
  );
}
