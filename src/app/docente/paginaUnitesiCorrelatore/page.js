"use client"

import React from 'react';
import Roadmap from '../paginaUnitesiCorrelatore/components/Roadmap';
import { useSearchParams } from 'next/navigation';

function ViewRoadmap() {

  const searchParams = useSearchParams();
 
  const id = searchParams.get('id');

    return (
        <div>
            <Roadmap pageId={id}/>
        </div>
    );
}

export default ViewRoadmap;