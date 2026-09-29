import{useEffect,useState}from"react";/**
 * Framer Hook — Detect Mobile / Desktop
 *
 * Uso:
 * const isMobile = useIsMobile()
 *
 * if (isMobile) {
 *   // Mobile
 * } else {
 *   // Desktop
 * }
 */export function useIsMobile(breakpoint=768){const[isMobile,setIsMobile]=useState(false);useEffect(()=>{const checkDevice=()=>{setIsMobile(window.innerWidth<breakpoint);};checkDevice();window.addEventListener("resize",checkDevice);return()=>{window.removeEventListener("resize",checkDevice);};},[breakpoint]);return isMobile;}
export const __FramerMetadata__ = {"exports":{"useIsMobile":{"type":"function","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Use_is_mobile.map