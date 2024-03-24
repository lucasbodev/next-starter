import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// datasource db {
//     provider = "postgresql"
//     url      = env("POSTGRES_PRISMA_URL")
//     directUrl = env("POSTGRES_URL_NON_POOLING")
//   }
const SpeedTest = async (): Promise<React.JSX.Element> => {
  return (
        <SpeedInsights/>
  );
};

export default SpeedTest;
