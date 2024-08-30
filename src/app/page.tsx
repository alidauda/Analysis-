'use client';
import Link from 'next/link';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import React, { HTMLAttributes } from 'react';

export default function Component() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='flex items-center justify-between p-6 bg-white dark:bg-gray-800'>
        <Link className='flex items-center' href='#'>
          <BarChartIcon className='h-6 w-6' />
          <span className='ml-2 text-lg font-semibold'>Fmeanalytics</span>
        </Link>
        <nav className='space-x-4'>
          <Link
            className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            href='#'
          >
            About
          </Link>
          <Link
            className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            href='#'
          >
            Services
          </Link>
          <Link
            className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            href='#'
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className='flex-1'>
        <section className='text-center py-20 bg-gray-100 dark:bg-gray-900'>
          <h1 className='text-4xl font-bold mb-4'>Welcome to Fmeanalytics</h1>
          <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
            Your one-stop solution for beautiful and interactive data
            visualizations.
          </p>
          <Link
            className='inline-flex items-center justify-center h-10 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            href='/docs'
          >
            Get Started
          </Link>
        </section>
        <section className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6'>
          <Card>
            <CardHeader>
              <CardTitle>Bar Chart</CardTitle>
              <CardDescription>
                Visualize categorical data with bars.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='w-full aspect-[16/9]' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pie Chart</CardTitle>
              <CardDescription>
                Represent proportions and percentages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart className='w-full aspect-[16/9]' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Line Chart</CardTitle>
              <CardDescription>
                Track changes over periods of time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart className='w-full aspect-[16/9]' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scatter Plot</CardTitle>
              <CardDescription>
                Display relationships between different data points.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DotChart className='w-full aspect-[16/9]' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Heatmap</CardTitle>
              <CardDescription>
                Understand complex data sets with color gradients.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HeatmapChart className='w-full aspect-[16/9]' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Area Chart</CardTitle>
              <CardDescription>
                Visualize volume by representing the total value between two
                points.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className='w-full aspect-[16/9]' />
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className='flex items-center justify-between p-6 bg-white dark:bg-gray-800'>
        <p className='text-gray-600 dark:text-gray-300'>
          © 2024 Fmeanalytics. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // Add any additional props specific to your BarChart component
}

const BarChart: React.ForwardRefRenderFunction<
  HTMLDivElement,
  BarChartProps
> = ({ className, ...props }) => {
  return (
    <div {...props} className={`${className}`}>
      <ResponsiveBar
        data={[
          { name: 'Jan', count: 111 },
          { name: 'Feb', count: 157 },
          { name: 'Mar', count: 129 },
          { name: 'Apr', count: 150 },
          { name: 'May', count: 119 },
          { name: 'Jun', count: 72 },
        ]}
        keys={['count']}
        indexBy='name'
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={['#2563eb']}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role='application'
        ariaLabel='A bar chart showing data'
      />
    </div>
  );
};
BarChart.displayName = 'BarChart';

const BarChartIcon: React.ForwardRefRenderFunction<
  HTMLOrSVGElement,
  { className: string }
> = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={`${className}`}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='12' x2='12' y1='20' y2='10' />
      <line x1='18' x2='18' y1='20' y2='4' />
      <line x1='6' x2='6' y1='20' y2='16' />
    </svg>
  );
};

const DotChart: React.ForwardRefRenderFunction<
  HTMLDivElement,
  BarChartProps
