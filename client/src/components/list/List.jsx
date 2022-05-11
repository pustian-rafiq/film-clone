import React, { useRef, useState } from 'react'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import './List.scss'
import ListItem from '../listitem/ListItem';

const List = () => {
    const listRef = useRef()

    const [isMoved, setIsMoved] = useState(false)
    const [slideNumber, setSlideNumber] = useState(0)

    const sliderHandler = (direction) => {
        setIsMoved(true)
        let distance = listRef.current.getBoundingClientRect().x - 50
        console.log(listRef)
        console.log(distance)
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        if (direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber - 1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }
    return (
        <div className='list'>
            <span className='listTitle'>Continue to watch</span>
            <div className='wrapper'>
                <ArrowBackIosOutlinedIcon className='sliderArrow left' onClick={() => sliderHandler("left")} 
                style={{ display: !isMoved && "none"}}
                />
                <div className='container' ref={listRef}>
                    <ListItem  index={0} />
                    <ListItem  index={1} />
                    <ListItem  index={2} />
                    <ListItem  index={3} />
                    <ListItem  index={4} />
                    <ListItem  index={5} />
                    <ListItem  index={6} />
                    <ListItem  index={7} />
                    <ListItem  index={8} />
                    <ListItem  index={9} />
                </div>
                <ArrowForwardIosOutlinedIcon className='sliderArrow right' onClick={() => sliderHandler("right")}
                
                />
            </div>

        </div>
    )
}

export default List