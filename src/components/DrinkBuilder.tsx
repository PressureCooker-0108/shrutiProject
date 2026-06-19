"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, Check, ChevronDown, Award, Sliders } from "lucide-react";
import * as THREE from "three";

export interface CustomizationState {
  base: string;
  milk: string;
  sweetener: string;
  topping: string;
  ice: string;
  size: string;
}

interface DrinkBuilderProps {
  customization: CustomizationState;
  onChangeCustomization: (updater: (prev: CustomizationState) => CustomizationState) => void;
}

interface OptionConfig {
  id: string;
  name: string;
  sub: string;
  iconText?: string;
  icon?: React.ReactNode;
}

interface PresetCombo {
  name: string;
  description: string;
  emoji: string;
  config: CustomizationState;
}

const POPULAR_COMBOS: PresetCombo[] = [
  {
    name: "Matcha Lavender Haze",
    description: "Matcha Latte with Oat Milk & Lavender Cold Foam",
    emoji: "🍵",
    config: {
      base: "Matcha Green",
      milk: "Oat Milk",
      sweetener: "Classic Syrup",
      topping: "Cinnamon",
      ice: "Regular",
      size: "Grande"
    }
  },
  {
    name: "Brown Sugar Cookie Espresso",
    description: "Cold Brew with Oat Milk, Classic Syrup & Cinnamon dusting",
    emoji: "🍪",
    config: {
      base: "Cold Brew",
      milk: "Oat Milk",
      sweetener: "Classic Syrup",
      topping: "Cinnamon",
      ice: "Regular",
      size: "Grande"
    }
  },
  {
    name: "Salted Caramel Cloud",
    description: "Caramel Gold with Whole Milk, Caramel Syrup & Cold Foam",
    emoji: "☁️",
    config: {
      base: "Caramel Gold",
      milk: "Whole Milk",
      sweetener: "Caramel Syrup",
      topping: "Cold Foam",
      ice: "Light",
      size: "Grande"
    }
  },
  {
    name: "Tropical Pink Sparkler",
    description: "Dragonfruit Refresher with Coconut Milk & Cold Foam",
    emoji: "🌺",
    config: {
      base: "Dragonfruit Refresher",
      milk: "Coconut Milk",
      sweetener: "None",
      topping: "Cold Foam",
      ice: "Regular",
      size: "Grande"
    }
  }
];

