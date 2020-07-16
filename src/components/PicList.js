import './ImageList.css'
import React from 'react';
import ImageCard from './ImageCard';

const PicList = props => {
    const pics = props.pics.map((e, i) => {
        return <ImageCard key={i} pic={e} />
    });
    return (
    <div className="image-list">
    {pics}
    </div>
    )
}

export default PicList

