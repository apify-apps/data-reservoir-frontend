'use client'

import { Chart } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import React, { ReactNode } from 'react'

export default function ChartRegister({children}: {children: ReactNode}) {
  Chart.register(TreemapController, TreemapElement);
  return children;
}