export default function DrinkBuilder({ customization, onChangeCustomization }: DrinkBuilderProps) {
  const [ordered, setOrdered] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("size");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Customization state ref for dynamic access in the render loop without rebuilding context
  const customizationRef = useRef(customization);
  useEffect(() => {
    customizationRef.current = customization;
  }, [customization]);

  // Target rotations for cup and stirrer
  const targetCupRotRef = useRef(0);
  const targetStirrerRotRef = useRef(0);

  // Trigger spin on customization updates (spin > 90 deg)
  useEffect(() => {
    // Increment targets differently to ensure they rotate by different degrees
    targetCupRotRef.current += Math.PI * 1.25 + Math.random() * Math.PI * 0.5; // 225° to 315°
    targetStirrerRotRef.current += Math.PI * 0.8 + Math.random() * Math.PI * 0.4; // 144° to 216°
  }, [customization]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = 240;
    const height = 360;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 9);
    camera.lookAt(0, 0.4, 0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfaf8f5, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.4, 20);
    pointLight.position.set(-5, 4, -4);
    scene.add(pointLight);

    // Groups for rotation
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);

    const stirrerPivot = new THREE.Group();
    scene.add(stirrerPivot);

    // 1. Cup Glass Cylinder
    const glassGeo = new THREE.CylinderGeometry(1.5, 1.1, 4.4, 32, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      transmission: 0.9,
      roughness: 0.15,
      metalness: 0.1,
      ior: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    cupGroup.add(glassMesh);

    // Cup Solid Base
    const baseGeo = new THREE.CylinderGeometry(1.1, 1.05, 0.18, 32);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -2.2;
    cupGroup.add(baseMesh);

    // 2. Liquid Cylinder
    const liquidGeo = new THREE.CylinderGeometry(1.44, 1.08, 4.0, 32);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0x765C4E,
      transparent: true,
      opacity: 0.92,
      roughness: 0.15,
      metalness: 0.05,
      transmission: 0.35,
      thickness: 0.5
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = -0.1;
    cupGroup.add(liquidMesh);

    // 2b. Sweetener Syrup Layer (bottom of the cup)
    const syrupGeo = new THREE.CylinderGeometry(1.1, 1.06, 0.4, 32);
    const syrupMat = new THREE.MeshPhysicalMaterial({
      color: 0x844e18,
      transparent: true,
      opacity: 0,
      roughness: 0.1,
      transmission: 0.1,
    });
    const syrupMesh = new THREE.Mesh(syrupGeo, syrupMat);
    syrupMesh.position.y = -2.0; // sits at the bottom inside the cup
    cupGroup.add(syrupMesh);

    // 3. Stirrer / Spoon
    const stirrerGroup = new THREE.Group();
    
    // Green plastic stirrer rod
    const rodGeo = new THREE.CylinderGeometry(0.04, 0.04, 5.5, 8);
    const rodMat = new THREE.MeshStandardMaterial({
      color: 0x006241, // Starbucks green
      roughness: 0.3
    });
    const rodMesh = new THREE.Mesh(rodGeo, rodMat);
    stirrerGroup.add(rodMesh);

    // Stopper top badge
    const topperGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 16);
    const topperMat = new THREE.MeshStandardMaterial({
      color: 0x006241,
      roughness: 0.2
    });
    const topperMesh = new THREE.Mesh(topperGeo, topperMat);
    topperMesh.position.y = 2.75;
    topperMesh.rotation.x = Math.PI / 2;
    stirrerGroup.add(topperMesh);

    // Position and tilt stirrer inside cup
    stirrerGroup.position.set(0.65, 0.5, 0.45);
    stirrerGroup.rotation.z = -Math.PI / 18;
    stirrerGroup.rotation.x = Math.PI / 22;
    stirrerPivot.add(stirrerGroup);

    // 4. Floating Ice Cubes (floating near the top of the drink so they are visible!)
    const iceCount = 8;
    const iceMeshes: THREE.Mesh[] = [];
    const iceGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      transmission: 0.88,
      roughness: 0.1,
      ior: 1.33
    });

    const icePositions = [
      { x: -0.4, y: 1.5, z: -0.3, rotX: 0.2, rotY: 0.5, rotZ: 0.1 },
      { x: 0.4, y: 1.4, z: 0.3, rotX: -0.4, rotY: 0.2, rotZ: -0.5 },
      { x: -0.15, y: 1.6, z: 0.4, rotX: 0.5, rotY: -0.3, rotZ: 0.2 },
      { x: 0.3, y: 1.3, z: -0.3, rotX: -0.2, rotY: 0.8, rotZ: 0.4 },
      { x: -0.45, y: 1.2, z: 0.1, rotX: 0.3, rotY: 0.1, rotZ: -0.2 },
      { x: 0.1, y: 1.5, z: 0.45, rotX: -0.1, rotY: 0.4, rotZ: 0.6 },
      { x: -0.2, y: 1.7, z: -0.4, rotX: 0.6, rotY: -0.2, rotZ: 0.3 },
      { x: 0.2, y: 1.6, z: -0.1, rotX: -0.3, rotY: 0.6, rotZ: -0.4 }
    ];

    for (let i = 0; i < iceCount; i++) {
      const mesh = new THREE.Mesh(iceGeo, iceMat);
      const pos = icePositions[i];
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(pos.rotX, pos.rotY, pos.rotZ);
      cupGroup.add(mesh);
      iceMeshes.push(mesh);
    }

    // 5. Toppings
    
    // 5a. Cold Foam: Bubbly frothy foam layer sitting on top of the rim
    const foamGroup = new THREE.Group();
    const foamBaseGeo = new THREE.CylinderGeometry(1.48, 1.42, 0.45, 32);
    const foamBaseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9
    });
    const foamBaseMesh = new THREE.Mesh(foamBaseGeo, foamBaseMat);
    foamBaseMesh.position.y = 1.85;
    foamGroup.add(foamBaseMesh);

    // Foam bubbles along the rim
    const bubbleGeo = new THREE.SphereGeometry(0.18, 8, 8);
    for (let b = 0; b < 12; b++) {
      const bubble = new THREE.Mesh(bubbleGeo, foamBaseMat);
      const angle = (b / 12) * Math.PI * 2;
      const radius = 1.1 + Math.random() * 0.15;
      bubble.position.set(Math.cos(angle) * radius, 2.05 + (Math.random() - 0.5) * 0.05, Math.sin(angle) * radius);
      foamGroup.add(bubble);
    }
    cupGroup.add(foamGroup);

    // 5b. Whipped Cream Dome
    const whipGroup = new THREE.Group();
    const whipBaseGeo = new THREE.CylinderGeometry(1.5, 1.35, 0.4, 16);
    const whipBaseMesh = new THREE.Mesh(whipBaseGeo, foamBaseMat);
    whipBaseMesh.position.y = 1.8;
    whipGroup.add(whipBaseMesh);

    for (let j = 0; j < 4; j++) {
      const scale = 1.0 - j * 0.24;
      const layerGeo = new THREE.TorusGeometry(0.7 * scale, 0.3 * scale, 10, 20);
      const layerMesh = new THREE.Mesh(layerGeo, foamBaseMat);
      layerMesh.rotation.x = Math.PI / 2;
      layerMesh.position.y = 2.0 + j * 0.35;
      whipGroup.add(layerMesh);
    }
    cupGroup.add(whipGroup);

    // 5c. Cinnamon Dusting Group (dusting particles sitting on top of a thin latte foam disk)
    const cinnamonGroup = new THREE.Group();
    const cinFoamGeo = new THREE.CylinderGeometry(1.44, 1.42, 0.15, 32);
    const cinFoamMesh = new THREE.Mesh(cinFoamGeo, foamBaseMat);
    cinFoamMesh.position.y = 1.9;
    cinnamonGroup.add(cinFoamMesh);

    const cinGeo = new THREE.SphereGeometry(0.04, 6, 6);
    const cinMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b, // Warm cinnamon brown
      roughness: 0.9
    });
    for (let c = 0; c < 20; c++) {
      const particle = new THREE.Mesh(cinGeo, cinMat);
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 1.25;
      particle.position.set(Math.cos(angle) * r, 2.02 + Math.random() * 0.05, Math.sin(angle) * r);
      cinnamonGroup.add(particle);
    }
    cupGroup.add(cinnamonGroup);

    // Animation frame tracking
    let animationFrameId: number;
    let cupRotY = 0;
    let stirrerRotY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp rotations smoothly towards target rotations
      cupRotY += (targetCupRotRef.current - cupRotY) * 0.02;
      stirrerRotY += (targetStirrerRotRef.current - stirrerRotY) * 0.08;

      cupGroup.rotation.y = cupRotY;
      stirrerPivot.rotation.y = stirrerRotY;

      // Access latest customization parameters dynamically
      const current = customizationRef.current;

      // Update liquid color based on base and milk selections
      let colorStyle = "#3D2314";
      const milkType = current.milk;

      if (milkType === "None") {
        switch (current.base) {
          case "Matcha Green":
            colorStyle = "#184524";
            break;
          case "Caramel Gold":
            colorStyle = "#945f21";
            break;
          case "Dragonfruit Refresher":
            colorStyle = "#c51162";
            break;
          case "Cold Brew":
          default:
            colorStyle = "#23120b";
        }
      } else if (milkType === "Whole Milk") {
        switch (current.base) {
          case "Matcha Green":
            colorStyle = "#a3d9b1";
            break;
          case "Caramel Gold":
            colorStyle = "#e5c5a8";
            break;
          case "Dragonfruit Refresher":
            colorStyle = "#fca6c5";
            break;
          case "Cold Brew":
          default:
            colorStyle = "#cfa88a";
        }
      } else if (milkType === "Oat Milk") {
        switch (current.base) {
          case "Matcha Green":
            colorStyle = "#9ebc9e";
            break;
          case "Caramel Gold":
            colorStyle = "#cca785";
            break;
          case "Dragonfruit Refresher":
            colorStyle = "#e899b3";
            break;
          case "Cold Brew":
          default:
            colorStyle = "#b08868";
        }
      } else if (milkType === "Almond Milk") {
        switch (current.base) {
          case "Matcha Green":
            colorStyle = "#8ca38c";
            break;
          case "Caramel Gold":
            colorStyle = "#b08a68";
            break;
          case "Dragonfruit Refresher":
            colorStyle = "#d687a1";
            break;
          case "Cold Brew":
          default:
            colorStyle = "#9c704c";
        }
      } else if (milkType === "Coconut Milk") {
        switch (current.base) {
          case "Matcha Green":
            colorStyle = "#b5eed2";
            break;
          case "Caramel Gold":
            colorStyle = "#eeddc5";
            break;
          case "Dragonfruit Refresher":
            colorStyle = "#ffd4e5";
            break;
          case "Cold Brew":
          default:
            colorStyle = "#dfc5ab";
        }
      }
      liquidMat.color.setStyle(colorStyle);

      // Sweetener Syrup layer at the bottom
      if (current.sweetener === "Caramel Syrup") {
        syrupMesh.visible = true;
        syrupMat.color.setStyle("#844e18");
        syrupMat.opacity = 0.9;
      } else if (current.sweetener === "Vanilla Syrup") {
        syrupMesh.visible = true;
        syrupMat.color.setStyle("#eae3d2");
        syrupMat.opacity = 0.7;
      } else if (current.sweetener === "Classic Syrup") {
        syrupMesh.visible = true;
        syrupMat.color.setStyle("#ffffff");
        syrupMat.opacity = 0.55;
      } else {
        syrupMesh.visible = false;
      }

      // Topping visibility
      if (current.topping === "Cold Foam") {
        foamGroup.visible = true;
        whipGroup.visible = false;
        cinnamonGroup.visible = false;
      } else if (current.topping === "Whipped Cream") {
        foamGroup.visible = false;
        whipGroup.visible = true;
        cinnamonGroup.visible = false;
      } else if (current.topping === "Cinnamon") {
        foamGroup.visible = false;
        whipGroup.visible = false;
        cinnamonGroup.visible = true;
      } else {
        foamGroup.visible = false;
        whipGroup.visible = false;
        cinnamonGroup.visible = false;
      }

      // Update ice cube visibilities and floating animation
      let visibleIce = 0;
      if (current.ice === "Light") visibleIce = 3;
      else if (current.ice === "Regular") visibleIce = 5;
      else if (current.ice === "Extra Ice") visibleIce = 8;

      for (let i = 0; i < iceCount; i++) {
        iceMeshes[i].visible = i < visibleIce;
        if (iceMeshes[i].visible) {
          const t = Date.now() * 0.0015 + i;
          iceMeshes[i].position.y = icePositions[i].y + Math.sin(t) * 0.04;
          iceMeshes[i].rotation.x = icePositions[i].rotX + Math.cos(t * 0.4) * 0.03;
        }
      }

      // Adjust height and scale depending on size selection
      if (current.size === "Tall") {
        cupGroup.scale.set(0.85, 0.8, 0.85);
        stirrerPivot.scale.set(0.85, 0.8, 0.85);
      } else if (current.size === "Venti") {
        cupGroup.scale.set(1.05, 1.15, 1.05);
        stirrerPivot.scale.set(1.05, 1.15, 1.05);
      } else {
        cupGroup.scale.set(1.0, 1.0, 1.0);
        stirrerPivot.scale.set(1.0, 1.0, 1.0);
      }

      // Adjust milk blend transparency and physical properties
      if (current.milk === "None") {
        liquidMat.opacity = 0.93;
        liquidMat.transmission = 0.55; // Nicely translucent
        liquidMat.roughness = 0.1;
      } else {
        liquidMat.opacity = 0.98;
        liquidMat.transmission = 0.05; // Mostly opaque/milky
        liquidMat.roughness = 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up Three.js objects to prevent memory leaks
    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const bases = [
    { name: "Cold Brew", category: "HANDCRAFTED COLD", description: "Our signature slow-steeped cold brew coffee, crafted in small batches daily for an ultra-smooth finish." },
    { name: "Matcha Green", category: "HANDCRAFTED TEA", description: "Premium organic Japanese matcha green tea whisked with silky milk and layered to perfection." },
    { name: "Caramel Gold", category: "HANDCRAFTED ESPRESSO", description: "Buttery caramel sauce blended with rich espresso and milk, topped with a velvety caramel drizzle." },
    { name: "Dragonfruit Refresher", category: "HANDCRAFTED REFRESHER", description: "Vibrant tropical flavors of sweet dragonfruit and mango shaken with real coconut milk and fruit." },
  ];

  const currentBase = bases.find((b) => b.name === customization.base) || bases[0];

  const sizes: OptionConfig[] = [
    { id: "Tall", name: "Tall", sub: "12 fl oz", iconText: "T" },
    { id: "Grande", name: "Grande", sub: "16 fl oz", iconText: "G" },
    { id: "Venti", name: "Venti", sub: "24 fl oz", iconText: "V" },
  ];

  const milks: OptionConfig[] = [
    { id: "None", name: "No Milk", sub: "Black" },
    { id: "Oat Milk", name: "Oat Milk", sub: "Creamy Oat" },
    { id: "Almond Milk", name: "Almond Milk", sub: "Nutty Accent" },
    { id: "Coconut Milk", name: "Coconut Milk", sub: "Sweet Cream" },
    { id: "Whole Milk", name: "Whole Milk", sub: "Dairy Classic" },
  ];

  const sweeteners: OptionConfig[] = [
    { id: "None", name: "Unsweetened", sub: "Natural flavor" },
    { id: "Caramel Syrup", name: "Caramel Syrup", sub: "Rich & Sweet" },
    { id: "Vanilla Syrup", name: "Vanilla Syrup", sub: "Classic Floral" },
    { id: "Classic Syrup", name: "Classic Syrup", sub: "Simple Sweet" },
  ];

  const toppings: OptionConfig[] = [
    { id: "None", name: "No Topping", sub: "Clean Finish" },
    { id: "Cold Foam", name: "Cold Foam", sub: "Sweet Cascading" },
    { id: "Whipped Cream", name: "Whipped Cream", sub: "Creamy Wave" },
    { id: "Cinnamon", name: "Cinnamon", sub: "Warm Dusting" },
  ];

  const ices: OptionConfig[] = [
    { id: "None", name: "No Ice", sub: "Chilled" },
    { id: "Light", name: "Light Ice", sub: "Less dilution" },
    { id: "Regular", name: "Regular Ice", sub: "Perfect chill" },
    { id: "Extra Ice", name: "Extra Ice", sub: "Maximum cold" },
  ];

  // Compute stats based on options
  const getStats = () => {
    let price = 4.95;
    let calories = 90;
    let caffeine = 140;

    // Base modifications
    if (customization.base === "Matcha Green") {
      price = 5.45;
      calories = 110;
      caffeine = 75;
    } else if (customization.base === "Dragonfruit Refresher") {
      price = 5.25;
      calories = 85;
      caffeine = 40;
    } else if (customization.base === "Caramel Gold") {
      price = 5.75;
      calories = 150;
      caffeine = 100;
    }

    // Size modifications
    if (customization.size === "Tall") {
      price -= 0.50;
      calories -= 20;
      caffeine -= 30;
    } else if (customization.size === "Venti") {
      price += 0.60;
      calories += 30;
      caffeine += 40;
    }

    // Milk modifications
    if (customization.milk !== "None") {
      price += 0.50;
      calories += 50;
    }

    // Sweetener modifications
    if (customization.sweetener !== "None") {
      price += 0.40;
      calories += 40;
    }

    // Toppings modifications
    if (customization.topping === "Cold Foam" || customization.topping === "Whipped Cream") {
      price += 0.70;
      calories += 70;
    } else if (customization.topping === "Cinnamon") {
      price += 0.10;
      calories += 5;
    }

    return {
      price: price.toFixed(2),
      calories,
      caffeine,
    };
  };

  const { price, calories, caffeine } = getStats();

  // ── Per-base vivid color styles ──────────────────────────────
  const BASE_STYLES: Record<string, { active: string; inactive: string }> = {
    "Cold Brew":             { active: "bg-gradient-to-r from-[var(--cold-brew)] to-[#5C4033] text-oat-milk shadow-lg shadow-[var(--cold-brew)]/25",  inactive: "bg-oat-milk text-[var(--cold-brew)] border border-[var(--cold-brew)]/20 hover:border-[var(--cold-brew)]/50 hover:bg-[#EED8C8]" },
    "Matcha Green":          { active: "bg-gradient-to-r from-primary to-primary text-[#E0F4E8] shadow-lg shadow-primary/25",  inactive: "bg-[#E8F5E0] text-primary border border-primary/20 hover:border-primary/50 hover:bg-[#C8E6CC]" },
    "Caramel Gold":          { active: "bg-gradient-to-r from-[#8B5E00] to-[#C68B59] text-white shadow-lg shadow-[#C68B59]/25",       inactive: "bg-[#FFF4E0] text-[#8B5E00] border border-[#C68B59]/20 hover:border-[#C68B59]/50 hover:bg-[#FFE5B0]" },
    "Dragonfruit Refresher": { active: "bg-gradient-to-r from-[#7B0040] to-[#D81B60] text-white shadow-lg shadow-[#D81B60]/25",       inactive: "bg-[#FFF0F5] text-[#7B0040] border border-[#D81B60]/20 hover:border-[#D81B60]/50 hover:bg-[#FFCCE0]" },
  };

  const canvasBg =
    customization.base === "Matcha Green"         ? "linear-gradient(155deg, #E8F5E0 0%, #B8DCC0 55%, #80C090 100%)" :
    customization.base === "Caramel Gold"          ? "linear-gradient(155deg, #FFF4E0 0%, #FFD888 55%, #F0B040 100%)" :
    customization.base === "Dragonfruit Refresher" ? "linear-gradient(155deg, #FFF0F8 0%, #FFB0D0 55%, #FF70A8 100%)" :
                                                    "linear-gradient(155deg, #F2F0EB 0%, #E0C8B0 55%, #C8A080 100%)";

  const canvasBorder =
    customization.base === "Matcha Green"         ? "rgba(0,112,74,0.22)" :
    customization.base === "Caramel Gold"          ? "rgba(198,139,89,0.22)" :
    customization.base === "Dragonfruit Refresher" ? "rgba(224,17,95,0.22)" :
                                                    "rgba(30,57,50,0.16)";

  // Per-combo card gradient pairs [inactive, active]
  const COMBO_BG = [
    { inactive: "from-[#E8F5E0] to-[#C8E6CC] border-primary/18 hover:border-primary/40 text-primary",    active: "from-primary to-[var(--cold-brew)] border-transparent text-white" },
    { inactive: "from-[#F2F0EB] to-[#E0C8B0] border-[var(--cold-brew)]/18 hover:border-[var(--cold-brew)]/40 text-[var(--cold-brew)]",    active: "from-[var(--cold-brew)] to-[#5C4033] border-transparent text-white" },
    { inactive: "from-[#FFF4E0] to-[#FFE5A0] border-[#C68B59]/18 hover:border-[#C68B59]/40 text-[#6B3800]",    active: "from-[#C68B59] to-[#8B5E00] border-transparent text-white" },
    { inactive: "from-[#FFF0F8] to-[#FFCCE0] border-[#D81B60]/18 hover:border-[#D81B60]/40 text-[#7B0040]",    active: "from-[#D81B60] to-[#7B0040] border-transparent text-white" },
  ];

  // Get color for liquid
  const getLiquidColor = () => {
    const hasMilk = customization.milk !== "None";
    switch (customization.base) {
      case "Matcha Green":
        return hasMilk ? "#A4CBB0" : "#24583B";
      case "Caramel Gold":
        return hasMilk ? "#D8BCA0" : "#A07137";
      case "Dragonfruit Refresher":
        return hasMilk ? "#F4B5CD" : "#D81B60";
      case "Cold Brew":
      default:
        return hasMilk ? "#B69C85" : "#3D2314";
    }
  };

  // Ice cube positions inside cup
  const getIceCubes = () => {
    switch (customization.ice) {
      case "Light":
        return [
          { id: 1, x: 120, y: 220, rotate: 15 },
          { id: 2, x: 150, y: 240, rotate: -25 },
        ];
      case "Regular":
        return [
          { id: 1, x: 110, y: 180, rotate: 12 },
          { id: 2, x: 155, y: 200, rotate: -18 },
          { id: 3, x: 125, y: 245, rotate: 30 },
          { id: 4, x: 145, y: 260, rotate: -10 },
        ];
      case "Extra Ice":
        return [
          { id: 1, x: 110, y: 130, rotate: -5 },
          { id: 2, x: 150, y: 150, rotate: 20 },
          { id: 3, x: 115, y: 195, rotate: 25 },
          { id: 4, x: 155, y: 210, rotate: -30 },
          { id: 5, x: 120, y: 260, rotate: 10 },
          { id: 6, x: 145, y: 275, rotate: -15 },
        ];
      case "None":
      default:
        return [];
    }
  };

  const iceCubes = getIceCubes();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section id="builder" className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Title Header */}
      <div className="space-y-2 border-b border-[#2C2421]/5 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-primary tracking-wider uppercase">
          <Sliders size={14} className="text-[#C68B59]" />
          <span>Co-Create & Mix</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-black text-[var(--cold-brew)] tracking-tight">
          Custom Drink Lab
        </h2>
        <p className="text-sm md:text-base text-[var(--cold-brew)]/75 max-w-xl">
          Unleash your inner barista. Customize every single layer of your drink, or load one of our popular secret-menu combos below.
        </p>
      </div>

      {/* Popular Combo Presets */}
      <div className="flex flex-col gap-4 bg-background/40 border border-white/50 backdrop-blur-sm p-6 rounded-[32px] shadow-sm">
        <h4 className="text-xs font-bold text-[#C68B59] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={13} />
          Popular Custom Presets
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POPULAR_COMBOS.map((combo, comboIdx) => {
            const isActive = customization.base === combo.config.base &&
                             customization.milk === combo.config.milk &&
                             customization.sweetener === combo.config.sweetener &&
                             customization.topping === combo.config.topping &&
                             customization.ice === combo.config.ice;
            const comboBg = COMBO_BG[comboIdx] ?? COMBO_BG[0];
            return (
              <button
                key={combo.name}
                onClick={() => onChangeCustomization(() => combo.config)}
                className={`p-4 rounded-2xl text-left border transition-all duration-500 flex items-start gap-3 hover-scale cursor-pointer bg-gradient-to-br ${
                  isActive ? `${comboBg.active} shadow-lg` : `${comboBg.inactive} shadow-sm`
                }`}
              >
                <span className="text-2xl mt-0.5">{combo.emoji}</span>
                <div>
                  <div className="text-xs font-extrabold">
                    {combo.name}
                  </div>
                  <div className="text-[10px] mt-1 font-medium leading-normal opacity-75">
                    {combo.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Base Drink Bar (Menu selector) */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-xs font-bold text-primary tracking-wider uppercase">
          <Sparkles size={14} />
          <span>Select Custom Drink Base</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {bases.map((b) => (
            <button
              key={b.name}
              onClick={() => onChangeCustomization((prev) => ({ ...prev, base: b.name }))}
              className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover-scale ${
                customization.base === b.name
                  ? (BASE_STYLES[b.name]?.active ?? "bg-primary text-oat-milk")
                  : (BASE_STYLES[b.name]?.inactive ?? "bg-background text-[var(--cold-brew)] border border-[var(--cold-brew)]/8")
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric 3-Column Layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Drink Details & active customization summary (Col-span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Handcrafted Drink Title & Description Card */}
          <div className="rounded-[32px] p-8 bg-background border border-[var(--cold-brew)]/5 shadow-sm space-y-4">
            <span className="text-[10px] uppercase font-bold text-[#C68B59] tracking-wider">
              {currentBase.category}
            </span>
            <h3 className="text-4xl font-display font-extrabold text-[var(--cold-brew)] leading-[1.1] tracking-tight">
              {customization.topping === "Cold Foam" ? "Matcha Foam " : ""}
              {customization.base}
            </h3>
            <p className="text-xs md:text-sm text-[var(--cold-brew)]/75 leading-relaxed">
              {currentBase.description}
            </p>
          </div>

          {/* Active Customizations list card */}
          <div className="rounded-[32px] p-8 bg-background border border-[var(--cold-brew)]/5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#C68B59]">
              <Sparkles size={16} />
              <h4 className="font-display font-bold text-sm tracking-wider uppercase">
                Active Customizations
              </h4>
            </div>
            
            <ul className="space-y-2 text-xs font-medium text-[var(--cold-brew)]/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Size: <strong className="text-[var(--cold-brew)]">{customization.size}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Milk: <strong className="text-[var(--cold-brew)]">{customization.milk}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Sweetener: <strong className="text-[var(--cold-brew)]">{customization.sweetener}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Topping: <strong className="text-[var(--cold-brew)]">{customization.topping}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Ice: <strong className="text-[var(--cold-brew)]">{customization.ice}</strong></span>
              </li>
            </ul>
          </div>

          {/* Large Starbucks Dark Green Add to Order panel (Bottom Left placement) */}
          <div className="rounded-[32px] p-8 bg-primary text-oat-milk shadow-md space-y-4 relative overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#C68B59]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-display font-extrabold tracking-tight">
                  Add to Order
                </h3>
                <p className="text-[11px] text-oat-milk/70 font-medium mt-1">
                  Customized {customization.size}
                </p>
              </div>
              
              <div className="px-4 py-2 rounded-full bg-oat-milk/10 border border-oat-milk/10 text-base font-extrabold text-oat-milk">
                ${price}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {ordered ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full py-4 rounded-2xl bg-oat-milk text-primary flex items-center justify-center gap-2 text-sm font-bold shadow-sm"
                >
                  <Check size={16} />
                  <span>Added successfully!</span>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setOrdered(true);
                    setTimeout(() => setOrdered(false), 3000);
                  }}
                  className="w-full py-4 rounded-2xl bg-oat-milk text-primary flex items-center justify-center gap-2 text-sm font-bold transition-custom hover-scale shadow-sm cursor-pointer hover:bg-oat-milk/90"
                >
                  <ShoppingBag size={16} />
                  <span>Checkout</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CENTER COLUMN: Large visualizer container with cream bg and Starbucks logo (Col-span 4) */}
        <div className="lg:col-span-4 w-full flex justify-center">
          <div
            className="w-full rounded-[40px] p-6 border shadow-lg flex flex-col items-center relative min-h-[460px] justify-center overflow-hidden transition-all duration-700"
            style={{ background: canvasBg, borderColor: canvasBorder }}
          >
            {/* Ambient Starbucks Siren logo backdrop */}
            <div className="absolute top-6 left-6 opacity-5 pointer-events-none">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo.svg"
                alt="Starbucks Logo"
                className="w-12 h-12"
              />
            </div>
            
            {/* 3D WebGL Canvas Visualizer */}
            <div className="w-64 h-96 relative flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width="240"
                height="360"
                className="w-full h-full cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Hint message */}
            <div className="absolute bottom-4 text-center">
              <span className="text-[9px] font-bold tracking-widest text-[var(--cold-brew)]/50 uppercase select-none pointer-events-none">
                Interactive 3D Drink Lab
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Customization Toggles, styled as expanding cards matching screenshot (Col-span 4) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Expandable Section: Size */}
          <div className="rounded-[24px] bg-background border border-[var(--cold-brew)]/5 shadow-sm overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleSection("size")}
              className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white flex items-center justify-center font-bold text-base shadow-md shadow-amber-500/25">
                  {customization.size[0] || "G"}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[var(--cold-brew)] leading-none">
                    {customization.size}
                  </h4>
                  <p className="text-[10px] text-[var(--cold-brew)]/60 mt-1 font-semibold uppercase tracking-wider">
                    {sizes.find((s) => s.id === customization.size)?.sub || "16 fl oz"}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-[var(--cold-brew)]/40 transition-transform duration-300 ${
                  expandedSection === "size" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {expandedSection === "size" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="border-t border-[var(--cold-brew)]/5 bg-background/40 overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-3 gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => onChangeCustomization((prev) => ({ ...prev, size: s.id }))}
                        className={`py-3 px-2 rounded-xl text-center transition-custom hover-scale text-xs font-bold ${
                          customization.size === s.id
                            ? "bg-primary text-oat-milk"
                            : "bg-background text-[var(--cold-brew)] border border-[var(--cold-brew)]/10 hover:border-primary"
                        }`}
                      >
                        <div className="text-sm font-extrabold">{s.iconText}</div>
                        <div className="text-[9px] font-normal opacity-85 mt-0.5">{s.name}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expandable Section: Milk */}
          <div className="rounded-[24px] bg-background border border-[var(--cold-brew)]/5 shadow-sm overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleSection("milk")}
              className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border-4 border-[#0EA5E9] flex items-center justify-center relative shadow-md shadow-sky-400/25">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#0EA5E9]" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[var(--cold-brew)] leading-none">
                    {customization.milk === "None" ? "No Milk" : customization.milk}
                  </h4>
                  <p className="text-[10px] text-[var(--cold-brew)]/60 mt-1 font-semibold uppercase tracking-wider">
                    {milks.find((m) => m.id === customization.milk)?.sub || "Oat Milk"}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-[var(--cold-brew)]/40 transition-transform duration-300 ${
                  expandedSection === "milk" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {expandedSection === "milk" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="border-t border-[var(--cold-brew)]/5 bg-background/40 overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {milks.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => onChangeCustomization((prev) => ({ ...prev, milk: m.id }))}
                        className={`py-3 px-3 rounded-xl text-left transition-custom hover-scale text-xs font-bold flex justify-between items-center ${
                          customization.milk === m.id
                            ? "bg-primary text-oat-milk"
                            : "bg-background text-[var(--cold-brew)] border border-[var(--cold-brew)]/10 hover:border-primary"
                        }`}
                      >
                        <div>
                          <div>{m.name}</div>
                          <div className="text-[9px] font-normal opacity-70 mt-0.5">{m.sub}</div>
                        </div>
                        {customization.milk === m.id && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expandable Section: Sweeteners */}
          <div className="rounded-[24px] bg-background border border-[var(--cold-brew)]/5 shadow-sm overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleSection("sweetener")}
              className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EC4899] to-[#DB2777] flex items-center justify-center font-bold text-sm shadow-md shadow-pink-500/25">
                  💧
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[var(--cold-brew)] leading-none">
                    {customization.sweetener === "None" ? "No Syrup" : customization.sweetener}
                  </h4>
                  <p className="text-[10px] text-[var(--cold-brew)]/60 mt-1 font-semibold uppercase tracking-wider">
                    {sweeteners.find((s) => s.id === customization.sweetener)?.sub || "Caramel / Vanilla"}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-[var(--cold-brew)]/40 transition-transform duration-300 ${
                  expandedSection === "sweetener" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {expandedSection === "sweetener" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="border-t border-[var(--cold-brew)]/5 bg-background/40 overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {sweeteners.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => onChangeCustomization((prev) => ({ ...prev, sweetener: s.id }))}
                        className={`py-3 px-3 rounded-xl text-left transition-custom hover-scale text-xs font-bold flex justify-between items-center ${
                          customization.sweetener === s.id
                            ? "bg-primary text-oat-milk"
                            : "bg-background text-[var(--cold-brew)] border border-[var(--cold-brew)]/10 hover:border-primary"
                        }`}
                      >
                        <div>
                          <div>{s.name}</div>
                          <div className="text-[9px] font-normal opacity-70 mt-0.5">{s.sub}</div>
                        </div>
                        {customization.sweetener === s.id && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expandable Section: Toppings */}
          <div className="rounded-[24px] bg-background border border-[var(--cold-brew)]/5 shadow-sm overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleSection("topping")}
              className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center font-bold text-sm shadow-md shadow-violet-500/25">
                  ✨
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[var(--cold-brew)] leading-none">
                    {customization.topping === "None" ? "No Topping" : customization.topping}
                  </h4>
                  <p className="text-[10px] text-[var(--cold-brew)]/60 mt-1 font-semibold uppercase tracking-wider">
                    {toppings.find((t) => t.id === customization.topping)?.sub || "Cold Foam / Cream"}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-[var(--cold-brew)]/40 transition-transform duration-300 ${
                  expandedSection === "topping" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {expandedSection === "topping" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="border-t border-[var(--cold-brew)]/5 bg-background/40 overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {toppings.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => onChangeCustomization((prev) => ({ ...prev, topping: t.id }))}
                        className={`py-3 px-3 rounded-xl text-left transition-custom hover-scale text-xs font-bold flex justify-between items-center ${
                          customization.topping === t.id
                            ? "bg-primary text-oat-milk"
                            : "bg-background text-[var(--cold-brew)] border border-[var(--cold-brew)]/10 hover:border-primary"
                        }`}
                      >
                        <div>
                          <div>{t.name}</div>
                          <div className="text-[9px] font-normal opacity-70 mt-0.5">{t.sub}</div>
                        </div>
                        {customization.topping === t.id && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expandable Section: Ice Level */}
          <div className="rounded-[24px] bg-background border border-[var(--cold-brew)]/5 shadow-sm overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleSection("ice")}
              className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#0891B2] flex items-center justify-center font-bold text-sm shadow-md shadow-cyan-500/25">
                  🧊
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[var(--cold-brew)] leading-none">
                    {customization.ice === "None" ? "No Ice" : customization.ice}
                  </h4>
                  <p className="text-[10px] text-[var(--cold-brew)]/60 mt-1 font-semibold uppercase tracking-wider">
                    {ices.find((i) => i.id === customization.ice)?.sub || "Ice amount"}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-[var(--cold-brew)]/40 transition-transform duration-300 ${
                  expandedSection === "ice" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {expandedSection === "ice" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="border-t border-[var(--cold-brew)]/5 bg-background/40 overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {ices.map((i) => (
                      <button
                        key={i.id}
                        onClick={() => onChangeCustomization((prev) => ({ ...prev, ice: i.id }))}
                        className={`py-3 px-3 rounded-xl text-left transition-custom hover-scale text-xs font-bold flex justify-between items-center ${
                          customization.ice === i.id
                            ? "bg-primary text-oat-milk"
                            : "bg-background text-[var(--cold-brew)] border border-[var(--cold-brew)]/10 hover:border-primary"
                        }`}
                      >
                        <div>
                          <div>{i.name}</div>
                          <div className="text-[9px] font-normal opacity-70 mt-0.5">{i.sub}</div>
                        </div>
                        {customization.ice === i.id && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
