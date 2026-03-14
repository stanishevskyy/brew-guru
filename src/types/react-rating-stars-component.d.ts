declare module 'react-rating-stars-component' {
  import { ComponentType } from 'react';

  interface ReactStarsProps {
    count?: number;
    size?: number;
    value?: number;
    isHalf?: boolean;
    edit?: boolean;
    onChange?: (newRating: number) => void;
    activeColor?: string;
    emptyIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    filledIcon?: React.ReactNode;
  }

  const ReactStars: ComponentType<ReactStarsProps>;
  export default ReactStars;
}
