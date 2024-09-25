'use client'
import React from 'react';
import clsx from 'clsx';
import { useEffect,useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed,setTimeElapsed]= useState(0)
  const [play,setPlay]=useState(false)
  const [isClient, setIsClient]= useState(false)

  useEffect(()=>{
    setIsClient(true)
    if(play){
      const interval= window.setInterval(()=>{
        setTimeElapsed(prev=>prev+1)
      },1000)
      return () => clearInterval(interval);
    }
    
  },[play])

  if(!isClient){
    return null
  }

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const colorindex=timeElapsed%COLORS.length
  console.log(colorindex)
  const selectedColor = COLORS[colorindex];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}
         
      >
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;
          console.log(isSelected);
          return (
            <li
              className={styles.color}
              key={index}
              animate={{ x: colorindex * -100 + '%' }}
              transition={{ duration: 0.5 }}
            >
              {isSelected && (
                <motion.div
                  className={
                    styles.selectedColorOutline
                  }
                  layoutId='nepo'
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={()=>setPlay(!play)}>
          {play ? (
            <>
             <Play />
             <VisuallyHidden>Play</VisuallyHidden>
            </>
          ): (
            <>
            <Pause />
            <VisuallyHidden>Play</VisuallyHidden>
            </>
          )}
           
          </button>
          <button onClick={()=>{
            setTimeElapsed(0)
          }
            }>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
