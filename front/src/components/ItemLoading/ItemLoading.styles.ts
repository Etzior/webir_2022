import styled from 'styled-components'

export const FlexColumn = styled.div`
    height: 280px;
    width: 200px;
    display: flex;
    flex-direction: column;
`

export const Image = styled.div`
    display: flex;
    width: 100%;
    height: 150px;
`

export const Bar = styled.div`
    display: flex;
    height: 16px;
    margin: 12px 8px;
    `

export const Shimmer = styled.div`
    flex: 1;
    border-radius: 6px;

    animation : shimmer 1s infinite;
    background: linear-gradient(to right, #e0e0e0 20%, #f0f0f0 55%, #e0e0e0 69%);
    background-size: 200px 100%;

    @keyframes shimmer {
        0% {
            background-position: -200px 0;
        }
    }
`

