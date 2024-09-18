// import {useState, useEffect, useRef} from 'react';
// import {Dimensions, ScaledSize} from 'react-native';

// interface DimensionsProps {
//   screen: {
//     width: number;
//     height: number;
//   };
//   window: {
//     width: number;
//     height: number;
//   };
// }
// interface DimensionsChangeEvent {
//   window: { width: number; height: number };
//   screen: { width: number; height: number };
// }

// /**
//  * Returns an object containing the current screen and window dimensions.
//  *
//  * @return {Object} An object with the following properties:
//  *   - screen: The current screen dimensions.
//  *   - window: The current window dimensions.
//  */

// const useDimensions = (): DimensionsProps => {
//   const [screenDimensions, setScreenDimensions] = useState(
//     Dimensions.get('screen'),
//   );
//   const [windowDimensions, setWindowDimensions] = useState(
//     Dimensions.get('window'),
//   );

//   useEffect(() => {
//     const handleDimensionsChange = ({ window: newWindowDimensions, screen: newScreenDimensions }:DimensionsChangeEvent) => {
//       setScreenDimensions(newScreenDimensions as ScaledSize);
//       setWindowDimensions(newWindowDimensions as ScaledSize);
//     };

//     const subscription =  Dimensions.addEventListener('change', handleDimensionsChange);

//     return () => subscription?.remove();
//   }, []);

//   return {
//     screen: screenDimensions,
//     window: windowDimensions,
//   };
// };

// const percentageCalculation = (max: number, val: number) => max * (val / 100);

// /**
//  * Calculates the font size based on the container's dimensions and a percentage.
//  *
//  * @param {number} containerHeight - The height of the container.
//  * @param {number} containerWidth - The width of the container.
//  * @param {number} percentage - The percentage of the diagonal length to use for the font size.
//  * @return {number} The calculated font size.
//  */
// const calculateFontSize = (containerHeight: number, containerWidth: number, percentage: number): number => {
//   const largerDimension = Math.max(containerHeight, containerWidth);
//   const aspectRatioBasedHeight = (16 / 9) * largerDimension;
//   const diagonalLength = Math.sqrt(
//     aspectRatioBasedHeight ** 2 + largerDimension ** 2,
//   );
//   return percentageCalculation(diagonalLength, percentage);
// };

// /**
//  * A hook that runs an effect when the dimensions change.
//  *
//  * @param {function} effect - A function that will be called with the current dimensions.
//  * @return {void | function} If the effect returns a function, it will be called when the component unmounts.
//  */
// export const useDimensionsChange = (effect: (dimensions: unknown) => void | (() => void)): void | Function => {
//   const dimensions = useDimensions();
//   const hasMounted = useRef(false);

//   useEffect(() => {
//     if (hasMounted.current) {
//       const effectReturn = effect(dimensions);
//       let cleanup = () => {};
//       if (typeof effectReturn === 'function') {
//         cleanup = effectReturn;
//       }
//       return cleanup;
//     }
//     hasMounted.current = true;
//   }, [dimensions, effect]);
// };

// /**
//  * Calculates the responsive height based on the provided height percentage.
//  *
//  * @param {number} heightPercentage - The percentage of the window height.
//  * @return {number} The calculated responsive height.
//  */
// export const responsiveHeight = (heightPercentage: number): number => {
//   const { height: windowHeight } = Dimensions.get('window');
//   return percentageCalculation(windowHeight, heightPercentage);
// };

// /**
//  * Calculates the responsive width based on the provided width percentage.
//  *
//  * @param {number} widthPercentage - The percentage of the window width.
//  * @return {number} The calculated responsive width.
//  */
// export const responsiveWidth = (widthPercentage: number): number => {
//   const { width: windowWidth } = Dimensions.get('window');
//   return percentageCalculation(windowWidth, widthPercentage);
// };


