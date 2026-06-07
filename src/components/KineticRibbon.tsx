import './KineticRibbon.css';

export const KineticRibbon = () => {
  // 1. We expanded the content so it's massive.
  const coreText = "FULL-STACK DEVELOPMENT // BACKEND SYSTEMS // CLEAN ARCHITECTURE // REAL-TIME APPS // WEB PERFORMANCE // ";

  return (
    <div className="kinetic-ribbon-wrapper group">

      {/* 2. The Animation Container
        - animation: marquee: Drives the CSS infinite loop.
        - hover: [animation-play-state:paused]: Stops the animation immediately when the mouse enters.
      */}
      <div className="kinetic-ribbon-content">
        <h1 className="kinetic-ribbon-heading">
          {coreText}
        </h1>
      </div>

      {/* 3. The Seamless Duplicate
        This identical block follows right behind the first one. 
        aria-hidden="true" ensures screen readers don't read the same text twice.
      */}
      <div className="kinetic-ribbon-content" aria-hidden="true">
        <h1 className="kinetic-ribbon-heading">
          {coreText}
        </h1>
      </div>

    </div>
  );
};

export default KineticRibbon;
