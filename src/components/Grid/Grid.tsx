import React from "react";
import { Grid as GluestackGrid, GridItem as GluestackGridItem } from "../../ui/grid";
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider";

type GridProps = {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  gapX?: number;
  gapY?: number;
  darkMode?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  gap,
  gapX,
  gapY,
  darkMode = false,
}) => {
  const childrenArray = React.Children.toArray(children)

  const getGapClass = (gapValue?: number) => {
    if (!gapValue || gapValue <= 0) return "";
    if (gapValue <= 1) return "gap-1";
    if (gapValue <= 2) return "gap-2";
    if (gapValue <= 3) return "gap-3";
    if (gapValue <= 4) return "gap-4";
    if (gapValue <= 6) return "gap-6";
    if (gapValue <= 8) return "gap-8";
    return "gap-12";
  }

  const getGapXClass = (gapValue?: number) => {
    if (!gapValue || gapValue <= 0) return "";
    if (gapValue <= 1) return "gap-x-1";
    if (gapValue <= 2) return "gap-x-2";
    if (gapValue <= 3) return "gap-x-3";
    if (gapValue <= 4) return "gap-x-4";
    if (gapValue <= 6) return "gap-x-6";
    if (gapValue <= 8) return "gap-x-8";
    return "gap-x-12";
  }

  const getGapYClass = (gapValue?: number) => {
    if (!gapValue || gapValue <= 0) return "";
    if (gapValue <= 1) return "gap-y-1";
    if (gapValue <= 2) return "gap-y-2";
    if (gapValue <= 3) return "gap-y-3";
    if (gapValue <= 4) return "gap-y-4";
    if (gapValue <= 6) return "gap-y-6";
    if (gapValue <= 8) return "gap-y-8";
    return "gap-y-12";
  }

  const gapClasses = [
    gap && getGapClass(gap),
    gapX && getGapXClass(gapX),
    gapY && getGapYClass(gapY),
  ].filter(Boolean).join(" ")

  return (
    <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
      <GluestackGrid 
        className={gapClasses}
        _extra={{ 
          className: `grid-cols-${columns}` 
        }}
      >
        {childrenArray.map((child, index) => {
          if (React.isValidElement(child) && child.type === GridItem) {
            const colSpan = (child.props as any).colSpan || 1
            const actualColSpan = Math.min(colSpan, columns)
            return (
              <GluestackGridItem
                key={index}
                _extra={{ 
                  className: `col-span-${actualColSpan}` 
                }}
              >
                {(child.props as any).children}
              </GluestackGridItem>
            )
          }
          
          return (
            <GluestackGridItem
              key={index}
              _extra={{ 
                className: `col-span-1` 
              }}
            >
              {child}
            </GluestackGridItem>
          )
        })}
      </GluestackGrid>
    </GluestackUIProvider>
  )
}

type GridItemProps = {
  children: React.ReactNode;
  colSpan?: number;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan = 1,
}) => {
  return (
    <GluestackGridItem
      _extra={{ 
        className: `col-span-${colSpan}` 
      }}
    >
      {children}
    </GluestackGridItem>
  )
}
