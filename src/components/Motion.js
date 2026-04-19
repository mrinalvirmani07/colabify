 "use client";

 import {
   motion,
   useMotionTemplate,
   useMotionValue,
   useReducedMotion,
   useSpring,
   useTransform,
 } from "framer-motion";

 export function Reveal({
   children,
   className,
   delay = 0,
   y = 18,
   once = true,
 }) {
   const prefersReducedMotion = useReducedMotion();

   return (
     <motion.div
       className={className}
       initial={
         prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y, filter: "blur(8px)" }
       }
       whileInView={
         prefersReducedMotion
           ? { opacity: 1 }
           : { opacity: 1, y: 0, filter: "blur(0px)" }
       }
       viewport={{ once, amount: 0.35 }}
       transition={{
         duration: prefersReducedMotion ? 0 : 0.7,
         delay,
         ease: [0.2, 0.8, 0.2, 1],
       }}
     >
       {children}
     </motion.div>
   );
 }

 export function Float({ children, className, duration = 6, amplitude = 10 }) {
   const prefersReducedMotion = useReducedMotion();
   if (prefersReducedMotion) return <div className={className}>{children}</div>;

   return (
     <motion.div
       className={className}
       animate={{ y: [-amplitude, amplitude, -amplitude] }}
       transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
     >
       {children}
     </motion.div>
   );
 }

 export function MarqueeRow({ children, className, duration = 18, reverse = false }) {
   const prefersReducedMotion = useReducedMotion();
   if (prefersReducedMotion) return <div className={className}>{children}</div>;

   return (
     <motion.div
       className={className}
       initial={{ x: reverse ? "-50%" : "0%" }}
       animate={{ x: reverse ? "0%" : "-50%" }}
       transition={{ duration, repeat: Infinity, ease: "linear" }}
     >
       {children}
     </motion.div>
   );
 }

 export function TiltCard({
   children,
   className,
   maxTilt = 10,
   glare = true,
 }) {
   const prefersReducedMotion = useReducedMotion();
   const x = useMotionValue(0);
   const y = useMotionValue(0);

   const xSpring = useSpring(x, { stiffness: 180, damping: 16, mass: 0.2 });
   const ySpring = useSpring(y, { stiffness: 180, damping: 16, mass: 0.2 });

   const rotateX = useTransform(ySpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
   const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

   const glareX = useTransform(xSpring, [-0.5, 0.5], ["25%", "75%"]);
   const glareY = useTransform(ySpring, [-0.5, 0.5], ["25%", "75%"]);
   const glareBg = useMotionTemplate`radial-gradient(700px 350px at ${glareX} ${glareY}, rgba(255,255,255,0.16), transparent 55%)`;

   if (prefersReducedMotion) return <div className={className}>{children}</div>;

   return (
     <motion.div
       className={className}
       style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
       onMouseMove={(e) => {
         const rect = e.currentTarget.getBoundingClientRect();
         const px = (e.clientX - rect.left) / rect.width - 0.5;
         const py = (e.clientY - rect.top) / rect.height - 0.5;
         x.set(px);
         y.set(py);
       }}
       onMouseLeave={() => {
         x.set(0);
         y.set(0);
       }}
       transition={{ type: "spring", stiffness: 120, damping: 18 }}
     >
       {glare ? (
         <motion.div
           aria-hidden="true"
           className="pointer-events-none absolute inset-0 rounded-[inherit]"
           style={{ backgroundImage: glareBg }}
         />
       ) : null}
       <div style={{ transform: "translateZ(0.1px)" }}>{children}</div>
     </motion.div>
   );
 }

