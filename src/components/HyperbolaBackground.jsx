function HyperbolaBackground() {
  return (
    <div className="hyperbola-bg">
      <svg
        viewBox="0 0 1200 700"
        className="hyperbola-svg"
        aria-hidden="true"
      >
        {/* Ejes */}
        <line x1="600" y1="70" x2="600" y2="630" className="axis" />
        <line x1="120" y1="350" x2="1080" y2="350" className="axis" />

        {/* Asíntotas */}
        <line x1="250" y1="600" x2="950" y2="100" className="asymptote" />
        <line x1="250" y1="100" x2="950" y2="600" className="asymptote" />

        {/* Rama izquierda */}
        <path
          d="M 450 120
             C 390 170, 350 235, 330 300
             C 315 330, 315 370, 330 400
             C 350 465, 390 530, 450 580"
          className="hyperbola-line left-branch"
        />

        {/* Rama derecha */}
        <path
          d="M 750 120
             C 810 170, 850 235, 870 300
             C 885 330, 885 370, 870 400
             C 850 465, 810 530, 750 580"
          className="hyperbola-line right-branch"
        />

        {/* Focos */}
        <circle cx="470" cy="350" r="8" className="focus focus-left" />
        <circle cx="730" cy="350" r="8" className="focus focus-right" />
      </svg>
    </div>
  );
}

export default HyperbolaBackground;