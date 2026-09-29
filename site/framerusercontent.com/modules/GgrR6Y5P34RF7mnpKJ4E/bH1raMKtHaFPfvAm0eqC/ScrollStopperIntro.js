import{jsx as _jsx,Fragment as _Fragment}from"react/jsx-runtime";import{addPropertyControls,ControlType}from"framer";import{useHomeIntroStore}from"https://framer.com/m/HomeIntroStore-wkiogh.js@1NMRsWQ8b05AjKRlopLI";/**
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */export default function StopScrollIntro(props){const{toggle}=props;const{introShown}=useHomeIntroStore();return!toggle&&!introShown?/*#__PURE__*/_jsx(_Fragment,{}):/*#__PURE__*/_jsx("style",{"data-hh-stop-scroll":true,children:`html,body { overflow: clip !important; }`});}StopScrollIntro.displayName="Stop Scroll Intro";addPropertyControls(StopScrollIntro,{toggle:{type:ControlType.Boolean,title:"Block Scroll (Intro)"}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"StopScrollIntro","slots":[],"annotations":{"framerContractVersion":"1","framerDisableUnlink":"*","framerSupportedLayoutWidth":"auto","framerSupportedLayoutHeight":"auto"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./ScrollStopperIntro.map