> = ({ className, ...props }) => {
  return (
    <div {...props} className={`${className}`}>
      <ResponsiveScatterPlot
        data={[
          {
            id: 'Desktop',
            data: [
              { x: 'Jan', y: 43 },
              { x: 'Feb', y: 137 },
              { x: 'Mar', y: 61 },
              { x: 'Apr', y: 145 },
              { x: 'May', y: 26 },
              { x: 'Jun', y: 154 },
            ],
          },
          {
            id: 'Mobile',
            data: [
              { x: 'Jan', y: 60 },
              { x: 'Feb', y: 48 },
              { x: 'Mar', y: 177 },
              { x: 'Apr', y: 78 },
              { x: 'May', y: 96 },
              { x: 'Jun', y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear' }}
        blendMode='multiply'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={['#2563eb', '#e11d48']}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        role='application'
      />
    </div>
  );
};

const HeatmapChart: React.ForwardRefRenderFunction<
  HTMLDivElement,
  BarChartProps
> = ({ className, ...props }) => {
  return (
    <div {...props} className={`${className}`}>
      <ResponsiveHeatMap
        data={[
          {
            id: 'A',
            data: [
              {
                x: '1',
                y: 4415,
              },
              {
                x: '2',
                y: -59456,
              },
              {
                x: '3',
                y: -79886,
              },
              {
                x: '4',
                y: 14478,
              },
              {
                x: '5',
                y: -63874,
              },
              {
                x: '6',
                y: -47542,
              },
              {
                x: '7',
                y: 16635,
              },
              {
                x: '8',
                y: -30278,
              },
              {
                x: '9',
                y: -95178,
              },
            ],
          },
          {
            id: 'B',
            data: [
              {
                x: '1',
                y: 41241,
              },
              {
                x: '2',
                y: -77516,
              },
              {
                x: '3',
                y: -19422,
              },
              {
                x: '4',
                y: 61220,
              },
              {
                x: '5',
                y: -65044,
              },
              {
                x: '6',
                y: -59254,
              },
              {
                x: '7',
                y: 9299,
              },
              {
                x: '8',
                y: -58470,
              },
              {
                x: '9',
                y: 51828,
              },
            ],
          },
          {
            id: 'C',
            data: [
              {
                x: '1',
                y: 94426,
              },
              {
                x: '2',
                y: 31248,
              },
              {
                x: '3',
                y: -15766,
              },
              {
                x: '4',
                y: 22271,
              },
              {
                x: '5',
                y: 86246,
              },
              {
                x: '6',
                y: -23717,
              },
              {
                x: '7',
                y: 97595,
              },
              {
                x: '8',
                y: -69800,
              },
              {
                x: '9',
                y: 74453,
              },
            ],
          },
          {
            id: 'D',
            data: [
              {
                x: '1',
                y: -49899,
              },
              {
                x: '2',
                y: 13864,
              },
              {
                x: '3',
                y: -45673,
              },
              {
                x: '4',
                y: -20270,
              },
              {
                x: '5',
                y: 99430,
              },
              {
                x: '6',
                y: 17283,
              },
              {
                x: '7',
                y: -6514,
              },
              {
                x: '8',
                y: -21766,
              },
              {
                x: '9',
                y: -52610,
              },
            ],
          },
          {
            id: 'E',
            data: [
              {
                x: '1',
                y: 81123,
              },
              {
                x: '2',
                y: -25153,
              },
              {
                x: '3',
                y: 2577,
              },
              {
                x: '4',
                y: 24409,
              },
              {
                x: '5',
                y: 82923,
              },
              {
                x: '6',
                y: 51283,
              },
              {
                x: '7',
                y: 10208,
              },
              {
                x: '8',
                y: 4055,
              },
              {
                x: '9',
                y: -14699,
              },
            ],
          },
        ]}
        margin={{ top: 0, right: 10, bottom: 30, left: 30 }}
        axisTop={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 16,
        }}
        colors={{
          type: 'sequential',
          scheme: 'blue_green',
        }}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
        }}
        role='application'
        ariaLabel='A heatmap chart/matrix'
      />
    </div>
  );
};
const LineChart: React.ForwardRefRenderFunction<
  HTMLDivElement,
  BarChartProps
> = ({ className, ...props }) => {
  return (
    <div {...props} className={className}>
      <ResponsiveLine
        data={[
          {
            id: 'Desktop',
            data: [
              { x: 'Jan', y: 43 },
              { x: 'Feb', y: 137 },
              { x: 'Mar', y: 61 },
              { x: 'Apr', y: 145 },
              { x: 'May', y: 26 },
              { x: 'Jun', y: 154 },
            ],
          },
          {
            id: 'Mobile',
            data: [
              { x: 'Jan', y: 60 },
              { x: 'Feb', y: 48 },
              { x: 'Mar', y: 177 },
              { x: 'Apr', y: 78 },
              { x: 'May', y: 96 },
              { x: 'Jun', y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          type: 'linear',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={['#2563eb', '#e11d48']}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        role='application'
      />
    </div>
  );
};

const PieChart: React.ForwardRefRenderFunction<
  HTMLDivElement,
  BarChartProps
> = ({ className, ...props }) => {
  return (
    <div {...props} className={className}>
      <ResponsivePie
        data={[
          { id: 'Jan', value: 111 },
          { id: 'Feb', value: 157 },
          { id: 'Mar', value: 129 },
          { id: 'Apr', value: 150 },
          { id: 'May', value: 119 },
          { id: 'Jun', value: 72 },
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={'#ffffff'}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={'#ffffff'}
        arcLabelsRadiusOffset={0.65}
        colors={['#2563eb']}
        theme={{
          labels: {
            text: {
              fontSize: '18px',
            },
          },
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
        }}
        role='application'
      />
    </div>
  );
};
