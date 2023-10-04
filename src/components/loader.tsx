const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <svg
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="lds-ring"
        style={{ background: 'none' }}
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#007bff"
          strokeWidth="4"
          r="40"
          strokeDasharray="188.49555921538757 64.83185307179586"
          transform="rotate(96.0362 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.7692307692307692s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
