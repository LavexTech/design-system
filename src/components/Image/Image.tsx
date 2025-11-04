import React from "react"
import { TouchableOpacity } from "react-native"
import { Image as GluestackImage } from "../../ui/image"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"

type ImageSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type ImageType = 'default' | 'circle'

type ImageProps = {
    src: string,
    alt: string,
    onClick?: () => void,
    size?: ImageSize,
    type?: ImageType
}

export const Image: React.FC<ImageProps> = ({ src, alt, onClick, size = 'md', type = 'default' }) => {
    const getBorderRadiusClass = () => {
        if (type === 'circle') {
            return 'rounded-full'
        }
        return 'rounded-lg'
    }

    const imageComponent = (
        <GluestackUIProvider>
            <GluestackImage
                source={{ uri: src }}
                size={size}
                alt={alt}
                className={getBorderRadiusClass()}
            />
        </GluestackUIProvider>
    )

    const handleClick = function(){
       if ( onClick !== undefined ) onClick( )
    }

    const opacity = onClick !== undefined ? 0.7 : 1

     return (
         <TouchableOpacity onPress={handleClick} activeOpacity={opacity}>
             {imageComponent}
         </TouchableOpacity>
     )
}
