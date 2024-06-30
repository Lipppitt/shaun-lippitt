import {useEffect, useLayoutEffect} from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function useGSAP() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, [])
}
