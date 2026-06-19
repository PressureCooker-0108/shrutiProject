"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface MenuItem3DProps {
  id: string;
  category: "Coffee" | "Tea & Matcha" | "Refresher" | "Frappuccino" | "Bakery & Food";
  name: string;
}

export default function MenuItem3D({ id, category, name }: MenuItem3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. WebGL Renderer Setup
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
    camera.position.set(0, 3.2, 7.2);
    camera.lookAt(0, 0.1, 0);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
    pointLight.position.set(-3, 3, -3);
    scene.add(pointLight);

    // 4. Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Common Materials
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,
      transmission: 0.9,
      roughness: 0.08,
      ior: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
    });

    const greenStrawMat = new THREE.MeshStandardMaterial({
      color: 0x00704b, // Starbucks green
      roughness: 0.15,
    });

    const whipCreamMat = new THREE.MeshStandardMaterial({
      color: 0xfffaf0, // Warm floral white
      roughness: 0.85,
    });

    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      transmission: 0.9,
      roughness: 0.05,
      ior: 1.33,
    });

    const plateMat = new THREE.MeshStandardMaterial({
      color: 0xfdfdfd,
      roughness: 0.25,
      metalness: 0.05,
    });

    const ceramicMugMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2eb, // Clean ceramic white
      roughness: 0.18,
      metalness: 0.05,
    });

    // Helper: Add Ceramic Plate for Food
    const addPlate = (radius = 1.6, height = 0.08) => {
      const plateGroup = new THREE.Group();
      plateGroup.position.y = -0.55;

      // Flat base
      const base = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 32), plateMat);
      plateGroup.add(base);

      // Rim
      const rim = new THREE.Mesh(new THREE.TorusGeometry(radius - 0.08, 0.06, 8, 32), plateMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = height / 2;
      plateGroup.add(rim);

      modelGroup.add(plateGroup);
    };

    // Helper: Add Cup & Base
    const addStandardCup = () => {
      // Outer glass
      const cupGeo = new THREE.CylinderGeometry(1.2, 0.9, 3.2, 32, 1, true);
      const cupMesh = new THREE.Mesh(cupGeo, glassMat);
      modelGroup.add(cupMesh);

      // Solid glass bottom
      const baseGeo = new THREE.CylinderGeometry(0.9, 0.85, 0.15, 32);
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = -1.6;
      modelGroup.add(baseMesh);

      // Add logo on the front of the cup
      const textureLoader = new THREE.TextureLoader();
      const logoTexture = textureLoader.load("/siren-logo.png");
      const logoGeo = new THREE.CircleGeometry(0.38, 32);
      const logoMat = new THREE.MeshStandardMaterial({
        map: logoTexture,
        transparent: true,
        side: THREE.DoubleSide,
        roughness: 0.35
      });
      const logoMesh = new THREE.Mesh(logoGeo, logoMat);
      logoMesh.position.set(0, -0.15, 1.08); // front of the tapered cup
      logoMesh.rotation.x = Math.PI / 18; // tilt slightly for tapered cup surface
      modelGroup.add(logoMesh);
    };

    // Helper: Add Mug (Ceramic or Glass)
    const addMug = (isGlass = false) => {
      const mugGroup = new THREE.Group();
      
      const mat = isGlass ? glassMat : ceramicMugMat;

      // Outer body
      const body = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 2.7, 32), mat);
      mugGroup.add(body);

      // Inside cavity (if ceramic, we color it white; if glass, transparent)
      if (!isGlass) {
        const cavity = new THREE.Mesh(
          new THREE.CylinderGeometry(1.15, 1.15, 2.5, 32),
          new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
        );
        cavity.position.y = 0.1;
        mugGroup.add(cavity);
      }

      // Handle (torus)
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.14, 12, 24), mat);
      handle.position.set(1.2, 0, 0);
      handle.rotation.z = Math.PI / 2;
      mugGroup.add(handle);

      // Add logo on the front of the mug
      const textureLoader = new THREE.TextureLoader();
      const logoTexture = textureLoader.load("/siren-logo.png");
      const logoGeo = new THREE.CircleGeometry(0.38, 32);
      const logoMat = new THREE.MeshStandardMaterial({
        map: logoTexture,
        transparent: true,
        side: THREE.DoubleSide,
        roughness: 0.35
      });
      const logoMesh = new THREE.Mesh(logoGeo, logoMat);
      logoMesh.position.set(0, 0, 1.27);
      mugGroup.add(logoMesh);

      modelGroup.add(mugGroup);
    };

    // Helper: Add Straw
    const addStraw = (x = 0.3, z = -0.2, angleZ = -Math.PI / 14) => {
      const strawGeo = new THREE.CylinderGeometry(0.045, 0.045, 4.4, 8);
      const strawMesh = new THREE.Mesh(strawGeo, greenStrawMat);
      strawMesh.position.set(x, 0.8, z);
      strawMesh.rotation.z = angleZ;
      strawMesh.rotation.x = Math.PI / 20;
      modelGroup.add(strawMesh);
    };

    // Helper: Add Whipped Cream Dome with Drizzle Grid
    const addWhipCream = (drizzleColor?: number) => {
      const whipGroup = new THREE.Group();
      whipGroup.position.y = 1.35;
      modelGroup.add(whipGroup);

      // Flat base
      whipGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.15, 32), whipCreamMat));

      // Fluffy overlapping spheres
      const spheres = [
        { r: 0.52, x: 0, y: 0.2, z: 0 },
        { r: 0.4, x: 0.35, y: 0.15, z: 0.35 },
        { r: 0.4, x: -0.35, y: 0.15, z: -0.35 },
        { r: 0.4, x: 0.35, y: 0.15, z: -0.35 },
        { r: 0.4, x: -0.35, y: 0.15, z: 0.35 },
        { r: 0.3, x: 0, y: 0.55, z: 0 },
      ];

      spheres.forEach((s) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(s.r, 16, 16), whipCreamMat);
        mesh.position.set(s.x, s.y, s.z);
        whipGroup.add(mesh);
      });

      if (drizzleColor !== undefined) {
        const drizzleMat = new THREE.MeshStandardMaterial({
          color: drizzleColor,
          roughness: 0.2,
        });

        // 4 parallel grid lines in X
        for (let i = -2; i <= 2; i++) {
          if (i === 0) continue;
          const line = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8), drizzleMat);
          line.position.set(i * 0.22, 0.38, 0);
          line.rotation.x = Math.PI / 2;
          line.rotation.z = Math.PI / 10;
          whipGroup.add(line);
        }

        // 4 parallel grid lines in Z
        for (let i = -2; i <= 2; i++) {
          if (i === 0) continue;
          const line = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8), drizzleMat);
          line.position.set(0, 0.38, i * 0.22);
          line.rotation.z = Math.PI / 2;
          line.rotation.x = Math.PI / 10;
          whipGroup.add(line);
        }
      }
    };

    // Helper: Add Ice Cubes
    const addIceCubes = (count = 5) => {
      const iceGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
      const icePositions = [
        { x: -0.28, y: 1.0, z: -0.2, rX: 0.2, rY: 0.5 },
        { x: 0.3, y: 0.75, z: 0.25, rX: -0.4, rY: 0.25 },
        { x: -0.2, y: 0.35, z: 0.35, rX: 0.5, rY: -0.3 },
        { x: 0.28, y: 0.05, z: -0.3, rX: -0.2, rY: 0.8 },
        { x: -0.35, y: -0.4, z: 0.15, rX: 0.35, rY: 0.15 },
        { x: 0.18, y: -0.85, z: 0.3, rX: -0.15, rY: 0.45 },
      ];
      for (let i = 0; i < Math.min(count, icePositions.length); i++) {
        const iceMesh = new THREE.Mesh(iceGeo, iceMat);
        const p = icePositions[i];
        iceMesh.position.set(p.x, p.y, p.z);
        iceMesh.rotation.set(p.rX, p.rY, 0.35);
        modelGroup.add(iceMesh);
      }
    };

    // 5. Build Individual Models based on Item ID
    switch (id) {
      // ─── BAKERY & FOOD (SWEETS) ───────────────────
      case "chocolate-chip-cookie": {
        addPlate(1.5);
        // Flattened organic sphere for cookie body (thick and rustic)
        const cookieMat = new THREE.MeshStandardMaterial({
          color: 0xc4935a, // Rich golden brown cookie dough
          roughness: 0.95,
        });
        const cookieGeo = new THREE.SphereGeometry(1.05, 20, 20);
        cookieGeo.scale(1, 0.18, 1);
        const cookie = new THREE.Mesh(cookieGeo, cookieMat);
        cookie.position.y = -0.35;
        cookie.rotation.x = Math.PI / 10;
        modelGroup.add(cookie);

        // Scattered chocolate chunks (large and uneven, matching menu-1 description)
        const chunkMat = new THREE.MeshStandardMaterial({
          color: 0x221004, // Deep dark chocolate
          roughness: 0.45,
        });

        const chunks = [
          { x: 0.35, y: 0.12, z: 0.25, w: 0.2, h: 0.1, d: 0.2, rx: 0.1, ry: 0.4 },
          { x: -0.35, y: 0.12, z: 0.2, w: 0.18, h: 0.08, d: 0.15, rx: -0.2, ry: 1.1 },
          { x: -0.15, y: 0.14, z: -0.35, w: 0.22, h: 0.09, d: 0.22, rx: 0.3, ry: 0.1 },
          { x: 0.25, y: 0.13, z: -0.4, w: 0.15, h: 0.1, d: 0.18, rx: 0.5, ry: -0.5 },
          { x: 0.05, y: 0.16, z: -0.05, w: 0.24, h: 0.11, d: 0.24, rx: 0.05, ry: 0.6 },
          { x: 0.55, y: 0.1, z: -0.15, w: 0.16, h: 0.08, d: 0.16, rx: 0.2, ry: 1.3 },
          { x: -0.55, y: 0.09, z: -0.1, w: 0.18, h: 0.07, d: 0.18, rx: -0.3, ry: -0.8 },
        ];

        chunks.forEach((c) => {
          const chunkMesh = new THREE.Mesh(new THREE.BoxGeometry(c.w, c.h, c.d), chunkMat);
          chunkMesh.position.set(c.x, c.y, c.z);
          chunkMesh.rotation.set(c.rx, c.ry, 0);
          cookie.add(chunkMesh);
        });
        break;
      }

      case "chocolate-croissant": {
        addPlate(1.5);
        // Pain au Chocolat: Rectangular rolled pastry with laminated folds
        const pastryGroup = new THREE.Group();
        pastryGroup.position.y = -0.38;
        pastryGroup.rotation.x = Math.PI / 12;
        modelGroup.add(pastryGroup);

        const goldMat = new THREE.MeshStandardMaterial({
          color: 0xd99c54, // Croissant gold crust
          roughness: 0.55,
        });

        // 3 layered puff pastry rolls to simulate laminated folds
        const fold1 = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.14, 0.9), goldMat);
        fold1.position.y = 0.07;
        pastryGroup.add(fold1);

        const fold2 = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.12, 0.8), goldMat);
        fold2.position.y = 0.19;
        pastryGroup.add(fold2);

        const fold3 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 0.65), goldMat);
        fold3.position.y = 0.29;
        pastryGroup.add(fold3);

        // Two chocolate bars peeking from BOTH ends
        const chocolateMat = new THREE.MeshStandardMaterial({
          color: 0x2b1307,
          roughness: 0.35,
        });

        // Left-right traversing chocolate rod 1
        const bar1 = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.09, 0.14), chocolateMat);
        bar1.position.set(0, 0.07, 0.22);
        pastryGroup.add(bar1);

        // Left-right traversing chocolate rod 2
        const bar2 = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.09, 0.14), chocolateMat);
        bar2.position.set(0, 0.07, -0.22);
        pastryGroup.add(bar2);

        break;
      }

      case "butter-croissant": {
        addPlate(1.6);
        // Crescent-shaped butter croissant made of overlapping curved segments
        const croissantGroup = new THREE.Group();
        croissantGroup.position.y = -0.42;
        croissantGroup.rotation.x = Math.PI / 10;
        modelGroup.add(croissantGroup);

        const croiMat = new THREE.MeshStandardMaterial({
          color: 0xeaa652, // Bright butter-croissant gold
          roughness: 0.45,
          metalness: 0.05,
        });

        const count = 9;
        for (let i = 0; i < count; i++) {
          const t = (i - (count - 1) / 2) / ((count - 1) / 2); // -1 to 1
          const angle = t * Math.PI * 0.42; // arc angle
          const radius = 0.95;
          const x = Math.sin(angle) * radius;
          const z = (Math.cos(angle) - 1) * radius * 0.55; 
          const scale = (1.0 - Math.abs(t) * 0.65) * 0.48; // thick center, pointed ends

          const segment = new THREE.Mesh(new THREE.SphereGeometry(scale, 16, 16), croiMat);
          segment.scale.set(1.45, 1.0, 1.0); // stretch along segment axis
          segment.position.set(x, 0.18, z);
          segment.rotation.y = angle + Math.PI / 2; // align with arc
          croissantGroup.add(segment);
        }
        break;
      }

      case "blueberry-muffin": {
        addPlate(1.4);
        
        // Muffin wrapper group
        const wrapperGroup = new THREE.Group();
        wrapperGroup.position.y = -0.42;
        modelGroup.add(wrapperGroup);

        // Ribbed fluted paper liner (simulated with cylinders and thin ridges)
        const wrapperMat = new THREE.MeshStandardMaterial({
          color: 0xfaf5ec,
          roughness: 0.95,
        });
        const wrapBody = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.55, 0.95, 24), wrapperMat);
        wrapBody.position.y = 0.475;
        wrapperGroup.add(wrapBody);

        // Fluted ridges (24 vertical lines on outer wrapper)
        const ridgeMat = new THREE.MeshStandardMaterial({
          color: 0xe8e2d5,
          roughness: 0.95,
        });
        const ridgeGeo = new THREE.CylinderGeometry(0.015, 0.01, 0.97, 4);
        for (let r = 0; r < 24; r++) {
          const angle = (r / 24) * Math.PI * 2;
          const rx1 = Math.sin(angle) * 0.71;
          const rz1 = Math.cos(angle) * 0.71;
          const rx2 = Math.sin(angle) * 0.54;
          const rz2 = Math.cos(angle) * 0.54;
          
          const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
          ridge.position.set((rx1 + rx2)/2, 0.475, (rz1 + rz2)/2);
          // tilt to match cylinder slant
          ridge.rotation.z = -Math.sin(angle) * 0.18;
          ridge.rotation.x = Math.cos(angle) * 0.18;
          wrapperGroup.add(ridge);
        }

        // Fluffy muffin top dome
        const domeMat = new THREE.MeshStandardMaterial({
          color: 0xca9352, // Muffin top gold
          roughness: 0.8,
        });
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.85, 20, 20), domeMat);
        dome.scale.set(1.2, 0.85, 1.2);
        dome.position.set(0, 0.48, 0); // rests on wrap
        modelGroup.add(dome);

        // Sunken dark blueberries
        const berryMat = new THREE.MeshStandardMaterial({
          color: 0x1f1f5f, // Purple-blue blueberries
          roughness: 0.35,
        });
        const berries = [
          { x: 0.3, y: 0.65, z: 0.4 },
          { x: -0.4, y: 0.55, z: 0.25 },
          { x: -0.15, y: 0.78, z: -0.3 },
          { x: 0.45, y: 0.45, z: -0.4 },
          { x: -0.5, y: 0.45, z: -0.3 },
          { x: 0.55, y: 0.55, z: 0.1 },
        ];
        berries.forEach((b) => {
          const berry = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), berryMat);
          berry.position.set(b.x, b.y, b.z);
          dome.add(berry);
        });

        // Streusel crumbles (sandy crumbs)
        const crumbleMat = new THREE.MeshStandardMaterial({
          color: 0xe2c195, // streusel tan
          roughness: 0.95,
        });
        const crumbGeo = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        for (let c = 0; c < 20; c++) {
          const crumb = new THREE.Mesh(crumbGeo, crumbleMat);
          // place randomly on dome surface
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI * 0.4;
          const rx = Math.sin(phi) * Math.cos(theta) * 0.83;
          const rz = Math.sin(phi) * Math.sin(theta) * 0.83;
          const ry = Math.cos(phi) * 0.56;
          crumb.position.set(rx, ry + 0.48, rz);
          crumb.rotation.set(Math.random(), Math.random(), Math.random());
          modelGroup.add(crumb);
        }
        break;
      }

      case "banana-loaf": {
        addPlate(1.5);
        
        // Rectangular loaf slice
        const loafGroup = new THREE.Group();
        loafGroup.position.y = -0.38;
        loafGroup.rotation.set(Math.PI / 10, -Math.PI / 12, 0);
        modelGroup.add(loafGroup);

        const breadMat = new THREE.MeshStandardMaterial({
          color: 0x8a5933, // Banana loaf brown
          roughness: 0.85,
        });
        const loafSlice = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.05, 0.42), breadMat);
        loafGroup.add(loafSlice);

        // Small banana specs (flecks on bread slice)
        const specMat = new THREE.MeshStandardMaterial({ color: 0x3d2716 });
        const specGeo = new THREE.BoxGeometry(0.04, 0.04, 0.02);
        for (let s = 0; s < 12; s++) {
          const spec = new THREE.Mesh(specGeo, specMat);
          spec.position.set((Math.random() - 0.5) * 1.1, (Math.random() - 0.5) * 0.8, 0.22);
          loafSlice.add(spec);
        }

        // Toasted Walnut Halves on top
        const walnutMat = new THREE.MeshStandardMaterial({
          color: 0xc1956e, // walnut golden tan
          roughness: 0.65,
        });
        
        const placeWalnut = (x: number, z: number) => {
          const walnut = new THREE.Group();
          walnut.position.set(x, 0.56, z);
          // walnut halves are two side-by-side flat spheres
          const w1 = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), walnutMat);
          w1.scale.set(1.3, 0.7, 0.8);
          w1.position.x = -0.06;
          walnut.add(w1);

          const w2 = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), walnutMat);
          w2.scale.set(1.3, 0.7, 0.8);
          w2.position.x = 0.06;
          walnut.add(w2);

          walnut.rotation.y = Math.random() * Math.PI;
          loafGroup.add(walnut);
        };

        placeWalnut(-0.4, 0.0);
        placeWalnut(0.05, 0.08);
        placeWalnut(0.42, -0.05);

        break;
      }

      case "ny-cheesecake": {
        addPlate(1.5);

        // Cheesecake slice wedge (Cream filling + Bottom crust + Back crust)
        const wedgeGroup = new THREE.Group();
        wedgeGroup.position.y = -0.38;
        wedgeGroup.rotation.set(-Math.PI / 2, 0, Math.PI / 6); // lie down slightly
        modelGroup.add(wedgeGroup);

        // Tall smooth pale cream filling (using 3-segment cylinder as triangular wedge)
        const cheeseMat = new THREE.MeshStandardMaterial({
          color: 0xfef5de, // Cream cheese pale yellow
          roughness: 0.4,
        });
        const filling = new THREE.Mesh(new THREE.CylinderGeometry(0, 1.25, 0.95, 3), cheeseMat);
        wedgeGroup.add(filling);

        // Graham cracker bottom crust
        const crustMat = new THREE.MeshStandardMaterial({
          color: 0xad7a47, // graham brown
          roughness: 0.8,
        });
        const bottomCrust = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.08, 1.22), crustMat);
        bottomCrust.position.y = -0.485;
        filling.add(bottomCrust);

        // Graham cracker back curved crust (at the back of the wedge)
        // Back of wedge in 3-segment cylinder faces z-positive. Let's add a thin box.
        const backCrust = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.98, 0.06), crustMat);
        backCrust.position.set(0, 0, 0.6);
        filling.add(backCrust);

        break;
      }

      // ─── BAKERY & FOOD (SAVORY) ───────────────────
      case "chilli-cheese-toast": {
        addPlate(1.5);

        const toastGroup = new THREE.Group();
        toastGroup.position.y = -0.35;
        toastGroup.rotation.set(Math.PI / 8, -Math.PI / 18, 0);
        modelGroup.add(toastGroup);

        // Diagonally cut french bread (outer crust + soft interior crumb)
        const crustMat = new THREE.MeshStandardMaterial({ color: 0x935e38, roughness: 0.8 });
        const toastBase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.22, 1.2), crustMat);
        toastGroup.add(toastBase);

        // Cream/Yellow melted cheese layer (with bubbly edge)
        const cheeseMat = new THREE.MeshStandardMaterial({
          color: 0xffeba5, // gooey melted cheese
          roughness: 0.45,
        });
        const cheese = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.06, 1.12), cheeseMat);
        cheese.position.y = 0.12;
        toastBase.add(cheese);

        // Caramelized browned cheese spots
        const spotMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.75 });
        const spotGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.01, 8);
        const spots = [
          { x: 0.35, z: 0.25 },
          { x: -0.28, z: -0.15 },
          { x: 0.05, z: 0.3 },
          { x: -0.1, z: -0.4 },
        ];
        spots.forEach((s) => {
          const spot = new THREE.Mesh(spotGeo, spotMat);
          spot.position.set(s.x, 0.035, s.z);
          spot.rotation.y = Math.random() * Math.PI;
          cheese.add(spot);
        });

        // Chopped Green Chillies & Red Peppers
        const greenChilliMat = new THREE.MeshStandardMaterial({ color: 0x2e6f31, roughness: 0.5 });
        const redPepperMat = new THREE.MeshStandardMaterial({ color: 0xc62828, roughness: 0.5 });
        const toppingGeo = new THREE.BoxGeometry(0.07, 0.07, 0.07);

        const toppings = [
          { x: 0.4, z: 0.1, isRed: false },
          { x: -0.4, z: 0.3, isRed: true },
          { x: 0.12, z: 0.0, isRed: false },
          { x: -0.12, z: -0.3, isRed: false },
          { x: 0.32, z: -0.32, isRed: true },
          { x: -0.3, z: -0.15, isRed: false },
          { x: 0.15, z: -0.45, isRed: true },
          { x: -0.22, z: 0.15, isRed: true },
        ];

        toppings.forEach((t) => {
          const topMesh = new THREE.Mesh(toppingGeo, t.isRed ? redPepperMat : greenChilliMat);
          topMesh.position.set(t.x, 0.04, t.z);
          topMesh.rotation.set(Math.random(), Math.random(), 0);
          cheese.add(topMesh);
        });
        break;
      }

      case "spinach-corn-sandwich": {
        addPlate(1.6);

        // Stacked triangular sandwich halves
        const sandwichGroup = new THREE.Group();
        sandwichGroup.position.y = -0.35;
        modelGroup.add(sandwichGroup);

        const breadMat = new THREE.MeshStandardMaterial({
          color: 0x825435, // dark high-fiber bread
          roughness: 0.8,
        });

        const fillingMat = new THREE.MeshStandardMaterial({
          color: 0x3d6e3d, // dark green spinach paste
          roughness: 0.9,
        });

        const cornMat = new THREE.MeshStandardMaterial({
          color: 0xffd54f, // bright yellow sweet corn
          roughness: 0.3,
        });

        // Function to create one triangular sandwich half
        const createHalf = () => {
          const half = new THREE.Group();

          // Bottom bread slice (triangular wedge)
          const bSlice = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.1, 3), breadMat);
          bSlice.rotation.set(-Math.PI / 2, 0, Math.PI / 6);
          bSlice.position.y = -0.12;
          half.add(bSlice);

          // Creamy Spinach layer
          const spin = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.14, 3), fillingMat);
          spin.rotation.set(-Math.PI / 2, 0, Math.PI / 6);
          half.add(spin);

          // Sweet corn kernels sticking out
          for (let k = 0; k < 6; k++) {
            const corn = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), cornMat);
            const angle = (k / 5) * Math.PI * 0.8 - Math.PI * 0.4;
            corn.position.set(Math.sin(angle) * 0.78, 0.0, Math.cos(angle) * 0.3 - 0.2);
            half.add(corn);
          }

          // Top bread slice (triangular wedge)
          const tSlice = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.1, 3), breadMat);
          tSlice.rotation.set(-Math.PI / 2, 0, Math.PI / 6);
          tSlice.position.y = 0.12;
          half.add(tSlice);

          // Add dark seeds on bread top
          const seedMat = new THREE.MeshStandardMaterial({ color: 0x221105 });
          const seedGeo = new THREE.BoxGeometry(0.02, 0.02, 0.04);
          for (let s = 0; s < 12; s++) {
            const seed = new THREE.Mesh(seedGeo, seedMat);
            seed.position.set((Math.random() - 0.5) * 0.8, 0.17, (Math.random() - 0.5) * 0.8);
            half.add(seed);
          }

          return half;
        };

        // Half 1 (Bottom)
        const half1 = createHalf();
        half1.position.set(-0.25, 0.1, 0.15);
        half1.rotation.y = -Math.PI / 10;
        sandwichGroup.add(half1);

        // Half 2 (Stacked slightly rotated on top)
        const half2 = createHalf();
        half2.position.set(0.25, 0.25, -0.15);
        half2.rotation.set(0.15, Math.PI / 8, 0.08);
        sandwichGroup.add(half2);

        break;
      }

      case "spinach-egg-wrap":
      case "pesto-chicken-wrap":
      case "falafel-wrap": {
        addPlate(1.6);

        // Tortilla wraps cut diagonally
        const wrapGroup = new THREE.Group();
        wrapGroup.position.y = -0.38;
        modelGroup.add(wrapGroup);

        const wrapMat = new THREE.MeshStandardMaterial({
          color: 0xf3d9b1, // Soft wrap wheat color
          roughness: 0.75,
        });

        // Function to create a diagonally sliced wrap half showing cross-section
        const createWrapHalf = (type: string) => {
          const half = new THREE.Group();

          // Main roll body (cylinder)
          const body = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.1, 16, 1, true), wrapMat);
          body.rotation.x = Math.PI / 2;
          half.add(body);

          // Add grill stripes (thin dark brown lines wrapping)
          const stripeMat = new THREE.MeshStandardMaterial({ color: 0x613f28, roughness: 0.8 });
          for (let s = -2; s <= 2; s++) {
            const stripe = new THREE.Mesh(new THREE.TorusGeometry(0.385, 0.012, 6, 24), stripeMat);
            stripe.position.y = s * 0.2;
            stripe.rotation.x = Math.PI / 2;
            body.add(stripe);
          }

          // Back wrap closure dome
          const closure = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), wrapMat);
          closure.position.y = -0.55;
          closure.rotation.x = Math.PI;
          body.add(closure);

          // Filling cross-section flat cap at the front (open diagonal cut)
          let fillMat = new THREE.MeshStandardMaterial({ color: 0xeee7db });
          if (type === "spinach-egg-wrap") fillMat = new THREE.MeshStandardMaterial({ color: 0xf5eccd }); // pale yellow egg
          else if (type === "pesto-chicken-wrap") fillMat = new THREE.MeshStandardMaterial({ color: 0xdde6d8 }); // light green pesto chicken
          else if (type === "falafel-wrap") fillMat = new THREE.MeshStandardMaterial({ color: 0xdecbb7 }); // tahini beige

          const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.05, 16), fillMat);
          cap.position.y = 0.55;
          body.add(cap);

          // Scattered filling chunks peeking from cap
          const detailGroup = new THREE.Group();
          detailGroup.position.y = 0.57;
          body.add(detailGroup);

          if (type === "spinach-egg-wrap") {
            // Dark green spinach bits + red tomatoes + white feta
            const spinC = new THREE.MeshStandardMaterial({ color: 0x224825 });
            const tomC = new THREE.MeshStandardMaterial({ color: 0xb71c1c });
            const fetaC = new THREE.MeshStandardMaterial({ color: 0xffffff });

            for (let c = 0; c < 5; c++) {
              const b = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.12), spinC);
              b.position.set((Math.random() - 0.5) * 0.4, 0, (Math.random() - 0.5) * 0.4);
              detailGroup.add(b);
            }
            for (let c = 0; c < 3; c++) {
              const b = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), tomC);
              b.position.set((Math.random() - 0.5) * 0.4, 0, (Math.random() - 0.5) * 0.4);
              detailGroup.add(b);
            }
            for (let c = 0; c < 3; c++) {
              const b = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.09), fetaC);
              b.position.set((Math.random() - 0.5) * 0.4, 0, (Math.random() - 0.5) * 0.4);
              detailGroup.add(b);
            }
          } else if (type === "pesto-chicken-wrap") {
            // Green pesto chicken cubes + mozzarella strings
            const chkC = new THREE.MeshStandardMaterial({ color: 0x7a9a60 });
            const mozC = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });

            for (let c = 0; c < 6; c++) {
              const b = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.14), chkC);
              b.position.set((Math.random() - 0.5) * 0.4, 0, (Math.random() - 0.5) * 0.4);
              detailGroup.add(b);
            }
            for (let c = 0; c < 4; c++) {
              const b = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.18), mozC);
              b.rotation.z = Math.PI / 2;
              b.position.set((Math.random() - 0.5) * 0.4, 0, (Math.random() - 0.5) * 0.4);
              detailGroup.add(b);
            }
          } else {
            // Paneer Falafel Wrap: Brown falafel spheres + white paneer cubes + green lettuce + tahini sauce
            const falC = new THREE.MeshStandardMaterial({ color: 0x6e4e37, roughness: 0.9 });
            const panC = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const letC = new THREE.MeshStandardMaterial({ color: 0x66bb6a });

            // 2 brown falafels sticking out
            const fal1 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), falC);
            fal1.position.set(-0.12, 0, 0.1);
            detailGroup.add(fal1);

            const fal2 = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), falC);
            fal2.position.set(0.12, 0, -0.1);
            detailGroup.add(fal2);

            // paneer blocks
            const pan = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.14), panC);
            pan.position.set(0.05, 0.05, 0.12);
            detailGroup.add(pan);

            // lettuce green ribbons
            for (let c = 0; c < 4; c++) {
              const b = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.02, 0.08), letC);
              b.position.set((Math.random() - 0.5) * 0.4, 0.02, (Math.random() - 0.5) * 0.4);
              b.rotation.y = Math.random() * Math.PI;
              detailGroup.add(b);
            }
          }

          return half;
        };

        const half1 = createWrapHalf(id);
        half1.position.set(-0.35, 0.2, 0.2);
        half1.rotation.set(0.2, -Math.PI / 6, 0.3);
        wrapGroup.add(half1);

        const half2 = createWrapHalf(id);
        half2.position.set(0.35, 0.25, -0.2);
        half2.rotation.set(0.4, Math.PI / 4, -0.25);
        wrapGroup.add(half2);

        break;
      }

      // ─── FRAPPUCCINOS ─────────────────────────────
      case "caramel-frappuccino": {
        addStandardCup();
        
        // Tan blended coffee liquid base
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0xdeb887, // Light tan caramel coffee color
          transparent: true,
          opacity: 0.94,
          transmission: 0.08,
          roughness: 0.35,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // Fluffy whipped cream + golden caramel drizzle grid
        addWhipCream(0xd18c34);
        addStraw();
        break;
      }

      case "mocha-frappuccino": {
        addStandardCup();

        // Dark cocoa-brown liquid base
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0x5a3d28, // Darker chocolate mocha brown
          transparent: true,
          opacity: 0.95,
          transmission: 0.06,
          roughness: 0.3,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // Whipped cream + chocolate fudge drizzle grid
        addWhipCream(0x281206);
        addStraw();
        break;
      }

      case "strawberry-frappuccino": {
        addStandardCup();

        // Strawberry Crème: marbled pink and white blend
        const liqGroup = new THREE.Group();
        modelGroup.add(liqGroup);

        // Base pink liquid cylinder
        const baseLiq = new THREE.Mesh(
          new THREE.CylinderGeometry(1.14, 0.87, 2.88, 32),
          new THREE.MeshPhysicalMaterial({
            color: 0xfbbecf, // Milk strawberry pink
            transparent: true,
            opacity: 0.94,
            transmission: 0.08,
            roughness: 0.3,
          })
        );
        baseLiq.position.y = -0.1;
        liqGroup.add(baseLiq);

        // Spiral swirly vertical blobs representing strawberry puree stripes (red-pink)
        const pureeMat = new THREE.MeshStandardMaterial({
          color: 0xc2185b, // rich dark red strawberry puree
          roughness: 0.4,
        });
        const swirlGeo = new THREE.CylinderGeometry(0.12, 0.08, 2.6, 8);
        
        for (let s = 0; s < 4; s++) {
          const angle = (s / 4) * Math.PI * 2;
          const swirl = new THREE.Mesh(swirlGeo, pureeMat);
          // place near outer edge
          swirl.position.set(Math.sin(angle) * 0.8, -0.1, Math.cos(angle) * 0.8);
          // twist tilt
          swirl.rotation.set(0.15, angle, 0.15);
          liqGroup.add(swirl);
        }

        // swirly white cream stripes
        const whipStripeMat = new THREE.MeshStandardMaterial({
          color: 0xfffaf0,
          roughness: 0.6,
        });
        for (let s = 0; s < 3; s++) {
          const angle = (s / 3) * Math.PI * 2 + Math.PI / 3;
          const swirl = new THREE.Mesh(swirlGeo, whipStripeMat);
          swirl.position.set(Math.sin(angle) * 0.75, -0.1, Math.cos(angle) * 0.75);
          swirl.rotation.set(-0.15, angle, -0.15);
          liqGroup.add(swirl);
        }

        addWhipCream();
        addStraw();
        break;
      }

      case "double-chocolate-frappuccino": {
        addStandardCup();

        // Rich double-chocolate dark base
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0x472f22, // Dark chocolate fudge brown
          transparent: true,
          opacity: 0.95,
          transmission: 0.05,
          roughness: 0.32,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // Blended dark chocolate chip flecks inside cup
        const fleckMat = new THREE.MeshStandardMaterial({ color: 0x110704 });
        const fleckGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
        for (let c = 0; c < 22; c++) {
          const fleck = new THREE.Mesh(fleckGeo, fleckMat);
          // scatter randomly inside liquid boundaries
          const radius = Math.random() * 0.8;
          const angle = Math.random() * Math.PI * 2;
          const h = (Math.random() - 0.5) * 2.4;
          fleck.position.set(Math.sin(angle) * radius, h, Math.cos(angle) * radius);
          fleck.rotation.set(Math.random(), Math.random(), 0);
          modelGroup.add(fleck);
        }

        // Whipped cream + chocolate fudge drizzle
        addWhipCream(0x190a04);
        addStraw();
        break;
      }

      // ─── DRINKS (COFFEE, MATCHA, REFRESHER) ───────
      case "iced-americano": {
        addStandardCup();

        // Iced Caffe Americano: Layered gradient pour (dark black-brown to lighter amber top)
        // Bottom deep dark coffee
        const bLiq = new THREE.Mesh(
          new THREE.CylinderGeometry(1.04, 0.88, 1.4, 32),
          new THREE.MeshPhysicalMaterial({
            color: 0x1c0b05, // Black espresso
            transparent: true,
            opacity: 0.96,
            transmission: 0.2,
            roughness: 0.15,
          })
        );
        bLiq.position.y = -0.8;
        modelGroup.add(bLiq);

        // Top lighter amber coffee
        const tLiq = new THREE.Mesh(
          new THREE.CylinderGeometry(1.15, 1.04, 1.5, 32),
          new THREE.MeshPhysicalMaterial({
            color: 0x4e2912, // Dark amber brown
            transparent: true,
            opacity: 0.85,
            transmission: 0.65,
            roughness: 0.1,
          })
        );
        tLiq.position.y = 0.65;
        modelGroup.add(tLiq);

        addIceCubes(6); // Large clear ice cubes rising above liquid
        addStraw();
        break;
      }

      case "hot-chocolate": {
        addMug(false); // Beautiful solid white ceramic mug with handle!

        // Cocoa liquid fill
        const liqGeo = new THREE.CylinderGeometry(1.14, 1.14, 2.3, 32);
        const liqMat = new THREE.MeshStandardMaterial({
          color: 0x43241c, // Rich hot cocoa chocolate brown
          roughness: 0.25,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = 0.1;
        modelGroup.add(liqMesh);

        // Fluffy whipped cream swirl (resting inside the mug rim)
        const whipGroup = new THREE.Group();
        whipGroup.position.y = 1.1;
        modelGroup.add(whipGroup);

        const spheres = [
          { r: 0.45, x: 0, y: 0.1, z: 0 },
          { r: 0.35, x: 0.25, y: 0.05, z: 0.2 },
          { r: 0.35, x: -0.25, y: 0.05, z: -0.2 },
          { r: 0.35, x: 0.2, y: 0.05, z: -0.25 },
          { r: 0.35, x: -0.2, y: 0.05, z: 0.25 },
          { r: 0.25, x: 0, y: 0.35, z: 0 },
        ];
        spheres.forEach((s) => {
          const mesh = new THREE.Mesh(new THREE.SphereGeometry(s.r, 16, 16), whipCreamMat);
          mesh.position.set(s.x, s.y, s.z);
          whipGroup.add(mesh);
        });

        // Zig-zag mocha fudge drizzle on cream
        const drizzleMat = new THREE.MeshStandardMaterial({ color: 0x210a04, roughness: 0.2 });
        const zigGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8);
        for (let z = -2; z <= 2; z++) {
          const line = new THREE.Mesh(zigGeo, drizzleMat);
          line.position.set(z * 0.18, 0.2, (z % 2 === 0 ? 0.1 : -0.1));
          line.rotation.set(Math.PI / 2, 0, Math.PI / 4);
          whipGroup.add(line);
        }

        break;
      }

      case "iced-matcha-latte": {
        addStandardCup();

        // Vibrant matcha pastel green milk base
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0x8ab98e, // Milky matcha tea green
          transparent: true,
          opacity: 0.98,
          transmission: 0.04,
          roughness: 0.25,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // Rich matcha tea green swirls inside milky base
        const darkMatchaMat = new THREE.MeshStandardMaterial({ color: 0x3d7042, roughness: 0.6 });
        const swirl1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.12, 1.8), darkMatchaMat);
        swirl1.position.set(0.35, 0.3, -0.22);
        swirl1.rotation.set(0.2, 0.1, -0.15);
        modelGroup.add(swirl1);

        const swirl2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.1, 1.8), darkMatchaMat);
        swirl2.position.set(-0.35, 0.1, 0.3);
        swirl2.rotation.set(-0.1, -0.2, 0.1);
        modelGroup.add(swirl2);

        addIceCubes(5);
        addStraw();
        break;
      }

      case "hot-caramel-macchiato": {
        addMug(true); // Glass mug to display the beautiful coffee-milk layers!

        // Bottom Layer: Steamed Sweet Vanilla Milk (dense white)
        const milk = new THREE.Mesh(
          new THREE.CylinderGeometry(1.15, 1.15, 1.1, 32),
          new THREE.MeshPhysicalMaterial({
            color: 0xfffaf0,
            transparent: true,
            opacity: 0.98,
            transmission: 0.05,
            roughness: 0.25,
          })
        );
        milk.position.y = -0.65;
        modelGroup.add(milk);

        // Middle Layer: Marked Dark Espresso (deep brown layer)
        const espresso = new THREE.Mesh(
          new THREE.CylinderGeometry(1.15, 1.15, 0.9, 32),
          new THREE.MeshPhysicalMaterial({
            color: 0x4a270f, // Espresso
            transparent: true,
            opacity: 0.92,
            transmission: 0.25,
            roughness: 0.15,
          })
        );
        espresso.position.y = 0.3;
        modelGroup.add(espresso);

        // Top Layer: Thick Velvet Microfoam (creamy white foam)
        const foam = new THREE.Mesh(
          new THREE.CylinderGeometry(1.16, 1.15, 0.4, 32),
          new THREE.MeshStandardMaterial({
            color: 0xfffefc,
            roughness: 0.9,
          })
        );
        foam.position.y = 0.95;
        modelGroup.add(foam);

        // Golden Caramel Drizzle Grid on foam
        const caramelMat = new THREE.MeshStandardMaterial({ color: 0xad702e, roughness: 0.2 });
        // Draw crosshatch on flat foam top
        for (let i = -2; i <= 2; i++) {
          if (i === 0) continue;
          const line1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.1, 8), caramelMat);
          line1.position.set(i * 0.22, 1.16, 0);
          line1.rotation.x = Math.PI / 2;
          modelGroup.add(line1);

          const line2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.1, 8), caramelMat);
          line2.position.set(0, 1.16, i * 0.22);
          line2.rotation.z = Math.PI / 2;
          modelGroup.add(line2);
        }
        break;
      }

      case "pink-drink": {
        addStandardCup();

        // Creamy pastel-pink coconut milk liquid
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0xfcb2cd, // Strawberry acai + coconut milk pastel pink
          transparent: true,
          opacity: 0.98,
          transmission: 0.06,
          roughness: 0.22,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // Floating freeze-dried strawberry slices (dark red thin disks)
        const strawbMat = new THREE.MeshStandardMaterial({
          color: 0xd81b60, // Rich dark strawberry red
          roughness: 0.5,
        });
        const strawbGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 8);
        strawbGeo.scale(1.2, 1, 0.8); // slight oval slice

        const slices = [
          { x: -0.4, y: 1.1, z: 0.2, rx: 0.5, ry: 0.2 },
          { x: 0.35, y: 0.95, z: -0.3, rx: -0.4, ry: 0.75 },
          { x: 0.05, y: 1.25, z: 0.35, rx: 0.7, ry: -0.1 },
          { x: -0.22, y: 0.75, z: -0.4, rx: 0.25, ry: 0.4 },
        ];

        slices.forEach((s) => {
          const slice = new THREE.Mesh(strawbGeo, strawbMat);
          slice.position.set(s.x, s.y, s.z);
          slice.rotation.set(s.rx, s.ry, 0.3);
          modelGroup.add(slice);
        });

        addIceCubes(4);
        addStraw();
        break;
      }

      case "strawberry-acai-refresher": {
        addStandardCup();
        // Vibrant red-pink refresher juice
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0xe62e5a, // Reddish pink strawberry acai color
          transparent: true,
          opacity: 0.85,
          transmission: 0.75,
          roughness: 0.1,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // Freeze-dried strawberry slices
        const strawbMat = new THREE.MeshStandardMaterial({
          color: 0xd81b60,
          roughness: 0.5,
        });
        const strawbGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 8);
        strawbGeo.scale(1.2, 1, 0.8);

        const slices = [
          { x: -0.45, y: 1.1, z: 0.2, rx: 0.5, ry: 0.2 },
          { x: 0.35, y: 0.95, z: -0.35, rx: -0.4, ry: 0.75 },
          { x: 0.05, y: 1.25, z: 0.35, rx: 0.7, ry: -0.1 },
          { x: -0.22, y: 0.75, z: -0.4, rx: 0.25, ry: 0.4 },
        ];

        slices.forEach((s) => {
          const slice = new THREE.Mesh(strawbGeo, strawbMat);
          slice.position.set(s.x, s.y, s.z);
          slice.rotation.set(s.rx, s.ry, 0.3);
          modelGroup.add(slice);
        });

        addIceCubes(5);
        addStraw();
        break;
      }

      case "blue-coconut-energy": {
        addStandardCup();
        // Electric neon blue refresher juice
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0x00b0ff, // Bright sky blue
          transparent: true,
          opacity: 0.82,
          transmission: 0.8,
          roughness: 0.1,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // Floating lime slice
        const limeGroup = new THREE.Group();
        limeGroup.position.set(0.1, 1.1, 0.2);
        limeGroup.rotation.set(0.4, 0.2, 0.3);
        
        // Outer dark green rind
        const rind = new THREE.Mesh(
          new THREE.CylinderGeometry(0.28, 0.28, 0.04, 16),
          new THREE.MeshStandardMaterial({ color: 0x1b5e20, roughness: 0.8 })
        );
        limeGroup.add(rind);

        // Inner lime pulp
        const pulp = new THREE.Mesh(
          new THREE.CylinderGeometry(0.25, 0.25, 0.05, 16),
          new THREE.MeshStandardMaterial({ color: 0x76ff03, roughness: 0.5 })
        );
        pulp.position.y = 0.005;
        limeGroup.add(pulp);

        modelGroup.add(limeGroup);

        addIceCubes(5);
        addStraw();
        break;
      }

      case "iced-peach-green-tea": {
        addStandardCup();
        // Peach-orange green tea juice
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0xffb74d, // Peach amber orange
          transparent: true,
          opacity: 0.85,
          transmission: 0.72,
          roughness: 0.12,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // Floating lemon slice
        const lemonGroup = new THREE.Group();
        lemonGroup.position.set(-0.25, 1.05, -0.1);
        lemonGroup.rotation.set(-0.35, 0.4, 0.2);

        // Rind
        const rind = new THREE.Mesh(
          new THREE.CylinderGeometry(0.28, 0.28, 0.04, 16),
          new THREE.MeshStandardMaterial({ color: 0xfbc02d, roughness: 0.7 })
        );
        lemonGroup.add(rind);

        // Pulp
        const pulp = new THREE.Mesh(
          new THREE.CylinderGeometry(0.25, 0.25, 0.05, 16),
          new THREE.MeshStandardMaterial({ color: 0xffeb3b, roughness: 0.4 })
        );
        pulp.position.y = 0.005;
        lemonGroup.add(pulp);

        modelGroup.add(lemonGroup);

        addIceCubes(5);
        addStraw();
        break;
      }

      case "iced-chai-latte": {
        addStandardCup();
        // Spiced milk tea color
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0xd2b48c, // Tan/beige milk tea
          transparent: true,
          opacity: 0.95,
          transmission: 0.08,
          roughness: 0.3,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // White milk swirls inside
        const swirlMat = new THREE.MeshStandardMaterial({ color: 0xfffaf0, roughness: 0.5 });
        const swirlGeo = new THREE.CylinderGeometry(0.18, 0.12, 2.4, 8);
        for (let s = 0; s < 3; s++) {
          const angle = (s / 3) * Math.PI * 2;
          const swirl = new THREE.Mesh(swirlGeo, swirlMat);
          swirl.position.set(Math.sin(angle) * 0.7, -0.2, Math.cos(angle) * 0.7);
          swirl.rotation.set(0.2, angle, -0.1);
          modelGroup.add(swirl);
        }

        // Cinnamon dusting specs on top
        const cinnamonMat = new THREE.MeshStandardMaterial({ color: 0x8d5b4c });
        for (let d = 0; d < 15; d++) {
          const dust = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.04), cinnamonMat);
          dust.position.set((Math.random() - 0.5) * 1.5, 1.36, (Math.random() - 0.5) * 1.5);
          modelGroup.add(dust);
        }

        addIceCubes(5);
        addStraw();
        break;
      }

      case "chai-latte": {
        addMug(false); // Hot drink in white ceramic mug
        
        // Spiced milk tea liquid
        const liqGeo = new THREE.CylinderGeometry(1.14, 1.14, 2.3, 32);
        const liqMat = new THREE.MeshStandardMaterial({
          color: 0xc69e7b, // Warm spiced chai beige
          roughness: 0.35,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = 0.1;
        modelGroup.add(liqMesh);

        // White milk foam layer at top
        const foam = new THREE.Mesh(
          new THREE.CylinderGeometry(1.15, 1.14, 0.25, 32),
          new THREE.MeshStandardMaterial({ color: 0xfffaf0, roughness: 0.9 })
        );
        foam.position.y = 1.18;
        modelGroup.add(foam);

        // Dusting of cinnamon powder on foam
        const cinMat = new THREE.MeshStandardMaterial({ color: 0x8a5542 });
        for (let i = 0; i < 20; i++) {
          const spec = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.04), cinMat);
          spec.position.set((Math.random() - 0.5) * 1.3, 1.32, (Math.random() - 0.5) * 1.3);
          spec.rotation.set(Math.random(), Math.random(), 0);
          modelGroup.add(spec);
        }
        break;
      }

      case "honey-citrus-mint-tea": {
        addMug(true); // Glass mug to see the beautiful translucent tea

        // Translucent yellow-green tea liquid
        const liqGeo = new THREE.CylinderGeometry(1.14, 1.14, 2.3, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0xdce775, // Light yellow-green citrus tea
          transparent: true,
          opacity: 0.8,
          transmission: 0.85,
          roughness: 0.1,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = 0.1;
        modelGroup.add(liqMesh);

        // Floating lemon slice
        const lemonGroup = new THREE.Group();
        lemonGroup.position.set(0.1, 0.9, 0.2);
        lemonGroup.rotation.set(0.2, 0.1, -0.4);

        const rind = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.3, 0.04, 16),
          new THREE.MeshStandardMaterial({ color: 0xffeb3b, roughness: 0.7 })
        );
        lemonGroup.add(rind);

        const pulp = new THREE.Mesh(
          new THREE.CylinderGeometry(0.27, 0.27, 0.05, 16),
          new THREE.MeshStandardMaterial({ color: 0xfff59d, roughness: 0.4 })
        );
        pulp.position.y = 0.005;
        lemonGroup.add(pulp);

        modelGroup.add(lemonGroup);

        // Mint leaf (green curved box)
        const mintLeaf = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.02, 0.16),
          new THREE.MeshStandardMaterial({ color: 0x4caf50, roughness: 0.6 })
        );
        mintLeaf.position.set(-0.35, 0.95, -0.2);
        mintLeaf.rotation.set(-0.25, 0.8, 0.1);
        modelGroup.add(mintLeaf);
        
        break;
      }

      case "cappuccino": {
        addMug(false); // Hot espresso in white ceramic mug

        // Espresso layer fill
        const liqGeo = new THREE.CylinderGeometry(1.14, 1.14, 1.8, 32);
        const liqMat = new THREE.MeshStandardMaterial({
          color: 0x3d1e0d, // Dark coffee
          roughness: 0.25,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.15;
        modelGroup.add(liqMesh);

        // Fluffy thick milk foam dome overflowing the rim
        const foamGroup = new THREE.Group();
        foamGroup.position.y = 0.75;
        modelGroup.add(foamGroup);

        const spheres = [
          { r: 0.55, x: 0, y: 0.25, z: 0 },
          { r: 0.45, x: 0.3, y: 0.18, z: 0.3 },
          { r: 0.45, x: -0.3, y: 0.18, z: -0.3 },
          { r: 0.45, x: 0.3, y: 0.18, z: -0.3 },
          { r: 0.45, x: -0.3, y: 0.18, z: 0.3 },
          { r: 0.32, x: 0, y: 0.62, z: 0 },
        ];
        spheres.forEach((s) => {
          const mesh = new THREE.Mesh(new THREE.SphereGeometry(s.r, 16, 16), whipCreamMat);
          mesh.position.set(s.x, s.y, s.z);
          foamGroup.add(mesh);
        });

        // Dusting of cocoa powder on foam top
        const cocoaMat = new THREE.MeshStandardMaterial({ color: 0x3d1b04 });
        for (let i = 0; i < 22; i++) {
          const spec = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.04), cocoaMat);
          spec.position.set((Math.random() - 0.5) * 1.3, 0.8 + (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 1.3);
          spec.rotation.set(Math.random(), Math.random(), 0);
          foamGroup.add(spec);
        }

        break;
      }

      case "vanilla-sweet-cream-cold-brew": {
        addStandardCup();

        // Dark cold brew coffee liquid base (deep black-brown)
        const liqGeo = new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32);
        const liqMat = new THREE.MeshPhysicalMaterial({
          color: 0x160904, // Dark black coffee
          transparent: true,
          opacity: 0.98,
          transmission: 0.08,
          roughness: 0.15,
        });
        const liqMesh = new THREE.Mesh(liqGeo, liqMat);
        liqMesh.position.y = -0.1;
        modelGroup.add(liqMesh);

        // Vanilla sweet cream cascading down inside the cup
        const creamMat = new THREE.MeshStandardMaterial({
          color: 0xfffaf0, // white cream
          roughness: 0.5,
        });

        // Add vertical cascading white tubes
        const creamGeo = new THREE.CylinderGeometry(0.15, 0.04, 2.2, 8);
        const creamPositions = [
          { x: 0.35, z: 0.35, tiltZ: 0.05, tiltX: -0.08 },
          { x: -0.35, z: -0.35, tiltZ: -0.05, tiltX: 0.08 },
          { x: 0.45, z: -0.2, tiltZ: 0.08, tiltX: 0.05 },
          { x: -0.45, z: 0.2, tiltZ: -0.08, tiltX: -0.05 },
        ];
        
        creamPositions.forEach((pos) => {
          const creamMesh = new THREE.Mesh(creamGeo, creamMat);
          creamMesh.position.set(pos.x, 0.1, pos.z);
          creamMesh.rotation.set(pos.tiltX, 0, pos.tiltZ);
          modelGroup.add(creamMesh);
        });

        // Top float of vanilla sweet cream
        const floatMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(1.16, 1.15, 0.18, 32),
          creamMat
        );
        floatMesh.position.y = 1.36;
        modelGroup.add(floatMesh);

        addIceCubes(5);
        addStraw();
        break;
      }

      default: {
        // Fallback placeholder coffee cup
        addStandardCup();
        const baseLiq = new THREE.Mesh(
          new THREE.CylinderGeometry(1.15, 0.88, 2.9, 32),
          new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.5 })
        );
        baseLiq.position.y = -0.1;
        modelGroup.add(baseLiq);
        addStraw();
        break;
      }
    }

    // 6. Animation Loop (Slow steady rotation)
    let animationFrameId: number;
    const animate = () => {
      modelGroup.rotation.y += 0.0085;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 7. Memory Cleanup on Unmount (WebGL resources disposal)
    return () => {
      cancelAnimationFrame(animationFrameId);

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

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [id, category, name]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[260px] md:min-h-[300px] flex items-center justify-center relative overflow-hidden" 
    />
  );
}
