// src/components1.tsx
import { useState, useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  const optionsStr = JSON.stringify(options);
  useEffect(() => {
    const parsedOptions = JSON.parse(optionsStr);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (parsedOptions.triggerOnce !== false) observer.unobserve(entry.target);
      } else if (parsedOptions.triggerOnce === false) {
        setIsIntersecting(false);
      }
    }, { threshold: 0, rootMargin: "50px 0px -50px 0px", ...parsedOptions });
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [optionsStr]);
  return [ref, isIntersecting];
};
var Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });
  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1)";
    if (direction === "up") return "translateY(var(--anim-dist))";
    if (direction === "left") return "translateX(var(--anim-dist))";
    if (direction === "right") return "translateX(calc(var(--anim-dist) * -1))";
    if (direction === "scale") return "scale(0.95)";
    return "none";
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className,
      style: {
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: "var(--anim-speed)",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform"
      },
      children
    }
  );
};
var AnimatedCounter = ({ end, duration = 2500, suffix = "", nightMode }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });
  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    let animationFrameId;
    const currentDuration = nightMode ? 500 : duration;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / currentDuration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    animationFrameId = window.requestAnimationFrame(step);
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, end, duration, nightMode]);
  return /* @__PURE__ */ jsxs("span", { ref, className: "logo-animated", children: [
    count,
    suffix
  ] });
};
var DynamicHeadline = ({ words, prefix = "", suffix = "", gradient = false }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, [words.length]);
  return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center", children: [
    prefix && /* @__PURE__ */ jsx("span", { className: "mr-2", children: prefix }),
    /* @__PURE__ */ jsxs("span", { className: "relative inline-flex overflow-hidden pb-1 md:pb-2 min-w-[220px] md:min-w-[340px] lg:min-w-[420px]", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: `absolute inset-0 smooth-transition ${fade ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[8px]"} ${gradient ? "logo-animated animate-gradient-text" : ""}`,
          children: words[index]
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "opacity-0 pointer-events-none", children: words.reduce((a, b) => a.length > b.length ? a : b) })
    ] }),
    suffix && /* @__PURE__ */ jsx("span", { className: "ml-2", children: suffix })
  ] });
};
export {
  AnimatedCounter,
  DynamicHeadline,
  Reveal,
  useIntersectionObserver
};
