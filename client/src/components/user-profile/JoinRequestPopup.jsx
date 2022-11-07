import React, { useRef } from 'react';
import styled from 'styled-components';

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const ModalWrapper = styled.div`
    width: 800px;
    height: 400px;
    background: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3;
    position: relative;
    padding: 40px;
`;

const CloseButton = styled.button`
    padding: 8px 12px;
    color: white;
    background: black;
    border-radius: 10px;
    text-align: center;
    border: none;
    cursor: pointer;
`;

const JoinRequestPopup = ({displayPopup, setDisplayPopup}) => {
    const popupRef = useRef();

    const closePopup = e => {
        if(popupRef.current === e.target) {
            setDisplayPopup(false);
        }
    }

    return (
        <>
            {displayPopup ? 
            (<Background onClick={closePopup} ref={popupRef}>
                <ModalWrapper>
                    <h1>Hello World</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nesciunt a dignissimos dicta, distinctio modi id similique, temporibus quisquam rem omnis doloribus incidunt quasi necessitatibus eum iste, debitis repellat magni.</p>
                    <CloseButton onClick={()=> setDisplayPopup(prev => !prev)}>Close</CloseButton>
                </ModalWrapper>
            </Background>) : null
            }
        </>
    )
}

export default JoinRequestPopup