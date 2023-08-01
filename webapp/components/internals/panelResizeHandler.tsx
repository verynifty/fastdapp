import { PanelResizeHandle } from "react-resizable-panels";

export default function PanelResizeHandler({
    className = "",
    id
}: {
    className?: string;
    id?: string;
}) {
    return (
        <PanelResizeHandle
            className={["ResizeHandleOuter", "border-x-2 	", className].join(" ")}
            id={id}
        >
            <div className="ResizeHandleOuter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FCFCFC" viewBox="0 0 512 640" x="0px" y="0px"><g><path d="M496,256.01a23.874,23.874,0,0,1-7.03,16.98l-72,71.98a24,24,0,0,1-33.94-33.94L414.06,280H312a8,8,0,0,1-8-8V240a8,8,0,0,1,8-8H414.05l-31.02-31.03a24,24,0,1,1,33.94-33.94l72,72.01A23.892,23.892,0,0,1,496,256.01Z" /><path d="M208,240v32a8,8,0,0,1-8,8H97.94l31.03,31.03a24,24,0,1,1-33.94,33.94l-72-71.99a24,24,0,0,1,0-33.94l72-72.01a24,24,0,0,1,33.94,33.94L97.95,232H200A8,8,0,0,1,208,240Z" /><path d="M320,80V432a24,24,0,0,1-48,0V80a24,24,0,0,1,48,0Z" /><path d="M240,80V432a24,24,0,0,1-48,0V80a24,24,0,0,1,48,0Z" /></g>
                </svg>
            </div>
        </PanelResizeHandle>
    );
}