// /**
//  * Calculates the responsive screen height based on the provided height percentage.
//  *
//  * @param {number} heightPercentage - The percentage of the screen height.
//  * @return {number} The calculated responsive screen height.
//  */
// export const responsiveScreenHeight = (heightPercentage: number): number => {
//   const {height: screenHeight} = Dimensions.get('screen');
//   return percentageCalculation(screenHeight, heightPercentage);
// };



// /**
//  * Calculates the responsive height based on the provided height percentage.
//  *
//  * @param {number} heightPercentage - The percentage of the window height.
//  * @return {number} The calculated responsive height.
//  */
// export const useResponsiveHeight = (heightPercentage: number): number => {
//   const {height: windowHeight} = useDimensions().window;
//   return percentageCalculation(windowHeight, heightPercentage);
// };

// /**
//  * Calculates the responsive width based on the provided width percentage.
//  *
//  * @param {number} widthPercentage - The percentage of the screen width.
//  * @return {number} The calculated responsive width.
//  */
// export const useResponsiveWidth = (widthPercentage: number): number => {
//   const {width: screenWidth} = useDimensions().window;
//   return percentageCalculation(screenWidth, widthPercentage);
// };

// /**
//  * Calculates the responsive screen width based on the provided width percentage.
//  *
//  * @param {number} widthPercentage - The percentage of the screen width.
//  * @return {number} The calculated responsive screen width.
//  */
// export const responsiveScreenWidth = (widthPercentage: number): number => {
//   const {width: screenWidth} = Dimensions.get('screen');
//   return percentageCalculation(screenWidth, widthPercentage);
// };

// /**
//  * Calculates the responsive screen height based on the provided height percentage.
//  *
//  * @param {number} heightPercentage - The percentage of the screen height.
//  * @return {number} The calculated responsive screen height.
//  */
// export const useResponsiveScreenHeight = (heightPercentage: number): number => {
//   const {height: screenHeight} = useDimensions().screen;
//   return percentageCalculation(screenHeight, heightPercentage);
// };

// /**
//  * Calculates the responsive screen width based on the provided width percentage.
//  *
//  * @param {number} widthPercentage - The percentage of the screen width.
//  * @return {number} The calculated responsive screen width.
//  */
// export const useResponsiveScreenWidth = (widthPercentage: number): number => {
//   const {width: screenWidth} = useDimensions().screen;
//   return percentageCalculation(screenWidth, widthPercentage);
// };

// /**
//  * Calculates the responsive font size based on the screen dimensions.
//  *
//  * @param {number} fontSize - The base font size.
//  * @return {number} The calculated responsive font size.
//  */
// export const useResponsiveScreenFontSize = (fontSize: number): number => {
//   const { height: screenHeight, width: screenWidth } = useDimensions().screen;
//   return calculateFontSize(screenHeight, screenWidth, fontSize);
// };

// /**
//  * Calculates the responsive font size based on the window dimensions.
//  *
//  * @param {number} fontSize - The base font size.
//  * @return {number} The calculated responsive font size.
//  */
// export const useResponsiveFontSize = (fontSize: number): number => {
//   const {height: windowHeight, width: windowWidth} = useDimensions().window;
//   return calculateFontSize(windowHeight, windowWidth, fontSize);
// };

// /**
//  * Calculates the responsive font size based on the screen dimensions.
//  *
//  * @param {number} fontSize - The base font size.
//  * @return {number} The calculated responsive font size.
//  */
// export const responsiveScreenFontSize = (fontSize: number): number => {
//   const {height: screenHeight, width: screenWidth} = Dimensions.get('screen');
//   return calculateFontSize(screenHeight, screenWidth, fontSize);
// };

// /**
//  * Calculates the responsive font size based on the window dimensions.
//  *
//  * @param {number} fontSize - The base font size.
//  * @return {number} The calculated responsive font size.
//  */
// export const responsiveFontSize = (fontSize: number): number => {
//   const {height: windowHeight, width: windowWidth} = Dimensions.get('window');
//   return calculateFontSize(windowHeight, windowWidth, fontSize);
// };

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {
  guidelineBaseWidth,
  guidelineBaseHeight,
  scale,
  verticalScale,
  moderateScale,
};
