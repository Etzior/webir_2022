import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
`

export const Name = styled.p`
    margin-bottom: 0;
    font-size: 18px;
    color: black;
    height: 60px;
`

export const Price = styled.p`
    margin-bottom: 0;
    font-size: 16px;
    color: darkgreen;
`

export const Stock = styled.p`
    margin-bottom: 0;
    font-size: 12px;
`

export const PriceStockContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`