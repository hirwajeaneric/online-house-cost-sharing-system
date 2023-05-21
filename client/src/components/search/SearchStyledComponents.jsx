import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SearchContainer = styled.div`
    background: white;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-item: flex-start;
    margin-top: 80px;
    position: relative;

    @media (max-width: 1080px) {
        // padding: 5px 90px;
    }

    @media (max-width: 768px) {
        // padding: 5px 60px;
        // height: 1000px;
    }

    @media (max-width: 480px) {
        // padding: 5px 20px;
    }
`;

export const SideBar = styled.form`
    width: 16%;    
    padding: 20px 20px;
    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        width: 30%;        
    }

    @media (max-width: 480px) {
        
    }
`;

export const HouseList = styled.div`
    width: 84%;
    bottom: 40px;
    top: 80px;
    right: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        width: 70%;
    }

    @media (max-width: 480px) {
        
    }
`;

export const HouseContainer = styled.div`
    padding: 20px 40px;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 20px;
    // overflow-y: scroll;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const Ahouse = styled(Link)`
    width: 22% !important;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid #c2d6d6;
    position: relative;

    img {
        width: 100%;
    }

    span {
        font-size: 80%;
        background: rgba(0,0,0,0.5);
        padding: 3px 5px;
        color: white;
        width: 100px; 
        text-align: center;
        position: absolute;
        right: 10px;
        top: 10px;
        border-radius: 5px;
    }

    div {
        width: 100%;
        padding: 10px;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        width: 50%;
    }

    @media (max-width: 480px) {
        
    }
`;

export const InnerContainer = styled.div`
    margin-bottom: 20px;
    
    input[type='submit'] {
        background: black;
        color: white;
        padding: 4px 12px;
        border-radius: 5px;
        margin-top: 20px;
    }

    input[type='submit']:hover {
        background: blue;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const SectionTitles = styled.h3`
    font-size: 130%;
    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const SectionItems = styled.div`
        
    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const SearchItem = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 90%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const PriceInputs = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    label {
        color: black;
        font-size: 90%;
    }

    input[type='text'] {
        border: 0.1rem solid gray;
        border-radius: 5px; 
        width: 100%;
        padding: 0 3px;
        font-size: 95%;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;