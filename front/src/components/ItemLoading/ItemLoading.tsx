import React from 'react'

import { Image, Shimmer, Bar, FlexColumn } from './ItemLoading.styles'



export const ItemLoading: React.FC = () => {
    return (
        <FlexColumn>
            <Image>
                <Shimmer />
            </Image>
            <Bar>
                <Shimmer />
            </Bar>
            <Bar>
                <Shimmer />
            </Bar>
        </FlexColumn>
    )
}
