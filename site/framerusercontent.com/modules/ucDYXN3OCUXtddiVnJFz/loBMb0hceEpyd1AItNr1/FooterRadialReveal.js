import{jsx as _jsx}from"react/jsx-runtime";import{useMotionValue,useSpring,useTransform,useMotionTemplate}from"framer-motion";export function withCursorVideoReveal(Component){return props=>{const x=useMotionValue(0);const y=useMotionValue(0);const scale=useMotionValue(0);const smoothX=useSpring(x,{stiffness:180,damping:28,mass:.35});const smoothY=useSpring(y,{stiffness:180,damping:28,mass:.35});const smoothScale=useSpring(scale,{stiffness:180,damping:30,mass:.35});const innerRadius=useTransform(smoothScale,[0,1],[0,180]);const outerRadius=useTransform(smoothScale,[0,1],[0,300]);/*
        const mask = useMotionTemplate`
            radial-gradient(
                circle ${outerRadius}px at ${smoothX}px ${smoothY}px,
                transparent 0px,
                transparent ${innerRadius}px,
                black ${outerRadius}px
            )
        `*/const feather=useTransform(smoothScale,[0,1],[0,80])//
;const mask=useMotionTemplate`
            radial-gradient(
                circle ${outerRadius}px at ${smoothX}px ${smoothY}px,
                transparent 0px,
                transparent ${innerRadius}px,
                rgba(0,0,0,0.2) calc(${innerRadius}px + 20px),
                rgba(0,0,0,0.5) calc(${innerRadius}px + 40px),
                rgba(0,0,0,0.8) calc(${innerRadius}px + 60px),
                black ${outerRadius}px
            )
        `;const isTouchDevice=typeof window!=="undefined"&&window.matchMedia("(hover: none), (pointer: coarse)").matches;if(isTouchDevice){return /*#__PURE__*/_jsx(Component,{...props,style:{...props.style,WebkitMaskImage:"none",maskImage:"none",opacity:.9}});}return /*#__PURE__*/_jsx(Component,{...props,onPointerEnter:event=>{const rect=event.currentTarget.getBoundingClientRect();x.set(event.clientX-rect.left);y.set(event.clientY-rect.top);scale.set(1);},onPointerMove:event=>{const rect=event.currentTarget.getBoundingClientRect();x.set(event.clientX-rect.left);y.set(event.clientY-rect.top);},onPointerLeave:()=>{scale.set(0);},style:{...props.style,WebkitMaskImage:mask,maskImage:mask,WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat"}});};}
export const __FramerMetadata__ = {"exports":{"withCursorVideoReveal":{"type":"reactHoc","name":"withCursorVideoReveal","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./FooterRadialReveal.map