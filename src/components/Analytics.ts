import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import React from 'react';

export function Analytics() {
  return React.createElement(VercelAnalytics);
}