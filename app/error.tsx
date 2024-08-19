'use client'

import React from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  React.useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <>
      <h1>Error</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Reset</button>
    </>
  )
}