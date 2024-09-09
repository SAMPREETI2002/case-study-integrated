import React from 'react';
import Payment from './Payment';

function ParentComponent() {
  const token = "your-token-here"; // Replace with your token logic

  return <Payment token={token} />;
}

export default ParentComponent;
