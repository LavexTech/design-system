import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

type GridProps = {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  gapX?: number;
  gapY?: number;
  darkMode?: boolean;
}

/** Faixas do Tailwind: gap-1=4 … gap-12=48. Valores intermediários caem na faixa inferior. */
function gapToPx(gapValue?: number): number {
  if (!gapValue || gapValue <= 0) return 0
  if (gapValue <= 1) return 4
  if (gapValue <= 2) return 8
  if (gapValue <= 3) return 12
  if (gapValue <= 4) return 16
  if (gapValue <= 6) return 24
  if (gapValue <= 8) return 32
  return 48
}

type Cell = {
  key: string
  colSpan: number
  node: React.ReactNode
}

function readCells(children: React.ReactNode, columns: number): Cell[] {
  return React.Children.toArray(children).map((child, index) => {
    if (React.isValidElement(child) && child.type === GridItem) {
      const props = child.props as GridItemProps
      const requested = props.colSpan ?? 1
      return {
        key: String(index),
        colSpan: Math.min(Math.max(requested, 1), columns),
        node: props.children,
      }
    }
    return { key: String(index), colSpan: 1, node: child }
  })
}

function rowsOf(cells: Cell[], columns: number): Cell[][] {
  const rows: Cell[][] = []
  let current: Cell[] = []
  let used = 0
  cells.forEach((cell) => {
    if (used > 0 && used + cell.colSpan > columns) {
      rows.push(current)
      current = []
      used = 0
    }
    current.push(cell)
    used += cell.colSpan
  })
  if (current.length > 0) {
    rows.push(current)
  }
  return rows
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  gap,
  gapX,
  gapY,
  darkMode = false,
}) => {
  void darkMode
  const [width, setWidth] = useState(0)
  const columnGap = gapToPx(gapX ?? gap)
  const rowGap = gapToPx(gapY ?? gap)
  const cells = useMemo(() => readCells(children, columns), [children, columns])
  const rows = useMemo(() => rowsOf(cells, columns), [cells, columns])

  return (
    <View
      style={styles.grid}
      onLayout={(event) => {
        const next = Math.floor(event.nativeEvent.layout.width)
        setWidth((current) => (current === next ? current : next))
      }}
    >
      {width > 0
        ? rows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.row,
                { marginBottom: rowIndex < rows.length - 1 ? rowGap : 0 },
              ]}
            >
              {row.map((cell, cellIndex) => {
                const gaps = columnGap * (row.length - 1)
                const available = Math.max(0, width - gaps)
                const cellWidth = Math.floor((available * cell.colSpan) / columns)
                return (
                  <View
                    key={cell.key}
                    style={{
                      width: cellWidth,
                      marginRight: cellIndex < row.length - 1 ? columnGap : 0,
                      flexGrow: 0,
                      flexShrink: 0,
                    }}
                  >
                    {cell.node}
                  </View>
                )
              })}
            </View>
          ))
        : null}
    </View>
  )
}

type GridItemProps = {
  children: React.ReactNode;
  colSpan?: number;
}

export const GridItem: React.FC<GridItemProps> = ({ children }) => {
  return <>{children}</>
}

const styles = StyleSheet.create({
  grid: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: "stretch",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
})
