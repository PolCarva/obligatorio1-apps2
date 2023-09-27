import React from "react";

const RouletteIcon = ({className}) => {
  return (
    <svg
    className={`${className}`}
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M75.1163 98.8372L100.291 137.209H49.9411L75.1163 98.8372Z"
        fill="#6A6A6A"
      />
      <g filter="url(#filter0_d_2_312)">
        <path
          d="M122 71C122 80.9254 118.858 90.5961 113.024 98.6259L75 71L122 71Z"
          fill="#CD976B"
        />
        <path
          d="M113.024 43.3741C118.858 51.4039 122 61.0746 122 71L75 71L113.024 43.3741Z"
          fill="#24BDAB"
        />
        <path
          d="M89.5238 115.7C80.0842 118.767 69.9158 118.767 60.4762 115.7L75 71L89.5238 115.7Z"
          fill="#DB6700"
        />
        <path
          d="M113.024 98.6259C107.19 106.656 98.9634 112.633 89.5238 115.7L75 71L113.024 98.6259Z"
          fill="#B43131"
        />
        <path
          d="M36.9762 98.6259C31.1422 90.5961 28 80.9254 28 71L75 71L36.9762 98.6259Z"
          fill="#CD976B"
        />
        <path
          d="M60.4762 115.7C51.0366 112.633 42.8102 106.656 36.9762 98.6259L75 71L60.4762 115.7Z"
          fill="#3183B1"
        />
        <path
          d="M36.9762 43.3741C42.8102 35.3443 51.0366 29.3675 60.4762 26.3003L75 71L36.9762 43.3741Z"
          fill="#74D8A8"
        />
        <path
          d="M28 71C28 61.0746 31.1422 51.4039 36.9762 43.3741L75 71L28 71Z"
          fill="#B520A6"
        />
        <path
          d="M89.5238 26.3003C98.9634 29.3675 107.19 35.3443 113.024 43.3741L75 71L89.5238 26.3003Z"
          fill="#2B2FA5"
        />
        <path
          d="M60.4762 26.3003C69.9158 23.2332 80.0842 23.2332 89.5238 26.3003L75 71L60.4762 26.3003Z"
          fill="#FF5555"
        />
      </g>
      <circle
        cx="74.8274"
        cy="70.9302"
        r="49.5116"
        stroke="#FF9900"
        strokeWidth="6"
      />
      <path
        d="M84.1692 9.22093L74.8274 33.4918L65.4855 9.22093L84.1692 9.22093Z"
        fill="#06C167"
        stroke="#06C167"
      />
      <circle cx="74.8274" cy="70.9302" r="6.97674" fill="#FF9900" />
      <defs>
        <filter
          id="filter0_d_2_312"
          x="24"
          y="24"
          width="102"
          height="102"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_312"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_312"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default RouletteIcon;
