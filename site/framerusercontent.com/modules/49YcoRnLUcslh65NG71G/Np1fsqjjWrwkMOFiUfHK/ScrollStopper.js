import{jsx as _jsx,Fragment as _Fragment}from"react/jsx-runtime";import{addPropertyControls,ControlType}from"framer";/**
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */export default function StopScroll(props){const{toggle}=props;return toggle?/*#__PURE__*/_jsx("style",{"data-hh-stop-scroll":true,children:`html,body { overflow: clip !important; }`}):/*#__PURE__*/_jsx(_Fragment,{});}StopScroll.displayName="Stop Scroll";addPropertyControls(StopScroll,{toggle:{type:ControlType.Boolean,title:"Block Scroll"}})/* export default function StopScroll(props) {
    const { toggle } = props

    return toggle ? (
        <style data-hh-stop-scroll>
            {`
            html,
            body {
                overflow: hidden !important;
                overscroll-behavior: none !important;
            }
        `}
        </style>
    ) : null
}

StopScroll.displayName = "Stop Scroll"

addPropertyControls(StopScroll, {
    toggle: {
        type: ControlType.Boolean,
        title: "Block Scroll",
    },
}) */;
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"StopScroll","slots":[],"annotations":{"framerDisableUnlink":"*","framerContractVersion":"1","framerSupportedLayoutWidth":"auto","framerSupportedLayoutHeight":"auto"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./ScrollStopper.map