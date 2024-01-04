import React from "react";
import Button from '@mui/material/Button';

function Landing() {
  return (
    <div className="Menu">
      <Button variant="contained" href="/Editor">
        Editor
      </Button>
      <Button variant="contained" href="/Gallery">
        Gallery
      </Button>
    </div>
  );
}

export default Landing;
