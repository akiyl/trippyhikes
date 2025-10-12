"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Button = ({
  children,
  className = "",
  variant = "solid",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
}) => {
  const base =
    "px-5 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none";
  const styles =
    variant === "outline"
      ? "border border-white/30 text-white hover:bg-white/10"
      : "bg-amber-500 hover:bg-amber-600 text-white shadow-md";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-white/10 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-md ${className}`}
  >
    {children}
  </div>
);
const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

const destinations = [
  {
    title: "Everest Base Camp",
    img: "/image/everest-base-camp-4527047_1280.jpg",
    desc: "Our most popular trek",
  },
  {
    title: "Patagonia W Trek",
    img: "/image/patagonia.jpg",
    desc: "A visual masterpiece",
  },
  {
    title: "Annapurna Circuit",
    img: "/image/annapurna.jpg",
    desc: "Explore Nepal’s beauty",
  },
  {
    title: "Mount Kilimanjaro",
    img: "/image/kilimanjaro.jpg",
    desc: "Summit Africa’s peak",
  },
];

export default function DiscoverPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null); // used for interactive nudging

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Basic scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 60, 300);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x00091f);
    renderer.domElement.style.display = "block"; // avoid inline-block spacing issues
    mount.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(50, 120, 50);
    scene.add(dir);

    // Controls (helpful while tweaking)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);

    // Load model ONCE and center & drop it to a desired baseline
    const loader = new GLTFLoader();
    loader.load(
      "/models/himalaya.glb",
      (gltf) => {
        const model = gltf.scene;
        // initial scale (tweak if model looks too large/small)
        model.scale.set(1, 1, 1);

        // 1) compute bounding box (before changing position)
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // 2) center horizontally and in depth: subtract center.x and center.z and center.y to move center to origin
        model.position.sub(center);

        // 3) recompute bounding box after centering to get accurate min.y
        const boxAfter = new THREE.Box3().setFromObject(model);

        // desiredGround is the y where the model's lowest point should end up.
        // Negative numbers move the entire model downward visually (further from camera vertically).
        const desiredGround = -80; // try -30, -50, -80 until it visually sits where you want

        // compute current min y and shift so min.y === desiredGround
        const currentMinY = boxAfter.min.y;
        // model.position.y += desiredGround - currentMinY;

        // small rotation to present nicely
        model.rotation.y = Math.PI / 6;

        // store reference so we can nudge interactively
        modelRef.current = model;

        scene.add(model);
      },
      (xhr) => {
        // optional progress
        // console.log("Model loading:", Math.round((xhr.loaded / (xhr.total || 1)) * 100) + "%");
      },
      (err) => {
        console.error("GLTF load error:", err);
      }
    );

    // animate
    const clock = new THREE.Clock();
    let req = 0;
    function animate() {
      req = requestAnimationFrame(animate);
      // slow orbit of the camera on x to give subtle parallax:
      const t = clock.getElapsedTime();
      camera.position.x = Math.sin(t * 0.02) * 110; // slow horizontal orbit
      camera.lookAt(0, 0, 0);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Keyboard nudging (arrow up/down)
    const onKey = (e: KeyboardEvent) => {
      if (!modelRef.current) return;
      if (e.key === "ArrowDown") {
        modelRef.current.position.y -= 5;
      } else if (e.key === "ArrowUp") {
        modelRef.current.position.y += 5;
      }
    };
    window.addEventListener("keydown", onKey);

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(req);
      controls.dispose();
      renderer.dispose();
      try {
        mount.removeChild(renderer.domElement);
      } catch (err) {
        /* ignore if already removed */
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-gray-950" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 px-10 pt-20"
      >
        <h1 className="text-5xl font-bold mb-6 text-center">
          Explore Your Next Adventure
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <input
            type="text"
            placeholder="Search destinations..."
            className="px-5 py-3 bg-white/10 border border-white/20 rounded-full text-white focus:outline-none w-72 backdrop-blur-md"
          />
          <Button>Apply Filters</Button>
          <Button variant="outline">Reset Filters</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {destinations.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card className="hover:scale-105 transition-transform">
                <img
                  src={d.img}
                  alt={d.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
                  <p className="text-sm text-gray-300">{d.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
