import { useState, useEffect } from "react";

function useViewport(innerWidth) {
    const [isMobile, setIsMobile] = useState();

    return isMobile; 
}