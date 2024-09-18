import { interpolate } from 'flubber';
import React, { useState, useEffect } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';

export default function SVGMorph(props : {paths : string[], pageIndex : number}) {

    const progress = useMotionValue(props.pageIndex);

    const arrayOfIndex = props.paths.map( (_, i) => i )
    const path = useTransform(progress, arrayOfIndex, props.paths, {
      mixer: (a, b) => interpolate(a, b, {maxSegmentLength: 8})
    })
  
    useEffect( () => {
      const animation = animate(progress, props.pageIndex, {
        duration: 0.7,

        delay: 0,
        ease: "easeInOut"
      })

      
      return () => {animation.stop()}
    }, [props.pageIndex])
  
    return (
      <motion.path fill="#00B43D" d={path}/>
    )
}