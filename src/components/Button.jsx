import React from 'react';

const Button = ({ handlePagination, direction }) => (
  <button
    className={`button button-${direction}`}
    onClick={() => handlePagination(direction)}
    tabIndex={-1}
  >
    <svg
      role={`button-${direction}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      tabIndex={-1}
    >
      <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
    </svg>
  </button>
);

export default Button;
