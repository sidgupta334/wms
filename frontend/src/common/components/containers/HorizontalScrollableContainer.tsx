import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { get } from 'lodash';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Box from '../material/Box';

export type HorizontalScrollButtonProps = {
  onClick: (e: React.MouseEvent) => void;
};

const ScrollContainer = styled('div')({
  overflowX: 'auto',
  // Prevents box shadow in child components from being cut off by overflow auto.
  padding: '4px 0',
  // Cancels out the unneeded spacing from padding.
  margin: '-4px 0',
  // Hiding the scrollbar from all browsers.
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  scrollBehavior: 'smooth',
});

type HorizontalScrollableContainerProps = {
  scrolledListElement: React.ReactElement;
  header?: React.ReactElement;
  scrollOffset?: number;
  ScrollLeftButtonComponent?: React.FC<HorizontalScrollButtonProps>;
  ScrollRightButtonComponent?: React.FC<HorizontalScrollButtonProps>;
  onScrollEnd?: Function;
  centerAlign?: boolean;
};

const HorizontalScrollableContainer: React.FC<HorizontalScrollableContainerProps> = ({
  header,
  scrolledListElement,
  ScrollLeftButtonComponent = ChevronLeftRoundedIcon,
  ScrollRightButtonComponent = ChevronRightRoundedIcon,
  scrollOffset,
  onScrollEnd,
  centerAlign,
  // Includes className, needed for applying custom styles from the parent via styled()
  ...props
}) => {
  const [scrollMetadata, setScrollMetadata] = useState({
    hasScroll: false,
    scrolledToStart: true,
    scrolledToEnd: false,
    scrollOffset: scrollOffset || 100,
  });

  let scrollContainerRef: HTMLDivElement | null = null;

  useEffect(() => {
    const scrollWidth = get(scrollContainerRef, 'scrollWidth', 0);
    const clientWidth = get(scrollContainerRef, 'clientWidth', 0);

    if (scrollWidth > clientWidth) {
      const scrollLeft = get(scrollContainerRef, 'scrollLeft', 0);
      const updatedScrollMetadata = {
        hasScroll: true,
        scrolledToEnd:
          Math.ceil(scrollWidth) - Math.ceil(scrollLeft) === Math.ceil(clientWidth) ||
          Math.floor(scrollWidth) - Math.floor(scrollLeft) === Math.floor(clientWidth),

        scrollOffset:
          scrollOffset || Math.ceil(get(scrollContainerRef, 'scrollWidth', 100) / 3),
      };

      setScrollMetadata((currentScrollMetadata) =>
        Object.assign({}, currentScrollMetadata, updatedScrollMetadata),
      );
    } else {
      // There was a bug in Events story, where if the response is fetched from react query cache, the component is already initialized,
      // and it will have stale `scrollMetadata` value. So regardless if scrollWidth is greater than clientWidth or not, it will always
      // take value of `hasScroll` from the previous instance. Hence to fix it, if in current instance scroll shouldn't be there, we forcefully set it to false.
      setScrollMetadata((currentScrollMetadata) =>
        Object.assign({}, currentScrollMetadata, { hasScroll: false }),
      );
    }
  }, [scrollContainerRef, scrolledListElement, scrollOffset]);

  useEffect(() => {
    if (scrollMetadata.scrolledToEnd && onScrollEnd) {
      onScrollEnd();
    }
  }, [scrollMetadata.scrolledToEnd, onScrollEnd]);

  const handleScroll = (event: any) => {
    const element = event.target;

    const scrolledToEnd =
      Math.ceil(element.scrollWidth) - Math.ceil(element.scrollLeft) ===
        Math.ceil(element.clientWidth) ||
      Math.floor(element.scrollWidth) - Math.floor(element.scrollLeft) ===
        Math.floor(element.clientWidth);
    const updatedScrollMetadata = {
      scrolledToStart: Math.ceil(element.scrollLeft) === 0,
      scrolledToEnd,
    };

    setScrollMetadata((currentScrollMetadata) =>
      Object.assign({}, currentScrollMetadata, updatedScrollMetadata),
    );
  };

  const scroll = (e: React.MouseEvent, scrollOffset: number) => {
    e.stopPropagation();
    if (scrollContainerRef) {
      scrollContainerRef.scrollTo({
        left: (scrollContainerRef.scrollLeft += scrollOffset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div {...props}>
      {header}
      <Box
        display="flex"
        alignItems="center"
        position="relative"
        justifyContent={centerAlign ? 'center' : ''}
      >
        {scrollMetadata.hasScroll && !scrollMetadata.scrolledToStart && (
          <ScrollLeftButtonComponent
            onClick={(e: React.MouseEvent) => scroll(e, -scrollMetadata.scrollOffset)}
            color="primary"
            sx={{ cursor: 'pointer' }}
          />
        )}
        <ScrollContainer
          className="scroll-container"
          ref={(node: HTMLDivElement) => {
            scrollContainerRef = node;
          }}
          onScroll={handleScroll}
        >
          {scrolledListElement}
        </ScrollContainer>
        {scrollMetadata.hasScroll && !scrollMetadata.scrolledToEnd && (
          <ScrollRightButtonComponent
            onClick={(e: React.MouseEvent) => scroll(e, scrollMetadata.scrollOffset)}
            color="primary"
            sx={{ cursor: 'pointer' }}
          />
        )}
      </Box>
    </div>
  );
};

export default HorizontalScrollableContainer;
