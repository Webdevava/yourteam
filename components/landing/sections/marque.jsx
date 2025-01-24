import React from 'react'
import Marquee from '@/components/ui/marquee';

const marque = () => {
  return (
    <Marquee pauseOnHover className="[--duration:10s]">
      <div className="flex gap-8">
        <div className="bg-secondary/75 p-4 rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0)] -rotate-1">
          <p className="text-foreground">Join 10k+ Students</p>
        </div>
        <div className="bg-primary/10 p-4 rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0)] rotate-1">
          <p className="text-primary">Master Programming Skills</p>
        </div>
        <div className="bg-secondary/75 p-4 rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0)] -rotate-1">
          <p className="text-foreground">Get Certified</p>
        </div>
        <div className="bg-primary/10 p-4 rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0)] rotate-1">
          <p className="text-primary">Land Your Dream Job</p>
        </div>
      </div>
    </Marquee>
  );
}

export default marque
